- [mongodb](https://www.runoob.com/mongodb/mongodb-tutorial.html)
- [mongodb Atlas](https://cloud.mongodb.com/v2/6780779db5626d3308b09196#/metrics/replicaSet/67807ea8af385f0de3d52e3a/explorer/sample_mflix/movies/find)

* MongoDB 中默认的数据库为 test，如果你没有创建新的数据库,集合将存放在 test 数据库中。
* 当通过 shell 连接到 MongoDB 实例时,如果未使用 use 命令切换到其他数据库,则会默认使用 test 数据库。

```
use test

db.myCollection.insertOne({name:"Alice",age:30})

// 在这个例子中,如果test数据库不存在,则MongoDB将自动创建它
// 需要注意的是 默认数据库仅在特定情况下才会使用。在实际开发中，通常会选择自己创建的数据库来存储数据。

// MongoDB的find方法可以传入多个键(key),每个键(key)以逗号隔开,即常规的 SQL 的  AND条件
db.col.find({key:value1,key2:vlaue2}).pretty()

// MongoDB OR 条件

db.col.find({
    $or:[
        {key1:value1},
        {key2:value2}
    ]
}).pretty()
```

# MongoDB 索引

- 索引通常能够极大的提高查询的效率,如果没有索引,MongoDB 在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

* 这种扫描全集合的查询效率是非常低的,特别在处理大量的数据时,查询可能要花费几十秒甚至几分钟,这对网站的性能是非常致命的。

* 索引是特殊的数据结构,索引存储在一个易于遍历读取的数据集合中,索引是对数据库表中一列或多列的值进行排序的一种结构。
* 在 MongoDB 中,常见的索引类型包括:
  - 单字段索引
  - 复合索引 基于多个字段组合的索引
  - 文本索引 用于支持全文搜索
  - 地理空间索引 用于地理空间数据的查询
  - 哈希索引 用于对字段值进行哈希处理的索引

# MongoDB 复制(副本集)

- MongoDB 复制是将数据同步在多个服务器的过程。
- 复制提供了额数据的冗余备份 并在多个服务器上存储数据副本,提高了数据的可用性,并可以保证数据的安全性。
- 复制还允许从硬件故障和服务中断中恢复数据。
- 什么是复制 保障数据的安全性 数据高可用性(24\*7) 灾难恢复 无需停机维护(如 备份 重建索引 压缩) 分布式读取数据
- 复制原理
  - mongodb 的复制至少需要两个节点。其中一个是主节点 负责处理客户端请求 其余的都是从节点,负责复制主节点上的数据。
  - mongodb 各个节点常见的搭配方式为 一主一从 一主多从。
  - 主节点记录在其上的所有操作 oplog，从节点定期轮询节点获取这些操作,然后对自己的数据副本执行这些操作,从而保证从节点的数据与主节点一致。
  - 副本集由一组 MongoDB 实例组成,其中一个节点是主节点(Primary) 其他节点是从节点(Secondary) 主节点负责处理读写操作 从节点复制主节点的数据并提供读操作。
- 副本集特征
  - N 个节点的集群
  - 任何节点可作为主节点
  - 所有写入操作都在主节点上。
  - 自动故障转移
  - 自动恢复

# MongoDB 分片

# MongoDB 备份(mongodump)与恢复(mongorestore)

- 定时任务 Cron

```
// mongodb-backup.sh

#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%F)
mongodump --uri="mongodb+srv://1391020381:171226q2@cluster0.w0jlk.mongodb.net" --out=$BACKUP_DIR
tar -czvf $BACKUP_DIR-$DATE.tar.gz $BACKUP_DIR
scp $BACKUP_DIR-$DATE.tar.gz user@remote-server:/remote/backup
rm -rf $BACKUP_DIR

```

# MongoDB 监控

# MongoDB 关系

- MongoDB 的关系表示多个文档之间在逻辑上的相互关系。
- 文档间可以通过嵌入和引用来建立关系
  - 1 对 1
  - 1 对多
  - 多对 1
  - 多对多

# MongoDB 覆盖索引查询

# MongoDB 查询分析
