const mongoose = require("mongoose");
const uri =
  "mongodb+srv://1391020381:171226q2@cluster0.w0jlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const kittySchema = new mongoose.Schema({
  name: String,
});

kittySchema.methods.speak = function speak() {
  const greeting = this.name
    ? "Meow name is" + this.name
    : "I don`t hanve a name";
  console.log(greeting);
};
const Kitten = mongoose.model("Kitten", kittySchema);

const silence = new Kitten({ name: "Slience" });

async function main() {
  await mongoose.connect(uri);
  console.log("mongoose init");
  silence.speak();
}

main();
