import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

// 初始化模型 - 使用智谱 AI
const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 简单的 LLM 调用示例 ===\n");

  const response = await model.invoke("你好，请介绍一下你自己。");
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
