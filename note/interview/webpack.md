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
* 热更新
* DllPlugin

# 优化产出代码

- 使用生产环境
- 小图片 base64编码
- bundle 加 hash
- 使用 CDN
- 提取公共代码
- 懒加载
- scope hosting

# 构建流程概述

# babel

- polyfill
- runtime

# webpack面试题

1. 前端代码为何要进行构建和打包
2. module chunk bundle 分别的意思 区别
3. loader 和 plugin 区别
4. webpack如何实现懒加载
5. webpack常见性能优化
6. babel-runtime babel-polyfill 区别

# webpack5

- webpack5主要是内部效率的优化
- 对比 webpack4 没有太多使用上改动
