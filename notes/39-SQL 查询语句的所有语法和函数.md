- where 查询条件 比如 where id = 1
- as 别名 比如 select xxx as 'yyy'
- and 连接多个条件
- in / not in 集合查找 比如 where a in (1,2)
- between and 区间查找 比如 where a between 1 and 10
- limit 分页 比如 limit 0,5
- order by 排序 可以指定先根据什么排序 如果相等再根据什么排序，比如 order by a desc b asc
- group by 分组 比如 group by aaa
- having 分组之后再过滤 比如 group by aaa having xxx > 5
- distinct 去重

# sql内置函数

- 聚合函数 avg count sum min max
- 字符串函数 concat substr length upper lower
- 数值函数 round ceil floor abs mod
- 日期函数 year month day date time
- 条件函数 if case
- 系统函数 version datebase user
- 类型转换函数 convert cast date_format str_to_date
- 其他函数 nullif coalesce greatest least
