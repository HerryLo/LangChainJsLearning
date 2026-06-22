# VitePress 教程网站实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有的 LangChain.js 教程项目转换为 VitePress 静态网站，保留所有源码和目录结构，提供纯展示版本的教程网站。

**Architecture:** 在独立的 `website/` 目录中创建 VitePress 项目，读取 `src/` 目录下的源码文件，将其转换为 Markdown 页面展示。原项目保持不变。

**Tech Stack:** VitePress 1.x, Node.js

---

## Task 1: 初始化 VitePress 项目

**Files:**
- Create: `website/package.json`
- Create: `website/.vitepress/config.ts`

- [ ] **Step 1: 创建 website/package.json**

```json
{
  "name": "langchain-tutorial-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

- [ ] **Step 2: 创建 .vitepress/config.ts**

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LangChain.js 教程',
  description: '循序渐进学习 LangChain.js',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' }
    ],

    sidebar: {
      '/': [
        {
          text: '模块 1：环境搭建与基础 LLM 调用',
          collapsed: false,
          items: [
            { text: '模块介绍', link: '/01-setup/' },
            { text: '01-simple-llm', link: '/01-setup/01-simple-llm' },
            { text: '02-chat-model', link: '/01-setup/02-chat-model' }
          ]
        },
        {
          text: '模块 2：Prompts（提示模板和输出解析器）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/02-prompts/' },
            { text: '01-prompt-template', link: '/02-prompts/01-prompt-template' },
            { text: '02-chat-prompt-template', link: '/02-prompts/02-chat-prompt-template' },
            { text: '03-output-parser', link: '/02-prompts/03-output-parser' },
            { text: '04-few-shot-prompt', link: '/02-prompts/04-few-shot-prompt' }
          ]
        },
        {
          text: '模块 3：Chains（链）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/03-chains/' },
            { text: '01-llm-chain', link: '/03-chains/01-llm-chain' },
            { text: '02-sequential-chain', link: '/03-chains/02-sequential-chain' },
            { text: '03-router-chain', link: '/03-chains/03-router-chain' },
            { text: '04-transform-chain', link: '/03-chains/04-transform-chain' }
          ]
        },
        {
          text: '模块 4：RAG（检索增强生成）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/04-rag/' },
            { text: '01-document-loader', link: '/04-rag/01-document-loader' },
            { text: '02-text-splitter', link: '/04-rag/02-text-splitter' },
            { text: '03-embeddings', link: '/04-rag/03-embeddings' },
            { text: '04-vector-store', link: '/04-rag/04-vector-store' },
            { text: '05-retrieval-qa', link: '/04-rag/05-retrieval-qa' }
          ]
        },
        {
          text: '模块 5：Agents（智能代理）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/05-agents/' },
            { text: '01-tools', link: '/05-agents/01-tools' },
            { text: '02-react-agent', link: '/05-agents/02-react-agent' },
            { text: '03-functions-agent', link: '/05-agents/03-functions-agent' }
          ]
        },
        {
          text: '模块 6：Memory（记忆）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/06-memory/' },
            { text: '01-buffer-memory', link: '/06-memory/01-buffer-memory' },
            { text: '02-window-memory', link: '/06-memory/02-window-memory' },
            { text: '03-summary-memory', link: '/06-memory/03-summary-memory' },
            { text: '04-memory-in-chain', link: '/06-memory/04-memory-in-chain' }
          ]
        }
      ]
    }
  }
})
```

- [ ] **Step 3: 安装 VitePress 依赖（可选，用于验证）**

Run: `cd website && npm install`
Expected: 依赖安装成功

- [ ] **Step 4: 提交**

```bash
git add website/package.json website/.vitepress/config.ts
git commit -m "feat: initialize VitePress project structure"
```

---

## Task 2: 创建首页

**Files:**
- Create: `website/index.md`

- [ ] **Step 1: 创建 website/index.md**

