1.  AppService 声明了 @Injectable 代表这个 class 可 注入, 那么 nest 就会把它的对象放到 IOC 容器里。
2.  AppController 声明了 @Controller 代表这个 class 可以被注入, nest 也会把它放到 IOC 容器里
3.  Service 是可以被注入也是可以注入到别的对象的,所以用@Injectable 声明。
4.  @Module 声明模块 其中 controllers 是控制器 只能被注入
5.  providers 里可以被注入 也可以注入别的对象。
6.  当 import 别的模块后, 那个模块 exports 的 provider 就可以在当前模块注入了。
7.  Nest 实现了 IOC 容器,会从入口模块开始扫描,分析 Module 之间的引用关系,对象之间的依赖关系,自动把 provider 注入到目标对象

- provider 一般都是用@Injectable 修饰的 class
- 在 Module 的 providers 里声明
