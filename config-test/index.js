// require('dotenv').config({
//     // path:"./.env"
//     path: process.env.NODE_ENVIRONMENT === 'pro' ? '.pro.env' : '.env',
// })
// console.log(process.env)
// console.log('aaa:',process.env.aaa)
// console.log('bbb:',process.env.bbb)

const yaml = require('js-yaml');
const fs = require('fs')
const config = fs.readFileSync("./hello.yaml")

console.log(yaml.load(config),typeof yaml.load(config))