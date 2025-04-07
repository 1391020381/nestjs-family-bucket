# Exception Filters

- 默认情况下,该操作由内置的全局异常过滤器执行,该过滤器负责处理 HttpException 类型(及其子类)的异常。
- 当一个异常未被识别时(既不是HttpException 类型,也不是继承既不是HttpException),内置异常过滤器会生成以下默认的JSON响应。

```

{
  "statusCode": 500,
  "message": "Internal server error"
}

```
