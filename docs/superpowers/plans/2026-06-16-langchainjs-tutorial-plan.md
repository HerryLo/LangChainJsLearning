# LangChain.js 教程实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

**Architecture:** 按模块组织的教程项目，每个模块独立可运行，从基础到高级逐步学习。

**Tech Stack:** Node.js 20+, TypeScript, LangChain.js, 智谱 AI/OpenAI

---

## 文件结构

```
langchain_example/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── src/
│   ├── 01-setup/
│   │   ├── 01-simple-llm.ts
│   │   └── 02-chat-model.ts
│   ├── 02-prompts/
│   │   ├── 01-prompt-template.ts
│   │   ├── 02-chat-prompt-template.ts
│   │   ├── 03-output-parser.ts
│   │   └── 04-few-shot-prompt.ts
│   ├── 03-chains/
│   │   ├── 01-llm-chain.ts
│   │   ├── 02-sequential-chain.ts
│   │   ├── 03-router-chain.ts
│   │   └── 04-transform-chain.ts
│   ├── 04-rag/
│   │   ├── 01-document-loader.ts
│   │   ├── 02-text-splitter.ts
│   │   ├── 03-embeddings.ts
│   │   ├── 04-vector-store.ts
│   │   └── 05-retrieval-qa.ts
│   ├── 05-agents/
│   │   ├── 01-tools.ts
│   │   ├── 02-react-agent.ts
│   │   └── 03-functions-agent.ts
│   └── 06-memory/
│       ├── 01-buffer-memory.ts
│       ├── 02-window-memory.ts
│       ├── 03-summary-memory.ts
│       └── 04-memory-in-chain.ts
└── docs/
    └── superpowers/
        ├── specs/
        └── plans/
```

---

## 任务 1：初始化项目

**文件：**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.env.example`
- Create: `.gitignore`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "langchainjs-tutorial",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@langchain/community": "^0.3.0",
    "@langchain/core": "^0.3.0",
    "@langchain/openai": "^0.3.0",
    "dotenv": "^16.4.0",
    "langchain": "^0.3.0",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "tsx": "^4.7.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 .env.example**

```env
# 智谱 AI 配置 (二选一)
ZHIPUAI_API_KEY=your_zhipuai_api_key_here

# OpenAI 配置 (二选一)
OPENAI_API_KEY=your_openai_api_key_here
```

- [ ] **Step 4: 创建 .gitignore**

```
node_modules
dist
.env
*.log
.DS_Store
```

- [ ] **Step 5: 提交**

```bash
git add package.json tsconfig.json .env.example .gitignore
git commit -m "feat: initialize project structure"
```

---

## 任务 2：模块 1 - 环境搭建与基础 LLM 调用

**文件：**
- Create: `src/01-setup/01-simple-llm.ts`
- Create: `src/01-setup/02-chat-model.ts`
- Create: `src/01-setup/README.md`

- [ ] **Step 1: 创建 src/01-setup/01-simple-llm.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

// 初始化模型 - 使用智谱 AI
const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 简单的 LLM 调用示例 ===\n");

  const response = await model.invoke("你好，请介绍一下你自己。");
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

- [ ] **Step 2: 创建 src/01-setup/02-chat-model.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 对话模型示例 ===\n");

  const messages = [
    new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
    new HumanMessage("什么是 LangChain？"),
  ];

  const response = await model.invoke(messages);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

- [ ] **Step 3: 创建 src/01-setup/README.md**

```markdown
# 模块 1：环境搭建与基础 LLM 调用

## 运行示例

首先，复制 `.env.example` 为 `.env` 并填入你的 API Key：

```bash
cp .env.example .env
# 编辑 .env 文件
```

然后安装依赖：

```bash
npm install
```

运行示例：

```bash
npm run dev src/01-setup/01-simple-llm.ts
npm run dev src/01-setup/02-chat-model.ts
```

## 学习要点

