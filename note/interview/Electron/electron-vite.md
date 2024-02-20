# electron-vite
## dev-app-update.yml
dev-app-update.yml这个文件是Electron应用程序在开发环境下使用的配置文件，用于指定更新相关的设置。Electron 应用可以集成自动更新功能，这通常通过使用如 electron-updater 这样的第三方库来实现。
这个配置文件主要包含了Electron应用在检查和安装更新时所需的信息。常见的配置项可能包括：
provider: 更新提供者的类型，如 github、s3、spaces 等。
owner: （如果是GitHub）拥有仓库的用户名或组织名。
repo: （如果是GitHub）仓库名称。
private: （可选）表示该仓库是否为私有。
token: （如果是私有仓库）访问私有仓库的GitHub令牌。
url: 根据不同的provider，可能会有服务器的URL。
例如，如果应用程序是从GitHub中提供更新的，dev-app-update.yml 文件可以看起来像这样：
yml
provider: github
owner: 'your-github-username'
repo: 'your-repo-name'
token: 'your-github-token'
这个文件是在开发过程中用于测试应用程序更新流程的。在生产环境中可能会用到一个不同的文件，比如 app-update.yml，因为在开发环境中和生产环境中的更新服务器或机制可能不同。
在使用 electron-builder 构建应用程序时，构建过程会根据这个文件中的信息生成对应的更新模块或脚本。自动更新的行为通常在应用程序的主进程代码中通过引入相应的模块和调用API实现

## electron-builder.yml
electron-builder.yml 是一个配置文件，它为 electron-builder, 这是一个非常流行的Electron应用程序打包工具，提供了构建和打包应用程序所需的所有指令和信息。electron-builder支持多个平台，允许开发者通过一套统一的配置来打包他们的应用程序为macOS、Windows和Linux系统的可执行文件。

在 electron-builder.yml 文件中，开发者可以指定多种构建选项，包括但不限于：
appId: 应用程序的唯一标识符。
productName: 应用程序的名称。
artifactName: 生成的安装文件的名称模板。
files: 包含在安装包中的文件和文件夜。
directories: 指出哪里是源文件夹、输出文件夹等。
extraFiles: 不包含在应用程序源代码中，但需要包含在包内的额外文件或文件夹。
win, mac, linux: 特定于平台的配置，可以为每个目标操作系统指定更详细的构建选项。
publish: 发布配置，告诉 electron-builder 如何发布应用程序的更新。
asar: 是否将应用程序代码打包为ASAR存档，以及具体的配置选项。

例如，一个基本的 electron-builder.yml 文件可能看起来像这样：

```

appId: com.example.yourapp
productName: YourApp
artifactName: `${productName}-setup-${version}.${ext}`
files:
  - dist/
  - node_modules/
extraResources:
  - from: assets/
    to: assets/
win:
  target: NSIS
mac:
  target: dmg
  category: public.app-category.utilities
linux:
  target: AppImage
publish:
  provider: github
  releaseType: draft



```

这个配置文件让开发者能非常灵活地定制打包过程，可以非常详尽地控制输出的包的内容、格式以及更新策略等。通过简单地运行 electron-builder 命令，它会按照这个 electron-builder.yml 文件中定义的设置来打包应用程序。


# electron-vite创建的electron项目，tsconfig.jons的references 区分 web和node是什么作用
* 在使用 electron-vite 创建的 Electron 项目中，tsconfig.json 文件里的 references 区分 web 和 node 主要是为了处理和优化不同目标环境——即Electron的主进程（通常在 Node.js 环境中运行）和渲染器进程（在一个类似于浏览器的 Chromium 环境中运行）。因为这两个环境在全局 API 和模块系统上有差异，他们可能需要不同的 TypeScript 编译配置，以便正确构建和运行。
* 具体而言，Electron 的主进程可以使用Node.js的所有功能，包括文件系统访问、创建子进程等，而渲染器进程则主要负责 UI 交互，类似于运行在浏览器中的 web 应用。由于这种区别，它们需要不同的 TypeScript 类型定义和编译选项：
* 对于主进程（或称“后端”）代码，你可能需要包含 Node.js 类型定义，并可能会启用诸如 node 的模块解析策略。
* 对于渲染器进程（或称“前端”）代码，你可能需要更多地依赖于 DOM 类型定义，就像开发传统的 web 应用那样，并且可能会选择 web 的模块解析策略。
* 使用 references 在 tsconfig.json 中定义这些子项目，可以让 TypeScript 理解项目结构，确保不同部分的代码基于正确的环境被构建。当你运行构建脚本时，TypeScript 编译器会使用这些参考来正确地编译各个部分的代码，并确保类型的兼容性和模块解析的准确性。
* 此外，这种设置还可以提供其他好处，比如：
提升编译性能：通过独立构建主进程和渲染器进程代码，可以有效减少不必要的重编译，提高构建效率。
改善编辑器内的体验：编辑器和IDE可以根据不同进程的环境加载正确的类型定义，提供更准确的自动完成和错误检查。
简而言之，在 electron-vite 创建的 Electron 项目中，使用 references 在 tsconfig.json 里区分 web（渲染器进程）和 node（主进程）是为了保证这两个独有的环境有适当的类型支持和模块解决方案，以及优化构建过程和开发体验。
