
exports.a = 'hello';

console.log(exports === module.exports) //true 此时指向同一个地址
exports = 'world';//此时exports指向了一个新的地址
exports.b = 'hello world';//定义了新的值和原先的module.exports已无关系
console.log(exports === module.exports)//false
//因为最后返回的值是modu le.exports,所以引入本文件的地方，无法使用b的值


//可以按照以下方式理解导出exports
// 在node中，每个模块内部都有一个自己的module对象，
// 该module对象中，有一个成员叫export也是一个对象
//如果需要对象导出成员，只需把导出的挂载到module.exports中

//发现，每次导出接口成员时候都通过module.exports的方式导出成员太麻烦
//为了简化操作，专门提供了module.exports = exports
// var module = {
//     exports:{
//
//     }
// }

// 谁来require我，module.exports
// 默认在代码的最后有一句
// return module.exports






