# 前端构建工具解决的问题
1. 模块化方案
    1. 提供模块加载方案
    2. 兼容不同模块规范
2. 语法转译
    1. 高级语法转译 如 Sass TS
    2. 资源加载  img 字体 worker
3. 产物质量
    1. 产物压缩 
    2. 代码混淆
    3. tree shaking
    4. 语法降级

4. 开发效率
    1. HMR
    2. 构建速度  

# Vite
1. 开发阶段基于浏览器原生ESM的支持实现了 no-bundle服务
2. 借助 Esbuild超快的编译速度来做第三方库构建和TS/JSX语法比编译 提高开发效率  
3. 模块化方面 Vite 基于浏览器原生的ESM的支持实现模块加载 并且无论开发环境还是生产环境 都是可以将其他格式产物(如 CommonJS)转换为ESM。
4. 语法转译方面 Vite 内置了对TS JSX Sass等高级语法的支持, 也能够加载各种各样的静态资源 如 img worker等。
5. 产物质量方面 Vite基于成熟的打包工具 Rollup实现生产环境打包 同时可以配合 Terser Babel等工具链 可以极大程度保证构建产物的质量。            


* vite 双引擎
# 部分问题
1. 第三方库里面含有 CommonJS 代码导致报错了怎么办?
2. 想在开发过程中进行 Eslint 代码规范检查怎么办？
3. 生产环境打包项目后，如何产出构建产物分析报告？
4. 如果要兼容不支持原生 ESM 的浏览器，怎么办？



5. 写一个 Esbuild 插件来处理一下问题依赖
6. 对于 Rollup 打包产物进行自定义拆包，解决实际场景中经常出现的循环依赖问题
7. 使用 Esbuild 的代码转译和压缩功能会出现哪些兼容性问题？如何解决？


8. @babel/preset-env 的 useBuiltIns 属性各个取值有哪些区别？
9. @babel/polyfill 与 @babel/runtime-corejs 有什么区别？
10. @babel/plugin-transform-runtime 与@babel/preset-env 的 useBuiltIn 相比有什么优化？
11. core-js 的作用是什么？其产物有哪些版本？core-js 和 
12. core-js-pure 有什么区别？

