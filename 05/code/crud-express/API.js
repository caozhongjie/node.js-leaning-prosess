//将数据的增擅查改进行封装      通过数据库来保存信息
var fs = require('fs');
var dbPath = './db.json';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//连接数据库
mongoose.connect('mongodb://localhost/students');
//设计表
var blogSchema = new Schema({
    name: String,
    gender: String,
    age: String,
    hobbies: String
})
var User = mongoose.model('User', blogSchema);
//查找
exports.find = function (callback) {
    User.find(function (err, ret) {
        if (err) {
            console.log('查询失败')
        } else {
            callback(null, ret)
        }
    })
}
//新增
exports.save = function (student, callback) {
    var admin = new User({
        name: student.name,
        gender: student.gender,
        age: student.age,
        hobbies: student.hobbies
    })

    admin.save(function (err, ret) {
        if (err) {
            console.log('保存失败')
        } else {
            console.log('保存成功')
            console.log(ret)
            callback(null)
        }
    })


    // fs.readFile(dbPath, "utf8", function (err, data) {
    //     if (err) {
    //         return callback(err)
    //     }
    //     var students = JSON.parse(data).students;
    //     if (student.id) { //判断当前是在修改还是在新增
    //         for (var i = 0; i < students.length; i++) {
    //             if (students[i].id == student.id) {
    //                 students[i] = student;
    //             }
    //         }
    //     } else {
    //         student.id = students.length + 1;
    //         students.push(student);
    //     }
    //     var ret = JSON.stringify({
    //         students: students
    //     })
    //     fs.writeFile('./db.json', ret, function (err, data) {
    //         if (err) {
    //             return callback(err)
    //         }
    //         callback(null)
    //     })
    // })
}
//删除
exports.delete = function (id, callback) {
    User.remove({_id: id}, function (err, ret) {
        if (err) {
            console.log('删除失败')
        } else {
            console.log(ret)
            callback(null)
        }
    })
}
//点击change时将查询出来的数据返回
exports.change = function (id, callback) {
    User.find({_id:id},function (err, ret) {
        if (err) {
            console.log('查询失败')
        } else {
            console.log('查询成功111')
            callback(null,ret)
        }
    })
}
exports.update = function (id,student, callback) {
    //暂时不太清楚为什么传到模板上的ID多了两个引号，自己在这边手动去除引号
    id= id.slice(1)
    id = id.substr(0,id.length-1)
    User.findByIdAndUpdate(id,student,function (err,ret) {
        if(err){
            console.log('更新失败')
            callback(err)
        }else{
            console.log('更新成功')
           callback(null)
        }
    })
}
