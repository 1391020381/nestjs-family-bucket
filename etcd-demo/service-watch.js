const {
  client,
  saveConfig,
  getConfig,
  deleteConfig,
  registerService,
  discoverService,
  watchService,
} = require("./etcd-utils");

(async function main() {
  const serviceName = "my_service";
  await registerService(serviceName, "instance_1", {
    host: "localhost",
    port: 3000,
  });
  await registerService(serviceName, "instance_2", {
    host: "localhost",
    port: 3002,
  });
  const instances = await discoverService(serviceName);
  console.log("所有服务节点:", instances);

  watchService(serviceName, (updatedInstances) => {
    console.log("服务节点变动:", updatedInstances);
  });
})();
