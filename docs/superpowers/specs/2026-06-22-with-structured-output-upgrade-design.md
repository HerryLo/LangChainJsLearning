# 升级到 withStructuredOutput API 设计文档

**日期:** 2026-06-22
**主题:** 把 src 中使用 `StructuredOutputParser` 的代码更新为 LangChain 1.5.x 推荐的 `.withStructuredOutput()` API

## 背景

LangChain 已经升级到 1.5.x 最新版本。项目中仍有 2 个文件使用旧的 `StructuredOutputParser` API 来实现结构化输出，应当更新为 LangChain 1.5.x 推荐的 `.withStructuredOutput()` API。

`.withStructuredOutput()` 的优势：
- 更简洁：不需要手动调用 `parser.getFormatInstructions()` 和 `parser.parse()`
- 更类型安全：TypeScript 类型推断更好
- 更现代：符合 LangChain 1.5.x 的推荐用法

## 目标

1. 把 `src/02-prompts/03-output-parser.ts` 中的 `StructuredOutputParser` 替换为 `.withStructuredOutput()`
2. 把 `src/03-chains/03-router-chain.ts` 中的 `StructuredOutputParser` 替换为 `.withStructuredOutput()`
3. 同步更新对应的 website md 文档，包括源码示例和学习要点

## 范围

### 需要修改的文件（4 个）

| 文件 | 变更内容 |
|------|---------|
| `src/02-prompts/03-output-parser.ts` | 改用 `.withStructuredOutput()` |
| `website/02-prompts/03-output-parser.md` | 同步源码 + 更新学习要点 |
| `src/03-chains/03-router-chain.ts` | 改用 `.withStructuredOutput()` |
| `website/03-chains/03-router-chain.md` | 同步源码 + 更新学习要点 |

### 不在范围内

- 不改动 `01-setup`、`02-prompts`（除 03 外）、`04-rag`、`05-agents`、`06-memory` 模块的源码
- 不引入新依赖
- 不抽取共享的 model 配置常量（保持教学示例自包含）

## API 变更说明

### 旧 API（StructuredOutputParser）

```typescript
const parser = StructuredOutputParser.fromZodSchema(schema);
const prompt = await promptTemplate.format({
  format_instructions: parser.getFormatInstructions(),
  text: "...",
});
const response = await model.invoke(prompt);
const parsed = await parser.parse(response.content as string);
```

缺点：
- 需要手动构造 `format_instructions` 并插入提示模板
- 需要两步调用：先 `invoke` 模型，再 `parse` 结果
- 需要类型断言 `response.content as string`
- 提示模板变复杂，需要额外的 `{format_instructions}` 占位符

### 新 API（withStructuredOutput）

```typescript
const structuredModel = model.withStructuredOutput(schema);
const parsed = await structuredModel.invoke("分析这段文本的情感：...");
```

优点：
- 一步调用直接返回符合 schema 的对象
- 不需要手动构造格式说明
- 不需要类型断言
- 提示更简洁

## 详细设计

### 1. `src/02-prompts/03-output-parser.ts`

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

**关键变化：**
- 移除 `StructuredOutputParser` 和 `ChatPromptTemplate` 导入
- 不再需要手动构造 `format_instructions`
- 直接调用 `model.withStructuredOutput(schema)` 返回一个能输出结构化数据的模型
- `invoke()` 直接传入文本，返回值就是符合 schema 的对象

### 2. `src/03-chains/03-router-chain.ts`

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

**关键变化：**
- 移除 `StructuredOutputParser` 导入
- 分类步骤使用 `model.withStructuredOutput(classificationSchema)`
- 后续路由分支和回答链保持不变

### 3. `website/02-prompts/03-output-parser.md`

**学习要点更新为：**

1. 使用 Zod 定义 schema：`z.object()`、`z.enum()`、`z.number()` 等
2. 使用 `model.withStructuredOutput(schema)` 创建结构化输出模型（推荐方式）
3. 直接调用 `.invoke()` 返回符合 schema 的对象，无需手动解析
4. 进行环境变量检查和错误处理

**源码部分同步更新为新代码。**

### 4. `website/03-chains/03-router-chain.md`

**学习要点更新为：**

1. 使用 `withStructuredOutput()` 进行分类决策（推荐方式）
2. 使用 `switch` 语句根据分类结果选择不同的处理链
3. 使用 LCEL `.pipe()` 组合提示、模型和输出解析器
4. 进行环境变量检查和错误处理

**源码部分同步更新为新代码。**

## 验证方式

更新完成后执行：

```bash
npm run typecheck
npm run dev src/02-prompts/03-output-parser.ts
npm run dev src/03-chains/03-router-chain.ts
```

**预期结果：**
- `typecheck` 通过，无错误
- `03-output-parser.ts` 输出符合 schema 的对象，包含 `sentiment`、`confidence`、`reasoning` 字段
- `03-router-chain.ts` 正确分类问题，并根据分类结果输出对应的回答

## 风险评估

**低风险：**
- `.withStructuredOutput()` 是 LangChain 1.5.x 标准推荐 API，已被广泛使用
- 两个示例都已经在使用 ChatOpenAI，模型本身支持结构化输出
- 不涉及依赖变更
- 不影响其他模块

**回滚方式：**
- 如有问题，可以通过 `git revert` 回滚此次提交
