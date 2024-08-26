# 快速入门 Redis

- 内存和硬盘的速度差距还是很大的：
  - 顺序访问：这种情况下，内存访问速度仅仅是硬盘访问速度的 6~7倍
  - 随机访问 这种情况下 内存访问速度就要比硬盘速度快10万倍以上。

* 后端服务 一般会结合内存数据库来做缓存，最常用的是 redis。

* 因为需求就是缓存不同类型的数据，所以redis的设计是 key value的键值对的形式。
* 值的类型有很多：

  - 字符串 string
  - 列表 list
  - 集合 set
  - 有序集合 sorted set
  - 哈希表 hash
  - 地理信息 geospatial
  - 位图 bitmap

* docker run -itd --name redis-test -p 6379:6379 -v D:/Docker/redis:/data redis

* list
* lpush rpush
* lpop rpop
* lrange list1 0 -1 -1 代表到最后

* set的特点是无序并且元素不重复
* set 只能去重 判断包含 不能对元素排序。

* 如果排序 去重的需求 比如 排行榜 可以用 sorted set 也就是 zset

* zadd zset1 5 guang
* zadd zset1 4 dong
* zadd zset1 3 xxx
* zadd zset1 6 yyy

* hash 和 map一样

* geo 数据结构 根据距离计算周围的人用
* geoadd loc 13.361389 38.115556 'guangguang' 15.087269 37.502669 'dongdong'
* redis 实际使用 zset存储的, 把经纬度转化为了 二位平面的坐标。
* geodist loc guangguang dongdong