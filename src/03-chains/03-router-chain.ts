import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

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
    console.log("=== 路由链示例 ===\n");

    // 使用 withStructuredOutput 进行分类
    const classificationSchema = z.object({
      category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
    });
    const classifier = model.withStructuredOutput(classificationSchema);

    const techPrompt = ChatPromptTemplate.fromTemplate(
      "你是一个技术专家。请回答以下技术问题：\n{question}"
    );
    const cookingPrompt = ChatPromptTemplate.fromTemplate(
      "你是一个厨师。请回答以下烹饪问题：\n{question}"
    );
    const generalPrompt = ChatPromptTemplate.fromTemplate(
      "请回答以下问题：\n{question}"
    );

    const question = "怎么做红烧肉？";
    console.log("问题:", question);
    console.log("\n---\n");

    const classification = await classifier.invoke(
      `将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）：\n${question}`
    );

    console.log("分类结果:", classification.category);
    console.log("\n---\n");

    let selectedPrompt;
    switch (classification.category) {
      case "tech":
        selectedPrompt = techPrompt;
        break;
      case "cooking":
        selectedPrompt = cookingPrompt;
        break;
      default:
        selectedPrompt = generalPrompt;
    }

    const answerChain = selectedPrompt
      .pipe(model)
      .pipe(new StringOutputParser());

    // 通过使用stream方法逐字输出结果 
    const result = await answerChain.stream({ question });
    for await (const chunk of result) {
        process.stdout.write(chunk); // 会像打字一样，逐字输出
    }
  } catch (error) {
    console.error("Error during router chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
