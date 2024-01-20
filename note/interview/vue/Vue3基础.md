1. Vue3 编译和非编译模式
* 当Vue.js代码在生产环境中报错了,你该如何快速根据生产环境编译后的代码,进行问题定位和排错？

* Vue.js代码的编译过程中,主要进行了一下操作流程:
    1. 把 Vue.js代码里的模版编译成基于 js代码描述的VNode(虚拟节点)
    2. 把 Vue.js代码里的js逻辑代码 编译成运行时对应生命周期的逻辑代码
    3. 最后是把内置的css样式代码抽离出来。
    * Vue.js经过编译后产出是js和css代码,也就是浏览器可以直接支持运行的代码。
* Vue.js非编译模式    
    * 在浏览器里进行编译。 
    * 由于是直接写模版代码 代码运行的时候有一个模版的编译过程 也就是会将字符串模版编译成VNode的结果,再执行VNode的渲染。

    * Vue.js的非编译模式直接可以书写出在浏览器运行的Vue.js代码,可以跳过开发编译, 直接在浏览器里组装Vue.js的代码结构,动态渲染出想要页面功能。

    * 组装结构  +  动态渲染

    * 适合于一切能在浏览器动态搭建的场景,就是低代码搭建页面的场景。
    * Vue.js的非编译模式写法可以直接用于低代码的核心解决方案中。
    * 基于非编译模式写法可以用来编写低代码平台搭建页面的组件运行时。
    * 阿里等大厂内部基于React.js的低代码场景实现方式,也经常见到基于React.js的非编译写法来构造浏览器端的运行时。

 * Vue.js非编译模式
 1. h函数
 2. template
 3. createVNode, createElementVNode
 * Vue.js 3 非编译场景与 Vue.js的JSX写法有什么联系  

 2. webpack vite 构建 vue3项目
 * webpack vite 有什么区别
    - webpack 定位构建打包工具
    - vite 定位Web开发工具链 其内置了一些打包构建工具

3. 模版语法和JSX语法  
    -  几个component 变换顺序
    -  JSX  Dialog  app.mount()



    ```
import { defineComponent, reactive, createApp, h, toRaw } from 'vue';

const Dialog = defineComponent({
  props: {
    text: String,
  },
  emits: [ 'onOk' ],
  setup(props, context) {
    const { emit } = context;
    const state = reactive({
      count: 0
    });
    const onOk = () => {
      emit('onOk')
    }
    return {
      props,
      onOk,
    }
  },
  render(ctx) {
    const { props, onOk } = ctx;
    return (
      <div class="v-dialog-mask">
        <div class="v-dialog">
          <div class="v-dialog-text">
            {props.text}
          </div>
          <div class="v-dialog-footer">
            <button class="v-dialog-btn" onClick={onOk}>确定</button>
          </div>
        </div>
      </div>
    )
  }
});

export function createDialog(params = {}) {
  const dom = document.createElement('div');
  const body = document.querySelector('body');
  body.appendChild(dom);
  const app = createApp({
    render() {
      return h(Dialog, {
        text: params.text,
        onOnOk: params.onOk
      })
    }
  });
  app.mount(dom)

  return {
    close: () => {
      app.unmount();
      dom.remove();
    }
  }
};

    ```