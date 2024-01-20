1. 防抖  节流
* 两者有什么区别
* 分别用于什么场景

* 节流 限制执行频率 有节奏的执行
* 防抖 限制执行次数 多次密集的触发只执行一次
* 节流关注 关注过程  防抖关注结果

```
// 防抖  input 连续输入,  
// 操作结束后  再执行最后一个操作
function debounce(fn,delay=200){
        let timer = 0;
        return function(){
            if(timer) clearTimeout(timer)
            timer = setTimeout(()=>{
                fn.apply(this,arguments)
                timer = 0
            },delay)
        }
}

// 节流  节省交互沟通 流 不一定是流量  别急 一个个来 按时间节奏 插队无效
// drag  scroll期间触发回调 设置一个时间间隔


function throttle(fn,delay=100){
    let timer = 0;
    return function(){
        if(timer) return 
        timer = setTimeout(()=>{
           fn.apply(this,arguments)
           timer = 0
        },delay)
    }
}

```

# for in  for of 区别
* for in 遍历得到key  用于可枚举数据 如 对象 数组 字符串
* for of 遍历得到value  可迭代数据 数组 字符串 Map Set generator  arr[Symbol.iterator]

# for await of 有什么作用
* 用于遍历多个promise

```
 function createPromise(val){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(val)
        },1000)
    })
 }
 const p1 =  createPromise(100)
 const p2 = createPromise(200)
 const p3 = createPromise(300)
 const list = [p1,p2,p3]
 for await ( let res of list){
    console.log(res)
 } 

for(let num of [10,20,30]){
    const res = await createPromise(num)
    console.log(res)
}

```