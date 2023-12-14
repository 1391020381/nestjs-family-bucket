import * as amqp from "amqplib";

async function consume() {
  try {
    const connect = await amqp.connect(`amqp://localhost:5672`);
    const channel = await connect.createChannel();

    const { queue } = await channel.assertQueue("queue3");
    await channel.bindQueue(queue, "direct-test-exchange", "ccc");

    channel.consume(
      queue,
      (msg) => {
        console.log(msg.content.toString());
      },
      { noAck: true }
    );
  } catch (err) {
    console.log(err);
  }
}

consume();
