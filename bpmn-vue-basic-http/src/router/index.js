import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/basic",
  },
  {
    path: "/basic",
    component: () => import("./../components/basic"),
  },
  {
    path: "/basicDemo",
    component: () => import("./../components/basicDemo"),
  },
  {
    path: "/provider",
    component: () => import("./../components/provider"),
  },
  {
    path: "/panel",
    component: () => import("./../components/panel"),
  },
  {
    path: "/axios",
    component: () => import("./../components/axios"),
  },
  {
    path: "/save",
    component: () => import("./../components/save"),
  },
  {
    path: "/event",
    component: () => import("./../components/event"),
  },
  {
    path: "/vueDiff",
    component: () => import("./../components/vueDiff"),
  },
  {
    path: "/vueDiffOpt",
    component: () => import("./../components/vueDiffOpt"),
  },
  {
    path: "/scopedSlotDemo",
    component: () => import("./../components/scopedSlotDemo"),
  },
];

export default new Router({
  mode: "history",
  routes,
});
