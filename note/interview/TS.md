1. 联合类型

- 联合类型是一种允许一个值成为多种可能类型中的一种类型。 使用 ｜
- 多种类型中一种 可能
- 函数参数类型
- 函数返回值
- 类型保护 'meow' in pet type Pet = Cat | Dog

```
type StringOrNumber = string | number;

let myVar:StringOrNumber;

```

2. 交叉类型

- 交叉类型是一种允许我们将多个类型合并为一个类型的技术。 &
- 由于 TS 是一门静态类型的语言 交叉类型中 & 并不是取 两个集合的交集。
- 而是将多个类型合并为一个类型。 并不是数学上的 取交集。

```
type Name = { name: string };
type Age = { age: number };

type Person = Name & Age; // Person 包含了 name 和 age 属性


```

3. 枚举

- enum 是一种 特殊的数据类型

```
// 数字枚举

enum Direction {
    North, // 0
    South, // 1
    East,  // 2
    West   // 3
}

let dir:Direction = Direction.North
console.log(dir);

enum Status {
    Idle = 3,
    Busy = 5,
    Done = 10
}

let status: Status = Status.Busy;
console.log(status);  // 输出：5

// 字符串

enum Color {
    Red = "RED",
    Blue = "BLUE",
    Green = "GREEN"
}

let color: Color = Color.Red;
console.log(color);  // 输出：RED

enum Mix {
    No = 0,
    Yes = "YES"
}

let mix: Mix = Mix.No;
console.log(mix);  // 输出：0
mix = Mix.Yes;
console.log(mix);  // 输出：YES


```

4. TS 中 class 修饰符

```
// public
class MyClass {
    public myPublicVar:number;
    constructor(){
        this.myPublicVar = 10;
    }
}
let myObject = new MyClass();
console.log(myOject.myPublicVar)

// private 只能在类的内部访问这个成员

class MyClass{
    private myPrivateVar:number;
    constructor(){
        this.myPrivateVar = 10;
    }
}
let myObject = new MyClass();
console.log(myObject.myPrivateVar); // 不可访问 会报错。



   class MyClass {
     protected myProtectedVar: number;
     constructor() {
       this.myProtectedVar = 10;
     }
   }
   class MyDerivedClass extends MyClass {
     constructor() {
       super();
       console.log(this.myProtectedVar); // 可以访问，输出 10
     }
   }
   let myBaseObject = new MyClass();
   console.log(myBaseObject.myProtectedVar); // 不可以访问，会报错


   class MyClass {
     readonly myReadonlyVar: number;
     constructor() {
       this.myReadonlyVar = 10; // 可以修改值
     }
     changeVar() {
       this.myReadonlyVar = 20; // 不可以修改值，会报错
     }
   }
   let myObject = new MyClass();
   console.log(myObject.myReadonlyVar); // 可以访问，输出 10

```

5. ts 中单例模式

```
// 在 ts中 单例模式是一种创建类的方式 确保一个类只有一个实例 并提供一个全局的访问点。
// 通常 单例模式用于 一次性初始化 且全局只需要一个实例的场景,例如 配置管理, 日志管理

class Singleton{
    private static instance:Singleton;
    private constructor(){

    }
    public static getInstance():Singleton{
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2) // true


// Singleton 类有一个私有的构造函数 这就是阻止了使用 new Singleton() 来创建新的实例。要获取该类的实例,必须通过 Singleton.getInstance() 方法来获取。



// es5 单例模式



var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

var instance1 = Singleton.getInstance();
var instance2 = Singleton.getInstance();

console.log(instance1 === instance2);  // 输出：true




```

- 封装和可访问性 ts 支持更像类的封装特性 例如支持 private public es5 利用 IIFE 构造一个私有的作用域来模仿这个特性。

- instanceof 用于测试 构造函数的 prototype 属性 是否出现在对象的原型链上。

# type interfeace

1. 定义方式和表现形式

- interface 主要用于定义对象的状态,当然也可以用于描述函数和类。
- type 可以定义任何类型 包括基本类型 string number 等 联合类型 交叉类型等。

2. 扩展和实现

- interface 可以通过拓展 extends implements 来复用
- type 不支持扩展和实现 但可以通过交叉类型实现类似的功能

3. 合并
   - interface 可以合并 当两个 ingerface 有相同的名字时,它们将被自动合并成一个
   - type 不能合并 定义两个相同的名字会报错

```
// 定义形式

interface Interface1 {
  key1:string;
}

type type1 = string;
type type2 = Type1 | null;
type type3 = Type1 & { key2:string};

interface Interface2 extends Interface1 {
  key2:number;
}

class MyClass implements Interface1 {
  key1 = "valu1"
}
// 合并
interface Interface1 {
  key2:number
}
// 实际应用
   interface User {
     id: number;
     name: string;
     email: string;
     age?: number; // 可选参数
   }

   const user: User = {
     id: 1,
     name: 'John Doe',
     email: 'john@domain.com'
   }

   interface Greeting {
     (name: string, language?: string): string
   }

   const greet: Greeting = (name, language = 'English') => {
     if(language === 'English') return `Hello, ${name}!`;
     return `Hola, ${name}!`;
   }
```

# 泛型

```
function getArrayItem<T>(array:T[],index:number):T{
  return array[index]
}
cons number

```