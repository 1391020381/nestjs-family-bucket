import * as amqp from "amqplib";

const connect = await amqp.connect(`amqp://localhost:5672`);
const channel = await connect.createChannel();
const exchangeName = "direct-test-exchange4";
await channel.assertExchange(exchangeName, "headers");

channel.publish(exchangeName, "", Buffer.from("hello1"), {
  headers: {
    name: "guang",
  },
});

channel.publish(exchangeName, "", Buffer.from("hello2"), {
  headers: {
    name: "guang",
  },
});

channel.publish(exchangeName, "", Buffer.from("hello3"), {
  headers: {
    name: "dong",
  },
});
