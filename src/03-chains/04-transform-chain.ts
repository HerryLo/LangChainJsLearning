import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  model: "glm-4",
  temperature: 0.7,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    apiKey: process.env.ZHIPUAI_API_KEY,
  },
});

async function main() {
  console.log("=== TransformChain（数据转换）示例 ===\n");

  // 自定义转换函数
  const transformInput = (input: { text: string }) => ({
    text: input.text,
    wordCount: input.text.split(/\s+/).length,
    characterCount: input.text.length,
  });

  const promptTemplate = ChatPromptTemplate.fromTemplate(`
    分析以下文本的摘要：

    文本: {text}
    字数统计: {wordCount} 词，{characterCount} 字

    请提供摘要。
  `);

  const chain = transformInput
    .pipe(promptTemplate)
    .pipe(model)
    .pipe(new StringOutputParser());

  const text = `
    LangChain 是一个用于开发由语言模型驱动的应用程序的框架。
    它提供了一套丰富的工具和组件，使得构建复杂的 LLM 应用变得更加容易。
    无论是简单的聊天机器人还是复杂的智能代理，LangChain 都能帮你实现。
  `.trim();

  const result = await chain.invoke({ text });
  console.log(result);
}

main().catch(console.error);
