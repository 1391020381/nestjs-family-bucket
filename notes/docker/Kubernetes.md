- [k8s_study](https://github.com/chronolaw/k8s_study)

* ConfigMap 和 Pod 在同一个配置文件中这个 mariadb-pod.yml 文件包含了两个独立的 Kubernetes 资源，使用 --- 分隔符分隔

* https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/

外部用户 -> Ingress (七层路由) ────► Service (四层负载均衡) -> Deployment/DaemonSet (管理 Pod) -> Pods (实际工作负载)

Deloyment -> IngressClass -> Ingress -> Service -> Pod

宿主机 -> 访问最终的服务端口 端口暴露

- 静态存储
- 动态存储

* 资源配额 Resources -> Pod resources
* 检查探针 Probe

  - Startup
  - Liveness
  - Readiness

* 创建容器有三大隔离技术

  - namespace 实现了独立的进程空间
  - cgroup 实现了独立的文件系统
  - chroot 管控CPU 内存 保证容器不会无节制地占用基础资源,进而影响到系统里的其他应用

* 命名空间
* 系统监控

# 常见的Service类型及公网获取方式

Service 类型 公网 IP 来源 适用场景
LoadBalancer 云厂商自动分配（如 AWS ELB、阿里云 SLB、GCP LB） 云环境（推荐）
NodePort 使用任意节点的 IP + 高端口（如 30080） 本地/测试/裸金属
ClusterIP ❌ 无公网，仅集群内访问 不可用于 Ingress 对外暴露
