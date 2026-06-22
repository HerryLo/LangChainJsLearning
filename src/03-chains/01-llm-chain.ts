import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableLambda } from "@langchain/core/runnables";

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
    console.log("=== LLMChain（使用 LCEL）示例 ===\n");

    const promptTemplate = ChatPromptTemplate.fromTemplate(
      "你是一个专业的厨师。请提供一个 {dish} 的做法。"
    );

    const chain = promptTemplate
      .pipe(model)
      .pipe(new StringOutputParser());

    const result = await chain.invoke({ dish: "番茄炒蛋" });
    console.log(result);
  } catch (error) {
    console.error("Error during LLM chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
