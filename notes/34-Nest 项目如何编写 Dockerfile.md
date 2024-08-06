- dockerfile是在 守护进程 docker daemon build的
- docker build的时候，会把dockerfile和它的构建上下文(也就是所在目录) 打包发送给 docker daemon来构建镜像。

* .dockerignore 声明哪些不需要发送给 docker daemon
