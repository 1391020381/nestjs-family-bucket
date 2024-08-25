# Nest 项目里如何使用 TypeORM 迁移

## TypeORM 的 migration。

- 在开发环境下，我们会开启 syncronize，自动同步 entities 到数据库表。
- 包括 create table 和后续的 alter table。
- 但是在生产环境下，我们会把它关闭，用 migration 把表结构的变动、数据初始化管理起来。
- 通过 migration:run、migration:revert 命令来执行和撤销。

* 执行 script 有问题。
