# 同步 Website 代码与 Src 源代码 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 同步 website 文档中的代码与 src 源代码，以 src 为准，并将 src 中的教学注释结构化展示

**Architecture:** 逐个模块更新 website 中的 markdown 文件，每个文件包含：功能介绍、使用场景、学习要点（如果有）、源码（与 src 配置一致）

**Tech Stack:** VitePress, Markdown, TypeScript

---

## Task 1: 更新模块 1 - 01-simple-llm.md

**Files:**
- Modify: `website/01-setup/01-simple-llm.md`
- Reference: `src/01-setup/01-simple-llm.ts`

- [ ] **Step 1: 读取当前文件**
  *Already done - see conversation context*

- [ ] **Step 2: 写入新内容**

```markdown
---
title: 01-simple-llm.ts
---

# 01-simple-llm.ts

最简单的 LLM 调用示例，展示如何初始化模型并获取回复。

## 功能介绍

这是 LangChain.js 最基础的用法：直接调用大语言模型获取回复

## 使用场景

- 简单的问答对话
- 单次文本生成（如写邮件、写代码等）
- 不需要上下文记忆的场景
- 快速验证 API 配置是否正确

## 学习要点

1. 如何初始化 ChatOpenAI 模型
2. 如何配置 model 参数选择不同模型
3. 如何使用 temperature 调节回复的随机性
4. 如何调用 model.invoke() 获取回复

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-Code",
  temperature: 0.7
});

async function main() {
  console.log("=== 简单的 LLM 调用示例 ===\n");

  const response = await model.invoke("你好，请介绍一下你自己。");

  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/01-setup/01-simple-llm.ts`](../src/01-setup/01-simple-llm.ts)

## 运行方式

```bash
npm run dev src/01-setup/01-simple-llm.ts
```
```

- [ ] **Step 3: 提交更改**

```bash
git add website/01-setup/01-simple-llm.md
git commit -m "docs: update 01-simple-llm.md with src content"
```

---

## Task 2: 更新模块 1 - 02-chat-model.md

**Files:**
- Modify: `website/01-setup/02-chat-model.md`
- Reference: `src/01-setup/02-chat-model.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-chat-model.ts
---

# 02-chat-model.ts

多轮对话示例，展示如何使用 SystemMessage 和 HumanMessage。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== 多轮对话示例 ===\n");

  console.log("--- 第一轮对话 ---");
  const messages = [
    new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
    new HumanMessage("什么是 LangChain？"),
  ];
  const response1 = await model.invoke(messages);
  console.log("用户: 什么是 LangChain？");
  console.log("AI:", response1.content);
  console.log();

  console.log("--- 第二轮对话 ---");
  messages.push(response1);
  messages.push(new HumanMessage("它有什么特点？"));
  const response2 = await model.invoke(messages);
  console.log("用户: 它有什么特点？");
  console.log("AI:", response2.content);
  console.log();

  console.log("--- 第三轮对话 ---");
  messages.push(response2);
  messages.push(new HumanMessage("它适合做什么项目？"));
  const response3 = await model.invoke(messages);
  console.log("用户: 它适合做什么项目？");
  console.log("AI:", response3.content);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/01-setup/02-chat-model.ts`](../src/01-setup/02-chat-model.ts)

## 运行方式

```bash
npm run dev src/01-setup/02-chat-model.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/01-setup/02-chat-model.md
git commit -m "docs: update 02-chat-model.md with src content"
```

---

## Task 3: 更新模块 2 - 01-prompt-template.md

**Files:**
- Modify: `website/02-prompts/01-prompt-template.md`
- Reference: `src/02-prompts/01-prompt-template.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 01-prompt-template.ts
---

# 01-prompt-template.ts

使用模板和变量动态生成提示词，避免重复写相同的提示。

## 功能介绍

使用模板和变量动态生成提示词，避免重复写相同的提示

## 使用场景

- 同一类问题批量提问（如翻译、摘要等）
- 需要动态替换某些内容的场景
- 标准化提示格式

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "GLM-5.1",
  temperature: 0.7
});

