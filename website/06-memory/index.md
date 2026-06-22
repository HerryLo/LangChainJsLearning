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
