//0、安装

var express = require('express');//1、引包
//也就是原来的http.createServer
var app = express()//2、创建你服务器应用程序,也就是原来的http.createServer

//公开指定目录
//可以直接通过/public/xx 的方式访问public目录中的所有资源了
app.use('/public/',express.static('./public/'))


app.get('/',function (req,res) {
    res.send('hello express')
})
app.get('/about',function (req,res) {
    res.send('about')
})
app.listen(3000,function () {
    console.log('监听成功')
})