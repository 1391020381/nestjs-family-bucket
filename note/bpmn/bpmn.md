# bpmn

- BPMN( Business Process Model and Notation)是一种用于描述业务流程的图形化标准符号的规则,它是一种流程建模语言,可以用于描述业务流程中的各种活动 事件, 网关 流程流向 数据对象等元素的关系和交互。

* BPMN图形化表示了业务流程的执行顺序,流程的控制逻辑以及参与者之间的交互,使得业务流程的设计 分析 实现和优化变得更加直观和易于理解。BPMN已经成为业界流程建模和分析的标准,被广泛应用于企业流程管理 业务流程自动化 系统集成等领域。

* [全网最详bpmn.js教材目录](https://juejin.cn/post/6844904017567416328)

1. bpmn-engine bpmn.js camunda-bpmn-moddle bpmn-js-properties-panel
2. nestjs @golevelup/nestjs-rabbitmq typeorm mysql nestjs-redis winston bpmn-engine
3. 私有化部署 相关数据表结构

## [BPMN-http请求篇](https://juejin.cn/post/6844904017592614919)

- bpmn.js如何与后台进行交互的问题。

1. 通过http请求获取数据并把渲染
2. 将编辑之后的最新bpmn发送给后台
3. 编辑完保存为 bpmn文件或svg文件并渲染

# 一些步骤

1. 要想使用左侧工具栏 只需要在项目中引用相应的样式就可以了。
2. 想要使用右侧的属性栏就得安装上一个 bpmn-js-properties-panel 插件

-