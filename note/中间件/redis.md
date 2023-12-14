# 数据类型

Redis支持多种数据类型，包括：

1. 字符串（String）：字符串是Redis中最基本的数据类型，可以存储任何形式的文本或二进制数据。字符串类型可以用于存储用户信息、文章内容等。

2. 列表（List）：列表是一种有序的数据结构，可以在列表的头部或尾部添加元素，也可以获取指定位置的元素。列表类型可以用于存储评论、消息队列等。

3. 集合（Set）：集合是一种无序的数据结构，每个元素都是唯一的，不能重复。集合类型可以用于存储标签、好友列表等。

4. 有序集合（Sorted Set）：有序集合是一种包含分数的集合，每个元素都有一个分数，分数越高，元素越靠前。有序集合类型可以用于存储排行榜、热门内容等。

5. 哈希（Hash）：哈希是一种键值对的数据结构，可以将一个键映射到多个字段和值。哈希类型可以用于存储用户信息、商品规格等。

6. 位图（Bitmap）：位图是一种用于存储二进制位的数据结构，可以实现高效的位操作。位图类型可以用于存储用户行为数据、日志记录等。

7. 超级日志（HyperLogLog）：超级日志是一种用于估算不重复元素数量的数据结构，可以快速计算基数。超级日志类型可以用于存储网站访问量、用户数量等。

8. 地理位置（Geo）：地理位置是一种用于存储地理位置信息的数据结构，可以实现地理位置相关的查询。地理位置类型可以用于存储地图信息、附近的人等。

9. 流（Stream）：流是一种用于存储消息的数据结构，可以在流的尾部添加消息，也可以按照消息ID获取指定消息。流类型可以用于存储消息队列、实时数据分析等。

10. 模块（Module）：模块是一种自定义的数据类型，可以通过编写C语言代码来实现。模块类型可以用于实现特定的功能，例如实现一个计数器模块。

# 以下是Redis中10种数据类型的使用方法和具体示例：

1. 字符串（String）

使用方法：

- SET key value：设置字符串值
- GET key：获取字符串值
- DEL key：删除字符串

示例：

```
SET name "John"
GET name
DEL name
```

2. 列表（List）

使用方法：

- LPUSH key value：在列表头部添加元素
- RPUSH key value：在列表尾部添加元素
- LPOP key：从列表头部弹出元素
- RPOP key：从列表尾部弹出元素
- LRANGE key start stop：获取指定范围内的元素

示例：

```
LPUSH fruits "apple"
RPUSH fruits "orange"
LPOP fruits
RPOP fruits
LRANGE fruits 0 -1
```

3. 集合（Set）

使用方法：

- SADD key member：向集合中添加元素
- SREM key member：从集合中删除元素
- SISMEMBER key member：判断元素是否在集合中
- SMEMBERS key：获取集合中所有元素

示例：

```
SADD tags "Redis"
SADD tags "NoSQL"
SREM tags "NoSQL"
SISMEMBER tags "Redis"
SMEMBERS tags
```

4. 有序集合（Sorted Set）

使用方法：

- ZADD key score member：向有序集合中添加元素
- ZREM key member：从有序集合中删除元素
- ZSCORE key member：获取元素的分数
- ZRANGE key start stop：获取指定范围内的元素

示例：

```
ZADD scores 90 "Alice"
ZADD scores 80 "Bob"
ZADD scores 70 "Charlie"
ZSCORE scores "Alice"
ZRANGE scores 0 -1
```

5. 哈希（Hash）

使用方法：

- HSET key field value：设置哈希值
- HGET key field：获取哈希值
- HDEL key field：删除哈希值
- HGETALL key：获取所有哈希值

示例：

```
HSET user:1 name "Alice"
HSET user:1 age 20
HGET user:1 name
HDEL user:1 age
HGETALL user:1
```

6. 位图（Bitmap）

使用方法：

- SETBIT key offset value：设置二进制位
- GETBIT key offset：获取二进制位
- BITCOUNT key：统计二进制位为1的数量

示例：

```
SETBIT bitmap 10086 1
GETBIT bitmap 10086
BITCOUNT bitmap
```

7. 超级日志（HyperLogLog）

使用方法：

- PFADD key element：添加元素
- PFCOUNT key：估算不重复元素数量
- PFMERGE destkey sourcekey：合并多个HyperLogLog

示例：

```
PFADD users "Alice"
PFADD users "Bob"
PFCOUNT users
PFMERGE users2 users users
```

8. 地理位置（Geo）

使用方法：

- GEOADD key longitude latitude member：添加地理位置
- GEOPOS key member：获取地理位置
- GEODIST key member1 member2：计算两个地理位置之间的距离
- GEORADIUS key longitude latitude radius unit：获取指定范围内的地理位置

示例：

```
GEOADD cities 121.4737 31.2304 "Shanghai"
GEOPOS cities "Shanghai"
GEODIST cities "Shanghai" "Beijing" km
GEORADIUS cities 121.4737 31.2304 100 km
```

9. 流（Stream）

使用方法：

- XADD key \* field value：添加消息
- XRANGE key start end：获取指定范围内的消息
- XDEL key id：删除消息
- XLEN key：获取流的消息数量

示例：

```
XADD messages * message "Hello"
XRANGE messages - +
XDEL messages 1619930700000-0
XLEN messages
```

10. 模块（Module）

使用方法：

- 自定义C语言代码实现模块功能

示例：

```c
int counter_init(RedisModuleCtx *ctx, RedisModuleString **argv, int argc) {
    if (argc != 2) {
        return RedisModule_WrongArity(ctx);
    }
    RedisModuleKey *key = RedisModule_OpenKey(ctx, argv[1], REDISMODULE_WRITE);
    RedisModule_ModuleTypeSetValue(key, CounterType, (void *)1);
    RedisModule_CloseKey(key);
    RedisModule_ReplyWithSimpleString(ctx, "OK");
    return REDISMODULE_OK;
}
```

以上是Redis中10种数据类型的使用方法和具体示例，可以根据实际需求选择合适的数据类型来存储数据。
