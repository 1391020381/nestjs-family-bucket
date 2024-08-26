const yaml = require("js-yaml");
const fs = require("fs");

const config = fs.readFileSync("./hello.yaml");
// 以对象的形式输出了。
console.log(yaml.load(config));
