# TypeORM 一对多的映射和关联 CRUD

- 在多的一方使用 @ManyToOne装饰器

- 一对多的关系只能在多的一方保存外键 所以并不需要 @JoinColumn
- 双方只能有一方 cascade 不然会无限循环。 设置了cascade之后，只要一方保存,关联的另一方就会自动保存。
- 删除的话，如果设置了外键的 CASCADE SET NULL 那只删除主表(一的一方) 对应的Entity就好了，mysql会做后续的关联删除或者id置空
- 否则就要先删除所有的从表(多的一方) 对应的Entity再删除主表对应的Entity
