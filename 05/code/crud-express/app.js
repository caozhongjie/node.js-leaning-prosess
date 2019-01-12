var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var router = require('./router')
//配置模板引擎必须在挂载路由之前
app.engine('html', require('express-art-template')); //使用art-template模板，并且让模板自动识别html文件
//使用以下代码，是通过body-parser模块可以获取到post传递过来的数据
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(router)

app.use('/public/', express.static('./public/'));
app.use('/views/', express.static('./views/'));
app.use('/node_modules/', express.static('./node_modules/'));


app.listen(3000, function () {
    console.log('3000 is running')
})