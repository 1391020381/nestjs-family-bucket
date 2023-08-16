- Nginx 是流行的服务器 一般用它对静态资源做托管 对动态资源做反向代理。

# Linux 或 Unix 系统中,不同目录有不同作用

在 Linux 或 Unix 系统中，不同目录有不同的作用，下面是一些常见的目录及其作用：

1. /：根目录，包含整个文件系统的所有文件和目录。

2. /bin：存放系统必需的基本命令，如 ls、cp、mv 等。

3. /boot：存放启动 Linux 系统所需的文件，如内核、引导程序等。

4. /dev：存放设备文件，如硬盘、光驱、USB 设备等。

5. /etc：存放系统配置文件，如网络配置、用户账户信息、服务配置等。

6. /home：存放用户的个人文件和目录，每个用户都有一个以其用户名命名的子目录。

7. /lib：存放系统共享库文件，如 libc.so 等。

8. /media：存放可移动设备挂载点，如 U 盘、光盘等。

9. /mnt：存放临时挂载的文件系统，如网络共享文件夹等。

10. /opt：存放第三方软件的安装目录。

11. /proc：虚拟文件系统，存放系统运行时的进程信息、硬件信息等。

12. /root：超级用户 root 的家目录。

13. /sbin：存放系统管理命令，如 shutdown、reboot 等。

14. /tmp：存放临时文件，系统重启后会被清空。

15. /usr：存放用户程序、库文件、文档、头文件等。

16. /var：存放系统运行时的日志、缓存、邮件等。
17. /usr/share 目录是一个包含共享数据的目录,它存储了许多系统必需的文件和资源。
    总之，在 Linux 或 Unix 系统中，不同目录有着不同的作用，了解这些目录的作用可以更好地管理和维护系统。

- docker cp 这个命令就是用于在宿主机和容器之间复制文件和目录的。

* 一台 nginx 服务器来为多个域名和端口提供服务。只要多加几个 server 配置就可以。
* 挂载数据卷 docker cp nginx:/etc/nginx ~/Volumes/nginx
* conf.d 是 configuration directory 的意思

# 一个基本的 Nginx 服务器的 'nginx.conf'配置文件应该包含以下内容

1.  指定 Nginx 进程运行的用户和用户组
    - user nginx
2.  指定 Nginx 进程的数量
    - worker_processes
3.  指定错误日志的路径和级别
    - error_log /var/log/nginx/error.log error;
4.  指定 Nginx 进程 ID 文件的路径
    - pid /var/run/nginx.pid
5.  指定 Nginx 的事件模型
    - events {
      worker_connections 1024;
      multi_accept on;
      }
6.  配置 HTTP 相关配置

```
http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    gzip on;
    include /etc/nginx/conf.d/*.conf;
}

```

- location 和路径之间加了个 = 代表精准匹配 也就是只有完全相同的 url 才会匹配这个路由 location = /aaa

* 不带 = 代表根据前缀匹配 后面可以是任意路径 location /bbb
* $uri 是取当前路径
* 如果想支持正则 就可以加个 ～ location ~ /ccc.\*.html
* 如果想让正则不区分大小写 可以再加个 ～\*
* 如果想提高优先级 可以使用 ^~ location ^~ /ddd

* root 和 alias 的区别就是拼接路径时是否包含匹配条件的路径。

# 动态资源的方向代理

- 从用户的角度看,方向一致的就是正向 反过来就是 反向

* weight ip_hash
