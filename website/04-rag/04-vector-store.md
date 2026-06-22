---
title: 04-vector-store.ts
---

# 04-vector-store.ts

向量存储示例。

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

  // 1. 加载文档
  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  // 2. 切分文档
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(docs);

  // 3. 创建向量存储
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

  // 4. 相似度搜索
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
