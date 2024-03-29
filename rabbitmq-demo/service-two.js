const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4002;

const amqp = require("amqplib");

var channel, connection;

connecQueue();
async function connecQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");

    channel = await connection.createChannel();

    // connect to  'test-queue' create one if doestnot exist already

    await channel.assertQueue("test-queue");
    channel.consume("test-queue", (data) => {
      console.log("Data received :", `${Buffer.from(data.content)}`);
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => console.log("Server runing at port " + PORT));
