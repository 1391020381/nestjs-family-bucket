import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "xiaoMan",
  brokers: ["localhost:9092"],
});

const consumer = await kafka.consumer({ groupId: "my-group" });

await consumer.connect();

await consumer.subscribe({ topic: "task-1", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
  },
});
