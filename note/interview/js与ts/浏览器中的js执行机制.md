# js代码执行是按顺序执行的- 变量提升

# 变量提升
* js在代码执行过程中,js引擎把变量的声明部分和函数部分提升到代码开头的 行为。
* 变量被提升后，会给变量设置默认值 这个默认值就是我们熟悉的 undefined

```
/*
* 变量提升部分
*/
// 把变量 myname提升到开头，
// 同时给myname赋值为undefined
var myname = undefined
// 把函数showName提升到开头
function showName() {
    console.log('showName被调用');
}

/*
* 可执行代码部分
*/
showName()
console.log(myname)
// 去掉var声明部分，保留赋值语句
myname = '极客时间'

```

* 实际上变量和函数声明在代码里的位置是不会改变的,而且是在编译阶段被js引擎放入内存中。
* 输入一段代码,经过编译后,会生成两部分内容: 执行上下文 Execution context 和 可执行代码。
* 执行上下文是js执行一段代码的运行环境，比如调用一个函数,就会进入这个函数的执行上下文,确定该函数在执行期间用到的 this,变量 对象以及函数等。
* 在执行上下文中存在一个变量环境的对象(Viriable Environment) 该对象中保存了变量提升的内容。

# 代码中出现相同的变量或者函数怎么办？

* 一段代码如果定义了两个相同的函数 那么最终生效的是最后一个函数。
* 如果是同名的函数，JavaScript编译阶段会选择最后声明的那个。
* 如果变量和函数同名，那么在编译阶段，变量的声明会被忽略


# 调用栈
* 调用栈就是用来管理函数调用关系的一种数据结构。
* 栈 先进后出


* 尾递归调用

```

function factorial(n, result = 1) {
    if (n < 2) {
        return result;
    }
    return factorial(n - 1, n * result);
}

```

* 在方法结束时出现的表达式，仅仅是自身的函数调用的递归，就是尾递归。
* 这里比较return n * factorial(n - 1);与return factorial(n - 1, n * result);就可以很好的看出来了，后者是一个纯粹的函数调用，而前者是在函数调用完后仍然做了其他运算


# 作用域
* 全局作用域
* 函数作用域
* 块级作用域

* 词法作用域就是指作用域是由代码中函数声明的位置来决定的，所以词法作用域是静态的作用域,通过它就能够预测代码在执行过程中如何查找标识符。