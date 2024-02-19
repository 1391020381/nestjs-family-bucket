# 营销低代码

* docker run --name cocoh5-mysql -e MYSQL_ROOT_PASSWORD=171226q2 -e MYSQL_DATABASE=coco  -p 3306:3306 -v /Users/zhoujin/Volume/cocoh5-mysql:/var/lib/mysql -d mysql

* 启动 server 启动 web 启动 Switchhost
* http://aaa.coco-h5.cn:8080/#/
* http://aaa.coco-h5.cn:8081/#/?isEdit=true


* coco-web  edit index.vue  state.url state.showUrl


* coco-template 创建模版   npm run release
    - octokit  依赖github的 gh_page    github -> setting developer settings -> Personal access tokens
    - download -> 组织
    - coco-server  project.js 创建项目
    - 发布项目在 组织中可以通过 gh_page来访问  CNAME coco-h5.cn


* coco-banbner 
    - deploy.sh    

# 从零开发H5可视化搭建项目

# 可视化搭建诞生的背景
- C端活动  活动 问卷
- 中后台系统  标准化页面  核心团队研发  前端 后端 测试等研发使用,通过简单的图形化配置和低代码, 不仅实现业务需求,还提供权限 环境 灰度 埋点 监控等能力。 必将会大大缩减前端开发的负担和压力,也会加速业务进展。
- 现阶段的可视化搭建的分类
    - 基于dom元素的高度自由度搭建
    - 基于组件化的拖拽搭建
    - 基于业务化的拖拽搭建
- 交互逻辑需要侵入开发 无法自动生成
- 只能在受限 具体的业务场景下发挥作用

- 通过其中一种类型来详细剖析其中的架构和技术细节原理。
- 目前互联网公司核心业务需求一般都是继续业务功能的搭建体系,比如活动页等场景,本小册也主要从这里出发,一步步去设计一个人基于业务功能组件化的h5可视化搭建能力。

