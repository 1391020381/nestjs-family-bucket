# Mongoose Query API中，如何组合使用各种方法进行更复杂的查询？

```

const products = await Product.find().or([{}]).and([{}]).skip(5).lean()



// 查询包含至少一条作者为 "John" 且点赞数 >50 的评论的文章
const articles = await Article.find().elemMatch('comments', { author: 'John', likes: { $gt: 50 } }).populate('author', 'username');  // 关联查询作者信息，仅返回 username 字段


// distinct  去重查询

const cities = await User.distinct('city',{age:{$gt:18}}).exec()


// $exists 是用于检查文档中某个字段是否存在的一个查询操作符。  $exists:true  匹配包含指定字段的文档(即使字段值为null)   $exists:false 匹配不包括指定字段的文档
Model.find({ field: { $exists: <Boolean> } })


// 查询距离坐标 [40.73, -73.99] 10 公里内的地点
const locations = await Location.find()
  .where('geo')
  .within()
  .circle({ center: [40.73, -73.99], radius: 10, spherical: true });



// 将状态为 "expired" 的订单标记为删除
const result = await Order.updateMany(
  { status: 'expired' },
  { $set: { deleted: true } }
).session(session);  // 在事务中执行     mongoose中事务



// 使用 explain 分析查询性能
// 如果 totalKeysExamined ≪ totalDocsExamined，说明未有效使用索引
// 观察 winningPlan.indexName 确认是否使用了预期索引
const explanation = await Query.find()
  .where('tags').in(['mongodb', 'mongoose'])
  .explain('executionStats');

// 允许 MongoDB 使用磁盘进行大结果排序
const largeData = await Data.find()
  .sort({ timestamp: -1 })
  .allowDiskUse(true)
  .cursor();  // 使用游标逐条处理



// Aggregate()
```
