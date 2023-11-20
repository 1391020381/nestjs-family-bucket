const amqp = require("amqplib");

const queue = "hello";
const text = "Hello World";

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(text));

    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.log(err);
  } finally {
    if (connection) {
      await connection.close;
    }
  }
})();
