import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight, Sparkles, Play } from "lucide-react";
import { PROJECT_ROUTES } from "../projectRoutes";

const FAQS = PROJECT_ROUTES.find((p) => p.id === "golden-mirror-ai")?.faqs ?? [];
const VIMEO_ID = "1209790393";

// @ts-ignore
import gmHero from "../assets/images/gm_hero.webp";

// Editorial gallery loaded via Vite glob (gm_02..gm_11; gm_01 == hero, shown once).
const galleryGlob = import.meta.glob("../assets/images/gm_[0-9]*.webp", { eager: true, import: "default" }) as Record<string, string>;
const GALLERY_IMAGES: string[] = Object.entries(galleryGlob)
  .sort((a, b) => {
    const na = parseInt(a[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
    const nb = parseInt(b[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
    return na - nb;
  })
  .map((e) => e[1]);

interface Props {
  onClose: () => void;
  onRequestContact?: () => void;
}

export default function GoldenMirrorCaseStudy({ onClose, onRequestContact }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const container = wrapperRef.current;
    const handleScroll = () => { if (container) setScrollY(container.scrollTop); };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        onClose();
      }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, photoIndex]);

  const next = () => setPhotoIndex((i) => (i + 1) % GALLERY_IMAGES.length);
  const prev = () => setPhotoIndex((i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      id="golden-mirror-case-study-scroller"
      className="fixed inset-0 z-50 bg-white text-neutral-900 overflow-y-auto selection:bg-neutral-900 selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* FLOATING EXIT */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={onClose}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-neutral-950 font-mono text-[10px] uppercase font-black tracking-widest shadow-2xl border border-neutral-200/50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Case Study</span>
        </button>
      </div>

      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, opacity: 1 - Math.min(scrollY / 800, 0.75) }}
        >
          <img
            src={gmHero}
            alt="Golden Mirror — an AI-produced luxury fashion campaign by Neorama Studios"
            className="w-full h-full object-cover brightness-[0.62] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-[2px] w-8 bg-white" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/95 font-bold inline-flex items-center gap-2">
              <Sparkles size={12} className="text-[#3079D8]" />
              AI Production // Fashion Film &amp; Editorial
            </span>
            <span className="h-[2px] w-8 bg-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
          >
            Golden Mirror
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.5 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-neutral-300 font-bold uppercase"
          >
            A Luxury Fashion Brand // Campaign Film &amp; Editorial, Produced Entirely with AI
          </motion.p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
          onClick={() => document.getElementById("gm-film-sec")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>Watch the Film</span>
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
            A luxury fashion brand, built and launched entirely with AI.
          </h2>
          <p className="font-sans text-sm md:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Golden Mirror is a luxury fashion brand built around an indigo &amp; rust floral-jacquard co-ord — blazer and wide-leg trouser — set against carved palace courtyards and a coastal counterpoint, with the peacock woven through as its signature motif. The model, the location, the garment, the launch film and every editorial frame were generated and art-directed with AI, holding a single character and a consistent print across the whole set — a brand world built without a shoot.
          </p>
        </div>
      </section>

      {/* SECTION 3 — THE FILM (left 1/4, sticky) + THE EDITORIAL (right 3/4) */}
      <section id="gm-film-sec" className="bg-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* LEFT — vertical campaign reel, sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
                  The Film // 00:20
                </span>
                <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-neutral-900">
                  Campaign Reel
                </h3>
                <div className="w-12 h-[2px] bg-neutral-900" />
              </div>

              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-black">
                {filmPlaying ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&color=3079D8`}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Golden Mirror — AI Fashion Campaign Film"
                  />
                ) : (
                  <>
                    <img src={gmHero} alt="Golden Mirror AI fashion campaign film" className="absolute inset-0 w-full h-full object-cover opacity-75" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setFilmPlaying(true)}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#3079D8] hover:bg-white hover:text-[#3079D8] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
                        aria-label="Play film"
                      >
                        <Play fill="currentColor" size={26} className="translate-x-0.5" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-widest text-white/90 flex items-center gap-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                      9:16 Vertical Reel
                    </div>
                  </>
                )}
              </div>
              <p className="font-sans text-xs text-neutral-500 leading-relaxed hidden lg:block">
                A 20-second vertical campaign film, produced image-to-video from the editorial stills.
              </p>
            </div>
          </div>

          {/* RIGHT — editorial photo masonry */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                GENERATIVE EDITORIAL // GOLDEN MIRROR
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                The Editorial
              </h3>
              <div className="w-16 h-[2px] bg-neutral-900" />
            </div>

            <div className="columns-1 sm:columns-2 xl:columns-3 gap-5 md:gap-6">
              {GALLERY_IMAGES.map((img, idx) => (
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
                    alt={`Golden Mirror AI fashion editorial by Neorama Studios — frame ${String(idx + 1).padStart(2, "0")}`}
                    className="w-full h-auto block"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/14 transition-colors duration-300" />
                  <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={13} />
                  </div>
                  <span className="absolute top-3 left-3 px-2 py-1 bg-black/40 rounded font-mono text-[8px] uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Frame {String(idx + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5 — HOW IT WAS MADE */}
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
                { pillar: "Concept & Styling", detail: "The garment, colorway, model and locations were art-directed and locked as a consistent AI character and print system." },
                { pillar: "AI Photography", detail: "An editorial set of environmental and macro fashion frames — palace courtyards, coastal light and fabric detail — generated with AI." },
                { pillar: "AI Film", detail: "A 20-second vertical campaign reel produced image-to-video from the approved stills, holding face and fabric fidelity shot to shot." },
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
              {["AI Fashion Film", "Generative Photography", "Art Direction", "Character Consistency", "Macro Detail", "Editorial Retouch"].map((asset, index) => (
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

      {/* SECTION 6 — CTA */}
      <section className="bg-neutral-950 text-white py-24 md:py-32 px-6 border-t border-neutral-900/60">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
            AI Production // Content, Design &amp; Development
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
            Produce Your Campaign with AI
          </h3>
          <p className="font-sans text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            From generative editorial photography to a launch-ready fashion film — we produce complete campaigns with AI. Tell us what you&apos;re launching and let&apos;s make it.
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
        <p>© 2025 NEORAMA STUDIO. GOLDEN MIRROR IS AN AI-PRODUCED CAMPAIGN CONCEPT.</p>
      </footer>

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-between text-white mb-2 pt-2 z-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9.5px] uppercase tracking-widest block font-black">
                  GOLDEN MIRROR // EDITORIAL
                </span>
                <p className="font-display text-xs font-black uppercase">
                  AI Fashion Editorial // FRAME {String(photoIndex + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-bold">
                {String(photoIndex + 1).padStart(2, "0")} // {String(GALLERY_IMAGES.length).padStart(2, "0")}
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-neutral-950 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={15} />
              </button>
            </div>

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
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={GALLERY_IMAGES[photoIndex]}
                      alt={`Golden Mirror AI fashion editorial by Neorama Studios — frame ${String(photoIndex + 1).padStart(2, "0")}`}
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

            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">
                AI Fashion Editorial // PRODUCED FOR GOLDEN MIRROR
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
