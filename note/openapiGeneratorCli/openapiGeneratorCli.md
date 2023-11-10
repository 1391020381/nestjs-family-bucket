- Openapi generator 使用 typescript-axios模版，但是需要在 typescript-axios模版中添加一些自己 拦截器

要在 typescript-axios 模板中添加拦截器，可以按照以下步骤操作：

1. 在生成 OpenAPI 客户端之前，创建一个自定义的 Axios 实例，并添加你需要的拦截器。

```typescript
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
```

2. 在生成 OpenAPI 客户端时，使用 `--additional-properties` 选项将自定义 Axios 实例传递给 typescript-axios 模板。

```bash
openapi-generator generate -i <input-file> -g typescript-axios \
  --additional-properties=useSingleRequestParameter=true,axios=customAxios \
  -o <output-directory>
```

在以上命令中，`axios=customAxios` 将自定义 Axios 实例传递给模板，以便在生成的客户端中使用该实例。

3. 在生成的客户端代码中，使用自定义 Axios 实例进行 API 调用。

```typescript
import { DefaultApi, Configuration } from "./api";

const configuration = new Configuration({
  basePath: "https://api.example.com",
});

const api = new DefaultApi(configuration, customAxios);

api
  .getSomeData()
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => {
    // 处理错误
  });
```

在以上代码中，`DefaultApi` 和 `Configuration` 是由 OpenAPI 生成的客户端代码。`customAxios` 是我们在第一步中创建的自定义 Axios 实例，用于进行 API 调用。

```

npx @openapitools/openapi-generator-cli generate -i api.json -g typescript-axios -o ./build/api --additional-properties=withSeparateModelsAndApi=true,modelPackage=models/finance,apiPackage=apis/finance,axios=customAxios


```
