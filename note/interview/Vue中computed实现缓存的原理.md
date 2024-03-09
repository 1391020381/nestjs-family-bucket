1.  computed 是响应式的
* 读取computed时就会触发get 设置的时候会触发set
2. computed 是如何控制缓存的
3. 依赖的data发生改变 computed是如何更新


```
function createComputedGetter(key){
    return function (){
        // 获取到相应key 的 computed-watcher
        var watcher = this._computedWatchers[key]
        // 如果 computed 依赖的数据变化 dirty会变成true
        // 从而重新计算 然后更新缓存 watcher.value
        if(watcher.dirty){
            watcher.evaluate()
        }
        // 建立关系
        if(Dep.target){
            watcher.depend()
        }
        return watcher.value
    }
}

```
1. 渲染watcher  computer watcher 首先是 初始化这个两个watcher。
2. dirty
3. 计算属性c 依赖data A
* A可以收集到C的watcher
* 当A变化时, 会把 watcher.dirty 设置为 true
* 也会触发computed watcher  执行完 watcher.dirty false
* 也会触发 渲染watcher。