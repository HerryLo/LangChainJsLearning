import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { StringOutputParser } from "@langchain/core/output_parsers";

async function main() {
  console.log("=== ConversationBufferWindowMemory 示例 ===\n");

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
  const messageHistory = new ChatMessageHistory();

  const chainWithHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: () => messageHistory,
    inputMessagesKey: "input",
    historyMessagesKey: "history",
  });

  // 添加一些历史消息
  const demoMessages = [
    "你好，我叫小明",
    "你好小明！很高兴认识你。",
    "我喜欢吃苹果",
    "苹果是很健康的水果！",
    "我也喜欢吃香蕉",
    "香蕉也很美味，富含钾。",
  ];

  for (let i = 0; i < demoMessages.length; i += 2) {
    await messageHistory.addUserMessage(demoMessages[i]);
    await messageHistory.addAIChatMessage(demoMessages[i + 1]);
  }

  // 查看当前历史
  console.log("--- 完整历史 ---");
  const allMessages = await messageHistory.getMessages();
  allMessages.forEach((msg) => {
    console.log(`${msg._getType()}:`, msg.content);
  });
  console.log("\n");

  // 只保留最近 k 条消息的窗口记忆示例
  console.log("--- 窗口记忆（只保留最近 2 轮对话）---");
  console.log("用户: 我刚才说我喜欢吃什么水果？");
  const response = await chainWithHistory.invoke(
    { input: "我刚才说我喜欢吃什么水果？" },
    { configurable: { sessionId: "123" } }
  );
  console.log("AI:", response);
}

main().catch(console.error);
