var express = require('express')
var app= express();
//中间件:处理请求的，本质就是个函数
//在express中，对中间件有几种分类
//这样将每个不同类型的事件分发到对应的中间件中

//当请求进来，会从上到下匹配 ，如果不匹配，则自动到下面一个匹配
//1、不关心请求路径和请求方法的中间件
//也就是说任何请求都会进入这个中间件
//中间件本身是一个方法，该方法接收三个参数req,res.next
//req：请求对象
//res:响应对象
//next：执行下一个匹配的中间件
//当一个请求进入中间件之后，如果不调用next()，则不会进入下一个中间件
//next()调用下一个中间件
// app.use(function (req,res,next) {
//     console.log('请求1')
//     next()
// })
// app.use(function (req,res,next) {
//     console.log('请求2')
// })

//2、以/xxx开头的路径中间件
// app.use('/a',function (req,res,next) { //所有以/a为开头的路径都会进入这个中间件
//     console.log(req.url)
//     next()
// })


//3、严格匹配请求方法和其你去路径的中间件
app.get('/a',function (req,res,next) { //只允许路径为/a的请求进来（最常用）
//当next中带了任何参数，则会自动寻找并进入有四个参数的中间件，这段代码直接跳过了bbbb，直接打印了333
    next('aaaa')
//一般在执行操作失败后将error传入
})


app.use(function (req,res,next) {
    console.log('bbbb')
})

app.use(function (err,req,res,next) {
    console.log(333)
    console.log(err)
})

app.listen(3000,function () {
    console.log('3000 is running')
})