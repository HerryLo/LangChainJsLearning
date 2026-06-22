---
title: 01-tools.ts
---

# 01-tools.ts

工具定义示例，创建自定义工具供代理使用。

## 功能介绍

这个示例演示了如何使用 DynamicTool 定义自定义工具。工具包含名称、描述和执行函数，代理可以根据描述理解何时以及如何使用这个工具。

## 使用场景

- 为代理添加自定义能力（如计算、数据库查询等）
- 让代理能调用外部 API
- 扩展代理的功能边界
- 连接 AI 和真实世界的系统

## 学习要点

1. 使用 `DynamicTool` 创建工具
2. `name` 参数给工具命名
3. `description` 参数描述工具用途（很重要，代理靠这个理解）
4. `func` 参数是实际执行的异步函数

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

## 运行方式

```bash
npm run dev src/05-agents/01-tools.ts
```
