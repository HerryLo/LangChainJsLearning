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
  console.log("=== 顺序链示例 ===\n");

  // 第一条链：生成大纲
  const outlinePrompt = ChatPromptTemplate.fromTemplate(
    "请为主题 '{topic}' 生成一篇文章的大纲。"
  );
  const outlineChain = outlinePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // 第二条链：根据大纲写文章
  const articlePrompt = ChatPromptTemplate.fromTemplate(
    "根据以下大纲写一篇完整的文章：\n\n{outline}"
  );
  const articleChain = articlePrompt
    .pipe(model)
    .pipe(new StringOutputParser());

  // 组合链
  const fullChain = outlineChain.pipe((outline) => ({ outline })).pipe(articleChain);

  const result = await fullChain.invoke({ topic: "人工智能的未来" });
  console.log(result);
}

main().catch(console.error);
