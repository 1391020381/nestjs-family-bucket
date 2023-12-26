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

- 类型别名 type

* 通过 type 关键字 声明了一个类型别名 A 同时它的类型等价于 string 类型。 类型别名作用主要是对一组类型或一个特定类型结构进行封装,以便于在其它地方进行复用。
* 工具类同样基于类型别名, 只是多了个泛型。 泛型是入参,内部逻辑基于入参进行某些操作,再返回一个新的类型。
* 对于对象类型的交叉类型 其内部的同名属性同样会按照交叉类型进行合并。
* 交叉类型和联合类型的区别就是,联合类型只需要符合成员之一即可,而交叉类型需要严格符合每一位成员。

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

```
type Stringify<T> = {
    [ K in keyof T]:string
}

```

- 工具类型会接受一个对象类型 使用 keyof 获得这个对象类型的健名组成字面量联合类型,然后通过映射类型 (即这里的 in 关键字) 将这个联合类型的每一个成员映射处理,并将其健值类型设置为 string。

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

- 类型的重要意义之一是限制了数据的可用操作与实际意义。

1. 结构化类型系统

- 鸭子类型中两个类型的关系是通过 对象中的属性方法来判断的。 基于类型结构进行兼容性判断的结构化类型系统以外
- 基于类型名进行兼容性判断的类型系统
- 标称类型系统 两个兼容的类型 其名称必须完全一致 父子类型关系只能通过显示的继承来实现。
- 类型的重要意义之一是限制了数据的可用操作与实际意义

- TS中实现类型附带的额外信息来实现的(类型元数据) 要在TS中实现 其实我们也只需要为类型附加元数据即可。同时保留原本信息

- `Nominal<number, 'CNY'>` 返回的类型是 `number` 类型和 `TagProtector<'CNY'>` 类型的交叉类型，即 `number & TagProtector<'CNY'>`。这里的 `TagProtector` 是一个类类型，它的作用是为了给 `number` 类型添加一个唯一的标记，用于区分不同的类型。这个标记是一个字符串类型，例如在这个例子中，标记为 `'CNY'`。

交叉类型是 TypeScript 中的一种高级类型，它将多个类型合并成一个类型。在交叉类型中，如果一个类型是原始类型，那么它会被视为一个对象类型，因为原始类型没有属性和方法。因此，交叉类型中的原始类型和类类型会被合并为一个对象类型。

由于交叉类型是将多个类型合并为一个类型，因此可以将原始类型和类类型合并为一个交叉类型。例如，可以将 `number` 类型和 `TagProtector<'CNY'>` 类型合并为 `number & TagProtector<'CNY'>` 类型。

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

- never
- 'linbudu' true 599 对应字面量类型
- string boolean number 基础类型 拆箱类型
- String Boolean Number 装箱类型
- Object 顶级类型
- any unknown Top type

3. 协变与逆变
4. 分布式条件类型

- 分布式条件类型（Distributive Conditional Types）是 TypeScript 中的一种高级类型，它可以自动将联合类型中的每个成员类型分别应用到条件类型中，然后将结果合并为一个新的联合类型。

例如，考虑以下代码：

```typescript
type MyType<T> = T extends string ? number : boolean;
type Result = MyType<"a" | "b">; // boolean | number
```

在这里，`MyType` 是一个条件类型，它接受一个类型参数 `T`，如果 `T` 是 `string` 类型，则返回 `number` 类型，否则返回 `boolean` 类型。然后，我们将联合类型 `'a' | 'b'` 作为类型参数传递给 `MyType`，得到的结果类型是 `boolean | number`。这是因为 TypeScript 会自动将 `'a' | 'b'` 中的每个成员类型分别应用到 `MyType` 中，然后将结果合并为一个新的联合类型。

分布式条件类型的运作方式可以用以下伪代码来表示：

```typescript
type MyType<T> = T extends (infer U) ? SomeOtherType<U> : never;
type Result = MyType<X> | MyType<Y> | MyType<Z> | ...;
```

