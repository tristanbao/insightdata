import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { getCategoriesWithCount, getPostsByCategory } from '@/lib/posts';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = getCategoriesWithCount();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = getCategoriesWithCount();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: '分类未找到' };
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: Props) {
  const categories = getCategoriesWithCount();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-wide">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-neutral-500">分类</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-3">{category.name}</h1>
            <p className="text-neutral-400">{category.description}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="md:w-56 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                  全部分类
                </h3>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                        cat.slug === params.slug
                          ? 'text-white bg-brand-500/10 border border-brand-500/20'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        {cat.name}
                      </span>
                      {cat.count !== undefined && (
                        <span className="text-xs text-neutral-600">{cat.count}</span>
                      )}
                    </a>
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
                  <p className="text-neutral-500">该分类下暂无文章。</p>
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
