- 腾讯广告 区域发展部
- 广告收费模式 cpa cps 分销电商 云选联盟-> 渠道

* React 和 Vue 一样重要 力求两者都会

- 基本使用 常用 必须会用
- 高级特性 不常用 但体现深度
- Redux 和 React-router 使用

1. React组件如何通讯
2. JSX本质是什么
3. context是什么 有何用途
4. shouldComponenUpdate 的用途
5. 描述 redux单项数据流
6. setState是同步还是异步

# 基本使用

1. JSX语法
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
   - bind this this默认是undefined
     - 在 onClick中 bind
     - 在 constructor bind
     - 静态方法 A = ()=>{} this永远指向实例
   - event 参数
     - event.preventDefault()
     - event.stopPropagation()
     - event.target 指向当前元素 即当前元素触发
     - event.currentTarget 指向当前元素 假象
     - event 其实是React 封装的。 _proto_.constructor 是 SyntheticEvent 组合事件
     - event.nativeEvent
     - 所有的事件 都被挂载到 document上 react17后 有调整 绑定到 root组件上 有利于多个 react版本共存, 例如微前端
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
  - 在 onChange中修改 关联 值
- input textarea select 用 value
- checkbox radio 用 checked

8. setState
   - 不可变值
     - setState 时 将要赋值的值 不能修改 原来的数据 例如 数组的不改变数组原有值
   - 可能是异步更新 setState 第二个参数 回调函数 可以拿到 更新后的值
     - 直接使用异步
     - settimeout 自定义dom事件 是同步
     - componentWillUnmount 销毁定时器 自定义dom事件
   - 可能会被合并
     - 传入对象 类似 Object.assign 会合并
     - 传入函数 不会被合并

# 高级使用

1. 函数组件
   - 纯函数 输入 props 输出 JSX
   - 不能扩展其他方法
2. 受控和非受控组件

   - 非受控组件
   - 必须手动操作dom元素 setState 实现不了
   - 文件上传 <input type="file"/>
   - 某些富文本编辑器 需要传入dom元素
   - ref
   - defaultValue defaultChecked
   - this.nameInputRef = React.createRef()
   - ref = {this.nameInputRef}
   - current = this.nameInputRef.current
   - current.value

   - 首先使用受控组件 符合 React设计原则
   - 必须操作dom时,再使用非受控组件

3. refs
4. Protals
   - 组件默认会按照既定层次嵌套渲染
   - 如何让组件渲染到父组件以外
   - this.props.children
   - ReactDOM.createProtal(componentTemplate,dom)
   - overflow:hidden
   - 父组件 z-index 值 太小
   - fixed需要放在 body第一层级
5. context
   - 公共信息 语言 主题 如何传递给每个组件
   - 用 props太繁琐
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
