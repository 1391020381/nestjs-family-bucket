# TypeORM 多对多的映射和关联 CRUD

- 一对一 通过 @OneToOne @JoinColumn 来把Entity映射成数据库表。
- Entity之间的引用关系 转换为数据库表之间的外键关联的关系。
- 一对多通过 @OneToMany @ManyToOne来把Entity映射成数据库表。
- 中间表 来保存多对多的关系的。

- 如果双方都保留了对方的引用,需要第二个参数来指定关联的外键列在哪，也就是如何找当前的entity
