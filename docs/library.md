::: info
杂谈
:::

## Introduction

how to create and use program libraries on Linux using the GNU toolset

## Program libraries

### static libraries

1. be installed into a program executable before the program can be run
2. permit users to link to programs without having to recompile its code
3. simply a collection of ordinary object files, end with the ''.a'' suffix
4. 编译生成目标文件 `gcc -c hello.c -o hello.o`
5. use ar (archiver) program to create a static library: `ar rcs libhello.a hello1.o hello2.o`, add the object files file1.o and file2.o to the static library libhello.a, creating libhello.a if it doesn't already exist
6. use gcc to generate your executable, use the -l option to specify the library: `gcc hello.c -L. -lhello –o hello`

### shared libraries

1. be loaded at program start-up and shared between programs

2. start with the "lib" prefix, end with the ''.so'' suffix (SONAME, Shared Object Name), e.g. `libexample.so.1` 表示这个库的主要版本号是 1, 如果在将来进行重大更改并发布了一个不兼容的新版本, 可以将 SONAME 更改为 `libexample.so.2`

3. 执行动态链接库管理命令 `sudo ldconfig` (load configuration), 追加库文件 /usr/local/mysql/lib 到 /etc/ld.so.conf 文件中 `echo "/usr/local/mysql/lib" >>/etc/ld.so.conf`

4. create a Shared Library: `gcc -shared -Wl,-soname,your_soname -o library_name file_list library_list`, 

   e.g. create two object files (a.o and b.o) and then creates a shared library that contains both of them

   ``` shell
   gcc -fPIC -g -c -Wall a.c
   gcc -fPIC -g -c -Wall b.c
   gcc -shared -fPIC -Wl,-soname,libmystuff.so.1 -o libmystuff.so.1.0.1 a.o b.o -lc
   ```

   clang `clang -shared -fPIC foo.c -o libfoo.so`

   windows `gcc -shared -fPIC foo.c -o libfoo.dll`

5. install and use a Shared Library

   - `ldconfig -n directory_with_shared_libraries`

   - `LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH  my_program`

   - ```shell
     #!/bin/sh
     export LD_LIBRARY_PATH=/usr/local/my_lib:$LD_LIBRARY_PATH
     exec /usr/bin/my_program.orig $*
     ```

   - ` ldd /bin/ls`

### dynamically loaded (DL) libraries

1. be loaded and used at any time while a program is running, 在不重启程序的情况下, 实现模块的重新加载, 即热更新

2. both static and shared libraries can be used as DL libraries, the difference is in how DL libraries are used by programmers

3. dlopen function opens a library and prepares it for use, `void * dlopen(const char *filename, int flag);`

   e.g. 

   ```c
   handle = dlopen ("/lib/libm.so.6", RTLD_LAZY);
   dlclose(handle);
   ```

4. if this program were in a file named "foo.c", we can use `-ldl` to load library:`gcc -o foo foo.c -ldl`

## Tools

### nm

name list，列出 .o, .a, .so 中的符号信息，即定义的函数、全局变量等等

```
nm [option(s)] [file(s)]
-A 在每个符号信息的前面打印所在对象文件名称；
-C 输出demangle过了的符号名称；
-D 打印动态符号；
-l 使用对象文件中的调试信息打印出所在源文件及行号；
-n 按照地址/符号值来排序；
-u 打印出那些未定义的符号。
```

常见的符号类型：

- A 该符号的值在今后的链接中将不再改变；
- B 该符号放在 BSS 段中，通常是那些未初始化的全局变量；
- D 该符号放在普通的数据段中，通常是那些已经初始化的全局变量；
- T 该符号放在代码段中，通常是那些全局非静态函数；
- U 该符号未定义过，需要自其他对象文件中链接进来；
- W 未明确指定的弱链接符号；同链接的其他对象文件中有它的定义就用上，否则就用一个系统特别指定的默认值。

### GNU libtool

<a href='###shared libraries'>shared libraries</a> 中

- linux `gcc -shared -fPIC foo.c -o libfoo.so`
- clang `clang -shared -fPIC foo.c -o libfoo.so`
- windows `gcc -shared -fPIC foo.c -o libfoo.dll`

如果想让 foo 库能够跨平台运行，那么就不得不为每一个特定的平台提供相应的编译命令或脚本，这意味着必须知道各个平台在共享库支持方面的差异及处理方式

gcc 编译生成共享库的命令可以粗略的拆分为两步：编译与连接

```shell
gcc -fPIC foo.c -o libfoo.o  #编译
gcc -shared libfoo.o -o libfoo.so  #连接
```

libtool 实现：

```shell
libtool --tag=CC --mode=compile gcc -c foo.c -o libfoo.lo  # 编译，libfoo.lo 对应 libfoo.o
libtool --tag=CC --mode=link gcc libfoo.lo -rpath /usr/local/lib -o libfoo.la  # 连接，libfoo.la 对应 libfoo.so
```

`--tag` 选项用于告诉 libtool 要编译的库是用什么语言写的

| tag  |     language     |
| :--: | :--------------: |
|  CC  |        C         |
| CXX  |       C++        |
| GCJ  |       Java       |
| F77  |    Fortran 77    |
|  FC  |     Fortran      |
|  GO  |        Go        |
|  RC  | Windows Resource |

`--mode` 选项用于设定 libtool 的工作模式：

- `--mode=compile` 编译
- `--mode=link` 连接
- `--mode=install` 安装
- `--mode=uninstall` 卸载
- `--mode=clean` 清理

事实上，很少有人去用 libtool 来安装库。大部分情况下，libtool 是与 GNU Autotools 配合使用的。更正确的说法是，libtool 属于 GNU Autotools。

简单的说，GNU Autotools 就是产生两份文件，一份文件是 configure，用于检测项目构建（预处理、编译、连接、安装）环境是否完备；另一份文件是 Makefile，用于项目的构建。如果我们的项目是开发一个库，那么一旦有了 GNU Autotools 生成的 Makefile，编译与安装这个库的命令通常是：

```bash
./configure         # 检测构建环境
make                # 编译、连接
sudo make install   # 安装
```

## Reference

- https://dwheeler.com/program-library/Program-Library-HOWTO/t1.html
- https://www.bilibili.com/read/cv27486835/
- https://blog.csdn.net/qq_28087491/article/details/121437727
- https://zhuanlan.zhihu.com/p/35847200?utm_id=0