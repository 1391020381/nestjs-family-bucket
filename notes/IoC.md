1. Service 是可以被注入也是可以注入到别的对象的,所以用 @Injectable
   声明
2. Controller 只需要被注入 所以 nest单独给它加了@Controller的装饰器。
3. 在AppModule里引入 通过 @Module声明模块 其中 controllers是控制器 只能被注入。 providers里可以被注入 也可以注入别的对象。 被注入：一个 provider 可以被注入到其他类中，作为依赖使用。
   注入其他类：一个 provider 也可以注入其他的 provider，从而使用它们的功能

- nest 会从 AppModule开始解析 class上通过 装饰器声明的依赖信息,自动创建和组装对象。

* 当 import别的模块后，那个模块 exports的 provider就可以在当前模块注入了。
