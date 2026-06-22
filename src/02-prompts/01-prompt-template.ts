import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-Code",
  temperature: 0.7,
});

async function main() {
  try {
    console.log("=== PromptTemplate 示例 ===\n");

    const promptTemplate = PromptTemplate.fromTemplate(
      "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
    );

    const prompt = await promptTemplate.format({
      profession: "程序员",
      topic: "什么是递归",
    });

    console.log("生成的 Prompt:", prompt);
    console.log("\n---\n");

    const response = await model.invoke(prompt);
    console.log("AI 回复:", response.content);
  } catch (error) {
    console.error("Error during prompt template example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
