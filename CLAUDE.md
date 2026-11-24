## 文章自动生成与发布规范 (Blog / Writing)

当 Issue 标签为 `ai-article` 或指令要求撰写文章时，严格按以下步骤执行：

### 1. 动笔前必读（对齐格式）
- 读取 `src/content/posts/enterprise-data-governance-framework.mdx`（或最新一篇 `.mdx`），严格沿用其 Frontmatter 字段名、数据类型和日期格式，严禁自创未定义的字段。
- 读取 `src/content/posts/markdown-syntax-guide.mdx`，遵循本站支持的 MDX 语法与组件规范。

### 2. 文件路径与命名
- **存放路径**：`src/content/posts/`
- **文件命名**：使用纯小写英文短横线格式（kebab-case），**不要加日期前缀**，以 `.mdx` 结尾（例如：`ai-agent-async-workflow.mdx`）。
- **配图规则**：如涉及图片，统一存放于 `public/images/` 并使用绝对路径引用；若无提供图片，不要虚构不存在的本地图片路径。

### 3. 内容与 MDX 语法防错（关键）
- **行文风格**：面向专业读者，观点明确、论据具体、逻辑克制。禁止堆砌空泛的 AI 套话与过度修饰词汇，多用结构化推演和实际场景案例。
- **MDX 编译防错**：`.mdx` 会将 `<`、`>`、`{`、`}` 解析为 JSX 语法。在普通正文（非代码块）中遇到类似 `< 10%`、`{变量}` 的写法时，必须用反引号包裹（如 `` `< 10%` ``）或改用中文表达（如“小于 10%”），防止构建报错。

### 4. 提交前强制校验
生成文章后，必须在终端依次执行以下命令，确保全部通过（退出码为 0）后再提交代码：
1. `npm run lint`
2. `npm run build`

### 5. 分支与 PR 规范
- 新建独立分支（如 `post/<slug>`），禁止直接向 `main` 分支推送。
- 提交 Pull Request，并在 PR 描述中列出：文章标题、文件路径、Frontmatter 摘要及 `npm run build` 的通过状态。
