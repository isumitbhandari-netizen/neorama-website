import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ArrowRight } from "lucide-react";

// ─── Images ───────────────────────────────────────────────────────────────────
// @ts-ignore
import simhayanaKnottedThumb from "../assets/images/simhayana_knotted_thumb.webp";
// @ts-ignore
import relatedLinenThumb from "../assets/images/regenerated_image_1780844748489.webp";
// @ts-ignore
import relatedRawPresseryThumb from "../assets/images/regenerated_image_1780922541314.webp";
// @ts-ignore
import relatedAdidasThumb from "../assets/images/regenerated_image_1780924734124.webp";
// @ts-ignore
import _S1_H1 from "../assets/images/simhayana_s1_h1.webp";
// @ts-ignore
import _S1_V1 from "../assets/images/simhayana_s1_v1.webp";
// @ts-ignore
import _S1_V2 from "../assets/images/simhayana_s1_v2.webp";
// @ts-ignore
import _S1_V3 from "../assets/images/simhayana_s1_v3.webp";
// @ts-ignore
import _S1_V4 from "../assets/images/simhayana_s1_v4.webp";
// @ts-ignore
import _S1_V5 from "../assets/images/simhayana_s1_v5.webp";
// @ts-ignore
import _S2_H1 from "../assets/images/simhayana_s2_h1.webp";
// @ts-ignore
import _S2_H2 from "../assets/images/simhayana_s2_h2.webp";
// @ts-ignore
import _S2_V1 from "../assets/images/simhayana_s2_v1.webp";
// @ts-ignore
import _S2_V2 from "../assets/images/simhayana_s2_v2.webp";
// @ts-ignore
import _K1_H1 from "../assets/images/knotted_k1_h1.webp";
// @ts-ignore
import _K1_H2 from "../assets/images/knotted_k1_h2.webp";
// @ts-ignore
import _K2_H1 from "../assets/images/knotted_k2_h1.webp";
// @ts-ignore
import _K2_V1 from "../assets/images/knotted_k2_v1.webp";
// @ts-ignore
import _K3_V1 from "../assets/images/knotted_k3_v1.webp";
// @ts-ignore
import _K3_V2 from "../assets/images/knotted_k3_v2.webp";

const HERO_IMG: string = simhayanaKnottedThumb;

// Simhayana Look 1 — Red Saree (1H + 5V)
const S1_H1: string = _S1_H1;
const S1_V1: string = _S1_V1;
const S1_V2: string = _S1_V2;
const S1_V3: string = _S1_V3;
const S1_V4: string = _S1_V4;
const S1_V5: string = _S1_V5;

// Simhayana Look 2 — Colourful Saree (2H + 2V)
const S2_H1: string = _S2_H1;
const S2_H2: string = _S2_H2;
const S2_V1: string = _S2_V1;
const S2_V2: string = _S2_V2;

// knotted.in Look 1 — Beige (2H)
const K1_H1: string = _K1_H1;
const K1_H2: string = _K1_H2;

// knotted.in Look 2 — Muted Red (1H + 1V)
const K2_H1: string = _K2_H1;
const K2_V1: string = _K2_V1;

// knotted.in Look 3 — (2V)
const K3_V1: string = _K3_V1;
const K3_V2: string = _K3_V2;

// Flattened for lightbox (hero + 10 simhayana + 6 knotted = 17)
const ALL_IMGS = [
  HERO_IMG,
  S1_H1, S1_V1, S1_V2, S1_V3, S1_V4, S1_V5,  // indices 1–6
  S2_H1, S2_V1, S2_V2, S2_H2,                  // indices 7–10
  K1_H1, K1_H2,                                  // indices 11–12
  K2_H1, K2_V1,                                  // indices 13–14
  K3_V1, K3_V2,                                  // indices 15–16
];

