import * as amqp from "amqplib";

const connect = await amqp.connect({
  hostname: "localhost",
  port: 5672,
  username: "admin",
  password: "admin",
});

const channel = await connect.createChannel();

await channel.assertExchange("direct-test-exchange3", "fanout");
const exchangeName = "direct-test-exchange3";
channel.publish(exchangeName, "", Buffer.from("hello1"));
channel.publish(exchangeName, "", Buffer.from("hello2"));
channel.publish(exchangeName, "", Buffer.from("hello3"));
