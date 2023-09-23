# Nest 支持创建 HTTP 服务 WebSocket 服务,还有基于 TCP 通信的微服务

- HTTP WebSocket TCP 通信的微服务 都需要 Guard Interceptor Exception Filter

* 不同类型的服务它能拿到的参数是不同的,比如 http 服务可以拿到 request response 对象,而 ws 服务就没有,如果让 Guard Interceptor Exception Filter 跨多种上下文复用。

# Nest 的解决方法是 ArgumentHost 和 ExecutionContext

- ArgumentHost 是用于切换 http ws rpc 等上下文类型的,可以根据上下文类型取到对应的 argument。
