---
title: 02-react-agent.ts
---

# 02-react-agent.ts

ReAct 代理示例。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";

async function main() {
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
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 3. 拉取 ReAct 提示模板
  const prompt = await pull<typeof import("@langchain/core/prompts").ChatPromptTemplate>("hwchase17/react-chat");

  // 4. 创建代理
  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  // 5. 创建代理执行器
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  // 6. 执行任务
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
