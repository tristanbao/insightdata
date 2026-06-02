import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: '文章未找到' };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const category = CATEGORIES.find((c) => c.slug === post.category);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <article className="pt-32 pb-20">
          <div className="container-narrow">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>

            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {category && (
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
                    style={{
                      backgroundColor: category.color + '15',
                      color: category.color,
                    }}
                  >
                    {category.name}
                  </Link>
                )}
                <span className="text-xs text-neutral-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime} 分钟阅读
                </span>
                <span className="text-xs text-neutral-600 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.date)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-5 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-neutral-400 leading-relaxed">{post.description}</p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-5">
                  <Tag className="w-3.5 h-3.5 text-neutral-600" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.coverImage && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-10 bg-neutral-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose-article">
              <ContentRenderer content={post.content} />
            </div>
          </div>
        </article>

        <div className="border-t border-neutral-800">
          <div className="container-narrow py-12">
            <div className="flex flex-col sm:flex-row gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex-1 group p-5 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-neutral-700 transition-colors"
                >
                  <div className="text-xs text-neutral-500 mb-1">← 上一篇</div>
                  <div className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors line-clamp-1">
                    {prevPost.title}
                  </div>
                </Link>
              ) : <div className="flex-1" />}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex-1 group p-5 bg-neutral-900/50 border border-neutral-800/50 rounded-xl hover:border-neutral-700 transition-colors text-right"
                >
                  <div className="text-xs text-neutral-500 mb-1">下一篇 →</div>
                  <div className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors line-clamp-1">
                    {nextPost.title}
                  </div>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const isStart = !line.startsWith('```');
      if (!isStart) {
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={key++} className="bg-neutral-900 rounded-lg p-5 my-6 overflow-x-auto">
            <code className={`text-sm font-mono text-neutral-300 language-${lang}`}>
              {codeLines.join('\n')}
            </code>
          </pre>
        );
        continue;
      }
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++}>{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={key++}>{line.slice(2)}</blockquote>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(<li key={key++}>{renderInline(line.slice(2))}</li>);
    } else if (/^\d+\. /.test(line)) {
      elements.push(<li key={key++}>{renderInline(line.replace(/^\d+\. /, ''))}</li>);
    } else if (line.startsWith('---')) {
      elements.push(<hr key={key++} />);
    } else if (line.trim() === '') {
      // skip empty lines
    } else {
      elements.push(<p key={key++}>{renderInline(line)}</p>);
    }
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      codeMatch ? { type: 'code', index: codeMatch.index!, value: codeMatch[1] } : null,
      boldMatch ? { type: 'bold', index: boldMatch.index!, value: boldMatch[1] } : null,
      linkMatch ? { type: 'link', index: linkMatch.index!, value: linkMatch[1], href: linkMatch[2] } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index) as Array<{ type: string; index: number; value: string; href?: string }>;

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0];
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === 'code') {
      parts.push(<code key={key++}>{first.value}</code>);
    } else if (first.type === 'bold') {
      parts.push(<strong key={key++}>{first.value}</strong>);
    } else if (first.type === 'link') {
      parts.push(
        <a key={key++} href={first.href}>
          {first.value}
        </a>
      );
    }

    remaining = remaining.slice(first.index + (first.type === 'code' ? 2 : 2) + first.value.length + (first.type === 'link' ? 2 : (first.type === 'code' ? 1 : 2)));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}
