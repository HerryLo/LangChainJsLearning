---
title: 02-react-agent.ts
---

# 02-react-agent.ts

ReAct 代理示例，能够推理并使用工具解决问题。

## 功能介绍

这个示例演示了如何创建 ReAct（Reasoning + Acting）代理。代理可以根据问题自主决定何时使用工具、使用哪个工具，并根据工具返回的结果继续推理，直到得出最终答案。

## 使用场景

- 需要多步推理的复杂任务
- 需要结合多个工具的任务
- 自动问答系统
- 智能助手应用

## 学习要点

1. 准备工具数组，包含所有可用工具
2. 使用 `pull()` 从 LangChain Hub 拉取预定义的提示模板
3. 使用 `createReactAgent()` 创建代理
4. 使用 `AgentExecutor` 包装代理并执行
5. 设置 `verbose: true` 可以看到代理的思考过程

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";

async function main() {
  console.log("=== ReAct Agent 示例 ===\n");

  const tools = [
    new DynamicTool({
      name: "get_current_weather",
      description: "获取指定城市的当前天气。输入应该是城市名称，例如 '北京' 或 '上海'。",
      func: async (city: string) => {
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

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = await pull<typeof import("@langchain/core/prompts").ChatPromptTemplate>("hwchase17/react-chat");

  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  const question = "北京的天气怎么样？如果温度是 25 度，那是华氏多少度？";
  console.log("问题:", question);
  console.log("\n---\n");

  const result = await agentExecutor.invoke({ input: question });
  console.log("\n---\n");
  console.log("最终回答:", result.output);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/05-agents/02-react-agent.ts
```
