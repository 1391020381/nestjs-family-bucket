# React Hooks

- 可选功能 class 组件 vs Hooks
- 100% 向后兼容 没有破坏性改动
- 不会取代 class 组件 尚无计划要移除 class 组件

- State Hook
- Effect Hook
- 其他 Hook
- 自定义 Hook
- 组件逻辑复用
- 规范和注意事项

- 为什么会有 React Hooks？ 它解决了哪些问题
- React Hooks 如何模拟组件生命周期
- 如何自定义 Hooks
- React Hooks 性能优化
- 使用 React Hooks 遇到哪些坑
- Hooks 相对 HOC Render Prop 有哪些优点

- React 函数组件

  - 输入 props 输出 jsx
  - 没有组件实例
  - 没有生命周期
  - 没有 state setState 只能接受 props

- class 组件的问题
- 大型组件很难拆分和重构 很难测试 (即 class 不易拆分)
- 相同业务逻辑 分散到各个方法中 逻辑混乱。 例如 dom 事件 绑定和解绑
- 复用逻辑的复杂 Mixins HOC RenderProps

- React 组件更易用函数表达
- React 提倡函数式编程 view = fn(props)
- 函数更灵活 更易拆分 更易测试
- 但函数组件太简单 需要增强能力 -- Hooks

## State Hook

- 让函数组件实现 state 和 setState
- 默认函数组件没有 state
- 函数组件是一个纯函数 执行完即销毁 无法存储 state
- 需要 state hook 即把 state 功能 钩 到纯函数中
- const [count,setCount] = useState(0)

## 用 useEffect 模拟生命周期

- 默认函数组件没有生命周期
- 函数组件是一个纯函数 执行完即销毁 自己无法实现生命周期
- 使用 Effect Hook 吧生命周期 钩 到纯函数中。

```
const [count,useCount] = useState()
// 模拟 class 组件的 DidMount DidUpdate
useEffect(()=>{
  console.log('ajax请求')
})

//模拟 class 组件 DidMount
useEffect(()=>{
  console.log('ajax请求')
  let timerId = window.setInterval(()=>{
    console.log(Date.now())
  },1000)
  // 返回一个函数
  // 模拟 willUnMount
  return ()=>{
    window.clearInterval(timerId)
  }
},[]) // 不依赖于任何 state

//模拟 class 组件 DidUpdate
useEffect(()=>{
  console.log('ajax请求')
},[count])



conponentDidMount(){
  console.log('开始监听 ${this.props.friendId}')
}
conponentWillUnMount(){
  console.log('结束监听 ${this.props.friendId}')
}

conponentDidUpdate(prevProps){
  console.log('结束监听 ${prevProps.friendId}')
  console.log('开始监听 ${this.props.friendId}')
}

useEffect(()=>{
   console.log('开始监听 ${friendId}')

   // 此处并不完全等同于 WillUnMount
   // props 发生变化 即 更新 也会执行结束监听
   // 准确的说： 返回的函数 会在下一次 effect 执行前 被执行
   return ()=>{
      console.log('结束监听 ${friendId}')
   }
})

```

- 模拟 componentDid useEffect 依赖 []
- 模拟 componentDidUpdate useEffect 无依赖 或者 依赖 [a,b]
- 模拟 componentWillUnMount useEffect 中返回一个函数
- 模拟 componentWillUnMount useEffect 中返回一个函数
- useEffect 让纯函数 有了副作用

- useEffect 依赖[] 组件销毁是执行 fn 等于 WillUnMount
- useEffect 无依赖或依赖[a,b] 组件更新时执行 fn
- 即 下次执行 useEffect 之前 就会执行 fn 无论更新或销毁

## 其他 Hooks

1. useRef
2. useContext

- 在原有 React.createContext()的消费端 直接使用 const theme = useContext(ThemeContext) theme 就是初始化值

3. useReducer 单组件状态管理
4. useMemo

- react 父组件更新 自组件会无条件更新
- 此时要性能优化 shouldComponetUpdate 来判断处理

- useMemo 缓存数据 类似 useEffect 有 依赖
- React.memo

5. useCallback

- useMemo
- React.memo
- 当 Children 组件添加 click 事件时 导致 优化无效 此时 需要通过 useCallback 来包裹 click 函数 且有依赖
- const onChange = useCallback(e=>{console.log(e.tartet.value)},[])

```
const btnRef = useRef(null) // 初始值

useEffect(()=>{
  console.log(btnRef.current) // dom节点
},[])
return <div> <button ref={btnRef}>click</button> </div>


const initialState = {count:0}

const reducer = (state,action)=>{
  switch(action.type){
    case:"increment":
        return { count:state.count+1}
    case:"decrement":
        return { count:state.count-1}
    default:
        return state
  }
}

function app(){
  const [state,dispatch] = useReducer(reducer,initialState)
  return <div>
        count:{state.count}
        <button onClick={()=>dispatch({type:'increment'})>increment</button>
        <button>decrement</button>
     </div>
}

const userInfo = useMemo(()=>{
  return {name,age:21}
},[name])
const Child = memo(({userInfo})=>{
    return <div><p>this is child {userInfo.name} {userInfo.age}</p></div>
})
```

6. 自定义 Hook

- 封装通用的功能
- 开发和使用第三方 Hooks
- 自定义 Hook 带来了无限的扩展性 解耦代码

```
import { useState,useEffect } from "react";
import axios from 'axios';

// loading是异步改动 在 ajax前是true 后面请求完是 false
// 那么 useAxios 结果会返回几次？

// 返回的这些数据 都是 通过 对应的 setXXX来改变 是动态的
// 在 Vue中 返回的是 响应式对象，ajax异步更新后 会响应式更新？
function useAxios(url){
  const [loading,setLoding] = useState(false);
  const [data,setData]  = useState();
  const [error,setError] = useState()

  useEffect(()=>{
    setLoading(true)
    axios.get(url).then(res=>setDtate(res)).catch(err=>setError(err)).finally(()=>{
       setLoading(false)
    })
  },[url])
  return [loading,data,error]
}

```

7. hooks 使用规范

- 只能用于 react 函数组件和自定义 hooks 中
- 只能用于顶层代码 不能在循环 判断中使用 hooks
- eslint 插件 eslint-plugin-react-hooks

# Vue Compoition API
