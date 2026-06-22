# VitePress 教程网站设计文档

> 日期：2026-06-17
> 目标：将现有的 LangChain.js 教程项目转换为 VitePress 静态网站，方便在浏览器中查看

## 1. 项目概述

### 1.1 背景
现有项目是一个 LangChain.js 教程，包含 6 个模块的可运行代码示例。需要将其转换为浏览器可访问的教程网站。

### 1.2 核心需求
- 使用 VitePress 构建
- 保留所有源码和目录结构
- 纯展示版本（不提供运行按钮）
- 简洁展示页面，主要展示代码
- 默认 VitePress 主题
- 按模块分组的导航结构
- 包含完整教程介绍的首页

---

## 2. 目录结构设计

```
langchain_example/
├── src/                    (原代码保持不变，只读不修改)
│   ├── 01-setup/
│   │   ├── 01-simple-llm.ts
│   │   ├── 02-chat-model.ts
│   │   └── README.md
│   ├── 02-prompts/
│   │   ├── 01-prompt-template.ts
│   │   ├── 02-chat-prompt-template.ts
│   │   ├── 03-output-parser.ts
│   │   ├── 04-few-shot-prompt.ts
│   │   └── README.md
│   ├── 03-chains/
│   ├── 04-rag/
│   ├── 05-agents/
│   ├── 06-memory/
│   └── README.md
│
├── website/                (新建 VitePress 项目)
│   ├── .vitepress/
│   │   ├── config.ts       (VitePress 配置)
│   │   └── theme/          (自定义主题，可选)
│   ├── index.md            (首页 - 完整教程介绍)
│   ├── 01-setup/
│   │   ├── index.md        (模块介绍页)
│   │   ├── 01-simple-llm.md
│   │   └── 02-chat-model.md
│   ├── 02-prompts/
│   │   ├── index.md
│   │   ├── 01-prompt-template.md
│   │   ├── 02-chat-prompt-template.md
│   │   ├── 03-output-parser.md
│   │   └── 04-few-shot-prompt.md
│   ├── 03-chains/
│   │   ├── index.md
│   │   ├── 01-llm-chain.md
│   │   ├── 02-sequential-chain.md
│   │   ├── 03-router-chain.md
│   │   └── 04-transform-chain.md
│   ├── 04-rag/
│   │   ├── index.md
│   │   ├── 01-document-loader.md
│   │   ├── 02-text-splitter.md
│   │   ├── 03-embeddings.md
│   │   ├── 04-vector-store.md
│   │   └── 05-retrieval-qa.md
│   ├── 05-agents/
│   │   ├── index.md
│   │   ├── 01-tools.md
│   │   ├── 02-react-agent.md
│   │   └── 03-functions-agent.md
│   ├── 06-memory/
│   │   ├── index.md
│   │   ├── 01-buffer-memory.md
│   │   ├── 02-window-memory.md
│   │   ├── 03-summary-memory.md
│   │   └── 04-memory-in-chain.md
│   ├── package.json        (VitePress 依赖)
│   └── ...
│
├── package.json            (原项目保持不变)
├── docs/                   (原 docs 保持不变)
└── ...
```

---

## 3. 页面设计规范

### 3.1 首页 (index.md)

**内容结构：**

```markdown
---
title: LangChain.js 教程
description: 循序渐进学习 LangChain.js
---

# LangChain.js 教程

一个循序渐进的 LangChain.js 学习教程，每个模块都有可运行的代码示例。

## 前置要求

- Node.js 20+
- 智谱 AI API Key 或 OpenAI API Key

## 环境搭建

### 1. 克隆项目

```bash
git clone <repo-url>
cd langchain_example
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key
```

### 4. 运行示例

```bash
npm run dev src/01-setup/01-simple-llm.ts
```

## 模块导航

::: info 模块 1：环境搭建与基础 LLM 调用
- 01-simple-llm
- 02-chat-model
:::

::: info 模块 2：Prompts（提示模板和输出解析器）
- 01-prompt-template
- 02-chat-prompt-template
- 03-output-parser
- 04-few-shot-prompt
:::

::: info 模块 3：Chains（链）
- 01-llm-chain
- 02-sequential-chain
- 03-router-chain
- 04-transform-chain
:::

::: info 模块 4：RAG（检索增强生成）
- 01-document-loader
- 02-text-splitter
- 03-embeddings
- 04-vector-store
- 05-retrieval-qa
:::

::: info 模块 5：Agents（智能代理）
- 01-tools
- 02-react-agent
- 03-functions-agent
:::

::: info 模块 6：Memory（记忆）
- 01-buffer-memory
- 02-window-memory
- 03-summary-memory
- 04-memory-in-chain
:::
```

