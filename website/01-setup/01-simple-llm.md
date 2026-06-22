---
title: 01-simple-llm.ts
---

# 01-simple-llm.ts

最简单的 LLM 调用示例，展示如何初始化模型并获取回复。

## 功能介绍

这是 LangChain.js 最基础的用法：直接调用大语言模型获取回复。

## 使用场景

- 简单的问答对话
- 单次文本生成（如写邮件、写代码等）
- 不需要上下文记忆的场景
- 快速验证 API 配置是否正确

## 学习要点

1. 如何初始化 ChatOpenAI 模型
2. 如何配置 model 参数选择不同模型
3. 如何使用 temperature 调节回复的随机性
4. 如何调用 model.invoke() 获取回复
5. 如何进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-Code",
  temperature: 0.7,
});

async function main() {
  try {
    console.log("=== 简单的 LLM 调用示例 ===\n");
    const response = await model.invoke("你好，请介绍一下你自己。");
    console.log("AI 回复:", response.content);
  } catch (error) {
    console.error("Error during LLM call:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/01-setup/01-simple-llm.ts
```
