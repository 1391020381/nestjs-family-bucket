- [redis](https://runoob.com/redis/redis-tutorial.html)
- [cloud.redis.io](https://cloud.redis.io/#/)
  - 性能极高
    - 读操作 每秒可处理 10 万到 100 万次请求(取决于硬件条件)
    - 写操作 每秒可处理 10 万到 50 万次请求
    - 平均延迟 1 毫秒以下
    - 并发 redis 可以轻松支持数万个并发连接。
  - 原子操作
  - 持久化
  - 支持发布订阅模式 redis 内置了发布订阅模式 允许客户端之间通过消息进传递进行通信。使得 Redis 可以作为消息队列和实时数据传输平台。
  - 主从复制 Redis 支持主从复制 可以通过从节点来备份数据或分担读操作,提高数据的可用性和系统的伸缩性。

* 主从模式 哨兵模式 部署 以及 业务怎么连接
