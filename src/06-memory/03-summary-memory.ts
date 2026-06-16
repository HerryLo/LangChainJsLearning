import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationSummaryMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  // 模拟历史对话
  const conversationHistory = [
    { human: "你好，我叫小明，我是一名程序员。" },
    { ai: "你好小明！很高兴认识你，程序员是一个很棒的职业。" },
    { human: "我喜欢用 JavaScript 和 TypeScript 编程。" },
    { ai: "JavaScript 和 TypeScript 都是很流行的语言！" },
    { human: "最近我在学习 LangChain。" },
    { ai: "LangChain 是一个强大的框架，可以让你构建很棒的 LLM 应用。" },
  ];

  // 将历史格式化为对话文本
  const conversationText = conversationHistory
    .map((msg) => {
      if ("human" in msg) return `Human: ${msg.human}`;
      return `AI: ${msg.ai}`;
    })
    .join("\n");

  // 创建摘要提示
  const summaryPrompt = ChatPromptTemplate.fromTemplate(`
    请将以下对话历史总结成一段简洁的摘要：

    {conversation}

    摘要：
  `);

  const summaryChain = summaryPrompt.pipe(model).pipe(new StringOutputParser());

  console.log("--- 原始对话 ---");
  console.log(conversationText);
  console.log("\n--- 对话摘要 ---");

  const summary = await summaryChain.invoke({ conversation: conversationText });
  console.log(summary);
  console.log("\n");

  // 使用摘要进行对话
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。以下是对话摘要：{summary}"],
    ["human", "{input}"],
  ]);

  const chatChain = chatPrompt.pipe(model).pipe(new StringOutputParser());

  console.log("--- 使用摘要对话 ---");
  console.log("用户: 我叫什么名字？我是做什么的？");
  const response = await chatChain.invoke({ summary, input: "我叫什么名字？我是做什么的？" });
  console.log("AI:", response);
}

main().catch(console.error);
