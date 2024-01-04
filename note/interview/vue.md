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
   - Object.defineProperty
   - 对象
   - 复杂对象 深度监听 需要递归到底 一次性计算量很大
   - 数组 重新定义data数组原型 不能污染全局的数组原型
   - 缺点
   - 无法监听新增属性/删除属性 (Vue.set Vue.delete)
6. vdom diff
   - dom操作非常耗费性能
   - 用 js模拟 dom结构 tag props children
   - 新旧vnode对比 得出最小更新范围 最后更新dom
   - 数据驱动视图的模式下 有效控制dom操作。
   - linux diff git diff
   - 书 diff的时间复杂度 O(n^3) 遍历 tree1 tree2 排序
   - 优化时间复杂度到O(n)
   - 只比较同一层级 不跨级比较
   - tag 不相同 则直接删除重建 不再深度比较
   - tag 和 key 两者都相同 则认为是相同节点 不再深度比较。
   - patchVnode
   - addVnodes removeVnodes
   - updateChildren key的重要性
   - hook = vnode.data?.hook
   - 新旧都有children updateChildren
   - 新children有 旧children无 addVnodes
   - 旧有children 新child无 removeVnodes
   - vdom存在的价值 数据驱动视图 跨平台
7. 模版编译
   - with(){}
   - 改变 {} 内自由变量的查找规则,当做obj属性来查找
   - 如果找不到匹配的obj属性 就会报错。
   - with要慎用 它打破了作用域规则 已读性变差
   - \_c createElement
   - -v createTextVNode
   - -s toString
   - template -> render -> vnode -> path diff
   - webpack vue-loader 会在开发环境编译模版。
8. 组件渲染和更新过程
   - 一个页面渲染页面 修改data触发更新(数据驱动视图)
   - 其背后原理是什么 需要掌握哪些要点 全面程度
   - 响应式 对象 数组
   - 模版编译 template render vnode
   - vdom path(elem,vnode) path(vnode,newVnode)
   - 渲染和响应式
   - 渲染和模版编译
   - 渲染和vdom
   - 初次渲染过程
     - 解析模版为render函数(开发环境已经完成 vue-loader)
     - 触发响应式 监听data属性 getter setter
     - 执行 render函数 生成 vnode path(elem,vnode)
   - 更新过程
     - 修改data 触发setter (此前在getter中已被监听)
     - 重新执行 render函数 生成 newVnode
     - patch(vnode,newVnode) 官网 深入响应式原理
   - 异步渲染
     - $nextTick
     - 汇总 data的修改 一次性更新视图
     - 减少 dom操作次数 提高性能
9. 前端路由

- spa

- hash
  - hash变化会触发网页跳转 即浏览器的前进 后退
  - hash变化不会刷新页面 spa必须特点
  - hash永远不会提交到 server端

* history

  - 用 url规范的路由 但跳转时不刷新页面
  - history.pushState
  - history.replaceState

* vue-router父子嵌套路由 子路由是否包含 父pathde 配置 子路由是否 以 /开头 就不用包含父 path

```
window.onhashchange = (event)=>{

}


```

```
// 插值
const template = `<p>{{message}}</p>`
with(this){
    return createElement('p',[createTextVNode(toString(message))])
}
// 表达式
const template = `<p>{{flag?message:'no message found'}}</p>`
with(this){
    return _c('p',[_v(_s(flag?message:'no message found'))])
}

// 属性和动态属性

```

```

const oldArrayProperty = Array.prototype
// 创建新对象 原型指向 oldArrayProperty
// 再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty)

arrProto.push = function () {
    console.log(100)
}

arrProto.__proto__.push()

['push','pop','shift','unshift','splice'].forEach(methodName=>{
    arrProto[methodName] = function(){
        updateView();
        oldArrayProperty[methodName].call(this,...arguments)
    }
})


// 在响应式中

if(Array.isArray(target){
    target.__proto__ = arrProto
})


<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:20px">
        <li>a</li>
    </ul>
</div>
{
    tag:"div",
    props:{
        className:"container",
        id:"div1"
    },
    children:[
        {
            tag:'p',
            children:'vdom'
        },
        {
            tag:"ul",
            props:{style:'font-size:20px'},
            children:[
                {
                    tag:'li',
                    children:'a'
                }
            ]
        }
    ]
}

```

````
当使用 `index` 作为 `key` 时，可能会出现无法正确跟踪每个元素状态的情况。下面是一个简单的示例：

