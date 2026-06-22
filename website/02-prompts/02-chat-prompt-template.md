---
title: 02-chat-prompt-template.ts
---

# 02-chat-prompt-template.ts

使用 ChatPromptTemplate 构建对话式提示模板，支持多角色消息和变量替换。

## 功能介绍

这个示例演示了如何使用 ChatPromptTemplate 创建对话风格的提示模板。你可以定义 system 和 user 消息，并在其中插入变量，实现灵活的提示生成。

## 使用场景

- 多语言翻译工具
- 角色设定对话机器人
- 需要动态替换内容的对话系统
- 标准化的提示格式生成

## 学习要点

1. 使用 `ChatPromptTemplate.fromMessages()` 创建对话模板
2. system 和 user 消息格式：`["system", "内容"]`、`["user", "内容"]`
3. 使用 `{变量名}` 定义可替换的变量
4. 使用 `format()` 方法传入实际值生成完整提示
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  try {
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
  } catch (error) {
    console.error("Error during chat prompt template example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/02-prompts/02-chat-prompt-template.ts
```
