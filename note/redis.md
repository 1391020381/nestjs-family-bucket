# redis

- [Redis 面经：重新梳理了 5 种数据类型的用法和应用场景](https://blog.csdn.net/zhenghhgz/article/details/109718956)

* redis 的 database 就是一个命名空间的概念
* 把存储的 key-value 的数据放到不同命名空间下，避免冲突。
* Redis 允许用户通过设置 database 参数来创建多个数据库(也就是命名空间),每个数据库之间是相互独立的,可以在不同的数据库中存储不同的数据。database 参数的默认值是 0,表示默认使用第一个数据库。
* database 的作用主要有以下几点:
  - 数据隔离 通过设置不同的 database 可以将不同的数据隔离在不同的数据库中,避免数据之间的混淆和冲突
  - 数据备份 通过设置多个 database 可以将不同的数据备份到不同的数据中,以防止数据丢失或损坏
  - 数据分离 通过设置多个 database 可以将不同的数据分离到不同的数据库中,以便于对数据进行管理和维护。

- 等到了过期时间 就会被自动删除
- 查剩余过期时间 使用 ttl

## string

## list

## Set

## zset

## hash (map)

## loc