const LIGHTBOX_LABELS: string[] = [
  "Campaign Hero",
  "Simhayana — Look 01 // Red Saree // Opening Frame",
  "Simhayana — Look 01 // Red Saree // Portrait I",
  "Simhayana — Look 01 // Red Saree // Portrait II",
  "Simhayana — Look 01 // Red Saree // Portrait III",
  "Simhayana — Look 01 // Red Saree // Portrait IV",
  "Simhayana — Look 01 // Red Saree // Portrait V",
  "Simhayana — Look 02 // Colourful Saree // Opening Frame",
  "Simhayana — Look 02 // Colourful Saree // Portrait I",
  "Simhayana — Look 02 // Colourful Saree // Portrait II",
  "Simhayana — Look 02 // Colourful Saree // Closing Frame",
  "knotted.in — Look 01 // Beige Edit // Frame I",
  "knotted.in — Look 01 // Beige Edit // Frame II",
  "knotted.in — Look 02 // Muted Red // Landscape",
  "knotted.in — Look 02 // Muted Red // Portrait",
  "knotted.in — Look 03 // Portrait I",
  "knotted.in — Look 03 // Portrait II",
];

const SIM_GRADIENT  = "linear-gradient(145deg, #f5e0e8 0%, #e8a8bc 45%, #c06880 100%)";
const KNOT_GRADIENT = "linear-gradient(145deg, #e0ede0 0%, #9fc89f 45%, #5a8c5a 100%)";
const HERO_GRADIENT = "linear-gradient(145deg, #f0e8d8 0%, #d4b07a 45%, #9a6c30 100%)";

interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

