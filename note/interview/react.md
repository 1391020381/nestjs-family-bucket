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
