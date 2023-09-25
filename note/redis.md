# redis
* [Redis面经：重新梳理了 5 种数据类型的用法和应用场景](https://blog.csdn.net/zhenghhgz/article/details/109718956)
- redis 的 database 就是一个命名空间的概念
- 把存储的 key-value 的数据放到不同命名空间下，避免冲突。

* 等到了过期时间 就会被自动删除
* 查剩余过期时间 使用 ttl

## string
## list
## Set
## zset
## hash (map)
## loc