- Nest 把 Middleware做成class 为了依赖注入
- 通过 @Inject注入 AppService 到 middleware里
- 构造函数注入
- 属性注入

* middleware 里有个next参数 调用下一个 middleware
* Nest还有个 @Next装饰器 调用下一个handler

# Nest的 middleware 和 interceptor都是在请求前后加入一些逻辑的 这两个的区别

1. interceptor 是能从 ExecutionContext 里拿到目标 class 和 handler，进而通过 reflector 拿到它的 metadata 等信息的，这些 middleware 就不可以。
2. 再就是 interceptor 里是可以用 rxjs 的操作符来组织响应处理流程的
3. interceptor 更适合处理与具体业务相关的逻辑，而 middleware 适合更通用的处理逻辑。
