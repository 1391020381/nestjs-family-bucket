* [自动导入模块 webpack--require.context、vite--import.meta.glob](https://blog.csdn.net/guorui999/article/details/128814178)
# webpack-- require.context

* 通过 require.context() 函数来创建自己的context。
* 可以给这个函数 传入 三个参数 
    - 一个要搜索的目录 
    - 一个标记表示是否还搜索其子目录
    - 以及一个匹配文件的正则表达式。
 * webpack 会在构建中解析代码中 reuqire.context()
 
 ```
require.context(
    directory,
    (useSubdirectories = true),
    (regExp= /^\.\/.*$/))

// context 函数会返回一个导入函数 importFn
// 它有一个属性 keys() 获取所有的文件路径。
const importFn = require.context('./',false,/\.vue$/)
importFn.keys().forEach(item=>{
    // 注意 这里需要 .default 才可以找到 路径 
    const com = importFn(item).default
    app.component(com.name,com)
})

 ```   


 # vite -- import.meta.glob
 * import.meta.glob都支持以字符串形式导入文件,类似于 以字符串形式导入资源。
 
 ```
const modules = import.meta.glob('./dir/*.js',{as:'raw'})

// code  produced by vite 代码由 vite输出

const modules = {
    './dir/foo.js':"export default 'foo'\n",
    './dir/bar.js':"export default 'bar'\n"
}

// 使用 
Object.keys(modules).forEach(url=>{
    const module = modules[url].default
    const name = url.split('/').pop().replace(/\.js|.ts/,'')
})

 ```