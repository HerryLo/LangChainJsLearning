# LangChain 升级与代码优化实现计划

&gt; **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 LangChain.js 从 0.3.x 升级到最新版本（1.5.x），同时优化代码质量和类型安全，保持 src/ 与 website/ 同步。

**Architecture:** 分阶段执行：先升级依赖和修复兼容性问题，然后进行代码质量优化，再同步文档，最后验证测试。每完成一个模块就提交一次，确保可回滚。

**Tech Stack:** LangChain.js 1.5.x, TypeScript 5.x, Node.js

---

## 前提条件

先读取几个关键文件以了解当前状态（实施前）：

**关键源文件列表：**
- src/01-setup/01-simple-llm.ts
- src/01-setup/02-chat-model.ts
- src/02-prompts/01-prompt-template.ts
- src/02-prompts/02-chat-prompt-template.ts
- src/02-prompts/03-output-parser.ts
- src/02-prompts/04-few-shot-prompt.ts
- src/03-chains/01-llm-chain.ts
- src/03-chains/02-sequential-chain.ts
- src/03-chains/03-router-chain.ts
- src/03-chains/04-transform-chain.ts
- src/04-rag/01-document-loader.ts
- src/04-rag/02-text-splitter.ts
- src/04-rag/03-embeddings.ts
- src/04-rag/04-vector-store.ts
- src/04-rag/05-retrieval-qa.ts
- src/05-agents/01-tools.ts
- src/05-agents/02-react-agent.ts
- src/05-agents/03-functions-agent.ts
- src/06-memory/01-buffer-memory.ts
- src/06-memory/02-window-memory.ts
- src/06-memory/03-summary-memory.ts
- src/06-memory/04-memory-in-chain.ts

---

### Task 1: 升级依赖包

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 更新 package.json 中的依赖版本**

修改 `package.json` 的 dependencies 部分：
```json
{
  "dependencies": {
    "@langchain/community": "^0.4.0",
    "@langchain/core": "^1.2.0",
    "@langchain/openai": "^0.4.0",
    "dotenv": "^16.4.0",
    "langchain": "^1.5.0",
    "zod": "^3.23.0"
  }
}
```

- [ ] **Step 2: 运行 npm install 安装新版本**

```bash
npm install
```

预期：所有依赖成功安装，可能会有一些弃用警告，但不会有错误。

- [ ] **Step 3: 运行类型检查，查看有哪些错误**

```bash
npm run typecheck
```

记录类型检查结果，这会告诉我们需要修复哪些 API 变更。

- [ ] **Step 4: 提交依赖升级**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade LangChain to 1.5.x"
```

---

### Task 2: 升级 01-setup 模块

**Files:**
- Modify: `src/01-setup/01-simple-llm.ts`
- Modify: `src/01-setup/02-chat-model.ts`
- Modify: `website/01-setup/01-simple-llm.md`
- Modify: `website/01-setup/02-chat-model.md`

- [ ] **Step 1: 检查并修复 01-simple-llm.ts**

先读取当前文件，根据 API 变更进行必要调整。重点检查：
- `ChatOpenAI` 初始化参数是否有变化
- `model.invoke()` 的返回类型
- 添加环境变量检查

添加配置验证：
```typescript
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

// 验证必要的环境变量
if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

const model = new ChatOpenAI({
  model: "Doubao-Seed-2.0-Code",
  temperature: 0.7,
  // 如果 API 有变更，更新这里
});

async function main() {
  try {
    console.log("=== 简单的 LLM 调用示例 ===\n");
    const response = await model.invoke("你好，请介绍一下你自己。");
    console.log("AI 回复:", response.content);
  } catch (error) {
    console.error("Error during LLM call:", error);
    process.exit(1);
  }
}

