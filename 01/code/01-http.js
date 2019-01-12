var http = require('http');

var server = http.createServer();
server.on('request',function (req,res) {
    //在服务端默认发送的数据，其实是utf8编码的内容
    //但是浏览器不知道你是utf8编码的内容
    //浏览器在 不知道服务器响应内容的编码的情况下回按照当前操作系统的默认编码去解析
    //中文操作系统默认是gbk
    //告诉浏览器以怎样的方式解析数据
    //在HTTP协议中，content-type告知对方发送的内容是什么类型
    // res.setHeader('Content-Type','text/plain;charset=utf-8');
    //
    // console.log('客户端启动成功');
    // res.end('客户端中文数据');

    var url = req.url;
    if(url ==='/plain'){
        //text/plain解析为普通文本
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('客户端中文数据');
    }
    if(url==='/html'){
        //text/html浏览器解析为html
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end('<p><a href="#"> hello world</a></p>')//自动将标签解析
    }

})

server.listen(3000,function () {
    console.log('服务器启动成功')
})