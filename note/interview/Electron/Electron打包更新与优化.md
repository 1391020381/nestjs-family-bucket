# 打包
## Electron Builder
* Electron Builder针对大多数构建任务重新编写了自己的内部逻辑,提供了丰富的功能，包括代码签名 发布支持 文件配置,多种目标构建等。 Electron Builder不限制使用的框架和打包工具,使得可以更加灵活地进行配置和打包。
1. 应用程序签名
* Electron代码签名是指对Electron应用程序进行数字签名,以验证应用程序的来源和完整性。这是一种安全措施，有助于确保应用程序未被篡改或恶意修改,并且可以追溯可信任的开发者。默认情况下,Windows macOS都会静止未签名的应用的下载或运行。

2. assr

# 应用更新
1. 全量更新
* 手动全量更新核心原理是在启动Electron应用程序的时候获取服务器当前软件最新版本号和本地软件中的package.json版本进行匹配,如果发现落后于服务器版本则进行更新提示,并引导用户进行手动下载安装。
* 实现方式简单 而且稳定。但过程繁琐 软件包大多在 100m左右,更新速度特别慢,而且用户更新意愿也不是很强烈,更新率低。
```
import { dialog, shell } from 'electron';
import { lt } from 'semver';
import pkg from '../../../package.json';
import { getLatestVersion } from './getLatestVersion';

// 本地版本号，从 package.json 中获取
const version = pkg.version;
const downloadUrl = 'https://xxx/releases/latest';

const checkVersion = async () => {
  // 获取服务器软件的最新版本
  const res = await getLatestVersion();
  if (res !== '') {
    const latest = res;
    // 版本比对，确认是否落后于服务器版本
    const result = compareVersion2Update(version, latest);
    if (result) {
      // 如果落后，则提示更新信息
      dialog
        .showMessageBox({
          type: 'info',
          title: 'Rubick 更新提示',
          buttons: ['Yes', 'No'],
          message: `发现新版本 v${latest}，是否更新？`,
        })
        .then((res) => {
          if (res.response === 0) {
            // 跳转到更新地址，进行手动下载
            shell.openExternal(downloadUrl);
          }
        });
    }
  } else {
    return false;
  }
};

// if true -> update else return false
const compareVersion2Update = (current, latest) => {
  try {
    if (latest.includes('beta')) {
      return false;
    }
    return lt(current, latest);
  } catch (e) {
    return false;
  }
};


```
2. 文件覆盖式更新
3. 自动更新

# 应用性能优化
##  启动速度优化
1. 资源加载优化
    - 减少应用依赖项
    - 使用更加轻量的库  
    - 延后加载依赖项。
2. 提升代码加载速度
    - 打包压缩代码  Electron依赖的一般都是最新的Chromium  使用最新特性不用 babel pollyfill
    - 手动添加tree shaking  如果你确认代码无副作用，可以通过 /*#__PURE__*/ 来标记文件无副作用等方法来解决。
    - 减少ipcRender.sendSync调用
    - 使用 requestIdleCallback
    - 减轻主进程负载
    - 
## 窗口创建优化
- 窗口预热
- 窗口预热和前端页面的预渲染有点类似，简单来说就是将用户即将用到的窗口提前进行隐藏加载，等到用户需要的时候直接显示，给用户的体感是秒开，但其实是我们已经预热加载了。
## 预渲染

# 应用安全性能指南
* IPC可用于在主进程和渲染进程之间通信,而preload脚本可以拓展渲染进程的功能,提供必要的操权限,这种责任分离使我们能够应用最小权限原则。
* contextIsolation: false

# 对接WPS文档的在线预览编辑服务
* [对接WPS文档的在线预览编辑服务](https://www.jianshu.com/p/48711ed1097e)