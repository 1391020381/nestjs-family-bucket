- 腾讯广告 区域发展部
- 广告收费模式 cpa cps 分销电商 云选联盟-> 渠道

* React 和 Vue 一样重要 力求两者都会

- 基本使用 常用 必须会用
- 高级特性 不常用 但体现深度
- Redux 和 React-router 使用

1. React 组件如何通讯
2. JSX 本质是什么
3. context 是什么 有何用途
4. shouldComponenUpdate 的用途
5. 描述 redux 单项数据流
6. setState 是同步还是异步

# 基本使用

1. JSX 语法
   - class -> className
   - style={styleData}
   - dangerouslySetInnerHTML = {\_html:rawHtml}
2. 条件
   - if else
   - 三元表达式
   - && ||
3. 列表渲染
   - map
   - key
4. 事件
   - onClick
   - bind this this 默认是 undefined
     - 在 onClick 中 bind
     - 在 constructor bind
     - 静态方法 A = ()=>{} this 永远指向实例
   - event 参数
     - event.preventDefault()
     - event.stopPropagation()
     - event.target 指向当前元素 即当前元素触发
     - event.currentTarget 指向当前元素 假象
     - event 其实是 React 封装的。 _proto_.constructor 是 SyntheticEvent 组合事件
     - event.nativeEvent
     - 所有的事件 都被挂载到 document 上 react17 后 有调整 绑定到 root 组件上 有利于多个 react 版本共存, 例如微前端
   - 传递自定义参数
     - 最后一个参数是 event
5. 组件 和 props 类型检查
   - props 传递数据 this.props
   - props 传递函数
   - props 类型检查 props-types
   - 状态提升
6. 组件生命周期
   - https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
   - 单组件生命周期
   - 父子组件生命周期 和 Vue 的一样
7. 表单

- 受控组件
  - 在 onChange 中修改 关联 值
- input textarea select 用 value
- checkbox radio 用 checked

8. setState
   - 不可变值
     - setState 时 将要赋值的值 不能修改 原来的数据 例如 数组的不改变数组原有值
   - 可能是异步更新 setState 第二个参数 回调函数 可以拿到 更新后的值
     - 直接使用异步
     - settimeout 自定义 dom 事件 是同步
     - componentWillUnmount 销毁定时器 自定义 dom 事件
   - 可能会被合并
     - 传入对象 类似 Object.assign 会合并
     - 传入函数 不会被合并

# 高级使用

1. 函数组件
   - 纯函数 输入 props 输出 JSX
   - 不能扩展其他方法
2. 受控和非受控组件

   - 非受控组件
   - 必须手动操作 dom 元素 setState 实现不了
   - 文件上传 <input type="file"/>
   - 某些富文本编辑器 需要传入 dom 元素
   - ref
   - defaultValue defaultChecked
   - this.nameInputRef = React.createRef()
   - ref = {this.nameInputRef}
   - current = this.nameInputRef.current
   - current.value

   - 首先使用受控组件 符合 React 设计原则
   - 必须操作 dom 时,再使用非受控组件

3. refs
4. Protals
   - 组件默认会按照既定层次嵌套渲染
   - 如何让组件渲染到父组件以外
   - this.props.children
   - ReactDOM.createProtal(componentTemplate,dom)
   - overflow:hidden
   - 父组件 z-index 值 太小
   - fixed 需要放在 body 第一层级
5. context
   - 公共信息 语言 主题 如何传递给每个组件
   - 用 props 太繁琐
   - 用 redux 小题大做

```
const ThemeContext = React.createContext("light")

<ThemeContext.Provider value={this.state.theme}>

</ThemeContext.Provider>

// 函数组件
<ThemeContext.Consumer>
    {value=> <p>link theme is {value}</p>}

</ThemeContext.Consumer>

// class 组件
ThemedButton.contextType = ThemeContext
function Button(){
    render(){
        const theme = this.context;
        return <div>
        <p>button theme is {theme}</p>
        </div>
    }
}

```

