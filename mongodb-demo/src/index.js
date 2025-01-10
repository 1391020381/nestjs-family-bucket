const { MongoClient, ServerApiVersion } = require("mongodb");

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
