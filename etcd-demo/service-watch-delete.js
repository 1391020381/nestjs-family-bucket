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
  deleteConfig(`/services/${serviceName}/instance_2`);
})();
