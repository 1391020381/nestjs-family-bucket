- post 请求的数据是通过 @Body装饰器来取，并且要有一个dto class来接收
- dto 是 data transfer object 数据传输对象，用于封装请求体的数据

```

export class Ooo{
  name:string;
  age:number;
  sex:bolean
  hobbies:Array<string>
}

@Post('ooo')
ooo(@Body() obj:Ooo){
    console.log(obj)
}

```

- 我们声明了参数的类型为 dto类，pipe里拿到这个类,把参数对象通过class-transformer转换为 dt类的对象,之后再用class-validator包对这个对象做验证。
