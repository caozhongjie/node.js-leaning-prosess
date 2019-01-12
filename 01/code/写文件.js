var fs  = require('fs');
//第一个参数为文件路径，第二个参数为写入的内容,第三个是回调function(error)，如果成功error为null，失败则为错误对象
fs.writeFile('hello.txt','大家好',function (error) {
    console.log(error);
})