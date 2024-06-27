- Nest 支持创建HTTP服务 WebSocket服务 还有基于 TCP通信的微服务。

* Guard Interceptor Exception Filter
* 不同类型的服务它能拿到的参数是不同的,比如 http服务可以拿到 request response ws服务就没有 如何让 Guard Interceptor Exception Filter 跨多种上下文复用

* AraumentHost ExecutionContext

* getType的结果 switchToHttp switchToWs switchToRpc 获取对应的 argument
* ExceutionContext 提供了getClass getHandler 结合 reflector来获取其中的 metadata
