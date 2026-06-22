---
title: 01-buffer-memory.ts
---

# 01-buffer-memory.ts

完整对话历史记忆示例，保留所有对话消息。

## 功能介绍

这个示例演示了如何使用 RunnableWithMessageHistory 让链记住对话历史。每次调用时，历史消息会自动添加到提示中，让 AI 知道之前说过什么。

## 使用场景

- 对话机器人应用
- 需要记住上下文的聊天系统
- 多轮对话场景
- 客户服务聊天机器人

## 学习要点

1. 在提示模板中使用 `MessagesPlaceholder("history")` 占位
2. 创建 `ChatMessageHistory` 实例存储消息
3. 使用 `RunnableWithMessageHistory` 包装原有的链
4. 调用时需要传入 `configurable: { sessionId: "..." }` 来标识会话
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== ConversationBufferMemory 示例 ===\n");

    const model = new ChatOpenAI({
      model: "DeepSeek-V4-Pro",
      temperature: 0.7,
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
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

    console.log("用户: 你好，我叫小明");
    const response1 = await chainWithHistory.invoke(
      { input: "你好，我叫小明" },
      { configurable: { sessionId: "123" } }
    );
    console.log("AI:", response1);
    console.log("\n");

    console.log("用户: 我叫什么名字？");
    const response2 = await chainWithHistory.invoke(
      { input: "我叫什么名字？" },
      { configurable: { sessionId: "123" } }
    );
    console.log("AI:", response2);
    console.log("\n");

    console.log("--- 历史消息 ---");
    const messages = await messageHistory.getMessages();
    messages.forEach((msg) => {
      console.log(`${msg._getType()}: ${msg.content}`);
    });
  } catch (error) {
    console.error("Error during buffer memory example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/06-memory/01-buffer-memory.ts
```
