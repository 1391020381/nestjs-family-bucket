- sql 可以嵌套sql，也就是子查询。

```
select name,class from student where score = ( select max(score) from student )

```

- EXISTS NOT EXISTS

```
select name from department where exists( select * from employee where department.id = )


```
