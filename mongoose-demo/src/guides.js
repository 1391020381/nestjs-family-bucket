const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  commnets: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
const Blog = mongoose.model("Blog", blogSchema);
const uri =
  "mongodb+srv://1391020381:171226q2@cluster0.w0jlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function main() {
  await mongoose.connect(uri);
  console.log("mongoose init");
}

main();
