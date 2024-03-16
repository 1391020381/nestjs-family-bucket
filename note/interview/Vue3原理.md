# Vue3响应式原理

* Vue3 所有模版(组件) 最终都会被effect包裹, 当数据发生变化时 Effect 会重新执行.
* 最终组件是会被编译成为一个个effect,当响应式数据改变时会触发 effect函数重新执行从而更新渲染页面即可。

* 对于数据访问时,需要进行依赖收。记录当前数据中依赖了哪些Effect,当进行数据修改时候同样会进行触发更新,重新执行当前数据依赖的Effect。 也就是响应式原理。

* effect基础原理
    - effect接受一个函数作为入参。
    - 当调用effect(fn)时,内部的函数会直接被调用一次。
    - 其次 当effect中的依赖的响应式数据发生改变时,我们期望 effect会重新执行。


* 在Vue3中,每个组件实例都有一个关联的effect函数,这个函数在组件首次渲染和后续更新时被调用。

```
import { effect } from 'vue';

const componentInstance = {
   // ...其他组件数据和方法
   update: effect(function componentEffect() {
     // 组件的渲染逻辑
   })
}


```

# Vue3 响应式 嵌套对象

```

function reactive(target) {
    if (typeof target === 'object' && target !== null) {
        return new Proxy(target, {
            get(target, prop, receiver) {
                const res = Reflect.get(target, prop, receiver)
                if (typeof res === 'object' && res !== null) {
                    return reactive(res)
                }
                return res;
            },
            set(target, prop, value, receiver) {
                const res = Reflect.set(target, prop, value, receiver)
                console.log(`Setting ${prop} as ${value}`);
                return res;
            }
        });
    }
    
    return target;
}

let state = reactive({
    info: {
        name: 'James',
        age: 25,
    },
    hobbies: ['coding', 'reading']
});

state.info.name = 'Michael'; // "Setting name as Michael" 会被打印到控制台
state.info.age = 30; // "Setting age as 30" 会被打印到控制台
state.hobbies[0] = 'dancing'; // "Setting 0 as dancing" 会被打印到控制台


```

# keep-alive

```
// keep-alive组件 
export default {
  name: 'KeepAlive',
  setup(props, { slots }) {
    const cached = new Map() // 用于存储缓存组件实例
    const currentName = ref(null)

    watchEffect(() => {
      // 当前显示的组件名称
      currentName.value = slots.default()[0].type.name
    })

    onActivated(() => {
      // 从缓存中移除不需要保持的组件
      for(let [name, component] of cached.entries()) {
        if (props.include.indexOf(name) < 0 || name === currentName.value) {
          component.unmount() // 卸载组件实例
          cached.delete(name)
        }
      }
    })

    return () => {
      const vnode = slots.default() 
      const componentName = vnode[0].type.name
      
      // 如果组件在缓存中，直接使用缓存的组件
      if (cached.has(componentName)) {
          return cached.get(componentName)
      } 
      
      // 如果组件不在缓存中，进行缓存
      if (props.include.indexOf(componentName) >= 0) {
          cached.set(componentName, vnode[0])
      }

      return vnode
    }
  }
}


```
* 我们创建了一个 KeepAlive 组件，它接收一个 include 属性，该属性是一个组件名称的数组，指定需要被缓存的组件。
* 组件内部通过一个 Map 对象 cached 来保存需要缓存的组件实例。
* 当每次页面路由变化后，触发 onActivated() 钩子，判断当前显示的组件是否需要被缓存。
* 在 render() 函数中，首先检查将要渲染的组件是否已经在缓存中，如果在，则直接使用缓存的组件；否则，检查该组件是否需要被缓存，如果需要，则添加到缓存中。


* template -> render -> mount
* 首先，如果我们没有提供 render 函数，那么我们传递给模板或 el 选项的模板字符串会被 Vue 的编译器编译成 render 函数。这是通过内部 _compile 方法实现的。
接下来是 $mount 方法，它的主要工作是调用 _mount 方法，_mount 方法会创建一个观察者 Watcher 实例，这个过程中会导致渲染函数首次尝试执行。也就是说，Watcher 实例创建时会立刻执行一次 render 函数生成 VNode。
Vue 使用了 snabbdom 作为其 Virtual DOM 实现，生成的 VNode 就是 snabbdom 中的 VNode。这个 VNode 是虚拟节点，我们先会对这个 VNode 进行操作，再将最后的结果反映在真实 DOM 上。
VNode 生成之后，会调用 patch 函数将 VNode 渲染成真实 DOM，也就是我们在页面中看到的元素。这是一个递归的过程，patch 函数会遍历 VNode 树，并对每一个 VNode 节点创建对应的 DOM 元素，最后返回的是根节点的 DOM 元素。
最后，Vue 会将返回的 DOM 元素挂载到目的地元素上，通常是你在 $mount 方法中传入的元素。
以上就是 $mount 方法中关于如何将 render 函数生成的 VNode 转换成 DOM 的整个过程

* template -> render  -> mount 
  - render  其实就是一个对象 {components,setup,render}