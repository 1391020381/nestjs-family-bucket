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
8. 生命周期 官网视图 父子组件
9. Vue父子组件生命周期的顺序如下：
   - 1. 父组件beforeCreate
   - 2. 父组件created
   - 3. 父组件beforeMount
   - 4. 子组件beforeCreate
   - 5. 子组件created
   - 6. 子组件beforeMount
   - 7. 子组件mounted
   - 8. 父组件mounted
   - 9. 父组件beforeUpdate
   - 10. 子组件beforeUpdate
   - 11. 子组件updated
   - 12. 父组件updated
   - 13. 父组件beforeDestroy
   - 14. 子组件beforeDestroy
   - 15. 子组件destroyed
   - 16. 父组件destroyed

在父子组件的生命周期中，父组件的生命周期先于子组件的生命周期。在组件挂载时，先挂载子组件，再挂载父组件；在组件销毁时，先销毁父组件，再销毁子组件。在更新时，先更新父组件，再更新子组件。

- Vue父子组件生命周期的执行顺序和Vue的组件树形结构有关系。在Vue中，每个组件都是一个树形结构，父组件包含子组件，子组件又可以包含其他子组件，这种结构就像DOM树一样。

在组件的挂载、更新和销毁过程中，Vue会按照组件树的结构从上到下依次执行生命周期函数。这是因为在组件挂载时，先挂载子组件，再挂载父组件，这样可以保证子组件中的数据和方法已经准备好，父组件在挂载时可以直接使用子组件的数据和方法。在组件销毁时，先销毁父组件，再销毁子组件，这样可以保证子组件中的数据和方法不会被父组件使用，也可以避免内存泄漏。

在更新时，Vue会先更新父组件，再更新子组件，这样可以保证父组件中的数据和方法已经更新完毕，子组件在更新时可以使用最新的父组件数据。同时，Vue还会在更新前后比较虚拟DOM树的差异，只更新需要更新的部分，这样可以提高更新效率。

因此，Vue父子组件生命周期的执行顺序和组件树形结构有关系，这种结构可以保证组件之间的数据和方法的正确性和可用性，同时也可以提高更新效率。9. props (类型和默认值) 10. v-on $emit
11. 自定义事件
    - EventBus event.$on('onAddTitle',this.addTitleHandler) event.$off('onAddTitle',this.addTitleHandler)
Vue组件通讯的方法主要有以下几种：

1. Props和$emit：父组件通过props向子组件传递数据，子组件通过$emit触发事件向父组件传递数据。这种方式适合父子组件之间的通讯。

2. $parent和$children：可以通过$parent和$children访问父组件和子组件的实例，从而实现组件之间的通讯。这种方式适合父子组件之间的紧密耦合的通讯。

3. $attrs和$listeners：可以通过$attrs和$listeners访问父组件传递给子组件的属性和事件，从而实现组件之间的通讯。这种方式适合需要将大量属性和事件传递给子组件的场景。

4. provide和inject：可以通过provide和inject实现祖先组件向后代组件的数据传递。这种方式适合祖先组件和后代组件之间的通讯。

5. EventBus：可以使用一个全局的EventBus实例来实现组件之间的通讯。这种方式适合组件之间的松散耦合的通讯。

6. Vuex：可以使用Vuex来管理组件之间的共享状态。这种方式适合大型应用程序中的组件通讯。

以上是Vue组件通讯的常用方法，根据实际场景选择合适的方式可以提高应用程序的性能和可维护性。

12. vue高级特性
    - Pinia 在非组件内使用
    - 自定义 v-model 自定义dialog model prop event emit(event.name)
    - $nextTick refs
    - slot 基本使用 作用域插槽（将插槽里面变量 可以在父组件使用） 具名插槽
    - 动态组件 component is
    - 异步组件
      - 组件引入 FormDemo:()=> import("../BaseUse/FormDemo")
    - 路由组件异步加载
    - keep-alive activated 和 deactivated 用在其一个直属的子组件被开关的情形。
    - mixin 和 vue单文件 script export default {} 部分 感觉和抽离方法 类似 且变量来源不明确 多 mixin 命名冲突 city= '武汉' city ='北京'

```
store/index.ts
import { createPinia } from 'pinia';
const store = createPinia();
export default store;

```

### Vuex

1. state
2. getters
3. action
4. mutation

5. dispatch
6. commit
7. mapState
8. mapGetters
9. mapActions
10. mapMutations
11. 数据流转 action 才可以异步操作

### Vue Router

1. 路由模式 hash H5 history
2. 路由配置 动态路由 懒加载

### Vue2原理

1. 重点 2/8原则
2. 使用相关 vdom 模版渲染
3. 整体流程是否全面 热门技术是否有深度

4. 组件化
   - 组件化 原有模版渲染也有
   - 数据驱动视图
   - MVVM View ViewModel Model
5. 响应式
6. vdom diff
7. 模版编译
8. 渲染过程
9. 前端路由

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
