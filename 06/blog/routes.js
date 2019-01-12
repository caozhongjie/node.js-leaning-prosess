var express = require('express');
var User = require('./models/user') //用户相关数据库
var Topic = require('./models/topic')//发起话题相关数据库
var Remark = require('./models/remark')
var router = express.Router();



//首页
router.get('/', function (req, res) {
    if (req.query.model == null || req.query.model == undefined || req.query.model == 0) {
        Topic.find(function (err, ret) {
            if (err) {
                console.log('查询失败')
            } else {
                if(req.query.title){
                    var searchResult=[]
                    for(var i=0;i<ret.length;i++){
                        if(ret[i].title.indexOf(req.query.title)>-1){
                            searchResult.push(ret[i])
                        }
                    }
                    ret = searchResult
                }
                res.render('index.html', {
                    user: req.session.user,
                    topicList: ret,
                    model:req.query.model
                })
            }
        })
    } else {
        Topic.find({model: req.query.model}, function (err, ret) {
            if (err) {
                console.log('查询失败')
            } else {
                if(req.query.title){
                    var searchResult=[]
                    for(var i=0;i<ret.length;i++){
                        if(ret[i].title.indexOf(req.query.title)>-1){
                            searchResult.push(ret[i])
                        }
                    }
                    ret = searchResult
                }
                res.render('index.html', {
                    user: req.session.user,
                    topicList: ret,
                    model:req.query.model
                })
            }
        })
    }
})
//跳转到登录页面
router.get('/login', function (req, res) {
    res.render('login.html')
})
//退出当前账号
router.get('/logout', function (req, res) {
    //清除session
    req.session.user = null;
    //重定向到登录页
    res.redirect('/login')
})
//登录页面登录
router.post('/login', function (req, res, next) {
    //1、获取表单数据
    //2、查询数据库用户名密码是否正确
    //3、发送响应数据
    var body = req.body;
    User.findOne({
        email: body.email,
        password: body.password
    }, function (err, user) {
        if (err) {
            next(err)
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者密码错误 '
            })
        }
        req.session.user = user;
        res.status(200).json({
            err_code: 0,
            message: '登录成功'
        })
    })


})
//登录判定
router.post('*',function (req,res,next) {
    if(req.session.user==null || req.session.user==undefined || !req.session.user){
        return res.status(200).json({
            err_code:7,
            message:'请先登录'
        })
    }else{
        next()
    }
})

//跳转到注册页面
router.get('/register', function (req, res) {
    res.render('register.html')
})
//注册账号
router.post('/register', function (req, res, next) {
    User.findOne({
        $or: [
            {
                email: req.body.email
            },
            {
                nickname: req.body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            next(err)
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者昵称已存在'
            })
        }
        new User(req.body).save(function (err, ret) { //ret就是插入的值
            if (err) {
                return console.log('保存失败')
            } else {
                req.session.user = ret
                res.status(200).json({
                    err_code: 0,
                    message: 'ok'
                })
            }
        })
        //Express提供了一个响应方法：json
        //改方法接收一个对象作为参数，它会自动帮你把对象转化成字符串再发送给浏览器
    })
})

//跳转到新的话题页面
router.get('/topics/new', function (req, res) {
    res.render('./topic/new.html', {
        user: req.session.user
    })
})
//将数据传到数据库topic
router.post('/newtopic', function (req, res) {
    console.log('comming')
    Topic.findOne({
        $or: [
            {
                title: req.body.email
            }
        ]
    }, function (err, data) {
        if (err) {
            next(err)
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '标题已存在'
            })
        }
        new Topic(req.body).save(function (err, ret) { //ret就是插入的值
            if (err) {
                return console.log('保存失败')
            } else {
                res.status(200).json({
                    err_code: 0,
                    message: 'ok'
                })
            }
        })
        //Express提供了一个响应方法：json
        //改方法接收一个对象作为参数，它会自动帮你把对象转化成字符串再发送给浏览器
    })
})

router.get('/settings/profile', function (req, res) {
    res.render('./settings/profile.html', {
        user: req.session.user
    })
})

router.get('/settings/admin', function (req, res) {
    res.render('./settings/admin.html',{
        user:req.session.user
    })
})
//跳转到评论列表页面
router.get('/topics/show', function (req, res) {
    Topic.find({_id: req.query.id}, function (err, ret) {
        if (err) {
            console.log('查询失败')
        } else {
            Topic.findByIdAndUpdate(req.query.id, {
                views: ret[0].views + 1
            }, function (err, result) {
                if (err) {
                    console.log('更新失败')
                } else {
                    Remark.find({pid: req.query.id}, function (err, result) {
                        if (err) {
                            return console.log(err)
                        }
                        res.render('./topic/show.html', {
                            user: req.session.user,
                            detail: ret,
                            remarkList: result  //查询出来的值传入前端
                        })
                    })
                }
            })
        }
    })
})
//提交评论
router.post('/remark', function (req, res, next) {
    req.body.nickname = req.session.user.nickname
    new Remark(req.body).save(function (err, ret) { //ret就是插入的值
        if (err) {
            return console.log(err)
        } else {
            Remark.find({pid: req.body.pid}, function (err, ret) {
                if (err) {
                    return console.log(err)
                }
                Topic.findByIdAndUpdate(req.body.pid, {
                    response: ret.length
                }, function (err, result) {
                    if (err) {
                        console.log('更新失败')
                    } else {
                        Remark.find({pid: req.query.id}, function (err, result) {
                            if (err) {
                                return console.log(err)
                            }
                            res.status(200).json({
                                err_code: 0,
                                message: 'ok'
                            })
                        })
                    }
                })
            })
        }
    })
})
//修改个人信息
router.post('/personMessage', function (req, res, next) {
    var body = req.body;
    var user= req.session.user
    User.findByIdAndUpdate(user._id,{
        nickname:body.nickname,
        bio:body.bio,
        gender:body.gender,
        birthday:body.birthday
    },function (err,ret) {
        if(err){
            res.status(500).json({
                err_code:1,
                message:'修改失败'
            })
        }else{
            req.session.user = ret;
            res.status(200).json({
                user: req.session.user,
                err_code:0,
                message:'修改成功'
            })
        }
    })
})
//修改个人密码
router.post('/changePassword', function (req, res, next) {
    var body = req.body;
    var user= req.session.user;
    User.findOneAndUpdate({_id:user._id,password:body.currentPassword},{
        password:body.newPassword
    },function (err,ret) {
        if(err){
            res.status(500).json({
                err_code:1,
                message:'修改失败'
            })
        }else{
            if(!ret){
                res.status(200).json({
                    user: req.session.user,
                    err_code:2,
                    message:'账号密码错误'
                })
            }else{
                req.session.user = ret;
                res.status(200).json({
                    user: req.session.user,
                    err_code:0,
                    message:'修改成功'
                })
            }
        }
    })
})
//注销当前账号
router.get('/delete',function (req,res,next) {
    console.log(req.session.user._id)
    User.remove({_id:req.session.user._id},function (err,ret) {
        if(err){
            next(err)
        }
        req.session.user=null;
        res.redirect('/')
    })

})
//点赞
router.get('/goodNum',function (req,res,next) {
   Remark.find({_id:req.query.goodNum},function (err,ret) {
       if(err){
           next(err)
       }
       Remark.findByIdAndUpdate(req.query.goodNum,{
           good:ret[0].good+1
       },function (err,result) {
           if(err){
               console.log('更新失败')
           }else{
               res.redirect('/topics/show?id='+req.query.pid)
           }
       })

   })

})


module.exports = router;