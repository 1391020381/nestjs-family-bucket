const dgram = require("dgram");
const client = dgram.createSocket("udp4"); // 创建 UDP Socket

// 绑定到 41235 端口，监听服务端的广播
client.bind(41235, () => {
  console.log("客户端已启动，监听 41235 端口的广播");
});

// 收到服务端广播后，发送单播请求
client.on("message", (msg, rinfo) => {
  const message = msg.toString();
  if (message === "SERVER_ANNOUNCEMENT") {
    console.log(`发现服务端：${rinfo.address}:${rinfo.port}`);

    // 向服务端发送单播消息
    const unicastMsg = Buffer.from("客户端请求数据");
    client.send(
      unicastMsg,
      rinfo.port, // 服务端端口 41234
      rinfo.address, // 服务端 IP
      (err) =>
        err ? console.error("请求失败:", err) : console.log("请求已发送")
    );
  } else if (message === "单播回复") {
    console.log("收到服务端回复:", message);
    client.close(); // 通信完成后关闭客户端
  }
});

// 错误处理
client.on("error", (err) => {
  console.error("客户端错误:", err);
  client.close();
});
