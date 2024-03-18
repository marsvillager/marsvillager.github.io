import{_ as s,o as a,c as n,O as l}from"./chunks/framework.aacc0fa0.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"CTF_Misc_lemminx.md"}'),p={name:"CTF_Misc_lemminx.md"},o=l(`<div class="info custom-block"><p class="custom-block-title">INFO</p><p>2022-HitCon-lemminx</p></div><h2 id="_1、思路" tabindex="-1">1、思路 <a class="header-anchor" href="#_1、思路" aria-label="Permalink to &quot;1、思路&quot;">​</a></h2><p>（1）附件 Dockerfile</p><p><code>sudo docker build .</code> 失败，<code>ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref moby::kqn551w8oi3h45pau85uq69xv: &quot;/printflag&quot;: not found</code></p><div class="language-dockerfile"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">FROM debian:bullseye</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">RUN useradd -ms /bin/bash ctf</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN apt-get update &amp;&amp; apt-get install wget unzip socat openssl -y &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># try to execute /printflag to get flag</span></span>
<span class="line"><span style="color:#A6ACCD;">COPY printflag /printflag</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN chmod 111 /printflag</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">USER ctf</span></span>
<span class="line"><span style="color:#A6ACCD;">WORKDIR /tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN wget https://download.jboss.org/jbosstools/vscode/stable/lemminx-binary/0.19.1-541/lemminx-linux.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN echo &#39;0c6d830398926421a28dbfc716ad8bc6b27edf67ae67afd3efa97432b5715922 lemminx-linux.zip&#39; | sha256sum -c</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN unzip lemminx-linux.zip &amp;&amp; rm lemminx-linux.zip</span></span>
<span class="line"><span style="color:#A6ACCD;">RUN printf &#39;#!/bin/sh\\ntimeout 10 ./lemminx-linux\\n&#39; &gt; run.sh &amp;&amp; chmod +x run.sh</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">EXPOSE 7777</span></span>
<span class="line"><span style="color:#A6ACCD;">ARG TIMEOUT</span></span>
<span class="line"><span style="color:#A6ACCD;">CMD mkdir /home/ctf/$(openssl rand -hex 16) &amp;&amp; mv /tmp/* /home/ctf/* &amp;&amp; cd /home/ctf/* &amp;&amp; timeout \${TIMEOUT} socat TCP-LISTEN:7777,fork,reuseaddr EXEC:&#39;./run.sh&#39;,stderr</span></span></code></pre></div><ul><li>创建用户 ctf</li><li>将可执行文件 printflag 复制到镜像中并修改其权限为只执行</li><li>切换用户到 ctf，目录到 /tmp</li><li>下载解压 lemminx-linux，并创建脚本 run.sh，设置其权限为可执行</li><li>将容器的 7777 端口暴露出来</li><li>socat TCP-LISTEN:7777,fork,reuseaddr EXEC:&#39;./run.sh&#39;,stderr <ul><li>socat TCP-LISTEN:7777 监听 7777 端口，等待连接</li><li>fork 每当有新连接时，为新连接创建一个子进程来处理</li><li>reuseaddr 允许多个进程同时绑定到相同的地址和端口上</li><li>EXEC:&#39;./run.sh&#39; 当有连接到达时，执行 ./run.sh 脚本</li><li>stderr 将 socat 的标准错误输出重定向到终端</li></ul></li></ul><p>（2）远程连接</p><p><code>nc [options] [host] [port]</code> netcat 连接主机</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">➜</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nc</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">challenge-55c993300876f71c.sandbox.ctfhub.com</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">35235</span></span>
<span class="line"><span style="color:#FFCB6B;">Connection</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">challenge-73e7fcd3a7b1ea52.sandbox.ctfhub.com</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">port</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">38675</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">tcp/</span><span style="color:#89DDFF;">*]</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">succeeded!</span></span></code></pre></div><p>或者</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">➜</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">~</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">telnet</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">challenge-55c993300876f71c.sandbox.ctfhub.com</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">35235</span></span>
<span class="line"><span style="color:#FFCB6B;">Trying</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">47.98.117.93...</span></span>
<span class="line"><span style="color:#FFCB6B;">Connected</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">challenge-55c993300876f71c.sandbox.ctfhub.com.</span></span>
<span class="line"><span style="color:#FFCB6B;">Escape</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">character</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">^]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.</span></span></code></pre></div>`,11),e=[o];function c(t,r,i,C,A,y){return a(),n("div",null,e)}const D=s(p,[["render",c]]);export{m as __pageData,D as default};
