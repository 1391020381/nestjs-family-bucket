# express + express-ws

- http错误 通过Express 中间件 next(error) 统一处理
- WebSocket错误 在连接 消息事件及 error 监听器中手动处理

- 全局兜底 处理未捕获的异常和Promise拒绝 避免进程崩溃。

在使用 Express 和 express-ws 同时提供 HTTP 和 WebSocket 接口时，错误处理需要针对不同协议分别处理。以下是分步解决方案：

---

**HTTP 接口的错误捕获**
使用 Express 中间件机制统一处理：

1. 定义错误处理中间件  
   在所有路由之后添加错误处理中间件，接收四个参数：

   ```javascript
   app.use((err, req, res, next) => {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
   });
   ```

2. 在路由中触发错误处理  
   通过 `next(err)` 传递错误：
   ```javascript
   app.get("/api", async (req, res, next) => {
     try {
       // 业务逻辑
     } catch (err) {
       next(err); // 传递给错误中间件
     }
   });
   ```

---

**WebSocket 接口的错误捕获**
由于 WebSocket 的生命周期独立于 HTTP 请求，需在连接和消息事件中手动捕获：

1. 在 WebSocket 路由中处理同步错误  
   使用 `try/catch` 包裹逻辑：

   ```javascript
   app.ws("/ws", (ws, req) => {
     try {
       // 连接初始化逻辑
     } catch (err) {
       ws.send(JSON.stringify({ error: err.message }));
       ws.close(); // 可选：关闭异常连接
     }
   });
   ```

2. 处理消息事件的异步错误  
   在消息监听器中捕获错误：

   ```javascript
   app.ws("/ws", (ws, req) => {
     ws.on("message", async (message) => {
       try {
         // 处理消息（如异步操作）
       } catch (err) {
         ws.send(JSON.stringify({ error: "处理消息时出错" }));
       }
     });
   });
   ```

3. 监听 WebSocket 的 `error` 事件  
   捕获底层连接错误：

   ```javascript
   app.ws("/ws", (ws, req) => {
     ws.on("error", (err) => {
       console.error("WebSocket 错误:", err);
     });
   });
   ```

4. 封装高阶函数统一处理（可选）  
   创建通用错误处理包装器：

   ```javascript
   function wsErrorHandler(handler) {
     return (ws, req) => {
       try {
         const result = handler(ws, req);
         if (result?.catch) {
           result.catch((err) => {
             ws.send(`错误: ${err.message}`);
             ws.close();
           });
         }
       } catch (err) {
         ws.send(`错误: ${err.message}`);
         ws.close();
       }
     };
   }

   // 使用
   app.ws(
     "/ws",
     wsErrorHandler(async (ws, req) => {
       // 业务逻辑
     })
   );
   ```

---

**全局未捕获异常处理**
作为兜底方案，捕获进程级异常：

```javascript
process.on("uncaughtException", (err) => {
  console.error("未捕获异常:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("未处理的 Promise 拒绝:", err);
});
```

---

**总结**
• HTTP 错误：通过 Express 中间件和 `next(err)` 统一处理。

• WebSocket 错误：在连接、消息事件及 `error` 监听器中手动处理，或封装高阶函数统一捕获。

• 全局兜底：处理未捕获的异常和 Promise 拒绝，避免进程崩溃。
