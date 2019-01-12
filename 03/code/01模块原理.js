
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






