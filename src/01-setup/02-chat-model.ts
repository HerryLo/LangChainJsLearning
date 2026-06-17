// 加载环境变量
import "dotenv/config";

// 导入聊天模型
import { ChatOpenAI } from "@langchain/openai";

// 导入消息类型：HumanMessage（用户消息）、SystemMessage（系统消息）、AIMessage（AI 回复）
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

// 初始化模型
const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 多轮对话示例 ===\n");

  // 第一轮对话
  console.log("--- 第一轮对话 ---");
  const messages = [
    new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
    new HumanMessage("什么是 LangChain？"),
  ];
  const response1 = await model.invoke(messages);
  console.log("用户: 什么是 LangChain？");
  console.log("AI:", response1.content);
  console.log();

  // 第二轮对话 - 把第一轮的 AI 回复也加入数组
  console.log("--- 第二轮对话 ---");
  messages.push(response1); // 添加 AI 的回复
  messages.push(new HumanMessage("它有什么特点？")); // 添加新的用户问题
  const response2 = await model.invoke(messages);
  console.log("用户: 它有什么特点？");
  console.log("AI:", response2.content);
  console.log();

  // 第三轮对话 - 继续追加
  console.log("--- 第三轮对话 ---");
  messages.push(response2);
  messages.push(new HumanMessage("它适合做什么项目？"));
  const response3 = await model.invoke(messages);
  console.log("用户: 它适合做什么项目？");
  console.log("AI:", response3.content);
}

main().catch(console.error);
