import * as amqp from "amqplib";

async function produce() {
  try {
    const connect = await amqp.connect({
      hostname: "localhost",
      port: 5672,
      username: "admin",
      password: "admin",
    });
    const channel = await connect.createChannel();
    const exchangeName = "direct-test-exchange2";
    await channel.assertExchange(exchangeName, "topic");
    channel.publish(exchangeName, "aaa.1", Buffer.from("hello1"));
    channel.publish(exchangeName, "aaa.2", Buffer.from("hello2"));
    channel.publish(exchangeName, "bbb.1", Buffer.from("hello3"));
  } catch (err) {
    console.log(err);
  }
}
produce();
