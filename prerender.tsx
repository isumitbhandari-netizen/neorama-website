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
import ServicePage from "./src/ServicePage";
import { BLOG_ARTICLE_LIST } from "./src/blogArticles";
import { SERVICE_PAGE_LIST } from "./src/services";
import { PROJECT_ROUTES } from "./src/projectRoutes";

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

// Pull the hashed JS entry bundle Vite injected, so prerendered project pages
// boot the full React app (interactive case studies) after the share-card meta
// has already been read by crawlers/scrapers from the static HEAD.
function getScriptSrc(): string {
  const indexHtml = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");
  const match = indexHtml.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/);
  if (!match) throw new Error("Could not locate built JS bundle in dist/index.html");
  return match[1];
}

// Copy a source image to a stable, scraper-friendly public path and return its
// absolute URL. Returns null if the source file is missing.
function copyOgImage(fileName: string, outName: string): string | null {
  const src = path.join(process.cwd(), "src", "assets", "images", fileName);
  if (!fs.existsSync(src)) {
    console.warn(`  ! OG image missing, skipping: ${fileName}`);
    return null;
  }
  const ext = path.extname(fileName);
  const outDir = path.join(DIST, "og", "projects");
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(src, path.join(outDir, `${outName}${ext}`));
  return `${BASE_URL}/og/projects/${outName}${ext}`;
}

// Static HTML for a project/story page: per-page share meta in the HEAD, plus
// the CSS + JS bundles so the page hydrates into the live, interactive SPA.
function appShellHtml(opts: {
  cssHref: string;
  scriptSrc: string;
  title: string;
  description: string;
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
<link rel="canonical" href="${opts.canonical}" />
<link rel="icon" type="image/png" href="/favicon.png" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Neorama Studios" />
<meta property="og:title" content="${esc(opts.title)}" />
<meta property="og:description" content="${esc(opts.description)}" />
<meta property="og:url" content="${opts.canonical}" />
<meta property="og:image" content="${esc(opts.image)}" />
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
<div id="root"></div>
<script type="module" crossorigin src="${opts.scriptSrc}"></script>
</body>
</html>`;
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
  ogType?: string;
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
<meta property="og:type" content="${opts.ogType ?? "article"}" />
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
  const scriptSrc = getScriptSrc();
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

  // Service landing pages (top-level, e.g. /brand-films-mumbai/).
  for (const service of SERVICE_PAGE_LIST) {
    const canonical = `${BASE_URL}/${service.slug}/`;
    const imageAbs = service.imageUrl.startsWith("http")
      ? service.imageUrl
      : `${BASE_URL}${service.imageUrl}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: service.h1,
          serviceType: service.serviceType,
          description: service.metaDescription,
          url: canonical,
          areaServed: { "@type": "City", name: "Mumbai" },
          provider: {
            "@type": "ProfessionalService",
            name: "Neorama Studios",
            url: `${BASE_URL}/`,
            telephone: "+91-9713102046",
            email: "neoramastudios@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "906, 9th Floor, Dev Plaza, S V Road, Andheri West",
              addressLocality: "Mumbai",
              addressRegion: "Maharashtra",
              postalCode: "400068",
              addressCountry: "IN",
            },
            ...(logoUrl ? { logo: logoUrl } : {}),
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: service.h1, item: canonical },
          ],
        },
        ...(service.faqs.length > 0
          ? [
              {
                "@type": "FAQPage",
                mainEntity: service.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              },
            ]
          : []),
      ],
    };

    const bodyMarkup = renderToStaticMarkup(<ServicePage service={service} />);

    const html = pageHtml({
      bodyMarkup,
      cssHref,
      title: service.metaTitle,
      description: service.metaDescription,
      keywords: service.keywords,
      canonical,
      image: imageAbs,
      jsonLd,
      ogType: "website",
    });

    const outDir = path.join(DIST, service.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`  ✓ /${service.slug}/`);
  }

  // Portfolio project pages (shareable deep links) + nested story pages.
  // Each is a static, crawlable HTML shell that boots the interactive SPA.
  const projectUrls: { loc: string; priority: string }[] = [];

  for (const project of PROJECT_ROUTES) {
    const basePath = `/projects/${project.category}/${project.slug}`;
    const canonical = `${BASE_URL}${basePath}`;
    const image =
      copyOgImage(project.ogImageFile, project.slug) ?? `${BASE_URL}/og-image.jpg`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: canonical,
          image,
          creator: { "@type": "Organization", name: "Neorama Studios", url: `${BASE_URL}/` },
          ...(logoUrl
            ? { publisher: { "@type": "Organization", name: "Neorama Studios", logo: { "@type": "ImageObject", url: logoUrl } } }
            : {}),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/#projects` },
            { "@type": "ListItem", position: 3, name: project.title, item: canonical },
          ],
        },
      ],
    };

    const html = appShellHtml({
      cssHref,
      scriptSrc,
      title: project.title,
      description: project.description,
      canonical,
      image,
      jsonLd,
    });

    const outDir = path.join(DIST, basePath);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    projectUrls.push({ loc: canonical, priority: "0.8" });
    console.log(`  ✓ ${basePath}/`);

    for (const story of project.stories ?? []) {
      const storyPath = `${basePath}/${story.slug}`;
      const storyCanonical = `${BASE_URL}${storyPath}`;
      const storyImage =
        copyOgImage(story.ogImageFile, `${project.slug}-${story.slug}`) ?? image;

      const storyJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            name: story.title,
            description: story.description,
            url: storyCanonical,
            image: storyImage,
            isPartOf: { "@type": "CreativeWork", name: project.title, url: canonical },
            creator: { "@type": "Organization", name: "Neorama Studios", url: `${BASE_URL}/` },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/#projects` },
              { "@type": "ListItem", position: 3, name: project.title, item: canonical },
              { "@type": "ListItem", position: 4, name: story.title, item: storyCanonical },
            ],
          },
        ],
      };

      const storyHtml = appShellHtml({
        cssHref,
        scriptSrc,
        title: story.title,
        description: story.description,
        canonical: storyCanonical,
        image: storyImage,
        jsonLd: storyJsonLd,
      });

      const storyOutDir = path.join(DIST, storyPath);
      fs.mkdirSync(storyOutDir, { recursive: true });
      fs.writeFileSync(path.join(storyOutDir, "index.html"), storyHtml, "utf-8");
      projectUrls.push({ loc: storyCanonical, priority: "0.7" });
      console.log(`  ✓ ${storyPath}/`);
    }
  }

  // sitemap.xml
  const urls = [
    { loc: `${BASE_URL}/`, priority: "1.0" },
    ...SERVICE_PAGE_LIST.map((s) => ({
      loc: `${BASE_URL}/${s.slug}/`,
      priority: "0.9",
    })),
    ...BLOG_ARTICLE_LIST.map((a) => ({
      loc: `${BASE_URL}/blog/${a.slug}/`,
      priority: "0.8",
      lastmod: new Date(a.date).toISOString().slice(0, 10),
    })),
    ...projectUrls,
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

  console.log(`  ✓ sitemap.xml (${urls.length} urls) + robots.txt`);
}

run();
