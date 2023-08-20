* 一般情况下 还是默认的JOIN ON比较多 也就是 INNER JOIN

* 删除和更新时的级联操作


* EntityManager还有 update insert 方法 修改 和插入 但是它们不会先 select查询一次 而 save方法会先查询一次数据库来确定时插入还是修改。

* delete和 remove的区别是 delete直接传 id 而 remove 则是传入 entity对象

* 查询是使用 find

* 通过外建来存储这种关系的,多对多的话还要建立中间表。 一对一 一对多 多对多
* TypeORM是把表 字段 表 和表的关系映射成 Entity的class 属性 Entity之间的关系

* @OneToOne    { cascade:true} 告知 typeorm 当 增删改 一个 Entity的时候 是否级联增删它关联的Entity  保存 IdCard时 不用保存  User


* 如果是维持外健的那个表 也就是有 @JoinColumn的那个 Entity 它是可以根据外健关联查到另一方的
* 没有外健的 另一方  通过第二个参数告诉 typeorm 外健是另一个 Entity的哪个属性


* 一对一的时候我们还通过 @JoinColumn来指定外健列   一对多的关系可能是多的一方保存外健 不过可以通过 @JoinColumn 来修改外健的名字



* 一对多关系的映射 @ManyToOne @OneToMany装饰器
* TypeORM会自动在多的那一方添加外健 不需要通过 @JoinColumn指定 不过你可以通过 @JoinColmun来修改外健列的名字
* 双方只能有一方 cascade 不然会无限循环 设置了 cascade之后 只有一方保存 关联的另一方就会自动保存
* 删除的话 如果设置了 外健的 CASCADE或者 SET NULL 只删除主表（一的那一方） 对应的Entity就好了   mysql会做后续的关联删除或者 id 置空
* 否则就要删除所有的从表（多的那一方） 对应的Entity再删除主表对应的Entity