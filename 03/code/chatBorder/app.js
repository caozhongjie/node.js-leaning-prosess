var  express = require('express');
var app = express();

//当以/public/开头的时候，去./public/ 目录中找找对应的资源
//app.use('/public/',express.static('./public'))
// http://localhost:3000/public/login.html  (此时请求文件的方式)


//当省略第一个参数的时候，则可以通过省略/public的方式来区别
// app.use(express.static('./public'))
//http://localhost:3000/login.html  (此时请求文件的方式。省略了/public)


//当以/public/开头的时候，去./public/ 目录中找找对应的资源
//a 称为统一资源定位符，代表的是express.static('./public')中/public目录的名称
app.use('/a/',express.static('./public'))
//http://localhost:3000/a/login.html  (用a代替了/public ，代表起另一个名称)



// app.get('/',function (req,res) {
//     console.log(req)
//     res.send('res success nodemon')
// })

app.listen(3000,function () {
    console.log('监听成功')
})