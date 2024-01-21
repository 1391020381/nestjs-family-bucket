# Vue每个生命周期都做了什么
* Vue2  Vue3  部分生命周期名称不同   setup

* setup Composition API

1. beforeCreate
* 创建一个空白vue实例
* data method 尚未被初始化

* 设置全局配置  minix  VueRouter Vuex
* 注册插件
* 设置全局的事件总线


2. created
* vue实例初始化完成 完成响应式绑定
* data method 都初始化完成 可调用
* 尚未渲染模版

3. beforeMount
* 编译模版 调用 render 生成 vdom
* 还没有开始渲染

4. mounted
* 完成dom渲染
* 组件创建完成
* 开始由创建 进入 运行阶段
5. beforeUpdate
* data 发生变化之后
* 准备更新dom 尚未更新dom
6. updated
* data发生变化 且 dom更新完成
* 不要在updated中修改 data 可能导致死循环。
7. beforeUnmount 
* 组件进入销毁阶段(尚未销毁 可正常使用)
* 可移除 解绑一些全局事件 自定义事件
8. unmounted
* 组件被销毁了
* 所有子组件也都被销毁了。
9. keep-alive
    - activated   
    - deactivated


* Vue在 mounted updated 不能确保 dom已经拐载 $nextTick    

* ajax 应该在哪个生命周期

    - created mounted
    - created mounted 间隔很短的，ajax 比之时间更长

* Vue3 Composition API生命周期区别   
* 用setup代替了 beforeCreate  created
* Hooks函数形式  mounted 改为 onMounted 


# vue2 vue3 react diff算法区别
* 找出改变节点
* 如何严格 diff两个树 时间复杂度 O(n^3) 不可用
* 时间复杂度 时间复杂度主要关注的是输入数据量（通常用 n 表示）的增长对算法执行时间的影响

* 只比较同一层级 不跨级比较
* tag 不同则删除重建(不再去比较内部细节)
* 子节点通过key区分 key重要性
* o(n)

* react diff仅右移
* vue2 双端比较
3. vue3 最长递增子序列

#  vue react   必须使用key

* vdom diff 会根据key 判断元素是否删除掉
* 匹配key 则只移动 性能较好
* 未匹配 则删除重建 性能较差


# Vue router  MemoryHistory (abstract)
* hash  createWebHistory
* webhistory createWebHashHistory
* Memoryhistory  V4之前叫做 abstract history   createMemoryhistory 不会触发网页 浏览器历史