```html
<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  methods: {
    removeItem(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>
````

在上面的示例中，我们使用 `index` 作为 `key` 来循环渲染列表。当我们点击某个元素的删除按钮时，会通过 `splice` 方法从列表中删除该元素。但是，由于我们使用 `index` 作为 `key`，Vue 无法正确跟踪每个元素的状态，因此会出现一些意想不到的问题。

例如，当我们点击第二个元素的删除按钮时，我们期望的结果是列表变成 `[1, 3]`。但是，由于我们使用 `index` 作为 `key`，Vue 无法正确跟踪每个元素的状态，导致删除后的列表变成了 `[1, 2]`，即删除了第二个元素后，第三个元素变成了第二个元素，但是 Vue 仍然认为它是第三个元素，因此删除操作出现了错误。

为了解决这个问题，我们可以使用每个元素自身的唯一标识符作为 `key`，例如：

```
html
<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{ item.name }}
        <button @click="removeItem(item)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          { id: 1, name: "John" },
          { id: 2, name: "Mary" },
          { id: 3, name: "Tom" },
        ],
      };
    },
    methods: {
      removeItem(item) {
        const index = this.list.indexOf(item);
        this.list.splice(index, 1);
      },
    },
  };
</script>
```

在上面的示例中，我们使用每个元素自身的唯一标识符 `id` 作为 `key`，这样 Vue 就能够正确跟踪每个元素的状态，从而避免出现删除错误元素的问题。

## vue面试真题演练

1. v-show 和 v-if的区别

- v-show 通过css display控制显示和隐藏
- v-if 组件真正的渲染销毁 vnode层面控制
- 频繁切换使用 v-show 条件判断 v-if

2. 为何在 v-for中使用 key

- 必须用 key 且不能是index 和 random
- diff算法中通过 tag key来判断 是否是 sameNode
- 减少渲染次数 提升渲染性能

3. Vue组件生命周期(父子组件) 创建 更新 销毁
4. Vue组件如何通讯(常见)

- props emit
- 自定义事件 event.$on  event.off event.$emit
- vuex

5. 描述组件渲染和更新的过程 官网响应式原理
6. v-model的实现原理

- input元素 value = this.name
- 绑定input事件 this.name = $event.target.value
- data 更新触发 re-render

7. 自定义组件 v-model

- model props event
- emit

8. 对 MVVM的理解 官网的图片
9. computed特点 更深 -> 原理
10. 为何组件 data必须是一个函数

- vue单文件 编译完其实是一个 calss, 每个地方使用 都是对 class的实例化,如果data不是函数的话，会导致 data变量会相互影响

11. ajax请求应该放在哪个生命周期

- mounted
- js是单线程 ajax异步获取数据
- 放在 mounted之前没有用 只会让逻辑更加混乱。 视图没有渲染完,ajax获取数据也会在视图渲染完 再更新。

12. 如何将组件所有的props传递给子组件

- $props
- <User v-bind="$props" />

13. 多组件相同逻辑抽离

- mixin
- 缺点

14. 何时使用异步组件

- 加载大组件 import 定义异步组件
- 路由异步加载

15. 何时需要使用 keep-alive

- 滚动位置如何处理
- 缓存组件 不需要重复渲染
- 如多个静态tab页切换
- 优化性能

16. 何时需要使用 beforeDestory

- 解绑自定义事件 event.$off
- 清除定时器
- 解绑 自定义 dom事件

17. 什么是作用域插槽
18. Vuex中action 和 mutation 区别

- action中可以处理异步 mutation不可以
- mutation 原子操作
- action 可以整合多个 mutation

19. vue-router常用的路由模式

- hash 默认
- h5 history 需要服务端支持
- 比较选择

20. 配置vue-router异步加载

21. vnode 描述 dom结构

22. 监听data 变化的核心api

- Object.defineProperty
- 深度监听 监听数组
- 缺点

23. vue如何监听数组变化

- Object.definePropery 不能监听数组变化
- 重新定义data 原型 重写 push pop 等方法 实现监听
- Proxy可以原生支持监听数组变化

24. 描述响应式原理

- 监听 data变化
- 渲染原理

25. diff 算法时间复杂度

- o(n)
- 在o(n^3)基础上做了一些调整

26. 简述diff算法过程

- patch(elem,vnode) patch(vnode,newVnode)
- pathVnode addVnodes removeVnodes
- upateChildren(key的重要性)

27. vue 为何异步渲染 $nextick作用

- 异步渲染 合并data修改 提高渲染性能
- nextTick在dom 更新完之后触发回调。

27. vue常见性能优化

- 合理使用 v-show v-if
- 合理使用 computed
- v-for 时 加 key 避免和v-if同时使用
- 自定义事件 dom事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data层级不要太深
- vue-loader 预编译
- webpack层面优化
- 前端通用性能优化 图片懒加载
- 使用 SSR

# Vue3

1. createApp
2. emits属性
3. 多事件处理
4. Fragment
5. 移除 .sync 改为 v-model参数
6. 异步组件的引用方式
7. 移除 filter
8. Teleport
9. Suspense
10. reactive
11. ref toRef toRefs
12. readonly
13. computed
14. watch watchEffect
15. 钩子函数生命周期
16. Proxy实现响应式
17. 编译优化

- PatchFlag静态标记
- hoistStatic静态提升
- cacheHandler缓存事件
- SSR优化
- Tree-shaking优化

18. Vite
    - es6 module

# Vue3使用

1. Vue3 比 Vue2 有什么优势

- 性能更好
- 体积更小
- 更好的ts支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能

2. 描述Vue3生命周期

- Options API 生命周期
  - beforeDestroy 改为 beforeUnmount
  - destroyed 改为 unmounted
  - 其他沿用 Vue2生命周期
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - beforeUnmount
  - unmounted
- Composition API生命周期
  - onBeforeMount
  - onMounted
  - onBeforUpdate
  - onUpdate
  - onBeforeUnmount
  - onUnmounted

3. 如何看待 Composition API 和 Options API

- Composition API 更好的代码组织
- Composition API 更好的逻辑复用
- Compositon API 更好的类型推导 vue2 中 this引用 不利于 ts类型推倒
- 不建议共用 会引起混乱
- 小型项目 业务逻辑简单 Options API
- 中大型项目 逻辑复杂 Composition API
- Composition API 高阶技巧 官网高阶指南
- Composition API 是为了 解决复杂业务逻辑而设计
- Composition API Hooks 在 React的地位

4. 如何理解 ref toRef toRefs

- ref
- 生成值类型的响应式数据
- 可用于模版和 reactive
- 通过 .value修改值
- 获取 元素或compent const elemRef = ref(null) elemRef 需要和 元素上 ref相同 elemRef.value

- toRef
- 针对一个响应式对象(reactive 封装)的prop
- 创建一个 ref 具有响应式
- 两者保持引用关系

- toRefs
- 将响应式对象(reactive)转换为普通对象
- 对象的没个prop都是对应的ref
- 两者保持引用关系

- cosnt state = reactive({age:20,name:"双越"})
- return { ...state}
- 这样解构 会失去响应式
- toRefs 可以解决这个问题

- 合成函数

```
function useFeatureX(){
   const state = reactive({
     x:1,
     y:2
   })
   // 逻辑运行
   // 返回时 转换为 ref
   return toRefs(state)
}

