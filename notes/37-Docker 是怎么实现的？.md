- pm2 主要功能就是 进程管理 日志管理 负载均衡 性能监控

- npm install -g pm2
- pm2 start ./dist/main.js
- pm2 logs

  - pm2会把所有进程的日志打印出来，通过前面的 "进程id|进程名称" 来区分
  - 它会把日志写到 ~/.pm2/logs下 以 "进程名-out.log"和 "进程名-error.log" 分别保存不同进程的日志
  - pm2 logs 进程名
  - pm2 logs 进程id

- pm2 start xxx --max-menory-restart 200M

- node 提供了 cluster模块 启动多进程 pm2 就是基于这个实现的负载均衡

- pm2 支持配置文件的方式启动多个应用。执行 pm2 ecosystem，会创建一个配置文件
- 万一 docker 容器内 node 服务崩溃了，是不是需要重启？
- docker 容器内的进程同样有日志管理、进程管理和监控的需求。

- 一般都是 docker 镜像内安装 pm2 来跑 node：
