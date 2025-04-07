# 自定义Provider和动态模块

- 自定义Provider关注的是单个提供者的创建方式
- 动态模块关注的是整个模块的可配置性,允许模块在被导入时接受参数,并动态地配置模块内部的Provider或其他设置。
- 两者可以结合使用,动态模块内部可能会使用自定义Provider来根据配置创建相应的服务实例。

- 官方文档中定义 动态模块本质上也是一个模块,它通过模块类中静态方法(forRoot())返回一个DynamicModule对象,这个对象包含了模块的配置,包括 providers、exports、imports等。
- 自定义Provider实在模块的providers数组中通过提供 useClass useVaue useFactory等来定义如何创建特定的提供者。

- 动态模块更多的是模块级别的配置
- 自定义Provider更多的是提供者级别的配置 动态模块可以导出配置好的Provider 这些Provider本身可能就是自定义的方式创建的。

- 实际应用中,当我们需要让一个模块可以被外部配置时,应该使用动态模块 而当需要控制某个Provider的创建逻辑时,使用自定义Provider。 动态模块中实现中 通常结合自定义Provider使用。