其中，`infer U` 表示要从 `T` 中推断出一个新的类型变量 `U`，然后将 `U` 应用到 `SomeOtherType` 中，得到一个新的类型。最终，将所有 `MyType<T>` 的结果合并为一个联合类型 `MyType<X> | MyType<Y> | MyType<Z> | ...`。

需要注意的是，分布式条件类型只会在联合类型中自动展开，而不会在交叉类型中自动展开。如果要在交叉类型中使用条件类型，需要手动使用括号将交叉类型括起来，例如：

```typescript
type MyType<T> = T extends string ? number : boolean;
type Result = MyType<"a" & "b">; // boolean
type Result2 = MyType<("a" | "b") & string>; // number | boolean
```

5. 上下文类型

# 类型编程

1. 访问性修饰工具类型

- 对属性的修饰 包括对象属性 和数组元素的可选 必选 只读 可写

2. 结构工具类型

- 对既有类型的裁剪 拼接 转换。
- 条件类型 映射类型 索引类型
- 结构工具类型 其实分为两类 结构声明 和结构处理。

```
type Record<K extends keyof any,T> = {
    [P in K]:T
}
// 健名均为字符串 健值类型未知
type Record1 = Record<string,unknown>

type Pick<T,K extends keyof T> = {
    [P in K]:T[P]
}
interface Foo {
    name:string;
    age:number;
    job:JobUnionType
}
type PickedFoo = Pick<Foo,"name"|"age">


type Omit<T,K extends keyof any> = Pick<T,Exclude<keyof T,K>>

```

- Exclude<A,B>的结果就是联合类型A中不存在于B中

3. 集合工具类型

- 对集合(联合类型)的处理 交集 并集 差集 补集。

4. 模式匹配工具类型

- 基于infer的模式匹配 即对一个既有类型特定位置类型的提取,比如提取函数类型签名中的返回值类型。

5. 模版字符串工具类型

- 模版字符串专属的工具类型 比如对象类型所有属性名转换为大驼峰的形式

```
type Partial<T> = {
    [P in keyof T]?: T[P]
}

type Required<T> = {
    [P in keyof T]-?:T[P]
}

type Readonly<T> = {
    readonly [P in keyof T]：T[P]
}

type Mutable<T> = {
    - readonly [P in keyof T]:T[P]
}

// 并集

export type Concurrence<A,B> = A | B
// 交集
export type Intersection<A,B> = A extends B ? A:never;

// 差集 对于 A B 集合来说 A相对于B的差集 即为 A中独有而B中不存在的元素的组成的集合

export type Difference<A,B> = A extends B ? never:A



```

1. 类型检查指令

- ts-ignore @ts-ignore
- ts-expect-error

2. 类型声明

- declar
- 这些类型声明就像我们在TS中的类型标准一样,会存放着特定的类型信息。
- .d.ts文件 类型声明文件 通过额外的类型声明文件 在核心代码文件以外去提供对类型的进一步补全。 类型声明文件 会自动低被加载到环境中 实现对应部分代码的类型补全。
- .d.ts 并不包含代码逻辑 只做一件事情 为 TS类型检查与推倒提供额外的类型信息

```
// pkg 一个没有类型定义的npm包
declare module 'pkg'{
    const handler:()=>boolean
}

```

3. DefinitelyTyped

- @types开头的这一类 npm包 均属于 DefinitelyTyped

4. 扩展已有的类型定义

```
declare var window:Window & typeof globalThis

interface Window{
    userTracker:(...args:any[])=> Promsie<void>
}


```

5. 三斜线指令

- 三斜线指令就像声明文件中的导入语句一样,它的作用就是 声明当前的文件依赖的其他类型声明。
- 其他类型声明 包括 ts内置类型是声明(lib.d.ts) 三房库的类型声明以及你自己提供的类型声明文件
- 需要注意的是 三斜线指令必须被放置在文件的顶部才能生效。

```
/// <reference path="./other.d.ts" />

```

6. 命名空间
7. 仅类型导入

# 实战演练

1. TS React
2. TS ESlint
3. 装饰器与控制反转
4. TSConfig详解
5. Node API 开发和部署
