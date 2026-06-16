# LangChain.js 教程

一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

## 前置要求

- Node.js 20+
- 智谱 AI API Key 或 OpenAI API Key

## 快速开始

1. 安装依赖：

```bash
npm install
```

2. 配置环境变量：

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

3. 运行示例：

```bash
npm run dev src/01-setup/01-simple-llm.ts
```

## 模块列表

- **模块 1**: 环境搭建与基础 LLM 调用
- **模块 2**: Prompts（提示模板和输出解析器）
- **模块 3**: Chains（链）
- **模块 4**: RAG（检索增强生成）
- **模块 5**: Agents（智能代理）
- **模块 6**: Memory（记忆）

每个模块都有详细的 README，包含运行说明和学习要点。
