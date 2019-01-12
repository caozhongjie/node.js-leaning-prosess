//该路由用来处理新建话题，删除话题，修改话题，查看话题列表等相关接口
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/topic');

var topicSchema = new Schema({
    model:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    response:{
        type:Number,
        required:true,
        default:0
    }
})
module.exports =mongoose.model('Topic',topicSchema);