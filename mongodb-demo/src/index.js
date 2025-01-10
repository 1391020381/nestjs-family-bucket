const { MongoClient, ServerApiVersion } = require("mongodb");
// 在 MongoDB Atlas 中，默认提供的连接字符串（如 mongodb+srv://...）已经包含了副本集的所有节点信息
// 并且 Atlas 会自动处理主节点切换和高可用性。你不需要手动指定副本集的每个节点地址
// 因为 mongodb+srv 协议会自动解析 DNS 记录，获取副本集的所有节点信息。
// 连接字符串
const uri =
  "mongodb+srv://1391020381:171226q2@cluster0.w0jlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// 创建 MongoClient 实例
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // 连接到 MongoDB Atlas
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    // 测试连接
    const db = client.db("sample_mflix"); // 替换为你的数据库名称
    const collection = db.collection("movies"); // 替换为你的集合名称

    // 插入一条测试文档
    // const result = await collection.insertOne({ name: "test", value: 123 });
    // console.log("Inserted document:", result.insertedId);

    // 查询文档
    const docs = await collection.find({}).limit(1).toArray();
    console.log("Found documents:", docs);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // 关闭连接
    await client.close();
    console.log("Connection closed.");
  }
}

// 运行代码
run().catch(console.dir);
