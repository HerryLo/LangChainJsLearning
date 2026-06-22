---
title: 02-text-splitter.ts
---

# 02-text-splitter.ts

文本切分器示例，将长文档切分成适合的块大小。

## 功能介绍

这个示例演示了如何使用 RecursiveCharacterTextSplitter 将长文档切分成较小的块。切分后的块更适合向量化和检索，也便于放入模型的上下文窗口。

## 使用场景

- 长文档预处理，适合模型输入限制
- 准备文档用于向量化和检索
- 控制每个块的大小和重叠程度
- 保持上下文连贯性的同时切分文档

## 学习要点

1. 使用 `RecursiveCharacterTextSplitter` 从 `@langchain/textsplitters` 创建切分器
2. `chunkSize` 参数控制每个块的最大字符数
3. `chunkOverlap` 参数控制块之间的重叠（保持上下文连贯性）
4. 调用 `splitDocuments()` 方法进行切分
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Text Splitter 示例 ===\n");

    // 创建一个示例文档
    const doc = new Document({
      pageContent: `LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
LangChain 的核心理念是组合性，即可以将多个组件组合在一起创建更复杂的应用。
主要概念包括：Models（模型）、Prompts（提示）、Chains（链）、Agents（代理）、Memory（记忆）。`,
      metadata: { source: "example" }
    });

    // 创建切分器
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const chunks: Document[] = await splitter.splitDocuments([doc]);

    console.log("切分后的块数量:", chunks.length);
    console.log("\n");

    chunks.forEach((chunk: Document, i: number) => {
      console.log(`--- 块 ${i + 1} ---`);
      console.log(chunk.pageContent);
      console.log();
    });
  } catch (error) {
    console.error("Error during text splitter example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/02-text-splitter.ts
```
