# 描述TCP三次握手和四次挥手
 ## 建立TCP连接
 1. 先建立连接(确保双方都有收发消息的能力)
 2. 再传输内容(如发送给一个get请求)
 3. 网络连接是TCP协议,传输内容是HTTP协议

 * 发送能力 接受能力
 1. client 发包 server接受     server知道 client有 发送能力
 2. server发包  client接受     client知道 server 接受和发送能力  但是 server不知道 client 接受能力
 3. client发包  server接受     server知道 client的接受能力


 ## TCP四次挥手
 * 确保断开 
   1. 首先是client 发送 server 自己无其他请求
   2. server 发送消息  告诉 client 自己 收到你的消息  此时 server可能有其他消息要发送
   3. server 发送消息 client 自己没有消息了
   4. client 再发送消息来确认