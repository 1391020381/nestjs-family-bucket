* Nuxt2 以 express作为服务端框架，架构满足以下要求
1. 页面asyncData方法错误后，在页面客户端降级重新请求
2. 添加express中间件，提供api聚合层
3. express 捕获错误 区分页面渲染错误与 api聚合层错误  // 将 聚合层作为一个 /api级别路由  并自定义错误类型 添加错误捕获 
4. 部分页面需登录后才能进入
5. 添加 winston日志模块
6. Sentry @nuxtjs/sentry
7. Nuxt qps  cdn
```
// expess 
var express = require('express')
var { Nuxt, Builder } = require('nuxt')
var app = express()

// 导入和设置 Nuxt.js 配置
var config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// 初始化 Nuxt.js
var nuxt = new Nuxt(config)

// 动态编译到内存的开发配置
if (config.dev) {
  new Builder(nuxt).build()
}

// 挂载 nuxt-render 中间件
app.use(nuxt.render)

// 监听函数
app.listen(3000)
console.log('Server is listening on http://localhost:3000')




// 1. asyncData 业务渲染降级渲染
export default {
  async asyncData({ params }) {
    try {
      const { data } = await axios.get(`https://my-api/posts/${params.id}`)
      return { title: data.title, dataLoadError: false }
    } catch (error) {
      return { dataLoadError: true }
    }
  },
   async mounted() {
    if (this.dataLoadError) {
      try {
        const { data } = await axios.get(`https://my-api/posts/${this.$route.params.id}`)
        this.title = data.title
        this.dataLoadError = false
      } catch (error) {
        // 处理错误，例如显示错误通知
      }
    }
  },
}


// 定义错误类型 
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
// 在具体业务处抛出

2. express 添加 API聚合层
// router
const express = require('express');
const router = express.Router();

// 定义一个GET API。当用户访问/api/test时，他们会收到一个欢迎消息
router.get('/test', function(req, res) {
  res.json({ message: 'Welcome to our API!' });
});
// 错误处理中间件
const errorHandler = (err,req,res,next)=>{
    console.log(err.stack);
    res.status(err.status).send(err.message)
}
router.use(errorHandler) // 在 API路由使用错误处理中间件
// 你可以根据需要继续添加其他路由

// 最后，导出这个路由。
module.exports = router;    

// app.js

const express = require('express');
const apiRoutes = require('./routes/api'); // 确保路径是正确的


const app = express();


app.use('/api', apiRoutes);  // 所有'/api'的请求都会路由到 apiRoutes

4. 控制需要登录才能进入的页面
利用Nuxt的中间件功能确保用户在访问特定页面之前已经登录了。
// 中间件
export default function({req,redirect}){
    if(!req.session.user){
        return redirect("/login")
    }
} 
// 页面 
 export default{
    middleware:'auth'
 }

// 日志

const winston = require('winston');
require('winston-daily-rotate-file'); // 提供每日日志文件旋转功能的插件。

const env = process.env.NODE_ENV || 'development';

// 日志级别配置
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4
}

const transports = [];
if (env === 'development') {
    // 在开发环境中，将日志输出到控制台
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
    );
} else {
    transports.push(
        // 在生产环境中，只记录错误日志，并把它们记录到一个每日轮换文件中
        new winston.transports.DailyRotateFile({
            filename: 'logs/error.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error'
        }),
        // 记录所有的重要日志信息
        new winston.transports.DailyRotateFile({
            filename: 'logs/all.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        })
    )
}

const logger = winston.createLogger({
    levels,
    level: env === 'development' ? 'debug' : 'info',
    format:winston.format.json(),
    transports,
});

module.exports = logger;


const logger = require('./logger');

// 使用方法
logger.info('This is an information message');
logger.error('This is an error message');



7. qps 
   sudo apt-get install apache2-utils  # Ubuntu
   brew install homebrew/apache/ab     # MacOS

   ab -n 1000 -c 100 http://localhost:3000/
-n 表示总请求
-c 表示并发数
最后 AB会产生一份报告 其中包括总计请求 每秒事务(QPS)和 每次请求的平均处理时间等信息。
```
# Nuxt项目 docker 打包发布

```

# 阶段 1: 构建阶段
FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

# 使用 npm ci 来安装依赖
RUN npm ci

COPY . .

RUN npm run build

# 阶段 2: 运行阶段
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/.nuxt .nuxt
COPY --from=builder /app/static static
COPY --from=builder /app/nuxt.config.js .

EXPOSE 3000

<!-- CMD [ "npx", "pm2-runtime", "--no-logs", "start", "npm", "--", "start" ] -->




CMD [ "npx", "pm2-runtime", "start", "ecosystem.config.js" ]



module.exports = {
  apps : [{
    name: "my-app",
    script: "npm",
    args: "start",
    instances: "max",
    exec_mode: "cluster",
    out_file: "/dev/null",
    error_file: "/dev/null"
  }]
}

```

# 组件使用到 浏览器api 怎么封装统一组件
1. process.client  process.server
2. plugins: [
  { src: '~/plugins/your-plugin-name', mode: 'client' } // 仅在浏览器端使用
]
3. <no-ssr>  Nuxt2.9.0 弃用
4. plugins: [
  { src: '~/plugins/vue-carousel', ssr: false },
]
5. client-only

Electron优化

多个显示屏
启动突然挂掉
兼容网络