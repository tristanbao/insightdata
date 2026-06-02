import Link from 'next/link';
import { Post } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'featured' | 'compact';
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const category = CATEGORIES.find((c) => c.slug === post.category);

  if (variant === 'featured') {
    return (
      <article className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 card-hover">
        <Link href={`/blog/${post.slug}`} className="block">
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.name}
                </span>
              )}
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} 分钟阅读
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-4">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">{formatDate(post.date)}</span>
              <span className="text-xs text-brand-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                阅读全文
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-neutral-800/50 last:border-0">
        <Link href={`/blog/${post.slug}`} className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {category && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{ backgroundColor: category.color + '15', color: category.color }}
              >
                {category.name}
              </span>
            )}
            <span className="text-xs text-neutral-600">{formatDate(post.date)}</span>
          </div>
          <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>
        </Link>
        {post.coverImage && (
          <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-20 h-20 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
            />
          </Link>
        )}
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 h-full card-hover">
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ backgroundColor: category.color + '15', color: category.color }}
                >
                  {category.name}
                </span>
              )}
              <span className="text-xs text-neutral-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} 分钟
              </span>
            </div>
            <h3 className="text-base font-serif font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
              {post.description}
            </p>
            <div className="mt-3 text-xs text-neutral-600">{formatDate(post.date)}</div>
          </div>
        </div>
      </Link>
    </article>
  );
}
