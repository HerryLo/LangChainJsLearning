---
title: 03-embeddings.ts
---

# 03-embeddings.ts

向量化示例，将文本转换为向量表示。

## 功能介绍

这个示例演示了如何使用 OpenAIEmbeddings 将文本转换为向量（embedding）。向量是文本的数值表示，可以用于计算相似度、聚类等任务。

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
import { OpenAIEmbeddings } from "@langchain/openai";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Embeddings 示例 ===\n");

    const embeddings = new OpenAIEmbeddings({
      model: "embedding-3",
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
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
  } catch (error) {
    console.error("Error during embeddings example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/03-embeddings.ts
```
