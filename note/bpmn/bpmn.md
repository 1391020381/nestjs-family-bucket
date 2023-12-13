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

# bpmn.js基本组成

1. palette 左侧工具栏
2. element(shape)
3. element(connection)
4. element overlay
5. context-pad
6. properties-panel 属性栏

# bpmn-engine

- BPMN 2.O execution engine Open source javascript workflow engine

# BPMN（Business Process Model and Notation）是一种用于业务流程建模的标准化符号和规范，它定义了一套符号和元素，用于描述和表示业务流程中的各种活动、事件、网关等元素。BPMN的XML文件中包含了多种元素，下面是一些常见的元素和它们所代表的意义：

1. Process（流程）：代表一个完整的业务流程，包含多个活动、事件和网关等元素。

2. Start Event（开始事件）：代表业务流程的开始，通常是一个起点。

3. End Event（结束事件）：代表业务流程的结束，通常是一个终点。

4. Task（任务）：代表业务流程中的一个活动或任务。

5. User Task（用户任务）：代表需要人工干预的任务，通常需要人员进行审批或处理。

6. Service Task（服务任务）：代表自动化的任务，通常由计算机程序或系统自动处理。

7. Gateway（网关）：代表业务流程中的决策点，用于控制流程的分支和汇聚。

8. Exclusive Gateway（排他网关）：代表一种互斥的选择，只有一个分支可以被执行。

9. Parallel Gateway（并行网关）：代表一种并行的选择，多个分支可以同时被执行。

10. Sequence Flow（顺序流）：代表业务流程中的顺序关系，用于连接各个元素。

11. Message Flow（消息流）：代表业务流程中的消息传递，用于描述不同元素之间的通信。

12. Data Object（数据对象）：代表业务流程中的数据对象，用于描述业务流程中的数据流动。

13. Subprocess（子流程）：代表一个业务流程中的子流程，通常用于描述一个复杂的业务流程。

以上是一些常见的BPMN元素和它们所代表的意义，BPMN中还有其他的元素和属性，具体可以参考BPMN规范文档。

- bpmn-engine 可以通过在流程绑定的人工任务中添加自定义的行为,来实现在任务完成后发送邮件的功能

````

是的，bpmn-engine可以通过在流程绑定的人工任务中添加自定义的行为，来实现在任务完成后发送邮件的功能。以下是一个示例代码，演示如何在人工任务完成后发送邮件：

```javascript
const engine = new Bpmn.Engine({
  source: 'path/to/process.bpmn'
});

// 在人工任务完成后发送邮件
engine.execute({
  listener: {
    'activity.end': function(activity) {
      if (activity.type === 'bpmn:UserTask') {
        const assignee = activity.assignee;
        const email = getEmailByAssignee(assignee); // 根据assignee获取对应的邮箱地址
        sendEmail(email, 'Task Completed', 'Your task has been completed.'); // 发送邮件
      }
    }
  }
});
````

在上面的示例中，我们通过监听`activity.end`事件，来捕获人工任务完成的事件。当任务完成后，我们获取任务的`assignee`，并根据`assignee`获取对应的邮箱地址，然后调用`sendEmail`函数来发送邮件。需要注意的是，`sendEmail`函数需要根据实际情况进行实现。

需要注意的是，上述示例中的`getEmailByAssignee`和`sendEmail`函数需要根据实际情况进行实现。在实际应用中，可以使用第三方邮件服务或者自己的邮件服务器来发送邮件。

```

```
