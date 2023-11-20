const amqp = require("amqplib");

async function main() {
  // 连接到RabbitMQ服务器
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // 创建交换机
  const exchangeName = "my_exchange";
  const exchangeType = "direct";
  await channel.assertExchange(exchangeName, exchangeType, { durable: false });

  // 创建队列
  const queueName = "my_queue";
  await channel.assertQueue(queueName, { durable: false });

  // 绑定队列到交换机
  const routingKey = "my_routing_key";
  await channel.bindQueue(queueName, exchangeName, routingKey);

  // 发送消息
  const message = "Hello World!";
  channel.publish(exchangeName, routingKey, Buffer.from(message));

  console.log(` [x] Sent '${message}'`);

  // 接收消息
  channel.consume(
    queueName,
    (message) => {
      console.log(` [x] Received '${message.content.toString()}'`);
      channel.ack(message);
    },
    { noAck: false }
  );

  // 关闭连接
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

main();
