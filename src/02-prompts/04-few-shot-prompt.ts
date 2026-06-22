import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";

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
    console.log("=== FewShotPromptTemplate 示例 ===\n");

    const examples = [
      { input: "苹果", output: "水果" },
      { input: "胡萝卜", output: "蔬菜" },
      { input: "香蕉", output: "水果" },
      { input: "菠菜", output: "蔬菜" },
    ];

    const examplePrompt = PromptTemplate.fromTemplate(
      "输入: {input}\n输出: {output}"
    );

    const fewShotPrompt = new FewShotPromptTemplate({
      examples,
      examplePrompt,
      prefix: "以下是食物分类的示例，请根据示例回答：",
      suffix: "输入: {input}\n输出:",
      inputVariables: ["input"],
    });

    const prompt = await fewShotPrompt.format({ input: "橙子" });
    console.log("生成的 Prompt:", prompt);
    console.log("\n---\n");

    const response = await model.invoke(prompt);
    console.log("AI 回复:", response.content);
  } catch (error) {
    console.error("Error during few shot prompt example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
