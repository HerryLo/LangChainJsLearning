import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Embeddings Example ===\n");

    // 创建示例文档
    const doc = new Document({
      pageContent: "LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它提供了一套丰富的工具和组件。",
      metadata: { source: "example" }
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const chunks: Document[] = await splitter.splitDocuments([doc]);

    // 创建 embeddings
    const embeddings = new OpenAIEmbeddings({
      model: "embedding-3",
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    });

    // 嵌入单个文本
    const query = "LangChain 的主要概念有哪些？";
    const queryEmbedding = await embeddings.embedQuery(query);

    console.log("Query:", query);
    console.log("Embedding dimension:", queryEmbedding.length);
    console.log("First 5 values:", queryEmbedding.slice(0, 5));
    console.log("\n");

    // 嵌入文档块
    const chunkTexts = chunks.map((chunk: Document) => chunk.pageContent);
    const chunkEmbeddings = await embeddings.embedDocuments(chunkTexts);

    console.log("Embedded", chunkEmbeddings.length, "chunks");
    chunkTexts.forEach((text: string, i: number) => {
      console.log(`Chunk ${i + 1}: "${text.slice(0, 50)}..."`);
    });
  } catch (error) {
    console.error("Error during embeddings example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
