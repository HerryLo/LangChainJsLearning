---
title: 01-prompt-template.ts
---

# 01-prompt-template.ts

使用模板和变量动态生成提示词，避免重复写相同的提示。

## 功能介绍

使用模板和变量动态生成提示词，避免重复写相同的提示。

## 使用场景

- 同一类问题批量提问（如翻译、摘要等）
- 需要动态替换某些内容的场景
- 标准化提示格式

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
