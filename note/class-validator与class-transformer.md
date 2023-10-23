# class-validator

- class-validator用于类的验证,

# class-transformer

- class-transformer 序列化响应数据。

# mapped-types

- https://docs.nestjs.com/openapi/mapped-types

```

 new ValidationPipe({
        transform: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ["update"],
}


```

- transform 如果设置成 true则代码验证前先把请求转换为DTO的实例
- whitelist 用于过滤掉没有添加验证的器的多余属性(但是如果该属性存在DTO中且DTO中没有添加验证器,但又不想被过滤 加上 @Allow装饰器)

* forbidNonWhitelisted设置为 true时,当请求中有DTO中不存在的多余属性被传入,则nestjs会抛出403异常(前提是whitelist必须设置成true)
* forbidUnknownValues代表被验证的DTO类必须至少有一个属性使用了 class-validator中的验证规则(此选项是否设置无关紧要)
* validationError.target代表不会在响应数据中使我们的验证类也暴露传来
* groups用于设置验证组
