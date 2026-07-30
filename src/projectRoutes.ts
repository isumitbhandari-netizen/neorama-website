/**
 * Central, framework-agnostic routing + share-metadata table for portfolio
 * projects and the individual stories nested inside them.
 *
 * IMPORTANT: this module must stay PURE — no image/asset imports. It is consumed
 * both by the Vite app bundle (src/App.tsx) AND by the raw-tsx prerender step
 * (prerender.tsx), which cannot resolve Vite asset imports. Image references are
 * therefore plain filenames under src/assets/images, copied to stable public
 * paths at prerender time.
 *
 * URL scheme:
 *   /projects/<category>/<project-slug>                  → a project
 *   /projects/<category>/<project-slug>/<story-slug>     → a story inside it
 *
 * `id` matches Project.id in src/data.ts so the app can map a URL back to the
 * project that drives the (interactive) case-study overlay.
 */

import { SOCIAL_REELS, CATEGORY_ORDER, type SocialReelCategory } from "./socialReels";

export type ProjectCategorySlug = "films" | "photography" | "social-media" | "branding" | "ai-production";

// Matches the portfolio filter state in App.tsx.
export type PortfolioFilter = "all" | "cinematography" | "photography" | "campaign" | "brand" | "ai";

export interface StoryRoute {
  slug: string;
  title: string; // share-card / <title>
  description: string; // share-card / meta description
  ogImageFile: string; // filename under src/assets/images
  // Basename prefix (e.g. "arch_aravali") of this story's gallery WebP images in
  // src/assets/images. When set, prerender emits an image sitemap entry listing
  // every built (hashed) photo under this story's URL for image-search indexing.
  imagePrefix?: string;
}

export interface ProjectRoute {
  id: string;
  category: ProjectCategorySlug;
  slug: string;
  title: string;
  description: string;
  ogImageFile: string;
  stories?: StoryRoute[];
  // Answer-first FAQs — rendered visibly and emitted as FAQPage JSON-LD by the
  // prerender step (helps answer engines quote the page and win rich results).
  faqs?: { q: string; a: string }[];
}

