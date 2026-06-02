'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, PenLine } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';

const NAV_LINKS = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/about', label: '关于' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
      <Link href="/" className="flex items-center gap-3 group">
        <Logo />
        <span className="font-serif text-2xl font-semibold tracking-wide text-white group-hover:text-brand-400 transition-colors">
          InsightData | 因赛达
        </span>
      </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div className="relative group">
              <button className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                分类
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                <div className="p-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{cat.name}</div>
                        <div className="text-xs text-neutral-500 leading-tight mt-0.5">
                          {cat.description.slice(0, 28)}…
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/writing"
              className="hidden md:flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors border border-brand-500/30 hover:border-brand-500/60 px-3 py-1.5 rounded-lg"
            >
              <PenLine className="w-3.5 h-3.5" />
              写文章
            </Link>
            <button
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <nav className="container-wide py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 px-3 text-xs text-neutral-500 uppercase tracking-wider">分类</div>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-icon-only.png"
      alt="InsightData"
      width={48}
      height={48}
      className="flex-shrink-0 rounded-lg"
    />
  );
}
