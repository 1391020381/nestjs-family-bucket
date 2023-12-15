# 微服务

- 微服务架构的系统都会有配置中心和注册中心

## 配置中心

- 集中管理配置信息 每个微服务都从这里拿配置,可以统一的修改,并且配置更改后也会通知各个微服务。

## 注册中心

- 微服务之间会相互依赖,共同完成业务逻辑的处理。 如果某个微服务挂掉了,那所有依赖它的服务都不能工作了。为了避免这种情况,我们会通过集群部署的方式, 每个微服务部署若干节点,并且还可能动态增加一些节点。

* 微服务依赖的 服务 挂掉 或 启动了新服务 该 微服务这么知道

* 微服务在启动的时候,向注册中心注册。
* 微服务销毁的时候向注册中心注销,并且定时发心跳包来回报自己的状态。
* 在查找其他微服务的时候，去注册中心查一下这个服务的所有节点信息,然后再选择一个来用,这个叫做服务发现。
* 这样微服务久可以动态的增删节点而不影响其他微服务了。

# [etcd](https://github.com/microsoft/etcd3#readme)

1. etcdctl put key value
2. etcdctl get key
3. etcdctl del key
4. etcdctl watch key

- 微服务架构的系统中不少配置中心和注册中心。

* 不同服务的配置需要统一管理,并且在更新后通知所有的服务,所以需要配置中心。
* 微服务的节点可能动态的增加或者删除,依赖他的服务在调用前需要知道有哪些实例可用,所以需要注册中心。
* 服务启动的时候注册到注册中心,并定时续租期,调用别的服务的时候,可以查一下有哪些服务实例可用,页就是服务注册 服务发现功能
* 注册中心和配置中心可以用 etcd来做,它就是专门做这件事情的中间件 k8s就是用的它来做的配置和服务注册中心。

# nestjs中使用etcd

1. 自定义 provider

```
//  AppModule
{
    provide:'ETCD_CLIENT',
    useFactory(){
        const client = new Etcd3({
            hosts:"http://localhost:2379",

        })
        return client;
    }
}
//  service注入

@Inject('ETCD_CLIENT')
priviate etcdClient:Etcd3

```

2. EtcdModule

```
import { Module } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3 } from 'etcd3';

@Module({
  providers: [
    EtcdService,
    {
      provide: 'ETCD_CLIENT',
      useFactory() {
        const client = new Etcd3({
            hosts: 'http://localhost:2379',
            auth: {
                username: 'root',
                password: 'guang'
            }
        });
        return client;
      }
    }
  ],
  exports: [
    EtcdService
  ]
})
export class EtcdModule {}



import { Inject, Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {

    @Inject('ETCD_CLIENT')
    private client: Etcd3;

    // 保存配置
    async saveConfig(key, value) {
        await this.client.put(key).value(value);
    }

    // 读取配置
    async getConfig(key) {
        return await this.client.get(key).string();
    }

    // 删除配置
    async deleteConfig(key) {
        await this.client.delete().key(key);
    }

    // 服务注册
    async registerService(serviceName, instanceId, metadata) {
        const key = `/services/${serviceName}/${instanceId}`;
        const lease = this.client.lease(10);
        await lease.put(key).value(JSON.stringify(metadata));
        lease.on('lost', async () => {
            console.log('租约过期，重新注册...');
            await this.registerService(serviceName, instanceId, metadata);
        });
    }

    // 服务发现
    async discoverService(serviceName) {
        const instances = await this.client.getAll().prefix(`/services/${serviceName}`).strings();
        return Object.entries(instances).map(([key, value]) => JSON.parse(value));
    }

    // 监听服务变更
    async watchService(serviceName, callback) {
        const watcher = await this.client.watch().prefix(`/services/${serviceName}`).create();
        watcher.on('put', async event => {
            console.log('新的服务节点添加:', event.key.toString());
            callback(await this.discoverService(serviceName));
        }).on('delete', async event => {
            console.log('服务节点删除:', event.key.toString());
            callback(await this.discoverService(serviceName));
        });
    }

}



```

3. 动态模块

- nestjs 自定义provider 动态module
