import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Text Splitter Example ===\n");

    // 创建一个示例文档
    const doc = new Document({
      pageContent: `LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
LangChain 的核心理念是组合性，即可以将多个组件组合在一起创建更复杂的应用。
主要概念包括：Models（模型）、Prompts（提示）、Chains（链）、Agents（代理）、Memory（记忆）。`,
      metadata: { source: "example" }
    });

    // 创建切分器
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const chunks: Document[] = await splitter.splitDocuments([doc]);

    console.log("切分后的块数量:", chunks.length);
    console.log("\n");

    chunks.forEach((chunk: Document, i: number) => {
      console.log(`--- 块 ${i + 1} ---`);
      console.log(chunk.pageContent);
      console.log();
    });
  } catch (error) {
    console.error("Error during text splitter example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
