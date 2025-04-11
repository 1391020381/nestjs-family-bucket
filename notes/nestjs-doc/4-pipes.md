# Pipes

- transform
- validate

* 在NestJS中,管道(Pipe)可以通过多种方式与请求参数绑定。
  - 参数装饰器中的管道(参数作用域) @Body()
  - 方法作用域管道 @UsePipes() controller中某个请求的方法
  - 控制器作用域管道 @UsePipes() controller
  - 全局作用域管道 @UsePipes() app
  - 自定义参数装饰器 + 管道
