* 脱水 和 注水 这两个概念主要用于解决服务器和客户端的数据一致性问题。

* 注水 Hydration

* 注水是在服务端渲染过程中,当我们已经在服务器端获取了初始化数据并用这些数据渲染了初始化html，我们会将这些初始化数据 注水 到 html中, 通过是以内联脚本的方式写入html. 当浏览器接受到这些html后,js会获取这些 注水的数据,并用这些数据再此初始化应用。 这样的话,客户端初始状态就能和服务端完全保持一致,从而避免因状态不一致导致渲染失败。

```
<script>
    window.__INITIAL_DATA__ = ${JSON.stringify(data)};
</script>

```
* 再客户端获取这个全局变量 初始化应用状态
* let data = window.__INITIAL_DATA__;


* 脱水 Dehydration
* 脱水则是和注水相反的过程。 在服务器端,我们先 脱水 把组件的状态移除,把这部分状态传送给客户端, 客户端在 注水 后 把状态还原,变回原来的组件。

* 脱水 和注水的过程 主要是为了让服务端渲染的html能够被客户端成功接管,从而实现所谓的 同构 渲染,在提高首屏加载速度的同时,也能够保持应用的交互性。


* 服务端渲染  同构渲染
* jsp php express 直出
* vuessr 

#  使用 Server Side Render
* 通常 Vue.js程序会被构建为一套纯客户端运行的SPA应用,相比于传统的JSP ASP 等技术栈,SPA已经能解决许多前后端协作的开发效率 性能 分工 工程化问题,但却很自然引入一些新问题。
    - SEO不友好 大多数搜索引擎对网页内容的解读都依赖于同步HTML内容,通过ajax异步获取数据再渲染,爬虫并不会等待异步操作完成之后才解析页面内容,所以SPA应用通常无法向爬虫提供任何有用信息。
    - Time-To-Content更长 由于客户端需要等待所有js资源都加载完毕后,才会开始渲染页面真正有意义的内容,所以TTC时间相对更长。
 * SSR是一种在服务端将组件渲染html字符串并发送到浏览器,最后在浏览器上将这些html片段 激活 为 客户端上可交互的应用技术。  

 * 在Vue场景下,通常可以选择 Nuxt.js @vue/server-render等方案实现SSR,这些技术的底层逻辑都包含三个大的步骤：
    - 编译时,将同一组件构建为合适在客户端 服务器运行的两份副本。
    - 服务端接受到请求时,调用 Render工具将组件渲染为HTML字符串,并返回给客户端。
    - 客户端运行HTML 并再次执行组件代码, 激活(Hydrate)组件

 ![ssr原理](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06c7576bbb6b4ee596baa2bf4f2192ed~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)   

 ```
// entry-client.js

import { createSSRApp } from "vue";

import App from "./App.vue";



createSSRApp(App).mount("#app");



 ```

 ```
// entry-server.js

import { createSSRApp } from "vue";

import App from "./App.vue";



export default () => {

  return createSSRApp(App);

};


 ```

* 两者区别在于 客户端版本会立即调用 mount接口,将组件挂载到页面上; 而服务端版本只是 export一个创建应用的工厂函数。



# Nuxt
* 在初始的服务器渲染失败后,再在客户端重新发起请求。如果再次失败,则可以进行错误处理,则可以进行错误处理,例如显示错误通知。
* 这种方式 在服务器的数据请求失败后能够有效地再次发起请求。但要注意,仍然可以会因为第一次的服务端请求失败而导致页面加载延迟,所以尽量要确保服务器端数据请求的稳定性和可靠性。

```
export default {
  async asyncData({ params }) {
    try {
      const { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title, dataLoadError: false }
    } catch (error) {
      return { dataLoadError: true }
    }
  },
   async mounted() {
    if (this.dataLoadError) {
      try {
        const { data } = await axios.get(`https://my-api/posts/${this.$route.params.id}`)
        this.title = data.title
        this.dataLoadError = false
      } catch (error) {
        // 处理错误，例如显示错误通知
      }
    }
  },
}


```
* 这个问题是由于在Nuxt.js应用中，服务端渲染（SSR）和客户端渲染（CSR）之间的样式差异导致的，称为闪烁（FOUC，Flash Of Unstyled Content）问题。产生这种情况的原因可能有以下几个：
异步数据获取：在服务端渲染和客户端渲染之间的数据差异，可能导致渲染出的HTML结构不一致，从而引发样式闪烁。
全局样式：可能由于部分全局样式仅在客户端加载，这会导致服务端渲染的内容和客户端内容在样式上存在差异，从而产生闪烁效果。
CSS动画：CSS动画在页面加载时立即触发，可能导致页面在加载完成前产生样式的闪烁。
针对以上可能的问题，这里提供一些可能的解决方案：
对于异步数据获取导致的样式闪烁，可以尝试调整数据请求的时机，确保服务器端渲染和客户端渲染使用的是相同的数据。或者在数据还未加载完成时，使用骨架屏或占位符等方案，避免内容跳动。
对于全局样式导致的问题，应确保全局样式在服务器和客户端都能被正确地加载使用。全局样式建议在Nuxt应用的布局文件或者 nuxt.config.js 文件中全局引入。
对于CSS动画，有两种常用的解决方案：一是设置动画的初始状态，使得在页面加载完成前，元素保持稳定的视觉效果；二是等待页面完全加载完成后，再通过JavaScript触发动画。
以上只是一些基本的解决方案，具体情况可能需要依据你的应用来进行调整。如果仍然无法消除跳动，建议提供更多具体的代码细节，以便做出更详细的解答。


* 在Nuxt.js中，全局CSS或者SCSS样式文件通常有两种加载方式。
    - 在 nuxt.config.js 文件中定义全局样式：
这是加载全局CSS或SCSS样式最常见的方式。在 nuxt.config.js 文件的 css 字段中，你可以指定要全局引入的样式文件。
如下例所示，引入了一个CSS样式文件和一个SCSS样式文件：

```
    export default {
      css: [
        '@/assets/css/main.css',
        '@/assets/css/main.scss'
      ]
    }


```
- 布局文件是用来定义应用界面的部分结构的，你也可以在这里引入全局样式。

例如，你可以创建一个名为 `default.vue` 的布局文件，在该文件里使用`<style>`标签引入样式： 

* [vite-ssr](https://juejin.cn/book/7050063811973218341/section/7066612265536978981#heading-0)
# SSR 缓存
1. lru-cache
2.  CDN

# 性能监控


```
import { performance, PerformanceObserver } from 'perf_hooks';

// 初始化监听器逻辑
const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach(entry => { 
    console.log('[performance]', entry.name, entry.duration.toFixed(2), 'ms');
  });
  performance.clearMarks();
});

perfObserver.observe({ entryTypes: ["measure"] })

// 接下来我们在 SSR 进行打点
// 以 renderToString  为例
performance.mark('render-start');
// renderToString 代码省略
performance.mark('render-end');
performance.measure('renderToString', 'render-start', 'render-end');


```