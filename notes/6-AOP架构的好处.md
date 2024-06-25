- AOP的好处是可以把一些通用逻辑分离到切面中,保持业务逻辑的纯粹性,这样切面逻辑可以复用,还可以动态增删。

- 其实Express的中间件的洋葱圈也是一种AOP的实现,因为你可以透明的在外面包一层,加入一些逻辑,内层感知不到。

# Nest实现AOP的方式更多,一共有五种

1. Middleware
2. Guard
   - app.useGlobalGuards(new LoginGuard()) 不在IOC容器中
   - {
     provide: APP_GUARD,
     useClass: LoginGuard,
     }
   - provide 模式可以注入其他provide
3. Pipe
   - 管道的意思 用来对参数做一些校验和转换
   - Nest 内置 Pipe
   - 参数 controller 全局 几种级别
4. Interceptor
   - Interceptor 是拦截器的意思,可以在目标Controller方法前后加入一些逻辑
   - interceptor 可以拿到调用的 controller 和 handler
   - context.getClass()
   - context.getHandler()
   - 在 controller 和 handler 上加一些 metadata 这种就只有 interceptor guard 可以获取出来
   - interceptor 支持每个路由单独启用 只作用于某个handler
   - interceptor支持 controller 级别 作用于下面的全部 handler @UseInterceptors()
   - interceprot 支持 全局 mian..ts app.useGlobalInterceptors()
5. ExceptionFilter
   - 可以对抛出的异常做处理，返回对应的响应
   - Nest 内置很多http异常，都是 HttpException的子类。
