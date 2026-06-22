---
title: 02-chat-prompt-template.ts
---

# 02-chat-prompt-template.ts

对话式提示模板示例。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== ChatPromptTemplate 示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个语言翻译专家，将 {source_lang} 翻译成 {target_lang}。"],
    ["user", "{text}"],
  ]);

  const prompt = await promptTemplate.format({
    source_lang: "中文",
    target_lang: "英文",
    text: "你好，世界！",
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
npm run dev src/02-prompts/02-chat-prompt-template.ts
```
