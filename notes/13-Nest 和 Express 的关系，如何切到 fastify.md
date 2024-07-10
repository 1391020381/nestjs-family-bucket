- [HttpServer 的 interface](https://github.com/nestjs/nest/blob/d352e6f138bc70ff33cccf830053946d17272b82/packages/common/interfaces/http/http-server.interface.ts#L21C1-L85)

- [AbstractHttpAdapter 的 abstract class](https://github.com/nestjs/nest/blob/d352e6f138bc70ff33cccf830053946d17272b82/packages/core/adapters/http-adapter.ts#L12C1-L131)

- 分别提供了 express 和 fastify的实现
- @nestjs/platform-express
- @nestjs/platform-fastify
- 一旦用@Response注入响应对象,就不能通过return的方式来返回响应式内容了,需要手动调用res.send() express也是一样。
- 传个 passthrough 参数，代表不会在方法里自己发送响应内容。
- @Response({passthrough:true})
