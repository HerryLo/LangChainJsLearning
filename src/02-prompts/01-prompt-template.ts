import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== PromptTemplate 示例 ===\n");

  // 创建提示模板
  const promptTemplate = PromptTemplate.fromTemplate(
    "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
  );

  // 填充变量
  const prompt = await promptTemplate.format({
    profession: "程序员",
    topic: "什么是递归",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
