// 请求图片进行预先加载

```
const loadImg = urlId =>{
    const url = `https://www.image.com/${urlId}`
    return new Promise((resolve,reject)=>{
        const img = new Image()
        img.onerror = function(){
            reject(urlId)
        }
        img.onload = function(){
            resolve(urlId)
        }
        img.src = url;
    })
}

urlIds.reduce((prevPromise,urlId)=>{
    return prePromise.then()
},Promise.resolve())


 const loadImgOneByOne = async ()=>{
    for (i of urlIds){
        await loadImg(urlIds[i])
    }
 }

 loadImgOneByOne()


```


1. splice(index,num,item1,iem2...)
2. pop 删除数组的最后一个元素 改变原数组
3. shift 删除数组的第一个元素
4. unshift 
5. sort 
6. reverse
7. slice
8. join
9. concat
10. indexOf
11. includes

12. forEach
13. some
14. every
15. filter
16. map
17. reducer
18. 


```
let a = [1, 2, 3, 4];
let b = [3, 4, 5, 6];

let union = [...new Set([...a, ...b])]; // 求并集
let intersection = [...new Set(a)].filter(x => new Set(b).has(x)); // 求交集

console.log(union);  // 输出 [1, 2, 3, 4, 5, 6]
console.log(intersection);  // 输出 [3, 4]

```