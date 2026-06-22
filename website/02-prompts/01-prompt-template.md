---
title: 01-prompt-template.ts
---

# 01-prompt-template.ts

使用模板和变量动态生成提示词，避免重复写相同的提示。

## 功能介绍

这个示例演示了如何使用 PromptTemplate 创建可重用的提示模板。通过在模板中定义变量，可以动态生成不同的提示，避免重复编写相似的内容。

## 使用场景

- 同一类问题批量提问（如翻译、摘要等）
- 需要动态替换某些内容的场景
- 标准化提示格式

## 学习要点

1. 使用 `PromptTemplate.fromTemplate()` 创建模板
2. 使用 `{变量名}` 定义占位变量
3. 使用 `format()` 方法传入实际值生成完整提示
4. 模板可以反复使用，只需替换不同的变量值

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "GLM-5.1",
  temperature: 0.7,
});

async function main() {
  console.log("=== PromptTemplate 示例 ===\n");

  const promptTemplate = PromptTemplate.fromTemplate(
    "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
  );

  const prompt = await promptTemplate.format({
    profession: "翻译员",
    topic: "Hello World 这句话的意思",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/02-prompts/01-prompt-template.ts
```
