* #!/usr/bin/env node

* 若是有使用过Linux或者Unix的前端开发者,对于 Shebang 应该不陌生,它是一个符号的名称, #! 。 这个符号通常在Unix系统的基本中第一行开头出现,用于指明这个脚本文件的解释程序。所以增加这一行是为了指定用node执行脚本文件。
* /usr/bin/env 就是告诉系统可以在 PATH目录中查找。 所以配置 #！/usr/bin/env node 就是解决了不同的用户node路径不同的问题,可以让系统动态的去查找node来执行你的脚本文件。


# npm link 
npm link 是一个非常有用的npm命令，它允许开发者在本地开发和测试模块时，创建一个符号链接。它主要用于下面这些场景：
本地模块开发: 当你在本地开发一个npm模块，并且想在你本地的另一个项目中测试它而不发布到npm仓库时，你可以使用npm link来创建一个指向你正在开发模块的符号链接。
全局模块: 如果你开发了一个工具或CLI，并且想在你的系统中的任何地方都能调用它，你可以使用npm link来全局安装这个模块。
执行npm link的步骤大概是这样的：
在本地模块的目录下运行npm link，npm会为这个模块创建一个全局的符号链接。
在要使用该模块的项目目录下运行npm link [模块名]，npm会在这个项目的node_modules目录下创建一个到全局符号链接的链接。
上述流程允许你在多个项目之间共享并实时测试该模块的改动，无需进行多次发布。当模块开发完成后，再通过npm publish将其发布至npm仓库，然后可以取消链接。

# 常用模块

* chalk 可以在终端显示颜色
* commander 提供了命令行输入和参数解析,简化命令行开发
* inquirer 交互式命令行工具 用来收集用户填入表单
* ora 终端加载动画效果,增加趣味性
* shelljs 通过在代码中编写shell命令实现功能
* puppetter主要用来启动无头浏览器生成网站缩略图
* downlaod-git-repo 用来下载远程模版
* figlet 在命令行环境中生成大型文字的工具 它使用标准字体文件定义的字符模式来创建大型的ASCII艺术文字。这些文字通常用于命令行界面的横幅、程序的欢迎消息或者是在输出中突出显示某些信息。


1. create 模版 组件
2. publish 模版 组件
    - 生成开发好的模版的缩略图
    - 将我们的coco.config.js文件提交到server端  这样我们编辑后台就可以通过query来查询获取模版消息
    - upVersion
    -   // 通过 pupeteer 创建缩略图
    snapshot = await createSnapshot({ webDomian, nameSpace, context });
3. coco init 初始化配置
    - 对一些不是 coco create创建的项目 进行配置文件初始化工作