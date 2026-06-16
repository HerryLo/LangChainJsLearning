import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Document Loader 示例 ===\n");

  // 加载单个文件
  const textLoader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await textLoader.load();

  console.log("加载的文档数量:", docs.length);
  console.log("\n文档内容预览:");
  console.log(docs[0].pageContent.slice(0, 200) + "...");
  console.log("\n元数据:", docs[0].metadata);
}

main().catch(console.error);
