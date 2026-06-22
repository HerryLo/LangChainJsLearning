---
title: 01-llm-chain.ts
---

# 01-llm-chain.ts

使用 LCEL 构建基本的 LLM 链，将提示模板、模型和输出解析器串联起来。

## 功能介绍

这个示例演示了如何使用 LangChain Expression Language (LCEL) 的 `.pipe()` 语法来构建基本的链。链将提示模板、模型调用和输出解析器组合成一个可重用的工作流。

## 使用场景

- 标准化的问答任务
- 需要重复执行相似流程的任务
- 简单的文本生成应用
- 链式调用的基础构建块

## 学习要点

1. 使用 `.pipe()` 方法串联组件
2. `promptTemplate.pipe(model).pipe(parser)` 的基本链式结构
3. 使用 `chain.invoke()` 传入输入并执行整个链
4. `StringOutputParser` 将模型输出转换为字符串

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
  console.log("=== LLMChain（使用 LCEL）示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromTemplate(
    "你是一个专业的厨师。请提供一个 {dish} 的做法。"
  );

  const chain = promptTemplate
    .pipe(model)
    .pipe(new StringOutputParser());

  const result = await chain.invoke({ dish: "番茄炒蛋" });
  console.log(result);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/03-chains/01-llm-chain.ts
```
