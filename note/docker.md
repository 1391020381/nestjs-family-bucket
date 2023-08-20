1. 使用 alpine 镜像 而不是默认的 linux 镜像
2. 使用多阶段构建

- docker 是分层存储的,dockerfile 里的每一行指令是一层,会做缓存 每次 docker build 的时候 只会 从变化的层开始重新构建,没有变的层会直接复用。 也就是 package.json 没变 那么就不会执行 npm install 直接复用之前的。

* 如果一开始就把 所有文件复制进去 那不管 package.json 变没变，任何一个文件变了，都会重新 npm install，这样没法充分利用缓存，性能不好

* FROM 后面添加一个 as 来指定当前构建阶段的名字
* 通过 COPY --from=xxxx 可以从上一个阶段复制文件过来
* 然后 npm install 的时候添加 --production 这样只会安装 dependencies 依赖
* docker build 之后 只会留下最后一个阶段的镜像
* 也就是说 最终构建出来的镜像里是没有源码的,有的是 dist 的文件和运行依赖。

3. 通过 ARG 增加构建灵活性

- docker build --build-arg aaa=3 --build-arg bbb=4 -t arg-test -f 333.Dockerfile .

* ARG 是构建时的参数 ENV 时运行时的参数

4.  CMD 结合 ENTRYPOINT

- 重点是用 CMD 的时候,启动命令是可以重写的

5.  COPY vs ADD

- 区别就是 对于 tar.gz 这种压缩文件的处理

* ADD 把 tar.gz 给解压然后复制到容器内了
* COPY 没有解压 它把文件整个复制过去了

# tar

- tar -zcvf aaa.tar.gz ./aaa

1. tar 是一个在 Linux 中常用的大包工具
2. -z 表示使用 gzip 压缩文件
3. -c 表示创建一个新的归档文件
4. -v 表示在归档过程中显示详细信息
5. -f 表示指定归档文件的名称
6. aaa.tar.gz 表示归档文件的名称
7. ./aaa 表示要大包的文件或目录的路径

- docker run -d -p 3306:3306 -v /User/guang/mysql-data:/var/lib/mysql --name mysql-container mysql

* -e MYSQL_ROOT_PASSWORD=xxx 设置 root 用户名的密码

# docker-compose

# Docker 容器通信的最简单方式桥接网络

1. Docker Compose 中 多个 docke 容器的通信,我们是通过 指定宿主机 ip 和端口的方式。因为 mysql redis 的 Docker 容器都映射到宿主机的端口,那么 nest 的容器就可以通过 宿主机来实现和其他容器通信。

2. 可以创建一个 Network Namespace 然后设置到多个 Docker 容器,这样这些容器就在一个 Namespace 下了,不就可以访问对应端口了 Docker 确实支持这种网络 叫做 桥接网络

- docker network create common-network

* 可以通过容器名称直接访问
* 不过，其实不指定 networks 也可以，docker-compose 会创建个默认的。

* volumes 需要在 mac home /Users/zhoujin/aaa:/data




# docker mysql8 
* docker run --name mysql8 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8