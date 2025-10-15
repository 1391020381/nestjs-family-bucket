1. 主服务器启动 mongodb服务
2. 备服务器启动 mongodb服务
3. 备服务器 设置复制集

```
rs.initiate({
    _id:"rs3333"，// 复制集名称,需与 docker-compose.yml 中名称保持一致
    members:[
        { _id:0, host:"172.300.2.14:27017"}, // 主节点(Server1)
        { _id:1,host:"172.300.2.15:27017"},  // 从节点(Server2)
        {_id:2,host:"172.300.2.15:27017",arbiterOnly:true} // 仲裁节点
    ]
})

```

- const uri = "mongodb://172.300.2.14:27017,172.300.2.15:27017/?replicaSet=rs333"; // 必须使用副本集连接方式, 普通单节点连接方式(不加 replicaSet参数) 将无法享受到高可用特性,且在主从切换时可能出现连接失败

- 主备需要稳定的网络,不然导致同步延迟或选举失败。

- 这个架构中
  - 没有分片 (Sharding) 的概念
  - 数据是完整地存在于每一个副本集成员上(主节点写入 从节点同步)
  - 整个MongoDB就是一个单一的逻辑数据库服务。
  - 副本集的作用是提供高可用 数据冗余和自动故障转移。

# 最小MongoDB分片集群(Sharded Cluster)

## 集群组件与数量(最小配置)

1. Shard(分片) 1个 (由3个节点组成) 是副本集(1主2从)
2. Config Server (配置服务器) 1个节点 存储集群元数据,如分片信息 路由表等
3. Mongos 路由服务 1个 客户端接入口,负责请求路由到正确的Shard

- 当前目录 docker-compose.yml

```
// 启动集群
docker-compose up -d

// 初始化 Config Server副本集
docker exec -it mongo-configsvr mongo --port 27019
rs.initiate({
  _id:"configReplSet",
  configsvr:true,
  members:[
  {
  _id:0,
  host:"configsvr:27019"
  }
  ]
  })

// 初始化 Shard 副本集(Shard1 Replica Set)
docker exec -it mongo-shard1-node1 mongo --port 27018

rs.initiate({
  _id: "shard1ReplSet",
  members: [
    { _id: 0, host: "mongo-shard1-node1:27018" },
    { _id: 1, host: "mongo-shard1-node2:27018" },
    { _id: 2, host: "mongo-shard1-node3:27018" }
  ]
})
// 检查是否初始化成功 谁是 Primary

// 将Shard 添加到集群(通过Mongos操作)

docker exec -it mongo-mongos mongo --port 27017

// 添加 Shard (将刚刚的副本集 Shard1 注册到集群中)

sh.addShard("shard1ReplSet/mongo-shard1-node1:27018,mongo-shard1-node2:27018,mongo-shard1-node3:27018")

// 查看添加的分片

sh.status()

// 启用分片(针对某个数据库或集合)

sh.enableSharding("mydatabase"); // 启用某个数据库的分片功能

sh.shardCollection("mydatabase.mycollection",{_id:1})  // 选择一个分片键 对某个集合开启分片   可以使用 _id 或其他字段作为分片键


```
