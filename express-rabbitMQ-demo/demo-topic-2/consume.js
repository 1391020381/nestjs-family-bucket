import amqplib from "amqplib";
const connection = await amqplib.connect(
  "amqp://admin:admin123@localhost:5672"
);
const channel = await connection.createChannel(); //创建一个频道

await channel.assertExchange("topic", "topic", {
  durable: true,
});

//添加一个队列
const { queue } = await channel.assertQueue("queue1", {
  durable: true,
});
//绑定交换机
/**
 * @param {String} queue 队列名称
 * @param {String} exchange 交换机名称
 * @param {String} routingKey 路由键 *匹配一个单词 #匹配多个单词
 */
//这儿变化了
await channel.bindQueue(queue, "topic", "xm.*");
//接收消息
channel.consume(
  "queue1",
  (msg) => {
    console.log(msg.content.toString());
  },
  {
    noAck: true, //自动确认消息被消费
  }
);
