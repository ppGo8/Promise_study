const fs = require('fs')

// 1.回调函数形式
fs.readFile('./resource/content.txt', (err, data) => {
    if (err) throw err;
    // 除获取数据之外的业务逻辑操作也在回调函数重谢
    console.log('回调函数', data.toString()); 
})

// 2.Promise形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        // 失败
        if (err) reject(err);
        // 成功
        resolve(data)
    })
})

// 调用then;使用then来实现除了获取数据之外即异步任务的其他业务操作
p.then(
    value => {
        console.log('promise', value.toString())
    }, reason => {
        console.log(reason)
    }

)
console.log(1);
