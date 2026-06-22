# 同步 Website 代码与 Src 源代码设计文档

**日期：** 2026-06-22

**目标：** 将 website 文档中的代码与 src 源代码同步，以 src 为准，并保留 src 中的丰富教学注释信息。

## 背景

目前发现 website 文档中的代码示例与 src 源代码存在以下差异：
- 模型名称不一致（glm-4 vs Doubao-Seed-2.0-Code vs Doubao-Seed-2.0-pro）
- API 配置不一致（部分有 configuration 配置，部分没有）
- temperature 参数不一致
- src 源代码有丰富的中文教学注释，website 中缺失

## 设计方案

### 页面结构

每个 .md 文档页面将包含以下结构化章节：

```
---
title: 文件名.ts
---

# 文件名.ts

简短描述...

## 功能介绍
（从 src 的【功能介绍】注释提取）

## 使用场景
（从 src 的【使用场景】注释提取）

## 学习要点
（从 src 的【学习要点】注释提取，如果有）

## 源码
```typescript
（简洁的代码块，但配置必须与 src 完全一致）
```

## 查看原文件
- 源码位置: [...]

## 运行方式
```bash
...
```
```

### 处理规则

1. **代码配置同步：**
   - 模型名称必须与 src 完全一致
   - temperature 参数必须与 src 完全一致
   - API configuration（baseURL、apiKey）必须与 src 完全一致
   - 其他代码逻辑保持与 src 一致

2. **注释提取规则：**
   - 提取【功能介绍】块到"## 功能介绍"章节
   - 提取【使用场景】块到"## 使用场景"章节
   - 提取【学习要点】块到"## 学习要点"章节
   - 提取行内的【功能】【使用场景】【参数】注释，整理为说明文字
   - 代码块本身保持简洁，只包含代码，不包含详细注释

3. **兼容性处理：**
   - 对于没有详细注释的 src 文件，保持现有简洁结构，但确保代码配置与 src 一致
   - 对于有部分注释的 src 文件，提取存在的部分

### 文件清单

需要更新的文件：

**模块 1 - Setup:**
- website/01-setup/01-simple-llm.md
- website/01-setup/02-chat-model.md

**模块 2 - Prompts:**
- website/02-prompts/01-prompt-template.md
- website/02-prompts/02-chat-prompt-template.md
- website/02-prompts/03-output-parser.md
- website/02-prompts/04-few-shot-prompt.md

**模块 3 - Chains:**
- website/03-chains/01-llm-chain.md
- website/03-chains/02-sequential-chain.md
- website/03-chains/03-router-chain.md
- website/03-chains/04-transform-chain.md

**模块 4 - RAG:**
- website/04-rag/01-document-loader.md
- website/04-rag/02-text-splitter.md
- website/04-rag/03-embeddings.md
- website/04-rag/04-vector-store.md
- website/04-rag/05-retrieval-qa.md

**模块 5 - Agents:**
- website/05-agents/01-tools.md
- website/05-agents/02-react-agent.md
- website/05-agents/03-functions-agent.md

**模块 6 - Memory:**
- website/06-memory/01-buffer-memory.md
- website/06-memory/02-window-memory.md
- website/06-memory/03-summary-memory.md
- website/06-memory/04-memory-in-chain.md

共计：24 个文件

## 成功标准

- 所有 website 文档中的代码配置与 src 完全一致
- 所有 src 中的教学注释信息都被提取并结构化展示
- 文档结构清晰，代码简洁易读
- 构建无错误