- 如何初始化 ChatOpenAI 模型
- 如何使用 temperature 参数控制随机性
- SystemMessage 和 HumanMessage 的区别
```

- [ ] **Step 4: 提交**

```bash
git add src/01-setup/
git commit -m "feat: add module 1 - setup and basic LLM calls"
```

---

## 任务 3：模块 2 - Prompts（提示模板和输出解析器）

**文件：**
- Create: `src/02-prompts/01-prompt-template.ts`
- Create: `src/02-prompts/02-chat-prompt-template.ts`
- Create: `src/02-prompts/03-output-parser.ts`
- Create: `src/02-prompts/04-few-shot-prompt.ts`
- Create: `src/02-prompts/README.md`

- [ ] **Step 1: 创建 src/02-prompts/01-prompt-template.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== PromptTemplate 示例 ===\n");

  // 创建提示模板
  const promptTemplate = PromptTemplate.fromTemplate(
    "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
  );

  // 填充变量
  const prompt = await promptTemplate.format({
    profession: "程序员",
    topic: "什么是递归",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

- [ ] **Step 2: 创建 src/02-prompts/02-chat-prompt-template.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== ChatPromptTemplate 示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", "你是一个语言翻译专家，将 {source_lang} 翻译成 {target_lang}。"],
    ["user", "{text}"],
  ]);

  const prompt = await promptTemplate.format({
    source_lang: "中文",
    target_lang: "英文",
    text: "你好，世界！",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

- [ ] **Step 3: 创建 src/02-prompts/03-output-parser.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 结构化输出解析器示例 ===\n");

  // 定义输出结构
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
}

main().catch(console.error);
```

- [ ] **Step 4: 创建 src/02-prompts/04-few-shot-prompt.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== FewShotPromptTemplate 示例 ===\n");

  // 少样本示例
  const examples = [
    { input: "苹果", output: "水果" },
    { input: "胡萝卜", output: "蔬菜" },
    { input: "香蕉", output: "水果" },
    { input: "菠菜", output: "蔬菜" },
  ];

  const examplePrompt = PromptTemplate.fromTemplate(
    "输入: {input}\n输出: {output}"
  );

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "以下是食物分类的示例，请根据示例回答：",
    suffix: "输入: {input}\n输出:",
    inputVariables: ["input"],
  });

  const prompt = await fewShotPrompt.format({ input: "橙子" });
  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

- [ ] **Step 5: 创建 src/02-prompts/README.md**

```markdown
# 模块 2：Prompts（提示模板和输出解析器）

## 运行示例

```bash
npm run dev src/02-prompts/01-prompt-template.ts
npm run dev src/02-prompts/02-chat-prompt-template.ts
npm run dev src/02-prompts/03-output-parser.ts
npm run dev src/02-prompts/04-few-shot-prompt.ts
```

## 学习要点

- PromptTemplate: 动态填充变量
- ChatPromptTemplate: 对话式提示
- StructuredOutputParser: 结构化输出（使用 Zod）
- FewShotPromptTemplate: 少样本学习
```

- [ ] **Step 6: 提交**

```bash
git add src/02-prompts/
git commit -m "feat: add module 2 - prompts and output parsers"
```

---

## 任务 4：模块 3 - Chains（链）

**文件：**
- Create: `src/03-chains/01-llm-chain.ts`
- Create: `src/03-chains/02-sequential-chain.ts`
- Create: `src/03-chains/03-router-chain.ts`
- Create: `src/03-chains/04-transform-chain.ts`
- Create: `src/03-chains/README.md`

- [ ] **Step 1: 创建 src/03-chains/01-llm-chain.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== LLMChain（使用 LCEL）示例 ===\n");

  const promptTemplate = ChatPromptTemplate.fromTemplate(
    "你是一个专业的厨师。请提供一个 {dish} 的做法。"
  );

  // 使用 LCEL (LangChain Expression Language) 构建链
  const chain = promptTemplate
    .pipe(model)
    .pipe(new StringOutputParser());

  const result = await chain.invoke({ dish: "番茄炒蛋" });
  console.log(result);
}