export const PROJECT_ROUTES: ProjectRoute[] = [
  // ── Ad Films & Documentaries ───────────────────────────────────────────────
  {
    id: "heritage-redefined",
    category: "films",
    slug: "myntra-house-of-pataudi",
    title: "Myntra x House of Pataudi | Fashion Campaign Film — Neorama Studios",
    description:
      "A premium fashion campaign film for Myntra and House of Pataudi, blending modern style with timeless Indian heritage.",
    ogImageFile: "regenerated_image_1780850373289.png",
  },
  {
    id: "dulux-simply-refresh",
    category: "films",
    slug: "dulux-simply-refresh",
    title: "Dulux Simply Refresh | Product Ad Campaign — Neorama Studios",
    description:
      "A series of product-focused advertisements for Dulux Simply Refresh, showing how homeowners can easily transform their spaces.",
    ogImageFile: "regenerated_image_1780848725172.png",
  },
  {
    id: "linen-luxury-brand",
    category: "films",
    slug: "linen-and-linens-brand-film",
    title: "Linen and Linens | Luxury Brand Film — Neorama Studios",
    description:
      "A premium brand film for Linen and Linens, communicating the brand's vision, craftsmanship and commitment to quality.",
    ogImageFile: "regenerated_image_1780852616738.png",
  },
  {
    id: "linen-fashion-campaign",
    category: "films",
    slug: "linen-and-linens-fashion-film",
    title: "Linen and Linens | Fashion Film Campaign — Neorama Studios",
    description:
      "A visually driven fashion film highlighting the elegance, texture and sophistication of the Linen and Linens collection.",
    ogImageFile: "regenerated_image_1780852625637.png",
  },
  {
    id: "villa-tesoro",
    category: "films",
    slug: "stayvista-villa-tesoro-film",
    title: "StayVista's Villa Tesoro | Luxury Stay & Lifestyle Film — Neorama Studios",
    description:
      "A luxury hospitality and lifestyle film for Villa Tesoro by StayVista, capturing elevated travel and contemporary living.",
    ogImageFile: "regenerated_image_1780853559429.jpg",
  },
  {
    id: "tata-trusts-lumpy",
    category: "films",
    slug: "tata-trusts-lumpy-skin-disease",
    title: "Tata Trusts | Lumpy Skin Disease Impact Documentary — Neorama Studios",
    description:
      "A documentary and impact film for Tata Trusts on tackling the Lumpy Skin Disease outbreak with livestock-dependent communities.",
    ogImageFile: "tata_trusts_film_1780854327377.png",
  },
  {
    id: "furever-friends-royal-canin",
    category: "films",
    slug: "furever-friends-royal-canin",
    title: "Furever Friends x Royal Canin | Street Dog Rescue Documentary Film — Neorama Studios",
    description:
      "A documentary film for the NGO Furever Friends and Royal Canin India, following founder Vikas Luthra and Sher Khan, a stray he rescued.",
    ogImageFile: "furever_friends_royal_canin.jpg",
  },
  {
    id: "linen-factory-tour",
    category: "films",
    slug: "linen-and-linens-factory-tour",
    title: "Linen and Linens | Factory Tour Film — Neorama Studios",
    description:
      "A behind-the-scenes factory tour film for Linen and Linens — an inside look at the craftsmanship, processes and people behind the brand.",
    ogImageFile: "linen_factory_tour_1780902734823.png",
  },
  {
    id: "manik-public-school",
    category: "films",
    slug: "manik-public-school",
    title: "Manik Public School | Brand & Campus Experience Film — Neorama Studios",
    description:
      "A brand and campus film for Manik Public School, capturing its commitment to academic excellence and holistic development.",
    ogImageFile: "manik_school_film_1780903814735.png",
  },
  {
    id: "rani-pink-kirthi",
    category: "films",
    slug: "rani-pink-kirthi-jewellery",
    title: "Rani Pink x Kirthi | Diamond Jewellery Advertisement — Neorama Studios",
    description:
      "A premium jewellery advertisement for Rani Pink with Kirthi Diamond Jewellery — elegance, brilliance and craftsmanship.",
    ogImageFile: "rani_pink_jewellery_1780905915920.png",
  },

  // ── Photography ─────────────────────────────────────────────────────────────
  {
    id: "linen-editorial-photography",
    category: "photography",
    slug: "linen-and-linens-photography",
    title: "Linen and Linens | Summer & Festive Photography — Neorama Studios",
    description:
      "Premium fashion and lifestyle photography for Linen and Linens across the Summer and Festive collections.",
    ogImageFile: "regenerated_image_1780844748489.jpg",
  },
  {
    id: "adidas-bhavisha-kothari",
    category: "photography",
    slug: "adidas",
    title: "Adidas | Sports & Lifestyle Photography — Neorama Studios",
    description:
      "A sports and lifestyle photography collaboration for Adidas celebrating movement, performance and determination.",
    ogImageFile: "regenerated_image_1780924734124.jpg",
  },
  {
    id: "stayvista-luxury-photography",
    category: "photography",
    slug: "stayvista-villas",
    title: "StayVista | Luxury Stay & Villa Photography — Neorama Studios",
    description:
      "A luxury villa photography portfolio for StayVista featuring five exclusive properties across India.",
    ogImageFile: "stayvista_campaign_hero.jpg",
    stories: [
      {
        slug: "azure-bliss",
        title: "Azure Bliss, Alibaug | StayVista Villa Photography — Neorama Studios",
        description:
          "Luxury villa photography of Azure Bliss on the Alibaug coastline — a coastal Mediterranean escape captured for StayVista.",
        ogImageFile: "stayvista_azure_bliss_thumb.jpg",
      },
      {
        slug: "bayleaf-villa",
        title: "Bayleaf Villa, Nashik | StayVista Villa Photography — Neorama Studios",
        description:
          "Luxury villa photography of Bayleaf Villa in the Nashik foothills — an organic wellness sanctuary captured for StayVista.",
        ogImageFile: "stayvista_bayleaf_villa_thumb.jpg",
      },
      {
        slug: "villa-tesoro",
        title: "Villa Tesoro, Lonavala | StayVista Villa Photography — Neorama Studios",
        description:
          "Luxury villa photography of Villa Tesoro in Lonavala — heritage palatial grandeur captured for StayVista.",
        ogImageFile: "stayvista_villa_tesoro_thumb.jpg",
      },
      {
        slug: "esteria-enclave",
        title: "Esteria Enclave, Nashik | StayVista Villa Photography — Neorama Studios",
        description:
          "Luxury villa photography of Esteria Enclave in Nashik — a misty valley glass chalet captured for StayVista.",
        ogImageFile: "stayvista_esteria_enclave_thumb.jpg",
      },
      {
        slug: "villa-romania",
        title: "Villa Romania, Madh Island | StayVista Villa Photography — Neorama Studios",
        description:
          "Luxury villa photography of Villa Romania on Madh Island — a seaside minimalist masterpiece captured for StayVista.",
        ogImageFile: "stayvista_villa_romania_thumb.webp",
      },
    ],
  },
  {
    id: "sanj-events-photography",
    category: "photography",
    slug: "sanj-events",
    title: "Sanj Events | Event Production Stories — Neorama Studios",
    description:
      "Visual documentation of the creativity, coordination and execution behind large-scale celebrations produced by Sanj Events.",
    ogImageFile: "sanj_events_campaign_thumb.jpg",
    stories: [
      {
        slug: "event-story-01",
        title: "Sanj Events | Event Story 01, Rishikesh — Neorama Studios",
        description:
          "Behind the scenes of an event in Rishikesh, Uttarakhand produced by Sanj Events — planning, setup, execution and final transformation.",
        ogImageFile: "sanj_events_story01_thumb.jpg",
      },
      {
        slug: "event-story-02",
        title: "Sanj Events | Event Story 02, Mumbai — Neorama Studios",
        description:
          "Behind the scenes of an event in Mumbai produced by Sanj Events — the creative process, production details and atmosphere.",
        ogImageFile: "sanj_events_story02_thumb.jpg",
      },
    ],
  },
  {
    id: "simhayana-knotted-photography",
    category: "photography",
    slug: "simhayana-knotted",
    title: "Simhayana & knotted.in | Influencer-Led Brand Photography — Neorama Studios",
    description:
      "Fashion and lifestyle photography with Mahima Kothari for Simhayana and knotted.in across two distinct brand chapters.",
    ogImageFile: "simhayana_knotted_thumb.jpg",
  },
  {
    id: "architecture-interiors-photography",
    category: "photography",
    slug: "architecture-interiors",
    title: "Architectural & Interior Photography for Architects & Designers — Neorama Studios",
    description:
      "Professional architectural and interior photography by Neorama Studios, Mumbai — helping architects and interior designers showcase their built projects. Portfolio: Aravali Parisar, Goldmine Project Consultants, PACA Office and Storey Studio.",
    ogImageFile: "arch_campaign_hero.jpg",
    faqs: [
      {
        q: "Do you offer architecture and interior photography for architects and designers?",
        a: "Yes. Neorama Studios shoots architectural and interior photography for architects, interior designers and developers across Mumbai and India — capturing built projects for portfolios, design awards, websites and marketing.",
      },
      {
        q: "What does an architecture and interior photography shoot include?",
        a: "A typical shoot covers exteriors, interior spaces, and material and detail studies, captured in the right natural and artificial light, then edited to a consistent, publication-ready standard and delivered in web and print formats.",
      },
      {
        q: "How much does architecture photography cost in Mumbai?",
        a: "Cost depends on the size of the project, the number of spaces and the shoot time required. We scope each shoot to the project — share the location and brief and we'll send a clear quote.",
      },
      {
        q: "How do I book an architecture or interior shoot?",
        a: "Tell us about your project through the contact form on neoramastudios.com or send a DM on Instagram (@neoramastudios), and we'll come back with availability, an approach and a quote.",
      },
    ],
    stories: [
      {
        slug: "aravali-parisar",
        title: "Aravali Parisar — Architectural & Interior Photography | Neorama Studios",
        description:
          "Architectural and interior photography of Aravali Parisar, designed by Locus Design Works, captured by Neorama Studios, Mumbai — professional project photography for architects and interior designers.",
        ogImageFile: "arch_aravali_thumb.jpg",
        imagePrefix: "arch_aravali",
      },
      {
        slug: "goldmine-consultants",
        title: "Goldmine Project Consultants — Interior & Architectural Photography | Neorama Studios",
        description:
          "Interior and architectural photography of the Goldmine Project Consultants workspace by Neorama Studios, Mumbai — professional project photography for architects and interior designers.",
        ogImageFile: "arch_goldmine_thumb.jpg",
        imagePrefix: "arch_goldmine",
      },
      {
        slug: "paca-office",
        title: "PACA Office — Interior & Architectural Photography | Neorama Studios",
        description:
          "Interior and architectural photography of PACA Office, designed by Locus Design Works, captured by Neorama Studios, Mumbai — professional workspace and project photography for architects and interior designers.",
        ogImageFile: "arch_paca_thumb.jpg",
        imagePrefix: "arch_paca",
      },
      {
        slug: "storey-studio",
        title: "Storey Studio — Interior & Architectural Photography | Neorama Studios",
        description:
          "Interior and architectural photography of Storey Studio by Neorama Studios, Mumbai — professional project photography for architects and interior designers.",
        ogImageFile: "arch_storey_thumb.jpg",
        imagePrefix: "arch_storey",
      },
    ],
  },

  {
    id: "food-beverage-photography",
    category: "photography",
    slug: "food-beverage",
    title: "Food & Beverage Photography for Restaurants, Cafés, Bars & Food Brands — Neorama Studios",
    description:
      "Professional food and beverage photography by Neorama Studios, Mumbai — menu, product and social shoots for restaurants, cafés, bars and pubs, bakeries, patisseries and dessert shops, and packaged food & beverage brands. Portfolio: Boom Burger, Costa Coffee, French Affair, Irish House, Mad Over Donuts, Mushmerry, Pizza Express, Raw Pressery and Sakheti.",
    ogImageFile: "fb_campaign_hero.jpg",
    faqs: [
      {
        q: "Do you photograph food for restaurants, cafés and cloud kitchens?",
        a: "Yes. Neorama Studios shoots food and beverage photography for restaurants, cafés, bars and pubs, bakeries, dessert shops and packaged food & beverage brands across Mumbai — for menus, delivery platforms, e-commerce and social media.",
      },
      {
        q: "What's included in a food photography shoot?",
        a: "Menu and hero dishes, drinks, packaging and lifestyle frames — styled and lit in-studio or on location, then edited to a consistent, appetite-led standard in the crops each platform needs.",
      },
      {
        q: "How much does food photography cost in Mumbai?",
        a: "It depends on the number of dishes, studio versus on-location, and the level of styling. A focused single-day shoot can cover a full menu section plus social content. Share your menu and we'll send a quote.",
      },
      {
        q: "Do you shoot for delivery apps like Zomato and Swiggy?",
        a: "Yes — we deliver images in the formats and crops delivery platforms require, alongside cuts for your own menu, website and social channels.",
      },
    ],
    stories: [
      {
        slug: "boom-burger",
        title: "Boom Burger — Food & Brand Photography | Neorama Studios",
        description:
          "Menu, packaging and lifestyle photography for Boom Burger by Neorama Studios, Mumbai — restaurant, burger-joint and cloud-kitchen food photography built for delivery platforms, social and in-store.",
        ogImageFile: "fb_boomburger_thumb.jpg",
        imagePrefix: "fb_boomburger",
      },
      {
        slug: "costa-coffee",
        title: "Costa Coffee — Food & Beverage Photography | Neorama Studios",
        description:
          "Coffee, beverage and café-food photography for Costa Coffee by Neorama Studios, Mumbai — for cafés and coffee shops, shot for menus, promotions and social.",
        ogImageFile: "fb_costa_thumb.jpg",
        imagePrefix: "fb_costa",
      },
      {
        slug: "french-affair",
        title: "French Affair — Patisserie & Dessert Photography | Neorama Studios",
        description:
          "Dark, editorial patisserie and dessert photography for French Affair (TFA) by Neorama Studios, Mumbai — for bakeries, patisseries and dessert shops; cheesecakes, choux, tarts and mirror-glaze cakes for menus and social.",
        ogImageFile: "fb_frenchaffair_thumb.jpg",
        imagePrefix: "fb_frenchaffair",
      },
      {
        slug: "irish-house",
        title: "Irish House — Gastropub & Bar Photography | Neorama Studios",
        description:
          "Food, drinks and bar photography for Irish House by Neorama Studios, Mumbai — for bars, pubs and gastropubs; menu, cocktail and delivery imagery for social.",
        ogImageFile: "fb_irishhouse_thumb.jpg",
        imagePrefix: "fb_irishhouse",
      },
      {
        slug: "mod",
        title: "Mad Over Donuts (MOD) — Donut Photography | Neorama Studios",
        description:
          "Playful donut photography for Mad Over Donuts (MOD) by Neorama Studios, Mumbai — for dessert shops and donut brands; colour-pop, levitation and festive frames for delivery apps, social and menus.",
        ogImageFile: "fb_mod_thumb.jpg",
        imagePrefix: "fb_mod",
      },
      {
        slug: "mushmerry",
        title: "Mushmerry — Chocolate & Gifting Photography | Neorama Studios",
        description:
          "Chocolate, packaging and corporate-gifting photography for Mushmerry by Neorama Studios, Mumbai — for chocolate brands, bakeries and gifting businesses; artisan bonbons, bars and custom gift boxes for e-commerce and social.",
        ogImageFile: "fb_mushmerry_thumb.jpg",
        imagePrefix: "fb_mushmerry",
      },
      {
        slug: "pizza-express",
        title: "Pizza Express — Pizzeria & Italian Photography | Neorama Studios",
        description:
          "Pizza and Italian-kitchen photography for Pizza Express by Neorama Studios, Mumbai — for restaurants and pizzerias, shot for menus, delivery platforms and social.",
        ogImageFile: "fb_pizzaexpress_thumb.jpg",
        imagePrefix: "fb_pizzaexpress",
      },
      {
        slug: "raw-pressery",
        title: "Raw Pressery — Cold-Pressed Juice & Beverage Photography | Neorama Studios",
        description:
          "Cold-pressed juice and beverage photography for Raw Pressery by Neorama Studios, Mumbai — for packaged food and beverage brands; coconut water, juices, iced teas and more across product, pour and lifestyle frames for e-commerce and social.",
        ogImageFile: "fb_rawpressery_thumb.jpg",
        imagePrefix: "fb_rawpressery",
      },
      {
        slug: "sakheti",
        title: "Sakheti Premium Atta — Product & Packaging Photography | Neorama Studios",
        description:
          "Product and packaging photography for Sakheti Premium Atta by Neorama Studios, Mumbai — for packaged food brands and FMCG; warm, rustic wheat-flour imagery for e-commerce, retail and brand marketing.",
        ogImageFile: "fb_sakheti_thumb.jpg",
        imagePrefix: "fb_sakheti",
      },
    ],
  },
  {
    id: "monarque-gold-diamond",
    category: "photography",
    slug: "monarque-gold-diamond",
    title: "Monarque Gold & Diamond | Jewellery Photography & Films — Neorama Studios",
    description:
      "A jewellery campaign for Monarque Gold & Diamond — editorial photography and social media films showcasing fine gold and diamond pieces.",
    ogImageFile: "monarque_hero.jpg",
  },

  // ── Branding & Design ─────────────────────────────────────────────────────
  {
    id: "tatva-veda-branding",
    category: "branding",
    slug: "tatva-ved",
    title: "Tatva Ved | Brand Identity & Visual Design System — Neorama Studios",
    description:
      "A complete visual identity system for Tatva Ved — brand mark, custom artwork and packaging rooted in natural heritage.",
    ogImageFile: "tatva_ved_thumbnail.jpg",
  },
  {
    id: "mwb-packaging-design",
    category: "branding",
    slug: "mwb-packaging",
    title: "MW&B | Packaging Design Collection — Neorama Studios",
    description:
      "A packaging design collection for MW&B with bold visual storytelling, vibrant illustration systems and shelf-impact design.",
    ogImageFile: "mwb_thumbnail.png",
  },
  {
    id: "khan-saheb-ai",
    category: "ai-production",
    slug: "khan-saheb",
    title: "Khan Saheb | AI-Produced Luxury Menswear Brand — Neorama Studios",
    description:
      "Khan Saheb — a complete luxury menswear brand produced end-to-end with AI by Neorama Studios: brand identity, generative editorial photography and a full digital-flagship e-commerce design.",
    ogImageFile: "ks_thumbnail.jpg",
    faqs: [
      {
        q: "What is Khan Saheb?",
        a: "Khan Saheb is a concept luxury menswear brand created by Neorama Studios and produced entirely with AI — from brand identity and editorial photography to a complete digital-flagship e-commerce design. It demonstrates how a full brand world can be built with an AI-native production pipeline.",
      },
      {
        q: "Do you offer AI production for content, design and development?",
        a: "Yes. Neorama Studios produces AI-native content (brand, editorial and product photography), UX/UI design (websites, e-commerce and product experiences) and AI-assisted development that turns those designs into production-ready builds.",
      },
      {
        q: "Was any of the Khan Saheb imagery a traditional photo shoot?",
        a: "No. Every image was generated and art-directed with AI — no traditional photo shoot or stock imagery was used. This lets brands explore a complete visual identity quickly and affordably before committing to production.",
      },
      {
        q: "Can you produce a full brand and website with AI for my business?",
        a: "Yes. We build complete brand worlds with AI — identity, photography, a full design system and a launch-ready website. Share your brief through the contact form on neoramastudios.com or DM us on Instagram (@neoramastudios) and we'll come back with an approach and a quote.",
      },
    ],
    stories: [
      {
        slug: "editorial-photography",
        title: "Khan Saheb — AI Editorial & Product Photography | Neorama Studios",
        description:
          "AI-generated editorial and product photography for Khan Saheb by Neorama Studios — wedding, business and bespoke menswear imagery produced entirely with generative AI.",
        ogImageFile: "ks_editorial.jpg",
        imagePrefix: "ks_content",
      },
      {
        slug: "digital-flagship",
        title: "Khan Saheb — Digital Flagship UX / UI & Web Design | Neorama Studios",
        description:
          "A complete UX/UI and web design system for the Khan Saheb digital flagship by Neorama Studios — home, collections, bespoke journey, configurator, checkout and client dashboard.",
        ogImageFile: "ks_flagship.jpg",
        imagePrefix: "ks_design",
      },
    ],
  },
  {
    id: "golden-mirror-ai",
    category: "ai-production",
    slug: "golden-mirror",
    title: "Golden Mirror | AI-Produced Luxury Fashion Brand — Neorama Studios",
    description:
      "Golden Mirror — a luxury fashion brand produced end-to-end with AI by Neorama Studios: a launch campaign film and a full editorial set for an indigo & rust floral-jacquard co-ord.",
    ogImageFile: "gm_thumbnail.jpg",
    faqs: [
      {
        q: "What is Golden Mirror?",
        a: "Golden Mirror is a luxury fashion brand created by Neorama Studios and produced entirely with AI. Its launch campaign pairs a 20-second vertical film with a full editorial photography set for an indigo and rust floral-jacquard co-ord, shot against palace-courtyard and coastal locations.",
      },
      {
        q: "Do you produce AI fashion films and campaigns?",
        a: "Yes. Neorama Studios produces AI-native fashion campaigns — generative editorial and product photography plus AI-produced campaign films — holding a consistent model, garment and print across every frame, without a traditional shoot.",
      },
      {
        q: "Was Golden Mirror shot with a real model and garment?",
        a: "No. The model, garment, locations, editorial frames and campaign film were all generated and art-directed with AI. This lets brands explore a complete campaign look quickly and affordably before committing to production.",
      },
      {
        q: "Can you produce an AI fashion campaign for my brand?",
        a: "Yes. We produce complete campaigns with AI — editorial photography and a launch-ready fashion film. Share your brief through the contact form on neoramastudios.com or DM us on Instagram (@neoramastudios) and we'll come back with an approach and a quote.",
      },
    ],
  },
];

