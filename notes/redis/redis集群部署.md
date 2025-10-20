- 最小集群规模，官方推荐至少3个主节点,每个主节点搭配1个从节点,即3主3从,共6个节点,这是实现高可用最基本的配置。

- Redis容器启动时并不会直接知道谁是主 谁是从, 主从关系是通过 redis-cli --cluster create 命令自动分配的
- 只需要:
  - 启动N个Redis实例 (如6个,3主3从)
  - 确保它们都启用了 cluster-enabled yes
  - 然后使用 redis-cli --cluster create 命令 加上 --cluster-replicas 1 参数
  - Redis官方工具会自动
    - 把前几个节点设为主节点
    - 把后几个设置为从节点
    - 分配哈希槽(0-16383)
    - 建立主从复制关系

```

docker run -it --network host --rm redis:6.2 \
  redis-cli --cluster create \
  172.21.4.210:7000 172.21.4.211:7000 172.21.4.212:7000 \
  172.21.4.210:7001 172.21.4.211:7001 172.21.4.212:7001 \
  --cluster-replicas 1

```

- 三台服务器的Redis是通过什么设置为集群的

  - 通过 redis-cli --cluster create 命令 把 6个Redis 节点(分布在三台服务器上) 组成一个逻辑上的 Redis Cluster。

  - 每台服务器启动若干个 Redis 容器(如 2个: 7000 和 7001)
  - 每个 Redis 实例启用集群模式 cluster-enbled yes
  - 使用 redis-cli 工具(通常用一个临时的 redis:6.2 容器来运行)执行
  - redis-cli --cluster create <主1> <主2> <主3> <从1> <从2> <从3> --cluster-replicas 1
