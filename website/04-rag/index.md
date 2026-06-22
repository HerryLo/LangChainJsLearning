---
title: 模块 4：RAG（检索增强生成）
---

# 模块 4：RAG（检索增强生成）

## 学习要点

- Document Loader：加载各种格式的文档
- Text Splitter：将文档切分成合适的块
- Embeddings：将文本转换成向量
- Vector Store：存储和检索向量
- Retrieval QA：端到端的 RAG 问答系统

## 示例列表

- [01-document-loader](01-document-loader.md) - 文档加载器
- [02-text-splitter](02-text-splitter.md) - 文本切分器
- [03-embeddings](03-embeddings.md) - 向量化
- [04-vector-store](04-vector-store.md) - 向量存储
- [05-retrieval-qa](05-retrieval-qa.md) - 检索问答

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
npm run dev src/04-rag/02-text-splitter.ts
npm run dev src/04-rag/03-embeddings.ts
npm run dev src/04-rag/04-vector-store.ts
npm run dev src/04-rag/05-retrieval-qa.ts
```
