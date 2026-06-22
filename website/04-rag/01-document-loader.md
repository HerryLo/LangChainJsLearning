---
title: 01-document-loader.ts
---

# 01-document-loader.ts

文档加载器示例，从文件系统读取文档内容。

## 功能介绍

这个示例演示了如何使用 TextLoader 从文件系统加载文本文档。加载后的文档包含内容和元数据，可以进行后续处理。

## 使用场景

- 从本地文件读取知识库内容
- 加载文档用于后续处理（如切分、向量化）
- 构建 RAG 系统的第一步
- 批量读取多个文档文件

## 学习要点

1. 使用 `TextLoader` 加载文本文件
2. 调用 `load()` 方法获取文档数组
3. 每个文档包含 `pageContent`（内容）和 `metadata`（元数据）
4. 需要正确处理文件路径（这里使用了 __dirname）

## 源码

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Document Loader 示例 ===\n");

  const textLoader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await textLoader.load();

  console.log("加载的文档数量:", docs.length);
  console.log("\n文档内容预览:");
  console.log(docs[0].pageContent.slice(0, 200) + "...");
  console.log("\n元数据:", docs[0].metadata);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
```