---

### 3.2 模块介绍页 (index.md)

**每个模块的 index.md 结构：**

```markdown
---
title: 模块 X：[模块名称]
---

# 模块 X：[模块名称]

## 学习要点

- 要点 1
- 要点 2
- 要点 3

## 示例列表

- [文件名 1](01-xxx.md) - 简要说明
- [文件名 2](02-xxx.md) - 简要说明

## 运行方式

```bash
npm run dev src/xx-xxx/01-xxx.ts
```
```

**数据来源：** 从原模块的 README.md 提取学习要点

---

### 3.3 示例代码页

**每个 .ts 文件对应的 .md 页面结构：**

```markdown
---
title: [文件名]
---

# [文件名]

[简要说明，从代码注释或 README 提取，1-2 句话]

## 源码

```typescript
[完整的 .ts 文件内容]
```

## 查看原文件

- 源码位置：[`src/xx-xxx/[文件名].ts`](../../src/xx-xxx/[文件名].ts)

## 运行方式

```bash
npm run dev src/xx-xxx/[文件名].ts
```
```

**关键原则：**
- 源码直接读取，不复制，保持同步
- 简洁展示，不添加过多额外内容
- 提供运行命令和源码链接

---

## 4. VitePress 配置

### 4.1 config.ts

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LangChain.js 教程',
  description: '循序渐进学习 LangChain.js',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/[your-repo]' }
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
        // ... 其他模块
      ]
    }
  }
})
```

---

## 5. 构建流程

### 5.1 website/package.json

```json
{
  "name": "langchain-tutorial-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

### 5.2 主 package.json

可以添加（可选）：
```json
{
  "scripts": {
    "docs:dev": "cd website && npm run dev",
    "docs:build": "cd website && npm run build"
  }
}
```

---

## 6. 内容生成策略

### 6.1 自动化原则
- **不要复制代码**：Markdown 页面生成时直接读取 src/ 目录的文件内容
- **保持同步**：当 src/ 目录更新时，重新生成即可

### 6.2 手动编辑内容
- 首页 (index.md)：手动编写，包含完整教程介绍
- 模块介绍页 (xx-xxx/index.md)：从原 README.md 提取
- 示例代码页：自动生成，源码直接嵌入

---

## 7. 文件清单

### 7.1 需要创建的文件

```
website/
├── package.json
├── index.md
├── .vitepress/
│   └── config.ts
├── 01-setup/
│   ├── index.md
│   ├── 01-simple-llm.md
│   └── 02-chat-model.md
├── 02-prompts/
│   ├── index.md
│   ├── 01-prompt-template.md
│   ├── 02-chat-prompt-template.md
│   ├── 03-output-parser.md
│   └── 04-few-shot-prompt.md
├── 03-chains/
│   ├── index.md
│   ├── 01-llm-chain.md
│   ├── 02-sequential-chain.md
│   ├── 03-router-chain.md
│   └── 04-transform-chain.md
├── 04-rag/
│   ├── index.md
│   ├── 01-document-loader.md
│   ├── 02-text-splitter.md
│   ├── 03-embeddings.md
│   ├── 04-vector-store.md
│   └── 05-retrieval-qa.md
├── 05-agents/
│   ├── index.md
│   ├── 01-tools.md
│   ├── 02-react-agent.md
│   └── 03-functions-agent.md
└── 06-memory/
    ├── index.md
    ├── 01-buffer-memory.md
    ├── 02-window-memory.md
    ├── 03-summary-memory.md
    └── 04-memory-in-chain.md
```

总计：约 20+ 个文件

---

## 8. 边界与约束

| 项目 | 说明 |
|------|------|
| **原代码** | 只读，不修改，保持原样 |
| **展示内容** | 纯代码展示，不提供在线运行 |
| **额外功能** | 不添加搜索、评论、暗色主题等 |
| **部署** | 仅提供本地开发，部署由用户自行决定 |

---

## 9. 验收标准

1. ✅ website/ 目录独立存在，不影响原项目
2. ✅ 所有 6 个模块、20+ 示例完整展示
3. ✅ 侧边栏按模块分组导航
4. ✅ 每个页面有正确的代码块展示
5. ✅ 首页包含完整的教程介绍和环境搭建说明
6. ✅ `npm run docs:dev` 可以正常启动预览

---

## 10. 后续可选优化（不在本次范围）

- 添加搜索功能
- 添加代码复制按钮
- 添加暗色主题
- 添加部署到 GitHub Pages
- 添加在线运行功能（StackBlitz / CodeSandbox）
