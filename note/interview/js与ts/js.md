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


# 箭头函数
1. 箭头函数有什么缺点
  - 没有arguments
  - 无法改变this    箭头函数this是父作用域的this
  - 某些箭头函数比较难理解
2. 什么时候不能使用箭头函数
  - 对象方法
  - 原型方法
  - 构造函数
  - 动态上下文中的回调函数  事件回调
  - Vue生命周期 和 methods  vue组件本质是对象  react组件(非hooks) 是 class
```
const obj = {
  name:"双越",
  getName:()=>{
    return this.name
  }
}

class Foo{
  constructor(name,city){
    this.name = name;
    this.city = city
  }
  getName = ()=>{
    return this.name
  }
}
  const f = new Foo('双越','北京')
  
```

# js严格模式特点
1. 全局变量必须先声明
2. 禁止使用 with
3. 禁止创建eval作用域
4. 禁止 this指向 window
5. 函数参数不能重复
```
"use strict"

function fn(){
  "use strict"
}


```


# JS内存垃圾回收
1. 引用计数(之前)  循环引用
2. 标记清楚 (现代)  js 循环 window对象看是否可以找到

* 闭包是内存泄漏吗？  内存泄漏是非预期  闭包的数据不能被垃圾回收

# js内存泄漏如何检测？ 场景有哪些？
* 被全局变量 函数引用 组件销毁时未清除
* 被全局事件 定时器引用  组件销毁时未清除
* 被自定义事件引用 组件销毁时未清除   event-emitter


* WeakMap WeakSet   key 只能是引用类型


# 浏览器和nodejs的事件循环有什么区别

## 宏任务和微任务
* 宏任务 setTimeout setInterval 网络请求
* 微任务 promise async await
* 微任务在下一轮dom渲染之前执行 宏任务之后执行。


## nodejs异步 
* Nodejs同样适用ES语法 也是单线程 也需要异步
* 异步任务也分 宏任务  + 微任务

* 但是 它的宏任务 和 微任务 分不同的类型 有不同的优先级

* 宏任务
  - Timers setTimeout setInterval
  - I/O callbacks 处理网络 流 TCP的错误回调
  - Idle prepare 闲置状态(nodejs内部使用)
  - Poll轮询 执行poll中的 I/O 队列
  - Check 检查 存储setImmediate回调
  - Close callbacks 关系回调 如 socket.on('close')
* 微任务
  - promise async/await process.nextTick
  - process.nextTick 优先级最高  
* 执行同步代码  执行微任务   按顺序执行6个类型的宏任务(每个执行结束时都执行当前的微任务) 
```
const p = document.createElement('p');
p.innerHTML = "new paragraph";
document.body.appendChild(p)
const list = document.getElementsByTagName('p');
console.log('length----',list.length);

console.log('start');

setTimeout(()=>{
  const list = document.getElementsByTagName('p')
  console.log('length on timeout ---',list.length)
  alert('阻塞 timeout')
})
Promise.resolve().then(()=>{
  const list = document.getElementsByTagName('p');
  console.log('length on promise.then-----',list.length)
  alert('阻塞 promsie')
})
console.log('end')
```


* 浏览器和nodejs的 eventloop流程基本相同
* nodejs宏任务和微任务分类型 有优先级
* 推荐使用 setImmediate 代替 process.nextTick



# vdom真的很快嘛
* 用js对象模拟dom节点数据

## Vue React框架的价值
* 组件化
* 数据视图分离  数据驱动视图
* 只关注业务数据 而不用关心dom变化


* vdom并不快 js直接操作dom 相对 vdom 更快 省掉了 中间 vdom 对比的过程
* 但 数据驱动视图 要更合适的技术方案 不能全部dom重建。  在 全链路 开发维护来看  vdom 模式 也就是 vue react 更快。

* svelte 就不用 vdom


# 遍历 数组 for 和 forEach 哪个快
* for更快
* forEach 每次都要创建一个函数来调用 而 for不会创建函数
* 函数需要独立的作用域 会有额外开销
* 越 低级 的代码 性能往往越好
* 日常开发别只考虑性能 forEach代码可读性更好

* 循环 递归  递归每次都要创建函数  而循环不会



# 什么是 JS Bridge
* js无法直接调用 native api
* 需要通过一些特定的格式 来调用。
* 这些 格式 就统称 JS-Bridge 例如微信 JSSDK

## JS Bridge 的常见实现方式
1. 注册全局API
2. URL Scheme 

#  requestIdleCallback  requestAnimationFrame 区别

* React fiber 引起的关注

* 组件转换链表 可分段渲染
* 渲染时可以暂停 去执行其他高优任务 空闲时再继续渲染
* 如何判断空闲  requestIdleCallback


* requestAnimationFrame 每次(帧)渲染完都会执行 高优
* requestIdleCallback 空闲时才会执行 低优


```
const box = document.getElementById("box");
document.getElementById("btn1").addEventListener("click",()=>{
  let curWidth = 100;
  const maxWidth = 400
  functin addWitdh(){
    curWidth = curWidth + 3;
    box.style.width = `${curWidth}px`;
    if(curWidth < maxWidth){
      window.requestAnimationFrame(addWidth)
     //  window.requestIdleCallback(addWidth)
    }
  }
  addWidth()
})

```

* 都是宏任务 都是要 dom渲染完执行