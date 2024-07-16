- Pipe是在参数传给 handler之前对参数做一些验证和转换的class

* class-validator
  - 可以用装饰器和非装饰器两种方式对class属性做实验的库
* class-transformer

  - 将普通对象转换为类的某个实例，反之亦然

* ParseEnumPipe

  - 限制参数范围，如果参数不在枚举里面，会报错。
  - 转换类型，获取到的参数会被转换为 Ggg 枚举类型

* ParseUUIDPipe

  - UUID 是一种随机生成的几乎不可能重复的字符串,可以用来做id
  - uuid 包可以生成这种id
  - UUID在线生成

* 自定义 pipe
  - metadata { metatype: [Function: String], type: 'query', data: 'aaa' }
