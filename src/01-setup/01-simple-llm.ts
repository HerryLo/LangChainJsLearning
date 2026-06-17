/**
 * ================================================
 * 模块 1 - 示例 1：最简单的 LLM 调用
 * ================================================
 *
 * 【功能介绍】
 * 这是 LangChain.js 最基础的用法：直接调用大语言模型获取回复
 *
 * 【使用场景】
 * - 简单的问答对话
 * - 单次文本生成（如写邮件、写代码等）
 * - 不需要上下文记忆的场景
 * - 快速验证 API 配置是否正确
 *
 * 【学习要点】
 * 1. 如何初始化 ChatOpenAI 模型
 * 2. 如何配置 model 参数选择不同模型
 * 3. 如何使用 temperature 调节回复的随机性
 * 4. 如何调用 model.invoke() 获取回复
 */

// 【功能】加载 .env 文件中的环境变量
// 【使用场景】需要从环境变量读取敏感信息（如 API Key）时使用
import "dotenv/config";

// 【功能】导入 LangChain 的 OpenAI 兼容聊天模型
// 【使用场景】所有兼容 OpenAI API 协议的模型都用这个类（智谱、火山引擎、通义千问等）
import { ChatOpenAI } from "@langchain/openai";

/**
 * 【功能】初始化聊天模型实例
 * 【使用场景】每次调用 LLM 前都需要先初始化
 */
const model = new ChatOpenAI({
  // 【参数】model：指定使用的模型名称
  // 【使用场景】根据需求选择不同能力/价格的模型
  model: "Doubao-Seed-2.0-Code",

  // 【参数】temperature：控制回复的随机性和创造性
  // 【使用场景】
  //  0.0-0.3 → 确定性强，适合代码生成、事实回答
  //  0.5-0.8 → 平衡，适合日常对话
  //  0.8-1.0 → 高创造性，适合写作、头脑风暴
  temperature: 0.7
});

/**
 * 【功能】主函数：演示最简单的 LLM 调用
 * 【使用场景】最基础的 LLM 调用模式
 */
async function main() {
  console.log("=== 简单的 LLM 调用示例 ===\n");

  // 【功能】调用模型，传入提示词，获取回复
  // 【使用场景】最简单的调用方式，适合一问一答
  const response = await model.invoke("你好，请介绍一下你自己。");

  // 【功能】输出 AI 回复内容
  // 【使用场景】获取 model 返回的文本内容
  console.log("AI 回复:", response.content);
}

// 【功能】运行主函数并捕获错误
// 【使用场景】异步函数需要用 catch 处理可能的错误
main().catch(console.error);
