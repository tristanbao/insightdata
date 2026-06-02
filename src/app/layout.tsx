import type { Metadata } from 'next';
import { Inter, Noto_Serif_SC, Fira_Code } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-sc',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'InsightData — 数据与智能的深度思考',
    template: '%s | InsightData',
  },
  description:
    '深入探索数据科学、人工智能、行业洞察与知识管理。以专业视角，拆解复杂议题，输出有价值的深度内容。',
  keywords: ['数据科学', '人工智能', '机器学习', '深度学习', '行业洞察', '知识管理', '数据分析'],
  authors: [{ name: 'InsightData' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://insightdata.tech',
    siteName: 'InsightData',
    title: 'InsightData — 数据与智能的深度思考',
    description: '深入探索数据科学、人工智能、行业洞察与知识管理。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InsightData — 数据与智能的深度思考',
    description: '深入探索数据科学、人工智能、行业洞察与知识管理。',
  },
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`scroll-smooth ${inter.variable} ${notoSerifSC.variable} ${firaCode.variable}`}>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
