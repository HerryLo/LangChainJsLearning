import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Text Splitter 示例 ===\n");

  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  // 切分文档
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });

  const chunks = await splitter.splitDocuments(docs);

  console.log("切分后的块数量:", chunks.length);
  console.log("\n");

  chunks.forEach((chunk, i) => {
    console.log(`--- 块 ${i + 1} ---`);
    console.log(chunk.pageContent);
    console.log();
  });
}

main().catch(console.error);
