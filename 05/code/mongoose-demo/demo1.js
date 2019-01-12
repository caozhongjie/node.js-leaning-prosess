const mongoose = require('mongoose');

//连接mongodb数据库
mongoose.connect('mongodb://localhost/test');

//创建一个模型，就是在设计数据库
//mongodb是动态的,只需在代码中设计数据库就行
const Cat = mongoose.model('Cat', { name: String });

//实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));