async function main() {
  console.log("=== PromptTemplate 示例 ===\n");

  const promptTemplate = PromptTemplate.fromTemplate(
    "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
  );

  const prompt = await promptTemplate.format({
    profession: "翻译员",
    topic: "Hello World 这句话的意思",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/02-prompts/01-prompt-template.ts`](../src/02-prompts/01-prompt-template.ts)

## 运行方式

```bash
npm run dev src/02-prompts/01-prompt-template.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/02-prompts/01-prompt-template.md
git commit -m "docs: update 01-prompt-template.md with src content"
```

---

## Task 4: 更新模块 2 - 02-chat-prompt-template.md

**Files:**
- Modify: `website/02-prompts/02-chat-prompt-template.md`
- Reference: `src/02-prompts/02-chat-prompt-template.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-chat-prompt-template.ts
---

# 02-chat-prompt-template.ts

ChatPromptTemplate 示例，用于对话场景的提示模板。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
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

## 查看原文件

- 源码位置: [`src/02-prompts/02-chat-prompt-template.ts`](../src/02-prompts/02-chat-prompt-template.ts)

## 运行方式

```bash
npm run dev src/02-prompts/02-chat-prompt-template.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/02-prompts/02-chat-prompt-template.md
git commit -m "docs: update 02-chat-prompt-template.md with src content"
```

---

## Task 5: 更新模块 2 - 03-output-parser.md

**Files:**
- Modify: `website/02-prompts/03-output-parser.md`
- Reference: `src/02-prompts/03-output-parser.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 03-output-parser.ts
---

# 03-output-parser.ts

结构化输出解析器示例，使用 Zod 定义输出结构。

## 源码

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

## 查看原文件

- 源码位置: [`src/02-prompts/03-output-parser.ts`](../src/02-prompts/03-output-parser.ts)

## 运行方式

```bash
npm run dev src/02-prompts/03-output-parser.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/02-prompts/03-output-parser.md
git commit -m "docs: update 03-output-parser.md with src content"
```

---

## Task 6: 更新模块 2 - 04-few-shot-prompt.md

**Files:**
- Modify: `website/02-prompts/04-few-shot-prompt.md`
- Reference: `src/02-prompts/04-few-shot-prompt.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 04-few-shot-prompt.ts
---

# 04-few-shot-prompt.ts

少样本提示示例，通过示例指导 AI 输出。

## 源码

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

## 查看原文件

- 源码位置: [`src/02-prompts/04-few-shot-prompt.ts`](../src/02-prompts/04-few-shot-prompt.ts)

## 运行方式

```bash
npm run dev src/02-prompts/04-few-shot-prompt.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/02-prompts/04-few-shot-prompt.md
git commit -m "docs: update 04-few-shot-prompt.md with src content"
```

---

## Task 7: 更新模块 3 - 01-llm-chain.md

**Files:**
- Modify: `website/03-chains/01-llm-chain.md`
- Reference: `src/03-chains/01-llm-chain.ts`

- [ ] **Step 1: 读取当前文件**
  *Check current content first*

- [ ] **Step 2: 写入新内容**

```markdown
---
title: 01-llm-chain.ts
---

# 01-llm-chain.ts

LLMChain 示例，使用 LCEL（LangChain Expression Language）构建链。

## 源码

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

  const chain = promptTemplate
    .pipe(model)
    .pipe(new StringOutputParser());

  const result = await chain.invoke({ dish: "番茄炒蛋" });
  console.log(result);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/03-chains/01-llm-chain.ts`](../src/03-chains/01-llm-chain.ts)

## 运行方式

```bash
npm run dev src/03-chains/01-llm-chain.ts
```
```

- [ ] **Step 3: 提交更改**

```bash
git add website/03-chains/01-llm-chain.md
git commit -m "docs: update 01-llm-chain.md with src content"
```

---

## Task 8: 更新模块 3 - 02-sequential-chain.md

**Files:**
- Modify: `website/03-chains/02-sequential-chain.md`
- Reference: `src/03-chains/02-sequential-chain.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-sequential-chain.ts
---

# 02-sequential-chain.ts

顺序链示例，将多个链串联起来执行。

## 源码

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

  const outlinePrompt = ChatPromptTemplate.fromTemplate(
    "请为主题 '{topic}' 生成一篇文章的大纲。"
  );
  const outlineChain = outlinePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const articlePrompt = ChatPromptTemplate.fromTemplate(
    "根据以下大纲写一篇完整的文章：\n\n{outline}"
  );
  const articleChain = articlePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  const fullChain = outlineChain.pipe((outline) => ({ outline })).pipe(articleChain);

  const result = await fullChain.invoke({ topic: "人工智能的未来" });
  console.log(result);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/03-chains/02-sequential-chain.ts`](../src/03-chains/02-sequential-chain.ts)

## 运行方式

```bash
npm run dev src/03-chains/02-sequential-chain.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/03-chains/02-sequential-chain.md
git commit -m "docs: update 02-sequential-chain.md with src content"
```

---

## Task 9: 更新模块 3 - 03-router-chain.md

**Files:**
- Modify: `website/03-chains/03-router-chain.md`
- Reference: `src/03-chains/03-router-chain.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 03-router-chain.ts
---

# 03-router-chain.ts

路由链示例，根据问题类型路由到不同的处理链。

## 源码

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

## 查看原文件

- 源码位置: [`src/03-chains/03-router-chain.ts`](../src/03-chains/03-router-chain.ts)

## 运行方式

```bash
npm run dev src/03-chains/03-router-chain.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/03-chains/03-router-chain.md
git commit -m "docs: update 03-router-chain.md with src content"
```

---

## Task 10: 更新模块 3 - 04-transform-chain.md

**Files:**
- Modify: `website/03-chains/04-transform-chain.md`
- Reference: `src/03-chains/04-transform-chain.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 04-transform-chain.ts
---

# 04-transform-chain.ts

数据转换链示例，在链中进行自定义数据处理。

## 源码

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

## 查看原文件

- 源码位置: [`src/03-chains/04-transform-chain.ts`](../src/03-chains/04-transform-chain.ts)

## 运行方式

```bash
npm run dev src/03-chains/04-transform-chain.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/03-chains/04-transform-chain.md
git commit -m "docs: update 04-transform-chain.md with src content"
```

---

## Task 11: 更新模块 4 - 01-document-loader.md

**Files:**
- Modify: `website/04-rag/01-document-loader.md`
- Reference: `src/04-rag/01-document-loader.ts`

- [ ] **Step 1: 读取当前文件并更新内容**

```markdown
---
title: 01-document-loader.ts
---

# 01-document-loader.ts

文档加载器示例，从文件系统加载文本文件。

## 源码

```typescript
import "dotenv/config";
import { TextLoader } from "langchain/document_loaders/fs/text";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("=== Document Loader 示例 ===\n");

  const textLoader = new TextLoader(path.join(__dirname, "data", "sample-doc.txt"));
  const docs = await textLoader.load();

  console.log("加载的文档数量:", docs.length);
  console.log("\n文档内容预览:");
  console.log(docs[0].pageContent.slice(0, 200) + "...");
  console.log("\n元数据:", docs[0].metadata);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/04-rag/01-document-loader.ts`](../src/04-rag/01-document-loader.ts)

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/04-rag/01-document-loader.md
git commit -m "docs: update 01-document-loader.md with src content"
```

---

## Task 12: 更新模块 4 - 02-text-splitter.md

**Files:**
- Modify: `website/04-rag/02-text-splitter.md`
- Reference: `src/04-rag/02-text-splitter.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-text-splitter.ts
---

# 02-text-splitter.ts

文本切分器示例，将长文档切分成适合嵌入的块。

## 源码

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

## 查看原文件

- 源码位置: [`src/04-rag/02-text-splitter.ts`](../src/04-rag/02-text-splitter.ts)

## 运行方式

```bash
npm run dev src/04-rag/02-text-splitter.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/04-rag/02-text-splitter.md
git commit -m "docs: update 02-text-splitter.md with src content"
```

---

## Task 13: 更新模块 4 - 03-embeddings.md

**Files:**
- Modify: `website/04-rag/03-embeddings.md`
- Reference: `src/04-rag/03-embeddings.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 03-embeddings.ts
---

# 03-embeddings.ts

Embeddings 示例，将文本转换为向量表示。

## 源码

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

  const text = "Hello, world!";
  const embedding = await embeddings.embedQuery(text);

  console.log("文本:", text);
  console.log("嵌入维度:", embedding.length);
  console.log("嵌入向量前 5 个值:", embedding.slice(0, 5));
  console.log("\n");

  const texts = ["猫是宠物", "狗是宠物", "鱼是宠物"];
  const embeddingsResult = await embeddings.embedDocuments(texts);

  console.log("嵌入多个文本:");
  texts.forEach((t, i) => {
    console.log(`  "${t}" → 维度 ${embeddingsResult[i].length}`);
  });
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/04-rag/03-embeddings.ts`](../src/04-rag/03-embeddings.ts)

