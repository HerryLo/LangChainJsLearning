# 同步 website/02-prompts/index.md 设计文档

**日期:** 2026-06-22
**主题:** 把 `website/02-prompts/index.md` 中遗留的 `StructuredOutputParser` 引用同步为 `withStructuredOutput`

## 背景

在前一轮升级中，我们把 `src/02-prompts/03-output-parser.ts` 和 `website/02-prompts/03-output-parser.md` 从 `StructuredOutputParser` 更新为 `.withStructuredOutput()` API。同时 `src/02-prompts/README.md` 的学习要点也已经从 `StructuredOutputParser` 改为 `withStructuredOutput`。

但是 `website/02-prompts/index.md` 的学习要点第 11 行仍然写着 `StructuredOutputParser：结构化输出（使用 Zod）`，与对应的 `src/02-prompts/README.md` 不同步。

## 目标

把 `website/02-prompts/index.md` 第 11 行的 `StructuredOutputParser` 改为 `withStructuredOutput`，与 `src/02-prompts/README.md` 保持一致。

## 范围

### 需要修改的文件（1 个）

| 文件 | 变更内容 |
|------|---------|
| `website/02-prompts/index.md` | 第 11 行 `StructuredOutputParser` 改为 `withStructuredOutput` |

### 不在范围内

- 不修改其他 md 文件（已通过 grep 验证，其他模块的 index.md 与 README.md 已经同步）
- 不修改 `docs/superpowers/` 下的历史规划文档（它们记录的是当时的设计，不应该修改）
- 不修改源码

## 详细设计

### `website/02-prompts/index.md`

**当前第 11 行：**
```
- StructuredOutputParser：结构化输出（使用 Zod）
```

**修改为：**
```
- withStructuredOutput：结构化输出（使用 Zod）
```

其他行（包括 frontmatter、标题、其他学习要点、示例列表、运行方式）全部保持不变。

## 验证方式

修改完成后执行：

```bash
grep -r "StructuredOutputParser" website/
```

**预期结果：** 无任何输出（website 目录下不再有 `StructuredOutputParser` 引用）。

同时执行：

```bash
diff <(grep -A 5 "## 学习要点" website/02-prompts/index.md) <(grep -A 5 "## 学习要点" src/02-prompts/README.md)
```

**预期结果：** 无差异（两个文件的"学习要点"部分完全一致）。

## 风险评估

**极低风险：**
- 仅修改一行文字
- 不涉及代码逻辑
- 不影响类型检查或运行时行为

**回滚方式：**
- 如有问题，可通过 `git revert` 回滚此次提交
