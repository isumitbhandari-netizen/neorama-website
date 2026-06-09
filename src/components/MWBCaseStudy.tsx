import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
// @ts-ignore
import relTatvaVedThumb from "../assets/images/tatva_ved_thumbnail.jpg";
// @ts-ignore
import relLinenThumb from "../assets/images/regenerated_image_1780852616738.png";
// @ts-ignore
import relRawThumb from "../assets/images/regenerated_image_1780922541314.webp";
// @ts-ignore
import MWB_V1 from "../assets/images/mwb_v1.png";
// @ts-ignore
import MWB_V2 from "../assets/images/mwb_v2.png";
// @ts-ignore
import MWB_V3 from "../assets/images/mwb_v3.png";
// @ts-ignore
import MWB_H1 from "../assets/images/mwb_h1.png";
// @ts-ignore
import MWB_H2 from "../assets/images/mwb_h2.png";
// @ts-ignore
import MWB_H3 from "../assets/images/mwb_h3.png";

// ─── Gradients ───────────────────────────────────────────────────────────────
const G_NAVY  = "linear-gradient(145deg,#060c1e 0%,#0e1e42 50%,#182e60 100%)";
const G_VIVID = "linear-gradient(145deg,#120420 0%,#2e0850 50%,#540e8c 100%)";
const G_BOLD  = "linear-gradient(145deg,#180408 0%,#4a0e14 50%,#8c1a22 100%)";
const G_TEAL  = "linear-gradient(145deg,#041414 0%,#0e3434 50%,#185c5c 100%)";
const G_AMBER = "linear-gradient(145deg,#181004 0%,#4a3010 50%,#8a5a1a 100%)";
const G_SLATE = "linear-gradient(145deg,#0c0c14 0%,#1e1e2e 50%,#2e2e48 100%)";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Img({
  src, label, className, gradient = G_NAVY
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

export default function MWBCaseStudy({ onClose, onSelectProjectById }: Props) {
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
      className="fixed inset-0 z-50 bg-neutral-950 overflow-y-auto selection:bg-[#3079D8] selection:text-white"
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
      <section className="w-full min-h-[55vh] flex flex-col justify-end bg-neutral-950 px-6 md:px-12 pt-32 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto w-full">
          <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block mb-5">
            Packaging Design // Visual Identity System
          </span>
          <h1 className="font-display text-5xl md:text-8xl font-black text-pure-white uppercase tracking-tight leading-none mb-8">
            MW&B
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/10 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                ["Client",       "MW&B"],
                ["Scope",        "Packaging Design"],
                ["Deliverables", "Full Packaging System"],
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
      <section className="bg-[#0a0a0f] py-20 md:py-28 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-3">
              <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black block mb-4">
                02 // Overview
              </span>
            </div>
            <div className="lg:col-span-9 space-y-5 text-white/55 font-sans text-sm md:text-base leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#3079D8] first-letter:mr-3 first-letter:float-left first-letter:mt-1 first-letter:leading-none">
                A packaging design project developed for MW&B, focused on creating distinctive product packaging through bold visual storytelling, vibrant illustration systems, and shelf-impact design.
              </p>
              <p>
                Each concept was developed to command attention at the point of sale, communicate brand values at a glance, and create a cohesive family across the full product range.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE WORK ────────────────────────────────────────────────────────── */}
      <section className="bg-neutral-950 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">

          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black">03 //</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] font-bold">Packaging Collection</span>
          </div>

          <div className="space-y-4">

            {/* Row 1: H1 full width */}
            <Img
              src={MWB_H1}
              label="Horizontal 01"
              gradient={G_NAVY}
              className="w-full aspect-[16/9]"
            />

            {/* Row 2: three verticals */}
            <div className="grid grid-cols-3 gap-4">
              <Img src={MWB_V1} label="Vertical 01" gradient={G_VIVID} className="w-full aspect-[2/3]" />
              <Img src={MWB_V2} label="Vertical 02" gradient={G_BOLD}  className="w-full aspect-[2/3]" />
              <Img src={MWB_V3} label="Vertical 03" gradient={G_TEAL}  className="w-full aspect-[2/3]" />
            </div>

            {/* Row 3: H2 + H3 side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Img src={MWB_H2} label="Horizontal 02" gradient={G_AMBER} className="w-full aspect-[4/3]" />
              <Img src={MWB_H3} label="Horizontal 03" gradient={G_SLATE} className="w-full aspect-[4/3]" />
            </div>

          </div>
        </div>
      </section>

      {/* ── RELATED PROJECTS ─────────────────────────────────────────────────── */}
      <section className="bg-[#0a0a0f] py-20 md:py-28 border-t border-white/5 text-pure-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-6 mb-14">
            <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black">04 //</span>
            <div className="flex-1 h-px bg-white/8" />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] font-bold">Related Projects</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "tatva-veda-branding",     thumb: relTatvaVedThumb, label: "BRAND IDENTITY", title: "Tatva Ved | Brand Identity & Visual Design System", desc: "A complete visual identity system encompassing brand identity, custom artwork, and branded applications." },
              { id: "linen-luxury-brand",       thumb: relLinenThumb,    label: "BRAND FILM",     title: "Linen and Linens | Luxury Brand Film",              desc: "A premium brand film communicating vision, values, and commitment to quality." },
              { id: "raw-pressery-commercial",  thumb: relRawThumb,      label: "COMMERCIAL",     title: "Raw Pressery | Commercial Photography",            desc: "Commercial photography showcasing vibrant brand identity and premium lifestyle appeal." },
            ].map((rel) => (
              <div
                key={rel.id}
                onClick={() => { onClose(); setTimeout(() => onSelectProjectById(rel.id), 180); }}
                className="group relative rounded-xl overflow-hidden bg-neutral-900 aspect-[4/3] cursor-pointer border border-white/5 hover:border-[#3079D8]/40 flex flex-col justify-end p-6 transition-all duration-300"
              >
                <img src={rel.thumb} alt={rel.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="bg-[#3079D8]/40 text-white font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest">{rel.label}</span>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-pure-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">{rel.title}</h3>
                  <p className="font-sans text-[10px] text-white/40 group-hover:text-white/70 transition-colors">{rel.desc}</p>
                  <div className="pt-2 flex items-center gap-1 font-mono text-[8px] uppercase text-[#3079D8] font-bold tracking-widest group-hover:gap-2 transition-all">
                    <span>View Project</span><ArrowRight size={8} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 py-12 text-center text-white/20 border-t border-white/5 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2025 NEORAMA STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
