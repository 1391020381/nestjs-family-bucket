import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "xiaoMan",
  brokers: ["tcp://localhost:9092"],
});

const producer = await kafka.producer();

await producer.connect();

await producer.send({
  topic: "task-1",
  messages: [{ value: "这是一条测试数据" }],
});

await producer.disconnect();
