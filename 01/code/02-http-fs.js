//通过使用fs操作文件，将文件中的请求显示在页面上
var fs = require('fs');
var http = require('http');
var server = http.createServer();


server.on('request',function (req,res) {
    var response='';
   fs.readFile('../resource/hello.html',function (error,data) {
       if(error){
           res.setHeader('Content-Type','text/plain;charset=utf-8')
           res.end('读取失败');
       }else{
           response = data.toString();
           var url = req.url;
           if(url==='/index'){
               res.end(response)
           }
       }
   })



})










server.listen(3000,function () {
    console.log('监听3000端口');
})
