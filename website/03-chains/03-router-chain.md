---
title: 03-router-chain.ts
---

# 03-router-chain.ts

路由链示例，根据条件选择不同的处理路径。

## 功能介绍

这个示例演示了如何先对输入进行分类，然后根据分类结果选择不同的提示模板来处理。可以根据问题类型，让不同的专家角色来回答。

## 使用场景

- 根据问题类型路由到不同的处理流程
- 多专家系统（不同问题由不同角色回答）
- 条件分支的任务处理
- 需要动态选择策略的应用

## 学习要点

1. 先用一个分类链判断输入类型
2. 使用 Zod 和 StructuredOutputParser 获取结构化的分类结果
3. 根据分类结果用 switch-case 选择对应的提示模板
4. 构建并执行最终的回答链
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

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
    console.log("=== 路由链示例 ===\n");

    const classificationSchema = z.object({
      category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
    });
    const classificationParser = StructuredOutputParser.fromZodSchema(classificationSchema);

    const classificationPrompt = ChatPromptTemplate.fromTemplate(`
      将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）。

      {format_instructions}

      问题: {question}
    `);

    const classificationChain = classificationPrompt
      .pipe(model)
      .pipe(classificationParser);

    const techPrompt = ChatPromptTemplate.fromTemplate(
      "你是一个技术专家。请回答以下技术问题：\n{question}"
    );
    const cookingPrompt = ChatPromptTemplate.fromTemplate(
      "你是一个厨师。请回答以下烹饪问题：\n{question}"
    );
    const generalPrompt = ChatPromptTemplate.fromTemplate(
      "请回答以下问题：\n{question}"
    );

    const question = "怎么做红烧肉？";
    console.log("问题:", question);
    console.log("\n---\n");

    const classification = await classificationChain.invoke({
      format_instructions: classificationParser.getFormatInstructions(),
      question,
    });

    console.log("分类结果:", classification.category);
    console.log("\n---\n");

    let selectedPrompt;
    switch (classification.category) {
      case "tech":
        selectedPrompt = techPrompt;
        break;
      case "cooking":
        selectedPrompt = cookingPrompt;
        break;
      default:
        selectedPrompt = generalPrompt;
    }

    const answerChain = selectedPrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const result = await answerChain.invoke({ question });
    console.log(result);
  } catch (error) {
    console.error("Error during router chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/03-chains/03-router-chain.ts
```
