export interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  description: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  featured?: boolean;
  readingTime?: number;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
  count?: number;
}

export const CATEGORIES: Category[] = [
  {
    name: '数据科学',
    slug: 'data-science',
    description: '数据分析、统计学、可视化，挖掘数据中的深层价值',
    color: '#5a6ef9',
  },
  {
    name: '数据资产',
    slug: 'data-assets',
    description: '数据治理、主数据管理、数据资产管理',
    color: '#06b6d4',
  },
  {
    name: '人工智能',
    slug: 'ai',
    description: '机器学习、深度学习、大模型，探索智能的边界',
    color: '#a855f7',
  },
  {
    name: '因赛观察',
    slug: 'industry',
    description: '科技、金融、医疗等行业趋势与深度分析',
    color: '#f59e0b',
  },
  {
    name: '知识管理',
    slug: 'knowledge',
    description: '知识图谱、信息架构、个人知识体系构建',
    color: '#10b981',
  },
];