// Defined outside the component so scrollY state updates never remount it
function Img({
  src, label, idx, className, gradient, onOpen
}: {
  src: string | null; label: string; idx: number; className: string; gradient: string; onOpen: (i: number) => void;
}) {
  return (
    <div
      onClick={() => onOpen(idx)}
      className={`${className} relative group cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-100`}
      style={src ? undefined : { background: gradient }}
    >
      {src ? (
        <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 px-4 text-center">{label}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
        <Maximize2 size={11} />
      </div>
    </div>
  );
}

export default function SimhayanaKnottedCaseStudy({ onClose, onSelectProjectById }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const el = wrapperRef.current;
    const handleScroll = () => { if (el) setScrollY(el.scrollTop); };
    el?.addEventListener("scroll", handleScroll, { passive: true });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { lightboxOpen ? setLightboxOpen(false) : onClose(); return; }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "unset";
      el?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, photoIndex]);

  const next = () => setPhotoIndex(i => (i + 1) % ALL_IMGS.length);
  const prev = () => setPhotoIndex(i => (i - 1 + ALL_IMGS.length) % ALL_IMGS.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 bg-pure-white text-[#2a2c30] overflow-y-auto selection:bg-[#3079D8] selection:text-white"
    >
      {/* BACK BUTTON */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={onClose}
          className="group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-pure-white/95 text-neutral-950 font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl border border-neutral-200/40 hover:bg-neutral-950 hover:text-pure-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Case Study</span>
        </button>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-950 select-none">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: 1 - Math.min(scrollY / 700, 0.7) }}
        >
          {HERO_IMG ? (
            <img src={HERO_IMG} alt="Simhayana & knotted.in" className="w-full h-full object-cover brightness-[0.82]" />
          ) : (
            <div className="w-full h-full" style={{ background: HERO_GRADIENT }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/15" />
        </div>

        <div className="relative z-10 text-center text-pure-white max-w-5xl px-6 pointer-events-none">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-pure-white/95 font-bold">Fashion, Lifestyle & Creator Content Photography</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-pure-white tracking-tight uppercase leading-none md:mb-6">
            knotted.in<br />
            <span className="text-pure-white/50 text-3xl sm:text-4xl md:text-6xl">×</span><br />
            Simhayana
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="font-mono text-xs sm:text-sm tracking-[0.25em] text-pure-white/80 font-semibold mt-4">
            INFLUENCER-LED BRAND PHOTOGRAPHY // MAHIMA KOTHARI
          </motion.p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-pure-white/60 text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
          <span>Scroll to Read //</span>
          <div className="w-[1px] h-10 bg-pure-white/30 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-pure-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ─────────────────────────────────────────────────── */}
      <section className="bg-pure-white py-24 md:py-36 max-w-6xl mx-auto px-6 md:px-12 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-extrabold block">LOOKBOOK CHAPTER // 01</span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight leading-none">Project<br />Overview</h2>
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-100">
              {[
                ["Client //", "Simhayana & knotted.in"],
                ["Featured Creator //", "Mahima Kothari"],
                ["Category //", "Fashion, Lifestyle & Creator Content Photography"],
                ["Industry //", "Fashion & Lifestyle"],
              ].map(([label, value]) => (
                <div key={label} className={label === "Category //" ? "col-span-2 pt-2" : ""}>
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">{label}</p>
                  <p className="font-sans text-xs font-semibold text-neutral-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#3079D8] first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              A fashion and lifestyle photography project created in collaboration with Mahima Kothari for Simhayana and knotted.in. Designed for social media, digital campaigns, and brand storytelling, the project combines creator-led content with editorial photography to showcase both brands through authentic lifestyle moments and contemporary visual aesthetics.
            </p>
            <p>
              The imagery focuses on fashion, personal style, product integration, and modern creator-brand collaborations, creating content that feels both aspirational and relatable to digital audiences.
            </p>
          </div>
        </div>
      </section>

      {/* ── SIMHAYANA ────────────────────────────────────────────────────────── */}
      <section className="bg-pure-white py-20">
        <div className="space-y-20 md:space-y-28">

          {/* Chapter Header */}
          <div className="max-w-4xl mx-auto text-center px-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-extrabold block mb-3">CHAPTER ONE //</span>
            <h3 className="font-display text-2xl md:text-4xl font-extrabold text-[#2a2c30] uppercase tracking-wider mb-4">Simhayana</h3>
            <p className="font-sans text-sm md:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
              A collection of creator-led fashion imagery showcasing Simhayana through bold saree styling, editorial compositions, and authentic personal expression.
            </p>
            <div className="w-12 h-[1px] bg-neutral-300 mx-auto mt-6" />
          </div>

          {/* ── LOOK 01 — RED SAREE ── */}
          <div className="max-w-6xl mx-auto px-6 space-y-5">
            <div className="flex items-center gap-4 pb-3 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-extrabold">Look 01 //</span>
              <span className="font-sans text-sm font-semibold text-neutral-800">The Red Saree</span>
              <span className="ml-auto font-mono text-[9px] text-neutral-400 uppercase tracking-wider">6 Frames</span>
            </div>
            <p className="font-sans text-xs text-neutral-500 max-w-2xl leading-relaxed">
              Draped in crimson — a classic red saree styled with contemporary confidence. Creator Mahima Kothari brings Simhayana's signature craftsmanship to life through fluid movement, rich colour, and effortless grace.
            </p>
          </div>

          {/* Look 01 — Full-width horizontal */}
          <div className="max-w-[1440px] mx-auto px-6">
            <Img src={S1_H1} label="Simhayana — Look 01, Opening Frame" idx={1} gradient={SIM_GRADIENT} className="w-full aspect-[16/9] shadow-sm" onOpen={openLightbox} />
            <div className="mt-3">
              <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider">Look 01 // Opening Wide Frame — Red Saree</span>
            </div>
          </div>

          {/* Look 01 — Three portraits in a row */}
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {([S1_V1, S1_V2, S1_V3] as (string | null)[]).map((src, i) => (
              <div key={i} className="space-y-3">
                <Img src={src} label={`Simhayana — Look 01, Portrait ${["I","II","III"][i]}`} idx={2 + i} gradient={SIM_GRADIENT} className="w-full aspect-[2/3]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Portrait {["I","II","III"][i]} // Red Saree</span>
              </div>
            ))}
          </div>

          {/* Look 01 — Two portraits side by side */}
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {([S1_V4, S1_V5] as (string | null)[]).map((src, i) => (
              <div key={i} className="space-y-3">
                <Img src={src} label={`Simhayana — Look 01, Portrait ${["IV","V"][i]}`} idx={5 + i} gradient={SIM_GRADIENT} className="w-full aspect-[2/3]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Portrait {["IV","V"][i]} // Red Saree</span>
              </div>
            ))}
          </div>

          {/* Look 01/02 separator */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-neutral-100" />
          </div>

          {/* ── LOOK 02 — COLOURFUL SAREE ── */}
          <div className="max-w-6xl mx-auto px-6 space-y-5">
            <div className="flex items-center gap-4 pb-3 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-extrabold">Look 02 //</span>
              <span className="font-sans text-sm font-semibold text-neutral-800">The Colourful Saree</span>
              <span className="ml-auto font-mono text-[9px] text-neutral-400 uppercase tracking-wider">4 Frames</span>
            </div>
            <p className="font-sans text-xs text-neutral-500 max-w-2xl leading-relaxed">
              A vibrant celebration of colour and character. Bold, playful, and unmistakably Simhayana — the second look explores the joy of dressed expression through rich hues and dynamic styling.
            </p>
          </div>

          {/* Look 02 — Full-width horizontal opening */}
          <div className="max-w-[1440px] mx-auto px-6">
            <Img src={S2_H1} label="Simhayana — Look 02, Opening Frame" idx={7} gradient={SIM_GRADIENT} className="w-full aspect-[16/9] shadow-sm" onOpen={openLightbox} />
            <div className="mt-3">
              <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider">Look 02 // Opening Wide Frame — Colourful Saree</span>
            </div>
          </div>

          {/* Look 02 — Two portraits side by side */}
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {([S2_V1, S2_V2] as (string | null)[]).map((src, i) => (
              <div key={i} className="space-y-3">
                <Img src={src} label={`Simhayana — Look 02, Portrait ${["I","II"][i]}`} idx={8 + i} gradient={SIM_GRADIENT} className="w-full aspect-[4/5]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Portrait {["I","II"][i]} // Colourful Saree</span>
              </div>
            ))}
          </div>

          {/* Look 02 — Full-width horizontal closing */}
          <div className="max-w-[1300px] mx-auto px-6">
            <Img src={S2_H2} label="Simhayana — Look 02, Closing Frame" idx={10} gradient={SIM_GRADIENT} className="w-full aspect-[16/9] shadow-md" onOpen={openLightbox} />
            <div className="mt-3">
              <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider">Look 02 // Closing Wide Frame — Colourful Saree</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── TRANSITION DIVIDER ───────────────────────────────────────────────── */}
      <div className="py-20 md:py-28 bg-[#fdfdfd] border-y border-neutral-100/50 text-center px-6">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-display font-medium text-lg sm:text-2xl text-neutral-800 tracking-wider uppercase max-w-3xl mx-auto leading-relaxed"
        >
          "Two brands. One creator. Distinct visual stories."
        </motion.p>
      </div>

      {/* ── KNOTTED.IN ───────────────────────────────────────────────────────── */}
      <section className="bg-pure-white py-20">
        <div className="space-y-20 md:space-y-28">

          {/* Chapter Header */}
          <div className="max-w-4xl mx-auto text-center px-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-extrabold block mb-3">CHAPTER TWO //</span>
            <h3 className="font-display text-2xl md:text-4xl font-extrabold text-[#2a2c30] uppercase tracking-wider mb-4">knotted.in</h3>
            <p className="font-sans text-sm md:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
              Lifestyle-driven content highlighting knotted.in through authentic creator storytelling — two distinct looks, two colour stories, one consistent modern identity.
            </p>
            <div className="w-12 h-[1px] bg-neutral-300 mx-auto mt-6" />
          </div>

          {/* ── LOOK 01 — BEIGE ── */}
          <div className="max-w-6xl mx-auto px-6 space-y-5">
            <div className="flex items-center gap-4 pb-3 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-extrabold">Look 01 //</span>
              <span className="font-sans text-sm font-semibold text-neutral-800">Beige Edit</span>
              <span className="ml-auto font-mono text-[9px] text-neutral-400 uppercase tracking-wider">2 Frames</span>
            </div>
            <p className="font-sans text-xs text-neutral-500 max-w-2xl leading-relaxed">
              Understated and intentional. knotted.in's beige palette speaks to clean living, quiet confidence, and contemporary everyday wear — captured across two wide frames that breathe.
            </p>
          </div>

          {/* Look 01 — Two stacked horizontals */}
          <div className="max-w-[1440px] mx-auto px-6 space-y-5">
            <Img src={K1_H1} label="knotted.in — Look 01, Frame I" idx={11} gradient={KNOT_GRADIENT} className="w-full aspect-[16/9] shadow-sm" onOpen={openLightbox} />
            <Img src={K1_H2} label="knotted.in — Look 01, Frame II" idx={12} gradient={KNOT_GRADIENT} className="w-full aspect-[16/9] shadow-sm" onOpen={openLightbox} />
            <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Look 01 // Beige Edit — Wide Frames</span>
          </div>

          {/* Look 01/02 separator */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-neutral-100" />
          </div>

          {/* ── LOOK 02 — MUTED RED ── */}
          <div className="max-w-6xl mx-auto px-6 space-y-5">
            <div className="flex items-center gap-4 pb-3 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-extrabold">Look 02 //</span>
              <span className="font-sans text-sm font-semibold text-neutral-800">Muted Red</span>
              <span className="ml-auto font-mono text-[9px] text-neutral-400 uppercase tracking-wider">2 Frames</span>
            </div>
            <p className="font-sans text-xs text-neutral-500 max-w-2xl leading-relaxed">
              Warm, grounded, and effortlessly cool. The muted red tones anchor the look in a sense of ease and modern sensibility — knotted.in styled for the way life actually moves.
            </p>
          </div>

          {/* Look 02 — Horizontal + Portrait side by side */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
              <div className="md:col-span-7 space-y-3">
                <Img src={K2_H1} label="knotted.in — Look 02, Landscape" idx={13} gradient={KNOT_GRADIENT} className="w-full aspect-[3/2]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Look 02 // Wide Frame — Muted Red</span>
              </div>
              <div className="md:col-span-5 space-y-3">
                <Img src={K2_V1} label="knotted.in — Look 02, Portrait" idx={14} gradient={KNOT_GRADIENT} className="w-full aspect-[2/3]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Look 02 // Portrait Frame — Muted Red</span>
              </div>
            </div>
          </div>

          {/* Look 02/03 separator */}
          <div className="max-w-6xl mx-auto px-6">
            <div className="h-px bg-neutral-100" />
          </div>

          {/* ── LOOK 03 — 2V ── */}
          <div className="max-w-6xl mx-auto px-6 space-y-5">
            <div className="flex items-center gap-4 pb-3 border-b border-neutral-100">
              <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-widest font-extrabold">Look 03 //</span>
              <span className="font-sans text-sm font-semibold text-neutral-800">knotted.in</span>
              <span className="ml-auto font-mono text-[9px] text-neutral-400 uppercase tracking-wider">2 Frames</span>
            </div>
          </div>

          {/* Look 03 — Two portraits side by side */}
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {([K3_V1, K3_V2] as (string | null)[]).map((src, i) => (
              <div key={i} className="space-y-3">
                <Img src={src} label={`knotted.in — Look 03, Portrait ${["I","II"][i]}`} idx={15 + i} gradient={KNOT_GRADIENT} className="w-full aspect-[2/3]" onOpen={openLightbox} />
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">Look 03 // Portrait {["I","II"][i]}</span>
              </div>
            ))}
          </div>

          {/* Closing quote */}
          <div className="py-20 md:py-28 bg-[#fbfbfa] border-y border-neutral-100/50 text-center px-6">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display font-medium text-lg sm:text-2xl text-neutral-800 tracking-wider uppercase max-w-3xl mx-auto leading-relaxed"
            >
              "Fashion that feels real. Content that connects."
            </motion.p>
          </div>

        </div>
      </section>

      {/* ── GALLERY TRIGGER ──────────────────────────────────────────────────── */}
      <section className="bg-neutral-950 py-32 text-center text-pure-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#3079D8]/10 blur-[130px] pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto px-6 space-y-6">
          <span className="font-mono text-xs text-[#3079D8] tracking-[0.3em] uppercase block font-bold">FULL COLLECTION PROOFS</span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">Curated Gallery Archive</h2>
          <p className="font-sans text-xs text-pure-white/70 max-w-md mx-auto leading-relaxed">
            View all 16 editorial frames across both brand chapters — Simhayana (10) and knotted.in (6) — in full-bleed display mode.
          </p>
          <button
            onClick={() => openLightbox(1)}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pure-white text-[#2a2c30] font-mono text-[11px] uppercase font-bold tracking-widest cursor-pointer shadow-lg hover:bg-[#3079D8] hover:text-pure-white transition-all duration-300 hover:scale-[1.04]"
          >
            <span>View Full Gallery</span>
            <Maximize2 size={13} className="text-[#3079D8] group-hover:text-pure-white transition-colors" />
          </button>
        </div>
      </section>

      {/* ── RELATED PROJECTS ─────────────────────────────────────────────────── */}
      <section className="bg-neutral-900 py-24 md:py-36 text-pure-white border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.2em] font-extrabold block">Explore More Campaign Units //</span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">Related Projects</h2>
            </div>
            <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "linen-editorial-photography", title: "Linen and Linens | Summer & Festive Collection Photography", tag: "Fashion Photography", desc: "Editorial fashion and lifestyle photography across two seasons.", thumb: relatedLinenThumb },
              { id: "adidas-bhavisha-kothari", title: "Adidas | Sports & Lifestyle Photography", tag: "Sports Photography", desc: "Performance lifestyle imagery for Adidas in collaboration with Bhavisha Kothari.", thumb: relatedAdidasThumb },
              { id: "raw-pressery-commercial", title: "Raw Pressery | Commercial Photography", tag: "Product Photography", desc: "Clean, lifestyle-led product and commercial photography for Raw Pressery.", thumb: relatedRawPresseryThumb },
            ].map((rel) => (
              <div
                key={rel.id}
                onClick={() => { onClose(); setTimeout(() => onSelectProjectById(rel.id), 180); }}
                className="group relative rounded-xl overflow-hidden bg-neutral-950 aspect-[4/3] cursor-pointer shadow-lg border border-neutral-800 flex flex-col justify-end p-6"
              >
                {rel.thumb ? (
                  <img src={rel.thumb} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 space-y-2 text-left">
                  <span className="bg-[#3079D8]/50 text-white font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest">{rel.tag}</span>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-pure-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">{rel.title}</h3>
                  <p className="font-sans text-[10px] text-neutral-400 group-hover:text-pure-white/90 transition-colors">{rel.desc}</p>
                  <div className="pt-2 flex items-center gap-1 font-mono text-[8px] uppercase text-[#3079D8] font-bold tracking-widest group-hover:gap-2 transition-all">
                    <span>View Project</span><ArrowRight size={8} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 py-16 text-center text-neutral-500 border-t border-neutral-900/50 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2025 NEORAMA STUDIO. ALL STILLS AND LOOKBOOKS RESERVED PROOFS.</p>
      </footer>

      {/* ── LIGHTBOX ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0d0e11] flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-between text-pure-white mb-2 pt-2">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9px] uppercase tracking-widest block font-bold">NEORAMA ARCHIVE // SIMHAYANA & KNOTTED.IN</span>
                <p className="font-display text-xs font-semibold uppercase">{LIGHTBOX_LABELS[photoIndex]}</p>
              </div>
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-bold">
                {String(photoIndex + 1).padStart(2, "0")} // {String(ALL_IMGS.length).padStart(2, "0")}
              </div>
              <button onClick={() => setLightboxOpen(false)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-neutral-950 transition-all cursor-pointer">
                <X size={15} />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center p-4">
              <button onClick={prev} className="absolute left-2 md:left-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex">
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
                    style={ALL_IMGS[photoIndex] ? undefined : {
                      background: photoIndex === 0 ? HERO_GRADIENT : photoIndex <= 10 ? SIM_GRADIENT : KNOT_GRADIENT,
                      width: "80vw", height: "60vh", borderRadius: "12px"
                    }}
                  >
                    {ALL_IMGS[photoIndex] ? (
                      <img src={ALL_IMGS[photoIndex]!} alt={LIGHTBOX_LABELS[photoIndex]} className="max-h-[72vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5" />
                    ) : (
                      <span className="font-mono text-base uppercase tracking-[0.25em] text-white/30 px-8 text-center">{LIGHTBOX_LABELS[photoIndex]}</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button onClick={next} className="absolute right-2 md:right-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pb-2">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">● Swipe Left/Right to Browse</span>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest hidden sm:block">● Keyboard Arrow Keys Active</span>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">● ESC to Close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
