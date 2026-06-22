import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

if (!process.env.ZHIPUAI_API_KEY) {
  throw new Error("ZHIPUAI_API_KEY is not set in environment variables");
}

async function main() {
  try {
    console.log("=== Memory in Chain 示例 ===\n");

    const model = new ChatOpenAI({
      model: "DeepSeek-V4-Pro",
      temperature: 0.7,
      configuration: {
        baseURL: "https://ark.cn-beijing.volces.com/api/coding/v3/",
        apiKey: process.env.ZHIPUAI_API_KEY,
      },
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "你是一个助手，帮助用户学习编程。每次回答后，请问一个相关的小问题来巩固学习。"],
      new MessagesPlaceholder("history"),
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());
    const messageHistory = new ChatMessageHistory();

    const chainWithHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: () => messageHistory,
      inputMessagesKey: "input",
      historyMessagesKey: "history",
    });

    // 对话轮 1
    console.log("--- 第 1 轮 ---");
    console.log("用户: 什么是变量？");
    const r1 = await chainWithHistory.invoke(
      { input: "什么是变量？" },
      { configurable: { sessionId: "123" } }
    );
    console.log("AI:", r1);
    console.log("\n");

    // 对话轮 2
    console.log("--- 第 2 轮 ---");
    console.log("用户: 在 JavaScript 中如何声明变量？");
    const r2 = await chainWithHistory.invoke(
      { input: "在 JavaScript 中如何声明变量？" },
      { configurable: { sessionId: "123" } }
    );
    console.log("AI:", r2);
    console.log("\n");

    // 查看完整历史
    console.log("--- 完整对话历史 ---");
    const messages = await messageHistory.getMessages();
    messages.forEach((msg) => {
      console.log(`${msg._getType()}:`, msg.content);
    });
  } catch (error) {
    console.error("Error during memory in chain example:", error);
    process.exit(1);
  }
}

main().catch(console.error);
