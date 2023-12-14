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

- [Get Started with RabbitMQ in Node.js](https://sharmilas.medium.com/get-started-with-rabbitmq-in-node-js-1adb18d019d0)

* [https://github.com/amqp-node/amqplib/tree/main/examples/tutorials](https://github.com/amqp-node/amqplib/tree/main/examples/tutorials)

## 基本概念

1. 生产者： 生产消息的
2. 消费者： 接受消息的
3. 通道 channel 建立连接后, 会获取一个 channel 通道
4. exchange: 交换机 消息需要先发送到 exchange交换机 也可以说是第一步存储消息的地方(交换机会有很多类型)
5. 消息队列： 到达消费者前一刻存储消息的地方 exchange交换机会把消息传递到此。
6. ack回执：收到消息后确认消息已经消费的应答。

### 什么情况下需要创建 交换机

- 在RabbitMQ中，交换机是用于消息路由的对象。交换机根据消息的路由键将消息路由到一个或多个队列中。因此，需要创建交换机的情况包括：

1. 需要实现复杂的消息路由策略。RabbitMQ支持多种类型的交换机，例如直连交换机、主题交换机、扇形交换机等。不同类型的交换机可以实现不同的消息路由策略。如果需要实现复杂的消息路由，那么需要创建自定义的交换机。

2. 需要将消息路由到多个队列中。如果需要将消息发送到多个队列中，那么可以创建一个扇形交换机，并将多个队列绑定到该交换机上。

3. 需要对消息进行过滤或转换。在某些情况下，可能需要对消息进行过滤或转换，例如根据消息的内容或属性将消息路由到不同的队列中。这可以通过创建自定义的交换机和绑定来实现。

总之，需要创建交换机的情况包括需要实现复杂的消息路由策略、需要将消息路由到多个队列中、需要对消息进行过滤或转换等。创建交换机可以实现更灵活、更高效的消息传递机制。

在使用amqplib时，如果不需要使用交换机，是可以不创建交换机的。但是，如果你需要使用特定类型的交换机来实现更高级的消息路由，或者需要将消息发送到多个队列，那么你需要创建交换机并将其绑定到队列上。

在amqplib中，使用`assertExchange()`方法来声明交换机，使用`bindQueue()`方法将队列绑定到交换机上。例如，下面的代码将创建一个名为`myExchange`的直接交换机，并将其绑定到名为`myQueue`的队列上：

```
const exchangeName = 'myExchange';
const queueName = 'myQueue';
const routingKey = 'myRoutingKey';

// 声明交换机
await channel.assertExchange(exchangeName, 'direct', { durable: false });

// 声明队列
await channel.assertQueue(queueName, { durable: false });

// 将队列绑定到交换机上
await channel.bindQueue(queueName, exchangeName, routingKey);
```

这将使得通过交换机`myExchange`和路由键`myRoutingKey`发送到的消息被路由到队列`myQueue`上。

- channel.publish

* [RabbitMQ 从入门到精通](https://juejin.cn/post/7134967327996526605)
* 交换机时 RabbitMQ 非常重要的一个部件 一方面它接受来自生产者的消息 另一方面它将消息推送到队列。 交换机必须确切知道如何处理它接受到的消息 是将这些消息推送到特定队列还是 推送到多个队列 或者是把消息 丢弃 这个得是交换机类型来决定的。

* Virtual host 出于多租户和安全因素设计的， 把 AMQP的基础组件划分到一个虚拟的分组中,类似 于网络中的 namespace 概念。 当多个不同用户使用同一个 RabbitMQ server 提供的服务时,可以划分出多个 vhost 每个用户在自己的 vhost创建 exchange / queue等。

* Exchange 主要有4种

  - fanout 把消息放到这个交换机的所有Queue
  - direct 把消息放到交换机的指定key的队列中
  - topic 把消息放到交换机的指定key的队列中，支持模糊匹配
  - headers 把消息放到交换机的满足某些header的队列

* [RabbitMQ基础复习](https://juejin.cn/post/7248914499914481725)

* [Kafka 入门](https://juejin.cn/post/6844903495670169607)

## kafka的基本术语

- 消息: kafka 中的数据单元被称为 消息 也被称为记录 可以把它看作数据库表中的某一行的记录。
- 批次: 为了提高效率 消息会 分批次 写入Kafka 批次就代指是一组消息。
- 主题: 消息的种类称为 主题 (Topic) 可以说一个主题代表了一类消息。 相当于是对消息进行分类。 主题就像数据库中的表。
- 分区: 主题可以被分为若干个分区(partition) 同一个主题中的分区可以不在一个机器上,有可能会部署在多个机器上,由此来实现kafka的伸缩性。
