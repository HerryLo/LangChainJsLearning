# withStructuredOutput API 升级 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 2 个使用 `StructuredOutputParser` 的源文件更新为 LangChain 1.5.x 推荐的 `.withStructuredOutput()` API，并同步更新对应的 website md 文档。

**Architecture:** 两个独立的源文件各自改造，每个源文件改造后同步更新对应的 md 文档。两个示例之间无耦合，可以独立完成和验证。

**Tech Stack:** TypeScript, LangChain 1.5.x (`@langchain/openai`, `zod`), tsx 运行时。

---

## File Structure

需要修改的 4 个文件，每个文件职责单一：

| 文件 | 职责 |
|------|------|
| `src/02-prompts/03-output-parser.ts` | 演示结构化输出 API（情感分析） |
| `website/02-prompts/03-output-parser.md` | 对应的教学文档 |
| `src/03-chains/03-router-chain.ts` | 演示路由链（先分类再路由） |
| `website/03-chains/03-router-chain.md` | 对应的教学文档 |

---

## Task 1: 更新 `src/02-prompts/03-output-parser.ts`

**Files:**
- Modify: `src/02-prompts/03-output-parser.ts`

- [ ] **Step 1: 用新代码替换整个文件内容**

把 `src/02-prompts/03-output-parser.ts` 整个文件内容替换为：

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  try {
    console.log("=== 结构化输出示例 ===\n");

    const schema = z.object({
      sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
      confidence: z.number().min(0).max(1).describe("置信度"),
      reasoning: z.string().describe("分析理由"),
    });

    // 使用推荐的 withStructuredOutput API
    const structuredModel = model.withStructuredOutput(schema);

    const text = "这家餐厅的食物非常好吃，服务也很棒！";
    console.log("分析文本:", text);
    console.log("\n---\n");

    const result = await structuredModel.invoke(
      `分析以下文本的情感：\n${text}`
    );

    console.log("解析结果:", result);
  } catch (error) {
    console.error("Error during output parser example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: PASS，无错误输出。

- [ ] **Step 3: 运行示例验证功能**

Run: `npm run dev src/02-prompts/03-output-parser.ts`
Expected: 输出包含 `分析文本:` 和 `解析结果:`，解析结果是一个对象，包含 `sentiment`（值为 `positive`/`negative`/`neutral` 之一）、`confidence`（0-1 的数字）、`reasoning`（字符串）三个字段。

- [ ] **Step 4: 提交**

```bash
git add src/02-prompts/03-output-parser.ts
git commit -m "refactor: use withStructuredOutput in 03-output-parser"
```

---

## Task 2: 更新 `website/02-prompts/03-output-parser.md`

**Files:**
- Modify: `website/02-prompts/03-output-parser.md`

- [ ] **Step 1: 更新学习要点**

找到文件中的 `## 学习要点` 部分，把：

```markdown
1. 使用 Zod 定义 schema：`z.object()`、`z.enum()`、`z.number()` 等
2. 使用 `StructuredOutputParser.fromZodSchema()` 创建解析器
3. 使用 `parser.getFormatInstructions()` 获取格式说明插入提示中
4. 使用 `parser.parse()` 解析 AI 返回的内容
5. 进行环境变量检查和错误处理
```

替换为：

```markdown
1. 使用 Zod 定义 schema：`z.object()`、`z.enum()`、`z.number()` 等
2. 使用 `model.withStructuredOutput(schema)` 创建结构化输出模型（推荐方式）
3. 直接调用 `.invoke()` 返回符合 schema 的对象，无需手动解析
4. 进行环境变量检查和错误处理
```

- [ ] **Step 2: 更新源码块**

找到文件中的 `## 源码` 部分下面的 typescript 代码块（从 `import "dotenv/config";` 开始，到 `main().catch(console.error);` 结束），整个替换为：

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  try {
    console.log("=== 结构化输出示例 ===\n");

    const schema = z.object({
      sentiment: z.enum(["positive", "negative", "neutral"]).describe("情感倾向"),
      confidence: z.number().min(0).max(1).describe("置信度"),
      reasoning: z.string().describe("分析理由"),
    });

    // 使用推荐的 withStructuredOutput API
    const structuredModel = model.withStructuredOutput(schema);

    const text = "这家餐厅的食物非常好吃，服务也很棒！";
    console.log("分析文本:", text);
    console.log("\n---\n");

    const result = await structuredModel.invoke(
      `分析以下文本的情感：\n${text}`
    );

    console.log("解析结果:", result);
  } catch (error) {
    console.error("Error during output parser example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

- [ ] **Step 3: 提交**

```bash
git add website/02-prompts/03-output-parser.md
git commit -m "docs: sync 03-output-parser.md with new API"
```

---

## Task 3: 更新 `src/03-chains/03-router-chain.ts`

**Files:**
- Modify: `src/03-chains/03-router-chain.ts`

- [ ] **Step 1: 用新代码替换整个文件内容**

把 `src/03-chains/03-router-chain.ts` 整个文件内容替换为：

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  try {
    console.log("=== 路由链示例 ===\n");

    // 使用 withStructuredOutput 进行分类
    const classificationSchema = z.object({
      category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
    });
    const classifier = model.withStructuredOutput(classificationSchema);

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

    const classification = await classifier.invoke(
      `将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）：\n${question}`
    );

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
  } catch (error) {
    console.error("Error during router chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

- [ ] **Step 2: 运行类型检查**

Run: `npm run typecheck`
Expected: PASS，无错误输出。

- [ ] **Step 3: 运行示例验证功能**

Run: `npm run dev src/03-chains/03-router-chain.ts`
Expected: 
- 输出 `问题: 怎么做红烧肉？`
- 输出 `分类结果: cooking`
- 输出一段红烧肉的做法文本

- [ ] **Step 4: 提交**

```bash
git add src/03-chains/03-router-chain.ts
git commit -m "refactor: use withStructuredOutput in 03-router-chain"
```

---

## Task 4: 更新 `website/03-chains/03-router-chain.md`

**Files:**
- Modify: `website/03-chains/03-router-chain.md`

- [ ] **Step 1: 更新学习要点**

找到文件中的 `## 学习要点` 部分，把：

```markdown
1. 先用一个分类链判断输入类型
2. 使用 Zod 和 StructuredOutputParser 获取结构化的分类结果
3. 根据分类结果用 switch-case 选择对应的提示模板
4. 构建并执行最终的回答链
5. 进行环境变量检查和错误处理
```

替换为：

```markdown
1. 使用 `withStructuredOutput()` 进行分类决策（推荐方式）
2. 使用 `switch` 语句根据分类结果选择不同的处理链
3. 使用 LCEL `.pipe()` 组合提示、模型和输出解析器
4. 进行环境变量检查和错误处理
```

- [ ] **Step 2: 更新源码块**

找到文件中的 `## 源码` 部分下面的 typescript 代码块（从 `import "dotenv/config";` 开始，到 `main().catch(console.error);` 结束），整个替换为：

```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "DeepSeek-V4-Pro",
  temperature: 0.7,
  configuration: {
    baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  try {
    console.log("=== 路由链示例 ===\n");

    // 使用 withStructuredOutput 进行分类
    const classificationSchema = z.object({
      category: z.enum(["tech", "cooking", "general"]).describe("问题类别"),
    });
    const classifier = model.withStructuredOutput(classificationSchema);

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

    const classification = await classifier.invoke(
      `将以下问题分类为 tech（技术）、cooking（烹饪）或 general（一般）：\n${question}`
    );

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
  } catch (error) {
    console.error("Error during router chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

- [ ] **Step 3: 提交**

```bash
git add website/03-chains/03-router-chain.md
git commit -m "docs: sync 03-router-chain.md with new API"
```

---

## Self-Review

**1. Spec coverage:**
- 设计文档要求更新 `src/02-prompts/03-output-parser.ts` → Task 1 ✓
- 设计文档要求更新 `website/02-prompts/03-output-parser.md` → Task 2 ✓
- 设计文档要求更新 `src/03-chains/03-router-chain.ts` → Task 3 ✓
- 设计文档要求更新 `website/03-chains/03-router-chain.md` → Task 4 ✓
- 验证方式（typecheck + 运行示例）→ Task 1 和 Task 3 各自包含 ✓

**2. Placeholder scan:** 无 TBD/TODO，所有代码块完整可运行 ✓

**3. Type consistency:** 
- Task 1 和 Task 2 的源码完全一致 ✓
- Task 3 和 Task 4 的源码完全一致 ✓
- 学习要点更新与代码变更相符 ✓
