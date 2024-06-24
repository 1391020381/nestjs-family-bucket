1. useClass
2. useValue
3. useFactory
4. useExisting

- 一般情况下 provider 是通过 @Injectable声明 然后在@Module的 providers数组里注册的class。
- 默认的token就是 class,这样不用使用 @Inject 来指定注入的token。
- 但也可以用字符串类型的token 不过注入的时候要用 @Inject单独指定。

* 如果想动态生成对象,可以使用 useFactory 它的参数也注入IOC容器中对象,然后动态返回provider的对象
* 如果想起别名 可以用 useExisting给已有的token 指定一个新的token。