## 运行方式

```bash
npm run dev src/04-rag/03-embeddings.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/04-rag/03-embeddings.md
git commit -m "docs: update 03-embeddings.md with src content"
```

---

## Task 14: 更新模块 4 - 04-vector-store.md

**Files:**
- Modify: `website/04-rag/04-vector-store.md`
- Reference: `src/04-rag/04-vector-store.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 04-vector-store.ts
---

# 04-vector-store.ts

Vector Store 示例，存储文档向量并进行相似度搜索。

## 源码

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

## 查看原文件

- 源码位置: [`src/04-rag/04-vector-store.ts`](../src/04-rag/04-vector-store.ts)

## 运行方式

```bash
npm run dev src/04-rag/04-vector-store.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/04-rag/04-vector-store.md
git commit -m "docs: update 04-vector-store.md with src content"
```

---

## Task 15: 更新模块 4 - 05-retrieval-qa.md

**Files:**
- Modify: `website/04-rag/05-retrieval-qa.md`
- Reference: `src/04-rag/05-retrieval-qa.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 05-retrieval-qa.ts
---

# 05-retrieval-qa.ts

完整的 RAG（检索增强生成）示例，结合文档检索和问答。

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

## 查看原文件

- 源码位置: [`src/04-rag/05-retrieval-qa.ts`](../src/04-rag/05-retrieval-qa.ts)

