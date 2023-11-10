import axios from "axios";

const customAxios = axios.create({
  // 配置自定义的 Axios 实例
});

customAxios.interceptors.request.use(
  (config) => {
    // 添加请求拦截器逻辑
    return config;
  },
  (error) => {
    // 添加请求错误拦截器逻辑
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    // 添加响应拦截器逻辑
    return response;
  },
  (error) => {
    // 添加响应错误拦截器逻辑
    return Promise.reject(error);
  }
);

export default customAxios;
