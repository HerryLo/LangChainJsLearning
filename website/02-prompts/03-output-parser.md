---
title: 03-output-parser.ts
---

# 03-output-parser.ts

使用 Zod 定义结构化输出格式，让 AI 返回可解析的数据。

## 功能介绍

这个示例演示了如何使用 StructuredOutputParser 和 Zod schema 来定义期望的输出格式。AI 会按照指定的结构返回数据，我们可以直接解析使用。

## 使用场景

- 情感分析任务
- 数据提取（如从文本中提取联系人信息）
- API 参数生成
- 分类任务的结构化结果
- 需要后续程序处理的 AI 输出

## 学习要点

1. 使用 Zod 定义 schema：`z.object()`、`z.enum()`、`z.number()` 等
2. 使用 `StructuredOutputParser.fromZodSchema()` 创建解析器
3. 使用 `parser.getFormatInstructions()` 获取格式说明插入提示中
4. 使用 `parser.parse()` 解析 AI 返回的内容

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 结构化输出解析器示例 ===\n");

  const schema = z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
    confidence: z.number().min(0).max(1).describe("置信度"),
    reasoning: z.string().describe("分析理由"),
  });

  const parser = StructuredOutputParser.fromZodSchema(schema);

  const promptTemplate = ChatPromptTemplate.fromTemplate(`
    分析以下文本的情感。

    {format_instructions}

    文本: {text}
  `);

  const prompt = await promptTemplate.format({
    format_instructions: parser.getFormatInstructions(),
    text: "这家餐厅的食物非常好吃，服务也很棒！",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  const parsed = await parser.parse(response.content as string);

  console.log("解析结果:", parsed);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/02-prompts/03-output-parser.ts
```
