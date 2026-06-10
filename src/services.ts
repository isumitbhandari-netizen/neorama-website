// Service landing pages — dedicated, SEO-focused pages for each core service + location.
// Rendered to static HTML at build time (see prerender.tsx), mirroring the blog pipeline.
// Reuses ArticleBlock so the page body renders with the exact same design tokens.

import type { ArticleBlock } from "./blogArticles";

export interface ServicePage {
  /** URL path, top-level (e.g. "brand-films-mumbai" -> /brand-films-mumbai/). */
  slug: string;
  /** Short eyebrow label shown above the H1 (e.g. "Brand Films · Mumbai"). */
  eyebrow: string;
  /** Page H1. */
  h1: string;
  /** One-line standfirst under the H1. */
  standfirst: string;
  /** <title> tag. */
  metaTitle: string;
  /** Meta description. */
  metaDescription: string;
  /** Schema.org serviceType for the Service JSON-LD. */
  serviceType: string;
  keywords: string[];
  /** Hero image (absolute path under /public). Replace placeholders with real stills. */
  imageUrl: string;
  blocks: ArticleBlock[];
}

export const SERVICE_PAGES: Record<string, ServicePage> = {
  "brand-films-mumbai": {
    slug: "brand-films-mumbai",
    eyebrow: "Brand Films · Mumbai",
    h1: "Brand Film Production in Mumbai",
    standfirst:
      "Neorama Studios is a Mumbai-based creative agency producing brand films that turn attention into recognition — built for startups and small to medium-sized brands.",
    metaTitle: "Brand Film Production Agency in Mumbai | Neorama Studios",
    metaDescription:
      "Neorama Studios is a Mumbai-based brand film production agency creating brand story films, founder films, and product films for startups and growing brands. Get a quote.",
    serviceType: "Brand Film Production",
    keywords: [
      "brand film agency mumbai",
      "brand film production mumbai",
      "brand video production mumbai",
      "corporate film makers mumbai",
      "video production company mumbai",
    ],
    imageUrl: "/og-image.jpg",
    blocks: [
      {
        type: "p",
        text: "A brand film is the fastest way for an audience to understand who you are and why you matter. In a market as crowded as Mumbai's, a well-made film does what a logo and a tagline cannot: it gives your brand a voice, a tone, and a feeling people remember. At Neorama Studios, we produce brand films for startups and growing companies that need to look established, trusted, and distinct from day one.",
      },
      {
        type: "p",
        text: "We are a Mumbai-based creative agency, which means we shoot across the city and the wider MMR region without the overheads of flying in a crew. From Andheri to Bandra to BKC, we know the locations, the talent, and the production partners — so your budget goes into what ends up on screen, not logistics.",
      },
      { type: "h2", text: "Brand Films We Produce" },
      {
        type: "ul",
        items: [
          "Brand story films — the anchor film that explains your purpose, product, and point of view in 60–120 seconds.",
          "Founder & origin films — putting a human face to a young brand to build trust with customers and investors.",
          "Product films — showing how a product looks, works, and feels, made for landing pages and paid ads.",
          "Social-first brand cuts — vertical, sound-on edits engineered for Instagram Reels and YouTube Shorts.",
          "Campaign & launch films — a hero film plus a kit of derivative cuts for a coordinated rollout.",
        ],
      },
      { type: "h2", text: "How We Work" },
      {
        type: "p",
        text: "Every project starts with the brief, not the camera. We begin by understanding your audience, your competitors, and the single idea the film has to land. From there we move into scripting and a visual treatment, then production, and finally edit, sound, colour, and delivery in every format you need. You see the plan before we shoot and you sign off at each stage, so there are no surprises in the final cut.",
      },
      {
        type: "p",
        text: "Because we work with startups and small to medium-sized brands, we scope each film to a real budget. A focused single-day shoot can produce a sharp brand film plus a set of social cuts — enough to launch a campaign without enterprise-level spend.",
      },
      { type: "h2", text: "Why Mumbai Brands Choose Neorama" },
      {
        type: "p",
        text: "We are a full-spectrum studio: film, photography, social content, branding, and design all under one roof. That means your brand film is not a one-off — it can share a visual language with your photography, your social media, and your identity. The result is a brand that reads as one coherent voice everywhere a customer finds you. If you are looking for a brand film production agency in Mumbai that thinks about the whole brand, not just the shoot, that is exactly how we work.",
      },
      {
        type: "cta",
        text: "Planning a brand film in Mumbai? Tell us about your brand and we'll come back with an approach and a quote.",
        label: "Start a project",
      },
    ],
  },

  "corporate-video-production-mumbai": {
    slug: "corporate-video-production-mumbai",
    eyebrow: "Corporate Video Production · Mumbai",
    h1: "Corporate Video Production in Mumbai",
    standfirst:
      "Neorama Studios is a Mumbai-based creative agency producing corporate videos that explain, train, and persuade — clear, professional, and on-brand for startups and growing companies.",
    metaTitle: "Corporate Video Production Company in Mumbai | Neorama Studios",
    metaDescription:
      "Neorama Studios is a Mumbai-based corporate video production company making company profiles, explainer videos, testimonials, and event films for startups and growing brands.",
    serviceType: "Corporate Video Production",
    keywords: [
      "corporate video production mumbai",
      "corporate video company mumbai",
      "company profile video mumbai",
      "explainer video production mumbai",
      "corporate film makers mumbai",
    ],
    imageUrl: "/og-image.jpg",
    blocks: [
      {
        type: "p",
        text: "A corporate video is how a company explains itself when there isn't time for a long meeting. Whether you are introducing your business to a new client, onboarding a team, or presenting to investors, a clear, well-produced video does the work of a dozen slides — and leaves a far stronger impression. At Neorama Studios, we produce corporate videos for startups and growing companies that need to look credible, organised, and easy to understand.",
      },
      {
        type: "p",
        text: "We are a Mumbai-based production company, so we shoot across offices, factories, and event venues throughout the city and the wider MMR region without travel overheads. From your Andheri or BKC office to an on-site shoot, we handle crew, lighting, sound, and direction — so the final video looks professional, not like a phone recording.",
      },
      { type: "h2", text: "Corporate Videos We Produce" },
      {
        type: "ul",
        items: [
          "Company profile videos — a polished overview of who you are, what you do, and why clients should trust you.",
          "Explainer videos — breaking down a product, service, or process into something anyone can understand in under two minutes.",
          "Customer & employee testimonials — real voices that build credibility with prospects and recruits.",
          "Training & internal communication videos — consistent, repeatable content for onboarding and process documentation.",
          "Event & conference films — coverage and highlight reels from launches, summits, and corporate functions.",
        ],
      },
      { type: "h2", text: "How We Work" },
      {
        type: "p",
        text: "Every project starts with a clear objective: who is watching this video, and what should they think or do afterwards. From there we move into scripting and a shot plan, then a professionally managed shoot, and finally edit, motion graphics, sound, and delivery in every format you need — from boardroom screens to LinkedIn. You approve the plan before we shoot and sign off at each stage, so the final video is exactly what you expected.",
      },
      {
        type: "p",
        text: "Because we work with startups and small to medium-sized companies, we scope each project to a realistic budget. A focused shoot can deliver a company profile plus a set of short cuts for social and sales use — professional production without enterprise-level cost.",
      },
      { type: "h2", text: "Why Mumbai Companies Choose Neorama" },
      {
        type: "p",
        text: "We are a full-spectrum studio: film, photography, social content, branding, and design all under one roof. That means your corporate video shares a consistent visual language with the rest of your communication — your website, your decks, your social media. The result is a company that looks coherent and considered everywhere people encounter it. If you are looking for a corporate video production company in Mumbai that understands branding as well as cameras, that is exactly how we work.",
      },
      {
        type: "cta",
        text: "Need a corporate video in Mumbai? Tell us your goal and audience, and we'll come back with an approach and a quote.",
        label: "Start a project",
      },
    ],
  },
};

export const SERVICE_PAGE_LIST: ServicePage[] = Object.values(SERVICE_PAGES);
