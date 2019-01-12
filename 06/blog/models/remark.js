var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/remark');

var remarkSchema = new Schema({
    pid:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    remarkContent:{
        type:String,
        required:true
    },
    ramarkTime:{
        type:Date,
        default:Date.now
    },
    good:{
        type:Number,
        default:0
    }
})
module.exports =mongoose.model('remark',remarkSchema);