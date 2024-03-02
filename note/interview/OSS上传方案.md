
![oss-cdn](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14f0a1f4a50b4e3aa42b8430e14724f8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1560&h=502&s=107054&e=png&b=fafafa)

![oss-cdn步骤](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69d6c8bf283d49edb00484603c3af90b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1564&h=386&s=130373&e=png&b=ffffff)

```
const OSS = require('ali-oss')

let client = new OSS({
  region: '你的Bucket所在地域',
  accessKeyId: '你的AccessKeyId',
  accessKeySecret: '你的AccessKeySecret',
  bucket: '你的Bucket名称'
});

async function put () {
  try {
    // 注意，这里的'project/file.txt'就是指定了文件路径，也就是创建了一个目录
    let result = await client.put('project/file.txt', 'local-file.txt');
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

put();


```

* 会单独的 OSS （Object Storage Service） 对象存储服务来上传文件。
* 一个桶里放一些文件
* 阿里云 OSS的控制台也提到了对象存储没有目录层级结构。