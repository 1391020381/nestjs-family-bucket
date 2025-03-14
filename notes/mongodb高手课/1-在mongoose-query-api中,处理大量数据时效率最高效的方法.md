# Mongoose Query API中，哪些方法在处理大量数据时效率最高？

- 流式处理 cursor()
- 批量操作 deleteMany()
- 索引优化
  - createIndex() 创建合适的索引
  - explain() 分析查询计划 确保命中索引
  - 显著提升查询速度,尤其是对过滤(where) 排序(sort) 和 范围查询(gt/lt)
  - await Model.createIndex({field:1}) 创建升序索引
  - const plan = await Model.find({field:"value"}).explain("executionStats")
- 减少内存占用
  - select()
  - 仅返回必要字段
  - 减少数据传输和内存占用
  - Model.find().select('name age -\_id') 只返回 name age 排除 \_id

* cursor() + batchSize()
* lean() 返回普通js对象而非 mongoose文档。 减少内存占用和序列化开销 提升查询速度，适用于只读操作且不需要 Mongoose文档特性的场景
* allowDiskUse()
* estimatedDocumentCount()

  结合索引优化和投影（select()）减少数据量。
  优先使用游标和 lean() 处理海量数据。
  使用 explain() 分析查询性能，确保高效执行计划。
