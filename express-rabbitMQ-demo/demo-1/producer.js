import express from "express";
import amqplib from "amqplib";

const app = express();

// const connection = await amqplib.connect("amqp://localhost");
const connection = await amqplib.connect(
  "amqp://admin:admin123@localhost:5672"
);
const channel = await connection.createChannel();

const queueName = "task_queue";

app.get("/send", (req, res) => {
  const message = req.query.message;
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
  res.send("send message success");
});

app.listen(3000, () => {
  console.log("producer listen 3000");
});
