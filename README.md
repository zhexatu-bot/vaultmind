# VaultMind

> Local-first knowledge base management. Obsidian-style, but with a modern SaaS-grade interface.

A lightweight desktop knowledge management tool designed for teams and individuals who want Obsidian-like power with a more polished, professional UI.

---

## Features / 功能

**Markdown Knowledge Base / 知识库管理**: Full-featured Markdown editor with real-time preview, syntax highlighting, and live rendering. 全功能 Markdown 编辑器，实时预览，代码高亮。

**File Tree Navigation / 文件树**: Hierarchical folder structure with intuitive file management. 层级文件夹结构，直观管理。

**Bi-directional Links / 双向链接**: Use `[[document name]]` syntax to link notes together. Backlinks panel shows all references. 使用 `[[文档名]]` 语法链接笔记，反向链接面板展示所有引用。

**Tag System / 标签系统**: Organize notes with tags. Filter and search by tag. 标签管理，按标签筛选和搜索。

**Graph View / 图谱视图**: Interactive knowledge graph visualization showing connections between notes. 交互式知识图谱可视化，展示笔记间的关联。

**Global Search / 全局搜索**: Search across all notes, tags, and content. 搜索所有笔记、标签和内容。

**Template Studio / 模板库**: Pre-built templates for meeting notes, project briefs, research docs, weekly reviews. 内置会议记录、项目简介、研究文档、周报等模板。

**Local AI Assistant / 本地 AI 助手**: Built-in AI chat, summarize, and connect features. Ready for local LLM integration. 内置 AI 对话、总结、关联功能，可接入本地大模型。

**Dark Theme / 深色主题**: Professional dark interface with glass morphism cards, gradient accents, modern typography. 专业深色界面，玻璃拟态卡片，渐变强调色。

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react icons

## Pages / 页面

1. **Dashboard** — Overview with stat cards, recent notes, graph preview, quick actions, AI assistant card / 概览首页
2. **Editor** — Split-pane Markdown editor with toolbar and live preview / 编辑器
3. **Graph View** — Full interactive knowledge graph / 图谱视图
4. **Search** — Global search with highlighted matches / 全局搜索
5. **Template Studio** — Pre-built note templates / 模板库

## Run / 运行

```bash
npm install
npm run dev
```

## Contact / 联系方式

- GitHub: [zhexatu-bot](https://github.com/zhexatu-bot)
- WeChat: matlabpython888

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
