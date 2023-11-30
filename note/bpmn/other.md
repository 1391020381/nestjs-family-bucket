- 本地开发 提交审批后,流程一直 准备中/流程错误。 可能是 engine没有启动

* 角色审批时流程无法获取角色数据 查看power配置是否正确

* 基于 BPMN2.0 协议实现，通过可视化界面描述的一个流程图。包括流程管理，角色管理，权限管理，代理管理，流程介入，应用管理，数据统计以及多功能查询。配合邮件，企业微信，以及卡片进行实时通知。可查看审批进度，催办，移交......提供归档功能。

# nestjs-common

- 涉及到 nestjs typeorm 共用代码提取

* 项目共用代码 正常共用代码提取 不涉及 nestjs

1. constant
   - error-code
   - permission-code
   - rabbitmq
   - request
   - task
   - template
2. entities 实体
3. types
4. ui

# nestjs-core

- 正常代码打包
- tsc -p tsconfig.json

## 数据表

1. agency
2. attachment
3. authorization
4. category
5. comment
6. dataField
7. form
8. formType
9. formVersion
10. nodes
11. organization
12. os
13. pdf
14. permission
15. role
16. user

## 项目架构

## nestjs rabbitmq

- @golevelup/nestjs-rabbitmq

## 基本流程

- 流程管理员/ 流程用户(包括发起流程与处理代办的用户/开发人员) -> Web Application -> API Application
- API Application <-> 消息队列(rabbitmq)
- 消息队列(rabbitmq) <-> Engine Service
- Engine Service -> 数据库 mysql
- API Application -> 数据库 mysql
- API Application -> 催办系统

1.  （前端发起流程） 1.发起流程 -> 2. getTemplate(templateld) -> 3. template(template包含发起表单) -> 4. 跳到发起表单页 -> 5. 提交表单 -> 6. igniteProcess(templateid,[formData]) -> 7. 跳转到流程详情
2.  在DB创建流程实例 8. insertRecord -> 9. processId -> 10. publish ignite msg to ignite-queue（rabbit-mq）
3.  引擎执行 1. push msg from ignite-queue to engine 2. ignite process 3. 流程日志 ( notify engine service when activity ends/ acquire lock<processsid> 分配lock batchInsert updateProcess)

## 重点模块

1. 表单引擎开发

- 基于JSONEditor rfsf 实现一个所见即所得表单编辑器。支持发布版本 保留当前表单信息。 方便后续回滚。
- 表单设计遵循 json schema规范 https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/ https://vue-json-schema-form.lljj.me/zh/guide/adv-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89widget

2. 流程建模器开发
3. 用户模块
4. 自定义表单组件使用说明