main().catch(console.error);
```

- [ ] **Step 2: 检查并修复 02-chat-model.ts**

同样进行必要的 API 适配，添加错误处理。

- [ ] **Step 3: 更新 website/ 下的对应文档**

将更新后的代码同步到文档中。

- [ ] **Step 4: 运行示例验证功能正常**

```bash
npm run dev src/01-setup/01-simple-llm.ts
npm run dev src/01-setup/02-chat-model.ts
```

两个示例都应该能正常运行。

- [ ] **Step 5: 提交 01-setup 模块的更新**

```bash
git add src/01-setup/ website/01-setup/
git commit -m "upgrade: update 01-setup module for LangChain 1.5.x"
```

---

### Task 3: 升级 02-prompts 模块

**Files:**
- Modify: `src/02-prompts/01-prompt-template.ts`
- Modify: `src/02-prompts/02-chat-prompt-template.ts`
- Modify: `src/02-prompts/03-output-parser.ts`
- Modify: `src/02-prompts/04-few-shot-prompt.ts`
- Modify: `website/02-prompts/01-prompt-template.md`
- Modify: `website/02-prompts/02-chat-prompt-template.md`
- Modify: `website/02-prompts/03-output-parser.md`
- Modify: `website/02-prompts/04-few-shot-prompt.md`

- [ ] **Step 1: 检查并修复 01-prompt-template.ts**

检查 `PromptTemplate` API 是否有变更，添加错误处理。

- [ ] **Step 2: 检查并修复 02-chat-prompt-template.ts**

检查 `ChatPromptTemplate.fromMessages()` API。

- [ ] **Step 3: 检查并修复 03-output-parser.ts**

检查 `StructuredOutputParser.fromZodSchema()` API。

- [ ] **Step 4: 检查并修复 04-few-shot-prompt.ts**

检查 `FewShotPromptTemplate` API。

- [ ] **Step 5: 同步更新 website/ 文档**

- [ ] **Step 6: 验证所有示例**

```bash
npm run dev src/02-prompts/01-prompt-template.ts
npm run dev src/02-prompts/02-chat-prompt-template.ts
npm run dev src/02-prompts/03-output-parser.ts
npm run dev src/02-prompts/04-few-shot-prompt.ts
```

- [ ] **Step 7: 提交 02-prompts 模块的更新**

```bash
git add src/02-prompts/ website/02-prompts/
git commit -m "upgrade: update 02-prompts module for LangChain 1.5.x"
```

---

### Task 4: 升级 03-chains 模块

**Files:**
- Modify: `src/03-chains/01-llm-chain.ts`
- Modify: `src/03-chains/02-sequential-chain.ts`
- Modify: `src/03-chains/03-router-chain.ts`
- Modify: `src/03-chains/04-transform-chain.ts`
- Modify: `website/03-chains/01-llm-chain.md`
- Modify: `website/03-chains/02-sequential-chain.md`
- Modify: `website/03-chains/03-router-chain.md`
- Modify: `website/03-chains/04-transform-chain.md`

- [ ] **Step 1: 检查并修复 01-llm-chain.ts**

检查 `.pipe()` 语法和 `StringOutputParser`。

- [ ] **Step 2: 检查并修复 02-sequential-chain.ts**

检查链的组合方式。

- [ ] **Step 3: 检查并修复 03-router-chain.ts**

- [ ] **Step 4: 检查并修复 04-transform-chain.ts**

- [ ] **Step 5: 同步更新 website/ 文档**

- [ ] **Step 6: 验证所有示例**

```bash
npm run dev src/03-chains/01-llm-chain.ts
npm run dev src/03-chains/02-sequential-chain.ts
npm run dev src/03-chains/03-router-chain.ts
npm run dev src/03-chains/04-transform-chain.ts
```

- [ ] **Step 7: 提交 03-chains 模块的更新**

```bash
git add src/03-chains/ website/03-chains/
git commit -m "upgrade: update 03-chains module for LangChain 1.5.x"
```

---

### Task 5: 升级 04-rag 模块

**Files:**
- Modify: `src/04-rag/01-document-loader.ts`
- Modify: `src/04-rag/02-text-splitter.ts`
- Modify: `src/04-rag/03-embeddings.ts`
- Modify: `src/04-rag/04-vector-store.ts`
- Modify: `src/04-rag/05-retrieval-qa.ts`
- Modify: `website/04-rag/01-document-loader.md`
- Modify: `website/04-rag/02-text-splitter.md`
- Modify: `website/04-rag/03-embeddings.md`
- Modify: `website/04-rag/04-vector-store.md`
- Modify: `website/04-rag/05-retrieval-qa.md`

- [ ] **Step 1: 检查并修复 01-document-loader.ts**

检查 `TextLoader` 和加载路径处理。

- [ ] **Step 2: 检查并修复 02-text-splitter.ts**

检查 `RecursiveCharacterTextSplitter` API。

- [ ] **Step 3: 检查并修复 03-embeddings.ts**

检查 `OpenAIEmbeddings` 初始化。

- [ ] **Step 4: 检查并修复 04-vector-store.ts**

检查 `MemoryVectorStore` 和 `.asRetriever()`。

- [ ] **Step 5: 检查并修复 05-retrieval-qa.ts**

检查 `RunnableSequence` 和 `RunnablePassthrough`。

- [ ] **Step 6: 同步更新 website/ 文档**

- [ ] **Step 7: 验证所有示例**

```bash
npm run dev src/04-rag/01-document-loader.ts
npm run dev src/04-rag/02-text-splitter.ts
npm run dev src/04-rag/03-embeddings.ts
npm run dev src/04-rag/04-vector-store.ts
npm run dev src/04-rag/05-retrieval-qa.ts
```

- [ ] **Step 8: 提交 04-rag 模块的更新**

```bash
git add src/04-rag/ website/04-rag/
git commit -m "upgrade: update 04-rag module for LangChain 1.5.x"
```

---

### Task 6: 升级 05-agents 模块

**Files:**
- Modify: `src/05-agents/01-tools.ts`
- Modify: `src/05-agents/02-react-agent.ts`
- Modify: `src/05-agents/03-functions-agent.ts`
- Modify: `website/05-agents/01-tools.md`
- Modify: `website/05-agents/02-react-agent.md`
- Modify: `website/05-agents/03-functions-agent.md`

- [ ] **Step 1: 检查并修复 01-tools.ts**

检查 `DynamicTool` API。

- [ ] **Step 2: 检查并修复 02-react-agent.ts**

检查 `createReactAgent`、`AgentExecutor` 和 `pull`。

- [ ] **Step 3: 检查并修复 03-functions-agent.ts**

检查 `DynamicStructuredTool` 和 `.bindTools()`。

- [ ] **Step 4: 同步更新 website/ 文档**

- [ ] **Step 5: 验证所有示例**

```bash
npm run dev src/05-agents/01-tools.ts
npm run dev src/05-agents/02-react-agent.ts
npm run dev src/05-agents/03-functions-agent.ts
```

- [ ] **Step 6: 提交 05-agents 模块的更新**

```bash
git add src/05-agents/ website/05-agents/
git commit -m "upgrade: update 05-agents module for LangChain 1.5.x"
```

---

### Task 7: 升级 06-memory 模块

**Files:**
- Modify: `src/06-memory/01-buffer-memory.ts`
- Modify: `src/06-memory/02-window-memory.ts`
- Modify: `src/06-memory/03-summary-memory.ts`
- Modify: `src/06-memory/04-memory-in-chain.ts`
- Modify: `website/06-memory/01-buffer-memory.md`
- Modify: `website/06-memory/02-window-memory.md`
- Modify: `website/06-memory/03-summary-memory.md`
- Modify: `website/06-memory/04-memory-in-chain.md`

- [ ] **Step 1: 检查并修复 01-buffer-memory.ts**

检查 `MessagesPlaceholder` 和 `RunnableWithMessageHistory`。

- [ ] **Step 2: 检查并修复 02-window-memory.ts**

- [ ] **Step 3: 检查并修复 03-summary-memory.ts**

- [ ] **Step 4: 检查并修复 04-memory-in-chain.ts**

- [ ] **Step 5: 同步更新 website/ 文档**

- [ ] **Step 6: 验证所有示例**

```bash
npm run dev src/06-memory/01-buffer-memory.ts
npm run dev src/06-memory/02-window-memory.ts
npm run dev src/06-memory/03-summary-memory.ts
npm run dev src/06-memory/04-memory-in-chain.ts
```

- [ ] **Step 7: 提交 06-memory 模块的更新**

```bash
git add src/06-memory/ website/06-memory/
git commit -m "upgrade: update 06-memory module for LangChain 1.5.x"
```

---

### Task 8: 最终验证与类型检查

**Files:**
- Test: 所有源文件和文档

- [ ] **Step 1: 运行完整类型检查**

```bash
npm run typecheck
```

确保没有 TypeScript 错误。

- [ ] **Step 2: 验证关键示例功能正常**

随机挑选几个不同模块的示例运行：

```bash
npm run dev src/01-setup/01-simple-llm.ts
npm run dev src/03-chains/01-llm-chain.ts
npm run dev src/04-rag/05-retrieval-qa.ts
npm run dev src/05-agents/02-react-agent.ts
```

- [ ] **Step 3: 检查 git 状态，确保所有更改都已提交**

```bash
git status
```

- [ ] **Step 4: 如果有任何额外的修改，提交最终更新**

```bash
git add .
git commit -m "chore: final cleanup and verification after LangChain upgrade"
```

---

## 代码质量优化检查清单

在升级过程中，确保每个文件都包含：

- [ ] 环境变量检查（验证 ZHIPUAI_API_KEY 等）
- [ ] try-catch 错误处理
- [ ] 尽量减少 `any` 类型的使用
- [ ] 保持清晰的中文注释
- [ ] 代码结构清晰合理

---

## 回滚策略

如果某个模块的升级遇到问题：
1. 使用 `git revert <commit-hash>` 回滚该模块的提交
2. 或者使用 `git reset --hard <commit-before-upgrade>` 完全回滚
3. 重新评估并调整升级策略