6. 异步组件

   - import()
   - React.lazy(()=> import("./ContextDemo"))
   - React.Suspense

   ```
   const ContextDemo = React.lazy(()=> import("./ContextDemo"))
    <React.Suspense fallback={<div>Loading</div>}>
        <ContextDemo></ContextDemo>
    </React.Suspense>

   ```

7. 性能优化

- shouldComponentUpdate(简称 SCU)
- PureComponent 和 React.memo
  - PureComponent 在 SCU 中实现了浅比较 只比较第一层 不可变值
  - memo 函数组件中的 PureComponent
  - 浅比较已使用大部分情况 尽量不要做深度比较
- 不可变值 immutable.js
  - 彻底拥抱 不可变值
  - 基于共享数据(不是深拷贝) 速度好
  - 有一定学习和迁移成本

```
// React默认 父组件有更新 子组件则无条件更新 可以通过 shouldComponentUpdate 来控制是否更新
// React为啥不 统一做 性能优化？
// 违反 不可变值 原则 更新数据 会导致 组件不会被更新 导致使用出问题，所以才让用户自己来决定
// 例如 先 push 再 setState 然后 又再 SCU中做判断
shouldComponentUpdate(nextProps,nextState){
   if(nextState.count !== this.state.count){
      return true // 可渲染
   }

   return false  不重复渲染
}


function MyComponent(props){}
function areEqual(preProps,nextProps){}

// 返回新组件
export default React.memo(MyComponent,areEqual)

```

8. 关于组件公共逻辑的抽离

- minix 已被 React 弃用
- 高阶组件 HOC
- Render Props

```
// 工厂模式 非功能
const HOCFactory = (Component)=>{
   class HOC extends React.Component{
      // 在此定义多个组件的公共逻辑
      render(){
         return <Component {...this.props}/>
      }
   }
   return HOC
}

const EnhancedComponent1 = HOCFactory(WrappedComponent1)



import { connect } from 'react-redux'

const VisibleTodoList = connect(mapStateToProps,mapDispatchToProps)(TodoList)

export default VisibleTodoList



class Factory extends React.Component {
   constructor(){
      this.state = {
         /* state 即多个组件的公共逻辑的数据 */
      }
   }
   /** 修改state */
   render (){
      return <div>{this.props.render(this.state)}</div>
   }
}

const App = ()=>{
   <Factory render={
      /** render 是一个函数组件 */
      (props)=> <p>{props.a}{props.b}</p>
   }></Factory>
}

// 一个工厂函数 Factory
// 使用时 需要给 Factory 传递一个 render 也就是函数组件,这个函数组件的参数 是 Factory中 通过 this.props.render传入的。

```

9. vue 如何实现类似的高阶组件

10. Redux 使用

- https://www.redux.org.cn/
- 不可变值 纯函数
- store state
- reducer 接受 action 修改 state 不可变值
- action {type:"",}
- dispatch
- 单项数据流模型
  - dispatch(action)
  - reducer -> newState 不可变值
  - subscribe 触发通知(例如更新试图)
- 异步 action
- 中间件 redux-thunkredux-saga redux-thunk

```
// reducer
 function counter(state=0,action){
   switch(action.type){
      case:'INCERMENT':
         return state + 1
      case:'DECERMENT':
         return state - 1
      default:
         return state
   }
 }

 // 同步 action

 export const addTodo = text => {
   // 返回 action  对象
   return {
      type:"ADD_TODO",
      id:nextTodoId++
      text
   }
 }

// 异步action
export const addTodoAsync = text =>{
   // 返回函数 其中有  dispatch 参数
   return (dispacth)=>{
      fetch(url).then(res=>{
         dispatch(addTodo(res.text))
      })
   }
}

import { createStore,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'

const store = createStore(rootReducer,applyMiddleware(thunk))

```