// ── Category landing pages (the portfolio filter "sections") ────────────────
export interface CategoryRoute {
  slug: ProjectCategorySlug;
  filter: Exclude<PortfolioFilter, "all">;
  title: string;
  description: string;
}

export const CATEGORY_ROUTES: CategoryRoute[] = [
  {
    slug: "films",
    filter: "cinematography",
    title: "Ads & Corporate Films — Portfolio | Neorama Studios",
    description:
      "Brand films, ad campaigns and documentaries produced by Neorama Studios, a Mumbai-based creative agency.",
  },
  {
    slug: "photography",
    filter: "photography",
    title: "Photography — Portfolio | Neorama Studios",
    description:
      "Fashion, product, lifestyle, sports and luxury stay photography by Neorama Studios, Mumbai.",
  },
  {
    slug: "social-media",
    filter: "campaign",
    title: "Social Media & Marketing — Portfolio | Neorama Studios",
    description:
      "Short-form social media reels and marketing content produced by Neorama Studios for brands across fashion, food, lifestyle, hospitality and events.",
  },
  {
    slug: "branding",
    filter: "brand",
    title: "Branding & Design — Portfolio | Neorama Studios",
    description:
      "Brand identity, packaging and visual design systems by Neorama Studios, Mumbai.",
  },
  {
    slug: "ai-production",
    filter: "ai",
    title: "AI Production — Content, Design & Development | Neorama Studios",
    description:
      "AI-native production by Neorama Studios, Mumbai — generative brand and product photography, UX/UI design and AI-assisted development, shown through the Khan Saheb concept brand.",
  },
];

