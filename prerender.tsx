/**
 * Post-build prerender step.
 *
 * Generates fully static, crawlable HTML for each blog article at
 * dist/blog/<slug>/index.html, with per-page <title>, meta description,
 * Open Graph / Twitter tags, canonical URL and JSON-LD Article schema.
 * Pages reuse the site's compiled CSS bundle (which carries the Tailwind
 * tokens + Google Fonts), so they match the design system with zero JS.
 *
 * Also emits sitemap.xml and robots.txt. Runs after `vite build`.
 */
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import BlogArticlePage from "./src/BlogArticlePage";
import { BLOG_ARTICLE_LIST } from "./src/blogArticles";

const BASE_URL = "https://www.neoramastudios.com";
const DIST = path.resolve(process.cwd(), "dist");

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Pull the hashed CSS bundle that Vite injected into index.html.
function getCssHref(): string {
  const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");
  const match = indexHtml.match(/href="(\/assets\/[^"]+\.css)"/);
  if (!match) throw new Error("Could not locate built CSS bundle in dist/index.html");
  return match[1];
}

// Copy the brand logo to a stable public path for OG / schema publisher logo.
function ensureLogo(): string | null {
  const assetsDir = path.join(process.cwd(), "src", "assets", "images");
  if (!fs.existsSync(assetsDir)) return null;
  const logo = fs.readdirSync(assetsDir).find((f) => /neorama_logo/i.test(f));
  if (!logo) return null;
  fs.copyFileSync(path.join(assetsDir, logo), path.join(DIST, "logo.png"));
  return `${BASE_URL}/logo.png`;
}

function pageHtml(opts: {
  bodyMarkup: string;
  cssHref: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  image: string;
  jsonLd: object;
}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}" />
<meta name="keywords" content="${esc(opts.keywords.join(", "))}" />
<link rel="canonical" href="${opts.canonical}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(opts.title)}" />
<meta property="og:description" content="${esc(opts.description)}" />
<meta property="og:url" content="${opts.canonical}" />
<meta property="og:image" content="${esc(opts.image)}" />
<meta property="og:site_name" content="Neorama Studios" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(opts.title)}" />
<meta name="twitter:description" content="${esc(opts.description)}" />
<meta name="twitter:image" content="${esc(opts.image)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="${opts.cssHref}" />
<script type="application/ld+json">${JSON.stringify(opts.jsonLd)}</script>
</head>
<body>
${opts.bodyMarkup}
</body>
</html>`;
}

function run() {
  const cssHref = getCssHref();
  const logoUrl = ensureLogo();

  for (const article of BLOG_ARTICLE_LIST) {
    const canonical = `${BASE_URL}/blog/${article.slug}/`;
    const published = new Date(article.date).toISOString();
    const imageAbs = article.imageUrl.startsWith("http")
      ? article.imageUrl
      : `${BASE_URL}${article.imageUrl}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.metaDescription,
      image: [imageAbs],
      datePublished: published,
      dateModified: published,
      author: { "@type": "Organization", name: "Neorama Studios", url: BASE_URL },
      publisher: {
        "@type": "Organization",
        name: "Neorama Studios",
        ...(logoUrl ? { logo: { "@type": "ImageObject", url: logoUrl } } : {}),
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      articleSection: article.category,
      keywords: article.keywords.join(", "),
    };

    const bodyMarkup = renderToStaticMarkup(<BlogArticlePage article={article} />);

    const html = pageHtml({
      bodyMarkup,
      cssHref,
      title: article.metaTitle,
      description: article.metaDescription,
      keywords: article.keywords,
      canonical,
      image: imageAbs,
      jsonLd,
    });

    const outDir = path.join(DIST, "blog", article.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`  ✓ /blog/${article.slug}/`);
  }

  // sitemap.xml
  const urls = [
    { loc: `${BASE_URL}/`, priority: "1.0" },
    ...BLOG_ARTICLE_LIST.map((a) => ({
      loc: `${BASE_URL}/blog/${a.slug}/`,
      priority: "0.8",
      lastmod: new Date(a.date).toISOString().slice(0, 10),
    })),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u: any) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.priority}</priority></url>`
  )
  .join("\n")}
</urlset>`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), sitemap, "utf-8");

  // robots.txt
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(DIST, "robots.txt"), robots, "utf-8");

  console.log(`  ✓ sitemap.xml + robots.txt`);
}

run();
