import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationBufferMemory 示例 ===\n");

  const model = new ChatOpenAI({
    model: "glm-4",
    temperature: 0.7,
    configuration: {
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: process.env.ZHIPUAI_API_KEY,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "你是一个友好的 AI 助手。"],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  // 存储历史消息
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  // 第一轮对话
  console.log("用户: 你好，我叫小明");
  const response1 = await chainWithHistory.invoke(
    { input: "你好，我叫小明" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response1);
  console.log("\n");

  // 第二轮对话
  console.log("用户: 我叫什么名字？");
  const response2 = await chainWithHistory.invoke(
    { input: "我叫什么名字？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response2);
  console.log("\n");

  // 查看历史消息
  console.log("--- 历史消息 ---");
  const messages = await messageHistory.getMessages();
  messages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
}

main().catch(console.error);
