1. koa vue3
#  开发环境
* Vite 打包 Vue 项目时，默认情况下会将 index.html 视为入口文件，并通过引用的 JavaScript 文件来打包应用程序。
* 如果 index.js 文件发生更改，Vite 会自动重新编译应用程序。这是由于 Vite 的开发服务器采用了热模块替换（HMR）技术，它会在文件更改时自动更新浏览器中的应用程序，而无需手动刷新页面。
* 需要注意的是，如果 index.html 文件本身发生更改，Vite 不会自动重新编译应用程序。在这种情况下，您需要手动重启 Vite 开发服务器，才能看到更改后的效果。





* work-front 提供js css  proxoy   页面 api
* work-server 提供 api  页面

2. SSR CSR
* SSR 首屏优化 SEO
* CSR 在浏览器里动态渲染html,在浏览器里实现交互效果。

* CSR的原理 把 Vue.js的模版语法代码或JSX语法代码 编译成纯JS代码 然后通过Vue.js的runtime,也就是Vue.js的运行时,执行编译后的Vue.js代码,并渲染出对应的DOM(也就是HTML)和绑定DOM事件


* Vue 编译和非编译模式 以及 对应工具的使用 JS打包成对应格式 CSS单独抽离

* 四步走
    1. 前端子项目Vue.js组件,编译成面向浏览器可运行的JS代码
    2. 前端子项目Vue.js组件 编译成面向Node.js服务可以运行的JS代码
    3. 后端子项目引用对应编译后的JS代码 运行相关的结果
    4. 页面渲染时候,按照需要进行SSR或者CSR。

    * 封装好需要SSR页面的Vue.js代码，就编译成CommonJS模块格式,虽然Node.js现在已经支持ES Module模块格式,但考虑兼容性问题,还是以CommonJS模块格式提供出来比较稳妥。

* 涉及数据敏感 服务器压力的场景 就不合适用SSR。 如果企业内部有专业的数据安全团队和服务运维团队辅助,他们可以支持数据"防爬" 和 服务动态扩容。
    ![SSR-CSR](https://static001.geekbang.org/resource/image/0e/21/0ed73dfe29365a3d17bb10d5d1b0be21.jpg?wh=1920x1080)
    ![SSR-解析](https://static001.geekbang.org/resource/image/be/45/be4917fffe9d1a25db03eb2f085de145.jpg?wh=1920x1080)



 # 营销活动搭建系统  
 * 用户 物料 页面 三个维度
 1. 组件库  基础组件库  业务组件库  通过组件库来搭建页面
 2. 通过vite 等工具 将 组件打包成不同的格式 并 发布到 npm 或 cdn   如果包含路由直接编译组件 然后 拼装页面可行？
 3. web后台 涉及到组件的 注册 编辑 列表
 4. SSR CSR 通过 页面配置信息 组装页面   注入数据


     