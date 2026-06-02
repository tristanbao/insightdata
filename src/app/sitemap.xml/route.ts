import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://insightdata.tech';

export async function GET() {
  const posts = await getAllPosts();

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    { url: '/writing', priority: '0.5', changefreq: 'monthly' },
    ...(['data-science', 'data-assets', 'ai', 'industry', 'knowledge'] as const).map(
      (slug) => ({
        url: `/category/${slug}`,
        priority: '0.7',
        changefreq: 'weekly',
      })
    ),
  ];

  const postEntries = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date(post.date).toISOString().split('T')[0],
  }));

  const allEntries = [
    ...staticPages.map((p) => ({
      ...p,
      lastmod: new Date().toISOString().split('T')[0],
    })),
    ...postEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    (entry) => `  <url>
    <loc>${BASE_URL}${entry.url}/</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