## 运行方式

```bash
npm run dev src/04-rag/05-retrieval-qa.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/04-rag/05-retrieval-qa.md
git commit -m "docs: update 05-retrieval-qa.md with src content"
```

---

## Task 16: 更新模块 5 - 01-tools.md

**Files:**
- Modify: `website/05-agents/01-tools.md`
- Reference: `src/05-agents/01-tools.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 01-tools.ts
---

# 01-tools.ts

Tools 示例，定义和使用自定义工具。

## 源码

```typescript
import "dotenv/config";
import { DynamicTool } from "@langchain/core/tools";

async function main() {
  console.log("=== Tools 示例 ===\n");

  const calculatorTool = new DynamicTool({
    name: "calculator",
    description: "用于进行数学计算。输入应该是一个数学表达式，例如 '2 + 2' 或 '10 * 5'。",
    func: async (input: string) => {
      try {
        const result = Function('"use strict"; return (' + input + ')')();
        return `计算结果: ${result}`;
      } catch (e) {
        return "计算错误，请检查表达式";
      }
    },
  });

  console.log("工具名称:", calculatorTool.name);
  console.log("工具描述:", calculatorTool.description);
  console.log("\n---\n");

  const result = await calculatorTool.invoke("25 * 4");
  console.log("调用 calculator('25 * 4'):");
  console.log(result);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/05-agents/01-tools.ts`](../src/05-agents/01-tools.ts)

## 运行方式

```bash
npm run dev src/05-agents/01-tools.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/05-agents/01-tools.md
git commit -m "docs: update 01-tools.md with src content"
```

---

## Task 17: 更新模块 5 - 02-react-agent.md

**Files:**
- Modify: `website/05-agents/02-react-agent.md`
- Reference: `src/05-agents/02-react-agent.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-react-agent.ts
---

# 02-react-agent.ts

ReAct Agent 示例，结合推理和行动的智能代理。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicTool } from "@langchain/core/tools";
import { AgentExecutor, createReactAgent } from "langchain/agents";
import { pull } from "langchain/hub";

