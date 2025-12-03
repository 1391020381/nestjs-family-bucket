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
