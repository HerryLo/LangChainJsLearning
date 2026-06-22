---
title: 04-few-shot-prompt.ts
---

# 04-few-shot-prompt.ts

通过示例让 AI 理解任务要求（少样本学习）。

## 功能介绍

这个示例演示了如何使用 FewShotPromptTemplate 来提供一些输入输出示例，让 AI 理解任务的要求和输出格式，从而更好地完成任务。

## 使用场景

- 分类任务（如文本分类、情感分类）
- 风格模仿（如特定的写作风格）
- 格式学习（让 AI 按照特定格式输出）
- 需要明确规则的任务

## 学习要点

1. 准备 `examples` 数组，包含输入输出对
2. 定义 `examplePrompt` 来格式化每个示例
3. 使用 `FewShotPromptTemplate` 组合 prefix、examples、suffix
4. 指定 `inputVariables` 来定义最终输入的变量名

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== FewShotPromptTemplate 示例 ===\n");

  const examples = [
    { input: "苹果", output: "水果" },
    { input: "胡萝卜", output: "蔬菜" },
    { input: "香蕉", output: "水果" },
    { input: "菠菜", output: "蔬菜" },
  ];

  const examplePrompt = PromptTemplate.fromTemplate(
    "输入: {input}\n输出: {output}"
  );

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "以下是食物分类的示例，请根据示例回答：",
    suffix: "输入: {input}\n输出:",
    inputVariables: ["input"],
  });

  const prompt = await fewShotPrompt.format({ input: "橙子" });
  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/02-prompts/04-few-shot-prompt.ts
```
