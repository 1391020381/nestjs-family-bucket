# 为什么生产环境要用 TypeORM 的 migration 迁移功能

- synchronize 只要创建或者修改了Entity,那就会自动创建表和修改表结构。
- 在开发时这样很方便，只要关注代码就好了，不用管修改表结构的事情。
- 在生产环境中，用synchronize很危险，很容易丢数据。

* TypeORM的 migration功能
* migration是迁移的意思，其实前面的 create table alter table 这些都是 migration功能
* typeorm提供了一个cli,执行了 migration:create的命令

* "migration:create": "npm run typeorm -- migration:create",
  - 生成空白 migration 文件
* "migration:generate": "npm run typeorm -- migration:generate -d ./src/data-source.ts",
  - 连接数据库，根据 Entity 和数据库表的差异，生成 migration 文件
* "migration:run": "npm run typeorm -- migration:run -d ./src/data-source.ts",
  - 执行 migration，会根据数据库 migrations 表的记录来确定执行哪个
* "migration:revert": "npm run typeorm -- migration:revert -d ./src/data-source.ts"

  - 撤销上次 migration，删掉数据库 migrations 里的上次执行记录

* 注意docker 启动容器是否是本次测试的容器。
