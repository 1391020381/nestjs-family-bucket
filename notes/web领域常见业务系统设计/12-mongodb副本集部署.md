# mongodb副本集部署

- 针对三台机器 (192.168.1.101 192.168.1.102 192.168.1.103) 部署MongoDB副本集及Node服务连接的具体步骤

以下是针对三台机器（192.168.1.101、192.168.1.102、192.168.1.103）部署MongoDB副本集及Node服务连接的具体步骤：

---

### **一、MongoDB副本集部署**

#### **1. 环境准备**

• **系统要求**：确保所有机器（Debian/CentOS/Ubuntu）已安装MongoDB 3.2+，并开放27017端口。
• **目录创建**：每台机器创建数据、日志和配置目录：

```bash
mkdir -p /opt/mongodb/{data,logs,conf}
chown -R mongodb:mongodb /opt/mongodb  # 权限设置
```

#### **2. 配置文件设置**

每台机器的`/etc/mongod.conf`配置如下：

```yaml
# 通用配置
net:
  port: 27017
  bindIp: 0.0.0.0 # 允许所有IP访问
storage:
  dbPath: /opt/mongodb/data
systemLog:
  destination: file
  path: /opt/mongodb/logs/mongod.log
  logAppend: true
replication:
  replSetName: rs0 # 副本集名称需一致
processManagement:
  fork: true
```

#### **3. 启动MongoDB服务**

在三台机器上分别执行：

```bash
mongod --config /etc/mongod.conf --fork
```

验证服务状态：

```bash
netstat -nlutp | grep 27017  # 确认端口监听
```

#### **4. 初始化副本集**

在任意一台机器（如192.168.1.101）连接Mongo Shell：

```bash
mongo --host 192.168.1.101
```

执行初始化命令：

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "192.168.1.101:27017" },
    { _id: 1, host: "192.168.1.102:27017" },
    { _id: 2, host: "192.168.1.103:27017" },
  ],
});
```

验证状态：

```javascript
rs.status()  # 检查所有节点状态是否为PRIMARY/SECONDARY
```

#### **5. 高级配置（可选）**

• **仲裁节点**：若需节省资源，可将第三台设为仲裁节点：

```javascript
{ _id: 2, host: "192.168.1.103:27017", arbiterOnly: true }
```

• **优先级调整**：通过`priority`参数控制选举权重：

```javascript
{ _id: 0, host: "192.168.1.101:27017", priority: 2 }
```

---

### **二、Node服务连接MongoDB**

#### **1. 安装驱动**

使用`mongodb`或`mongoose`包：

```bash
npm install mongodb  # 或 mongoose
```

#### **2. 连接字符串配置**

在Node.js代码中配置副本集连接：

```javascript
const { MongoClient } = require("mongodb");
const uri =
  "mongodb://192.168.1.101:27017,192.168.1.102:27017,192.168.1.103:27017/mydb?replicaSet=rs0&readPreference=secondaryPreferred";
```

或使用Mongoose：

```javascript
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

#### **3. 关键参数说明**

• **`replicaSet=rs0`**：声明副本集名称，驱动自动发现主节点。
• **`readPreference=secondaryPreferred`**：读操作优先从节点，减轻主节点压力。
• **`w=majority`**：写入需确认到多数节点，防止数据丢失。

#### **4. 错误处理与重试**

启用自动重连和心跳检测：

```javascript
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000, // 超时时间
  heartbeatFrequencyMS: 30000, // 心跳检测间隔
});
client.connect((err) => {
  if (err) console.error("连接失败:", err);
});
```

---

### **三、验证与监控**

1. **数据同步测试**：
   • 在主节点插入数据：

   ```javascript
   db.collection.insertOne({ test: "data" });
   ```

   • 在从节点执行`rs.slaveOk()`后查询验证同步。

2. **故障转移测试**：
   • 手动关闭主节点服务，观察副本集自动选举新主节点（约10-30秒）。

3. **监控工具**：
   • 使用`mongostat`或第三方工具（如Prometheus）监控副本集状态和Oplog延迟。

---

### **四、常见问题**

1. **连接超时**：
   • 检查防火墙规则和`bindIp`配置是否为`0.0.0.0`。
   • 确保Node服务与MongoDB节点网络互通。

2. **认证失败**：
   • 若启用鉴权，需在连接字符串中添加用户名密码：

   ```plaintext
   mongodb://user:password@host1,host2,host3/db?authSource=admin
   ```

3. **版本兼容性**：
   • 使用旧版驱动（如MongoDB 2.x）时需修改源码适配SSL证书。

---

通过以上步骤，可实现三台机器的MongoDB副本集部署，并通过Node服务安全连接。如需扩展，可升级为分片集群。
