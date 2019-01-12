var fs = require('fs');

//在ES6中新增了一个API promise
//promise是一个构造函数

//创建promise容器
//promise容器一旦创建，就开始执行里面的
//promise容器一旦创建，就开始执行里面的代码
var p1 =  new Promise(function (resolve,reject) {
    fs.readFile('./data.json','utf8',function (err,data) {
        if(err){
            //承诺容器中的任务失败了
            //把容器中的pending状态变为rejected
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //将容器的pending状态变为resolved
            //也就是说这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})
var p2 =  new Promise(function (resolve,reject) {
    fs.readFile('./data.json','utf8',function (err,data) {
        if(err){
            //承诺容器中的任务失败了
            //把容器中的pending状态变为rejected
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //将容器的pending状态变为resolved
            //也就是说这里调用的resolve方法实际上就是then方法传递的那个function
            console.log('success')
            resolve(data)
        }
    })
})


var p3 =  new Promise(function (resolve,reject) {
    fs.readFile('./data.json','utf8',function (err,data) {
        if(err){
            //承诺容器中的任务失败了
            //把容器中的pending状态变为rejected
            reject(err)
        }else{
            //承诺容器中的任务成功了
            //将容器的pending状态变为resolved
            //也就是说这里调用的resolve方法实际上就是then方法传递的那个function
            resolve(data)
        }
    })
})




//p1就是那个promise
//当p1成功了，然后做指定的操作
//then方法接收的function就是容器中的resolve函数
//上面的p1内部调取文件成功了就调第一个，失败的话就调用第二个函数
p1
    .then(function (data) { //上面执行成功时调用，并且将参数传递过来
    console.log(data)
    //当p1读取成功的时候，
    //当前函数中的return的结果就可以在后面的then中function接收到
    //当return 123后面就可以接收到123
    //当我们return一个Promise对象的时候，后续的then 中的方法的第一个参数会作为返回的这个promise对象resolve，
    //第二个参数为返回的这个 promise对象的reject
    return p2;
},function (err) {//上面执行失败时调用
    console.log('读取文件失败时调用')
    console.log(err)
})
    .then(function (p2data) {
        console.log('p2data',p2data)
        return p3;
    },function (err) {
        console.log('p2err',err)
        return p3;
    })
    .then(function (p3data) {
        console.log('p3data',p3data)
    },function (err) {
        console.log('p3err',err)
    })




