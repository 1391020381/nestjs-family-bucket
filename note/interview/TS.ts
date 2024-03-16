// 泛型
// 我们定义了一个`getArrayItem`函数，这个函数使用了一个泛型`T`，这样我们就可以传入任何类型的数组，并且返回值也是相应的类型。 
function getArrayItem<T>(array:T[],index:number):T{
    return array[index]
}
const numbers = [1,2,3,4,5];
const numberItem = getArrayItem(numbers,2);

const strings = ['one','two','three'];
const stringItem = getArrayItem(strings,1);

// 泛型接口
// 我们定义了泛型接口`ArrayWithLength`，它表示具有长度的，元素类型为`T`的数组。
interface ArrayWithLength<T>{
    length:number;
    [index:number]:T;
    pop():T
}
function testArray<T>(array:ArrayWithLength<T>){
    return array.pop()
}

// 泛型类
class KeyValuePair<T,U>{
    constructor(public key:T,public value:U){}
}    


// api.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 创建 Axios 实例
 */
class ApiService {
  private apiInstance: AxiosInstance;

  constructor() {
    this.apiInstance = axios.create({
      baseURL: 'http://your-api-base-url.com', // 你的API基址
      timeout: 2000,
    });

    // 请求拦截
    this.apiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 在这里你可以对请求的参数、头部等做些自定义处理
      return config;
    });

    // 响应拦截
    this.apiInstance.interceptors.response.use((response: AxiosResponse) => {
      // 在这里你可以对响应的结果做些自定义处理
      return response.data;
    });
  }

  // 封装 get 方法
  public async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiInstance.get<T>(path, config);
    return response;
  }

  // 封装 post 方法
  public async post<T>(path: string, payload?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.apiInstance.post<T>(path, payload, config);
    return response;
  }

  // 如需，可以继续封装 put、delete、options等方法
}

export default new ApiService();