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
  /** Descriptive alt text for the hero image (accessibility + image SEO). */
  imageAlt: string;
  blocks: ArticleBlock[];
  /** FAQ entries — rendered visibly on the page and as FAQPage JSON-LD. */
  faqs: { q: string; a: string }[];
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
      "brand film production company mumbai",
      "brand film agency mumbai",
      "brand video production mumbai",
      "video production agency for d2c brands india",
      "brand film maker mumbai",
    ],
    imageUrl: "/images/services/brand-film-production-mumbai.png",
    imageAlt: "Neorama Studios brand film production on a shoot in Mumbai",
    blocks: [
      {
        type: "p",
        text: "A brand film is the fastest way for an audience to understand who you are and why you matter. In a market as crowded as Mumbai's, a well-made film does what a logo and a tagline cannot: it gives your brand a voice, a tone, and a feeling people remember. As a brand film production company in Mumbai, Neorama Studios makes brand films for startups, growing companies, and D2C brands that need to look established, trusted, and distinct from day one.",
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
    faqs: [
      {
        q: "How much does a brand film cost in India?",
        a: "The cost of a brand film in India depends on scope — crew size, shoot days, locations, talent, and the level of post-production. A focused single-day shoot is the most budget-friendly starting point and can still deliver a polished brand film plus a set of social cuts. Because we work with startups and growing brands, we scope each project to a real budget. Share your brief and we'll come back with a clear, itemised quote.",
      },
      {
        q: "How long does it take to produce a brand film?",
        a: "Most brand films take two to four weeks end to end — roughly a week for scripting and treatment, the shoot itself, then one to two weeks for edit, sound, colour, and delivery. Tighter timelines are possible for simpler films; we'll confirm a schedule before we start.",
      },
      {
        q: "Do you work with startups and small brands?",
        a: "Yes — startups and small to medium-sized brands are who we are built for. We scope films to where you are, so you get production quality that competes with much larger players without an enterprise budget.",
      },
      {
        q: "Do you make brand films for D2C brands?",
        a: "Absolutely. We produce brand films and product films for D2C brands across India, engineered for landing pages, paid ads, and social — the places D2C brands actually convert customers.",
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
    imageUrl: "/images/services/corporate-video-production-mumbai.png",
    imageAlt: "Corporate video production by Neorama Studios in Mumbai",
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
    faqs: [
      {
        q: "How much does corporate video production cost in Mumbai?",
        a: "Corporate video cost in Mumbai depends on the type of video, shoot days, locations, and post-production like motion graphics. A company profile shot in a single day is the most cost-effective starting point and can also yield short cuts for social and sales. We scope each project to a realistic budget — send your brief for an exact quote.",
      },
      {
        q: "What types of corporate videos do you produce?",
        a: "Company profile videos, explainer videos, customer and employee testimonials, training and internal communication videos, and event or conference films. If you're not sure which format fits your goal, tell us the audience and we'll recommend one.",
      },
      {
        q: "Do you shoot at our office or on location?",
        a: "Yes — we shoot at offices, factories, and event venues across Mumbai and the wider MMR region. We bring the crew, lighting, and sound so the result looks professional, wherever we film.",
      },
      {
        q: "How long does a corporate video take?",
        a: "Most corporate videos take two to three weeks from brief to final delivery, depending on scripting, shoot scale, and the amount of motion graphics involved.",
      },
    ],
  },

  "social-media-content-agency-mumbai": {
    slug: "social-media-content-agency-mumbai",
    eyebrow: "Social Media & Influencer Content · Mumbai",
    h1: "Social Media & Influencer Content in Mumbai",
    standfirst:
      "Neorama Studios is a Mumbai-based creative agency producing scroll-stopping social media and influencer content — Reels, shorts, and campaigns built for startups and growing brands.",
    metaTitle: "Social Media & Influencer Content Agency in Mumbai | Neorama Studios",
    metaDescription:
      "Neorama Studios is a Mumbai-based social media content agency creating Reels, short-form video, and influencer campaigns for startups and growing brands. Get a quote.",
    serviceType: "Social Media Content Production",
    keywords: [
      "social media content agency mumbai",
      "social media agency mumbai",
      "influencer marketing agency mumbai",
      "instagram reels agency mumbai",
      "ugc content creators mumbai",
    ],
    imageUrl: "/images/services/social-media-content-mumbai.png",
    imageAlt: "Social media and influencer content created by Neorama Studios in Mumbai",
    blocks: [
      {
        type: "p",
        text: "Social media is where most people meet a brand for the first time, and the first second decides everything. Content that earns attention in that window builds a following; content that doesn't gets scrolled past before it begins. At Neorama Studios, we produce social media and influencer content for startups and growing brands that need to show up consistently, look professional, and actually grow — not just post for the sake of posting.",
      },
      {
        type: "p",
        text: "We are a Mumbai-based creative agency, so we shoot across the city and tap into a local network of creators and influencers without travel overheads. Whether you need a steady stream of in-house content or a coordinated influencer campaign, we handle concept, production, and edit so your feed stays active and on-brand.",
      },
      { type: "h2", text: "Social & Influencer Content We Produce" },
      {
        type: "ul",
        items: [
          "Instagram Reels & YouTube Shorts — vertical, sound-on, hook-led edits made for how people actually watch.",
          "Monthly content packages — a consistent supply of photos and videos shot in focused sessions, ready to schedule.",
          "Influencer & creator campaigns — matching your brand with the right creators in Mumbai and managing the collaboration end to end.",
          "UGC-style content — authentic, creator-led videos built for paid ads and organic feeds.",
          "Platform-native cuts — one shoot, repurposed into formats tuned for Instagram, YouTube, and LinkedIn.",
        ],
      },
      { type: "h2", text: "How We Work" },
      {
        type: "p",
        text: "We start with your audience and your goal — awareness, followers, leads, or sales — because that decides the format and the hook. From there we plan a content calendar, shoot efficiently in batches, and edit for each platform. For influencer campaigns, we identify creators whose audience matches yours, brief them properly, and keep the content aligned with your brand. You approve the plan up front, so nothing goes live that doesn't fit.",
      },
      {
        type: "p",
        text: "Because we work with startups and small to medium-sized brands, we scope content to a real budget. A single shoot day can produce weeks of social posts plus a few hero Reels — enough to keep your channels active without a full in-house team.",
      },
      { type: "h2", text: "Why Mumbai Brands Choose Neorama" },
      {
        type: "p",
        text: "We are a full-spectrum studio: film, photography, social content, branding, and design all under one roof. That means your social media doesn't look disconnected from the rest of your brand — every Reel, post, and influencer collaboration pulls from the same visual language as your films, photography, and identity. The result is a brand that reads as one coherent voice wherever someone discovers you. If you are looking for a social media content agency in Mumbai that thinks about the whole brand, that is exactly how we work.",
      },
      {
        type: "cta",
        text: "Want social or influencer content that actually grows your brand? Tell us your goals and we'll come back with an approach and a quote.",
        label: "Start a project",
      },
    ],
    faqs: [
      {
        q: "How much does a social media content package cost in Mumbai?",
        a: "It depends on how much content you need each month and whether it includes video, photography, or influencer collaborations. The most cost-effective approach is batching — shooting weeks of content in a single focused session. We scope packages to your budget, so tell us your goals and we'll come back with options and a quote.",
      },
      {
        q: "How many Reels can you produce in one shoot?",
        a: "A single, well-planned shoot day can produce several hero Reels plus weeks of supporting posts and photos. The exact number depends on the concepts, locations, and changes involved — we plan the shot list up front so you know what you're getting.",
      },
      {
        q: "Do you manage influencer and creator collaborations?",
        a: "Yes — we identify creators in Mumbai whose audience matches yours, brief them properly, and manage the collaboration end to end so the content stays aligned with your brand.",
      },
      {
        q: "Which platforms do you create content for?",
        a: "Primarily Instagram Reels and YouTube Shorts, plus platform-native cuts for LinkedIn and other channels. One shoot is repurposed into formats tuned for each platform.",
      },
    ],
  },

  "commercial-photography-mumbai": {
    slug: "commercial-photography-mumbai",
    eyebrow: "Commercial Photography · Mumbai",
    h1: "Commercial Photography in Mumbai",
    standfirst:
      "Neorama Studios is a Mumbai-based creative agency producing commercial photography that makes products and brands look their best — for startups and growing companies.",
    metaTitle: "Commercial Photography Studio in Mumbai | Neorama Studios",
    metaDescription:
      "Neorama Studios is a Mumbai-based commercial photography studio shooting product, fashion, food, and brand photography for startups and growing brands. Get a quote.",
    serviceType: "Commercial Photography",
    keywords: [
      "commercial photographer mumbai",
      "product photographer mumbai",
      "commercial photography mumbai",
      "fashion photography mumbai",
      "ecommerce product photography mumbai",
    ],
    imageUrl: "/images/services/commercial-photography-mumbai.jpg",
    imageAlt: "Commercial product photography by Neorama Studios in Mumbai",
    blocks: [
      {
        type: "p",
        text: "Photography is the first thing a customer judges a brand on. A product shot on a website, a dish on a menu, a model in a campaign — these images decide whether someone trusts you enough to buy. As a commercial photographer in Mumbai, Neorama Studios produces photography for startups and growing brands that need images good enough to compete with much larger players, without a much larger budget.",
      },
      {
        type: "p",
        text: "We are a Mumbai-based creative agency, so we shoot on location across the city or in a controlled studio setup, whichever your product needs. From styling and lighting to direction and retouching, we manage the whole shoot so the final images are clean, consistent, and ready to publish everywhere.",
      },
      { type: "h2", text: "Commercial Photography We Produce" },
      {
        type: "ul",
        items: [
          "Product photography — clean, consistent shots for your website, marketplace listings, and ads.",
          "Fashion & apparel photography — editorial and catalogue imagery that gives your label a point of view.",
          "Food & beverage photography — appetising images for menus, packaging, delivery platforms, and social.",
          "Brand & lifestyle photography — people-led imagery that shows your product in real context.",
          "Campaign photography — a coordinated set of hero and supporting images for a launch or season.",
        ],
      },
      { type: "h2", text: "How We Work" },
      {
        type: "p",
        text: "Every shoot starts with the end use in mind — where the images will appear and what they need to do. We plan a shot list, handle styling and setup, and direct the session so we capture everything you need in the time booked. After the shoot, we edit and retouch to a consistent standard and deliver in the formats and crops you'll actually use. You see the direction before we shoot, so the results are predictable.",
      },
      {
        type: "p",
        text: "Because we work with startups and small to medium-sized brands, we scope each shoot to a realistic budget. A single focused session can cover a full product range plus a set of lifestyle images — a complete visual refresh without an enterprise spend.",
      },
      { type: "h2", text: "Why Mumbai Brands Choose Neorama" },
      {
        type: "p",
        text: "We are a full-spectrum studio: film, photography, social content, branding, and design all under one roof. That means your photography shares a visual language with your video, your social media, and your identity — so your brand looks coherent everywhere a customer sees it. If you are looking for a commercial photography studio in Mumbai that understands the whole brand, not just the camera, that is exactly how we work.",
      },
      {
        type: "cta",
        text: "Need commercial photography in Mumbai? Tell us what you're shooting and we'll come back with an approach and a quote.",
        label: "Start a project",
      },
    ],
    faqs: [
      {
        q: "How much does commercial photography cost in Mumbai?",
        a: "Commercial photography cost depends on the number of products or looks, whether it's studio or on-location, and the level of styling and retouching. A single focused session is the most cost-effective way to cover a full product range plus lifestyle images. We scope each shoot to your budget — share what you're shooting and we'll send a quote.",
      },
      {
        q: "Do you shoot product photography for ecommerce and D2C brands?",
        a: "Yes — we shoot clean, consistent product photography for websites, marketplace listings, and ads, which is exactly what ecommerce and D2C brands need to convert. We deliver in the crops and formats each platform requires.",
      },
      {
        q: "Do you shoot in a studio or on location?",
        a: "Both — whichever your product needs. We use a controlled studio setup for clean product shots and shoot on location across Mumbai for lifestyle and brand imagery.",
      },
      {
        q: "How quickly do we get the final images?",
        a: "Edited and retouched images are typically delivered within one to two weeks of the shoot, depending on volume. We can prioritise a smaller hero set sooner if you have a launch deadline.",
      },
    ],
  },

  "branding-design-agency-mumbai": {
    slug: "branding-design-agency-mumbai",
    eyebrow: "Branding & Design · Mumbai",
    h1: "Branding & Design Agency in Mumbai",
    standfirst:
      "Neorama Studios is a Mumbai-based creative agency building brand identities and design systems that make young companies look established — for startups and growing brands.",
    metaTitle: "Branding & Design Agency in Mumbai | Neorama Studios",
    metaDescription:
      "Neorama Studios is a Mumbai-based branding and design agency creating logos, brand identities, packaging, and design systems for startups and growing brands. Get a quote.",
    serviceType: "Branding and Design",
    keywords: [
      "branding agency for startups mumbai",
      "branding agency mumbai",
      "brand identity design mumbai",
      "logo design mumbai",
      "packaging design mumbai",
    ],
    imageUrl: "/images/services/branding-design-mumbai.jpg",
    imageAlt: "Brand identity and design work by Neorama Studios in Mumbai",
    blocks: [
      {
        type: "p",
        text: "Branding is what makes a company recognisable and trusted before a single word is read. A considered identity tells customers you are serious, consistent, and worth their attention. At Neorama Studios, we build brands and design systems for startups and growing companies that need to look established from day one — and stay coherent as they scale.",
      },
      {
        type: "p",
        text: "We are a Mumbai-based creative agency, and branding is the layer that ties everything else together. Because we also produce film, photography, and social content, the identity we build is designed to work in motion and on camera — not just on a logo sheet.",
      },
      { type: "h2", text: "Branding & Design We Produce" },
      {
        type: "ul",
        items: [
          "Brand identity — logo, colour, typography, and the visual rules that hold a brand together.",
          "Brand strategy & positioning — clarifying what you stand for and how you sound before the visuals begin.",
          "Packaging design — shelf-ready, production-correct packaging that makes a product worth picking up.",
          "Design systems & guidelines — a clear toolkit so your brand stays consistent across every team and channel.",
          "Marketing & social design — templates, decks, and assets that keep day-to-day output on-brand.",
        ],
      },
      { type: "h2", text: "How We Work" },
      {
        type: "p",
        text: "We start with strategy — who you are, who you serve, and what makes you different — because design without that is just decoration. From there we develop identity directions, refine the one that fits, and build it out into a usable system with guidelines. You're involved at each decision point, so the final brand feels like yours, not a template.",
      },
      {
        type: "p",
        text: "Because we work with startups and small to medium-sized brands, we scope branding to where you are. A focused engagement can deliver a complete core identity and the essential assets to launch — a strong foundation you can build on as you grow.",
      },
      { type: "h2", text: "Why Mumbai Brands Choose Neorama" },
      {
        type: "p",
        text: "We are a full-spectrum studio: branding, design, film, photography, and social content all under one roof. That means your identity isn't handed off and forgotten — it carries through into your films, your photography, and your social media, so your brand reads as one coherent voice everywhere. If you are looking for a branding agency for startups in Mumbai that can also bring the brand to life across content, that is exactly how we work.",
      },
      {
        type: "cta",
        text: "Building or refreshing a brand in Mumbai? Tell us where you are and we'll come back with an approach and a quote.",
        label: "Start a project",
      },
    ],
    faqs: [
      {
        q: "How much does branding cost for a startup in Mumbai?",
        a: "Branding cost depends on scope — a core identity (logo, colour, typography) costs less than a full programme with strategy, packaging, and a complete design system. For startups we scope a focused engagement that delivers the essentials to launch, then build from there as you grow. Tell us your stage and we'll send a quote.",
      },
      {
        q: "What's included in a brand identity?",
        a: "A typical identity includes your logo, colour palette, typography, and the visual rules that hold everything together — usually with brand guidelines so your team stays consistent. Depending on scope we also cover strategy and positioning, packaging, and marketing templates.",
      },
      {
        q: "How long does a branding project take?",
        a: "A core identity usually takes three to five weeks — strategy, identity directions, refinement, and build-out into a usable system. Larger programmes with packaging or a full design system take longer; we'll confirm a timeline up front.",
      },
      {
        q: "Do you work with early-stage startups?",
        a: "Yes — early-stage startups are a core part of who we work with. We scope branding to where you are so you can look established from day one without overcommitting budget before you've launched.",
      },
    ],
  },
};

export const SERVICE_PAGE_LIST: ServicePage[] = Object.values(SERVICE_PAGES);