// 使用

// 不解构 使用时 会 state.x  state.y 比较麻烦
const { x,y} = useFeatureX()



```

- 用 reactive做 对象的响应式 用 ref 做值 类型响应式
- setup中返回 toRefs(state) 或 toRef(state,'xxx')
- ref的变量命名都用 xxxRef
- 合成函数返回响应式对象时 使用 toRefs 避免 对象层级太深 或 ref 需要 .value

- 为何需要 ref
  - 返回值类型,会丢失响应式
  - 在 setup computed 合成函数 中都可能会返回值类型
  - Vue 如不定义 ref 用户将自造 ref 反而混乱
  - Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等 mdn
  - Vue.js 3.x 中使用 ref 函数是为了解决基本类型数据无法实现响应式更新的问题。这是因为基本类型的数据没有 getter 和 setter 方法，无法被劫持，因此需要将基本类型的数据包装成一个对象，再使用 Proxy 对象来实现对这个对象的监控和响应式更新。
  - 值传递 引用传递
- 为何需要 .value
  - ref是一个对象 不丢失响应式 value存储值
  - 通过 .value 属性的 get set实现响应式
  - 用于模版 reactive 不需要 .value 其他情况都需要
- 为何需要 toRef toRefs
  - 初衷: 在不丢失 响应式的情况下 分解或拆散
  - 前提 针对的是响应式对象 reactive封装 非普通对象
  - 注意 不创造响应式 而是延续响应式

5. Vue3升级了哪些重要功能

- https://v3-migration.vuejs.org/zh/
- createApp
- emits属性
  - 为了在声明 props 和 emits 选项时获得完整的类型推导支持,我们使用 defineProps defineEmits API
- 生命周期
- 多事件
  - @click="one($event),two($event)"
  - methods里定义 one two 两个函数
- Fragment
  - 无需单一根节点包裹子节点
- 移除 .sync
- v-model 参数 vue3
- 异步组件写法
  - vue2 import
  - vue3 defineAsyncComponent
- 移除 filter
- Teleport
  - 把 元素放置到 某些元素上 to="body" 例如 modal
- Suspense

```
<Suspense>
 <template>
   <Test1/> <!-- 一个异步组件-->
 </template>
 <!-- #fallback 就是一个具名插槽 即 Suspense 组件内部有两个 slot 其中一个具名为 fallback -->
 <template #fallback>
   loading
 </template>
