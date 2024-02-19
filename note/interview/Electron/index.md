* Electron相比其他 Native来说,包体积和CPU资源占用较高
* 需要额外解决一些安全性问题和性能体验问题。

* 相对 Web开发的一些优势
    - 无兼容问题
    - 最新浏览器 Feature
    - 轻松绕过跨域问题
    - 使用 Node.js提供的能力  Node.js的所有内置模块 第三方模块
    - 客户端能力的支持
        - 为了弥补 Node.js和前端技术访问系统 api方面的不足,Electron内部对系统api做了封装
        - 客户端GUI 右键菜单 客户端定制 系统托盘 
        - 桌面环境集成 系统通知 剪切板 系统快捷键 文件拖放
        - 设备api 电源监视 内部 cpu 屏幕
    - 调用OS能力
        -     

  # 基本概念
  * Electron = Chromium + Node.js + Native API      

  * Electron 继承了来自Chromium的多进程架构 Chromium始于其主进程。 从主进程可以派生出渲染进程。 渲染进程与浏览器窗口时一个意思
  * 主进程保存着对 渲染进程的引用,并且可以根据需要创建/删除渲染进程。

  * 每个Electron的应用程序都有一个主入口文件 它所在的进程被称为 主进程 (Main Process) 而主进程中创建的窗体都有自己运行的进程,称为 渲染进程 （Renderer Process）
  * 每个Electorn 的应用程序有且仅有一个主进程 但可以有多个渲染进程。

  * 简单理解 主进程就相当于浏览器 而渲染进程 就相当于浏览器上打开一个个网页。

  ## 主进程
  * 主进程是Electron应用程序的核心, 通常由一个主要的js文件(如 main.js) 定义 你可以在 package.json中指定它。

```
// package.json
{  
    "name": "my-electron-app",  
    "version": "1.0.0",
    "description": "Hello World!",  
    // 主进程入口文件
    "main": "main.js",   
    "author": "muwoo",  
    "devDependencies": {  
       // ...
    }  
}

```
* 它是应用程序的入口点 负责管理整个应用的生命周期 创建窗口 原生 api调用等。 
* 主进程可以访问底层的系统资源 如 文件系统 操作系统api等,这些功能通常是通过 Node.js提供的模块实现的。 它是 Electron应用的主要控制中心。

* ![Electron主进程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b57da553919c4750a18841f21acbb21a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1818&h=726&s=262126&e=png&a=1&b=d4557f)
    1. 管理应用程序生命周期
    * 在 Electron的主进程中，你可以使用 app 模块来管理应用程序的生命周期,该模块提供了一整套的事件和方法,可以让你用来添加自定义的应用程序行为。

    ```
    const { app }  = require("electron")；

    // Electron 完成初始化时触发
    app.on("ready",()=>{
        app.quit()
    }) 


    ```
* 在Electron中，will-finish-launching事件和ready事件都是属于app模块，它们代表了应用启动过程中的两个不同的阶段：
will-finish-launching：这个事件在Electron完成基本启动过程，但在主窗口加载和ready事件之前被触发。在这个阶段，Electron已经开始初始化但还没完全准备好创建浏览器窗口。这个事件是特定于macOS的，在应用程序启动过程中只会触发一次。主要用于绑定一些开机启动完成之前需要设置的事件监听器，如open-file和open-url。
ready：当Electron的初始化工作完成，并且准备好创建浏览器窗口时，会触发ready事件。这通常是你执行如创建新窗口等初始化任务的地方。在多数应用中，此事件被用来创建应用程序的主窗口。ready事件在应用程序的生命周期中只触发一次。
总的来说，will-finish-launching事件更早被触发，用于设置将在ready事件后立即需要的监听器；而ready事件标志着Electron应用准备好进行与窗口相关的操作，这时可以安全地创建和显示窗口。

* window-all-closed
* before-quit 
* will-quit
* quit

* ready的时候执行创建应用窗口 创建应用菜单  创建应用快捷键等 初始化操作。
* will-quit quit 的时候 执行一些清空操作 比如 解绑应用快捷键
* 在非 macos的系统下 通常一个应用的所有窗口都退出的时候,也是这个应用退出之时。
2. 创建窗口
* 主进程的主要目的之一是使用 BrowserWindow模块创建和管理应用程序窗口。 窗口管理是指创建 控制 和管理应用程序中的窗口。
*  closed
* focus
* show
* hide
* maxmize
* minimize
3. 调用原生API
* 为了使Electron的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的API来与用户操作系统进行交互。 
* 右键菜单 窗口定制 系统托盘 Dock
*  系统通知 剪切板  系统快捷键 文件拖放
* 电源监视 内存 CPU 屏幕
## 渲染进程
* 渲染进程是Electron应用程序中负责展示用户界面的部分。 每个渲染进程对应一个窗口(BrowserWindow) 或者一个网页。 通常由 HTML CSS JS构建用户界面
* 渲染进程与主进程是分开的，它们之间通过 IPC(进程间通信)来进行通信。 
* 渲染进程可以通过一些特定的Electron API 来 与主进程进行交互,以实现诸如向主进程发送消息 接受主进程的指令等功能。
* @electron/remote 使用这个库可以用来调用主进程的一些API能力

## 预加载脚本 preload.js
* 预加载(preload)脚本包含了那些执行于渲染器进程中,且先于网页内容开始加载的代码。
* 在 preload.js中 我们不仅可以使用 Node API 还可以直接使用Electron渲染进程的API 以及 DOM API,另外可以通过IPC 和主进程通信达成调用主进程模块的目的。
* preload.js脚本虽运行于渲染器的环境中,却因此而拥有了更多的权限。
## contextIsoIation的介绍
* contextIsolation是 Electron中一个重要的安全特性,用于提高渲染进程安全性。
* 它的作用在于将渲染进程的 js 上下文(代码执行环境) 与主进程隔离开来，以减少安全风险并加强安全性。
* 假设有一个 Electron应用程序 其中有一个渲染进程需要执行一些文件系统操作,比如读取本地文件并在界面中显示。 在未启用 contextIsolation的情况下,渲染进程可以直接访问Node.js的fs模块来进行文件操作。 但这样会存在安全风险 因为渲染进程可以执行任意订单文件系统操作,比如文件删除 可能导致安全漏洞或恶意代码执行。
* 现在启动了contextIsolation 渲染进行无法直接访问Node.js的fs模块。相反 你可以使用 preload 选项来为渲染进程加载一个预加载的脚本,在这个脚本中可以安全访问 node.js的fs模块,并将需要的操作通过 contextBridge模块封装成api 提供给渲染进程。 这样 渲染进程只能通过预加载的api来请求文件操作,而无法直接执行文件系统操作。

```
// preload.js
const { contextBridge } = require('electron')  
const fs = require('fs')
  
contextBridge.exposeInMainWorld('myAPI', {  
  exists: fs.exists  
})
// renderer.js
console.log(window.myAPI)  
// => { exists: Function }

```
## Electron 的安全问题