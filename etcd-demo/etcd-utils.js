const { Etcd3 } = require("etcd3");

const client = new Etcd3();

// 保存配置
async function saveConfig(key, value) {
  await client.put(key).value(value);
}

// 读取配置

async function getConfig(key) {
  return await client.get(key).string();
}

// 删除配置

async function deleteConfig(key) {
  await client.delete().key(key);
}
// 服务注册
async function registerService(serviceName, instanceId, metadata) {
  const key = `/services/${serviceName}/${instanceId}`;
  const lease = client.lease(10);
  await lease.put(key).value(JSON.stringify(metadata));
  lease.on("lost", async () => {
    console.log("租约过期,重新注册");
    await registerService(serviceName, instanceId, metadata);
  });
}
// 服务发现
async function discoverService(serviceName) {
  const instances = await client
    .getAll()
    .prefix(`/services/${serviceName}`)
    .strings();
  return Object.entries(instances).map(([key, value]) => JSON.parse(value));
}

// 服务监听变更
async function watchService(serviceName, callback) {
  const watcher = await client
    .watch()
    .prefix(`/services/${serviceName}`)
    .create();
  watcher
    .on("put", async (event) => {
      console.log("新增服务节点:", event.key.toString());
      callback(await discoverService(serviceName));
    })
    .on("delete", async (event) => {
      console.log("服务节点删除:", event.key.toString());
      callback(await discoverService(serviceName));
    });
}
module.exports = {
  client,
  saveConfig,
  getConfig,
  deleteConfig,
  registerService,
  discoverService,
  watchService,
};
