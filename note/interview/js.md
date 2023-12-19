# 基石

# 概念 检测方法 转换方法

- undefined Null Number String Boolean
- Symbol Bigint
- Object Array Date RegExp Math Function
- typeOf 基本类型 除去 null 对象类型只能识别 Functtion
- instanceof 不能识别基本类型 自定义 instanceof 判断原理
- Object.prototype.toString.call(obj).replace(/^[object (\S+)\]$/,'$1')
- 栈 堆

- 显示转换 隐式转换
- Number String Boolean
- parseInt parsefloat 解析到非 数字的位数
- 操作运算符 + - \* / 逻辑运算符 && || ! 关系运算符 > < <= >= 条件运算符 == if while
- null == undefined
- Object的转换规则 Symbol.toPrimitive valueOf toString

```
var obj = {

  value: 1,

  valueOf() {

    return 2;

  },

  toString() {

    return '3'

  },

  [Symbol.toPrimitive]() {

    return 4

  }

}

console.log(obj + 1); // 输出5

// 因为有Symbol.toPrimitive，就优先执行这个；如果Symbol.toPrimitive这段代码删掉，则执行valueOf打印结果为3；如果valueOf也去掉，则调用toString返回'31'(字符串拼接)

// 再看两个特殊的case：

10 + {}

// "10[object Object]"，注意：{}会默认调用valueOf是{}，不是基础类型继续转换，调用toString，返回结果"[object Object]"，于是和10进行'+'运算，按照字符串拼接规则来，参考'+'的规则C

[1,2,undefined,4,5] + 10

// "1,2,,4,510"，注意[1,2,undefined,4,5]会默认先调用valueOf结果还是这个数组，不是基础数据类型继续转换，也还是调用toString，返回"1,2,,4,5"，然后再和10进行运算，还是按照字符串拼接规则，参考'+'的第3条规则



```

# 深浅拷贝

## 浅拷贝

1. Object.assign({},{}) 不会拷贝继承属性 不可枚举属性 可拷贝Symbol类型属性
2. let cloneObj = { ...obj }
3. concat slice 拷贝数组
4. 手写浅拷贝

```

const shallowClone = (target) => {

  if (typeof target === 'object' && target !== null) {

    const cloneTarget = Array.isArray(target) ? []: {};

    for (let prop in target) {

      if (target.hasOwnProperty(prop)) {

          cloneTarget[prop] = target[prop];

      }

    }

    return cloneTarget;

  } else {

    return target;

  }

}


```

## 深拷贝

1. JSON.stringify()

- 不支持 function undefined symbol 健值对会消失
- Date 引用类型会变成字符串
- 无法拷贝不可枚举的属性
- 无法拷贝对象的原型链
- 无法拷贝对象的循环引用

2. 手写深拷贝
1. 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；

1. 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；

1. 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链；

1. 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。

```
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)

const deepClone = function (obj, hash = new WeakMap()) {

  if (obj.constructor === Date)

  return new Date(obj)       // 日期对象直接返回一个新的日期对象

  if (obj.constructor === RegExp)

  return new RegExp(obj)     //正则对象直接返回一个新的正则对象

  //如果循环引用了就用 weakMap 来解决

  if (hash.has(obj)) return hash.get(obj)

  let allDesc = Object.getOwnPropertyDescriptors(obj)

  //遍历传入参数所有键的特性

  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)

  //继承原型链

  hash.set(obj, cloneObj)

  for (let key of Reflect.ownKeys(obj)) {

    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]

  }

  return cloneObj

}

// 下面是验证代码

let obj = {

  num: 0,

  str: '',

  boolean: true,

  unf: undefined,

  nul: null,

  obj: { name: '我是一个对象', id: 1 },

  arr: [0, 1, 2],

  func: function () { console.log('我是一个函数') },

  date: new Date(0),

  reg: new RegExp('/我是一个正则/ig'),

  [Symbol('1')]: 1,

};

Object.defineProperty(obj, 'innumerable', {

  enumerable: false, value: '不可枚举属性' }

);

obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))

obj.loop = obj    // 设置loop成循环引用的属性

let cloneObj = deepClone(obj)

cloneObj.arr.push(4)

console.log('obj', obj)

console.log('cloneObj', cloneObj)




```

# JS继承

https://github.com/mqyqingfeng/Blog/issues/16

1. 原型链继承
2. 借用构造函数(经典继承)
3. 组合继承 1 + 2
4. 原型式继承 Object.create
5. 寄生式继承 创建一个仅用于封装继承过程的函数 该函数在内部以某种形式来做增强函数 最后返回对象

```
function createObj (o){
    var clone = Object.create(o);
    clone.sayName = function(){
        console.log('hi')
    }
    return clone
}

```

6. 寄生组合式继承 寄生 + 构造函数
7. es6 extend 寄生组合继承方式

# new apply call bind的底层逻辑

- eval() 函数会将传入的字符串解析为 js代码 并在当前作用域中执行这些代码

## new

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象 (this 指向对象)
3. 执行构造函数中的代码 （为这个新对象添加属性）
4. 返回新对象

```
function myNew(constructor, ...args) {
  // 创建一个新对象，该对象继承自构造函数的原型对象
  const obj = Object.create(constructor.prototype);
  // 调用构造函数并将新对象作为上下文
  const result = constructor.apply(obj, args);
  // 如果构造函数返回一个对象，则返回该对象
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  // 否则返回新对象
  return obj;
}


Function.prototype.bind = function (context, ...args) {

    if (typeof this !== "function") {

      throw new Error("this must be a function");

    }

    var self = this;

    var fbound = function () {

        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));

    }

    if(this.prototype) {

      fbound.prototype = Object.create(this.prototype);

    }

    return fbound;

}


```

## js闭包

- 闭包的表现形式

1. 返回一个函数
2. 定时器 事件监听 ajax请求 WebWorkers 或者 任何异步中 只要使用了回调都是用了闭包
3. 作为函数参数传递的形式
4. IIFE

```

for(var i = 1;i <= 5;i++){

  (function(j){

    setTimeout(function timer(){

      console.log(j)

    }, 0)

  })(i)

}



```

# 深入数组

# 数组的方法

1. 创建数组
2. 改变自身 不改变自身
3. 遍历

# 类数组

1. arguments
2. HTMLCollection
3. NodeList

# 数组片扁平化

# 异步编程

# JS引擎
