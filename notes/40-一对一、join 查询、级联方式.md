- primary key 指定 id 为主键
- index 是 建立索引 索引名 card_id_idex 用于加速user_id的访问
- constrint user_id foreign key 是给 user_id 添加 一个外键约束
- 然后 user_id references user id 则是指定 user_id引用 user表的id列

* INNER JOIN 是只返回两个表中能关联上的数据
* LEFT JOIN 是额外返回左表中没有关联上的数据
* RIGHT JOIN 是额外返回右表中没有关联上的数据
* 在 FROM后的左表，JOIN后的表是右表

* 一般情况，还是用默认的JOIN ON比较多,也就是 INNER JOIN
* 删除和更新时的级联操作
  - 也就是当user删除的时候，关联的id_card要不要删除
  - 当user的id修改的时候，关联的id_card要不要改user_id
  - CASCADE 主表主键更新 从表关联记录的外键跟着更新，主表记录删除 从表关联记录删除
  - SET NULL 主表主键更新或者主表记录删除，从表关联记录的外键设置为null
  - RESTRICT 只有没有从表的关联记录时，才允许删除主表记录或者更新主表记录的主键id
  - NO ACTION 同 RESTRICT，只是 sql 标准里分了 4 种，但 mysql 里 NO ACTION 等同于 RESTRICT
