---
title: 02-react-agent.ts
---

# 02-react-agent.ts

ReAct 代理示例，能够推理并使用工具解决问题。

## 功能介绍

这个示例演示了如何让模型使用工具进行推理。模型可以根据问题自主决定何时使用工具、使用哪个工具，并根据工具返回的结果继续推理。

## 使用场景

- 需要多步推理的复杂任务
- 需要结合多个工具的任务
- 自动问答系统
- 智能助手应用

## 学习要点

1. 使用 `.bindTools()` 将工具绑定到模型上
2. 模型会自动决定何时调用工具
3. 检查 `response.tool_calls` 判断模型是否想要调用工具
4. 手动执行工具调用并处理结果
5. 进行环境变量检查和错误处理

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== ReAct Agent 示例 ===\n");

    // 1. 定义工具
    const tools = [
      new DynamicTool({
        name: "get_current_weather",
        description: "获取指定城市的当前天气。输入应该是城市名称，例如 '北京' 或 '上海'。",
        func: async (city: string) => {
          // 模拟天气 API
          const weatherData: Record<string, string> = {
            "北京": "晴天，25°C",
            "上海": "多云，22°C",
            "广州": "小雨，28°C",
            "深圳": "晴天，30°C",
          };
          return weatherData[city] || `暂无 ${city} 的天气数据`;
        },
      }),
      new DynamicTool({
        name: "calculator",
        description: "用于进行数学计算。输入应该是一个数学表达式，例如 '2 + 2'。",
        func: async (input: string) => {
          try {
            const result = Function('"use strict"; return (' + input + ')')();
            return `${result}`;
          } catch (e) {
            return "计算错误";
          }
        },
      }),
    ];

    // 2. 初始化模型
    const model = new ChatOpenAI({
      model: "DeepSeek-V4-Pro",
      temperature: 0,
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    }).bindTools(tools);

    // 3. 执行任务（简化版 ReAct 逻辑）
    const question = "北京的天气怎么样？如果温度是 25 度，那是华氏多少度？";
    console.log("问题:", question);
    console.log("\n---\n");

    // 第一步：调用模型
    let response = await model.invoke(question);
    console.log("思考:", response.content);

    // 简单的工具调用循环（演示用）
    if (response.tool_calls && response.tool_calls.length > 0) {
      console.log("\n---\n");
      for (const toolCall of response.tool_calls) {
        console.log(`调用工具: ${toolCall.name}`);
        console.log(`参数:`, toolCall.args);
        console.log("\n---\n");

        const tool = tools.find(t => t.name === toolCall.name);
        if (tool) {
          const toolResult = await tool.invoke(toolCall.args);
          console.log("工具结果:", toolResult);
        }
      }
    }
  } catch (error) {
    console.error("Error during react agent example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/05-agents/02-react-agent.ts
```
