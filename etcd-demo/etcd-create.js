const { Etcd3 } = require("etcd3");

const client = new Etcd3();
(async () => {
  const serivces = await client.get("/services/a").string();
  console.log("service A:", serivces);

  const result = await client.put("/services/a").value("bar");
  console.log("result:", result);
})();
