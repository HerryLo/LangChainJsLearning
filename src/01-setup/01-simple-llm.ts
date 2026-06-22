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
