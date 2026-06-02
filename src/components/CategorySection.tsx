import Link from 'next/link';
import { CATEGORIES } from '@/lib/types';

export default function CategorySection() {
  return (
    <section className="py-16">
      <div className="container-wide">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-semibold text-white">探索主题</h2>
          <Link
            href="/blog"
            className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative p-5 bg-neutral-900/40 border border-neutral-800/50 rounded-xl hover:border-neutral-700 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, ${cat.color}08 0%, transparent 60%)` }}
              />
              <div
                className="w-3 h-3 rounded-full mb-3 transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: cat.color }}
              />
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-brand-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed hidden md:block">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
