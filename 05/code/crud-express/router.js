//专门用来处理路由
var fs = require('fs')
var express = require('express');
var router = express.Router();
var label = [
    {
        label: '标签1'
    }, {
        label: '标签2'
    }, {
        label: '标签3'
    }
]
var API = require('./API')
//查询处所有文件
router.get('/', function (req, res) {
    //readFile第二个参数是可选的fs.readFile(path[, options], callback)  ,
    //传入utf8就是告诉它把读取到的文件按照utf8编码
    API.find(function (err, data) {
        if (err) {
            res.status(500).send('server error')
            return;
        }
        var students = data;
        console.log('&&&&');
        console.log(students)
        res.render('index.html', {
            label: label,
            students: students
        })
    })


    // fs.readFile('./db.json', "utf8", function (err, data) {
    //     if (err) {
    //         res.status(500).send('server error')
    //         return;
    //     }
    //     //文件中读取的数据一定是字符串
    //     //所以在使用时要手动转化成对象
    //     var students = JSON.parse(data).students
    //     for (var i = 0; i < students.length; i++) {
    //         students[i].id = i + 1;
    //     }
    //     res.render('index.html', {
    //         label: label,
    //         students: students
    //     })
    // })
})
//跳转到新增页面
router.get('/increase', function (req, res) {
    res.render('increase.html')
})
//（新增）
router.post('/students', function (req, res) {
    var stuList = 0;
    var date = req.body;//保存post传递过的数据
    console.log(date)
    var student = {
        "name": date.name,
        "gender": date.gender,
        "age": date.age,
        "hobbies": date.hobbies
    }

    //判断当前是否有ID传递过来，如果有则为修改已经有的值，否则为新增
    if (date.id) {
        API.update(date.id, student, function (err) {
            if (err) {
                return console.log('修改失败')
            } else {
                res.redirect('/');
            }
        })
    } else {
        API.save(student, function (err) {
            if (err) {
                return console.log(err)
            }
            res.redirect('/');
        })
    }
})

//删除信息
router.get('/delete', function (req, res) {
    API.delete(req.query.id, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('删除成功');
        res.redirect('/');
    })
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return console.log(data)
    //     }
    //     var detail = JSON.parse(data)
    //     for (var i = 0; i < detail.students.length; i++) {
    //         if (req.query.id == detail.students[i].id) {
    //             detail.students.splice(i, 1) //查询到数组中对应的ID的数据  删除数据
    //         }
    //     }
    //     for (var i = 0; i < detail.students.length; i++) {
    //         detail.students[i].id = i + 1; //将数组中的数据的ID进行重新编写
    //     }
    //
    //     detail = JSON.stringify(detail);
    //     fs.writeFile('./db.json', detail, function (err, data) {
    //         if (err) {
    //             return console.log(err)
    //         }
    //         console.log('删除成功');
    //         res.redirect('/');
    //     })
    // })

})

//点击修改时，将查询出来的值填充到index.html文件中
router.get('/change', function (req, res) {
    API.change(req.query.id, function (err, data) {
        if (err) {
            return console.log(err)
        }
        var id = data[0]._id;
        res.render('increase.html', {
            id: id,
            name: data[0].name,
            gender: data[0].gender,
            age: data[0].age,
            hobbies: data[0].hobbies
        })
    })
})

module.exports = router;