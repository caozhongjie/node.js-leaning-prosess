var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/user');

var userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_time:{
        type:Date,
        //获取当前时间的时间戳 ，不要写Date.now() ,，因为会立即调用，即刚执行文件就会调用，时间是刚刚初始化的时间
        //这里使用的是Date.now，当new_Model的时候，如果没有传递create_time字段值时，则会自动调用date.now()
        //将当前时间作为默认值
        default:Date.now
    },
    last_modified_time:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'/public/img/avatar-max-img.png'
    },
    bio:{
        type:String,
        default:''
    },
    gender:{
        type:Number,
        enum:[0,1,2],
        default:0
    },
    birthday:{
        type:String,
        default:''
    },
    status:{
        type:Number,
        //是否可以评论，是否可以登录使用 0代表没有权限设置，1不可以评论，2不可以登录
        enum:[0,1,2],
        default:0
    }

})
module.exports =mongoose.model('User',userSchema);