# 打包完毕后的dist中的哪些文件需要给后端 运维上线
1. .exe  .dmg 软件可执行文件
2. latest-mac.yml  项目版本号
3. electron-app-1.0.0-arm64-mac 项目压缩包
4. builder-effective-config   项目后期更新的下载地址

# 不同操作系统关于自动更新的问题
1. windows 没有更新限制
2. mac os  有限制 如果mac os 要自动更新 必须把软件上架到商店才可以。

# 软件自动更新的操作流程
* 在项目根目录添加 dev-app-update.yml 
```
// 内容

provider: generic
url: https://example.com/auto-updates
updaterCacheDirName: electron-learning-updater

```
1. loading  
2. 本地版本  package.json  version
3. 软件更新的api
    - 下载软件自动更新的 api包 npm i electron-updater
    - import { autoUpdater } from 'electron-updater

```
import { autoUpdater } from "electron-updater";
import { is } from  "@electron-toolkit/utils"
export default class AppUpdater {
    constructor(){
        console.log('constructor);
    
        if(is.dev){
            Object.defineProperty(app,'isPackaged',{
                get(){
                    return true;
                }
            })
        }
        // 当开始检查更新的时候触发
        autoUpdater.on('checking-for-updae',()=>{ // 需要有打包后资源 才可以
            console.log('当开始检查更新的时候触发)
        })

        autoUpdater.on("update-not-available",()=>{
            // 没有课更新
        })
        // 更新完毕
        autoUpdater.on("update-downloaded",()=>{

        })

        // 询问服务器是否更新 
        autoUpdater.checkForUpdates() // 开发
        
        autoUpdater.checkForUpdatesAndNotify() // 生产
    }
}

```
* 在Electron中，checkForUpdates和checkForUpdatesAndNotify这两个方法主要用于控制应用的更新行为。
checkForUpdates：此方法用于检查应用是否有新的可用更新。当此方法调用时，Electron将在后台检查更新而不会出现任何用户界面。如果调用这个方法后有可用的更新，那么将会触发update-available的事件，你可以通过监听这个事件来实现自己的逻辑，例如弹出自定义的更新通知。
checkForUpdatesAndNotify：此方法在检查应用的更新后，如果有可用的更新，将会在用户的系统通知区域显示一个通知。点击这个通知将会打开应用的ReleaseNotes页面，或者下载更新（取决于你的配置）。如果没有新的更新，这个方法不会有任何反馈。
在决定使用那个方法时，主要考虑你希望用户是如何接受有关更新的信息。如果你想在应用内部全部控制更新流程，并利用自定义的UI来通知用户，那么你应该使用checkForUpdates。如果你希望使用一个更简单的方式，让Electron自动在有更新时弹出系统通知，那么你就应该使用checkForUpdatesAndNotify。