# 移除"查看原文件"链接实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 移除 website 下所有 md 文件中的"查看原文件"部分及其链接，因为在静态网站中无法直接链接到本地文件系统。

**Architecture:** 逐个模块更新，从每个 md 文件中移除"## 查看原文件"部分及其内容，保留"## 运行方式"部分。

**Tech Stack:** VitePress, Markdown

---

## Task 1: 更新模块 1 文件

**Files:**
- Modify: `website/01-setup/01-simple-llm.md`
- Modify: `website/01-setup/02-chat-model.md`

- [ ] **Step 1: 更新 01-simple-llm.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/01-setup/01-simple-llm.ts`](../src/01-setup/01-simple-llm.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/01-setup/01-simple-llm.ts
```
```

- [ ] **Step 2: 更新 02-chat-model.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/01-setup/02-chat-model.ts`](../src/01-setup/02-chat-model.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/01-setup/02-chat-model.ts
```
```

- [ ] **Step 3: 提交更改**

```bash
git add website/01-setup/01-simple-llm.md website/01-setup/02-chat-model.md
git commit -m "docs: remove source file links from module 1"
```

---

## Task 2: 更新模块 2 文件

**Files:**
- Modify: `website/02-prompts/01-prompt-template.md`
- Modify: `website/02-prompts/02-chat-prompt-template.md`
- Modify: `website/02-prompts/03-output-parser.md`
- Modify: `website/02-prompts/04-few-shot-prompt.md`

- [ ] **Step 1: 更新 01-prompt-template.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/02-prompts/01-prompt-template.ts`](../src/02-prompts/01-prompt-template.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/02-prompts/01-prompt-template.ts
```
```

- [ ] **Step 2: 更新 02-chat-prompt-template.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/02-prompts/02-chat-prompt-template.ts`](../src/02-prompts/02-chat-prompt-template.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/02-prompts/02-chat-prompt-template.ts
```
```

- [ ] **Step 3: 更新 03-output-parser.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/02-prompts/03-output-parser.ts`](../src/02-prompts/03-output-parser.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/02-prompts/03-output-parser.ts
```
```

- [ ] **Step 4: 更新 04-few-shot-prompt.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/02-prompts/04-few-shot-prompt.ts`](../src/02-prompts/04-few-shot-prompt.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/02-prompts/04-few-shot-prompt.ts
```
```

- [ ] **Step 5: 提交更改**

```bash
git add website/02-prompts/*.md
git commit -m "docs: remove source file links from module 2"
```

---

## Task 3: 更新模块 3 文件

**Files:**
- Modify: `website/03-chains/01-llm-chain.md`
- Modify: `website/03-chains/02-sequential-chain.md`
- Modify: `website/03-chains/03-router-chain.md`
- Modify: `website/03-chains/04-transform-chain.md`

- [ ] **Step 1: 更新 01-llm-chain.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/03-chains/01-llm-chain.ts`](../src/03-chains/01-llm-chain.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/03-chains/01-llm-chain.ts
```
```

- [ ] **Step 2: 更新 02-sequential-chain.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/03-chains/02-sequential-chain.ts`](../src/03-chains/02-sequential-chain.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/03-chains/02-sequential-chain.ts
```
```

- [ ] **Step 3: 更新 03-router-chain.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/03-chains/03-router-chain.ts`](../src/03-chains/03-router-chain.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/03-chains/03-router-chain.ts
```
```

- [ ] **Step 4: 更新 04-transform-chain.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/03-chains/04-transform-chain.ts`](../src/03-chains/04-transform-chain.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/03-chains/04-transform-chain.ts
```
```

- [ ] **Step 5: 提交更改**

```bash
git add website/03-chains/*.md
git commit -m "docs: remove source file links from module 3"
```

---

## Task 4: 更新模块 4 文件

**Files:**
- Modify: `website/04-rag/01-document-loader.md`
- Modify: `website/04-rag/02-text-splitter.md`
- Modify: `website/04-rag/03-embeddings.md`
- Modify: `website/04-rag/04-vector-store.md`
- Modify: `website/04-rag/05-retrieval-qa.md`

- [ ] **Step 1: 更新 01-document-loader.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/04-rag/01-document-loader.ts`](../src/04-rag/01-document-loader.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/04-rag/01-document-loader.ts
```
```

- [ ] **Step 2: 更新 02-text-splitter.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/04-rag/02-text-splitter.ts`](../src/04-rag/02-text-splitter.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/04-rag/02-text-splitter.ts
```
```

- [ ] **Step 3: 更新 03-embeddings.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/04-rag/03-embeddings.ts`](../src/04-rag/03-embeddings.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/04-rag/03-embeddings.ts
```
```

- [ ] **Step 4: 更新 04-vector-store.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/04-rag/04-vector-store.ts`](../src/04-rag/04-vector-store.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/04-rag/04-vector-store.ts
```
```

- [ ] **Step 5: 更新 05-retrieval-qa.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/04-rag/05-retrieval-qa.ts`](../src/04-rag/05-retrieval-qa.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/04-rag/05-retrieval-qa.ts
```
```

- [ ] **Step 6: 提交更改**

```bash
git add website/04-rag/*.md
git commit -m "docs: remove source file links from module 4"
```

---

## Task 5: 更新模块 5 文件

**Files:**
- Modify: `website/05-agents/01-tools.md`
- Modify: `website/05-agents/02-react-agent.md`
- Modify: `website/05-agents/03-functions-agent.md`

- [ ] **Step 1: 更新 01-tools.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/05-agents/01-tools.ts`](../src/05-agents/01-tools.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/05-agents/01-tools.ts
```
```

- [ ] **Step 2: 更新 02-react-agent.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/05-agents/02-react-agent.ts`](../src/05-agents/02-react-agent.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/05-agents/02-react-agent.ts
```
```

- [ ] **Step 3: 更新 03-functions-agent.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/05-agents/03-functions-agent.ts`](../src/05-agents/03-functions-agent.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/05-agents/03-functions-agent.ts
```
```

- [ ] **Step 4: 提交更改**

```bash
git add website/05-agents/*.md
git commit -m "docs: remove source file links from module 5"
```

---

## Task 6: 更新模块 6 文件

**Files:**
- Modify: `website/06-memory/01-buffer-memory.md`
- Modify: `website/06-memory/02-window-memory.md`
- Modify: `website/06-memory/03-summary-memory.md`
- Modify: `website/06-memory/04-memory-in-chain.md`

- [ ] **Step 1: 更新 01-buffer-memory.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/06-memory/01-buffer-memory.ts`](../src/06-memory/01-buffer-memory.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/06-memory/01-buffer-memory.ts
```
```

- [ ] **Step 2: 更新 02-window-memory.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/06-memory/02-window-memory.ts`](../src/06-memory/02-window-memory.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/06-memory/02-window-memory.ts
```
```

- [ ] **Step 3: 更新 03-summary-memory.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/06-memory/03-summary-memory.ts`](../src/06-memory/03-summary-memory.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/06-memory/03-summary-memory.ts
```
```

- [ ] **Step 4: 更新 04-memory-in-chain.md**

移除内容：
```markdown
## 查看原文件

- 源码位置: [`src/06-memory/04-memory-in-chain.ts`](../src/06-memory/04-memory-in-chain.ts)
```

保留：
```markdown
## 运行方式

```bash
npm run dev src/06-memory/04-memory-in-chain.ts
```
```

- [ ] **Step 5: 提交更改**

```bash
git add website/06-memory/*.md
git commit -m "docs: remove source file links from module 6"
```

---

## Task 7: 验证和构建测试

**Files:**
- Verify: All updated files

- [ ] **Step 1: 运行构建验证**

```bash
cd website
npm run build
```

Expected: Build completes successfully with no errors

- [ ] **Step 2: 提交计划文档**

```bash
cd ..
git add docs/superpowers/plans/2026-06-22-remove-source-links.md
git add docs/superpowers/specs/2026-06-22-remove-source-links-design.md
git commit -m "docs: add plan and spec for removing source links"
```

---

## Plan Self-Review Checklist

- [x] **Spec coverage:** All 24 files are covered across all 6 modules
- [x] **Placeholder scan:** No placeholders, all content is complete
- [x] **Type consistency:** All task patterns are consistent
- [x] **No missing files:** All files from the spec are included

---

## Execution Options

Plan complete and saved to `docs/superpowers/plans/2026-06-22-remove-source-links.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
