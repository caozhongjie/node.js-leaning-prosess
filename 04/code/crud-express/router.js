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
        var students = JSON.parse(data).students
        for (var i = 0; i < students.length; i++) {
            students[i].id = i + 1;
        }
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
//信息填写完毕后将数据写进json数据文件中 （新增）
router.post('/students', function (req, res) {
    var stuList = 0;
    var date = req.body;//保存post传递过的数据
    //将获取到的值保存起来
    var student = {
        "id": '',
        "name": date.name,
        "gender": date.gender,
        "age": date.age,
        "hobbies": date.hobbies
    }
    if (date.id) {
        student.id = date.id
    }
    API.save(student, function (err) {
        if (err) {
            return console.log(err)
        }
        res.redirect('/');
    })
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return console.log(data)
    //     }
    //     var detail = JSON.parse(data)
    //     stuList = detail.students.length//获取当前数据文件数组的长度 以便自己加上ID 的值
    //     var date = req.body;//保存post传递过的数据
    //     //将获取到的值保存起来
    //     var student = {
    //         "id": stuList + 1,
    //         "name": date.name,
    //         "gender": date.gender,
    //         "age": date.age,
    //         "hobbies": date.hobbies
    //     }
    //     //判断是否有ID传递过来，如果有则替换相应位置的值，如果没有，则表示为新增数据，此时直接在数组后添加数据
    //     if (date.id) {
    //         for (var i = 0; i < detail.students.length; i++) {
    //             if (detail.students[i].id == date.id) {
    //                 student.id = date.id;
    //                 detail.students[i] = student;
    //             }
    //         }
    //     } else {
    //         detail.students.push(student);
    //     }
    //     detail = JSON.stringify(detail);
    //     fs.writeFile('./db.json', detail, function (err, data) {
    //         if (err) {
    //             return console.log(err)
    //         }
    //         console.log('文件保存成功');
    //         res.redirect('/')
    //     })
    //
    // })
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

//修改信息
router.get('/change', function (req, res) {
    API.update(req.query.id, function (err, data) {
        if (err) {
            return console.log(err)
        }
        res.render('increase.html', {
            id: data.id,
            name: data.name,
            gender: data.gender,
            age: data.age,
            hobbies: data.hobbies
        })
    })


    // chnageId = req.query.id //点击修改时传递过来的ID
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return console.log(data)
    //     }
    //     var detail = JSON.parse(data)
    //     for (var i = 0; i < detail.students.length; i++) {
    //         if (chnageId == detail.students[i].id) {
    //             var id = detail.students[i].id;
    //             var name = detail.students[i].name;
    //             var gender = detail.students[i].gender;
    //             var age = detail.students[i].age;
    //             var hobbies = detail.students[i].hobbies;
    //         }
    //     }
    //     res.render('increase.html', {
    //         id: id,
    //         name: name,
    //         gender: gender,
    //         age: age,
    //         hobbies: hobbies
    //     })
    //
    // })

})

module.exports = router;