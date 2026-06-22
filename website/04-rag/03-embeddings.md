---
title: 03-embeddings.ts
---

# 03-embeddings.ts

向量化示例。

## 源码

```typescript
import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";

async function main() {
  console.log("=== Embeddings 示例 ===\n");

  const embeddings = new OpenAIEmbeddings({
    modelName: "embedding-3",
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 嵌入单个文本
  const text = "Hello, world!";
  const embedding = await embeddings.embedQuery(text);

  console.log("文本:", text);
  console.log("嵌入维度:", embedding.length);
  console.log("嵌入向量前 5 个值:", embedding.slice(0, 5));
  console.log("\n");

  // 嵌入多个文本
  const texts = ["猫是宠物", "狗是宠物", "鱼是宠物"];
  const embeddingsResult = await embeddings.embedDocuments(texts);

  console.log("嵌入多个文本:");
  texts.forEach((t, i) => {
    console.log(`  "${t}" → 维度 ${embeddingsResult[i].length}`);
  });
}

main().catch(console.error);
```
## 运行方式
```bash
npm run dev src/04-rag/03-embeddings.ts
```