```markdown
---
title: LangChain.js 教程
description: 循序渐进学习 LangChain.js
---

# LangChain.js 教程

一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

## 前置要求

- Node.js 20+
- 智谱 AI API Key 或 OpenAI API Key

## 环境搭建

### 1. 克隆项目

```bash
git clone <repo-url>
cd langchain_example
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

### 4. 运行示例

```bash
npm run dev src/01-setup/01-simple-llm.ts
```

## 模块导航

::: info 模块 1：环境搭建与基础 LLM 调用
- [01-simple-llm](01-setup/01-simple-llm.md)
- [02-chat-model](01-setup/02-chat-model.md)
:::

::: info 模块 2：Prompts（提示模板和输出解析器）
- [01-prompt-template](02-prompts/01-prompt-template.md)
- [02-chat-prompt-template](02-prompts/02-chat-prompt-template.md)
- [03-output-parser](02-prompts/03-output-parser.md)
- [04-few-shot-prompt](02-prompts/04-few-shot-prompt.md)
:::

::: info 模块 3：Chains（链）
- [01-llm-chain](03-chains/01-llm-chain.md)
- [02-sequential-chain](03-chains/02-sequential-chain.md)
- [03-router-chain](03-chains/03-router-chain.md)
- [04-transform-chain](03-chains/04-transform-chain.md)
:::

::: info 模块 4：RAG（检索增强生成）
- [01-document-loader](04-rag/01-document-loader.md)
- [02-text-splitter](04-rag/02-text-splitter.md)
- [03-embeddings](04-rag/03-embeddings.md)
- [04-vector-store](04-rag/04-vector-store.md)
- [05-retrieval-qa](04-rag/05-retrieval-qa.md)
:::

::: info 模块 5：Agents（智能代理）
- [01-tools](05-agents/01-tools.md)
- [02-react-agent](05-agents/02-react-agent.md)
- [03-functions-agent](05-agents/03-functions-agent.md)
:::

::: info 模块 6：Memory（记忆）
- [01-buffer-memory](06-memory/01-buffer-memory.md)
- [02-window-memory](06-memory/02-window-memory.md)
- [03-summary-memory](06-memory/03-summary-memory.md)
- [04-memory-in-chain](06-memory/04-memory-in-chain.md)
:::
```

- [ ] **Step 2: 提交**

```bash
git add website/index.md
git commit -m "feat: add tutorial homepage"
```

---

## Task 3: 创建模块 1 页面

**Files:**
- Create: `website/01-setup/index.md`
- Create: `website/01-setup/01-simple-llm.md`
- Create: `website/01-setup/02-chat-model.md`

- [ ] **Step 1: 创建 01-setup/index.md**

```markdown
---
title: 模块 1：环境搭建与基础 LLM 调用
---

# 模块 1：环境搭建与基础 LLM 调用

## 学习要点

- 如何初始化 ChatOpenAI 模型
- 如何使用 temperature 参数控制随机性
- SystemMessage 和 HumanMessage 的区别

## 示例列表

- [01-simple-llm](01-simple-llm.md) - 最简单的 LLM 调用
- [02-chat-model](02-chat-model.md) - 多轮对话示例

## 运行方式

```bash
npm run dev src/01-setup/01-simple-llm.ts
npm run dev src/01-setup/02-chat-model.ts
```
```

- [ ] **Step 2: 创建 01-setup/01-simple-llm.md**

```markdown
---
title: 01-simple-llm.ts
---

# 01-simple-llm.ts

最简单的 LLM 调用示例，展示如何初始化模型并获取回复。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-pro",
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

- [ ] **Step 3: 创建 01-setup/02-chat-model.md**

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
  model: "Doubao-Seed-2.0-pro",
  temperature: 0.7
});

