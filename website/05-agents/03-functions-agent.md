---
title: 03-functions-agent.ts
---

# 03-functions-agent.ts

函数调用代理示例，使用结构化工具进行函数调用。

## 功能介绍

这个示例演示了如何使用 DynamicStructuredTool 定义带结构化输入的工具，并让模型进行函数调用。模型会根据工具的 schema 决定调用哪个工具以及传什么参数。

## 使用场景

- 需要结构化输入的工具调用
- 更精确的参数传递
- API 调用场景
- 数据库查询等需要多个参数的场景

## 学习要点

1. 使用 `DynamicStructuredTool` 创建带 schema 的工具
2. 使用 Zod 定义输入参数的 schema
3. 使用 `.bindTools()` 将工具绑定到模型上
4. 检查 `response.tool_calls` 判断模型是否想要调用工具
5. 使用 `tool.args` 获取结构化参数

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

async function main() {
  console.log("=== OpenAI Functions Agent 示例 ===\n");

  const weatherTool = new DynamicStructuredTool({
    name: "get_current_weather",
    description: "获取指定城市的当前天气",
    schema: z.object({
      city: z.string().describe("城市名称"),
      unit: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("温度单位"),
    }),
    func: async ({ city, unit }) => {
      const weatherData: Record<string, { temp: number; condition: string }> = {
        "北京": { temp: 25, condition: "晴天" },
        "上海": { temp: 22, condition: "多云" },
        "广州": { temp: 28, condition: "小雨" },
      };
      const data = weatherData[city] || { temp: 20, condition: "未知" };
      const temp = unit === "fahrenheit" ? Math.round(data.temp * 9/5 + 32) : data.temp;
      return `${city} 的天气: ${data.condition}，${temp}°${unit === "celsius" ? "C" : "F"}`;
    },
  });

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  }).bindTools([weatherTool]);

  const question = "北京今天天气怎么样？用华氏度告诉我温度。";
  console.log("问题:", question);
  console.log("\n---\n");

  const response = await model.invoke(question);

  if (response.tool_calls && response.tool_calls.length > 0) {
    console.log("工具调用:", response.tool_calls);
    console.log("\n---\n");

    const toolCall = response.tool_calls[0];
    const toolResult = await weatherTool.invoke(toolCall.args);
    console.log("工具结果:", toolResult);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/05-agents/03-functions-agent.ts
```