// ── Reel sub-category slugs (the gallery's pills inside Social Media) ────────
export const REEL_CATEGORY_SLUGS: Record<SocialReelCategory, string> = {
  Fashion: "fashion",
  Lifestyle: "lifestyle",
  "Food & Beverage": "food-beverage",
  Events: "events",
  Hospitality: "hospitality",
};

// Ordered list (mirrors the pill order) for prerendering + iteration.
export const REEL_CATEGORIES: { category: SocialReelCategory; slug: string }[] =
  CATEGORY_ORDER.map((category) => ({ category, slug: REEL_CATEGORY_SLUGS[category] }));

const BY_ID = new Map(PROJECT_ROUTES.map((r) => [r.id, r]));
const CATEGORY_BY_SLUG = new Map(CATEGORY_ROUTES.map((c) => [c.slug, c]));
const CATEGORY_BY_FILTER = new Map(CATEGORY_ROUTES.map((c) => [c.filter, c]));
const REEL_IDS = new Set(SOCIAL_REELS.map((r) => r.id));
const REEL_CATEGORY_BY_SLUG = new Map(
  (Object.entries(REEL_CATEGORY_SLUGS) as [SocialReelCategory, string][]).map(
    ([cat, slug]) => [slug, cat]
  )
);

/** Slug for a reel sub-category, e.g. "Food & Beverage" → "food-beverage". */
export function reelCategorySlug(cat: SocialReelCategory): string {
  return REEL_CATEGORY_SLUGS[cat];
}

