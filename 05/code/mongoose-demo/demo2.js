var mongoose = require('mongoose');

var Schema = mongoose.Schema

//1连接数据库
//指定连接的数据库不需要存在，当插入第一条数据后就会被自动创建出来
//约束的目的是为了保证数据的完整性，不要有脏数据
mongoose.connect('mongodb://localhost/itcast');

//2设计集合结构（表结构）
//字段名称就是表结构中的属性名称
var blogSchema = new Schema({
    username:String,
    password:String,
    email:String
})

//3、将文档结构发布为模型
//mongoose.model方法就是用来将一个架构发布为model
//第一个参数：传入一个大写名词单数字符用来表示你的数据库名称
//mongoose会自动将大写名词的字符串生成小写复数的集合名称
//例如这里会将User装变为users 集合名称
//第二个参数就是架构Schema
//返回值：模型构造函数
var User = mongoose.model('User',blogSchema);

//4、当有了模型构造函数后，就可以操作users这个集合的数据


//新增数据
var admin =  new User({
    username:'admin666',
    password:'12345666688',
    email:'6666688@coayu.com'
})
//
// //向数据库中新增数据
// admin.save(function (err,ret) {
//     if(err){
//         console.log('保存失败')
//     }else{
//         console.log('保存成功')
//         console.log(ret)
//     }
// })


//查询所有数据
//  User.find(function (err,ret) {
//      if (err){
//          console.log('查询失败')
//      }else{
//          console.log('success')
//          console.log(ret)
//      }
//  })
//根据条件查询   如果只查一条数据，则使用findOne方法进行查询
// User.find({username:'admin666'},function (err,ret) {
//     if(err){
//         console.log('error')
//     }else{
//         console.log(ret)
//     }
// })


//删除数据
// User.remove({username:'admin'},function (err,ret) {
//     if(err){
//         console.log('删除失败')
//     }else{
//         console.log('删除')
//         console.log(ret)
//     }
// })


//更新数据  第一个参数传递的是要改的对象的ID，第二个参数是要修改的字段值，第三个参数是回调
    User.findByIdAndUpdate('5c2474e24a630514b47d245d',{
        password:'123'
    },function (err,ret) {
        if(err){
            console.log('更新失败')
        }else{
            console.log('更新成功')
            console.log(ret)
        }
    })



