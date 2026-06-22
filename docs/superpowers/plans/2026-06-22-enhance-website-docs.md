# 增强网站文档实现计划

&gt; **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 website 目录下的所有 24 个教程 md 文件添加完整的说明文档（功能介绍、使用场景、学习要点），统一使用 01-simple-llm.md 的结构。

**Architecture:** 按模块逐个更新文件，每个模块完成后提交。保持源码完全不变，只修改/添加说明部分。

**Tech Stack:** Markdown, Git

---

## 统一文档结构模板

所有文件将使用以下结构：

```markdown
---
title: 文件名.ts
---

# 文件名.ts

一句话简介

## 功能介绍

详细说明这个示例的功能和作用

## 使用场景

列出 3-5 个适用场景

## 学习要点

列出 3-6 个关键学习点

## 源码

```typescript
// 保持原有源码不变
```

## 运行方式

```bash
npm run dev src/路径/文件.ts
```
```

---

## 任务分解

### 任务 1: 更新 01-setup 模块

**Files:**
- Modify: `website/01-setup/01-simple-llm.md`
- Modify: `website/01-setup/02-chat-model.md`

- [ ] **Step 1: 更新 01-simple-llm.md**

读取现有内容，确保结构完整，语言简洁，必要时微调使其符合统一标准。

- [ ] **Step 2: 更新 02-chat-model.md**

按照统一结构添加：
- 一句话简介
- 功能介绍（说明这是多轮对话示例，如何使用 SystemMessage/HumanMessage/AIMessage）
- 使用场景（多轮对话、角色设定、上下文记忆等）
- 学习要点（消息类型、如何构建对话历史、如何追加消息等）

- [ ] **Step 3: 提交 01-setup 模块**

```bash
git add website/01-setup/
git commit -m "docs: enhance 01-setup module documentation"
```

---

### 任务 2: 更新 02-prompts 模块

**Files:**
- Modify: `website/02-prompts/01-prompt-template.md`
- Modify: `website/02-prompts/02-chat-prompt-template.md`
- Modify: `website/02-prompts/03-output-parser.md`
- Modify: `website/02-prompts/04-few-shot-prompt.md`

- [ ] **Step 1: 更新 01-prompt-template.md**

确保结构完整，必要时微调。

- [ ] **Step 2: 更新 02-chat-prompt-template.md**

添加：
- 一句话简介
- 功能介绍（使用 ChatPromptTemplate 构建对话式提示）
- 使用场景（翻译、对话机器人、角色设定等）
- 学习要点（ChatPromptTemplate.fromMessages、system/user 消息格式、变量替换等）

- [ ] **Step 3: 更新 03-output-parser.md**

添加：
- 一句话简介
- 功能介绍（使用 Zod 定义结构化输出格式）
- 使用场景（情感分析、数据提取、API 参数生成等）
- 学习要点（Zod schema 定义、StructuredOutputParser、formatInstructions 等）

- [ ] **Step 4: 更新 04-few-shot-prompt.md**

添加：
- 一句话简介
- 功能介绍（通过示例让 AI 理解任务要求）
- 使用场景（分类任务、风格模仿、格式学习等）
- 学习要点（FewShotPromptTemplate、examples 数组、examplePrompt 等）

- [ ] **Step 5: 提交 02-prompts 模块**

```bash
git add website/02-prompts/
git commit -m "docs: enhance 02-prompts module documentation"
```

---

### 任务 3: 更新 03-chains 模块

**Files:**
- Modify: `website/03-chains/01-llm-chain.md`
- Modify: `website/03-chains/02-sequential-chain.md`
- Modify: `website/03-chains/03-router-chain.md`
- Modify: `website/03-chains/04-transform-chain.md`

- [ ] **Step 1: 更新 01-llm-chain.md**

添加完整的说明结构。

- [ ] **Step 2: 更新 02-sequential-chain.md**

添加完整的说明结构。

- [ ] **Step 3: 更新 03-router-chain.md**

添加完整的说明结构。

- [ ] **Step 4: 更新 04-transform-chain.md**

添加完整的说明结构。

- [ ] **Step 5: 提交 03-chains 模块**

```bash
git add website/03-chains/
git commit -m "docs: enhance 03-chains module documentation"
```

---

### 任务 4: 更新 04-rag 模块

**Files:**
- Modify: `website/04-rag/01-document-loader.md`
- Modify: `website/04-rag/02-text-splitter.md`
- Modify: `website/04-rag/03-embeddings.md`
- Modify: `website/04-rag/04-vector-store.md`
- Modify: `website/04-rag/05-retrieval-qa.md`

- [ ] **Step 1: 更新 01-document-loader.md**

添加完整的说明结构。

- [ ] **Step 2: 更新 02-text-splitter.md**

添加完整的说明结构。

- [ ] **Step 3: 更新 03-embeddings.md**

添加完整的说明结构。

- [ ] **Step 4: 更新 04-vector-store.md**

添加完整的说明结构。

- [ ] **Step 5: 更新 05-retrieval-qa.md**

添加完整的说明结构。

- [ ] **Step 6: 提交 04-rag 模块**

```bash
git add website/04-rag/
git commit -m "docs: enhance 04-rag module documentation"
```

---

### 任务 5: 更新 05-agents 模块

**Files:**
- Modify: `website/05-agents/01-tools.md`
- Modify: `website/05-agents/02-react-agent.md`
- Modify: `website/05-agents/03-functions-agent.md`

- [ ] **Step 1: 更新 01-tools.md**

添加完整的说明结构。

- [ ] **Step 2: 更新 02-react-agent.md**

添加完整的说明结构。

- [ ] **Step 3: 更新 03-functions-agent.md**

添加完整的说明结构。

- [ ] **Step 4: 提交 05-agents 模块**

```bash
git add website/05-agents/
git commit -m "docs: enhance 05-agents module documentation"
```

---

### 任务 6: 更新 06-memory 模块

**Files:**
- Modify: `website/06-memory/01-buffer-memory.md`
- Modify: `website/06-memory/02-window-memory.md`
- Modify: `website/06-memory/03-summary-memory.md`
- Modify: `website/06-memory/04-memory-in-chain.md`

- [ ] **Step 1: 更新 01-buffer-memory.md**

添加完整的说明结构。

- [ ] **Step 2: 更新 02-window-memory.md**

添加完整的说明结构。

- [ ] **Step 3: 更新 03-summary-memory.md**

添加完整的说明结构。

- [ ] **Step 4: 更新 04-memory-in-chain.md**

添加完整的说明结构。

- [ ] **Step 5: 提交 06-memory 模块**

```bash
git add website/06-memory/
git commit -m "docs: enhance 06-memory module documentation"
```

---

## 最终验证

- [ ] **Step 1: 检查所有文件**

运行 grep 确认没有遗漏：
```bash
grep -r "## 功能介绍" website/01-setup website/02-prompts website/03-chains website/04-rag website/05-agents website/06-memory
```

- [ ] **Step 2: 最终提交（如有需要）**
