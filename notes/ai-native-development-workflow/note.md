# 接入ClaudeCode 在 PowerShell 中运行以下命令(官网)

- https://docs.bigmodel.cn/cn/guide/develop/claude#%E6%96%B9%E5%BC%8F%E4%BA%8C%EF%BC%9A%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%EF%BC%88%E6%94%AF%E6%8C%81-windows-macos-linux%EF%BC%89

# 注意替换里面的 `your_zhipu_api_key` 为您上一步获取到的 API Key

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'd29c0bdf02e34d51899eedc9e1132250.jvbk8Oa7z3vttn6r', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://open.bigmodel.cn/api/anthropic', 'User')
[System.Environment]::SetEnvironmentVariable('CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', '1', 'User')

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
