- AOP的好处是可以把一些通用逻辑分离到切面中,保持业务逻辑的纯粹性,这样切面逻辑可以复用,还可以动态增删。

- 其实Express的中间件的洋葱圈也是一种AOP的实现,因为你可以透明的在外面包一层,加入一些逻辑,内层感知不到。

# Nest实现AOP的方式更多,一共有五种

1. Middleware
2. Guard
3. Pipe
4. Interceptor
5. ExceptionFilter
