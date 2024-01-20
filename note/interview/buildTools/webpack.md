- 成熟的工具,重点在于配置和使用及优化 原理并不高优。

# 基本配置

- 安装配置
- 默认单入口
- dev-server
- 解析 ES6
  - babel-loader
  - .babelrc
    - presets:['']
- 解析样式
  - style-loader
  - css-loader
  - less-loader
  - postcss-loader postcss.config.js
  - loader从后往前执行 ['style-loader','css-loader','postcss-loader']
- 解析图片和文件
  - dev file-loader
  - url-loader
  - options:{
    // 小于 5kb的图片用base64格式产出
    // 否则 依然延用 file-loader的形式 产出 url格式
    limit:5\*1024,
    outputPath:"/img1",
    // 设置图片的 cdn地址
    // publicPath:'htttp://cdn.abc.com'
    }
- 常见loader 和 plugin
- 拆分配置 和 merge
  - common dev prod
  - webpack-merge
  - webpack-dev-server
    - proxy

# 高级配置

- 多入口
  - entry:{
    index:path.join(srcPath,'index.js'),
    other:path.join(srcPath,'other.js')
    }
  - output:{
    filename:"[name].[contentHash:8].js"
    }
  - plugins:[
    new HtmlWebpathPlugin({
    template:path.join(srcPath,'index.html'),
    filename:'index.html',
    // chunks表示该页面引用哪些chunk (即上面的index other)
    chunks:['index'] // 只引用 index.js
    })
    ]
- 抽离和压缩css
  - const miniCssExtractPlugin = require("mini-css-extract-plugin")
  - miniCssExtractPlugin.loader 替换 style-loader
  - plugins new miniCssExtractPlugin({filename:"css/main.[contentHash].css"})
  - const terserWebpackPlugin = require(terser-webpack-plugin)
  - const optimizCssAssetsWebpackPlugin = require(optimize-css-assets-webpack-plugin)
  - webpack的 optimization:{minimizer:[new terserWebpackPlugin(),new optimizCssAssetsWebpackPlugin() ]}
- 抽离公共代码

```
optimization:{
    splitChunks:{
        chunks:'all',
        /**
            inital 入口 chunK 对于异步导入的文件不处理
            async 异步 chunk 只对异步导入的文件处理
            all 全部 chunk
         */
         // 缓存分组
         cacheGroups:{
            // 第三方模块
            vendor:{
                name:"vendor", // chunk 名称
                priority:1, // 权重优先 优先抽离 重要‼️
                test:/node_modules/,
                minSize:5, // 大小限制
                minChunks:1 // 最少复用过几次

            },
            // 公共模块
            common:{
                name:'common',
                priority:0,
                minize:0,
                minChunks:2
            }
         }
    }
}

```

- chunks 产生
  - 入口
  - 代码分割
  - 异步加载
- 懒加载
  - import('./xxx.js').then(res=>{console.log(res.default.message)})
- 处理React 和 Vue
  - react "@babel/preset-react" js 会配置 .babelrc
  - vue "vue-loader" 匹配 .vue -> vue-loader

## module chunk bundle 的区别

- moudule 各个源码文件 webpack中一切皆模块
- chunk 多个模块合并成的 entry import() splitChunk
- bundle 最终的输出文件

# 优化打包效率

- 优化 babel-loader

```
{
    test:/\.js$/,
    use:['babel-loader?cacheDirectory'],// 开启缓存
    include:path.resolve(__dirname,'src'),// 明确范围
    // 排除范围 include exclude 两者 选一个即可
    //
}

```

- IgnorePlugin

* 避免引入无用模块
* import moment from 'moment'
* 默认会引入所有语言js代码 代码过大
* 手动引入 中文 import "moment/local/zh-cn"

```
// webpack plugin

new webpack.IgnorePlugin(/\.\/locale/,/moment/)

```

- noParse

* 避免重复大包

* IgnorePlugin直接不引入 代码中没有
* noParse 引入 但不打包