/** Path for a reel sub-category, e.g. "/projects/social-media/fashion". */
export function reelCategoryPath(cat: SocialReelCategory): string {
  return `/projects/social-media/${REEL_CATEGORY_SLUGS[cat]}`;
}

/** Path for a project, e.g. "/projects/photography/sanj-events". */
export function projectPath(id: string): string | null {
  const r = BY_ID.get(id);
  return r ? `/projects/${r.category}/${r.slug}` : null;
}

/** Path for a story inside a project, or null if the project has no such story. */
export function storyPath(id: string, storySlug: string): string | null {
  const base = projectPath(id);
  return base ? `${base}/${storySlug}` : null;
}

/** Path for a portfolio filter section, e.g. "/projects/photography" ("all" → "/projects"). */
export function categoryPath(filter: PortfolioFilter): string {
  if (filter === "all") return "/projects";
  const c = CATEGORY_BY_FILTER.get(filter);
  return c ? `/projects/${c.slug}` : "/projects";
}

/** Path for an individual social reel, e.g. "/projects/social-media/azul-social". */
export function reelPath(reelId: string): string {
  return `/projects/social-media/${reelId}`;
}

export type RouteMatch =
  | { kind: "project"; id: string; storySlug?: string }
  | { kind: "reel"; reelId: string }
  | { kind: "reelCategory"; reelCategory: SocialReelCategory }
  | { kind: "category"; filter: PortfolioFilter }
  | null;

