import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
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
    console.log("=== 结构化输出示例 ===\n");

    const schema = z.object({
      sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
      confidence: z.number().min(0).max(1).describe("置信度"),
      reasoning: z.string().describe("分析理由"),
    });

    // 使用推荐的 withStructuredOutput API
    const structuredModel = model.withStructuredOutput(schema);

    const text = "这家餐厅的食物非常好吃，服务也很棒！";
    console.log("分析文本:", text);
    console.log("\n---\n");

    const result = await structuredModel.invoke(
      `分析以下文本的情感：\n${text}`
    );

    console.log("解析结果:", result);
  } catch (error) {
    console.error("Error during output parser example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
