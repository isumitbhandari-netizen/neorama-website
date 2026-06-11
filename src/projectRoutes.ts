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

export type ProjectCategorySlug = "films" | "photography" | "campaigns" | "branding";

export interface StoryRoute {
  slug: string;
  title: string; // share-card / <title>
  description: string; // share-card / meta description
  ogImageFile: string; // filename under src/assets/images
}

export interface ProjectRoute {
  id: string;
  category: ProjectCategorySlug;
  slug: string;
  title: string;
  description: string;
  ogImageFile: string;
  stories?: StoryRoute[];
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
    id: "raw-pressery-commercial",
    category: "photography",
    slug: "raw-pressery",
    title: "Raw Pressery | Commercial Photography — Neorama Studios",
    description:
      "Commercial photography for Raw Pressery showcasing the brand's vibrant identity, premium products and refreshing lifestyle appeal.",
    ogImageFile: "regenerated_image_1780922541314.webp",
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
];

const BY_ID = new Map(PROJECT_ROUTES.map((r) => [r.id, r]));

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

/**
 * Parse a pathname into the project (and optional story) it refers to.
 * Returns null for any path that is not a known project route. An unknown
 * story slug under a known project falls back to the project itself.
 */
export function parseProjectPath(
  pathname: string
): { id: string; storySlug?: string } | null {
  const clean = pathname.replace(/\/+$/, "");
  const m = clean.match(/^\/projects\/([^/]+)\/([^/]+)(?:\/([^/]+))?$/);
  if (!m) return null;
  const [, category, slug, storySlug] = m;
  const r = PROJECT_ROUTES.find((x) => x.category === category && x.slug === slug);
  if (!r) return null;
  if (storySlug && r.stories?.some((s) => s.slug === storySlug)) {
    return { id: r.id, storySlug };
  }
  return { id: r.id };
}