main().catch(console.error);
```

- [ ] **Step 2: 创建 src/03-chains/02-sequential-chain.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 顺序链示例 ===\n");

  // 第一条链：生成大纲
  const outlinePrompt = ChatPromptTemplate.fromTemplate(
    "请为主题 '{topic}' 生成一篇文章的大纲。"
  );
  const outlineChain = outlinePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // 第二条链：根据大纲写文章
  const articlePrompt = ChatPromptTemplate.fromTemplate(
    "根据以下大纲写一篇完整的文章：\n\n{outline}"
  );
  const articleChain = articlePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // 组合链
  const fullChain = outlineChain.pipe((outline) => ({ outline })).pipe(articleChain);

  const result = await fullChain.invoke({ topic: "人工智能的未来" });
  console.log(result);
}

main().catch(console.error);
```

- [ ] **Step 3: 创建 src/03-chains/03-router-chain.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 路由链示例 ===\n");

  // 1. 分类问题类型
  const classificationSchema = z.object({
    category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
  });
  const classificationParser = StructuredOutputParser.fromZodSchema(classificationSchema);

  const classificationPrompt = ChatPromptTemplate.fromTemplate(`
    将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）。

    {format_instructions}

    问题: {question}
  `);

  const classificationChain = classificationPrompt
    .pipe(model)
    .pipe(classificationParser);

  // 2. 不同类别的处理链
  const techPrompt = ChatPromptTemplate.fromTemplate(
    "你是一个技术专家。请回答以下技术问题：\n{question}"
  );
  const cookingPrompt = ChatPromptTemplate.fromTemplate(
    "你是一个厨师。请回答以下烹饪问题：\n{question}"
  );
  const generalPrompt = ChatPromptTemplate.fromTemplate(
    "请回答以下问题：\n{question}"
  );

  const question = "怎么做红烧肉？";
  console.log("问题:", question);
  console.log("\n---\n");

  // 3. 先分类，再路由到相应的链
  const classification = await classificationChain.invoke({
    format_instructions: classificationParser.getFormatInstructions(),
    question,
  });

  console.log("分类结果:", classification.category);
  console.log("\n---\n");

  let selectedPrompt;
  switch (classification.category) {
    case "tech":
      selectedPrompt = techPrompt;
      break;
    case "cooking":
      selectedPrompt = cookingPrompt;
      break;
    default:
      selectedPrompt = generalPrompt;
  }

  const answerChain = selectedPrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const result = await answerChain.invoke({ question });
  console.log(result);
}

main().catch(console.error);
```

- [ ] **Step 4: 创建 src/03-chains/04-transform-chain.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== TransformChain（数据转换）示例 ===\n");

  // 自定义转换函数
  const transformInput = (input: { text: string }) => ({
    text: input.text,
    wordCount: input.text.split(/\s+/).length,
    characterCount: input.text.length,
  });

  const promptTemplate = ChatPromptTemplate.fromTemplate(`
    分析以下文本的摘要：

    文本: {text}
    字数统计: {wordCount} 词，{characterCount} 字

    请提供摘要。
  `);

  const chain = transformInput
    .pipe(promptTemplate)
    .pipe(model)
    .pipe(new StringOutputParser());

  const text = `
    LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
    它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
    无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
  `.trim();

  const result = await chain.invoke({ text });
  console.log(result);
}

main().catch(console.error);
```

- [ ] **Step 5: 创建 src/03-chains/README.md**

```markdown
# 模块 3：Chains（链）

## 运行示例

```bash
npm run dev src/03-chains/01-llm-chain.ts
npm run dev src/03-chains/02-sequential-chain.ts
npm run dev src/03-chains/03-router-chain.ts
npm run dev src/03-chains/04-transform-chain.ts
```

## 学习要点

- LCEL (LangChain Expression Language) 语法
- 顺序链：将多个步骤串联起来
- 路由链：根据条件选择不同的处理路径
- 数据转换：在链中自定义数据处理逻辑
```

- [ ] **Step 6: 提交**

```bash
git add src/03-chains/
git commit -m "feat: add module 3 - chains"
```

---

## 任务 5：模块 4 - RAG（检索增强生成）

