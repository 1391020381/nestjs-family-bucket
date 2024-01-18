1. koa vue3
#  开发环境
* Vite 打包 Vue 项目时，默认情况下会将 index.html 视为入口文件，并通过引用的 JavaScript 文件来打包应用程序。
* 如果 index.js 文件发生更改，Vite 会自动重新编译应用程序。这是由于 Vite 的开发服务器采用了热模块替换（HMR）技术，它会在文件更改时自动更新浏览器中的应用程序，而无需手动刷新页面。
* 需要注意的是，如果 index.html 文件本身发生更改，Vite 不会自动重新编译应用程序。在这种情况下，您需要手动重启 Vite 开发服务器，才能看到更改后的效果。
* work-front 提供js css  proxoy   页面 api
* work-server 提供 api  页面