import "dotenv/config";
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Retrieval QA Example ===\n");

    // 创建示例文档
    const doc = new Document({
      pageContent: `LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
主要概念包括：
1. Models（模型）：各种 LLM 的封装
2. Prompts（提示）：提示模板和提示管理
3. Chains（链）：组合多个调用和组件
4. Agents（代理）：使用 LLM 做决策的高级组件
5. Memory（记忆）：在调用之间保持状态`,
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

    // 创建 chunk embeddings
    const chunkTexts = chunks.map((chunk: Document) => chunk.pageContent);
    const chunkEmbeddings = await embeddings.embedDocuments(chunkTexts);

    // 简单的相似度搜索（cosine similarity）
    function cosineSimilarity(a: number[], b: number[]) {
      const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
      const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
      const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
      return dotProduct / (normA * normB);
    }

    // 初始化模型
    const model = new ChatOpenAI({
      model: "DeepSeek-V4-Pro",
      temperature: 0.7,
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    });

    // 创建提示模板
    const prompt = ChatPromptTemplate.fromTemplate(`
      根据以下上下文回答问题。如果上下文中没有相关信息，请说"我不知道"。

      上下文:
      {context}

      问题: {question}
    `);

    // 问题
    const question = "LangChain 的主要概念有哪些？";
    console.log("Question:", question);
    console.log("\n---\n");

    // 获取查询 embedding
    const queryEmbedding = await embeddings.embedQuery(question);

    // 找到最相关的 2 个 chunk
    const similarities = chunkEmbeddings.map((emb: number[], i: number) => ({
      index: i,
      similarity: cosineSimilarity(queryEmbedding, emb),
      text: chunkTexts[i]
    }));
    similarities.sort((a, b) => b.similarity - a.similarity);
    const topChunks = similarities.slice(0, 2);
    const context = topChunks.map((c) => c.text).join("\n\n");

    console.log("Retrieved context:");
    console.log(context);
    console.log("\n---\n");

    // 构建链
    const chain = RunnableSequence.from([
      {
        context: () => context,
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    // 执行
    const answer = await chain.invoke(question);
    console.log("Answer:", answer);
  } catch (error) {
    console.error("Error during retrieval QA example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
