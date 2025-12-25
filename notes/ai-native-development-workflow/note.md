# 接入ClaudeCode 在 PowerShell 中运行以下命令(官网)

- https://docs.bigmodel.cn/cn/guide/develop/claude#%E6%96%B9%E5%BC%8F%E4%BA%8C%EF%BC%9A%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%EF%BC%88%E6%94%AF%E6%8C%81-windows-macos-linux%EF%BC%89

# 注意替换里面的 `your_zhipu_api_key` 为您上一步获取到的 API Key

[System.Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', 'd29c0bdf02e34d51899eedc9e1132250.jvbk8Oa7z3vttn6r', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', 'https://open.bigmodel.cn/api/anthropic', 'User')
[System.Environment]::SetEnvironmentVariable('CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC', '1', 'User')
