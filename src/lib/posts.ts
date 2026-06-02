import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter, CATEGORIES } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  } catch {
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    const wordCount = content.replace(/[#*`>\-\[\]]/g, '').length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 400));

    return {
      ...frontmatter,
      slug: realSlug,
      content,
      readingTime: frontmatter.readingTime ?? readingTime,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(count = 3): Post[] {
  const all = getAllPosts();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= count) return featured.slice(0, count);
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, count);
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getCategoriesWithCount() {
  return CATEGORIES.map((cat) => ({
    ...cat,
    count: getPostsByCategory(cat.slug).length,
  }));
}
