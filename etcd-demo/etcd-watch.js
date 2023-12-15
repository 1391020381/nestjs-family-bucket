const { Etcd3 } = require("etcd3");

const client = new Etcd3();
(async () => {
  const serivces = await client.get("/services/a").string();
  console.log("service A:", serivces);

  const allServices = await client.getAll().prefix("/services").keys();
  console.log("all services:", allServices);

  const watcher = await client.watch().key("/services/a").create();

  watcher.on("put", (req) => {
    console.log("put", req.value.toString());
  });
  watcher.on("delete", (req) => {
    console.log("delete");
  });
})();
