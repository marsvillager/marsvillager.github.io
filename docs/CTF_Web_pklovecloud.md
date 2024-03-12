::: info
2021-第五届空间智能安全大赛-Web-pklovecloud
:::

## 1、思路

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

## 2、反序列化漏洞

## 3、exp