* ![目录](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52599ad0dbb344d59eafb00f360e99c3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)
* ![Vite系统学习](https://camo.githubusercontent.com/2434a9d6db1b2c8f61917d9b7c315b33b3ce37de894aa26c7e50b4052cb8fc66/68747470733a2f2f70332d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f30343036653063333737383134333465613332646237363839333433663033347e74706c762d6b3375316662706663702d77617465726d61726b2e696d6167653f)
# 模块化
1. 无模块化标准阶段
- 文件划分
- 命名空间
- IIFE(立即执行函数) 

* 模块规范而言 
    - 统一的模块化代码规范
    - 实现自动加载模块的加载器(也称 loader)
2. CommonJS规范
3. AMD规范
4. CMD规范
5. UMD 
* 兼容AMD 和 CommonJS的一个模块化方案,可以同时运行在浏览器和Nodejs环境。
6. ES6 Module

* 作为一个官方提出的规范, ES Module 已经得到了现代浏览器的内置支持.
* 在现在浏览器中 如果在 HTML中加入 含有 type = "module" 属性的script标签,那么浏览器会按照ES Module规范来进行依赖加载和模块解析,这也是Vite在开发阶段实现 no-bundle的原因,由于模块加载的任务交给了浏览器,即使不打包也可以顺利运行模块代码。
# 基础使用
* Vite会将项目的源代码编译成浏览器可以识别的代码,与此同时 一个 import 语句即代表了一个HTTP请求
* Vite所倡导的 no-budle理念的真正含义:  利用浏览器原生ES 模块支持 实现开发阶段的 Dev Server 进行模块化的按需加载,而不是先整体打包再进行加载。
* 相比 Webpack这种必须打包再加载的传统构建模式,Vite在开发阶段减少了繁琐且耗时的打包过程。

* '@vitejs/plugin-react' 官方 react插件 来提供React项目编译和热更新的功能。

* Vite提供了开箱即用的 TS 以及 JSX的编译能力,但实际上底层并没有实现TS的类型校验系统,因此需要借助 tsc 来完成类型校验(在Vue项目中使用 vue-tsc 这个工具来完成) 在打包前提早暴露出类型相关问题,保证带的健壮性。

* tsc 直接 编译 test.tsx

1. CSS样式处理
 - CSS预处理器
 - CSS Module
 - CSS in JS
 - CSS 原子化框架
* Vite 本身对CSS各种预处理器语言(Sass/Scss Less Stylus)  做了内置支持。 即使不做任何处理即可以直接使用各种 CSS预处理器。 但需要安装依赖  例如 sass
* Vite会对后缀带有 .module的样式自动应用 CSS Modules
* PostCSS

```
  'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportWidth: 750, // 设计稿的视口宽度
      exclude: [/node_modules/], // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, //  是否直接更换属性值，而不添加备用属性
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 1125 // 横屏时使用的视口宽度
    }

```
 * CSS In JS
    - styled-components
    - emotion
   
```
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          "babel-plugin-styled-components"
          // 适配 emotion
          "@emotion/babel-plugin"
        ]
      },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      jsxImportSource: "@emotion/react"
    })
  ]
})


 ``` 
2. JS/TS 规范工具: ESLint
  - pnpm i eslint -D
  - .eslintrc.js
  - pnpm i eslint-plugin-react@latest  -D  用来检查React代码的ESLint插件。 它提供了一些规则 可以检查 React组件的命名 属性 生命周期等方面是否符合最佳实践
  - pnpm i @typescript-eslint/eslint-plugin@latest  -D 用来检查 TS代码的ESLint插件 它提供了一些规则 可以检查TS 代码中的类型定义 变量声明 函数调用等方面是否符合最佳实践
  - pnpm i @typescript-eslint/parser@latest -D  用来解析TS代码ESLint解析器 它可以将TS代码转换成抽象语法树  以便ESLint插件可以对其进行检查
  - 后面两个是搭配使用

  - pnpm i prettier -D  代码格式化  ESLint 代码风格检查并给出提示
3. 静态资源
    - 图片
    - svg
    - JSON加载  Vite 内置对于 JSON文件的解析
    - Web Worker脚本
    - 其他静态资源 
        - 媒体类文件 mp4 webm ogg mp3 wav flac aac
        - 字体类文件 woff woff2 eot ttf otf
        - 文件类 pdf text
        - Vite也对下面几个类型格式提供了内置的支持
        - 其他未支持的 { assetsInclude:['.gltf']}
    - 特殊资源后缀
        - ?url: 表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用。
        - ?raw: 表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀。
        - ?inline: 表示资源强制内联，而不是打包成单独的文件。
    - 生产环境处理
        - 自定义部署域名 base
        - 单文件或 内联
            - 如果静态资源体积 >= 4kb 则提取成单独的文件
            - 如果静态资源体积 < 4kb 则作为base64格式的字符串内联
            - build:{ assetsInlineLimit:8*1024}
            - svg 格式的文件不受这个临时值的影响，始终会打包成单独的文件，因为它和普通格式的图片不一样，需要动态设置一些属性
         - 图片压缩  
            - 图片资源的体积往往是项目产物体积的大头。精简图片 对打包体积优化很明显。 
            - https://github.com/imagemin/imagemin
            - pnpm i vite-plugin-imagemin -D
            - 雪碧图优化 在实际项目中我们还会经常使用到各种各样的svg图标  svg体积不大  Vite中对于 svg文件会始终打包单文件,大量的图标引入之后会导致网络请求增加
            - pnpm i vite-plugin-svg-icons -D

```
// 雪碧图

// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

{
  plugins: [
    // 省略其它插件
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    })
  ]
}



//vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

{
  plugins: [
    // 忽略前面的插件
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9],
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ]
}


```
4. 预构建
* 模块代码其实分为两部分 一部分是源代码 也就是业务代码 另外一部分是第三方依赖的代码 即 node_modules中的代码。
* 所谓的 no-bundle 只是对于源代码而言,对于第三方依赖而言 Vite还是选择 bundle(打包) 并且使用速度极快的打包器Esbuild来完成这一过程。

* Vite是基于浏览器原生ES模块规范实现的Dev Server,不论是应用代码 还是第三方依赖的代码 理应符合ESM规范才能够正常运行。
* 但 我们没有办法控制第三方的打包规范 。 需要转换成 ESM格式的产物。
* 请求爆布流问题  loadsh-es 包含很多小包

* 依赖预构建 主要做两件事
    -  将其他格式 UMD CommonJS 产物 转换为 ESM格式  使其在浏览器通过 <script type="module"></script> 方式可以正常加载
    - 打包第三方库 将各个第三方库分散的文件合并到一起,减少HTTP请求，避免页面加载性能劣化。
    - Esbuild 来完成


    - 自动开启 根目录下的 node_modules中发现 .vite目录 这就是预构建产物文件存放的目录
    - 如果 1. package.json 的 dependencies字段  2. 各种包管理器的lock文件 3. optimizeDeps配置内容
    - 手动开启
# 双引擎
1. ESbuild
   - 依赖预构建 作为 Bundle工具
      - 开发阶段的依赖构建阶段
  - 单文件编译  作为 TS 和 JSX编译工具
        - 在TS(X)/JS(X)单文件编译上面 Esbuild作为 Transformer来做。
        - Esbuild转译TS JSX的能力通过 Vite插件提供 这个Vite插件在开发环境和生产环境都会执行
        - 用来替换 Babel TSC的功能  无论 Babel TSC都有性能问题
        - Esbuild并没有实现TS的类型系统 在编译TS(TSX)文件时仅仅抹掉了类型相关的代码,暂时没有能力实现类型检查  vite build 之前会先执行 tsc命令 也就是借助TS官方的编译器进行类型检查。
   - 代码压缩--作为压缩工具 
        - Vite从2.6版本开始 就官宣默认使用 Esbuild来进行生产环境的代码压缩,包括JS代码和CSS代码
        - 从架构图中可以看到 在生产环境中Esbuild压缩器通过插件的形式融入到了Rollup的打包流程中
        - 传统的方式都是使用 Terser这种JS开发的压缩器来实现 在Webpack或者 Rollup中作为一个Plugin来完成代码打包后的压缩混淆的工作。
2. 构建基石-- Rollup
- Rollup在Vite中重要性一点也不亚于Esbuild 它既是Vite用作生产环境打包的核心工具,也是直接决定了 Vite插件机制的设计。
- 生产环境Bundle
  - Vite默认选择在生产环境中利用Rollup打包 并基于Rollup本身成熟的打包能力进行扩展和优化
    - CSS代码分割  单独提取 提高线上产物的 缓存复用率
    - 自动预加载 Vite会自动为入口 chunk的依赖自动生成预加载的标签 <link rel="modulepreload">
    - 异步Chunk加载优化 请求 A chunk时  同时会自动预加载C。
- 兼容插件机制
* 无论是开发环境还是生产环境 Vite都是根植于Rollup的插件机制和生态 
* 在开发阶段 Vite借鉴了WMR的思路 自己实现了一个Plguin Container 用来模拟 Rollup调度各个Vite插件的执行逻辑,而Vite的插件写法完全兼容Rollup 因此在生产环境中将所有的Vite插件传入Rollup也没有问题。 

*  Esbuild作为构建的性能利器 Vite利用其Bundler的功能进行依赖预构建,用其Transformer的能力进行TS和JSX文件的转译, 也用到它的压缩能力进行JS和CSS压缩。
* Vite 无论插件机制 底层的打包手段 都是基于 Rollup来实现的。

# Esbuild
1. build api
2. transform api
3. Esbuild 插件开发
* Esbuild插件结构被设计为一个对象 里面有name setup 两个属性 name是插件名称 setup是一个函数 其中入参是一个 build对象 这个对象上挂载了一些钩子函数可供我们自定义一些钩子函数逻辑。
* onResolve 控制路径解析  options callback
* onLoad 模块内容加载的过程 optons callback
* onstart
* onend 

# Rollup
1. 通过配置文件来使用
```
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const buildOption = {
  input:["src/index.js"],
  output: {
  // 产物输出目录
  dir: path.resolve(__dirname, 'dist'),
  // 以下三个配置项都可以使用这些占位符:
  // 1. [name]: 去除文件后缀后的文件名
  // 2. [hash]: 根据文件名和文件内容生成的 hash 值
  // 3. [format]: 产物模块格式，如 es、cjs
  // 4. [extname]: 产物后缀名(带`.`)
  // 入口模块的输出文件名
  entryFileNames: `[name].js`,
  // 非入口模块(如动态 import)的输出文件名
  chunkFileNames: 'chunk-[hash].js',
  // 静态资源文件输出文件名
  assetFileNames: 'assets/[name]-[hash][extname]',
  // 产物输出格式，包括`amd`、`cjs`、`es`、`iife`、`umd`、`system`
  format: 'cjs',
  // 是否生成 sourcemap 文件
  sourcemap: true,
  // 如果是打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
  name: 'MyBundle',
  // 全局变量声明
  globals: {
    // 项目中可以直接用`$`代替`jquery`
    jquery: '$'
  },
  {
    external:['react','react-dom']
  }
},
plugins: [resolve(), commonjs()],

}

```
2. 通过api来使用
* rollup.rollup 用来一次性地进行Rollup打包
* rollup.watch  传入配置打包


* 1. 通过 rollup.rollup方法 传入 inputOptions 生成bundle对象
* 2. 调用 bundle 对象generate 和 write 方法 传入 outputOptions 分别完成产物和生成和磁盘写入
* 3. 调用bundle对象的close方法来结束打包。


# Vite插件

```
// myPlugin.js
export function myVitePlugin(options) {
  console.log(options)
  return {
    name: 'vite-plugin-xxx',
    load(id) {
      // 在钩子逻辑中可以通过闭包访问外部的 options 传参
    }
  }
}

// 使用方式
// vite.config.ts
import { myVitePlugin } from './myVitePlugin';
export default {
  plugins: [myVitePlugin({ /* 给插件传参 */ })]
}


```

# 高级应用

1. 热更新
2. 代码分割
 - Vite实现了自动 CSS代码分割的能力 即实现了一个 chunk对应一个css文件，比如上面产物中 index.js 对应一份 index.css 
 - Initital Chunk 而言 业务代码和第三方代码分别打包为单独的chunk 在上述的例子中分别对应 index.js vendor.js 需要说明的是 这是 Vite 2.9版本之前的做法 Vite2.9及以后的版本 默认打包策略更加简单粗暴 将所有的js 代码全部打包到 index.js中
 - 对于 async chunk 而言 动态import的代码 会被拆分成单独的chunk 


 - 小结一下，Vite 默认拆包的优势在于实现了 CSS 代码分割与业务代码、第三方库代码、动态 import 模块代码三者的分离，但缺点也比较直观，第三方库的打包产物容易变得比较臃肿，上述例子中的vendor.js的大小已经达到 500 KB 以上，显然是有进一步拆包的优化空间的，这个时候我们就需要用到 Rollup 中的拆包 API ——manualChunks 了。

 - 自定义打包策略 
1. manualChunks

 ```
// vite.config.ts
{
  build: {
    rollupOptions: {
      output: {
        // manualChunks 配置
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          // 将 Lodash 库的代码单独打包
          'lodash': ['lodash-es'],
          // 将组件库的代码打包
          'library': ['antd', '@arco-design/web-react'],
        },
      },
    }
  },
}


 ```
 2. pnpm i vite-plugin-chunk-split -D


 ```
// vite.config.ts
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default {
  chunkSplitPlugin({
    // 指定拆包策略
    customSplitting: {
      // 1. 支持填包名。`react` 和 `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的依赖，如 object-assign)
      'react-vendor': ['react', 'react-dom'],
      // 2. 支持填正则表达式。src 中 components 和 utils 下的所有文件被会被打包为`component-util`的 chunk 中
      'components-util': [/src\/components/, /src\/utils/]
    }
  })
}




 ```
 * 拆包技术解决问题 主要包括 无法按需加载 以及 线上缓存命中率低

 3. 语法降级与Polyfill
 * 通过Vite构建我们完全可以兼容各种低版本浏览器 打包出既支持现代浏览器 又支持旧版本 浏览器的产物

 * 工具概览
   - 编译时工具 代表库 @babel/preset-env @babel/plugin-transform-runtime
   - 编译时工具的作用是在代码编译阶段进行语法降级及添加polyfill代码的引用语句 在 package.json中 devDependencies中
   - 运行时基础库 代表库包括 core-js 和 regenerator-runtime 
   - 运行时基础库是根据 esm官方语言规范提供各种Polyfill实现代码主要包括core-js  regenerator-runtime两个基础库
 * @vitejs/plugin-legacy  
    - 打包完 多出 xxxx-legacy.js 会被现在浏览器忽略  低版本浏览器 会忽略 type=module

4. Vite SSR    


5. 如何体系化地对Vite项目进行性能优化
1. 网络优化  HTTP2  DNS 预解析 Preload Prefetch
2. 资源优化  构建产物分析 资源压缩 产物拆包 按需加载
3. 预渲染优化  SSR SSG