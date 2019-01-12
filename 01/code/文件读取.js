//fs是file-system的简写。
//在node中如果想进行文件操作，就必须引入fs这个核心模块
//在fs这个核心模块中，就提供了所有的文件操作的API
//例如fs.readFile就是用来读取文件的

//1、使用require方法加载fs模块
var fs = require('fs');
//2、读取文件
//第一个参数是读取的文件路径
//第二个参数是一个回调函数function(error,data){}
//读取成功：data是读取到的数据，error是null
//读取失败，data是undefined，error是错误对象
fs.readFile('hello.txt',function (error,data) {
    //<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
    //文件中存储的都是二进制数据0 1
    //然后系统自动将二进制转化为了16进制即上面的buffer
    //通过data.tostring()可以转化为我们认识的字符
    console.log(data.toString())
    console.log(data)
    console.log(error)
})