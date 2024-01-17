1. Vue.js 3.x组件库开发要点
    - monorepo管理组件代码
        - 基础组件
        - 业务组件
    - Vue.js 3.x 源文件的多种模块格式编译 自动识别 TS类型
        - 支持组件库能够按需加载使用  需要每个组件库单独编译,输出单独的文件,也支持使用者 单独 npm安装使用
        - 支持TS类型 需要在输出 组件库的js的ts类型描述文件(*.d.ts文件)
    - 基于Less开发CSS样式文件和独立编译
        - 变量
        - 函数复用
        - 循环逻辑

        - 不同组件的CSS样式内容也要独立拆分

* 在Package.json文件中，main、module和types三个字段都是用来指定模块的入口文件的。它们的作用分别如下：

1. main字段：指定模块的主入口文件，该文件会被require()函数调用。如果没有指定main字段，Node.js会默认寻找index.js或index.json文件作为模块的入口文件。

2. module字段：指定模块的ES6模块入口文件，该文件会被import语句调用。如果指定了module字段，Webpack等打包工具会优先使用该字段指定的文件作为模块的入口文件。

3. types字段：指定模块的TypeScript类型定义文件，该文件会被TypeScript编译器调用。如果指定了types字段，TypeScript编译器会自动加载该文件中定义的类型信息。
这三个字段的作用是不同的，但它们都是用来指定模块的入口文件，从而让其他模块可以引用该模块。在实际开发中，我们可以根据需要选择使用哪些字段，并指定相应的入口文件。


* peerDependencies是一种用于指定模块依赖关系的机制，它主要用于指定一个模块所依赖的其他模块的版本范围，以及这些模块是否需要在安装该模块时一起安装。

peerDependencies的作用主要有以下几个方面：

1. 解决模块依赖冲突问题：当一个模块依赖于多个版本不同的同一个模块时，peerDependencies可以指定这些模块的版本范围，避免冲突问题。

2. 明确模块之间的依赖关系：通过peerDependencies可以明确模块之间的依赖关系，提高模块的可维护性。

3. 管理依赖的安装：peerDependencies可以指定某些模块是否需要在安装该模块时一起安装，从而更加精细地管理依赖的安装。

总之，peerDependencies是一种非常有用的机制，它可以帮助开发者更好地管理模块之间的依赖关系，并解决模块依赖冲突等问题。


* 不同类型的组件库里的每个单独组件都有一个索引文件和样式文件作为入口进行管理。
* 这样就能保证我们的组件格式都是统一的,而且有一一对应的功能源码文件和样式文件,最后编译结果也能通过对应路径找到对应的组件。

* Rollup 编译 vue3组件库

```
是的，Rollup 可以打包 Vue 项目，并且可以包含各种静态资源，例如 CSS、图片、字体等。你可以使用 rollup-plugin-vue 插件来处理 Vue 单文件组件，并使用其他适当的 Rollup 插件来处理其他资源。以下是一个简单的 Rollup 配置文件，可以打包 Vue 项目：

```
import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import image from '@rollup/plugin-image';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    vue(),
    css({ output: 'dist/bundle.css' }),
    image()
  ]
};
```

在这个配置文件中，rollup-plugin-vue 插件用于处理 Vue 单文件组件，rollup-plugin-css-only 插件用于处理 CSS 文件，@rollup/plugin-image 插件用于处理图片文件。你可以根据需要添加其他插件来处理其他类型的资源。

```
* 代码编译步骤
    1. 编译 TS 和 Vue3 源码为ES Module 和 CommonJS模块的两种JS代码文件
    2. 编译出所有JS文件的TS类型描述文件
    3. 把文件编译Less成CSS文件

* jsx
* defineComponent  props emits setup  render
* 在Vue 3中，通过`defineComponent`创建的组件，`setup`函数返回的对象中的属性和方法会被注入到`render`函数的第一个参数中，也就是`ctx`对象中。
在这个例子中，`setup`函数返回了一个包含`state`和`onClick`的对象，因此在`render`函数中，我们可以通过解构`ctx`对象来获取这两个属性，然后在模板中使用。
例如，在模板中，我们使用了`{state.count}`来显示当前计数值，使用`onClick`来绑定按钮的点击事件。这些属性和方法都是从`setup`函数中返回的对象中获取的，通过`ctx`参数传递到了`render`函数中。

```
import { defineComponent, reactive } from 'vue';
import './counter.css';

const Counter = defineComponent({

  setup() {
    const state = reactive({
      count: 0
    });
    const onClick = () => {
      state.count ++;
    }
    return {
      state,
      onClick,
    }
  },

  render(ctx) {
    const { state, onClick } = ctx;
    return (
      <div class="counter">
        <div class="text">Count: {state.count}</div>
        <button class="btn" onClick={onClick}>Add</button>
      </div>
    )
  }
});

export default Counter;


```
