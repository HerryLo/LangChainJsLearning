---
title: 02-chat-model.ts
---

# 02-chat-model.ts

多轮对话示例，展示如何使用 SystemMessage 和 HumanMessage 构建对话历史。

## 功能介绍

这个示例演示了如何使用 LangChain 的消息类型进行多轮对话。通过将 AI 的回复也加入消息数组，可以让模型记住之前的对话内容，实现连贯的多轮交流。

## 使用场景

- 多轮对话机器人
- 角色设定（如编程助手、客服等）
- 需要上下文记忆的对话应用
- 对话历史追踪和展示

## 学习要点

1. 三种消息类型：SystemMessage（系统设定）、HumanMessage（用户输入）、AIMessage（AI 回复）
2. 如何构建初始对话数组
3. 如何使用 `push()` 方法追加消息，实现多轮对话
4. 每次调用 `model.invoke()` 时传入完整的消息数组
5. 如何进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";

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
    console.log("=== 多轮对话示例 ===\n");

    console.log("--- 第一轮对话 ---");
    const messages: BaseMessage[] = [
      new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
      new HumanMessage("什么是 LangChain？"),
    ];
    const response1 = await model.invoke(messages);
    console.log("用户: 什么是 LangChain？");
    console.log("AI:", response1.content);
    console.log();

    console.log("--- 第二轮对话 ---");
    messages.push(new AIMessage(response1.content as string));
    messages.push(new HumanMessage("它有什么特点？"));
    const response2 = await model.invoke(messages);
    console.log("用户: 它有什么特点？");
    console.log("AI:", response2.content);
    console.log();

    console.log("--- 第三轮对话 ---");
    messages.push(new AIMessage(response2.content as string));
    messages.push(new HumanMessage("它适合做什么项目？"));
    const response3 = await model.invoke(messages);
    console.log("用户: 它适合做什么项目？");
    console.log("AI:", response3.content);
  } catch (error) {
    console.error("Error during chat:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/01-setup/02-chat-model.ts
```
