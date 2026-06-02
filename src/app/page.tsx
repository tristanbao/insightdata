import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import CategorySection from '@/components/CategorySection';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllPosts, getFeaturedPosts } from '@/lib/posts';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/10 via-neutral-950 to-neutral-950" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-2 h-2 bg-brand-500/40 rounded-full" />
          <div className="absolute top-40 left-20 w-1 h-1 bg-brand-400/50 rounded-full" />
          <div className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-brand-500/30 rounded-full" />

          <div className="container-narrow relative">
            <div className="text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-xs text-brand-400 mb-8">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
                数据蕴藏洞察
                <span className="w-px h-3 bg-brand-500/30" />
                知识就是力量
                <span className="w-px h-3 bg-brand-500/30" />
                技术驱动智能
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
                Insight<span className="text-brand-500">Data</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-400 mb-4 max-w-2xl mx-auto leading-relaxed">
                深入探索数据科学、人工智能与行业洞察
              </p>
              <p className="text-sm text-neutral-600 mb-10 font-mono">
                &ldquo;In God we trust, all others bring data.&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  开始阅读
                </Link>
                <Link
                  href="/about"
                  className="px-6 py-3 border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white text-sm rounded-lg transition-colors"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CategorySection />

        <section className="py-16">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-1">精选文章</h2>
                <p className="text-sm text-neutral-500">值得关注的内容</p>
              </div>
              <Link
                href="/blog"
                className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
              >
                全部文章
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {featuredPosts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} variant="featured" />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        <section className="py-16 bg-neutral-900/20">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-serif font-semibold text-white mb-8">最新文章</h2>
                {recentPosts.length > 0 ? (
                  <div className="space-y-1">
                    {recentPosts.map((post) => (
                      <PostCard key={post.slug} post={post} variant="compact" />
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500 text-sm">暂无文章，即将上线。</p>
                )}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 mt-6 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  浏览全部文章
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-semibold text-white mb-8">关于本站</h2>
                <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-about.png" alt="InsightData" width={40} height={40} className="rounded-lg object-contain" />
                    <div>
                      <div className="font-serif font-semibold text-white">InsightData | 因赛达</div>
                      <div className="text-xs text-neutral-500">数据 · 智能 · 洞察</div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                    致力于用专业视角解读数据科学与人工智能领域的复杂议题，输出有深度、有价值的长文内容。
                  </p>
                  <Link
                    href="/about"
                    className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    了解更多 →
                  </Link>
                </div>

                <div className="mt-6 bg-neutral-900/30 border border-neutral-800/30 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-4">Newsletter</h3>
                  <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
                    订阅获取最新文章推送，不错过任何深度内容。
                  </p>
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-neutral-900 flex items-center justify-center">
        <svg className="w-8 h-8 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h3 className="text-lg font-serif font-semibold text-white mb-2">即将上线</h3>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto">
        深度文章正在准备中，敬请期待。
      </p>
    </div>
  );
}
