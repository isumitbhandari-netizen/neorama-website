import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
// @ts-ignore
import relMWBThumb from "../assets/images/mwb_thumbnail.webp";
// @ts-ignore
import relLinenThumb from "../assets/images/regenerated_image_1780852616738.webp";
// @ts-ignore
import relPataudiThumb from "../assets/images/regenerated_image_1780850373289.webp";
// @ts-ignore
import TV_V1 from "../assets/images/tatva_ved_v1.webp";
// @ts-ignore
import TV_V2 from "../assets/images/tatva_ved_v2.webp";
// @ts-ignore
import TV_V3 from "../assets/images/tatva_ved_v3.webp";
// @ts-ignore
import TV_V4 from "../assets/images/tatva_ved_v4.webp";
// @ts-ignore
import TV_V5 from "../assets/images/tatva_ved_v5.webp";
// @ts-ignore
import TV_V6 from "../assets/images/tatva_ved_v6.webp";
// @ts-ignore
import TV_V7 from "../assets/images/tatva_ved_v7.webp";
// @ts-ignore
import TV_H1 from "../assets/images/tatva_ved_h1.webp";
// @ts-ignore
import TV_H2 from "../assets/images/tatva_ved_h2.webp";

// ─── Gradients ───────────────────────────────────────────────────────────────
const G_WARM  = "linear-gradient(145deg,#2e1608 0%,#7a3c18 50%,#c47840 100%)";
const G_SAGE  = "linear-gradient(145deg,#141e14 0%,#2e4e2a 50%,#527848 100%)";
const G_GOLD  = "linear-gradient(145deg,#1e1608 0%,#5c4418 50%,#a0782e 100%)";
const G_CREAM = "linear-gradient(145deg,#1e1a14 0%,#4e4030 50%,#8a7050 100%)";
const G_RUST  = "linear-gradient(145deg,#200808 0%,#5c1c10 50%,#9e3820 100%)";
const G_MOSS  = "linear-gradient(145deg,#0c1408 0%,#283818 50%,#3e5428 100%)";
const G_SAND  = "linear-gradient(145deg,#1c1810 0%,#504030 50%,#907060 100%)";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Img({
  src, label, className, gradient = G_WARM
}: {
  src: string | null; label: string; className?: string; gradient?: string;
}) {
  return (
    <div
      className={`${className ?? ""} relative overflow-hidden bg-neutral-950`}
      style={src ? undefined : { background: gradient }}
    >
      {src ? (
        <img src={src} alt={label} loading="lazy" className="w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25 px-6 text-center leading-loose">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function TatvaVedaCaseStudy({ onClose, onSelectProjectById }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-50 bg-[#0e0b08] overflow-y-auto selection:bg-[#3079D8] selection:text-white"
    >
      {/* Back button */}
      <div className="fixed top-8 left-6 md:left-12 z-50">
        <button
          onClick={onClose}
          className="group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-pure-white/10 backdrop-blur-md text-pure-white font-mono text-[10px] uppercase font-bold tracking-widest border border-pure-white/20 hover:bg-pure-white hover:text-neutral-950 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Case Study</span>
        </button>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="w-full min-h-[55vh] flex flex-col justify-end bg-[#0e0b08] px-6 md:px-12 pt-32 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto w-full">
          <span className="font-mono text-[10px] text-[#c47840] uppercase tracking-[0.3em] font-black block mb-5">
            Branding & Identity Design // Visual System
          </span>
          <h1 className="font-display text-5xl md:text-8xl font-black text-pure-white uppercase tracking-tight leading-none mb-8">
            Tatva Ved
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                ["Client",       "Tatva Ved"],
                ["Scope",        "Brand Identity, Visual Design"],
                ["Deliverables", "Logo System, Artwork, Applications"],
                ["Year",         "2025"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest mb-1">{k}</p>
                  <p className="font-sans text-xs font-semibold text-white/80">{v}</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest shrink-0">
              2025 // Neorama Studio
            </p>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0a0806] py-20 md:py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-3">
              <span className="font-mono text-[9px] text-[#c47840] uppercase tracking-[0.3em] font-black block mb-4">
                02 // Overview
              </span>
            </div>
            <div className="lg:col-span-9 space-y-5 text-white/55 font-sans text-sm md:text-base leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#c47840] first-letter:mr-3 first-letter:float-left first-letter:mt-1 first-letter:leading-none">
                A complete visual identity project developed for Tatva Ved, encompassing brand identity design, custom artwork creation, branded assets, and visual applications across multiple touchpoints.
              </p>
              <p>
                Every element of the system was developed to communicate depth, authenticity, and the brand's commitment to rooted, purposeful living — translating ancient wisdom into a modern visual vocabulary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE WORK ────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e0b08] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[9px] text-[#c47840] uppercase tracking-[0.3em] font-black">03 //</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] font-bold">Brand Identity & Design System</span>
          </div>

          <div className="space-y-4">

            {/* Row 1: H1 full width */}
            <Img
              src={TV_H1}
              label="Horizontal 01"
              gradient={G_SAGE}
              className="w-full aspect-[16/9]"
            />

            {/* Row 2: V1 + V2 + V3 */}
            <div className="grid grid-cols-3 gap-4">
              <Img src={TV_V1} label="Vertical 01" gradient={G_WARM}  className="w-full aspect-[2/3]" />
              <Img src={TV_V2} label="Vertical 02" gradient={G_GOLD}  className="w-full aspect-[2/3]" />
              <Img src={TV_V3} label="Vertical 03" gradient={G_CREAM} className="w-full aspect-[2/3]" />
            </div>

            {/* Row 3: V4 + V5 + V6 */}
            <div className="grid grid-cols-3 gap-4">
              <Img src={TV_V4} label="Vertical 04" gradient={G_RUST}  className="w-full aspect-[2/3]" />
              <Img src={TV_V5} label="Vertical 05" gradient={G_MOSS}  className="w-full aspect-[2/3]" />
              <Img src={TV_V6} label="Vertical 06" gradient={G_SAND}  className="w-full aspect-[2/3]" />
            </div>

            {/* Row 4: V7 (left, narrower) + H2 (right, wider) */}
            <div className="grid grid-cols-5 gap-4">
              <Img src={TV_V7} label="Vertical 07" gradient={G_WARM}  className="col-span-2 w-full aspect-[2/3]" />
              <Img src={TV_H2} label="Horizontal 02" gradient={G_SAGE} className="col-span-3 w-full aspect-auto" />
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ─────────────────────────────────────────────────── */}
      <section className="bg-[#0a0806] py-20 md:py-28 border-t border-white/5 text-pure-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[9px] text-[#c47840] uppercase tracking-[0.3em] font-black">04 //</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] font-bold">Related Projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "mwb-packaging-design", thumb: relMWBThumb,     label: "PACKAGING DESIGN", title: "MW&B | Packaging Design Collection",           desc: "Distinctive product packaging through bold visual storytelling and vibrant illustration systems." },
              { id: "linen-luxury-brand",   thumb: relLinenThumb,   label: "BRAND FILM",       title: "Linen and Linens | Luxury Brand Film",         desc: "A premium brand film communicating vision, values, and commitment to quality." },
              { id: "heritage-redefined",   thumb: relPataudiThumb, label: "AD FILM",          title: "Myntra x House of Pataudi",                    desc: "A premium fashion campaign blending modern style with timeless Indian heritage." },
            ].map((rel) => (
              <div
                key={rel.id}
                onClick={() => { onClose(); setTimeout(() => onSelectProjectById(rel.id), 180); }}
                className="group relative rounded-xl overflow-hidden bg-[#1a1208] aspect-[4/3] cursor-pointer border border-white/5 hover:border-[#c47840]/40 flex flex-col justify-end p-6 transition-all duration-300"
              >
                <img src={rel.thumb} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="bg-[#c47840]/30 text-[#c47840] font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest">{rel.label}</span>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-pure-white tracking-wide group-hover:text-[#c47840] transition-colors leading-tight">{rel.title}</h3>
                  <p className="font-sans text-[10px] text-white/40 group-hover:text-white/70 transition-colors">{rel.desc}</p>
                  <div className="pt-2 flex items-center gap-1 font-mono text-[8px] uppercase text-[#c47840] font-bold tracking-widest group-hover:gap-2 transition-all">
                    <span>View Project</span><ArrowRight size={8} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0e0b08] py-12 text-center text-white/20 border-t border-white/5 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2025 NEORAMA STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