```
module:{
    // 独立完整的 'react.min.js' 文件就没有采用模块化
    //  忽略对 'react.min.js' 文件的递归解析处理
    noParse:[/react\.min\.js]
}

```

- happyPack

* 多进程打包
* js单线程 开启多进程打包
* 提高构建速度 特别是 多核

```
const HappyPack = require('happypack')
// rule
{
    test:"/\.js$/",
    use:['happypack/loader?id=babel'],
    include:"src"
}

// plugin

new HappyPach({
    // 用唯一的标识符 来代表当前的 happPack 是用来处理一类特定的文件
    id:"babel",
    loaders:['babel-loader?cacheDirectory']
})
```

- ParallelUglifyPlugin

* 多进程压缩js

```
const  ParallelUglifyPluginllelug = require('webpack-parallel-uglify-plug')

// plugin

new ParallelUglifyPluginllelug({
    // 还是使用 uglifyJS压缩 只是开启多进程
    uglifyJS:{
        output:{
            beautify:false,
            comments:false
        },
        compress:{
            drop_console:true,
            // 内嵌定义了但是只能用一次的变量
            collapse_vars:true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars:true
        }

    }
})

```

- 关于开启多进程
- 项目较大 打包较慢 开启多进程能提高速度
- 项目较小 打包速度 开启多进程会降低速度 (进程开销)
- 按需使用

* 自动刷新

```
moudle.export = {
    watch:true, // 开启监听 默认为 false
    // 监听配置
    watchOptions:{
        ignored:/node_modules/, // 忽略哪些
        // 监听到变化发生会等300ms再去执行动作,防止文件更新太快导致重新编译频率太高
        aggregateTimeout:300, // 默认为 300ms
        // 判断文件是否发生变化时 通过不停的去询问系统指定文件有没有变化实现
        poll:1000 // 默认每隔1000 毫秒询问一次。
    }
}

```

- 热更新

* vue react 热更新
* 在 Vue.js 中，热更新功能是由 Vue-loader 和 Webpack 的 Hot Module Replacement（HMR）机制提供的。因此，在 Vue.js 中，我们不需要手动使用 module.hot 来启用热更新功能。

当我们在开发环境下使用 Vue.js 时，如果修改了某个组件的代码，Webpack 会自动检测到这个变化，并使用 HMR 机制实现对这个组件的热更新。在更新组件时，Vue.js 会自动销毁旧的组件实例，并创建新的组件实例，从而实现热更新的效果。

- 自动刷新 整个网页全部刷新 速度较慢
- 自动刷新 整个页面全部刷新 状态会丢失
- 热更新 新代码生效 网页不刷新 状态不丢失

```
const HotModuleReplacementPlug  = require("webpack/lib/HotModuleReplacementPlug")

entry:{
    index:["webpack-dev-server/client?http://localhost:8080/","webpack/hot/dev-server",path.join(srcPath,'index.js')]
}
plugin:[
    new HotModuleReplacementPlugin()
]
devServer:{
    hot:true
}

// 增加 开启热更新之后的代码逻辑
if(moduel.hot){
    module.hot.accept(['./math'],()=>{
        const sumRes = sum(10,30)
        console.log('sumRes in hot',sumRes)
    })
}
```

- DllPlugin

* 动态链接库插件
* 前端框架 如 vue React 体积大 构建慢
* 较稳定 不常升级版本
* 同一个版本只构建一次即可 不用每次都重新构建
* webpack 已内置DllPlugin支持
* DllPlugin 打包出 dll文件
* DllReferencePlugin 使用 dll文件

```

const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const { srcPath,distPath } = require("./paths")

module.exports = {
    model:"development",
    entry:{
        react:['react','react-dom'],

    },
    output:{
        filename:"[name].dll.js",
        path:distPath,
        library:'_dll_[name]',
    },
    plugins:[
        new DllPlugin({
            name:'_dll_[name]',
            path:path.join(distPath,'[name].manifest.json')
        })
    ]
}
// index.html
<script src="react.dll.js"></script>

// 正常打包
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin")
// 打包js  exclude:/node_moduels/
new DllReferencePlugin({
    manifest:require(path.join(distPath,'react.manifest.json'))
})
```