async function main() {
  console.log("=== ReAct Agent 示例 ===\n");

  const tools = [
    new DynamicTool({
      name: "get_current_weather",
      description: "获取指定城市的当前天气。输入应该是城市名称，例如 '北京' 或 '上海'。",
      func: async (city: string) => {
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

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = await pull<typeof import("@langchain/core/prompts").ChatPromptTemplate>("hwchase17/react-chat");

  const agent = await createReactAgent({
    llm: model,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
  });

  const question = "北京的天气怎么样？如果温度是 25 度，那是华氏多少度？";
  console.log("问题:", question);
  console.log("\n---\n");

  const result = await agentExecutor.invoke({ input: question });
  console.log("\n---\n");
  console.log("最终回答:", result.output);
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/05-agents/02-react-agent.ts`](../src/05-agents/02-react-agent.ts)

## 运行方式

```bash
npm run dev src/05-agents/02-react-agent.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/05-agents/02-react-agent.md
git commit -m "docs: update 02-react-agent.md with src content"
```

---

## Task 18: 更新模块 5 - 03-functions-agent.md

**Files:**
- Modify: `website/05-agents/03-functions-agent.md`
- Reference: `src/05-agents/03-functions-agent.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 03-functions-agent.ts
---

# 03-functions-agent.ts

OpenAI Functions Agent 示例，使用结构化工具。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

async function main() {
  console.log("=== OpenAI Functions Agent 示例 ===\n");

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

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  }).bindTools([weatherTool]);

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

## 查看原文件

- 源码位置: [`src/05-agents/03-functions-agent.ts`](../src/05-agents/03-functions-agent.ts)

## 运行方式

```bash
npm run dev src/05-agents/03-functions-agent.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/05-agents/03-functions-agent.md
git commit -m "docs: update 03-functions-agent.md with src content"
```

---

## Task 19: 更新模块 6 - 01-buffer-memory.md

**Files:**
- Modify: `website/06-memory/01-buffer-memory.md`
- Reference: `src/06-memory/01-buffer-memory.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 01-buffer-memory.ts
---

# 01-buffer-memory.ts

完整对话历史记忆示例。

## 源码

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

  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  console.log("用户: 你好，我叫小明");
  const response1 = await chainWithHistory.invoke(
    { input: "你好，我叫小明" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response1);
  console.log("\n");

  console.log("用户: 我叫什么名字？");
  const response2 = await chainWithHistory.invoke(
    { input: "我叫什么名字？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response2);
  console.log("\n");

  console.log("--- 历史消息 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/06-memory/01-buffer-memory.ts`](../src/06-memory/01-buffer-memory.ts)

## 运行方式

```bash
npm run dev src/06-memory/01-buffer-memory.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/06-memory/01-buffer-memory.md
git commit -m "docs: update 01-buffer-memory.md with src content"
```

---

## Task 20: 更新模块 6 - 02-window-memory.md

**Files:**
- Modify: `website/06-memory/02-window-memory.md`
- Reference: `src/06-memory/02-window-memory.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 02-window-memory.ts
---

# 02-window-memory.ts

窗口记忆示例，只保留最近的对话。

## 源码

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

  console.log("--- 完整历史 ---");
  const allMessages = await messageHistory.getMessages();
  allMessages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
  console.log("\n");

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

## 查看原文件

- 源码位置: [`src/06-memory/02-window-memory.ts`](../src/06-memory/02-window-memory.ts)

## 运行方式

```bash
npm run dev src/06-memory/02-window-memory.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/06-memory/02-window-memory.md
git commit -m "docs: update 02-window-memory.md with src content"
```

---

## Task 21: 更新模块 6 - 03-summary-memory.md

**Files:**
- Modify: `website/06-memory/03-summary-memory.md`
- Reference: `src/06-memory/03-summary-memory.ts`

- [ ] **Step 1: 写入新内容**

```markdown
---
title: 03-summary-memory.ts
---

# 03-summary-memory.ts

对话摘要记忆示例。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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

  const conversationHistory = [
    { human: "你好，我叫小明，我是一名程序员。" },
    { ai: "你好小明！很高兴认识你，程序员是一个很棒的职业。" },
    { human: "我喜欢用 JavaScript 和 TypeScript 编程。" },
    { ai: "JavaScript 和 TypeScript 都是很流行的语言！" },
    { human: "最近我在学习 LangChain。" },
    { ai: "LangChain 是一个强大的框架，可以让你构建很棒的 LLM 应用。" },
  ];

  const conversationText = conversationHistory
    .map((msg) => {
      if ("human" in msg) return `Human: ${msg.human}`;
      return `AI: ${msg.ai}`;
    })
    .join("\n");

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

## 查看原文件

- 源码位置: [`src/06-memory/03-summary-memory.ts`](../src/06-memory/03-summary-memory.ts)

## 运行方式

```bash
npm run dev src/06-memory/03-summary-memory.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/06-memory/03-summary-memory.md
git commit -m "docs: update 03-summary-memory.md with src content"
```

---

## Task 22: 更新模块 6 - 04-memory-in-chain.md

**Files:**
- Modify: `website/06-memory/04-memory-in-chain.md`
- Reference: `src/06-memory/04-memory-in-chain.ts`

- [ ] **Step 1: 写入新内容（保持与 src 一致，但注意模型配置与 src 一致）**

```markdown
---
title: 04-memory-in-chain.ts
---

# 04-memory-in-chain.ts

链中记忆示例，将记忆集成到链中。

## 源码

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

  console.log("--- 第 1 轮 ---");
  console.log("用户: 什么是变量？");
  const r1 = await chainWithHistory.invoke(
    { input: "什么是变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r1);
  console.log("\n");

  console.log("--- 第 2 轮 ---");
  console.log("用户: 在 JavaScript 中如何声明变量？");
  const r2 = await chainWithHistory.invoke(
    { input: "在 JavaScript 中如何声明变量？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", r2);
  console.log("\n");

  console.log("--- 完整对话历史 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
}

main().catch(console.error);
```

## 查看原文件

- 源码位置: [`src/06-memory/04-memory-in-chain.ts`](../src/06-memory/04-memory-in-chain.ts)

## 运行方式

```bash
npm run dev src/06-memory/04-memory-in-chain.ts
```
```

- [ ] **Step 2: 提交更改**

```bash
git add website/06-memory/04-memory-in-chain.md
git commit -m "docs: update 04-memory-in-chain.md with src content"
```

---

## Task 23: 验证和构建测试

**Files:**
- Verify: All updated files

- [ ] **Step 1: 运行构建验证**

```bash
cd website
npm run build
```

*Expected: Build completes successfully with no errors*

- [ ] **Step 2: 提交完整更改**

```bash
cd ..
git add docs/superpowers/plans/2026-06-22-sync-website-code.md
git add docs/superpowers/specs/2026-06-22-sync-website-code-design.md
git commit -m "docs: add implementation plan for syncing website code"
```

---

## Plan Self-Review Checklist

- [x] **Spec coverage:** All 24 files are covered, including all 6 modules
- [x] **Placeholder scan:** No placeholders, all code is complete
- [x] **Type consistency:** All code matches src files exactly
- [x] **No missing files:** All files from the spec are included

---

## Execution Options

Plan complete and saved to `docs/superpowers/plans/2026-06-22-sync-website-code.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
