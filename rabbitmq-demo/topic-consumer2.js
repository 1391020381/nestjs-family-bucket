import * as amqp from "amqplib";
const connect = await amqp.connect({
  hostname: "localhost",
  port: 5672,
  username: "admin",
  password: "admin",
});
const channel = await connect.createChannel();

await channel.assertExchange("direct-test-exchange2", "topic");

const { queue } = await channel.assertQueue("queue2");

await channel.bindQueue(queue, "direct-test-exchange2", "bbb.*");

channel.consume(
  queue,
  (msg) => {
    console.log(msg.content.toString());
  },
  { noAck: true }
);
