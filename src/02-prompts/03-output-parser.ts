import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

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
    console.log("=== 结构化输出解析器示例 ===\n");

    const schema = z.object({
      sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
      confidence: z.number().min(0).max(1).describe("置信度"),
      reasoning: z.string().describe("分析理由"),
    });

    const parser = StructuredOutputParser.fromZodSchema(schema);

    const promptTemplate = ChatPromptTemplate.fromTemplate(`
      分析以下文本的情感。

      {format_instructions}

      文本: {text}
    `);

    const prompt = await promptTemplate.format({
      format_instructions: parser.getFormatInstructions(),
      text: "这家餐厅的食物非常好吃，服务也很棒！",
    });

    console.log("生成的 Prompt:", prompt);
    console.log("\n---\n");

    const response = await model.invoke(prompt);
    const parsed = await parser.parse(response.content as string);

    console.log("解析结果:", parsed);
  } catch (error) {
    console.error("Error during output parser example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
