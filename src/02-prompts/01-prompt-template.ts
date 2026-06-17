/**
 * 模块 2 - 示例 1：PromptTemplate（提示模板）
 *
 * 【功能介绍】
 * 使用模板和变量动态生成提示词，避免重复写相同的提示
 *
 * 【使用场景】
 * - 同一类问题批量提问（如翻译、摘要等）
 * - 需要动态替换某些内容的场景
 * - 标准化提示格式
 */

// 加载环境变量
import "dotenv/config";

// 导入聊天模型
import { ChatOpenAI } from "@langchain/openai";

// 导入提示模板
import { PromptTemplate } from "@langchain/core/prompts";

// 初始化模型
const model = new ChatOpenAI({
  model: "GLM-5.1",
  temperature: 0.7
});

async function main() {
  console.log("=== PromptTemplate 示例 ===\n");

  // 创建提示模板：{profession} 和 {topic} 是占位变量
  // 使用场景：需要重复使用相同提示结构，只替换部分内容时
  const promptTemplate = PromptTemplate.fromTemplate(
    "你是一个专业的 {profession}。请用通俗易懂的方式解释 {topic}。"
  );

  // 填充变量：把占位符替换成实际内容
  // 使用场景：动态生成不同的提示词
  const prompt = await promptTemplate.format({
    profession: "翻译员",
    topic: "Hello World 这句话的意思",
  });

  console.log("生成的 Prompt:", prompt);
  console.log("\n---\n");

  // 调用模型
  const response = await model.invoke(prompt);
  console.log("AI 回复:", response.content);
}

main().catch(console.error);