11. react-redux

- provider 容器组件
- connect 展示组件
- mapStateToProps 函数 参数是 state
- mapDispathToProps 函数参数是 dispatch
- 使用中就 在 props 中解构
- 使用的组件中 需要通过 connct(mapStateToProps,mapDispathToProps)(Component)

12. redux 中间件

- button state - dispatch - action - reducer - state -> view

- 改造 dispatch
- applyMiddleware(thunk,logger)

```
// 先保存原有 dispatch
//  修改原有 dispath  并在中间加入自己的逻辑
let next = store.dispatch
store.dispatch = function dispatchAndLog(action){
   console.log('dispatching',action)
   next(action)
   console.log('next state',store.getState())
}

```

13. react-router

- 路由模式 hash h5 history
- 路由配置 动态路由 懒加载(lazy)

```
import React from 'react';
import { HashRouter as Router,Switch,Route} from 'react-router-dom'
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useParams} from 'react-router'
function RouterComponent(){
   return <Router>
      <Switch>
         <Route exact path="/"> <Home/> </Route>
         <Route exact path="/project/:id"> <Project/> </Route>
         <Route exact path="*"> <NotFound/> </Route>
      </Switch>
   </Router>
}

function Project(){
   const {id} = useParams();

   return <div></div>
}

```

# React 原理

1. 函数式编程 不可变值 setState 不修改原有值 redux action reducer 直接返回新值
2. vdom diff
   - h 函数
   - vnode 数据结构
   - path 函数
   - 只比较同一层级 不跨级比较
   - tag 不相同 则直接删掉重建 不再深度比较
   - tag key 两者都相同 则认为是相同节点 不再深度比较。
   - vue2 vue3 react 三者实现 vdom 细节都不相同
   - 核心概念和实现思路 都一样
   - 面试主要考察后者 不用全部掌握细节。
3. JSX 本质
   - JSX 等同于 Vue 模版
   - Vue 模版不是 html
   - JSX 也不是 JS
   - React.createElement 即 h 函数 返回 vnode
   - 第一个参数 可能是组件 也可能是 html tag
   - 组件名 首字母必须大写 React 规定 html 规定也是小写
4. 合成事件
   - 更好的兼容性的跨平台
   - 挂载 document 减少内存消耗 避免频繁解绑
   - 方便事件的统一管理 如 事务机制
   - React17 事件绑定到 root 组件上 有利于多个 react 版本 例如微前端。
5. setState batchUpdate

   - setState 主流程
   - batchUpdate 机制
     - isBatchingUpdates
     - this.setState(newState)
     - new State 存入 pending 对列
     - 是否处于 batch update
     - Y 保存组件于 dirtyComponents 中 异步
     - N 遍历所有的 dirtyComponents 调用 updateComponent 同步
   - 哪些能命中 batchUpdate 机制
     - 生命周期 和它调用的函数
     - React 中注册的事件 和它调用的函数
     - React 可以管理 的入口
   - 哪些能不能命中 batchUpdate 机制
     - setTimeout setInterval 等 和它 调用的函数
     - 自定义的 dom 事件 和它调用的函数
     - React 管不到的入口
   - transaction 事务机制
     - 在执行函数的时候 先定义开始 函数 在定义结束 类似 下面伪代码

```
// 开始 处于 batchUpdate
// isBatchingUpdates = true

this.setState({
   count:this.state.count + 1
})
// 结束
isBatchingUpdates = false;



// 自定义dom事件类似 setTimeout
// 开始 处于 batchUpdate
// isBatchingUpdates = true

setTimeout(()=>{
   // 此时 isBatchingUpdate 是 false
   this.setState({
      count:this.state.count +1
   })
})
// 结束
isBatchingUpdates = false;


```

