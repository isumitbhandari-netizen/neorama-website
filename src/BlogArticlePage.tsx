import type { ArticleBlock, BlogArticle } from "./blogArticles";

/**
 * Standalone article page, rendered to static HTML at build time (see prerender.ts)
 * for SEO. Uses the same Tailwind tokens/classes as the main site so it inherits the
 * design system from the shared compiled CSS bundle. Must stay browser-API free.
 */

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl font-black text-on-surface tracking-tight mt-12 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-lg md:text-xl font-extrabold text-on-surface tracking-tight mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2 my-5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 font-sans text-base text-on-surface-variant leading-relaxed">
              <span className="text-[#3079D8] font-bold shrink-0 mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div className="mt-12 p-8 md:p-10 rounded-2xl bg-on-surface text-pure-white text-center space-y-5">
          <p className="font-display text-xl md:text-2xl font-extrabold tracking-tight max-w-2xl mx-auto">
            {block.text}
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-electric-blue hover:bg-primary-container text-pure-white font-sans text-sm font-bold uppercase tracking-wider rounded-lg transition-all"
          >
            {block.label}
          </a>
        </div>
      );
    case "p":
    default:
      return (
        <p className="font-sans text-base md:text-[17px] text-on-surface-variant leading-relaxed my-5">
          {block.text}
        </p>
      );
  }
}

export default function BlogArticlePage({ article }: { article: BlogArticle }) {
  return (
    <div className="min-h-screen bg-pure-white text-on-surface">
      {/* Header */}
      <header className="border-b border-soft-gray">
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto">
          <a href="/" className="hover:scale-[1.02] transform transition-all duration-300 flex items-center">
            <img
              src="/logo.png"
              alt="NEORAMA"
              style={{ width: "320px", height: "100px" }}
              className="object-contain"
            />
          </a>
          <a
            href="/#blog"
            className="font-mono text-[11px] uppercase tracking-wider text-[#3079D8] hover:text-on-surface transition-colors"
          >
            ← All Essays
          </a>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-[760px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="space-y-5">
          <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
            {article.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-black text-on-surface tracking-tight leading-[1.1]">
            {article.title}
          </h1>
          <p className="font-sans text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {article.standfirst}
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono text-[#727784] uppercase tracking-wider pt-2">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-soft-gray inline-block" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-background-gray my-10">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="article-body">
          {article.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-soft-gray">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="NEORAMA" className="h-10 w-auto object-contain" />
          </a>
          <p className="font-mono text-[10px] text-[#727784] uppercase tracking-wider text-center">
            Contemporary Film &amp; Marketing Studio · Mumbai
          </p>
          <a
            href="/#contact"
            className="font-mono text-[11px] uppercase tracking-wider text-[#3079D8] hover:text-on-surface transition-colors"
          >
            Start a project →
          </a>
        </div>
      </footer>
    </div>
  );
}
