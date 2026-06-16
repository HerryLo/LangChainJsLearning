import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== ChatPromptTemplate 示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个语言翻译专家，将 {source_lang} 翻译成 {target_lang}。"],
    ["user", "{text}"],
  ]);

  const prompt = await promptTemplate.format({
    source_lang: "中文",
    target_lang: "英文",
    text: "你好，世界！",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
