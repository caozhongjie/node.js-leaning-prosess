var http = require('http');
var fs = require('fs');
var template = require('art-template');
var urlpath = require('url');
var comment=[
    {
        name:'张三',
        message:'天气不错',
        datetime:'2018-5-6'
    },
    {
        name:'张三',
        message:'天气不错',
        datetime:'2018-5-6'
    },
    {
        name:'张三',
        message:'天气不错',
        datetime:'2018-5-6'
    },
    {
        name:'张三',
        message:'天气不错',
        datetime:'2018-5-6'
    }
]


http.createServer(function (req, res) {
    var parseObj = urlpath.parse(req.url,true);
    //该路径不包含问好之后的内容
    var pathname = parseObj.pathname;
    var url = pathname;
    if (url === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) {
                console.log('view')
                return res.end('404')
            }
            var html = template.render(data.toString(),{
                comment:comment
            })
            res.end(html)
        })
    } else if (url.indexOf('/public/') === 0) { //判断是否请求public目录下的文件   如果有请求的路径，则将其中的文件加载到页面上
        fs.readFile('.' + url, function (err, data) {
            if (err) {
                console.log('public')
                return console.log(err)
            }
            res.end(data)
        })
    } else if (url ==='/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) {
                console.log('post')
                return console.log(err)
            }
            res.end(data)
        })
    }else if(url === '/pinglun'){
        var remark = parseObj.query;
        remark.datetime = '2018-5-8';
        comment.push(remark);
        console.log('收到请求',JSON.stringify(parseObj.query));
        //如何通过服务器让客户端重定向
        //1、状态码设置为302，临时重定向
        //  statusCode
        //2、在响应头中通过location告诉客户端往哪从定向
        // setHeader
        //如果客户端发现收到的服务器的相应的状态码是302，就会自动去相应头中找location
        //所以就能看到客户端自动跳转
        res.statusCode=302;
        res.setHeader('Location','/');
        res.end()
    }
    else {
        fs.readFile('./views/404.html', function (err, data) {
            if (err) {
                console.log('404')
                return console.log(err)
            }
            res.end(data)
        })
    }

}).listen(3000, function () {
    console.log('监听成功');
})
