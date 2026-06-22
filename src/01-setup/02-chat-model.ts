import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import type { BaseMessage } from "@langchain/core/messages";

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
    console.log("=== 多轮对话示例 ===\n");

    console.log("--- 第一轮对话 ---");
    const messages: BaseMessage[] = [
      new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
      new HumanMessage("什么是 LangChain？"),
    ];
    const response1 = await model.invoke(messages);
    console.log("用户: 什么是 LangChain？");
    console.log("AI:", response1.content);
    console.log();

    console.log("--- 第二轮对话 ---");
    messages.push(new AIMessage(response1.content as string));
    messages.push(new HumanMessage("它有什么特点？"));
    const response2 = await model.invoke(messages);
    console.log("用户: 它有什么特点？");
    console.log("AI:", response2.content);
    console.log();

    console.log("--- 第三轮对话 ---");
    messages.push(new AIMessage(response2.content as string));
    messages.push(new HumanMessage("它适合做什么项目？"));
    const response3 = await model.invoke(messages);
    console.log("用户: 它适合做什么项目？");
    console.log("AI:", response3.content);
  } catch (error) {
    console.error("Error during chat:", error);
    process.exit(1);
  }
}

main().catch(console.error);
