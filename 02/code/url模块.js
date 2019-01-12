var  url = require('url');
//url模块可以直接解析路径以及其中包含的参数，当在后面添加第二个参数true时，则会自动将参数转为对象的形式
var obj =  url.parse('http://localhost:3000/pinglun?name=&message=+++',true);
console.log(obj);