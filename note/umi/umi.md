# 配置文件

- 如果项目的配置不复杂,推荐在 .umirc.ts中写配置,如果项目的配置比较复杂,可以将配置写在 config/config.ts中,并把配置的一部分拆分出去,比如 路由配置可以拆分成单独的 route.ts

* routes 配置子路由 通常在需要为多个路径增加layout组件时使用

```
export default {
  routes: [
    { path: '/login', component: 'login' },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/list', component: 'list' },
        { path: '/admin', component: 'admin' },
      ],
    },
  ],
}

然后在 src/layouts/index 中通过 props.children 渲染子路由，


export default (props) => {
  return <div style={{ padding: 20 }}>{ props.children }</div>;
}

这样，访问 /list 和 /admin 就会带上 src/layouts/index 这个 layout 组件。


```

- wrappers 配置路由的高阶组件封装 比如 可以用于路由级别的权限校验

```

export default {
  routes: [
    { path: '/user', component: 'user',
      wrappers: [
        '@/wrappers/auth',
      ],
    },
    { path: '/login', component: 'login' },
  ]
}

import { Redirect } from 'umi'

export default (props) => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}

这样，访问 /user，就通过 useAuth 做权限校验，如果通过，渲染 src/pages/user，否则跳转到 /login，由 src/pages/login 进行渲染

```

# 运营平台路由基本原理

1.  umi前端代码配置化路由
2.  项目整体需要登录态 根据用户登录态 渲染菜单 此处有区分用户权限

- 诉求 数据看板类型页面 通过配置化生成页面
- 问题 把配置的菜单添加到 umi的路由上

1. 前端路由需要通过接口 后置添加
2. 给出一个接口不校验的登录态 拉取所有的菜单,初始化

- umi 运行时配置

1. 拿到原来的路由信息
2. 获取新增配置菜单信息
3. 把iframe参数 传递给组件 code 运营平台 权限组件 统一作业平台 path

- umi 运行时可以获取到 原有的路由 title path compoent
- 用户信息接口获取到 现在 菜单信息 url(path) resourceCode 层级比 路由多一层

路由 数据 - 拼团超级省 （数据看板相关页面）  
菜单 数据 - 平台活动 - 拼团超级 (数据看板相关页面)

拿到 菜单数据 对比 路由数据 不在路由里面的都要新增

- 新增数据 code url 传递给 ScrmIframe

* patchClientRoutes

1. 通过路由 动态参数 params 来实现 传入参数

{
title: '会升初',
path: '/data/dataView/:urlPath',
component: './data/upgrade/member',
}

2. 改动点 运营平台 数据看板 只有一个权限位 页面权限位 在 统一作业平台可以控制 因此 可以取消 运营平台的 权限位校验。

[
{
key:"uid",

<!-- value:"", -->

label:"用户id"
}
]

<!-- {
key:"",
value:""
} -->

key:""

组件级别的 v-model
