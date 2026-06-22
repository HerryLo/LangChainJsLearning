---
title: 增强网站文档设计
date: 2026-06-22
---

# 增强网站文档设计

## 目标

为 website 目录下的所有 24 个教程 md 文件添加完整的说明文档，包括功能介绍、使用场景和学习要点。

## 背景

目前网站中的教程文件状态不统一：
- 部分文件（如 01-simple-llm.md）已有完整的文档结构
- 大部分文件只有源码和运行方式，缺少说明
- 用户希望统一文档结构，提升教程质量

## 统一文档结构

所有教程文件统一使用以下结构：

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

列出 3-6 个关键学习点，包括：
- 关键 API 调用
- 配置参数说明
- 核心概念理解

## 源码

```typescript
// 保持原有源码不变
```

## 运行方式

```bash
npm run dev src/路径/文件.ts
```
```

## 更新范围

共 24 个文件，按模块分类：

### 01-setup (2个)
- 01-simple-llm.md
- 02-chat-model.md

### 02-prompts (4个)
- 01-prompt-template.md
- 02-chat-prompt-template.md
- 03-output-parser.md
- 04-few-shot-prompt.md

### 03-chains (4个)
- 01-llm-chain.md
- 02-sequential-chain.md
- 03-router-chain.md
- 04-transform-chain.md

### 04-rag (5个)
- 01-document-loader.md
- 02-text-splitter.md
- 03-embeddings.md
- 04-vector-store.md
- 05-retrieval-qa.md

### 05-agents (3个)
- 01-tools.md
- 02-react-agent.md
- 03-functions-agent.md

### 06-memory (4个)
- 01-buffer-memory.md
- 02-window-memory.md
- 03-summary-memory.md
- 04-memory-in-chain.md

## 实现方式

采用方案 A：逐个手动更新

1. 按模块顺序逐个处理文件
2. 先阅读源码，理解功能
3. 按照统一结构撰写说明
4. 保持源码不变
5. 保持风格一致，语言简洁明了

## 约束

- 源码部分保持完全不变
- 只修改/添加说明部分
- 所有文件结构统一
- 文档语言为中文
