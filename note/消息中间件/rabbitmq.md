- docker 启动 mq

```
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 -v /Users/zhoujin/Volumes/rabbitmq:/var/lib/rabbitmq rabbitmq:3-management

```

- 连接 RabbitMQ 的管理界面需要使用浏览器访问 `http://<rabbitmq-host>:15672`，其中 `<rabbitmq-host>` 是 RabbitMQ 服务器的地址或者主机名。

如果你在启动 RabbitMQ 时使用了 `-p 15672:15672` 参数，那么你可以使用 `http://localhost:15672` 访问管理界面。

默认情况下，RabbitMQ 的管理界面需要进行身份验证。使用默认的用户名和密码 `guest/guest` 可以登录管理界面。但是在生产环境中，建议修改默认的用户名和密码，以提高安全性。

- [RabbitMQ Node.js 示例](https://www.cnblogs.com/Wayou/p/rabbitmq_nodejs_example.html)

* RabbitQM 处理和管理消息队列的中间人(broker)。可简单理解为邮局,你在程序中写好消息,指定收件人,剩下的事情就是 RabbitQM的工作了,它会保证收件人正确收到邮件。
* 任何发送邮件的程序都是 Producer 消息队列可理解为邮筒,新邮件将堆积在此处。 所有待处理的消息都以队列形式存储,总体上看来就是一个巨大的消息 buffer，至于存储量与设置的内存及硬件有关。 任何应用都可以向队列添加消息, 也可以多个消费者都在从队列中获取消息。

* consumer 即是消息队列中消息应用, 其处于等待接受来自 RabbitQM发送来的消息。

* 消息生产者 消费者 及 RabbitQM 这个中间人三者不必同时存在与同一机器上,实际运用时也确实大部分不会部署在同一台机器上。 比如有专门的机器作为 RabbitQM实体 而应用程序会部署在其他的集群。 应用程序可以是同时负责生产消息的,也同时是消费者。

# [消息队列助你成为高薪的 Node.js 工程师](https://juejin.cn/post/6844904003151593479#heading-38)

## 基本概念

1. 生产者： 生产消息的
2. 消费者： 接受消息的
3. 通道 channel 建立连接后, 会获取一个 channel 通道
4. exchange: 交换机 消息需要先发送到 exchange交换机 也可以说是第一步存储消息的地方(交换机会有很多类型)
5. 消息队列： 到达消费者前一刻存储消息的地方 exchange交换机会把消息传递到此。
6. ack回执：收到消息后确认消息已经消费的应答。
