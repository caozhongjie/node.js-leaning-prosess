var  template = require('art-template');
var  fs = require('fs');
var http=require('http');
var server = http.createServer();
server.on('request',function (req,res) {
    var html;
    fs.readFile('./art-template.html',function (err,data) {
        if(err){
            console.log(err)
        }else{
            //默认读取道德data是二进制数据
            //而模板引擎的render方法需要接收的是字符串
            html=data.toString();
            //render会将其中的name把html中的{{name}}替换
            var result =  template.render(html,{
                name:'jack'
            })
            res.setHeader('Content-Type','text/html;charest=utf-8');
            res.end(result)
        }
    })
})

server.listen(3000,function () {
    console.log('jianting')
})





