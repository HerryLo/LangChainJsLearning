---
title: 04-memory-in-chain.ts
---

# 04-memory-in-chain.ts

链中记忆示例，将记忆集成到完整的链系统中。

## 功能介绍

这个示例展示了记忆在实际应用中的用法：让 AI 不仅能记住对话，还能根据设定的角色进行互动（比如这里的编程老师，每次回答后会问一个巩固问题）。

## 使用场景

- 个性化对话机器人
- 教学辅导应用
- 角色扮演对话
- 需要持续交互的应用

## 学习要点

1. 系统提示可以设定 AI 的行为模式
2. 记忆和链可以无缝集成
3. 可以实现复杂的对话流程
4. 记忆让对话更自然、连贯

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== Memory in Chain 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个助手，帮助用户学习编程。每次回答后，请问一个相关的小问题来巩固学习。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  console.log("--- 第 1 轮 ---");
  console.log("用户: 什么是变量？");
  const r1 = await chainWithHistory.invoke(
    { input: "什么是变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r1);
  console.log("\n");

  console.log("--- 第 2 轮 ---");
  console.log("用户: 在 JavaScript 中如何声明变量？");
  const r2 = await chainWithHistory.invoke(
    { input: "在 JavaScript 中如何声明变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r2);
  console.log("\n");

  console.log("--- 完整对话历史 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}: ${msg.content}`);
  });
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/06-memory/04-memory-in-chain.ts
```
