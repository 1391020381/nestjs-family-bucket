import amqplib from "amqplib";
const queueName = "task_queue";

// const connection = await amqplib.connect("amqp://localhost");
const connection = await amqplib.connect(
  "amqp://admin:admin123@localhost:5672"
);
const channel = await connection.createChannel();

await channel.assertQueue(queueName, { durable: true });

channel.consume(queueName, (msg) => {
  console.log(`[x] Received ${msg.content.toString()}`);
  channel.ack(msg);
});