## 架构设计
* 基于业务功能的h5的可视化搭建场景
    - 需要丰富的模版 组件玩法满足各种业务场景。
    - 需要有易用的可视化编辑器 所见即所得。
    - 需要有页面发布能力 支持编辑后页面随时发布上线。
    - 最重要的是稳定性 保障线上项目安全稳定运行。

    - 编辑系统和组件解耦 组件只需要遵循编辑系统的组织约定,其具体开发过程和承载的逻辑与编辑系统无关 支持自由拓展页面组件。
    - 编辑系统与模版采用的前端框架解耦 在遵循编辑系统约定下 可选择不同的前端框架

    - JSON Schema  form-render

    * ![稳定性方案](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9747d71b76674a72810dae6f4013d506~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)
    * ![系统架构](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91f2299b194644758271222cb32cf9f2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

# 前置知识
1. 远程组件
    - 加载远程异步代码的组件来完成将这些组件加载到框架中    
2. lowcode
3. 页面模版和全局组件
    - 页面模版是对同一类型页面的抽象,可以通过模版来衍生出各种形式的页面 模版中可以涵盖各种类型的组件  我们称这些组件为 模版组件 模版组件是无法进行跨模版共享 只用用于当前页面使用。
    - 全局组件是远程组件的实现方式 可以用来跨多模版共享 一些通用的模版组件可以抽离成 一系列全局组件
4. vue3
5. 组件库 anddv 2x
6. egg

# 模版设计
![模版设计](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01fe9550fd894356a8060461b065af89~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

* 可闭环的业务组件
* package.json  JSON Schema

```
{
  "name": "coco-banner",
  "description": "banner 组件",
  "snapshot": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  "schema": {
    "type": "object",
    "properties": {
      "src": {
        "title": "图片地址",
        "type": "string",
        "format": "image"
      },
      "link": {
        "title": "跳转链接",
        "type": "string",
        "format": "url"
      }
    },
    "required": [
      "src"
    ]
  },
  "data": {
    "src": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  }
}

```
# 模版通讯设计
- 有哪些组件
-  组件基本信息

```
function getComponent() {
  const componentConfig = [];
  const requireConfig = require.context(
    './components',
    // 是否查询其子目录
    true,
    /package.json$/
  );
  requireConfig.keys().forEach(fileName => {
    const config = requireConfig(fileName);
    componentConfig.push(config);
  });

  return componentConfig;
}


```
-  如何告知

- 模版页面 和编辑器页面之间的数据通讯 
- 总之因为模版和编辑器后台已经解耦 所以要想模版可以在编辑器后台展示  那么最常用 轻便的办法就是通过 iframe的形式内嵌模版页面。
- 通讯问题就转化为 如何实现 2个 iframe之间的通信  postMessage

```
export function postMsgToParent (message) {
  window.parent.postMessage(
    message,
    '*'
  );
}

// 通知父容器
postMsgToParent({
  type: 'returnConfig',
  data: {
    components: this.componentConfig, // 当前模板信息
    // ...
  }
});


```

# 模版动态化交互
* 模版如何接受编辑器传递过来的对模版编辑后的消息 并 消息进行实时响应。
```
<div
  :id="`coco-render-id-_component_${index}`"
  :key="index"
  v-for="(component, index) in components"
>
  <div
    :is="component.name"
    :key="component + index"
    :obj="component.props"
    :config="component.config"
  />
</div>


export default {
  created() {
     window.addEventListener('message', (e) => {
      // 不接受消息源来自于当前窗口的消息
      if (e.source === window || e.data === 'loaded') {
        return;
      }
      this[e.data.type](e.data.data);
    });
  },
  methods: {
    addComponent() {
      // todo add componet
    },
    changeProps(payload) {
      this.$set(this.components[this.currentIndex], 'props', payload);
    },
  }
}

// 封装
<CocoComponent>
  <coco-banner :obj="{
    src: require('./assets/banner.jpg'),
    link: 'https://coco.com',
  }" />
  <coco-form />
</CocoComponent>


```

# 稳定性策略
1. 编辑器对模版页面进行数据结构生成 & 发布
2. 从表单模版中clone 一份页面 和源码解耦
3. 发布clone后的页面
4. 模版升级不影响 clone后的页面。

- 组件更新  页面如何更新
- 模版版本号  可以通过接口在模版发布的时候 传给 server存储 
- 页面版本号  页面版本在业务方 基于模版创建页面的时候生成,取当前的模版版本号，存于server层。

# 全局组件设计
* 我们可以将组件打包好的库代码动态注入到页面 再交给页面运行时渲染。单独组件

# 全局组件注册
* 把代码渲染出来有两个方案
1. 通过 注册组件 的方式 把代码注册为vue 实例的组件,注册组件 又分为 全局注册  局部注册  
2. 通过 挂载点直接 挂载 vue实例  即通过 new Vue({el:"#id"}) 的方式 

* 记住全局注册的行为 必须在根 Vue实例 (通过 new Vue) 创建之前发生。
* 全局组件以及和模版解耦了，运行时Vue实例 已经创建完,所以直接通过 Vue.component的方式 可能行不通
* 局部注册 必须提前告知 组件名称
* 动态组件 component   this.component = Vue.extend({template:"",data:()=>{}})

```

export default {
   // ...
   created() {
    // 动态添加组件，用于可视化编辑场景
    const {
      name,
      js,
      css,
      index,
    } = this.config;
    const component = window[name];
    if (!component) {
      const script = document.createElement('script');
      const link = document.createElement('link');
      script.src = js;
      link.href = css;
      link.rel= 'stylesheet';
      // 动态注入 js 和 css
      document.head.appendChild(link);
      document.body.appendChild(script);
      script.onload = () => {
        // 加载完成
        this.$emit('onRemoteComponentLoad', {
          ...window[name],
          index,
        });
        this.component = Vue.extend(window[name].Component);
      }
    } else  {
      // 非动态化添加，用于server构建场景
      this.$emit('onRemoteComponentLoad', {
        ...window[name],
        index,
      });
      // 先有 props 再挂组件，不然 props 是 null 可能会有错
      this.$nextTick(() => {
        this.component = Vue.extend(window[name].Component);
      });
    }
  },
}
//  来捕获子组件的错误， 此钩子中修改组件的状态。 因此在捕获错误时，在模版或渲染函数中有一个条件判断来绕过其他内容，不让该组件进入无限的渲染循环。
errorCaptured(err,vm,info){}

```
* 动态实例
* new Vue(component).$mount(component.$el)


# 稳定性- 组件更新策略
* 当组件因为更新功能需要更新时，我们对整体的风险影响面是不可控的,只要用到了该组件的页面,在经历发布后都会变成最新的组件,因为我们的cdn指向的是 https://cdn.com/coco-global-banner.umd.js 这样的地址，每次发布都会进行覆盖式更新。
* 可以通过手动添加version的方式来发布组件。 管理组件的版本号
* https://cdn.com/coco-global-banner/coco-global-banner.0.0.1.umd.js
* 通过这种方式便实现了组件更新选择性升级的策略,我们的发布对线上现存的页面是无影响的。 如何全量更新？

## 一些额外的问题
*  当组件js加载完成后,我们可以需要拿到 window上组件的config 
* 组件编译成umd格式后会被挂载到window上。

* 当组件加载完成后我们需要通过 vue的 emit事件来抛给外部模版,告知模版当前加载了哪些组件，由模版统一收集后和编辑器通信。



* 组件我们的定义是一系列原子逻辑的单元,为了更加便于开发者维护和管理,我们损失了一定的扩展性来满足了易用性。
* 也就是说我们组件其实是可以独立完成业务逻辑的最小闭环。

* 再说下如果非要涉及联动,其实也很容易解决,你可以通过注册中央事件分发器的方式来实现, 需要抛事件的直接抛给中央事件存储,需要响应的订阅相关消息即可。再说一下 对于模版组件消息通信,我们其实可以直接使用vuex 或者 redux来完成,也就是类似兄弟组件如何处理消息通信的问题。

# 设计实现CLI为开发助力

![coco-cli](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2400132f80f46e39147ce989d8fcbb3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)
1. 常用模块
    - chalk 可以在终端显示颜色
    - commander  提供了命令行输入和参数解析 简化命令行开发
    - inquirer 交互式命令行工具 用来收集用户填写表单
    - ora 终端加载动画效果,增加趣味性
    - shelljs 通过在代码中编写shell命令实现功能
    - puppetter主要用来启动无头浏览器生成网站缩略图
    - download-git-repo 用来下载远程模版
* CLI是 web开发的辅助工具,旨在提高web工作效率,当前用CLI来为开发提效只是可视化搭建中最基础的一部分。
* 我们完全可以基于 git 操作在我们编辑后台设计一套模版研发流程,通过可视化的方式管理研发的 生命周期 包括模版的发布 灰度 审批等等一系列规范化流程。 

# 可视化编辑区实现
- coco-web  编辑器
- coco-template  iframe 内嵌
- 采用 iframe的方式是为了模版和编辑器解耦
- 我们中间的预览区域其实就是为了尽可能模拟移动端页面效果。
- 只需要我们对页面和编辑器设置相同主域 便可以进行跨域操作 获取子 iframe的元素
* 总之因为 模版和编辑器后台已经解耦，所以要想模版可以在编辑器后台展示 那么最常用 轻便的办法就是通过 iframe 的形式内嵌模版页面。
* 那么通信问题就转换为如何 实现 2个 iframe之间的通信。 
* 拖拽 iframe 放置的时候 会触发放置区域 ondrop 事件  该事件 回调函数会返回 放置的Y轴坐标 layerY 那么可以通过动态计算每个组件占据的高度和total 通过比较 layerY 和 total 计算出该放置的位置。


* postMessage

```

export function postMsgToParent (message) {
  window.parent.postMessage(
    message,
    '*'
  );
}

// 通知父容器
postMsgToParent({
  type: 'returnConfig',
  data: {
    components: this.componentConfig, // 当前模板信息
    // ...
  }
});


```

# 可视化编辑区 mock & 预览
* 解决业务模版 api 数据对编辑器展示内容不全的问题。

* 在编辑时用 mock 解决样式问题  并提供预览能力 用于真实数据请求展示。
* coco-template 处理

# vue3 Form render 实现
- form render 实现 JSON Schema 到表单 的转换能力

- vue-form-render  接受一个 schema 入参用于表单描述 再接受 一个 formDat入参数作为表单初始值 当表单进行变更时需要提供change 事件 通知前端更新数据,如果表单输入不合法,则需要通过 validate事件告知前端。

```
<formRender
  :schema="schema"
  :formData="formData"
  @on-change="change"
  @on-validate="validate"
/>


```

# Server端编译实现
* 当页面加载的时候再根据id来请求云端存储的数据
    - 用户体验问题 每次打开页面都会发起数据请求来获取页面配置数据 在这之前 页面必然是白屏状态
    - 增加服务端压力 对于大促类型的活动 QPS是必须要考虑的点,如果QPS过大则会影响服务端的负载。
    - 额外的数据维护成本。
* 在服务端 把数据 打包页面 一个变量上 

# 发布流程设计
* 页面编译了，编译最终会产生静态文件,这些文件无论我们通过怎么样的方式发布归根结底都是为了将静态文件推到cdn上。
* 因为本身 server 端的构建就是对已经测试过的页面进行数据注入，并不会影响页面的结构。