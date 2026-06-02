import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-narrow text-center">
          <div className="mb-8">
            <span className="text-8xl font-serif font-bold text-neutral-800">404</span>
          </div>
          <h1 className="text-2xl font-serif font-semibold text-white mb-4">页面未找到</h1>
          <p className="text-neutral-500 mb-8">
            你访问的页面不存在或已被移除。
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            返回首页
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