- 自动刷新 热更新 DllPlugin 不用于生产环境
<!-- - 优化 babel-loader
- IgnorePlugin
- noParse
- happPack
- ParallelUglifPlugin -->

# 优化产出代码

- 体积更小
- 合理分包 不重复加载
- 速度更快 内存使用更少

* 使用生产环境
  - 自动开启压缩代码
  - vue react 等 会自动删掉调试代码(比如开发环境 warning)
  - 启动 Tree-Shaking
    - ES6 Module 才行
* 小图片 base64编码
* bundle 加 hash
* 使用 CDN
* 提取公共代码
* IngorePlugin
* 懒加载
* scope hosting
  - 多个函数 打包到一个函数中
  - 代码体积更小
  - 创建函数作用域更小
  - 代码可读性更好

```

// hello.js
export default 'helle,双越'

// main.js

import str from './hello.js'

console.log(str)

const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')

resolve:{
    // 针对 npm 中的第三方模块优先采用 jsnext:main 指向es6 模块化语法的文件
    mainFields:['jsnext:main','browser',]
},
plugins:[
    new ModuleConcatenationPlugin()
]

```

## ES6 Module 和 Commonjs区别

- ES6 顶层引入 静态引用 编译时引入 不能条件引用
- Commonjs动态引入 执行时引入
- 只有 ES6 Module才能静态分析 实现 Tree-Shaking

# 构建流程概述

# babel

- babel 只解析语法
- 不处理模块化 webpack处理模块化

* presets
* plugin

* polyfill

  - core-js
  - regenerator
  - babel-polyfil 包含 core-js regenerator 现已被弃用, Babel7.4推荐直接只用
  - 按需引入 polyfill

  ```
    // .babelrc

    {
        "presets":[
            [
                "@babel/preset-env",
                {
                    "useBuiltIns":"usage",
                    "corejs":3, // 版本
                }
            ]
        ]
    }



  ```

* babel-polyfill的问题
  - 污染全局变量
  - 独立 web 无影响
  - 独立 lib 会有影响
* runtime

```
// .babelrc

  {
        "presets":[
            [
                "@babel/preset-env",
                {
                    "useBuiltIns":"usage",
                    "corejs":3, // 版本
                }
            ]
        ],
        "plugins":[
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime":false,
                "corejs":3,
                "helpers":true,
                "regenerator":true,
                "useESModules":false
            }
        ]
    }

```

# webpack面试题

1. 前端代码为何要进行构建和打包

   - 体积更小 tree-shaking 压缩 合并 加载更快
   - 编译高级语言或语法 ts es6+ 模块化 scss
   - 兼容性和错误检查 polfil postcss eslint

   - 统一 高效的开发环境
   - 统一的构建流程和产出标准
   - 集成公司构建规范 提测 上线等

2. module chunk bundle 分别的意思 区别

3. loader 和 plugin 区别

4. webpack如何实现懒加载

- import()
- 结合 vue react 异步组件
- vue react 路由懒加载

5. webpack常见性能优化

6. babel-runtime babel-polyfill 区别

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出 lib 使用 babel-runtime

7. 常见 loader 和 plugin

- https://www.webpackjs.com/loaders
- https://www.webpackjs.com/plugins

8. babel 和 webpack 的区别

- babel js新语法编译工具 不关心模块化
- webapck 打包构建工具 是多个 loader plugin 集合

9. 如何产出一个 lib

- output:{
  filename:"loadash.js",
  path:distPath,
  // lib 全家变量名
  library:'loadash'
  }

10. 为何 Proxy 不能被 Polyfill

- Proxy 的功能 无法通过现成的 api 模拟

11. webpack 性能优化

- 构建优化
- 产出优化

# webpack5

- webpack5主要是内部效率的优化
- 对比 webpack4 没有太多使用上改动
