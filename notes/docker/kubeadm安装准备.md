# 安装前准备

1. hostname必须唯一
2. /etc/docker/daemon.json 配置调整 把 cgroup 的驱动程序改成 systemd
3. iptables配置 启用 br_netfilter 让 Kubernetes 能够检查、转发网络流量
4. 修改 /etc/fstab 关闭 Linux的 swap分区 提升 Kubernetes的性能

# 安装kubeadm

- 在 Master Worker节点 都要做这一步
- 更新源
- 安装 sudo apt install -y kubeadm=1.23.3-00 kubelet=1.23.3-00 kubectl=1.23.3-00
- 锁定版本 sudo apt-mark hold kubeadm kubelet kubectl

# 下载 Kubernetes 组件镜像

# 安装Master节点

- kubeadm init

## 安装 Flannel网络插件

# 安装Worker节点

- sudo kubeadm join --token
- 连接Master节点 然后拉取镜像 安装网络插件 最后把节点加入集群
- kubectl get node

# 日常使用

- 管理员: 使用kubectl与集群交互
- kubelet 在后台持续工作，确保容器按规范运行 作为系统服务开始运行
- kubeadm 仅在集群维护(升级 添加节点)时使用

* 版本兼容
* 系统(Ubuntu) -> docker
* 系统(Ubuntu) -> Kubernetes
