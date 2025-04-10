const dgram = require("dgram");
const server = dgram.createSocket("udp4"); // 创建 UDP Socket

// 绑定到 41234 端口，准备接收单播消息
server.bind(41234, () => {
  server.setBroadcast(true); // 允许发送广播
  console.log("服务端已启动，监听 41234 端口");

  // 每隔 3 秒向客户端广播消息
  const BROADCAST_MSG = Buffer.from("SERVER_ANNOUNCEMENT");
  const CLIENT_PORT = 41235; // 客户端监听的端口
  const BROADCAST_ADDR = "255.255.255.255"; // 广播地址

  setInterval(() => {
    server.send(
      BROADCAST_MSG,
      CLIENT_PORT,
      BROADCAST_ADDR,
      (err) => err && console.error("广播失败:", err)
    );
  }, 3000);
});

// 处理来自客户端的单播消息
server.on("message", (msg, rinfo) => {
  console.log(
    `收到客户端 ${rinfo.address}:${rinfo.port} 的消息: ${msg.toString()}`
  );

  // 向客户端发送单播回复
  const reply = Buffer.from("单播回复");
  server.send(reply, rinfo.port, rinfo.address, (err) => {
    err ? console.error("回复失败:", err) : console.log("已回复客户端");
  });
});

// 错误处理
server.on("error", (err) => {
  console.error("服务端错误:", err);
  server.close();
});
