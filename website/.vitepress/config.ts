import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LangChain.js 教程',
  description: '循序渐进学习 LangChain.js',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/HerryLo/LangChainJsLearning' }
    ],

    sidebar: {
      '/': [
        {
          text: '模块 1：环境搭建与基础 LLM 调用',
          collapsed: false,
          items: [
            { text: '模块介绍', link: '/01-setup/' },
            { text: '01-simple-llm', link: '/01-setup/01-simple-llm' },
            { text: '02-chat-model', link: '/01-setup/02-chat-model' }
          ]
        },
        {
          text: '模块 2：Prompts（提示模板和输出解析器）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/02-prompts/' },
            { text: '01-prompt-template', link: '/02-prompts/01-prompt-template' },
            { text: '02-chat-prompt-template', link: '/02-prompts/02-chat-prompt-template' },
            { text: '03-output-parser', link: '/02-prompts/03-output-parser' },
            { text: '04-few-shot-prompt', link: '/02-prompts/04-few-shot-prompt' }
          ]
        },
        {
          text: '模块 3：Chains（链）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/03-chains/' },
            { text: '01-llm-chain', link: '/03-chains/01-llm-chain' },
            { text: '02-sequential-chain', link: '/03-chains/02-sequential-chain' },
            { text: '03-router-chain', link: '/03-chains/03-router-chain' },
            { text: '04-transform-chain', link: '/03-chains/04-transform-chain' }
          ]
        },
        {
          text: '模块 4：RAG（检索增强生成）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/04-rag/' },
            { text: '01-document-loader', link: '/04-rag/01-document-loader' },
            { text: '02-text-splitter', link: '/04-rag/02-text-splitter' },
            { text: '03-embeddings', link: '/04-rag/03-embeddings' },
            { text: '04-vector-store', link: '/04-rag/04-vector-store' },
            { text: '05-retrieval-qa', link: '/04-rag/05-retrieval-qa' }
          ]
        },
        {
          text: '模块 5：Agents（智能代理）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/05-agents/' },
            { text: '01-tools', link: '/05-agents/01-tools' },
            { text: '02-react-agent', link: '/05-agents/02-react-agent' },
            { text: '03-functions-agent', link: '/05-agents/03-functions-agent' }
          ]
        },
        {
          text: '模块 6：Memory（记忆）',
          collapsed: true,
          items: [
            { text: '模块介绍', link: '/06-memory/' },
            { text: '01-buffer-memory', link: '/06-memory/01-buffer-memory' },
            { text: '02-window-memory', link: '/06-memory/02-window-memory' },
            { text: '03-summary-memory', link: '/06-memory/03-summary-memory' },
            { text: '04-memory-in-chain', link: '/06-memory/04-memory-in-chain' }
          ]
        }
      ]
    }
  }
})
