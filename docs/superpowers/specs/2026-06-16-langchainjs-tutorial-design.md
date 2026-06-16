---
name: LangChain.js 系统学习教程
description: 按组件分层学习 LangChain.js 的完整教程设计
type: design
---

# LangChain.js 系统学习教程设计

## 概述

为熟练的 JavaScript/TypeScript 开发者设计的 LangChain.js 系统性学习路径，采用边学边练的方式，每个概念都配有可运行的代码示例。

## 学习者背景

- 熟练的 JS/TS 开发者（多年经验）
- 对 LLM 有基本了解，用过 ChatGPT 等产品
- 希望从基础开始系统性学习
- 喜欢边学边练，每个概念都写代码

## 项目结构

```
langchain-tutorial/
├── package.json
├── src/
│   ├── 01-setup/          # 环境搭建和基础 LLM 调用
│   ├── 02-prompts/        # 提示模板和输出解析器
│   ├── 03-chains/         # 各种链的使用
│   ├── 04-rag/            # RAG 检索增强生成
│   ├── 05-agents/         # 智能代理
│   └── 06-memory/         # 记忆模块
└── docs/                  # 学习笔记
```

## 学习模块

### 模块 1：环境搭建与基础 LLM 调用
- 初始化 Node.js + TypeScript 项目
- 安装 LangChain.js 依赖
- 配置 LLM 提供商（智谱 AI、OpenAI 等）
- 最简单的 LLM 调用示例
- 学习目标：能写出第一个调用 LLM 的程序

### 模块 2：Prompts（提示模板和输出解析器）
- PromptTemplate：动态填充变量
- ChatPromptTemplate：对话式提示
- 输出解析器：结构化输出（JSON、Zod 模式等）
- FewShotPromptTemplate：少样本学习
- 学习目标：能灵活构建各种提示并获得结构化输出

### 模块 3：Chains（链）
- LLMChain：最基础的链
- SequentialChain：顺序链（SimpleSequentialChain）
- RouterChain：路由链
- TransformChain：数据转换
- 学习目标：能将多个步骤组合成链

### 模块 4：RAG（检索增强生成）
- 文档加载器（Text、PDF、Markdown 等）
- 文档切分（CharacterTextSplitter、RecursiveCharacterTextSplitter）
- Embeddings（向量嵌入）
- 向量存储（MemoryVectorStore、Chroma 等）
- Retrievers（检索器）
- RetrievalQAChain：端到端 RAG
- 学习目标：能构建基于自己文档的问答系统

### 模块 5：Agents（智能代理）
- Tools 定义和使用
- ReAct 代理
- OpenAI Functions 代理
- 自定义代理
- 学习目标：能让 LLM 自主使用工具完成复杂任务

### 模块 6：Memory（记忆）
- ConversationBufferMemory：完整对话历史
- ConversationBufferWindowMemory：窗口记忆
- ConversationSummaryMemory：摘要记忆
- ConversationKGMemory：知识图谱记忆
- 将记忆集成到链和代理中
- 学习目标：能让应用记住上下文

## 技术栈

- **运行时：** Node.js 20+
- **语言：** TypeScript
- **LLM 提供商：** 智谱 AI（GLM-4）或 OpenAI（GPT-4）
- **向量数据库：** MemoryVectorStore（本地内存，无需安装）
- **其他依赖：** LangChain.js 官方包
