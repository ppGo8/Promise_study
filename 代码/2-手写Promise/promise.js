// 1.声明构造函数
// 此处声明了一个Promise,会覆盖浏览器提供的全局Promise
// 后面的页面中调用的就是这个Promise
function Promise(executor) {
    // executor(resolve,reject)想要使用resolve,reject,就必须先定义
    // 函数调用时，传递的实参必须是有定义的；
    // 函数声明时，声明形参其实就是定义的过程，代码之前课没有

    // 构造函数给实例对象添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callbacks = []   // 数组形式，因为后面可能.then调用多次，因此可能需要保留多个回调函数
    // 当一个函数作为参数传递给其他函数时，其运行的上下文环境就会发生变化
    // 没有直接被某个对象调用的函数，其上下文环境都是全局对象
    const self = this

    // resolve函数
    function resolve(data) {
        // 判断状态,确保只能修改一次
        if (self.PromiseState !== 'pending') return
        // 1) 修改对象的状态 promiseState
        self.PromiseState = 'fulfilled'
        // 2) 修改对象结果只 promistResult
        self.PromiseResult = data
        // console.log('@this', this);
        // console.log('@self', self);
        // 异步任务调用成功的回调函数
        // 此处有判断含义：callback函数未执行，那么在此处执行
        // 这里是第一种执行顺序：先指定回调函数，然后改变状态，之后执行回调函数（因为promise里面写了异步任务）
        // 第二种执行顺序是简单的：改变状态，指定回调函数，调用回调函数
        // if (self.callback.onResolved) { // 这种方法只能绑定一个回调函数，后面回调函数会覆盖前面的回调函数
        //     self.callback.onResolved(data)
        // }
        if (self.callbacks) {
            self.callbacks.forEach((item) => {
                item.onResolved(data)
            })
        }

    }
    // reject函数
    function reject(data) {
        // 判断状态,确保只能修改一次
        if (self.PromiseState !== 'pending') return
        self.PromiseState = 'rejected'
        self.PromiseResult = data
        if (self.callbacks) {
            self.callbacks.forEach((item) => {
                item.onRejected(data)
            })
        }
    }

    // 同步调用执行器函数
    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
};


// 2.添加then方法
// then需要写在Promise的原型对象上,JS中只有对象方法才能写成 a.xxx()的形式
// 不能单独写成function then() {}的形式，因为这种方法没办法写成a.xxx的形式
Promise.prototype.then = function (onResolved, onRejected) {
    // then方法由Promise的对象调用
    if (this.PromiseState === 'fulfilled') {
        onResolved(this.PromiseResult);
    }
    if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult);
    }
    // 判断pendding状态
    if (this.PromiseState === 'pending') {
        this.callbacks.push(
            {
                onResolved: onResolved,
                onRejected: onRejected,
            }
        )
    }
}