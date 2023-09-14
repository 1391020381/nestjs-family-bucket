1. Controllers
2. Providers
3. Modules
4. Middleware
5. Exception filters
6. Pipes
7. Guards
8. Interceptors
9. Custom decorators

10. 方法装饰器
11. 自定义参数装饰器

# ExecutionContext：切换不同上下文

## Exception Filter

1. exception
2. host: ArgumentsHost

## Guard

1. context: ExecutionContext

- ExecutionContext 是 ArgumentHost 的子类 拓展了 getClass gethandler

# Provider

- provider 一般都是用 @Injectable 修饰的 class。

* 通过 provide 指定注入的 token 通过 useClass 指定注入的对象的类,Nest 会自动对它做实例化再注入。
* 相比之下 用 class 做 token 可以省去 @Inject 比较简便

* useClass useValue

* 构造函数 注入 属性注入

# Execution context

1. ArgumentsHost and ExecutionContext

# redis

- sample https://github.com/nestjs/nest/tree/master/sample

# versioning

- Task scheduling
- 注意，在 NestJS 9 中，由于 Cron 类使用 Node.js 的内置定时器实现，因此没有提供任何方法来停止或获取正在运行的定时任务的状态。因此，在上述控制器中，我们无法停止或获取正在运行的定时任务的状态。
