# 从 html 到安装包有几步
1. 下载二进制文件
    - info.plist
    - Frameworks
    - Resources

2. 添加业务代码
- Resources
    - app
        - package.json
        - index.html
        - main.js
3. 修改文件信息
    - Electron.app -> 大象.app
    - Info.plist修改信息
    - 设置图标

4. 制作镜像
    - dmg-builder
    - nsis   

# electron-builder
- 签名
- 安装包类型
- 原生模块编译
- 定义化
- 上手成本
- 跨平台
- 社区
- 场景 打包和发布的完整解决方案基本使用所有场景 

# 打包准备
- 证书
    - mac 开发者证书 99$
    - windows 赛门铁克 WoSign
- 对应系统的机器  Mac  Windows Linux
- 软件所需图片   
    - Mac
        - 软件图标 icns格式 通过 image2icon 或者 iconutil生成
        - dmg背景图
        - 安装包图标
    - Windows
        - ico
        - installerIcon
        - unInstallerIcon
            