import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Embeddings 示例 ===\n");

    const embeddings = new OpenAIEmbeddings({
      model: "embedding-3",
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    });

    // 嵌入单个文本
    const text = "Hello, world!";
    const embedding = await embeddings.embedQuery(text);

    console.log("文本:", text);
    console.log("嵌入维度:", embedding.length);
    console.log("嵌入向量前 5 个值:", embedding.slice(0, 5));
    console.log("\n");

    // 嵌入多个文本
    const texts = ["猫是宠物", "狗是宠物", "鱼是宠物"];
    const embeddingsResult = await embeddings.embedDocuments(texts);

    console.log("嵌入多个文本:");
    texts.forEach((t, i) => {
      console.log(`  "${t}" → 维度 ${embeddingsResult[i].length}`);
    });
  } catch (error) {
    console.error("Error during embeddings example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
