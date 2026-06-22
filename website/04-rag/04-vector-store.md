---
title: 04-vector-store.ts
---

# 04-vector-store.ts

向量化示例，将文本转换为向量表示。

## 功能介绍

这个示例演示了如何使用 OpenAIEmbeddings 将文本转换为向量（embedding），包括单个查询文本和多个文档块的向量化。

## 使用场景

- 将文档转换为向量存储
- 计算文本之间的相似度
- 构建语义搜索系统
- 文本聚类和分类

## 学习要点

1. 使用 `OpenAIEmbeddings` 创建向量化器
2. 使用 `model` 而不是 `modelName` 参数
3. `embedQuery()` 用于向量化单个查询文本
4. `embedDocuments()` 用于批量向量化多个文档
5. 向量是浮点数数组，维度取决于模型
6. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Embeddings 示例 ===\n");

    // 创建示例文档
    const doc = new Document({
      pageContent: "LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它提供了一套丰富的工具和组件。",
      metadata: { source: "example" }
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const chunks: Document[] = await splitter.splitDocuments([doc]);

    // 创建 embeddings
    const embeddings = new OpenAIEmbeddings({
      model: "embedding-3",
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    });

    // 嵌入单个文本
    const query = "LangChain 的主要概念有哪些？";
    const queryEmbedding = await embeddings.embedQuery(query);

    console.log("Query:", query);
    console.log("Embedding dimension:", queryEmbedding.length);
    console.log("First 5 values:", queryEmbedding.slice(0, 5));
    console.log("\n");

    // 嵌入文档块
    const chunkTexts = chunks.map((chunk: Document) => chunk.pageContent);
    const chunkEmbeddings = await embeddings.embedDocuments(chunkTexts);

    console.log("Embedded", chunkEmbeddings.length, "chunks");
    chunkTexts.forEach((text: string, i: number) => {
      console.log(`Chunk ${i + 1}: "${text.slice(0, 50)}..."`);
    });
  } catch (error) {
    console.error("Error during embeddings example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/04-vector-store.ts
```
