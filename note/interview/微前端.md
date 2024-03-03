# iframe方案

- 采用iframe的方案确实可以做到,而且优点非常明显

## 优点

- 非常简单,使用没有任何心智负担
- web应用隔离的非常完美,无论是js css dom都完全隔离开来。

## 缺点

- 由于其隔离的太完美导致缺点也非常明显。

* 路由状态丢失, 刷新一下 iframe的url状态就丢失了
* dom割裂严重, 弹窗只能在 iframe内部展示,无法覆盖全局
* web应用之间通信非常困难
* 每次打开白屏时间太长,对于SPA应用来说无法接受


# [将微前端做到极致-无界微前端方案](https://juejin.cn/post/7125646119727529992)
* 无界微前端方案 基于 webcomponent 容器 + iframe沙箱
    - 适配成本  webpack vite
        - 主应用使用  子应用的适配
        - wujie-vue
        - wujie-react
        - 当作普通组件一样加载子应用
    - 样式隔离
    - 子应用保活 
    - 多应用激活
    - 子应用通讯
    - 页面白屏
    - 运营性能

    - 隔离js使用一个空的 iframe进行隔离
    - 子应用 axios需要自行适配
    - iframe沙箱的src设置了主应用的host 初始化iframe的时候需要等待iframe的location.orign 从 about:blank 初始化为主应用的host 这个采用的计时器去等待的不是很优雅。


    - css沙箱隔离 
        - 无界将子应用的dom放置在 webcomponent + shadowdom 的容器中 除了可继承的css属性外实现了应用之间的css的原生隔离
    - js 沙箱隔离
        - 无界将子应用的js 放置在 iframe(js-iframe)中运行 实现了 应用之间 window document localtion history的完全解耦和隔离
    - js沙箱 和css 沙箱连接
        - 无界在底层采用 proxy + Object.defineproperty的方式将 js-iframe中对dom操作劫持代理到 webcomponent shadowRoot 容器中 开发者无感知页无需关心 

* wujie 预加载和原理
    - 需要从无界的实例倒出 preloadApp 参数跟 startApp 一致 预加载必须开启 exec选项
    - requestidlecallback
* 无界传参
    - window.parent.a
    - props  window.$wujie.props
    - import { bus } from "wujie"  bus.$on('vue3',(data)=>{})   
    - window.$wujie.bus.$emit('vue3',{name:"xm",age:18}) 
* 应用共享
    - 一个微前端系统可能同时运行多个子应用 不同子应用之间可能存在相同的包依赖,那么这个依赖就会在不同的子应用中重复打包 重复执行造成性能和内存的浪费
    - import Antdt from 'ant-design-vue'  window.Antdv = Antdv
* [微前端（无界）](https://juejin.cn/post/7212603829572911159)
* [webcomponent](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)      