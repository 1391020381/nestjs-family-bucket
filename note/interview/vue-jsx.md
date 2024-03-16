# Vue3
1. 在JSX表达式中,使用大括号来嵌入动态值  @vue/babel-plugin-jsx
2. 如果一个组件是用名字注册的，不能直接导入 (例如，由一个库全局注册)，可以使用 resolveComponent() 来解决这个问题。
```
import { defineComponent,ref } from "vue";

export default defineComponent({
    setup(props,context){
        // 触发自定义事件
        context.emit('customEvent',someValue);
        const count = ref(0);
        const increase = ()=>{
            count.value ++ 
        }
      reurn ()=>{
        <div>
            <p>{count.value}</p>
            <button onClick={increase}>Increase</button>
        </div>
      }  
    }
})

1. if




```

1. 低代码开发平台的核心原理和技术栈
2. 可视化编辑器
3. 拖拽式组件构建、流程编排设计
4. 数据模型设计、元数据管理和动态渲染技术