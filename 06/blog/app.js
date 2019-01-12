var express = require('express');
//路径操作模块
var path = require('path')
var session = require('express-session')
var router  = require('./routes');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
//在每个模块中，除了require,exports等模块相关API之外，还有两个特殊的成员
//__dirname获取当前文件模块所属的目录的绝对路径
//__firename可以用来获取当前文件的绝对路径
//__dirname和__firename是不受执行node命令所属路径影响的
//paht.join()用于路径的拼接
//在文件操作路径中，相对路径设计的就是相对于执行node命令所处的路径
//为了在不同的地方调用时          都能执行成功，则应该使用绝对路径，但是当项目绝对路径发生改变后，
//此时则使用__dirname来获取当前终端调用处的绝对路径，所以最终只用path.join()
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views'));

//在express这个框架中，默认不支持session和cookie
//但是我们可以使用第三方中间件：express-session来解决
//1、npm install express-session
//2、配置
//3、使用  (要在路由之前使用)
//当 把这个插件配置好之后，我们就可以通过req.session来发访问和设置session成员
//添加session数据：req.session.foo ='bar'
//访问session数据: req.session.foo
app.use(session({
    secret: 'keyboard cat',//配置加密字符串，会在原有加密基础上和这个字符串拼接，提高安全性
    resave: false,
    saveUninitialized: true,//无论是否使用session,都默认给一个session
    cookie: { maxAge:160000*1000}
}))



//把路由挂载到app中
app.use(router);

//使用中间件定制一个404页面,当router文件中没有匹配的中间件进行匹配时则会调用该中间件
app.use(function (req,res,next) {
    res.render('404.html')
})

app.use(function (err,req,res,next) {//当router中next()中带了参数就会自动调用该中间件
    res.status(500).json({
        err_code:500,
        message:'请求有误'
    })
})


app.listen(3000,function () {
    console.log('3000 is running')
})