**文件：**
- Create: `src/04-rag/01-document-loader.ts`
- Create: `src/04-rag/02-text-splitter.ts`
- Create: `src/04-rag/03-embeddings.ts`
- Create: `src/04-rag/04-vector-store.ts`
- Create: `src/04-rag/05-retrieval-qa.ts`
- Create: `src/04-rag/data/sample-doc.txt`
- Create: `src/04-rag/README.md`

- [ ] **Step 1: 创建 src/04-rag/data/sample-doc.txt**

```
LangChain 是一个用于开发由语言模型驱动的应用程序的框架。它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。

主要概念：

1. Models（模型）：LangChain 支持多种 LLM，包括 OpenAI、Anthropic、Hugging Face 等。你可以轻松切换不同的模型提供商。

2. Prompts（提示）：提示模板让你可以动态生成提示，包含变量、格式化指令等。

3. Chains（链）：链将多个组件串联起来，实现复杂的工作流。比如先检索文档，再根据文档回答问题。

4. Retrieval（检索）：RAG（检索增强生成）允许你将自己的数据注入到 LLM 中，让 LLM 基于你的数据回答问题。

5. Agents（代理）：代理让 LLM 可以自主决定使用什么工具，完成复杂的任务。

LangChain 有 Python 和 JavaScript/TypeScript 两个版本，可以根据你的技术栈选择。

安装方法：
- Python: pip install langchain
- JavaScript: npm install langchain
```

- [ ] **Step 2: 创建 src/04-rag/01-document-loader.ts**

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
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
```

- [ ] **Step 3: 创建 src/04-rag/02-text-splitter.ts**

```typescript
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
```

- [ ] **Step 4: 创建 src/04-rag/03-embeddings.ts**

```typescript
import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";

