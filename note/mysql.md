# Docker mysql

1. port
2. MYSQL_ROOT_PASSWORD
3. 指定 volume 用本地目录作为数据卷挂载到容器的 /var/lib/mysql

- 这就是 RESTIRCT 和 NO ACTION 的处理逻辑：只要从表有关联记录，就不能更新 id 或者删除记录。

* CASCADE 的处理逻辑：主表删除，从表关联记录也级联删除，主表 id 更新，从表关联记录也跟着更新。
* set null 的处理逻辑：主表记录删除或者修改 id，从表关联记录外键置为 null。

* 一对多关系是通过在多的一方添加外健来引用一的一方的 id 员工表引用 department 的 id

* 文章 标签 多对多
* 文章一个表 标签一个表 这两个表都不保存外健 然后添加一个中间表来保存双方的外健。
* 这样文章和标签的关联关系就都被保存到了这个中间表里。
