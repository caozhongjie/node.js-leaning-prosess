var  express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use('/public/',express.static('./public/'))
app.use('/views/',express.static('./views/'))

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
//配置使用art-template模板引擎
//第一个参数表示，当渲染以 .art 结尾的文件时候，使用art-template模板引擎
// 当想要使用其他格式的文件时，可直接修改app.engine('html', require('express-art-template'));,这样就会自动识别html文件
//express-art-template是专门用来在express中把art-template整合到express中的
//虽然外面不需要加载art-template,但是也必须装
//原因在于express-art-template依赖了art-template
//app.engine('art', require('express-art-template'));

// 修改文件格式以便编辑器可以识别
app.engine('html', require('express-art-template'));

//express为response相应对象提供了一个方法，render
//render方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
//res.render('html模板名'，{模板数据})
//第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
//也就是说express有一个约定，开发人员把虽有的视图文件都放在views目录中
//如果想要修改默认的目录views ，则app.set('views',render函数的新的默认路径)

//配置body-parser中间件（插件，专门用来解析表单POST请求体）
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',function (req,res) {
    res.render('index.html',{
        comment:comment
    })
})


app.get('/post',function (req,res) {
    console.log(req.query)
    res.render('post.html')
})
app.post('/post',function (req,res) {
    console.log(req.body)
    var  list = {
        name:req.body.name,
        message:req.body.message,
        datetime:'2018-5-6'
    }
  comment.push(list)
    res.redirect('/')
})



app.listen(3000,function () {
    console.log('3000 is running')
})