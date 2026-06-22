import "dotenv/config";
import { Document } from "@langchain/core/documents";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Document Loading Example ===\n");

    // 创建一个简单的文档对象
    const doc = new Document({
      pageContent: "这是一段示例文档内容。LangChain 是一个用于开发由语言模型驱动的应用程序的框架。",
      metadata: { source: "example" }
    });

    console.log("Loaded document:");
    console.log("Content preview:", doc.pageContent.slice(0, 100));
    console.log("Metadata:", doc.metadata);
  } catch (error) {
    console.error("Error during document loading example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