<Suspense/>

```

- Composition API
  - reactive
  - ref 相关
  - readonly
  - watch watchEffect
  - setup
  - 生命周期钩子函数

```
// vue2.x
const app = new Vue（{})
Vue.use()
Vue.mixin()
Vue.component()
Vue.directive()

// vue3

const app = Vue.createApp()
app.use()
app.mixin()
app.component()
app.directive()

```

6. Composition API如何实现代码逻辑复用

- 抽离逻辑代码到一个函数 状态和 方法 统一逻辑在一起
- 函数命名约定为 useXxx格式 React Hooks
- 在 setup引用 useXxx格式

7. Vue3如何实现响应式

- Object.defineProperty的缺点
- 深度监听需要一次性递归
- 无法监听新增属性/删除属性 (Vue.set Vue.delete)
- 无法原生监听数组 需要特殊处理

- Proxy 基本应用

  - Reflect的作用
  - 和 Proxy 功能一一对应
  - 规范化 标准化 函数式
  - 替代掉 Object上的工具函数

- Proxy 只有在 get的时候才递归
- Vue2 一次性
- 深度监听 性能更好
- 可监听 新增/删除属性
- 可监听数组变化

- Proxy无法兼容所有浏览器 无法 polyfill

```
const data = {
   name:"zhangsan",
   age:20
}

const proxyData = new Proxy(data,{
  get(target,key,receiver){
    // 只处理本身的属性
    const ownKeys = Reflect.ownKeys(target)
    if(ownKeys.includes(key)){
      console.log('get',key)
    }
    const result = Reflect.get(target,key,receive)
    console.log('get',key)
    return result
  },
  set(target,key,receiver){
    // 重复的数据 不处理
    const oldVal = target[key]
    if(val === oldVal){
      return true
    }
    const ownKeys = Reflect.ownKeys(target)
    if(ownKeys.includes(key)){
      console.log('已有的key',key)
    }else{
      console.log("新增的key",key)
    }
    const result = Reflect.set(target,key,val,receiver)
    console.log('set',key,val)
    return result
  },
  deleteProperty(target,key){
    const result = Reflect.deleteProperty(target,key)
    console.log('delete property',key)
    return result
  }
})

```

8. watch watchEffect的区别

- 两者都可以监听 data 属性变化
- watch需要明确监听哪个属性
- watchEffect会根据其中的属性 自动监听其变化
- watchEffect 初始化会执行一次 收集要监听的数据

9. setup中如何获取组件实例 beforeCreate create

- setup 和 其他 Composition API中没有this
- 可通过 getCurrentInstance 获取当前实例
- 若使用 Options API 可照常使用 this

10. Vue3 为何比 Vue2快

- Proxy 响应式
- PatchFlag
  - 编译模版时 动态节点做标记
  - 标记 分为 不同的类型 如 text props
  - diff算法时 可区分静态节点 以及不同类型的动态节点
- hoistStatic
  - 将静态节点的定义 提升到父作用域 缓存起来
  - 多个相邻的静态节点 会被合并起来
  - 典型的拿空间换时间的优化策略
- cacheHandler
  - 缓存事件
- SSR优化
  - 静态节点直接输出 绕过了 vdom
  - 动态节点 还是需要动态渲染
- tree-shaking
  - 编译时 根据不同的情况 引入不同的API

11. Vite是什么

- 开发环境使用 ES6 Module 无需打包 -- 非常快
- 生产环境使用 rollup 并不会快很多

12. Composition API 和 React HooKs的对比

- 前者setup只会被调用一次 而后者函数会被多次调用
- 前者无需 useMemo useCallback setup只调用一次
- 前者无需顾虑调用顺序 后者需要保证 hooks顺序一致
- 前者 reactive + ref 比 useState 更难理解

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

```

```
