---
title: 02-window-memory.ts
---

# 02-window-memory.ts

窗口记忆示例，只保留最近的对话消息。

## 功能介绍

这个示例演示了窗口记忆的概念。虽然示例中还是保存了所有历史，但实际使用时可以只保留最近的 N 轮对话，避免上下文窗口溢出。

## 使用场景

- 长对话应用（防止上下文过长）
- 只需要最近记忆的场景
- 控制 token 使用量
- 会话历史管理

## 学习要点

1. 可以手动控制添加到历史中的消息
2. 使用 `addUserMessage()` 和 `addAIChatMessage()` 添加消息
3. 实际项目中可以实现滑动窗口逻辑
4. 平衡记忆完整性和 token 成本

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationBufferWindowMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。"],
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

  const demoMessages = [
    "你好，我叫小明",
    "你好小明！很高兴认识你。",
    "我喜欢吃苹果",
    "苹果是很健康的水果！",
    "我也喜欢吃香蕉",
    "香蕉也很美味，富含钾。",
  ];

  for (let i = 0; i < demoMessages.length; i += 2) {
    await messageHistory.addUserMessage(demoMessages[i]);
    await messageHistory.addAIChatMessage(demoMessages[i + 1]);
  }

  console.log("--- 完整历史 ---");
  const allMessages = await messageHistory.getMessages();
  allMessages.forEach((msg) => {
    console.log(`${msg._getType()}: ${msg.content}`);
  });
  console.log("\n");

  console.log("--- 窗口记忆（只保留最近 2 轮对话）---");
  console.log("用户: 我刚才说我喜欢吃什么水果？");
  const response = await chainWithHistory.invoke(
    { input: "我刚才说我喜欢吃什么水果？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/06-memory/02-window-memory.ts
```
