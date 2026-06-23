# 同步 website/02-prompts/index.md Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `website/02-prompts/index.md` 第 11 行的 `StructuredOutputParser` 改为 `withStructuredOutput`，与 `src/02-prompts/README.md` 保持一致。

**Architecture:** 单文件单行改动。修改后用 grep 验证 `website/` 目录下不再有 `StructuredOutputParser` 引用。

**Tech Stack:** Markdown 文档。

---

## File Structure

| 文件 | 职责 |
|------|------|
| `website/02-prompts/index.md` | 02-prompts 模块的首页，列出示例和学习要点 |

---

## Task 1: 修改 `website/02-prompts/index.md` 第 11 行

**Files:**
- Modify: `website/02-prompts/index.md:11`

- [ ] **Step 1: 修改第 11 行**

用 Edit 工具修改 `D:\dev\langchain_example\website\02-prompts\index.md`。

`old_string`（唯一）:
```
- StructuredOutputParser：结构化输出（使用 Zod）
```

`new_string`:
```
- withStructuredOutput：结构化输出（使用 Zod）
```

- [ ] **Step 2: 验证 website/ 目录下不再有 StructuredOutputParser 引用**

Run: `grep -r "StructuredOutputParser" website/`
Expected: 无任何输出（命令退出码 1，表示未找到匹配）。

- [ ] **Step 3: 验证与 src/02-prompts/README.md 学习要点一致**

Run（Git Bash）:
```bash
diff <(grep -A 5 "## 学习要点" website/02-prompts/index.md) <(grep -A 5 "## 学习要点" src/02-prompts/README.md)
```
Expected: 无输出（两个文件的"学习要点"部分完全一致）。

如果环境不支持进程替换 `<(...)`，可改用：
```bash
grep -A 5 "## 学习要点" website/02-prompts/index.md > /tmp/a.txt
grep -A 5 "## 学习要点" src/02-prompts/README.md > /tmp/b.txt
diff /tmp/a.txt /tmp/b.txt
```
Expected: 无输出。

- [ ] **Step 4: 提交**

```bash
git add website/02-prompts/index.md
git commit -m "docs: sync 02-prompts/index.md with README learning points"
```

---

## Self-Review

**1. Spec coverage:**
- 设计文档要求修改 `website/02-prompts/index.md` 第 11 行 → Task 1 Step 1 ✓
- 设计文档要求验证 `website/` 下不再有 `StructuredOutputParser` 引用 → Task 1 Step 2 ✓
- 设计文档要求验证与 `src/02-prompts/README.md` 学习要点一致 → Task 1 Step 3 ✓

**2. Placeholder scan:** 无 TBD/TODO，所有命令完整可运行 ✓

**3. Type consistency:** 不涉及类型，仅字符串替换 ✓
