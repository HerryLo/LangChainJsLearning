import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 路由链示例 ===\n");

  // 1. 分类问题类型
  const classificationSchema = z.object({
    category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
  });
  const classificationParser = StructuredOutputParser.fromZodSchema(classificationSchema);

  const classificationPrompt = ChatPromptTemplate.fromTemplate(`
    将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）。

    {format_instructions}

    问题: {question}
  `);

  const classificationChain = classificationPrompt
    .pipe(model)
    .pipe(classificationParser);

  // 2. 不同类别的处理链
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

  // 3. 先分类，再路由到相应的链
  const classification = await classificationChain.invoke({
    format_instructions: classificationParser.getFormatInstructions(),
    question,
  });

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

  const result = await answerChain.invoke({ question });
  console.log(result);
}

main().catch(console.error);
