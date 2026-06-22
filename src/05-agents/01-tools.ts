import "dotenv/config";
import { DynamicTool } from "@langchain/core/tools";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Tools 示例 ===\n");

    // 定义一个自定义工具
    const calculatorTool = new DynamicTool({
      name: "calculator",
      description: "用于进行数学计算。输入应该是一个数学表达式，例如 '2 + 2' 或 '10 * 5'。",
      func: async (input: string) => {
        try {
          // 简单的安全计算
          const result = Function('"use strict"; return (' + input + ')')();
          return `计算结果: ${result}`;
        } catch (e) {
          return "计算错误，请检查表达式";
        }
      },
    });

    // 使用工具
    console.log("工具名称:", calculatorTool.name);
    console.log("工具描述:", calculatorTool.description);
    console.log("\n---\n");

    const result = await calculatorTool.invoke("25 * 4");
    console.log("调用 calculator('25 * 4'):");
    console.log(result);
  } catch (error) {
    console.error("Error during tools example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
