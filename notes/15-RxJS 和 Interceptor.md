# RxJS

# Interceptor

- 路由级别和全局级别的 interceptor
- 路由级别的可以依赖注入 而全局的不行

- service 也可以依赖注入到 interceptor

- controller里很可能会抛出错误，这些错误会被 exception filter处理，返回不同的响应,但在那之前，我们可以在 interceptor里先处理下。
- import { Observable, catchError, throwError } from 'rxjs';

* 全局 interceptor 而且还用到 一些 provider
* nest提供了一个token 用这个 token在 AppModule里声明 interptor Nest会把它作为全局interceptor

```
import { APP_INTERCEPTOR} from '@nestjs/core'


providers:[
    {
        provide:APP_INTERCEPTOR,
        useClass:AaaInterceptor
    }
]

// AaaInterceptor 注入了 appService
```

# 总结

- nest 的 interceptor 就用了 rxjs 来处理响应，但常用的 operator 也就这么几个：

1. tap: 不修改响应数据，执行一些额外逻辑，比如记录日志、更新缓存等
2. map：对响应数据做修改，一般都是改成 {code, data, message} 的格式
3. catchError：在 exception filter 之前处理抛出的异常，可以记录或者抛出别的异常
4. timeout：处理响应超时的情况，抛出一个 TimeoutError，配合 catchErrror 可以返回超时的响应

- interceptor 也是可以注入依赖的，你可以通过注入模块内的各种 provider。

- 全局 interceptor 可以通过 APP_INTERCEPTOR 的 token 声明，这种能注入依赖，比 app.useGlobalInterceptors 更好。
