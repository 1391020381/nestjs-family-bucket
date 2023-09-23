# TypeORM

## 一对一的映射和关联

## 一对多的映射和关联

```
//  Employee
@ManyToOne(()=> Department,{
    cascade:true
})
department:Department


// Department

@OneToMany(()=> Employee,(employee)=> employee.department)
employees:Employee[]

```

- 一对多的关系只可能是在多的那一方保存外健

* @ManyToOne @OneToMany 装饰器
* TypeORM 会自动在多的那一方添加外健,不需要通过 @JoinColumn 指定 不过你可以通过 @JoinColumn 来修改外健列的名字
* 双方只能有一方 cascade 不然会无限循环 设置了 cascade 之后 只要一方保存 关联的另一方就会自动保存。
* 删除 cascade set null

* @ManyToMany 和 @JoinTable
