* axios 怎么取消请求

```

// 创建一个 CancelToken 实例
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/your_api_url', {
  cancelToken: source.token
}).catch((thrown) => {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

// 取消请求 (请求原因是可选的)
source.cancel('Operation canceled by the user.');


Axios 的请求取消功能底层依赖于原生的 JavaScript 提供的 API：AbortController 。
AbortController 是一个可以用来取消 fetch 请求的 API，以前使用 XMLHttpRequest 的时候，我们用的是 xhr.abort() 来取消请求，而现在使用 fetch，我们就可以用 AbortController 来取消了。Axios 也是基于此实现的取消功能。
// 创建一个 AbortController 实例
const controller = new AbortController();

// 你可以传递 controller.signal 到你的请求中
fetch(url, {
  signal: controller.signal
});

// 如果你想取消请求，只需要调用以下函数
controller.abort();

```



```
// axios 封装 且暴露取消请求接口

import axios from "axios";

class MyAxios {
  constructor(baseURL) {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();

    this.instance = axios.create({
      baseURL,
      cancelToken: this.source.token,
      // 其它你想自定义的配置...
    });

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 在此处做一些请求发送前的处理
        // 例如，你可能想在这里添加一些 HTTP headers:
        // config.headers['Your-Header'] = 'Your Value'
        // 记得返回处理后的配置
        return config;
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        // 对响应数据做些什么
        // 如果你想在此处对返回数据做一些处理，可以在返回之前处理
        // 例如,如果你的API总是返回 `{ data: ... }`，你可能想在这里解构一下:
        // return response.data;
        return response;
      },
      error => {
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  // 创建一个暴露给外部的取消请求的方法
  cancelRequest(message) {
    this.source.cancel(message);
  }

  // 暴露 axios 的方法例如 get，post等.
  get(url, config = {}) {
    return this.instance.get(url, { ...config });
  }

  post(url, data = {}, config = {}) {
    return this.instance.post(url, data, { ...config });
  }

  // 可以添加其它的 HTTP 方法...
}

export default MyAxios;


```