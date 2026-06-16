import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

async function main() {
  console.log("=== OpenAI Functions Agent 示例 ===\n");

  // 1. 定义带结构化输入的工具
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

  // 2. 初始化模型（支持函数调用）
  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  }).bindTools([weatherTool]);

  // 3. 调用模型并处理工具调用
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
