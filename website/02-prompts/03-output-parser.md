---
title: 03-output-parser.ts
---

# 03-output-parser.ts

使用 Zod 定义结构化输出格式，让 AI 返回可解析的数据。

## 功能介绍

这个示例演示了如何使用 `model.withStructuredOutput()` 配合 Zod schema 来定义期望的输出格式。AI 会直接返回符合 schema 的结构化对象，无需手动解析。

## 使用场景

- 情感分析任务
- 数据提取（如从文本中提取联系人信息）
- API 参数生成
- 分类任务的结构化结果
- 需要后续程序处理的 AI 输出

## 学习要点

1. 使用 Zod 定义 schema：`z.object()`、`z.enum()`、`z.number()` 等
2. 使用 `model.withStructuredOutput(schema)` 创建结构化输出模型（推荐方式）
3. 直接调用 `.invoke()` 返回符合 schema 的对象，无需手动解析
4. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

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
    console.log("=== 结构化输出示例 ===\n");

    const schema = z.object({
      sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
      confidence: z.number().min(0).max(1).describe("置信度"),
      reasoning: z.string().describe("分析理由"),
    });

    // 使用推荐的 withStructuredOutput API
    const structuredModel = model.withStructuredOutput(schema);

    const text = "这家餐厅的食物非常好吃，服务也很棒！";
    console.log("分析文本:", text);
    console.log("\n---\n");

    const result = await structuredModel.invoke(
      `分析以下文本的情感：\n${text}`
    );

    console.log("解析结果:", result);
  } catch (error) {
    console.error("Error during output parser example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/02-prompts/03-output-parser.ts
```
