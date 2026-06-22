---
title: 04-vector-store.ts
---

# 04-vector-store.ts

向量存储示例，存储文档向量并进行相似度搜索。

## 功能介绍

这个示例演示了如何使用 MemoryVectorStore 将文档向量化并存储在内存中，然后进行相似度搜索，找到与查询最相关的文档块。

## 使用场景

- 构建本地知识库检索
- 实现语义搜索功能
- 准备 RAG 系统的检索部分
- 快速原型开发和测试

## 学习要点

1. 使用 `MemoryVectorStore.fromDocuments()` 创建向量存储
2. 需要传入文档切分块和 embeddings 对象
3. 使用 `similaritySearch(query, k)` 进行搜索，k 是返回结果数量
4. 搜索结果按相似度排序返回

## 源码

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Vector Store 示例 ===\n");

  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings({
    modelName: "embedding-3",
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    chunks,
    embeddings
  );

  const query = "LangChain 的主要概念有哪些？";
  console.log("查询:", query);
  console.log("\n");

  const results = await vectorStore.similaritySearch(query, 2);

  console.log("最相关的文档块:");
  results.forEach((doc, i) => {
    console.log(`\n--- 结果 ${i + 1} ---`);
    console.log(doc.pageContent);
  });
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/04-vector-store.ts
```
