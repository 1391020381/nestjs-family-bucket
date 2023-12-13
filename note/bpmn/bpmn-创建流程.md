# 创建模版

# 流程创建步骤

- 选择模版创建流程

* /api/sdk/processes/ignite

- /processes/ignite 创建流程
- process.service.ts igniteProcess 从DB中查找模版(每个流程都选择了模版按照创建模版执行流程) 在DB中创建一条流程记录 把模版信息和流程信息发布到执行队列中

```
await this.lockService.lock(`process:${processId}`,20*1000,50,2400) redis

await this.amqpConnection.publish(EXECUTION_EXCHANGE_NAME, 'execution.ignite', igniteJobPayload, {
      timestamp: +new Date(),
      type: 'json',
    });

// bpmn-engine

@RabbitSubscribe({
    exchange: EXECUTION_EXCHANGE_NAME,
    routingKey: 'execution.ignite',
    queue: `${MQ_PREFIX}-ignite-queue`,
  })
  async igniteProcess(msg: IgniteJobPayload) {
    const { processId, bpmnModdle, variables } = msg;
    this.logger.info('Process ignited / 流程开始', { meta: { processId, action: 'process.ignite' } });
    try {
      //  loadProcessFromBpmnModdle 获取参数 ？
      const { engine } = await this.loadProcessFromBpmnModdle(bpmnModdle, processId, { variables });
      await engine.getState();
      await engine.execute({ variables });
      await wait(15); // 等待15s才算运行成功
    } catch (err) {
      // this.persistanceService.onProcessError({
      //   processId,
      //   err,
      //   message: `引擎未知错误: ${err.message}`,
      //   engineState: null,
      //   engineEvent: 'engine.error',
      // });
    } finally {
      return new Nack();
    }
  }

```

- nestjs-node sdk /tasks/:taskId/approve 任务审批
  - bpmn-engine 有一个监听
  - web 管理端 用户端 模版 流程+ 表单 表单绑定审批人 审批人 在 web端 通过界面 调用接口 改变 任务状态

* core proces rolePermission task
* template
* task 不涉及 审核通过 驳回 修改审批人 转交 撤回 完成 跳过 保存表单 超时跳过
* bpmn-engine
