# errorhandling

## 仅使用内建的错误对象

- 使用 Node.js 的内置错误对象有助于在你的代码和第三方之间保持一致性,它还保留了重要信息,例如 StackTrace。
- 当引发异常时,给异常附加上下文属性(如错误名称和相关的 HTTP 错误码) 通常是一个好的习惯。 要实现这种一致性和实践,请考虑使用附加属性扩展错误对象。

```
// 从 node错误派生的集中错误对象

function appError(name,httpCode,decription,isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    // ... 在这赋值其他属性
}
appError.prototype = Object.create(Error.prototype);
appError.prototype.constructor = appError;

module.exports.appError = appError;


// ES6

class AppError extends Error {
  constructor(name, httpCode, description, isOperational) {
    super(description);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;


```

## 区分运行错误和程序设计错误

- 运行错误 (例如 API 接受一个无效的输入) 指的是一些已知场景下的错误，这类错误的影响已经完全被理解，并能被考虑周全的处理掉。
- 同时 程序设计错误(例如 尝试读取未定义的变量) 指的是未知的编码问题 影响到应用的重启。

- 区分操作类型错误 和程序类型错误
- 区分以下两种错误类型将最大限度地减少应用程序停机时间并帮助避免出现荒唐的错误。

  - 操作型错误指的是 您了解发生了什么情况及其影响的情形。
    - 例如 由于连接错误而导致对某些 HTTP 服务的查询失败的问题。
  - 程序型错误指的是您不知道原因,有时是错误不知道来自何处的情况 可能是一些代码试图读取未定义的值或 DB 连接池内存泄漏。

  - 操作型错误相对容易处理 通常记录错误就足够了
  - 程序型错误出现 事情变的难以应付,应用程序可内处于不一致的状态,你可以做的 没有什么比优雅的重新启动更好了。

## 集中处理错误 通过但不是在中间件里处理错误

```
// DAL层 在这里我们不处理错误

DB.addDocument(newCustomer,(error,result)=>{
    if (error) {
        throw new Error("Great error explanation comes here",other useful parameters)
    }
})

// API路由代码 我们同时捕获异步和同步错误 并转到 中间件

try {
    customersService.addNew(req.body).then(function (result){
        res.status(200).json(result)
    }).catch(error=>{
        next(error)
    })
}catch(error){
    next(error)
}

// 错误处理中间件 委托集中错误处理程序 处理错误

app.use(function (err,req,res,next) {
    errorHandler.handleError(err).then(isOperationalError=>{
        if(!isOperationalError){
            next(err)
        }
    })
})

```

## 特殊情况产生时,优雅地退出服务

```
//收到未捕获的异常时，决定是否要崩溃
//如果开发人员标记已知的操作型错误使用：error.isOperational=true， 查看最佳实践 #3
process.on('uncaughtException', function(error) {
 errorManagement.handler.handleError(error);
 if(!errorManagement.handler.isTrustedError(error))
 process.exit(1)
});


//封装错误处理相关逻辑在集中的错误处理中
function errorHandler(){
 this.handleError = function (error) {
 return logger.logError(err).then(sendMailToAdminIfCritical).then(saveInOpsQueueIfCritical).then(determineIfOperationalError);
 }

 this.isTrustedError = function(error)
 {
 return error.isOperational;
 }


```

# 使用成熟的 logger 提高错误可见性

- 日志层级 JSON ELK

# 捕获未处理的 promise rejecttions

- 永远不要忘记在每一个 promise 链式调用中添加 .catch 语句,并重定到一个集中的错误处理程序。
- 然而 只在开发人员的规程上构建错误处理策略是有些脆弱的。 因此 使用一个优雅的回调并添加到 process.on("unhandlerejection",callback) 确保任何 promise 错误 如果不是本地处理 将在这里处理。

```
process.on("unhandleRejection",(reason,p)=>{
    // 未处理的 promise rejection
    throw reason
})

process.on("uncaughtException",(error)=>{
    // 未被处理的错误 现在处理它 并决定是否需要重启应用
    errorManagement.handler.handleError(error);
    if(!errorManagement.handler.isTrustedError(error)){
        process.exit(1)
    }
})

```

## 当一个文件夹开发库/模块,放置一个文件 index.js 暴露模块的内部 ，这样每个消费者都会通过它。 这将作为模块的一个接口,并使为了的变化简单而不违反规则。

```

  // 建议
  module.exports.SMSProvider = require('./SMSProvider');
  module.exports.SMSNumberResolver = require('./SMSNumberResolver');

  // 避免
  module.exports.SMSProvider = require('./SMSProvider/SMSProvider.js');
  module.exports.SMSNumberResolver = require('./SMSNumberResolver/SMSNumberResolver.js');

```