6. 组件渲染过程

   - JSX 如何渲染为页面
   - setState 之后如何更新页面
   - 面试考察全流程
   - dirtyComponents

   - 组件渲染和更新过程
     - props state
     - render() 生成 vnode
     - path(elem,vnode)
   - 更新的两个阶段
     - setState(newState) --> dirtyComponents （可能有的子组件）
     - render() 生成 newVnode
     - path(vnode,newVnode)
   - React fiber

     - path 被拆分为两个阶段
     - reconciliation 阶段 执行 diff 算法 纯 JS 计算
     - commit 阶段 将 diff 结果渲染 dom。

     - js 是 单线程 且和 dom 渲染共用一个线程
     - 当组件足够复杂 组件更新时计算和渲染都压力大
     - 同时再有 dom 操作需求 动画 鼠标拖拽 将卡顿

     - 将 reconciliation 阶段进行任务拆分 commit 无法拆分 commit 是浏览器渲染
     - Dom 需要渲染时暂停 空闲时恢复
     - window.requestIdleCallback

# React Hooks

# React 面试题

1. 组件之间如何通讯
   - 父子组件 props
   - 自定义事件
   - Redux Context
2. JSX 本质是什么
   - React.createElement
   - 返回 vnode
3. Context 是什么 如何应用

- 父组件 向其下所有子组件传递信息
- 如一些简单的公共信息 主题色 语言
- 复杂的公共信息 redux

4. shouldComponentUpdate 用途

- 性能优化
- 配置 不可变值 一起使用 否则会出错

5. redux 单项数据流

- UI(state) -> dispatch(action) -> reducer -> state

6. setState 场景题

- 异步
- 合并
- 同步

7. 什么是纯函数

- 返回一个新的值 没有副作用 不会 偷偷 修改其他值
- 不可变值

8. react 组件生命周期

- 单组件生命周期
- 父子组件
- SCU

8. ajax 放在 react 哪个生命周期

- 同 vue
- componentDidMount dom 渲染完。 js 单线程, 加载页面会渲染 ,然后执行了生命周期,会执行到 ajax(异步) 也是会在浏览器渲染完页面 才会被执行

9. 渲染列表 为何使用 key

- 同 vue 必须用 key 且不能使用 index reandon

- tag
- tag key
- diff 减少渲染次数 提升渲染性能

10. 函数组件 和 class 组件区别

- 纯函数 输入 prosp 输出 JSX
- 没有实例 没有生命周期 没有 state
- 不能扩展其他方法

11. 什么是受控组件

- 表单的值 受 state 控制
- 需要自行监听 onChange 更新 state
- 对比 受控组件

12. 何时使用异步组件

- 同 vue
- 懒加载
- 路由

13. 多个组件公共逻辑 如何抽离

- HOC
- Render Props

14. redux 如何异步请求

- 使用 异步 action
- redux-thunk

15. react-router 如何配置懒加载

- React.lay(()=>import(".../home"))
- <Suspense fallback={}></Suspense>

16. PureComponent 有区别

- 实现了浅比较的 shouldComponentUpdate
- 优化性能
- 不可变值

17. React 事件 和 dom 事件区别

- 所有事件挂载 documnet 上 react17 root 组件
- event 不是原生事件 是合成事件对象
- dispatchEvent

18. React 性能优化

- 渲染列表时加 key
- 自定义事件 dom 事件及时销毁
- 合理使用异步组件
- 减少函数 bind this 的次数
- 合理使用 SCU PureComponent memo
- 合理使用 Immutable.js
- webpack 层面
- 前端通用的性能优化 图片懒加载
- SSR

19. React 和 Vue 的区别

- 都支持组件化
- 都是支持数据驱动视图
- 都使用 vdom 操作 dom

- React 使用 JSX 拥抱 JS Vue 使用模版拥抱 html
- React 函数式编程 Vue 声明式编程
- React 更多需要自力更生 js 表达式 循环 SCU Vue 把想要的都给你 computer watch v-if 等

- 在业务使用 需要考虑其他情况 公司技术栈
