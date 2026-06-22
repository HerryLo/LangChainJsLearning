---
title: LangChain.js 教程
description: 循序渐进学习 LangChain.js
---

# LangChain.js 教程

一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

## 前置要求

- Node.js 20+
- 智谱 AI API Key 或 OpenAI API Key

## 环境搭建

### 1. 克隆项目

```bash
git clone <repo-url>
cd langchain_example
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

### 4. 运行示例

```bash
npm run dev src/01-setup/01-simple-llm.ts
```

## 模块导航

::: info 模块 1：环境搭建与基础 LLM 调用
- [01-simple-llm](01-setup/01-simple-llm.md)
- [02-chat-model](01-setup/02-chat-model.md)
:::

::: info 模块 2：Prompts（提示模板和输出解析器）
- [01-prompt-template](02-prompts/01-prompt-template.md)
- [02-chat-prompt-template](02-prompts/02-chat-prompt-template.md)
- [03-output-parser](02-prompts/03-output-parser.md)
- [04-few-shot-prompt](02-prompts/04-few-shot-prompt.md)
:::

::: info 模块 3：Chains（链）
- [01-llm-chain](03-chains/01-llm-chain.md)
- [02-sequential-chain](03-chains/02-sequential-chain.md)
- [03-router-chain](03-chains/03-router-chain.md)
- [04-transform-chain](03-chains/04-transform-chain.md)
:::

::: info 模块 4：RAG（检索增强生成）
- [01-document-loader](04-rag/01-document-loader.md)
- [02-text-splitter](04-rag/02-text-splitter.md)
- [03-embeddings](04-rag/03-embeddings.md)
- [04-vector-store](04-rag/04-vector-store.md)
- [05-retrieval-qa](04-rag/05-retrieval-qa.md)
:::

::: info 模块 5：Agents（智能代理）
- [01-tools](05-agents/01-tools.md)
- [02-react-agent](05-agents/02-react-agent.md)
- [03-functions-agent](05-agents/03-functions-agent.md)
:::

::: info 模块 6：Memory（记忆）
- [01-buffer-memory](06-memory/01-buffer-memory.md)
- [02-window-memory](06-memory/02-window-memory.md)
- [03-summary-memory](06-memory/03-summary-memory.md)
- [04-memory-in-chain](06-memory/04-memory-in-chain.md)
:::
