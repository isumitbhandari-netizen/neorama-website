import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { PROJECT_ROUTES } from "../projectRoutes";

const FAQS = PROJECT_ROUTES.find((p) => p.id === "khan-saheb-ai")?.faqs ?? [];

// @ts-ignore
import ksHero from "../assets/images/ks_content_17.webp";
// @ts-ignore
import ksThumb from "../assets/images/ks_thumb.webp";

// Load the curated galleries via Vite glob so we don't hand-maintain 60+ imports.
// Sorted numerically by the NN in ks_content_NN.webp / ks_design_NN.webp.
const contentGlob = import.meta.glob("../assets/images/ks_content_*.webp", { eager: true, import: "default" }) as Record<string, string>;
const designGlob = import.meta.glob("../assets/images/ks_design_*.webp", { eager: true, import: "default" }) as Record<string, string>;
const sortNum = (m: Record<string, string>): string[] =>
  Object.entries(m)
    .sort((a, b) => {
      const na = parseInt(a[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
      const nb = parseInt(b[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
      return na - nb;
    })
    .map((e) => e[1]);

const CONTENT_IMAGES = sortNum(contentGlob);
const DESIGN_IMAGES = sortNum(designGlob);

interface Chapter {
  id: string;
  name: string;
  descriptor: string;
  pillar: string;
  blurb: string;
  gradient: string;
  cover: string;
  images: string[];
  columns: string; // Tailwind masonry column classes for the gallery
  unit: string; // "Frames" / "Screens"
}

const CHAPTERS: Chapter[] = [
  {
    id: "editorial-photography",
    name: "The Brand",
    descriptor: "AI Editorial & Product Photography",
    pillar: "Content",
    blurb:
      "A full brand-photography world generated with AI — wedding sherwanis, tailored business suits, fabric and detail studies, groom looks and lifestyle frames, art-directed to a single luxury language.",
    gradient: "linear-gradient(145deg, #efe6d8 0%, #cbb48f 45%, #8a6f45 100%)",
    cover: CONTENT_IMAGES[1] ?? CONTENT_IMAGES[0],
    images: CONTENT_IMAGES,
    columns: "columns-1 sm:columns-2 lg:columns-3",
    unit: "Frames",
  },
  {
    id: "digital-flagship",
    name: "The Digital Flagship",
    descriptor: "UX / UI & Web Design",
    pillar: "Design & Development",
    blurb:
      "A complete e-commerce experience designed end-to-end — home, collections, the bespoke journey, a build-your-suit configurator, checkout, and the private client dashboard, all in one considered design system.",
    gradient: "linear-gradient(145deg, #dfe4e6 0%, #a9b6bd 45%, #55606a 100%)",
    cover: DESIGN_IMAGES[0],
    images: DESIGN_IMAGES,
    columns: "columns-1 sm:columns-2",
    unit: "Screens",
  },
];

interface Props {
  onClose: () => void;
  onRequestContact?: () => void;
  // Chapter slug to open on mount / when the URL changes (null = case-study landing).
  initialStory?: string | null;
  // Notify the parent so it can keep the shareable URL in sync.
  onStoryChange?: (storySlug: string | null) => void;
}

export default function KhanSahebCaseStudy({ onClose, onRequestContact, initialStory, onStoryChange }: Props) {
  const [activeChapter, setActiveChapter] = useState<string | null>(initialStory ?? null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const current = CHAPTERS.find((c) => c.id === activeChapter) ?? null;
  const galleryImages = current ? current.images : [];
  const other = activeChapter ? CHAPTERS.filter((c) => c.id !== activeChapter) : [];

  // Follow URL-driven chapter changes (deep links + browser Back/Forward).
  useEffect(() => {
    setActiveChapter(initialStory ?? null);
  }, [initialStory]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const container = wrapperRef.current;
    const handleScroll = () => {
      if (container) setScrollY(container.scrollTop);
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [activeChapter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        if (activeChapter) { setActiveChapter(null); onStoryChange?.(null); scrollToTop(); return; }
        onClose();
      }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeChapter, photoIndex, galleryImages.length]);

  const next = () => setPhotoIndex((i) => (i + 1) % galleryImages.length);
  const prev = () => setPhotoIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const scrollToTop = () => {
    if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
    setScrollY(0);
  };

  const selectChapter = (id: string) => {
    setActiveChapter(id);
    onStoryChange?.(id);
    setPhotoIndex(0);
    scrollToTop();
  };

  const handleBack = () => {
    if (activeChapter) { setActiveChapter(null); onStoryChange?.(null); scrollToTop(); }
    else onClose();
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      id="khan-saheb-case-study-scroller"
      className="fixed inset-0 z-50 bg-white text-neutral-900 overflow-y-auto selection:bg-neutral-900 selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* FLOATING EXIT / BACK */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={handleBack}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-neutral-950 font-mono text-[10px] uppercase font-black tracking-widest shadow-2xl border border-neutral-200/50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>{activeChapter ? "All Chapters" : "Exit Case Study"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ═══════════════ CASE-STUDY LANDING ═══════════════ */}
        {!activeChapter && (
          <motion.div
            key="main-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1 — HERO */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  opacity: 1 - Math.min(scrollY / 800, 0.75),
                }}
              >
                <img
                  src={ksHero}
                  alt="Khan Saheb — an AI-produced luxury bespoke menswear brand by Neorama Studios"
                  className="w-full h-full object-cover brightness-[0.62] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
              </div>

              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center justify-center gap-3 mb-5"
                >
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/95 font-bold inline-flex items-center gap-2">
                    <Sparkles size={12} className="text-[#3079D8]" />
                    AI Production // Content · Design · Development
                  </span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                >
                  Khan Saheb
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                  className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-neutral-300 font-bold uppercase"
                >
                  A Dialogue in Cloth // A Luxury Menswear House, Produced Entirely with AI
                </motion.p>
              </div>

              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
                onClick={() => document.getElementById("ks-chapters-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Scroll to Explore</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — THE CONCEPT */}
            <section className="bg-white py-20 md:py-28 px-6 md:px-12 border-b border-neutral-100">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
                  The Concept
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                  A complete luxury brand, conceived and built with AI.
                </h2>
                <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  Khan Saheb is a concept house for bespoke Indian and contemporary menswear — imagined end-to-end at Neorama Studios using generative AI. From the brand voice and the editorial photography to a full digital-flagship e-commerce experience, every asset was produced without a single traditional shoot or stock image — a demonstration of what AI-native production makes possible for a modern brand.
                </p>
              </div>
            </section>

            {/* SECTION 3 — CHAPTERS */}
            <section id="ks-chapters-sec" className="bg-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  EXPLORE THE WORK // 02 CHAPTERS
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Content &amp; Design
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {CHAPTERS.map((c, i) => (
                  <ChapterCard key={c.id} chapter={c} index={i} onClick={selectChapter} />
                ))}
              </div>
            </section>

            {/* SECTION 4 — PRODUCED WITH AI (SPECS) */}
            <section className="bg-neutral-50/50 py-24 md:py-32 border-y border-neutral-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="border border-neutral-200 rounded-3xl p-8 md:p-14 space-y-10 bg-white shadow-xs relative">
                  <div className="absolute -top-3.5 left-10 bg-white px-4 border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-[0.2em] font-black rounded-full">
                    Production Note // AI-Native Pipeline
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-5">
                    How It Was Made
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { pillar: "Content", detail: "Brand identity, editorial & product photography, art direction — generated and curated with AI." },
                      { pillar: "Design", detail: "A full UX/UI system: home, collections, the bespoke journey, configurator, checkout & dashboard." },
                      { pillar: "Development", detail: "Design-to-code workflows turning the flagship into a buildable, production-ready web experience." },
                    ].map((s, index) => (
                      <div key={index} className="space-y-2">
                        <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-black inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                          {s.pillar} //
                        </span>
                        <p className="font-sans text-[13.5px] text-neutral-700 leading-relaxed">{s.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-neutral-100 flex flex-wrap gap-2">
                    {["Generative Photography", "Art Direction", "Brand Identity", "UX / UI Design", "Design System", "AI-Assisted Development"].map((asset, index) => (
                      <span key={index} className="bg-neutral-50 text-neutral-800 font-mono text-[10.5px] font-bold tracking-tight px-3 py-1.5 rounded-lg border border-neutral-200/60 inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            {FAQS.length > 0 && (
              <section className="bg-white py-16 md:py-24 px-6 md:px-12 border-t border-neutral-100">
                <div className="max-w-3xl mx-auto">
                  <div className="text-center space-y-3 mb-10">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">FAQ</span>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">Common Questions</h3>
                    <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
                  </div>
                  <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                    {FAQS.map((f, i) => (
                      <details key={i} className="group py-5">
                        <summary className="flex items-center justify-between cursor-pointer list-none font-sans font-bold text-sm md:text-base text-neutral-900">
                          {f.q}
                          <ChevronDown size={18} className="text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                        </summary>
                        <p className="mt-3 font-sans text-sm text-neutral-600 leading-relaxed max-w-2xl">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 5 — CTA */}
            <section className="bg-neutral-950 text-white py-24 md:py-32 px-6 border-t border-neutral-900/60">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
                  AI Production // Content, Design &amp; Development
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Build Your Brand with AI
                </h3>
                <p className="font-sans text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  From generative photography to a launch-ready digital flagship — we produce complete brand worlds with AI. Tell us what you&apos;re building and let&apos;s make it.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => onRequestContact?.()}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                  >
                    Start an AI Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. KHAN SAHEB IS A CONCEPT BRAND PRODUCED WITH AI.</p>
            </footer>
          </motion.div>
        )}

        {/* ═══════════════ CHAPTER PAGE ═══════════════ */}
        {activeChapter && current && (
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1 — CHAPTER HERO */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  opacity: 1 - Math.min(scrollY / 800, 0.75),
                }}
              >
                <img
                  src={current.cover}
                  alt={`Khan Saheb — ${current.descriptor}, produced with AI by Neorama Studios`}
                  className="w-full h-full object-cover brightness-[0.6] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
              </div>

              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center justify-center gap-3 mb-5"
                >
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/95 font-bold">
                    Khan Saheb // {current.pillar}
                  </span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                >
                  {current.name}
                </motion.h1>
              </div>

              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
                onClick={() => document.getElementById("ks-gallery-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>View Gallery</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — CHAPTER TITLE STRIP */}
            <section className="bg-white py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3 max-w-2xl">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">
                    KHAN SAHEB // {current.descriptor}
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter leading-none">
                    {current.name}
                  </h2>
                  <p className="font-sans text-sm text-neutral-600 leading-relaxed pt-2">{current.blurb}</p>
                </div>
                <div className="grid grid-cols-2 gap-8 shrink-0">
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Pillar //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{current.pillar}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">{current.unit} //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{current.images.length} {current.unit}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3 — MASONRY GALLERY */}
            <section id="ks-gallery-sec" className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-10 md:space-y-14">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  {current.pillar === "Content" ? "GENERATIVE ARCHIVE" : "DESIGN ARCHIVE"} // KHAN SAHEB
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  {current.pillar === "Content" ? "Editorial & Product Gallery" : "Digital Flagship Screens"}
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className={`${current.columns} gap-5 md:gap-6`}>
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    onClick={() => openLightbox(idx)}
                    className="mb-5 md:mb-6 break-inside-avoid group cursor-zoom-in relative rounded-xl overflow-hidden shadow-sm border border-neutral-100"
                  >
                    <img
                      src={img}
                      alt={`Khan Saheb ${current.descriptor.toLowerCase()} by Neorama Studios — ${current.unit.toLowerCase().replace(/s$/, "")} ${String(idx + 1).padStart(2, "0")}`}
                      className="w-full h-auto block"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/14 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={13} />
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-1 bg-black/40 rounded font-mono text-[8px] uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {current.unit.replace(/s$/, "")} {String(idx + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CTA — start an AI project (chapter page) */}
            <section className="bg-white py-16 md:py-20 px-6 border-t border-neutral-100">
              <div className="max-w-3xl mx-auto text-center space-y-5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  AI Production // Content, Design &amp; Development
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none">
                  Want This for Your Brand?
                </h3>
                <p className="font-sans text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
                  We produce complete brand worlds with AI — photography, design and development. Tell us what you&apos;re building.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onRequestContact?.()}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-neutral-950 text-white font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                  >
                    Start an AI Project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 4 — OTHER CHAPTER */}
            {other.length > 0 && (
              <section className="bg-neutral-950 py-24 md:py-32 text-white overflow-hidden relative">
                <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                    <div className="space-y-3">
                      <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">
                        CONTINUE THE STORY //
                      </span>
                      <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                        The Other Chapter
                      </h2>
                    </div>
                    <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {other.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => selectChapter(rel.id)}
                        className="group relative rounded-xl overflow-hidden aspect-[16/10] cursor-pointer shadow-xl border border-neutral-800 flex flex-col justify-end p-6"
                      >
                        <img
                          src={rel.cover}
                          alt={`Khan Saheb — ${rel.descriptor} by Neorama Studios`}
                          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                        <div className="relative z-10 space-y-2 text-left">
                          <span className="inline-block bg-white/15 border border-white/25 text-white/90 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">
                            {rel.pillar}
                          </span>
                          <h3 className="font-display font-extrabold uppercase text-lg text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                            {rel.name}
                          </h3>
                          <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                            <span>View Chapter</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. KHAN SAHEB IS A CONCEPT BRAND PRODUCED WITH AI.</p>
            </footer>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      <AnimatePresence>
        {lightboxOpen && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between text-white mb-2 pt-2 z-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9.5px] uppercase tracking-widest block font-black">
                  KHAN SAHEB // {current.pillar.toUpperCase()}
                </span>
                <p className="font-display text-xs font-black uppercase">
                  {current.descriptor} // {current.unit.replace(/s$/, "").toUpperCase()} {String(photoIndex + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-bold">
                {String(photoIndex + 1).padStart(2, "0")} // {String(galleryImages.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-neutral-950 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={15} />
              </button>
            </div>

            {/* Image area */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              <button
                onClick={prev}
                className="absolute left-2 md:left-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={galleryImages[photoIndex]}
                      alt={`Khan Saheb ${current.descriptor.toLowerCase()} by Neorama Studios — ${current.unit.toLowerCase().replace(/s$/, "")} ${String(photoIndex + 1).padStart(2, "0")}`}
                      className="max-h-[78vh] max-w-[92vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom bar */}
            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">
                {current.descriptor} // AI-PRODUCED FOR KHAN SAHEB
              </p>
              <div className="flex items-center justify-center gap-6 text-[8.5px] tracking-widest uppercase text-neutral-500">
                <span className="inline-flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Swipe left/right to browse
                </span>
                <span className="hidden md:inline-flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                  Keyboard Arrow Keys active
                </span>
                <span className="inline-flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Esc to close
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Chapter Card (case-study landing) ───────────────────────────────────────
interface ChapterCardProps {
  chapter: Chapter;
  index: number;
  onClick: (id: string) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={() => onClick(chapter.id)}
      className="group space-y-4 cursor-pointer"
    >
      <div className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm relative">
        <img
          src={chapter.cover}
          alt={`Khan Saheb — ${chapter.descriptor} by Neorama Studios`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur border border-white/25 text-white font-mono text-[8px] uppercase px-2.5 py-1 rounded-full tracking-widest font-black">
            <Sparkles size={9} className="text-[#3079D8]" />
            {chapter.pillar}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 p-6 w-full z-10">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/70 mb-1.5 font-bold">{chapter.descriptor}</p>
          <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
            {chapter.name}
          </h3>
        </div>
        <div className="absolute bottom-6 right-6 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={13} />
        </div>
      </div>
      <div className="flex items-center justify-between font-mono">
        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">{chapter.images.length} {chapter.unit}</span>
        <span className="text-[9px] text-[#3079D8] uppercase tracking-widest font-black inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          View Chapter <ArrowRight size={10} />
        </span>
      </div>
    </motion.div>
  );
};
