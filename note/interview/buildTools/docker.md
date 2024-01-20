- docker把系统的所有文件封装成一个镜像,镜像跑起来作为容器,它可以在一台机器上跑多个容器,每个容器都有独立的操作系统,比如 文件操作系统 网络端口 在容器内跑各种服务。

* service client
* Containers
* Images
* Volumes
* Ports
* Environment variables
* docker pull
* docker run
* -p 端口映射
* -v 指定数据卷挂载目录
* -e 指定环境变量
* -d 后台运行
* docker build -t aaa:ccc aaa镜像名 ccc镜像的标签
* .dockerignore

# 制作Dockerfile

```
FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]


```

- FROM 基于一个镜像来修改
- WORKDIR 指定当前工作目录
- COPY 把容器外的内容复制到容器内
- EXPOSE 声明当前容器要访问的网络端口
- RUN 在容器内部执行命令
- CMD 容器启动的时候执行的命令。

# Nest项目Dockerfile

- docker build时 会先解析 .dockerignore 把该忽略的文件忽略掉,然后把剩余文件打包发送给 docker daemon 作为上下文来构建产生镜像。

* 是的，当前目录指的是执行 `docker build` 命令的位置。在执行 `docker build` 命令时，需要在 Dockerfile 所在的目录下执行，这样 Docker 才能正确地找到 Dockerfile 文件并执行其中的指令。因此，如果在执行 `docker build` 命令时，当前目录不是 Dockerfile 所在的目录，那么需要使用 `-f` 参数指定 Dockerfile 文件的路径。例如：

```
docker build -t myapp -f /path/to/Dockerfile .
```

其中，`-f` 参数指定 Dockerfile 文件的路径，`.` 表示 Dockerfile 所在的目录。

```
# build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]


```

# package.json 先 copy 其他文件后复制

- 这是因为在构建 Docker 镜像时，如果应用程序的依赖没有发生变化，那么只需要重新安装依赖即可，不需要重新复制所有的文件。这样可以利用 Docker 的构建缓存机制，加快构建速度。

* 因此，先将 `package.json` 复制到容器中，运行 `npm install` 安装依赖，再将其他文件复制到容器中，可以最大程度地利用缓存，提高构建效率。

# 多端构建

- as

* linux alpine 发行版本 主打 体积小

* 一般情况下，我们都会用多阶段构建 + alpine 基础镜像。 及缓存机制

# 5个技巧

1. 使用 alpine 镜像 而不是默认的linux镜像
2. 使用多段构建 as copy from 缓存机制
3. 使用 ARG增加构建灵活性
   - 使用 ARG声明构建参数 使用 ${xxx}来取
   - 然后使用 ENV声明环境变量 dockerfile内换行使用 \
4. CMD结合 ENTRYPOINT
   - 重点使用CMD的时候，启动命令是可以重写的。
5. COPY 与 ADD
   - ADD 还可以解压tar.gz文件
   - 一般情况下 COPY居多
