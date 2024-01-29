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


* [微前端（无界）](https://juejin.cn/post/7212603829572911159)
* [webcomponent](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)      