---
title: 05-retrieval-qa.ts
---

# 05-retrieval-qa.ts

检索问答示例，结合检索和生成回答问题。

## 功能介绍

这个示例演示了完整的 RAG（Retrieval-Augmented Generation）流程：先从知识库中检索相关文档，然后将检索结果作为上下文，让 AI 根据上下文回答问题。

## 使用场景

- 基于自有文档的问答系统
- 智能客服系统（基于产品文档）
- 企业知识库问答
- 学术论文问答助手

## 学习要点

1. 使用 `vectorStore.asRetriever()` 创建检索器
2. 使用 `RunnablePassthrough()` 传递原始输入
3. 使用 `RunnableSequence.from()` 组合检索、提示、模型
4. 检索到的文档需要格式化后放入提示中

## 源码

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Retrieval QA 示例 ===\n");

  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(docs);

  const embeddings = new OpenAIEmbeddings({
    modelName: "embedding-3",
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    chunks,
    embeddings
  );
  const retriever = vectorStore.asRetriever({ k: 2 });

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromTemplate(`
    根据以下上下文回答问题。如果上下文中没有相关信息，请说"我不知道"。

    上下文:
    {context}

    问题: {question}
  `);

  const formatDocs = (docs: any[]) => docs.map((doc) => doc.pageContent).join("\n\n");

  const ragChain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocs),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const question = "LangChain 的主要概念有哪些？";
  console.log("问题:", question);
  console.log("\n---\n");

  const answer = await ragChain.invoke(question);
  console.log("回答:", answer);
}

main().catch(console.error);
```

## 运行方式

```bash
npm run dev src/04-rag/05-retrieval-qa.ts
```
