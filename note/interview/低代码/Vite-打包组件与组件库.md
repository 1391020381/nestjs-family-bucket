
1. vite 每个组件单独打包
```
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// look into "package/*/" for sub-folders
glob("package/*/", (err, folders) => {
  if (err) {
    console.error("An error occurred: ", err);
    return;
  }

  folders.forEach((folder) => {
    const componentName = path.basename(folder);

    // Load the component's package.json to get its version
    const { version } = require(path.join(folder, 'package.json'));

    const viteConfig = `
      import vue from '@vitejs/plugin-vue'
      import path from 'path'

      let entryFile = path.resolve(__dirname, '${componentName}.vue')

      export default {
        plugins: [vue()],
        build: {
          lib: {
            entry: path.resolve(__dirname, '${componentName}.vue'),
            name: '${componentName}',
            fileName: (format) => \`dist/${componentName}-${version}.${format}.js\`
          },
          rollupOptions: {
            output: {
              format: 'umd',
              globals: {
                vue: 'Vue'
              }
            }, 
            external: ['vue']
          }
        }
      }
    `;

    fs.writeFileSync(path.join(folder, 'vite.config.js'), viteConfig);
    execSync('vite build', { cwd: folder, stdio: 'inherit' });
  });
});


```
2. vite 组件打包 全局引入 按需引入

```
// index.js
export { default as Component1 } from './components/Component1.vue';
export { default as Component2 } from './components/Component2.vue';


// vite.config.js
export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.js'), // 总入口
        component1: path.resolve(__dirname, 'components/Component1.vue'), // Component1 的入口
        component2: path.resolve(__dirname, 'components/Component2.vue'), // Component2 的入口
        // ...
      }
    }
  }
}


// 全局引入
import * as YourLibrary from 'your-library';
// 按需引入
import { Component1, Component2 } from 'your-library';
```