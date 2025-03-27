# sass系统源码安全性

1. 代码编译混淆 webpack

2. docker 多阶段构建 生产环境使用 webpack打包后的dist

3. 配置文件挂载

```
docker run -d \
  -v /host/config/prod.json:/app/config/prod.json \
  my-express-app

```

4. 打包后日志 通过sourcemap 还原 报错具体位置 source-map-visualization

```
// 获取错误堆栈信息

// 从日志系统（如 ELK、Sentry）中复制混淆后的错误堆栈：
Error: Cannot read property 'name' of undefined
    at a.t (bundle-3a2b1c.js:1:2345)
    at bundle-3a2b1c.js:2:3456

//  下载 sourcemap


// 使用工具转换错误堆栈

npx source-map-decoder bundle-3a2b1c.js.map 1:2345  #  解析行号

-> 原始位置  src/utils/auth.js:58:12

```

- pkg -> 二进制产物
