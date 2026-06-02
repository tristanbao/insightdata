import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '文章',
  description: '浏览 InsightData 的所有深度文章，覆盖数据科学、人工智能、行业洞察等领域。',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-wide">
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-white mb-3">全部文章</h1>
            <p className="text-neutral-500">
              {posts.length} 篇文章，持续更新中
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-56 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  筛选分类
                </h3>
                <nav className="space-y-1">
                  <Link
                    href="/blog"
                    className="block px-3 py-2 text-sm rounded-lg text-white bg-brand-500/10 border border-brand-500/20"
                  >
                    全部
                  </Link>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1">
              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-neutral-500">暂无文章。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
