# InsightData Blog

深入探索数据科学、人工智能与行业洞察的专业博客。

## 技术栈

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown)
- **Deployment**: Static Export (可部署至任意静态托管平台)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态网站
npm run build
```

## 目录结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── blog/               # 文章列表
│   │   └── [slug]/         # 文章详情
│   ├── category/           # 分类页面
│   ├── about/              # 关于页
│   └── writing/            # 投稿页
├── components/             # React 组件
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PostCard.tsx
│   └── CategorySection.tsx
├── content/
│   └── posts/              # MDX 文章文件
└── lib/                    # 工具函数与类型定义
    ├── posts.ts            # 文章数据处理
    ├── types.ts            # TypeScript 类型
    └── utils.ts            # 通用工具函数
```

## 文章格式

```mdx
---
title: 文章标题
date: "2026-05-20"
author: 作者名
description: 一句话描述
category: ai  # data-science | ai | industry | knowledge | methodology
tags: [标签1, 标签2]
featured: true
---

正文内容...
```

## 分类

- **数据科学** — 数据分析、统计学、可视化
- **人工智能** — 机器学习、深度学习、大模型
- **行业洞察** — 科技、金融、医疗等行业趋势
- **知识管理** — 知识图谱、信息架构、知识体系
- **方法论** — 思维框架、研究方法、系统性思考
