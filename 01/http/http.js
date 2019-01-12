//加载http核心模块
var http =  require('http');
//使用http.createServer()方法创建一个web服务器
var server = http.createServer();
//发请求  接收请求  处理请求  给个反馈（发送响应）

//注册request请求事件，当客户端请求过来，就会自动触发服务器的request请求事件,然后执行回调函数
//回调函数需要就收两个参数req(请求对象可以用来获取客户端的一些请求信息) ,res（用来给客户端发送响应消息）
server.on('request',function (req,res) {
    console.log('收到客户端请求');
    console.log(req.url);//获取请求的路径
    //res对象有一个方法，write可以用来给客户端发送响应数据,write可以使用多次，但是最后一定要使用end来结束响应

    //根据不同路由返回不同数据
    // if(req.url=='/index'){
    //     res.write('index');
    // }
    // if(req.url=='/login'){
    //     res.write('login');
    // }
    // if(req.url=='/page'){
    //     res.write('page');
    // }
    //使用这个end()方法后才能输入到客户端
    res.end(req.url);//res.end('结束时发送的数据') 响应数据只能是二进制数据或者字符串
})

//绑定端口号，启动服务器
server.listen(3000,function () {
    console.log('服务器启动成功')
})