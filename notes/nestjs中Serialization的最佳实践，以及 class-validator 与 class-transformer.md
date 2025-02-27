# nestjs中 Serialization的最佳实践，以及 class-validator 与 class-transformer

- class-validator 验证请求数据的合法性
- class-transformer 控制响应数据的格式(序列化)
- 最佳实践
  - 使用 DTO 和 Entity类分离输入输出逻辑 DTO 负责数据的转换和验证，而实体则专注于数据库模型的定义。
  - 全局启用 ValidationPipe 和 ClassSerializerInterceptor
  - 通过装饰器精细化控制字段的验证和序列化
