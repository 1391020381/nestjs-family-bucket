# 编译和编译模式

* Vue.js经过编译后产出是JS和CSS代码,也就是浏览器可以直接支持运行的代码。

    - 把 Vue.js代码里的模版编译成基于JS代码描述的VNode
    - 把 Vue.js代码里JS逻辑代码 编译成运行时对应生命周期的逻辑代码
    - 最后是把内置的CSS样式代码抽离出来。


* 直接在浏览器里组装Vue.js的代码结构 动态渲染出想要页面功能。


* h
* vnode
* template

* props emit

* Vue.js的非编译写法可以直接用于低代码的核心解决方案中。

# 构建工具 编译 Vue
* webpack
* rollup
* vite

# JSX语法 vue3响应式  跨组件通讯   

# 项目代码规范
* 强类型语言开发 JS  -> TS
* 代码格式规范
* 代码质量检查

* npm i -D typescript  @vue/tsconfig；

```
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "baseUrl": "."
  }
}
// env.d.ts  /// <reference types="vite/client" />
// src/types.ts



npm i -D eslint eslint-plugin-vue @vue/eslint-config-prettier @vue/eslint-config-typescript

.eslintrc.cjs

/* eslint-env node */

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    // 单引号限制
    quotes: ['error', 'single'],
    // 禁用console
    'no-console': 'error'
  }
};

// npm i -D prettier

.prettierrc.json

{
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "auto",
  "singleQuote": true,
  "semi": true,
  "trailingComma": "none",
  "bracketSpacing": true
}


```
* Vue.volar  
* Vue.vscode-typescript-vue-plugin   Vue3 TS语法辅助VS Code插件
* dbaeumer.vscode-eslint ： ESLint 的 VS Code 插件；
* esbenp.prettier-vscode ：Prettier 的 VS Code 插件；
* rvest.vs-code-prettier-eslint：ESLint 联动 Prettier 的 VS Code 插件；

```
//  声明我们项目需要用到的插件 这样只要用VSCode 打开这个项目,就可以提醒开发者去安装相关插件了。
// .vscode/extensions.json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "rvest.vs-code-prettier-eslint",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
// 主要是声明使用插件的配置和一些编辑器的保存自动格式化代码的配置
// .vscode/settings.json

{
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "prettier.configPath": ".prettierrc.json",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}

// git hook

```

# package.json postinstall
* postinstall 是一个 npm脚本钩子, 它会在npm安装所有的依赖包之后自动执行。
* 在 package.json 文件中 可以使用 postinstall字段来指定需要执行的命令或脚本。


# Vue3 组件库
## 技术要点
-  monorepo 管理组件代码
- Vue.js 3.x 源文件的多种模块格式编译
- 基于Less开发CSS样式文件和独立编译  


* 在业务组件库 子项目这个npm模块依赖里,我们使用了 基础组件库 子项目模块 "@my/components" 其实 npm站点并不需要存在这个模块,后续通过 pnpm 进行 monoreop的管理，实现项目子依赖模块 @my/components 直接指向和引用 packages/components的代码。
* 业务组件库子项目（@my/business）里依赖了基础组件库的子项目（@my/components），通过 pnpm 管理的 monorepo 项目方式，将依赖的 @my/components 子项目通过“软链接”形式指向了真正的 components/* 目录。monorepo 里有“软链接”实现子项目的 npm 模块依赖关系，我们就可以放心拆分不同类型组件库，以及管理不同类型组件库的嵌套依赖关系了。
* 不同类型的组件库里的每个单独组件都有一个索引文件和样式文件作为入口文件进行管理。这样就能保证我们的组件格式都是统一的,而且有一一对应的功能源码文件和样式文件,最后编译结果也能通过对应路径找到对应的组件。
* vite
* vite-node
* root 项目的根目录
* 在一个 Vite项目中 index.html 在项目最外层而不是在 public 文件夹内。 这是有意为之的。
* 在开发期间Vite是一个服务器 而 index.html 是该 Vite项目的入口文件。

## 组件打包
### 打包 js
* rollup
* unplugin-vue-macros/rollup 是 一个 Rollup插件,它允许你在Vue项目中使用宏(Macros)。宏是一种在编译时扩展Vue模版的方法,可以让你更灵活地处理模版中的逻辑。
  - 在模版中使用自定义指令 自定义属性 自定义事件 自定义插值
* @rollup/plugin-node-resolve 是一个 Rollup插件 用于解析项目中的Node.js模块。它可以帮助你在构建过程中解析和处理项目中的第三方依赖和本地模块  
* @rollup/plugin-commonjs 用于将CommnJS模块转换为其他格式, 如 ES UMD。

```
{
  "main": "dist/cjs/index.cjs",
  "module": "dist/esm/index.mjs",
  "types": "dist/esm/index.d.ts",
  "exports": {
    ".": {
      "require": "./dist/cjs/index.cjs",
      "import": "./dist/esm/index.mjs",
      "types": "./dist/esm/index.d.ts"
    },
    "./esm/*": {
      "import": "./dist/esm/*/index.mjs",
      "types": "./dist/esm/*/index.d.ts"
    },
    "./cjs/*": {
      "require": "./dist/cjs/*/index.cjs",
      "types": "./dist/cjs/*/index.d.ts"
    },
    "./css/*": "./dist/css/*"
  }
}

```

### 打包  dts代码  ts类型代码  // 细节？
* vue/compiler-sfc
* ts-morph
* vue/compiler-sfc  ts-morph 可以一起使用 以便在处理 Vue.js组件库时自动生成TS类型文件定义。

* ts-morph vue/compiler-sfc 为 Vue3组件库生成类型定义文件



