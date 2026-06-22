---
title: 02-sequential-chain.ts
---

# 02-sequential-chain.ts

顺序链示例，将多个步骤串联起来，前一步的输出作为后一步的输入。

## 功能介绍

这个示例演示了如何将多个链串联起来，形成更复杂的工作流。第一条链生成文章大纲，第二条链根据大纲写完整文章，整个过程自动执行。

## 使用场景

- 多步骤内容生成（如先写大纲再写文章）
- 需要分步处理的复杂任务
- 数据转换管道
- 工作流自动化

## 学习要点

1. 先创建多个独立的子链
2. 使用 `.pipe()` 将前一个链的输出转换为后一个链需要的输入格式
3. 注意数据传递时的格式匹配
4. 最终的链可以像单个链一样调用 `invoke()`

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 顺序链示例 ===\n");

  const outlinePrompt = ChatPromptTemplate.fromTemplate(
    "请为主题 '{topic}' 生成一篇文章的大纲。"
  );
  const outlineChain = outlinePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const articlePrompt = ChatPromptTemplate.fromTemplate(
    "根据以下大纲写一篇完整的文章：\n\n{outline}"
  );
  const articleChain = articlePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const fullChain = outlineChain.pipe((outline) => ({ outline })).pipe(articleChain);

  const result = await fullChain.invoke({ topic: "人工智能的未来" });
  console.log(result);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/03-chains/02-sequential-chain.ts
```
