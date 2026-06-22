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
    console.log("=== 顺序链示例 ===\n");

    const outlinePrompt = ChatPromptTemplate.fromTemplate(
      "请为主题 '{topic}' 生成一篇文章的大纲。"
    );
    const outlineChain = outlinePrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const articlePrompt = ChatPromptTemplate.fromTemplate(
      "根据以下大纲写一篇完整的文章：\n\n{outline}"
    );
    const articleChain = articlePrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    const fullChain = outlineChain
      .pipe(RunnableLambda.from((outline: string) => ({ outline })))
      .pipe(articleChain);

    const result = await fullChain.invoke({ topic: "人工智能的未来" });
    console.log(result);
  } catch (error) {
    console.error("Error during sequential chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
