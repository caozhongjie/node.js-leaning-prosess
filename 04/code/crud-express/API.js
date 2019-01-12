//将数据的增擅查改进行封装
var fs = require('fs');
var dbPath = './db.json';
var mongoose = require('mongoose');
var Schema = mongoose.Schema
//查找
exports.find = function (callback) {
    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, data)
    })
}
//新增
exports.save = function (student, callback) {
    fs.readFile(dbPath, "utf8", function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students;
        if (student.id) { //判断当前是在修改还是在新增
            for (var i = 0; i < students.length; i++) {
                if (students[i].id == student.id) {
                    students[i] = student;
                }
            }
        } else {
            student.id = students.length + 1;
            students.push(student);
        }
        var ret = JSON.stringify({
            students: students
        })
        fs.writeFile('./db.json', ret, function (err, data) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
//删除
exports.delete = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var detail = JSON.parse(data)
        for (var i = 0; i < detail.students.length; i++) {
            if (id == detail.students[i].id) {
                detail.students.splice(i, 1) //查询到数组中对应的ID的数据  删除数据
            }
        }
        for (var i = 0; i < detail.students.length; i++) {
            detail.students[i].id = i + 1; //将数组中的数据的ID进行重新编写
        }

        detail = JSON.stringify(detail);
        fs.writeFile(dbPath, detail, function (err, data) {
            if (err) {
                return callback(err)
            }
            callback(err)
        })
    })


}
//更新
exports.update = function (id, callback) {
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var detail = JSON.parse(data)
        for (var i = 0; i < detail.students.length; i++) {
            if (id == detail.students[i].id) {
                var student = {
                    "id": detail.students[i].id,
                    "name": detail.students[i].name,
                    "gender": detail.students[i].gender,
                    "age": detail.students[i].age,
                    "hobbies": detail.students[i].hobbies
                }
            }
        }
        callback(null, student)

    })

}