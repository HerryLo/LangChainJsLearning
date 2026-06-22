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

1. 使用 `RecursiveCharacterTextSplitter` 创建切分器
2. `chunkSize` 参数控制每个块的最大字符数
3. `chunkOverlap` 参数控制块之间的重叠（保持上下文连贯性）
4. 调用 `splitDocuments()` 方法进行切分

## 源码

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Text Splitter 示例 ===\n");

  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const chunks = await splitter.splitDocuments(docs);

  console.log("切分后的块数量:", chunks.length);
  console.log("\n");

  chunks.forEach((chunk, i) => {
    console.log(`--- 块 ${i + 1} ---`);
    console.log(chunk.pageContent);
    console.log();
  });
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/02-text-splitter.ts
```
