# 两种登录状态保存方式：JWT、Session

# 服务端存储的 session + cookie

    - CSRF 跨站请求伪造
    - 因为 cookie 会在请求时自动带上，那你在一个网站登录了，再访问别的网站，万一里面有个按钮会请求之前的那个网站的,那么cookie依然能带上。
    - referer 验证
    - token 验证
    - 分布式 session  多台服务器 seesion同步    sesson复制 每次变更都同步    redis + session
    - 跨域 cookie 做了domain限制 只有对应 domain才会带 cookie
    - ajax 跨域
        - ajax 请求跨域的时候是不会挟带 cookie 的，除非手动设置 withCredentials 为 true 才可以。
        - Access-Control-Allow-Origin: "当前域名";
        - Access-Control-Allow-Credentials: true

# 客户端存储的 token

- json web token JWT
- JWT 是保存在 request header里的一段字符串(比如用header名可以叫 authorization)
- JWT 分三部分 header、payload、verify signature
- authorization: Bearer xxxxx.xxxxx.xxxx

- 安全性 https
- 性能 jwt不要保存太多数据
- 没法让 jwt失效 踢人 退出登录 修改完密码下线。
- redis + jwt redis 有 时效时间设置
