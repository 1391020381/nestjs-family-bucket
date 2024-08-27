import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

async function start() {
  await client.connect();
  const value = await client.keys("*");
  console.log(value);
  const justdoitValue = await client.get("justdoit");
  console.log("justdoitValue:", justdoitValue);
  const list1Value = await client.lRange("list1", 0, -1);
  console.log("list1Value:", list1Value);
  const set1Value = await client.sMembers("set1");
  console.log("set1Value:", set1Value);
  const hash1Value = await client.hGetAll("hash1");
  console.log("hash1Value:", hash1Value);
  const zset1Value = await client.zRange("zset1", 0, -1);
  console.log("zset1Value:", zset1Value);
  await client.disconnect();
}
start();
