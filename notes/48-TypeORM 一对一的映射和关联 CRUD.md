# TypeORM 一对一的映射和关联 CRUD

- TypeORM里一对一关系的映射通过 @OneToOne装饰器来声明，维持外键列的Entity添加 @JoinColumn装饰器

- 如果是非外键列的Entity 想要关联查询另外一个 Entity 则需要通过第二个参数指定外键列是另外一个Entity的哪个属性

- 可以通过@OneToOne 装饰器的 onDelete onUpdate参数设置级联删除和更新的方式,比如 CASCADE SET NULL
