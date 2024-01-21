# nodejs 如何开启进程 进程如何通讯


## 进程 process   线程 thread
* 进程 os 进行资源分配和调度的最小单位 有独立内存空间
* 线程 os 进行运算调度的最小单位 共享进程内存空间
* js是单线程的 但可以开启多个进程执行  如 WebWorker
## 为何要多进程
* 多核cpu 更合适处理多进程
* 内存较大 多个进程才能更好的利用 (单进程有内存上线)
* 总之 压榨 机器资源 更快 更节省


```
// process.id
// fork
// cluster 

// compute.js

function getSum(){
    let sum = 0;
    for(let i =0;i<10000;i++){
        sum += i;
    }
    return sum
}

process.on('message',data=>{
    console.log('子进程id:',process.id)
    const sum = getSum();


    process.send(sum)

})

// process-fork.js

const http = requre('http');
const fork = require('child_process').fork;

const server = http.createServer((req,res)=>{
    if(req.url === '/get-sum'){
        console.log('主进程 id',process.id)

        // 开启子进程
        const computeProcess = fork('./compute.js')
        computeProcess.send('开始计算')

        computeProcess.on('message',data=>{
            res.end(data)
        })
        computeProces.on("close",err=>{
            console.log(err)
            computeProces.kill()
            res.end('error')
        })
    }
})


```


```
const http = require('http');
const cpuCoreLength = require('os').cpus().length;
const cluster = require('cluster');

if(cluster.isMaster){
    for(let i = 0; i<cpuCoreLength;i++){
        cluster.fork() 开启子进程
    }
    cluster.on("exit",worker=>{
        console.log('子进程退出')
        cluster.fork(); // 进程守护
    })
}else{
    // 多个子进程公用一个 tcp 连接 提供一份网络服务
    const server = http.createServer((req,res)=>{
        res.writeHead(200)
        res.end('done')
    })
    server.listen(3000)
}


```
* 工作中使用 pm2       pm2 docker  ？

* 开启子进程 child_process.fork  send on  传递消息
*  cluster.fork



# Koa2 洋葱圈