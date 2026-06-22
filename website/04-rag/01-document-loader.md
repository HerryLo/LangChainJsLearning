---
title: 01-document-loader.ts
---

# 01-document-loader.ts

文档对象示例，创建和使用 LangChain 的 Document 对象。

## 功能介绍

这个示例演示了如何创建和使用 LangChain 的 Document 对象。Document 是 LangChain 中文档的基本表示形式，包含内容和元数据。

## 使用场景

- 表示文档数据用于后续处理
- 创建文档块用于切分和向量化
- 构建自定义文档加载逻辑
- 理解 LangChain 的文档数据结构

## 学习要点

1. 使用 `Document` 从 `@langchain/core/documents` 创建文档对象
2. `pageContent` 属性存储文档的文本内容
3. `metadata` 属性存储文档的元数据（如来源、作者等）
4. Document 对象可以被切分器和向量化器处理
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { Document } from "@langchain/core/documents";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Document Loading 示例 ===\n");

    // 创建一个简单的文档对象
    const doc = new Document({
      pageContent: "这是一段示例文档内容。LangChain 是一个用于开发由语言模型驱动的应用程序的框架。",
      metadata: { source: "example" }
    });

    console.log("Loaded document:");
    console.log("Content preview:", doc.pageContent.slice(0, 100));
    console.log("Metadata:", doc.metadata);
  } catch (error) {
    console.error("Error during document loading example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
```
