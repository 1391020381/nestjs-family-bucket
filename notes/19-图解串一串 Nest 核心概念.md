# provider

- provider是可以注入的对象，它们都有token token可以是class string

* provider 可以是 useClass 指定class useValue useFactory
* provider 可以相互注入 还可以注入 controller里
* module 里 exports的provider在模块被imports之后就可以用于别的模块的注入了。
* @Golbal 声明为全局的
* Provider可以通过 useFactory动态创建

* Module Provider Controller 动态模块 全局模块 自定义Provider 生命周期 Middleware Guard Pipe Interceptor Exception Filter
