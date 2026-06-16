import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== LLMChain（使用 LCEL）示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromTemplate(
    "你是一个专业的厨师。请提供一个 {dish} 的做法。"
  );

  // 使用 LCEL（LangChain Expression Language）构建链
  const chain = promptTemplate
    .pipe(model)
    .pipe(new StringOutputParser());

  const result = await chain.invoke({ dish: "番茄炒蛋" });
  console.log(result);
}

main().catch(console.error);