async function main() {
  console.log("=== Embeddings 示例 ===\n");

  const embeddings = new OpenAIEmbeddings({
    modelName: "embedding-3",
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 嵌入单个文本
  const text = "Hello, world!";
  const embedding = await embeddings.embedQuery(text);

  console.log("文本:", text);
  console.log("嵌入维度:", embedding.length);
  console.log("嵌入向量前5个值:", embedding.slice(0, 5));
  console.log("\n");

  // 嵌入多个文本
  const texts = ["猫是宠物", "狗是宠物", "鱼是宠物"];
  const embeddingsResult = await embeddings.embedDocuments(texts);

  console.log("嵌入多个文本:");
  texts.forEach((t, i) => {
    console.log(`  "${t}" → 维度 ${embeddingsResult[i].length}`);
  });
}

main().catch(console.error);
```

- [ ] **Step 5: 创建 src/04-rag/04-vector-store.ts**

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Vector Store 示例 ===\n");

  // 1. 加载文档
  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  // 2. 切分文档
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(docs);

  // 3. 创建向量存储
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

  // 4. 相似度搜索
  const query = "LangChain 的主要概念有哪些？";
  console.log("查询:", query);
  console.log("\n");

  const results = await vectorStore.similaritySearch(query, 2);

  console.log("最相关的文档块:");
  results.forEach((doc, i) => {
    console.log(`\n--- 结果 ${i + 1} ---`);
    console.log(doc.pageContent);
  });
}

main().catch(console.error);
```

- [ ] **Step 6: 创建 src/04-rag/05-retrieval-qa.ts**

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

  // 1. 加载并切分文档
  const loader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(docs);

  // 2. 创建向量存储和检索器
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

  // 3. 初始化模型
  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 4. 构建 RAG 链
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

  // 5. 提问
  const question = "LangChain 的主要概念有哪些？";
  console.log("问题:", question);
  console.log("\n---\n");

  const answer = await ragChain.invoke(question);
  console.log("回答:", answer);
}

main().catch(console.error);
```

- [ ] **Step 7: 创建 src/04-rag/README.md**

```markdown
# 模块 4：RAG（检索增强生成）

## 运行示例

```bash
npm run dev src/04-rag/01-document-loader.ts
npm run dev src/04-rag/02-text-splitter.ts
npm run dev src/04-rag/03-embeddings.ts
npm run dev src/04-rag/04-vector-store.ts
npm run dev src/04-rag/05-retrieval-qa.ts
```

## 学习要点

- Document Loader：加载各种格式的文档
- Text Splitter：将文档切分成合适的块
- Embeddings：将文本转换成向量
- Vector Store：存储和检索向量
- Retrieval QA：端到端的 RAG 问答系统
```

- [ ] **Step 8: 提交**

```bash
git add src/04-rag/
git commit -m "feat: add module 4 - RAG"
```

---

## 任务 6：模块 5 - Agents（智能代理）

**文件：**
- Create: `src/05-agents/01-tools.ts`
- Create: `src/05-agents/02-react-agent.ts`
- Create: `src/05-agents/03-functions-agent.ts`
- Create: `src/05-agents/README.md`

- [ ] **Step 1: 创建 src/05-agents/01-tools.ts**

```typescript
import "dotenv/config";
import { DynamicTool } from "@langchain/core/tools";

async function main() {
  console.log("=== Tools 示例 ===\n");

  // 定义一个自定义工具
  const calculatorTool = new DynamicTool({
    name: "calculator",
    description: "用于进行数学计算。输入应该是一个数学表达式，例如 '2 + 2' 或 '10 * 5'。",
    func: async (input: string) => {
      try {
        // 简单的安全计算
        const result = Function('"use strict"; return (' + input + ')')();
        return `计算结果: ${result}`;
      } catch (e) {
        return "计算错误，请检查表达式";
      }
    },
  });

  // 使用工具
  console.log("工具名称:", calculatorTool.name);
  console.log("工具描述:", calculatorTool.description);
  console.log("\n---\n");

  const result = await calculatorTool.invoke("25 * 4");
  console.log("调用 calculator(\"25 * 4\"):");
  console.log(result);
}

main().catch(console.error);
```

- [ ] **Step 2: 创建 src/05-agents/02-react-agent.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";

async function main() {
  console.log("=== ReAct Agent 示例 ===\n");

  // 1. 定义工具
  const tools = [
    new DynamicTool({
      name: "get_current_weather",
      description: "获取指定城市的当前天气。输入应该是城市名称，例如 '北京' 或 '上海'。",
      func: async (city: string) => {
        // 模拟天气 API
        const weatherData: Record<string, string> = {
          "北京": "晴天，25°C",
          "上海": "多云，22°C",
          "广州": "小雨，28°C",
          "深圳": "晴天，30°C",
        };
        return weatherData[city] || `暂无 ${city} 的天气数据`;
      },
    }),
    new DynamicTool({
      name: "calculator",
      description: "用于进行数学计算。输入应该是一个数学表达式，例如 '2 + 2'。",
      func: async (input: string) => {
        try {
          const result = Function('"use strict"; return (' + input + ')')();
          return `${result}`;
        } catch (e) {
          return "计算错误";
        }
      },
    }),
  ];

  // 2. 初始化模型
  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 3. 拉取 ReAct 提示模板
  const prompt = await pull<typeof import("@langchain/core/prompts").ChatPromptTemplate>("hwchase17/react-chat");

  // 4. 创建代理
  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  // 5. 创建代理执行器
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  // 6. 执行任务
  const question = "北京的天气怎么样？如果温度是 25 度，那是华氏多少度？";
  console.log("问题:", question);
  console.log("\n---\n");

  const result = await agentExecutor.invoke({ input: question });
  console.log("\n---\n");
  console.log("最终回答:", result.output);
}

main().catch(console.error);
```

- [ ] **Step 3: 创建 src/05-agents/03-functions-agent.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

async function main() {
  console.log("=== OpenAI Functions Agent 示例 ===\n");

  // 1. 定义带结构化输入的工具
  const weatherTool = new DynamicStructuredTool({
    name: "get_current_weather",
    description: "获取指定城市的当前天气",
    schema: z.object({
      city: z.string().describe("城市名称"),
      unit: z.enum(["celsius", "fahrenheit"]).default("celsius").describe("温度单位"),
    }),
    func: async ({ city, unit }) => {
      const weatherData: Record<string, { temp: number; condition: string }> = {
        "北京": { temp: 25, condition: "晴天" },
        "上海": { temp: 22, condition: "多云" },
        "广州": { temp: 28, condition: "小雨" },
      };
      const data = weatherData[city] || { temp: 20, condition: "未知" };
      const temp = unit === "fahrenheit" ? Math.round(data.temp * 9/5 + 32) : data.temp;
      return `${city} 的天气: ${data.condition}，${temp}°${unit === "celsius" ? "C" : "F"}`;
    },
  });

  // 2. 初始化模型（支持函数调用）
  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  }).bindTools([weatherTool]);

  // 3. 调用模型并处理工具调用
  const question = "北京今天天气怎么样？用华氏度告诉我温度。";
  console.log("问题:", question);
  console.log("\n---\n");

  const response = await model.invoke(question);

  if (response.tool_calls && response.tool_calls.length > 0) {
    console.log("工具调用:", response.tool_calls);
    console.log("\n---\n");

    const toolCall = response.tool_calls[0];
    const toolResult = await weatherTool.invoke(toolCall.args);
    console.log("工具结果:", toolResult);
  }
}

