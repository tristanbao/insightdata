import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/lib/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '关于',
  description: '了解 InsightData 的创办理念与使命。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-narrow">
          <div className="mb-16">
            <h1 className="text-4xl font-serif font-bold text-white mb-4">关于 InsightData</h1>
            <p className="text-lg text-neutral-400 font-serif italic">
              &ldquo;In God we trust, all others bring data.&rdquo;
            </p>
          </div>

          <div className="space-y-8 text-neutral-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif font-semibold text-white mb-4">我们的使命</h2>
              <p>
                InsightData 诞生于一个朴素的信念：在这个信息爆炸的时代，真正有价值的内容反而愈发稀缺。我们希望创建一个专注深度、拒绝碎片化的知识空间，让每一篇文章都经过深思熟虑，每一行文字都经得起推敲。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold text-white mb-4">我们的视角</h2>
              <p>
                我们相信，数据科学和人工智能不是冰冷的代码与公式，而是推动社会进步的深层力量。因此，我们不仅探讨技术本身，更关注技术背后的思维方式、行业影响和人文价值。
              </p>
              <p className="mt-4">
                我们用专业但不晦涩的语言，将复杂议题拆解成可理解的脉络。无论你是从业者、研究者，还是对这个领域充满好奇的读者，都能在这里找到有价值的内容。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold text-white mb-4">内容方向</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="p-5 bg-neutral-900/40 border border-neutral-800/50 rounded-xl hover:border-neutral-700 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-medium text-white group-hover:text-brand-400 transition-colors">
                        {cat.name}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed">{cat.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif font-semibold text-white mb-4">写作原则</h2>
              <ul className="space-y-3">
                {[
                  { title: '深度优先', desc: '宁可用 5000 字讲清楚一个问题，也不愿用 500 字制造三个误解。' },
                  { title: '言之有据', desc: '每一个论点都应有数据、案例或逻辑支撑，避免空泛的断言。' },
                  { title: '持续迭代', desc: '技术飞速演进，我们的内容也在不断更新与修正，以保持准确。' },
                  { title: '开放协作', desc: '欢迎读者提出质疑与补充，知识在对话中生长。' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">{item.title}</span>
                      <span className="text-neutral-500"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8">
              <h2 className="text-xl font-serif font-semibold text-white mb-4">联系与投稿</h2>
              <p className="text-neutral-400 mb-4">
                如果你有深度内容想要分享，或者希望与我们就特定话题进行探讨，欢迎通过以下方式联系我们。
              </p>
              <div className="space-y-2 text-sm text-neutral-500">
                <p>
                  <span className="text-neutral-300">邮箱：</span>hello@insightdata.tech
                </p>
                <p>
                  <span className="text-neutral-300">GitHub：</span>github.com/insightdata
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
