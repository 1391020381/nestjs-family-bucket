# 早期'假'模块化时代 
* 立即执行函数 闭包
```
(function(window, $) {
    var data = 'data'

    function foo() {
        console.log(`foo executing, data is ${data}`)
        console.log($)
    }
    function bar() {
        data = 'modified data'
        console.log(`bar executing, data is now ${data} `)
    }
    window.module1 = { foo, bar }
})(window, jQuery)

```
* 实现dat完全私有 外界无法修改data值  访问data 需要内部设计并暴露相关接口。并可以依赖其他模块。
* 事实上 这就是现代模块化方案的基石。

# 规范标准时代 CommonJS
* 在 Nodejs中,每个文件就是一个模块,具有单独的作用域,对其他文件是不可见的。
* 文件即模块,文件内所有代码都运行在独立的作用域,因此不会污染全局空间。
* 模块可以被多次引用 加载。在第一次被加载时, 会被缓存 之后都从缓存中直接读取结果。
* 加载某个模块,就是引入该模块的 module.export属性。
* module.exports 属性 输出的是值的拷贝,一旦这个值被输出,模块内再发生变化不会影响输出的值。
* 模块加载顺序按照代码加载的顺序。
* 注意 module.exports 和 exports的区别。

* CommonJS规范代码如何在浏览器端实现呢？ 其实就是实现 module.exports 和 require方法。

# 规范化标准时代AMD
* <script src="js/require.js" data-main="js/main"></script>

data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。
* main 通过 require函数依赖 define 定义的模块
* require.js实现 
* 通过 define方法,将代码定义为模块
* 通过 require 方法,实现代码的模块加载

* 在reuqire函数中 我们首先检查模块是否已经在缓存中,如果没有,就需要用 loadScript函数加载它。 一旦模块被加载并执行,它就会调用define方法将自己添加到模块缓存中,然后require 函数可以继续像之前一样处理模块。
# 规范标准时代UMD
* 允许在环境中同时使用AMD与CommonJS规范,相当于一个整合。

```
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD 规范
        define(['b'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // 类 Node 环境，并不支持完全严格的 CommonJS 规范
        // 但是属于 CommonJS-like 环境，支持 module.exports 用法
        module.exports = factory(require('b'));
    } else {
        // 浏览器环境
        root.returnExports = factory(root.b);
    }
}(this, function (b) {
    // 返回值作为 export 内容
    return {};
}));

```
# ES 原生时代和 tree shaking
* ES模块的设计思想是尽量 静态化  这样能保证在编译时就确认模块之间的依赖关系,每个模块的输入和输出变量也都是确定的。
* CommonJS 和 AMD 模块,无法保证前置即确定这些内容,只能在运行时确定。
* CommonJS模块输出的时一个值的拷贝
* ES模块输出的是值的 引用。

* ES模块化为什么要设计成静态的

* 一个明显的优势是: 通过静态分析 我们能够分析出导入的依赖。 如果导入的模块没有被使用,我们便可以通过 tree-shaking等手段减少代码体积,进而提升运行性能。 这就是基于 ESM 实现 tree-shaking的基础。

* 静态分析带来的限制：
    - 只能在文件顶部import依赖。
    - export 导出的变量类型严格限制。
    - 变量不允许被重新绑定,import的模块名只能是字符串常量,即不可以动态确定依赖。


# webpack
- webpack打包结果就是一个IIFE,一般称它为 webpackBootstrap,这个IIFE 接受一个对象 modules 作为参数,modules对象的key是依赖路径,value是经过简单处理后的脚本(它不完全等同于我们编写的业务脚本,而是被webpack进行包裹后的内容) 
- 打包结果中 定义了一个重要的模块加载函数 __webpack_require__
- 我们首先使用 __webpack_require__ 加载函数去加载入口模块, ./src/index.js
- 加载函数 __webpack_require__ 使用了闭包变量 installedModules 它的作用将已加载过的模块结果保存在内存中。  