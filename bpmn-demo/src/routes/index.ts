import { createRouter, createWebHashHistory } from "vue-router";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: "/", component: import("../pages/home.vue") },
  { path: "/about", component: import("../pages/about.vue") },
  { path: "/basic", component: import("../pages/basic.vue") },
  { path: "/axios", component: import("../pages/axios.vue") },
  { path: "/save", component: import("../pages/save.vue") },
  { path: "/vue3Demo", component: import("../pages/vue3Demo.vue") },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
