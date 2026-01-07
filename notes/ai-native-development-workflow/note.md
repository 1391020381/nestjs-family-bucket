# 接入ClaudeCode 在 PowerShell 中运行以下命令(官网)

- https://docs.bigmodel.cn/cn/guide/develop/claude#%E6%96%B9%E5%BC%8F%E4%BA%8C%EF%BC%9A%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%EF%BC%88%E6%94%AF%E6%8C%81-windows-macos-linux%EF%BC%89

# 注意替换里面的 `your_zhipu_api_key` 为您上一步获取到的 API Key

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'd29c0bdf02e34d51899eedc9e1132250.jvbk8Oa7z3vttn6r', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://open.bigmodel.cn/api/anthropic', 'User')
[System.Environment]::SetEnvironmentVariable('CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', '1', 'User')

# SDD工作流(规范驱动开发)

1. spec.md
   - 输入 开发者或产品经理提出的高层级、模糊的自然语言想法
   - 核心活动 人机协作进行头脑风暴、挖掘边缘场景 澄清模糊地带 定义验收标准。
   - 输出产物 spec需求规范。 核心是完全与技术实现解耦,只关心用户故事 功能需求和成功标准。 后续所有阶段唯一输入和宪法。
2. plan.md
   - 输入 spec.md 和开发者提供的技术栈约束
   - 核心活动 AI Agent基于规范 集合自身的工程知识和项目自己已有的宪法(constitution.md),进行技术选型、架构设计、模块划分、API契约定义 -输出产物 plan.md(技术方案)及其附属文档(data-model.md api-spec.json) 将业务需求精确地映射到技术实现上
3. tasks.md

   - 输入 plan.md及器所有附属设计文档
   - 核心活动: AI Agent分析技术方案 将其拆分成一系列具体的 原子化的 可执行的开发任务。 关键在于 它需要识别任务之间的依赖关系和可并行点。
   - 输出产物 tasks.md(任务列表) 这份文档是AI Agent的 待办事项清单,其格式和内容必须是机器友好的。

4. 自动化实现
   - 输入 taks.md
   - 核心活动 AI Agent 严格按照 task.md的指令, 逐一执行任务，包括创建文件 编写代码 运行测试。开发者在此阶段的核心职责是监督、审批高风险操作,以及对最终结果进行验收

# CLAUDE.md

1. 核心使命与角色设定

   - 内容: 你是一位精通

2. 技术栈与环境

3. 架构与代码规范

4. Git与版本控制

5. AI协作指令

# constitution.md

1. 库先行原则

2. CLI接口强制

3. 测试先行铁律

4. 集成、可观测性、 版本控制

   - 这些条款进一步细化了工程实践,例如强调集成测试的重要性、 要求结构化日志 定义清晰的版本号规范等。

5. 简单与反过度抽象原则

   - 初始实现的项目结构不能超过3个、 直接使用框架特性,而不是过度包装、 保持单一的模型表示

6. 集成优先测试
   - 测试环境使用真实环境,优先使用真实的数据库非Mocks

# Plan.md

- vscode 插件中 内置命令与 命令行的 claude 内置命令不同

* $ARGUMENTS 指令需要接受的是一段不确定长度的、完整的自然语言描述或 单一 ID时，使用 $ARGUMENT
* $1 $2 $3 接受固定的、有明确顺序和含义的结构化参时，使用位置参数 $1 $2 $3
