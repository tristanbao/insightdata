'use client';

export default function NewsletterForm() {
  return (
    <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-brand-500/50 transition-colors"
      />
      <button
        type="submit"
        className="w-full px-3 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors"
      >
        订阅
      </button>
    </form>
  );
}
