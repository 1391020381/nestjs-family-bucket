* web页面为啥设计成单线程架构
    - 简化设计 来自不同网络请求的不同数据在到达时可能会相互混淆,如果使用多线程,可能会引发复杂的并非组织和同步问题。而将web页面设计为单线程架构,可以在每个时刻只处理一项任务,从而避免了这种复杂性。
    - 避免DOM状态混乱 DOM被设计成一个线程可以在任何时刻访问。如果我们同时运行两个脚本,它们可能会试图同时修改DOM,从而导致意外的结果。而使用单线程,可以防止这种情况发生。

    - 而js 的异步机制(Promise setTimeout 异步函数等) 可以帮助我们处理长时间运行的操作(网络请求),使的我们可以在不阻塞主线程的情况下进行这些操作,有效提高web页面的性能。


# Promise的动机
1. 解决异步编程的问题 
    - 代码逻辑不连续 （页面的事件循环系统 异步回调对编码方式的影响）
    - 封装异步代码    使处理流程变的线性
2. Promsie使用方法
    - Promise对象的构造函数
    - exexutor函数
    - resolve reject函数
    - then catch方法
    
    - excutor 执行成功 会调用 resolve函数 失败 reject函数
    - excutor 函数中调用  resolve 函数 会触发 promise.then 
    - excutor 函数中调用 reject函数时 会触发 promise.catch设置的回调函数

    - Promise 通过调用函数延迟绑定和回调函数返回值穿透的技术,解决了循环嵌套。

    - 因为 resolve的最终调用是由开发者在不确定环境中(往往是在全局中)直接调用的。为了在resolve函数中能够拿到promise实例的值,我们需要对this进行保存,上述代码用self变量记录this,或者使用箭头函数
    - 我们实现的逻辑全是同步的。在上面实例化一个promise的构造函数时,我们是在setTimeout逻辑里才调用resolve,也就是说 2秒之后才会调用 resolve方法,也才会更改promise实例状态。而结合我们的实现,返回实现代码 then方法中的 onfulfilled执行是同步的,它在执行时 this.status 仍然为 pending 并没有做到 2秒中之后再执行 onfulfilled

    - 其实就是 根据 status状态机做不同操作

    - new Promise(function(resolve,reject){})
    - 在异步状态改变时 会调用 resolve reject
    - 在resolve reject 中 会执行改变 status reason status onFulfilledFunc onRejectedFunc
    - 在 then 同步执行中  pending时 将 this.onFulfilledFunc = onfulfilled  this.onRejectedFunc = onrejected  Promise封装的异步状态改变时 会 执行 resolve reject 又会执行 回调
    - new Promise() 执行后  Promise.then也同步执行 并在 status = pending时 添加回调函数  此回调函数会在 封装的异步状态改变时被触发。 （要注意 回调时 微任务执行）
3. Promise消灭嵌套调用和多次错误处理
    - 嵌套调用 消灭嵌套调用  回调函数的延时绑定 回调函数返回值穿透
    - 多次错误处理  合并多个任务的错误处理  Promsie错误的 冒泡 性质

4. Promise与微任务
    - Promise中引入微任务的原因
    - Promise中微任务的应用

5. 思考问题 
    - Promise中微任务的引入原因
    - 回调函数返回值穿透的实现
    - Promise出错后异常的 冒泡 传递            

# Promise化一个API

```
const promisify = fn => args => 
  new Promise((resolve, reject) => {
    args.success = function(res) {
      return resolve(res)
    }
    args.fail = function(res) {
      return reject(res)
    }
  })

const promisify = function(fn){
    return function (args){
         new Promise((resolve, reject) => {
    args.success = function(res) {
      return resolve(res)
    }
    args.fail = function(res) {
      return reject(res)
    }
  })
    }
}
```

* 通过 Promise的使用 猜测 Promise的具体实现。
* Promise  then() onfulfilled onrejected 
* status 
* Promise状态具有凝固性
* Promise错误处理
* Promise实例添加多个then处理

# async/await
* 提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力,并且使的代码逻辑更加清晰。


