# 类型基础

1. 原始类型
2. 对象类型
3. 字面量类型
4. 枚举
5. 函数类型
6. 函数类型
7. Class 类型
8. 内置类型
   - any
   - unknow
   - never
   - 类型断言
     - as
     - 非空断言 foo.func!().prop!.toFixed()

```
const str:string = "linbudu";

// 从 X 类型  到 Y 类型 的断言可能是错误的

(str as { handler:()=>{}}).handler()


(str as unknown as {handler:()=>{}}).handler()
```

# 类型工具

1. 联合类型 |
2. 交叉类型 &
3. 索引类型

```
interface AllStringTypes {
    [key:string]:string
}

type AllStringTypes = {
    [key:string]:string
}

```

4. 映射类型

5. keyof

- 可以将对象中的所有健转换为对应字面量类型,然后再组合成联合类型。
- 注意 这里并不会讲数字类型的健转换为 字符串类型的字面量 而是 仍然保持为数字类型的字面量

6. typeof

7. 条件类型与 infer extends

8. 类型断言

- TS3.7 引入 asserts关键字进行断言场景下的类型守卫
- 判断条件不通过时,断言守卫需要抛出一个错误 类型守卫只需要剔除预期的类型。

```
function assert(condition:any,msg?:string):asserts condition{
    if(!condition){
        throw new Error(msg)
    }
}

```

9. 类型别名
   - type

- in 与 instanceof

# 类型系统

1. 结构化类型系统

- 泛型
- 泛型约束与默认值
- 多泛型关联 多个泛型参数之间的依赖，其实指的即是后续泛型参数重,使用前面的泛型参数作为约束或默认值
- 对象类型中的泛型

```
interface IRes<TData = unknown>{
    code:number;
    error?:string;
    data:TData
}

interface IUserProfileRes {
    name:string;
    homepage:string;
    avatar:string;
}

function fetchUserProfile():PromiseK<IRes<IUserProfileRes>>{}

type StatusSucceed = boolean;

function handleOeration(): Promise<IRes<StatusSucceed>>{}

```

```
type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002 ?'success':"failure"

```

2. 类型系统层级
3. 协变与逆变
4. 分布式条件类型
5. 上下文类型

# 类型编程

1. 访问性修饰工具类型
2. 结构工具类型
3. 集合工具类型
4. 模式匹配工具类型
5. 模版字符串工具类型

# 实战演练

1. TS React
2. TS ESlint
3. 装饰器与控制反转
4. TSConfig详解
5. Node API 开发和部署
