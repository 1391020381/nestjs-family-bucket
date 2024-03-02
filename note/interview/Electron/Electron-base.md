# Electron 基础概念
## 选型
1. Tarui NW.js Flutter Electron
* 总体来看,Electron 有着其强大的跨端能力 社区生态, 更重要的是可以直接使用 html css js 来开发桌面端应用程序, 对前端来说 非常容易上手 开发效率 和 学习曲线都非常友好。
2. Electron相对Web开发的一些优势
    1. 无兼容问题
    2. 最新浏览器Featrue  img lazy
    3. 轻松绕过跨域问题
    4. 使用Node.js提供的能力
    5. 客户端能力的支持
        - Electron内部对系统API做了封装   客户端GUI  桌面环境即成  设备API
    6. 调用OS能力
## 基础概念
1. 主进程 (main) 和渲染进程 （renderer）
* 每个Electron的应用程序都有一个主入口文件,它所在的进程被称为 主进程 Main Process
* 主进程中创建的窗体都有自己运行的进程 称为 渲染进程 Renderer Process
* 每个Electron的应用程序有且仅有一个主进程 但可以有多个渲染进程。
* 简单理解 主进程就相当于浏览器 而渲染进程就相当于在浏览器上打开一个个网页    
    1. 管理应用程序生命周期
    2. 创建窗口
    3. 调用原生API

2. 渲染进程
* 渲染进程是Electron应用程序中负责展示用户界面的部分。 每个渲染进程对应一个窗口 BrowserWindow 或者一个网页。 通常由 html css js构建用户界面
* 渲染进程与主进程是分开的 它们之间通过 IPC（进程间通信）来进行通信。 渲染进程可以通过一些特定的Electron API来与主进程交互,以实现诸如主进程发送消息 接受主进程的指令等功能。
* @electron/remote 提供一些调用主进程的一些API能力
3. 预加载脚本 preload.js
4. contextIsolation的介绍

## 进程间通信
1. ipcMain 和 ipcRenderer
* Electron 使用进程间通信IPC 来在进程之间进行通信。
* ipcMain 是一个仅在主进程中以异步方式工作的模块 用于与渲染进程交换消息
* ipcRenderer 是一个仅仅在渲染进程中以异步方式工作的模块 用于与主进程交换消息。
## 渲染进程 -> 主进程

```
// send
ipcRenderer.send(channel,message) 

window.electron.ipcRenderer.on("channel",(event,message)=>{

})

ipcMain.on(channel,(event,message)=>{

    event.reply('channel',message)
})

// invoke 
  const invokeReplyMessage = await window.electron.ipcRenderer.invoke('invoke', 'invoke_data')
  console.log('invokeReplyMessage:', invokeReplyMessage)

ipcMain.handle('invoke', async (evnet, message) => {
    console.log(`receive message from render: ${message}`)
    return 'invokeReplay'
  })


// sendSync

  const sendSyncReplyMessage = await window.electron.ipcRenderer.sendSync(
    'sendSync',
    'sendReplay_data'
  )
  console.log('sendSyncReplyMessage:', sendSyncReplyMessage)

  ipcMain.on('sendSync', async (event, message) => {
    console.log(`receive message from render: ${message}`)
    event.returnValue = 'replay'
  })
```
## 主进 -> 渲染进程

* 主进程向渲染进程发送消息一种方式是 当渲染进程通过  ipcRenderer.send ipcRenderer.sendSync ipcRenderer.invoke 向主进程发送消息时,主进程通过 event.replay  event.returnValue return 的方式进行发送。这种方式时被动的,需要等待渲染进程先建立消息推送机制 主进程才能进行回复。
1. ipcMain  webContents
* 主进程使用ipcMain模块来监听来自渲染进程的事件,通过 event.sender.send() 方法向渲染进程发送消息。
* event.sender.send('messageToRenderer', 'Hello from Main!');
* BrowserWindow.webContents.send 可以在主进程中直接使用 BrowserWindow 对象的 webContents.send() 方法向渲染进程发送消息
## 渲染进程 -> 渲染进程
* 默认情况下, 渲染进程和渲染进程之间是无法直接进行通信的

* 主进程 中间过渡
* MessagePort
* MessagePort并不是Electron提供的能力,而不是基于MDN的Web标准API 这意味着它可以在 渲染进程直接创建。同时Electron提供了 node.js侧的实现,所以它也能在主进程创建。
## 调用原生能力
1. Notification
## 跨平台兼容性措施
1. Electron Native API 的平台差异
2. 操作系统天然的差异性
3. 用户习惯的差异性  macos windows  窗口  操作  快捷键
4. 文件路径的差异  path.join
5. 托盘图标的差异   图片格式和打包 
6. 应用程序上的差异 macos 未签名的应用会面临一些安全提示会限制。
7. 申请管理员权限  https://github.com/codebytere/node-mac-permissions
## 菜单和托盘