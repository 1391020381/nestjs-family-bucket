# Vue2

1. v-show v-if 区别
2. v-for key
3. Vue组件生命周期(有父子组件的情况)
4. Vue组件如何通讯
5. 描述组件渲染和更新的过程。
6. 双向绑定 v-model的实现原理

## 使用

1. 模版
   - 插值
   - 表达式 条件（三元）运算符
   - 动态属性
   - v-html
   - 指令
2. computed watch
   - computed 有缓存 可以自定义 get set
   - watch handler deep 引用类型无法拿到 oldval
3. class style
   - 动态属性
   - 驼峰
4. 条件 v-if v-show Element plus dialog怎么实现？ vue2 vue3 将某个实例 挂载到 页面某个节点上
5. 循环 v-for
   - key
   - v-for v-if 不能一起使用 建议 v-if在 v-for的外层
   - v-for 的权重高于 v-if
   - 数据源 数组 对象
6. 事件

   - event参数 自定义参数 @click="handler" @click="handler(a,$event)"
   - event.\__proto_.constructor原生event对象
   - 事件被挂载当前元素
   - 事件修饰符 按键修饰符 stop submit.prevent capture self
   - 观察事件被绑定到哪里
   - event.target 事件在哪里监听的
   - event.currentTarget 事件在哪里触发的

7. 表单 v-model
   - input
   - radio
   - select
   - checkbox 多个复选框使用数组来获取数据
   - lazy number trim
8. 生命周期
9. props (类型和默认值)
10. v-on $emit
11. 自定义事件

# Vue3

## 使用

## Vue.js3.0组件的实现原理 响应式原理 Composition API的实现原理

### 组件实现

1.  组件渲染 vnode到真实dom是如何转变的

## Vue.js3.0模版的编译和优化过程。

- 创建 vnode 渲染 vnode 生成DOM

## 扩展模块 内置组件和特性

# Vue.js 3.0的优化

1. 更好的代码管理方式 monorepo
2. TS
3. 源码体积优化
4. 数据劫持优化
5. 编译优化
6. 优化逻辑组织 Options API Composition API
7. 优化复杂逻辑
8. 引入RFC 使每个版本改动可控 Request For Comments
9. 过渡期 Vue 2 的终止支持时间是2023 年12 月31 日

# 极客时间

- vue3
- 低代码