main().catch(console.error);
```

- [ ] **Step 4: 创建 src/05-agents/README.md**

```markdown
# 模块 5：Agents（智能代理）

## 运行示例

```bash
npm run dev src/05-agents/01-tools.ts
npm run dev src/05-agents/02-react-agent.ts
npm run dev src/05-agents/03-functions-agent.ts
```

## 学习要点

- Tools：定义和使用工具
- ReAct Agent：使用 ReAct 推理模式的代理
- OpenAI Functions：结构化工具调用
```

- [ ] **Step 5: 提交**

```bash
git add src/05-agents/
git commit -m "feat: add module 5 - agents"
```

---

## 任务 7：模块 6 - Memory（记忆）

**文件：**
- Create: `src/06-memory/01-buffer-memory.ts`
- Create: `src/06-memory/02-window-memory.ts`
- Create: `src/06-memory/03-summary-memory.ts`
- Create: `src/06-memory/04-memory-in-chain.ts`
- Create: `src/06-memory/README.md`

- [ ] **Step 1: 创建 src/06-memory/01-buffer-memory.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationBufferMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  // 存储历史消息
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  // 第一轮对话
  console.log("用户: 你好，我叫小明");
  const response1 = await chainWithHistory.invoke(
    { input: "你好，我叫小明" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response1);
  console.log("\n");

  // 第二轮对话
  console.log("用户: 我叫什么名字？");
  const response2 = await chainWithHistory.invoke(
    { input: "我叫什么名字？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response2);
  console.log("\n");

  // 查看历史消息
  console.log("--- 历史消息 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
}

main().catch(console.error);
```

