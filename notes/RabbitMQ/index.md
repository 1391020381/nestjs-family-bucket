# RabbitMQ

- docker-compose up -d
- http://localhost:15672 admin/admin123

* 发布订阅就是生产者的消息通过交换机写到多个队列, 不同的订阅者消费者不同的队列，也就是实现了 一对多。

* 发布订阅的模式分为四种

  1. Direct(直连)模式 把消息放到交换机指定 key 的队列里面
  2. Topic (主题)模式 把消息放到交换机指定key的 队列里面，额外增加使用 "\*" 匹配一个单词 或使用 "#" 匹配多个单词
  3. Headers(头部)模式 把消息放到交换机头部属性去匹配队列
  4. Fanout (广播) 模式 把消息放入交互机所有的队列 实现广播

* 关键代码对比

```
模式	交换机类型 	路由键/匹配方式 	    生产者示例	                        消费者绑定示例
Direct	direct	精确匹配 routingKey	 channel.publish('logs', 'zs', ...)	    bindQueue(..., 'zs')
Topic	topic	通配符 * 或 #	   channel.publish('topic', 'xm.*', ...)	bindQueue(..., 'xm.*')
Headers	headers	消息头键值对	  headers: { data: 'xmzs' }	               bindQueue(..., { data: 'xmzs' })
Fanout	fanout	忽略 routingKey，广播所有队列 	channel.publish('fanout_ex', '', ...)	bindQueue(..., '')



```

# topic

- 生产者

1. 创建一个频道
2. 声明一个交换机
3. 发送消息
4. 断开

- 消费者

1. 创建一个频道
2. 声明一个交换机
3. 添加一个队列
4. 绑定交互机
5. 消费 channel.consume()

- RabbitMQ延迟队列插件下载
