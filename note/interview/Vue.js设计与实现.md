
# 框架设计概览
* vue封装了命令式的过程,对外暴露出了声明式的结果
* 命令式的性能 > 声明式的性能   
* 直接修改的性能消耗   找出差异 + 直接修改
* 声明式的课维护性


* 运行时 runtime 利用render函数 直接把虚拟dom转化为真实dom元素  没有编译过程 无法分析用户提供的内容
* 编译时 compiler 直接把template模版中内容 转化为 真实dom元素   可以分析用户提供的内容 没有运行时理论上性能会更好。
* 运行时 + 编译时   先把template 模版转化为 render函数  再利用 render函数 把虚拟dom转化为真实dom。


* 控制代码体积
    - 环境变量 __DEV__
    - Tree-Shaking   ESM
* 输出不同的构建产物
* 错误提示与处理
    - 统一的错误处理接口  callWithErrorHandling
* 提升用户的开发体验
    - 心智负担低
    - 便于调试
* 良好的可维护性
    - 框架本身的可维护性 使用TS编写
    - 对TS的友好支持 大量的类型判断与处理    


* Vue3设计思路
    - 描述UI的形式
        - 模版
        - render
    - 初始化渲染器
        - 本质  函数 createRenderer的返回值 （renderer对象）
    - 组件本质
        - 一组dom元素的封装    
        - 一个 js对象 vnode 内部封装了 dom元素 
    - 模版 template的工作原理    
# 响应式系统
1. 副作用函数与响应式数据

* 调度系统 scheduler
     - Promise
     - jobQueue
     - 基于Set构建了队列jobQueue 利用Promise异步特性 控制执行顺序。
* 计算属性 computed      
# 渲染器
 
# 组件化

# 编译器

# 服务端渲染
  

* Map Set 具体应用
* 依赖关系 是一个树形
{
    target:{
        ket:[]
    }
}