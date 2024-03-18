::: info
2022-HitCon-lemminx
:::

## 1、思路

（1）附件 Dockerfile

`sudo docker build .` 失败，`ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref moby::kqn551w8oi3h45pau85uq69xv: "/printflag": not found`

```dockerfile
FROM debian:bullseye

RUN useradd -ms /bin/bash ctf
RUN apt-get update && apt-get install wget unzip socat openssl -y && rm -rf /var/lib/apt/lists/*

# try to execute /printflag to get flag
COPY printflag /printflag
RUN chmod 111 /printflag

USER ctf
WORKDIR /tmp
RUN wget https://download.jboss.org/jbosstools/vscode/stable/lemminx-binary/0.19.1-541/lemminx-linux.zip
RUN echo '0c6d830398926421a28dbfc716ad8bc6b27edf67ae67afd3efa97432b5715922 lemminx-linux.zip' | sha256sum -c
RUN unzip lemminx-linux.zip && rm lemminx-linux.zip
RUN printf '#!/bin/sh\ntimeout 10 ./lemminx-linux\n' > run.sh && chmod +x run.sh

EXPOSE 7777
ARG TIMEOUT
CMD mkdir /home/ctf/$(openssl rand -hex 16) && mv /tmp/* /home/ctf/* && cd /home/ctf/* && timeout ${TIMEOUT} socat TCP-LISTEN:7777,fork,reuseaddr EXEC:'./run.sh',stderr
```

- 创建用户 ctf
- 将可执行文件 printflag 复制到镜像中并修改其权限为只执行
- 切换用户到 ctf，目录到 /tmp
- 下载解压 lemminx-linux，并创建脚本 run.sh，设置其权限为可执行
- 将容器的 7777 端口暴露出来
- socat TCP-LISTEN:7777,fork,reuseaddr EXEC:'./run.sh',stderr
  - socat TCP-LISTEN:7777 监听 7777 端口，等待连接
  - fork 每当有新连接时，为新连接创建一个子进程来处理
  - reuseaddr 允许多个进程同时绑定到相同的地址和端口上
  - EXEC:'./run.sh' 当有连接到达时，执行 ./run.sh 脚本
  - stderr 将 socat 的标准错误输出重定向到终端

（2）远程连接

`nc [options] [host] [port]` netcat 连接主机

```shell
➜  ~ nc -v challenge-55c993300876f71c.sandbox.ctfhub.com 35235
Connection to challenge-73e7fcd3a7b1ea52.sandbox.ctfhub.com port 38675 [tcp/*] succeeded!
```

或者

```shell
➜  ~ telnet challenge-55c993300876f71c.sandbox.ctfhub.com 35235
Trying 47.98.117.93...
Connected to challenge-55c993300876f71c.sandbox.ctfhub.com.
Escape character is '^]'.
```