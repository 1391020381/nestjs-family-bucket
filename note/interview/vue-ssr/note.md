* server.entry.js
* client.entry.js

* 服务端打包好,html 再与 client.entry.js混合

* 集成路由
* vue-ssr 路由跳转规则

* 集成vuex






# vue-ssr
1. server.js
    - vue-server-render
    - ctx.body = await new Promise((resolve,reject)=>{
        // 方法必须写成回调函数的形式,否则css不生效
        render.renderToString({url:'/'},(err,data)=>{
            console.log(err)
            if(err) reject(err)
            resolve(data)
        })
    })
    - render =  VueServerRender.createBundleRenderer(ServerBundle,{
    template,
    clientManifest // 
})
2. client-entry.js
3. server-entry.js
    - router.onReady()
    - const matchedComponents = router.getMatchedComponents()
    - Component.asyncData
    - then  context.state = store.state resolve(data)

4. webpack.client.js
    - const ClientServerRender = require('vue-server-renderer/client-plugin')
5. webpack.server.js    
    - const ServerRender = require('vue-server-renderer/server-plugin')
    - target:'node',