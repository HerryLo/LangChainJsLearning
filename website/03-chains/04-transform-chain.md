---
title: 04-transform-chain.ts
---

# 04-transform-chain.ts

转换链示例，在链中自定义数据处理逻辑。

## 功能介绍

这个示例演示了如何在链中插入自定义的转换函数，可以在数据传递过程中进行处理、计算或添加额外信息，然后再传给下一个组件。

## 使用场景

- 需要预处理输入数据（如统计、清洗）
- 希望在链中添加额外的上下文信息
- 需要在模型调用前后进行数据转换
- 自定义数据处理管道

## 学习要点

1. 自定义函数也可以用 `.pipe()` 串联到链中
2. 转换函数接收上一步的输出，返回下一步需要的输入
3. 可以在转换函数中进行任意计算（如字数统计、数据格式化等）
4. 转换函数应该返回对象格式，方便后续提示模板使用

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
  console.log("=== TransformChain（数据转换）示例 ===\n");

  const transformInput = (input: { text: string }) => ({
    text: input.text,
    wordCount: input.text.split(/\s+/).length,
    characterCount: input.text.length,
  });

  const promptTemplate = ChatPromptTemplate.fromTemplate(`
    分析以下文本的摘要：

    文本: {text}
    字数统计: {wordCount} 词，{characterCount} 字

    请提供摘要。
  `);

  const chain = transformInput
    .pipe(promptTemplate)
    .pipe(model)
    .pipe(new StringOutputParser());

  const text = `
    LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
    它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
    无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
  `.trim();

  const result = await chain.invoke({ text });
  console.log(result);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/03-chains/04-transform-chain.ts
```