async function main() {
  console.log("=== 多轮对话示例 ===\n");

  const messages = [
    new SystemMessage("你是一个 helpful 的 AI 助手，用中文回答问题。"),
    new HumanMessage("什么是 LangChain？"),
  ];
  const response1 = await model.invoke(messages);
  console.log("用户: 什么是 LangChain？");
  console.log("AI:", response1.content);
  console.log();

  messages.push(response1);
  messages.push(new HumanMessage("它有什么特点？"));
  const response2 = await model.invoke(messages);
  console.log("用户: 它有什么特点？");
  console.log("AI:", response2.content);
  console.log();

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

- [ ] **Step 4: 提交**

```bash
git add website/01-setup/
git commit -m "feat: add module 1 (setup) pages"
```

---

## Task 4: 创建模块 2 页面

**Files:**
- Create: `website/02-prompts/index.md`
- Create: `website/02-prompts/01-prompt-template.md`
- Create: `website/02-prompts/02-chat-prompt-template.md`
- Create: `website/02-prompts/03-output-parser.md`
- Create: `website/02-prompts/04-few-shot-prompt.md`

- [ ] **Step 1: 创建 02-prompts/index.md**

```markdown
---
title: 模块 2：Prompts（提示模板和输出解析器）
---

# 模块 2：Prompts（提示模板和输出解析器）

## 学习要点

- PromptTemplate：动态填充变量
- ChatPromptTemplate：对话式提示
- StructuredOutputParser：结构化输出（使用 Zod）
- FewShotPromptTemplate：少样本学习

## 示例列表

- [01-prompt-template](01-prompt-template.md) - 提示模板
- [02-chat-prompt-template](02-chat-prompt-template.md) - 对话式提示
- [03-output-parser](03-output-parser.md) - 结构化输出
- [04-few-shot-prompt](04-few-shot-prompt.md) - 少样本学习

## 运行方式

```bash
npm run dev src/02-prompts/01-prompt-template.ts
npm run dev src/02-prompts/02-chat-prompt-template.ts
npm run dev src/02-prompts/03-output-parser.ts
npm run dev src/02-prompts/04-few-shot-prompt.ts
```
```

- [ ] **Step 2: 创建 02-prompts/01-prompt-template.md**

```markdown
---
title: 01-prompt-template.ts
---

# 01-prompt-template.ts

提示模板示例，展示如何使用变量动态生成提示。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-pro",
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

- [ ] **Step 3: 创建 02-prompts/02-chat-prompt-template.md**

```markdown
---
title: 02-chat-prompt-template.ts
---

# 02-chat-prompt-template.ts

对话式提示模板示例。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-pro",
  temperature: 0.7
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

- [ ] **Step 4: 创建 02-prompts/03-output-parser.md**

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
  model: "Doubao-Seed-2.0-pro",
  temperature: 0.1
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

- [ ] **Step 5: 创建 02-prompts/04-few-shot-prompt.md**

```markdown
---
title: 04-few-shot-prompt.ts
---

# 04-few-shot-prompt.ts

少样本学习示例，通过示例让 AI 理解任务要求。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-pro",
  temperature: 0.1
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

- [ ] **Step 6: 提交**

```bash
git add website/02-prompts/
git commit -m "feat: add module 2 (prompts) pages"
```

---

## Task 5: 创建模块 3 页面

**Files:**
- Create: `website/03-chains/index.md`
- Create: `website/03-chains/01-llm-chain.md`
- Create: `website/03-chains/02-sequential-chain.md`
- Create: `website/03-chains/03-router-chain.md`
- Create: `website/03-chains/04-transform-chain.md`

- [ ] **Step 1: 创建 03-chains/index.md**

```markdown
---
title: 模块 3：Chains（链）
---

# 模块 3：Chains（链）

## 学习要点

- LCEL（LangChain Expression Language）语法
- 顺序链：将多个步骤串联起来
- 路由链：根据条件选择不同的处理路径
- 数据转换：在链中自定义数据处理逻辑

## 示例列表

- [01-llm-chain](01-llm-chain.md) - LLM 链
- [02-sequential-chain](02-sequential-chain.md) - 顺序链
- [03-router-chain](03-router-chain.md) - 路由链
- [04-transform-chain](04-transform-chain.md) - 转换链

## 运行方式

```bash
npm run dev src/03-chains/01-llm-chain.ts
npm run dev src/03-chains/02-sequential-chain.ts
npm run dev src/03-chains/03-router-chain.ts
npm run dev src/03-chains/04-transform-chain.ts
```
```

- [ ] **Step 2: 创建 03-chains/01-llm-chain.md**

```markdown
---
title: 01-llm-chain.ts
---

# 01-llm-chain.ts

LLM 链示例，使用 LCEL 语法构建链。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.1
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

- [ ] **Step 3: 创建 03-chains/02-sequential-chain.md**

```markdown
---
title: 02-sequential-chain.ts
---

# 02-sequential-chain.ts

顺序链示例，将多个步骤串联起来。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.1
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

- [ ] **Step 4: 创建 03-chains/03-router-chain.md**

```markdown
---
title: 03-router-chain.ts
---

# 03-router-chain.ts

路由链示例，根据条件选择不同处理路径。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.1
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

- [ ] **Step 5: 创建 03-chains/04-transform-chain.md**

```markdown
---
title: 04-transform-chain.ts
---

# 04-transform-chain.ts

转换链示例，在链中自定义数据处理逻辑。

## 源码

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.1
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

- [ ] **Step 6: 提交**

```bash
git add website/03-chains/
git commit -m "feat: add module 3 (chains) pages"
```

---

## Task 6: 创建模块 4-6 页面

**Files:**
- Create: `website/04-rag/index.md`
- Create: `website/04-rag/01-document-loader.md`
- Create: `website/04-rag/02-text-splitter.md`
- Create: `website/04-rag/03-embeddings.md`
- Create: `website/04-rag/04-vector-store.md`
- Create: `website/04-rag/05-retrieval-qa.md`
- Create: `website/05-agents/index.md`
- Create: `website/05-agents/01-tools.md`
- Create: `website/05-agents/02-react-agent.md`
- Create: `website/05-agents/03-functions-agent.md`
- Create: `website/06-memory/index.md`
- Create: `website/06-memory/01-buffer-memory.md`
- Create: `website/06-memory/02-window-memory.md`
- Create: `website/06-memory/03-summary-memory.md`
- Create: `website/06-memory/04-memory-in-chain.md`

- [ ] **Step 1: 创建 04-rag/index.md**

```markdown
---
title: 模块 4：RAG（检索增强生成）
---

# 模块 4：RAG（检索增强生成）

## 学习要点

- Document Loader：加载各种格式的文档
- Text Splitter：将文档切分成合适的块
- Embeddings：将文本转换成向量
- Vector Store：存储和检索向量
- Retrieval QA：端到端的 RAG 问答系统

## 示例列表

- [01-document-loader](01-document-loader.md) - 文档加载器
- [02-text-splitter](02-text-splitter.md) - 文本切分器
- [03-embeddings](03-embeddings.md) - 向量化
- [04-vector-store](04-vector-store.md) - 向量存储
- [05-retrieval-qa](05-retrieval-qa.md) - 检索问答

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
npm run dev src/04-rag/02-text-splitter.ts
npm run dev src/04-rag/03-embeddings.ts
npm run dev src/04-rag/04-vector-store.ts
npm run dev src/04-rag/05-retrieval-qa.ts
```
```

- [ ] **Step 2: 创建 04-rag 的示例页面模板**

注意: 由于源文件内容较多，请参考前面模块的格式，读取 src/04-rag/ 目录下的每个 .ts 文件，然后按照相同的格式创建对应的 .md 文件。

每个文件的格式都遵循:
- 标题和简短说明
- 完整的源码块
- 原文件链接
- 运行命令

例如，01-document-loader.md:
```markdown
---
title: 01-document-loader.ts
---

# 01-document-loader.ts

文档加载器示例。

## 源码

```typescript
/* 这里粘贴完整的 src/04-rag/01-document-loader.ts 内容 */
```

## 查看原文件

- 源码位置: [`src/04-rag/01-document-loader.ts`](../src/04-rag/01-document-loader.ts)

## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
```
```

按照这个格式，创建 02-text-splitter.md, 03-embeddings.md, 04-vector-store.md, 05-retrieval-qa.md

- [ ] **Step 3: 创建 05-agents/index.md**

```markdown
---
title: 模块 5：Agents（智能代理）
---

# 模块 5：Agents（智能代理）

## 学习要点

- Tools：定义和使用工具
- ReAct Agent：使用 ReAct 推理模式的代理
- OpenAI Functions：结构化工具调用

## 示例列表

- [01-tools](01-tools.md) - 工具定义
- [02-react-agent](02-react-agent.md) - ReAct 代理
- [03-functions-agent](03-functions-agent.md) - 函数调用代理

## 运行方式

```bash
npm run dev src/05-agents/01-tools.ts
npm run dev src/05-agents/02-react-agent.ts
npm run dev src/05-agents/03-functions-agent.ts
```
```

- [ ] **Step 4: 创建 05-agents 的示例页面**

按照同样的格式，为 src/05-agents/ 目录下的每个 .ts 文件创建对应的 .md 页面。

- [ ] **Step 5: 创建 06-memory/index.md**

```markdown
---
title: 模块 6：Memory（记忆）
---

# 模块 6：Memory（记忆）

## 学习要点

- ConversationBufferMemory：保存完整对话历史
- ConversationBufferWindowMemory：只保留最近 k 条
- ConversationSummaryMemory：保存对话摘要
- 在链中集成记忆

## 示例列表

- [01-buffer-memory](01-buffer-memory.md) - 完整记忆
- [02-window-memory](02-window-memory.md) - 窗口记忆
- [03-summary-memory](03-summary-memory.md) - 摘要记忆
- [04-memory-in-chain](04-memory-in-chain.md) - 链中记忆

## 运行方式

```bash
npm run dev src/06-memory/01-buffer-memory.ts
npm run dev src/06-memory/02-window-memory.ts
npm run dev src/06-memory/03-summary-memory.ts
npm run dev src/06-memory/04-memory-in-chain.ts
```
```

- [ ] **Step 6: 创建 06-memory 的示例页面**

按照同样的格式，为 src/06-memory/ 目录下的每个 .ts 文件创建对应的 .md 页面。

- [ ] **Step 7: 提交**

```bash
git add website/04-rag/ website/05-agents/ website/06-memory/
git commit -m "feat: add modules 4-6 (RAG, Agents, Memory) pages"
```

注意: 由于 Task 6 的内容较多，需要读取 src/04-rag/、src/05-agents/、src/06-memory/ 下每个 .ts 文件的完整内容，才能创建对应的 .md 页面。请确保每个文件都完整地嵌入到对应的 Markdown 文件中。

---

## Task 7: 更新主 package.json（可选）

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 在主 package.json 中添加 docs 脚本（如果用户希望添加）

在 "scripts" 部分添加：

```json
{
  "scripts": {
    "dev": "tsx",
    "typecheck": "tsc --noEmit",
    "docs:dev": "cd website && npm run dev",
    "docs:build": "cd website && npm run build",
    "docs:preview": "cd website && npm run preview"
  }
}
```

- [ ] **Step 2: 提交（如果修改了）**

```bash
git add package.json
git commit -m "chore: add docs scripts to root package.json"
```

---

## Task 8: 验证和测试

**Files:** 无新文件

- [ ] **Step 1: 安装 VitePress 并启动预览**

```bash
cd website
npm install
npm run dev
```

Expected: VitePress dev server starts successfully at http://localhost:5173

- [ ] **Step 2: 手动验证网站功能**

访问 http://localhost:5173 并检查：
- 首页加载正常
- 侧边栏导航正常
- 模块页面可以访问
- 代码块正确显示

- [ ] **Step 3: 停止 dev server 并完成**

确认无误后，停止 dev server（Ctrl+C），任务完成。

---

## 验收检查清单

- [ ] website/ 目录独立存在，不影响原项目
- [ ] 所有 6 个模块、20+ 示例完整展示
- [ ] 侧边栏按模块分组导航
- [ ] 每个页面有正确的代码块展示
- [ ] 首页包含完整的教程介绍和环境搭建说明
- [ ] `cd website && npm run dev` 可以正常启动预览

---
