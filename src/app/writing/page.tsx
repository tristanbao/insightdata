import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '???',
  description: '? InsightData ????????',
};

export default function WritingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container-narrow">
          <div className="mb-12">
            <h1 className="text-4xl font-serif font-bold text-white mb-4">????????</h1>
            <p className="text-neutral-400">
              ????????????????????????????
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8">
              <h2 className="text-lg font-serif font-semibold text-white mb-4">????</h2>
              <ul className="space-y-3 text-sm text-neutral-400">
                {[
                  '???????????????????',
                  '???????AI????????????',
                  '???????????????????',
                  '????? 2000 ???',
                  '????????????? Unsplash?',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 bg-brand-500/10 text-brand-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-8">
              <h2 className="text-lg font-serif font-semibold text-white mb-4">????</h2>
              <ol className="space-y-4 text-sm text-neutral-400">
                {[
                  { step: '????', desc: '????? GitHub ???????????' },
                  { step: '????', desc: '??? 3-5 ???????????' },
                  { step: '????', desc: '????????????????' },
                  { step: '????', desc: '?????????????????' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 bg-brand-500/10 text-brand-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-medium text-white">{item.step}</span>
                      <p className="text-neutral-500 mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-neutral-900/30 border border-neutral-800/30 rounded-2xl p-8">
            <h2 className="text-lg font-serif font-semibold text-white mb-4">??????</h2>
            <p className="text-sm text-neutral-400 mb-4">
              ???? Markdown ???????????????????????????
            </p>
            <div className="bg-neutral-950 rounded-xl p-6 text-sm font-mono text-neutral-400 overflow-x-auto">
              <pre>{`---
title: ??????
date: ${new Date().toISOString().split('T')[0]}
author: ????
description: ?????????
category: data-science  # data-science | data-assets | ai | industry | knowledge
tags: [??1, ??2]
featured: false
---

## ????

?????????????...`}</pre>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="mailto:hello@insightdata.tech"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              ????
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