/**
 * Resolve any /projects URL to what it should render:
 *   /projects                              → category (filter "all")
 *   /projects/<category>                   → category section
 *   /projects/social-media/<reel-id>       → an individual reel
 *   /projects/<category>/<project-slug>    → a project
 *   /projects/<category>/<slug>/<story>    → a story inside a project
 * Unknown slugs under a valid category fall back to that category section.
 * Returns null for anything that is not a /projects route.
 */
export function parseRoute(pathname: string): RouteMatch {
  const segs = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segs[0] !== "projects") return null;
  if (segs.length === 1) return { kind: "category", filter: "all" };

  // "campaigns" is the legacy slug for the social-media section; keep old
  // /projects/campaigns/... links working by aliasing it to the new slug.
  const catSeg = segs[1] === "campaigns" ? "social-media" : segs[1];
  const cat = CATEGORY_BY_SLUG.get(catSeg as ProjectCategorySlug);
  if (!cat) return null;
  if (segs.length === 2) return { kind: "category", filter: cat.filter };

  const slug = segs[2];
  const storySlug = segs[3];

  if (cat.slug === "social-media") {
    if (REEL_IDS.has(slug)) return { kind: "reel", reelId: slug };
    const reelCat = REEL_CATEGORY_BY_SLUG.get(slug);
    if (reelCat) return { kind: "reelCategory", reelCategory: reelCat };
    return { kind: "category", filter: cat.filter };
  }

  const proj = PROJECT_ROUTES.find((x) => x.category === cat.slug && x.slug === slug);
  if (proj) {
    if (storySlug && proj.stories?.some((s) => s.slug === storySlug)) {
      return { kind: "project", id: proj.id, storySlug };
    }
    return { kind: "project", id: proj.id };
  }

  return { kind: "category", filter: cat.filter };
}
