//封装promise版本的readfire API

var fs = require('fs');

function pReadfire(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadfire('./data.json')
    .then(function (data) {
        console.log(data);
        return pReadfire('./data.json') //返回新的promise对象，这样既可重复调用
    })
    .then(function (data) {
        console.log(data);
        return pReadfire('./data.json')
    })
    .then(function (data) {
        console.log(data);
        return pReadfire('./data.json')
    })