- [ ] **Step 2: 创建 src/06-memory/02-window-memory.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationBufferWindowMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  // 添加一些历史消息
  const demoMessages = [
    "你好，我叫小明",
    "你好小明！很高兴认识你。",
    "我喜欢吃苹果",
    "苹果是很健康的水果！",
    "我也喜欢吃香蕉",
    "香蕉也很美味，富含钾。",
  ];

  for (let i = 0; i < demoMessages.length; i += 2) {
    await messageHistory.addUserMessage(demoMessages[i]);
    await messageHistory.addAIChatMessage(demoMessages[i + 1]);
  }

  // 查看当前历史
  console.log("--- 完整历史 ---");
  const allMessages = await messageHistory.getMessages();
  allMessages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
  console.log("\n");

  // 只保留最近 K 条消息的窗口记忆示例
  console.log("--- 窗口记忆（只保留最近 2 轮对话）---");
  console.log("用户: 我刚才说我喜欢吃什么水果？");
  const response = await chainWithHistory.invoke(
    { input: "我刚才说我喜欢吃什么水果？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response);
}

main().catch(console.error);
```

- [ ] **Step 3: 创建 src/06-memory/03-summary-memory.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationSummaryMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 模拟历史对话
  const conversationHistory = [
    { human: "你好，我叫小明，我是一名程序员。" },
    { ai: "你好小明！很高兴认识你，程序员是一个很棒的职业。" },
    { human: "我喜欢用 JavaScript 和 TypeScript 编程。" },
    { ai: "JavaScript 和 TypeScript 都是很流行的语言！" },
    { human: "最近我在学习 LangChain。" },
    { ai: "LangChain 是一个强大的框架，可以让你构建很棒的 LLM 应用。" },
  ];

  // 将历史格式化为对话文本
  const conversationText = conversationHistory
    .map((msg) => {
      if ("human" in msg) return `Human: ${msg.human}`;
      return `AI: ${msg.ai}`;
    })
    .join("\n");

  // 创建摘要提示
  const summaryPrompt = ChatPromptTemplate.fromTemplate(`
    请将以下对话历史总结成一段简洁的摘要：

    {conversation}

    摘要：
  `);

  const summaryChain = summaryPrompt.pipe(model).pipe(new StringOutputParser());

  console.log("--- 原始对话 ---");
  console.log(conversationText);
  console.log("\n--- 对话摘要 ---");

  const summary = await summaryChain.invoke({ conversation: conversationText });
  console.log(summary);
  console.log("\n");

  // 使用摘要进行对话
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。以下是对话摘要：{summary}"],
    ["human", "{input}"],
  ]);

  const chatChain = chatPrompt.pipe(model).pipe(new StringOutputParser());

  console.log("--- 使用摘要对话 ---");
  console.log("用户: 我叫什么名字？我是做什么的？");
  const response = await chatChain.invoke({ summary, input: "我叫什么名字？我是做什么的？" });
  console.log("AI:", response);
}

main().catch(console.error);
```

- [ ] **Step 4: 创建 src/06-memory/04-memory-in-chain.ts**

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== Memory in Chain 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个助手，帮助用户学习编程。每次回答后，请问一个相关的小问题来巩固学习。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  // 对话轮 1
  console.log("--- 第 1 轮 ---");
  console.log("用户: 什么是变量？");
  const r1 = await chainWithHistory.invoke(
    { input: "什么是变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r1);
  console.log("\n");

  // 对话轮 2
  console.log("--- 第 2 轮 ---");
  console.log("用户: 在 JavaScript 中如何声明变量？");
  const r2 = await chainWithHistory.invoke(
    { input: "在 JavaScript 中如何声明变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r2);
  console.log("\n");

  // 查看完整历史
  console.log("--- 完整对话历史 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
}

main().catch(console.error);
```

- [ ] **Step 5: 创建 src/06-memory/README.md**

```markdown
# 模块 6：Memory（记忆）

## 运行示例

```bash
npm run dev src/06-memory/01-buffer-memory.ts
npm run dev src/06-memory/02-window-memory.ts
npm run dev src/06-memory/03-summary-memory.ts
npm run dev src/06-memory/04-memory-in-chain.ts
```

## 学习要点

- ConversationBufferMemory：保存完整对话历史
- ConversationBufferWindowMemory：只保留最近 K 条
- ConversationSummaryMemory：保存对话摘要
- 在链中集成记忆
```

- [ ] **Step 6: 提交**

```bash
git add src/06-memory/
git commit -m "feat: add module 6 - memory"
```

---

## 任务 8：创建主 README

**文件：**
- Create: `README.md`

- [ ] **Step 1: 创建 README.md**

```markdown
# LangChain.js 教程

一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

## 前置要求

- Node.js 20+
- 智谱 AI API Key 或 OpenAI API Key

## 快速开始

1. 安装依赖：

```bash
npm install
```

2. 配置环境变量：

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

3. 运行示例：

```bash
npm run dev src/01-setup/01-simple-llm.ts
```

## 模块列表

- **模块 1**: 环境搭建与基础 LLM 调用
- **模块 2**: Prompts（提示模板和输出解析器）
- **模块 3**: Chains（链）
- **模块 4**: RAG（检索增强生成）
- **模块 5**: Agents（智能代理）
- **模块 6**: Memory（记忆）

每个模块都有详细的 README，包含运行说明和学习要点。
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "feat: add main README"
```
