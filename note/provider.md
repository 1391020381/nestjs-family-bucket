- In Nest, thanks to TypeScript capabilities, it's extremely easy to manage dependencies because they are resolved just by type. In the example below, Nest will resolve the catsService by creating and returning an instance of CatsService
- constructor(private catsService: CatsService) {}

* Nest 实现了 IOC 容器,会从入口模块开始扫描,分析 Module 之间的引用关系,对象之间的依赖关系,自动把 provider 注入到目标对象。
* provider 一般都是用 @Injectable 修饰的 class。
* 在 Module 的 providers 里声明 providers:[{ provide: AppServiceuseClass:AppService}]
* 通过 provide 指定注入的 token 通过 useClass 指定注入的对象的类,Nest 会自动对它做自动化再注入。
