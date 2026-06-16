# 模块 1：环境搭建与基础 LLM 调用

## 运行示例

首先，复制 `.env.example` 为 `.env` 并填入你的 API Key：

```bash
cp .env.example .env
# 编辑 .env 文件
```

然后安装依赖：

```bash
npm install
```

运行示例：

```bash
npm run dev src/01-setup/01-simple-llm.ts
npm run dev src/01-setup/02-chat-model.ts
```

## 学习要点

- 如何初始化 ChatOpenAI 模型
- 如何使用 temperature 参数控制随机性
- SystemMessage 和 HumanMessage 的区别
