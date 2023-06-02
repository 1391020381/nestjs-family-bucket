const os = require("os");
const homedir = os.homedir();
console.log("homedir", homedir);
console.log("行云流水justdoit");
// node --inspect-brk index.js
// --inspect 是调试模式运行，而 --inspect-brk 还会在首行断住。
// chrome://inspect/#devices
