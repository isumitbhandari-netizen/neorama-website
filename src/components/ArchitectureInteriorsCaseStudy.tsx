import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight } from "lucide-react";

// @ts-ignore
import archHero from "../assets/images/arch_campaign_hero.webp";
// @ts-ignore
import aravaliThumb from "../assets/images/arch_aravali_thumb.webp";
// @ts-ignore
import aravali01 from "../assets/images/arch_aravali_01.webp";
// @ts-ignore
import aravali02 from "../assets/images/arch_aravali_02.webp";
// @ts-ignore
import aravali03 from "../assets/images/arch_aravali_03.webp";
// @ts-ignore
import aravali04 from "../assets/images/arch_aravali_04.webp";
// @ts-ignore
import aravali05 from "../assets/images/arch_aravali_05.webp";
// @ts-ignore
import aravali06 from "../assets/images/arch_aravali_06.webp";
// @ts-ignore
import aravali07 from "../assets/images/arch_aravali_07.webp";
// @ts-ignore
import aravali08 from "../assets/images/arch_aravali_08.webp";
// @ts-ignore
import aravali09 from "../assets/images/arch_aravali_09.webp";
// @ts-ignore
import aravali10 from "../assets/images/arch_aravali_10.webp";
// @ts-ignore
import aravali11 from "../assets/images/arch_aravali_11.webp";
// @ts-ignore
import aravali12 from "../assets/images/arch_aravali_12.webp";
// @ts-ignore
import aravali13 from "../assets/images/arch_aravali_13.webp";
// @ts-ignore
import aravali14 from "../assets/images/arch_aravali_14.webp";
// @ts-ignore
import aravali15 from "../assets/images/arch_aravali_15.webp";
// @ts-ignore
import aravali16 from "../assets/images/arch_aravali_16.webp";
// @ts-ignore
import aravali17 from "../assets/images/arch_aravali_17.webp";
// @ts-ignore
import aravali18 from "../assets/images/arch_aravali_18.webp";
// @ts-ignore
import aravali19 from "../assets/images/arch_aravali_19.webp";
// @ts-ignore
import aravali20 from "../assets/images/arch_aravali_20.webp";
// @ts-ignore
import aravali21 from "../assets/images/arch_aravali_21.webp";
// @ts-ignore
import aravali22 from "../assets/images/arch_aravali_22.webp";
// @ts-ignore
import aravali23 from "../assets/images/arch_aravali_23.webp";
// @ts-ignore
import aravali24 from "../assets/images/arch_aravali_24.webp";
// @ts-ignore
import aravali25 from "../assets/images/arch_aravali_25.webp";
// @ts-ignore
import goldmineThumb from "../assets/images/arch_goldmine_thumb.webp";
// @ts-ignore
import goldmine01 from "../assets/images/arch_goldmine_01.webp";
// @ts-ignore
import goldmine02 from "../assets/images/arch_goldmine_02.webp";
// @ts-ignore
import goldmine03 from "../assets/images/arch_goldmine_03.webp";
// @ts-ignore
import goldmine04 from "../assets/images/arch_goldmine_04.webp";
// @ts-ignore
import goldmine05 from "../assets/images/arch_goldmine_05.webp";
// @ts-ignore
import goldmine06 from "../assets/images/arch_goldmine_06.webp";
// @ts-ignore
import goldmine07 from "../assets/images/arch_goldmine_07.webp";
// @ts-ignore
import goldmine08 from "../assets/images/arch_goldmine_08.webp";
// @ts-ignore
import goldmine09 from "../assets/images/arch_goldmine_09.webp";
// @ts-ignore
import goldmine10 from "../assets/images/arch_goldmine_10.webp";
// @ts-ignore
import goldmine11 from "../assets/images/arch_goldmine_11.webp";
// @ts-ignore
import goldmine12 from "../assets/images/arch_goldmine_12.webp";
// @ts-ignore
import goldmine13 from "../assets/images/arch_goldmine_13.webp";
// @ts-ignore
import goldmine14 from "../assets/images/arch_goldmine_14.webp";
// @ts-ignore
import goldmine15 from "../assets/images/arch_goldmine_15.webp";
// @ts-ignore
import goldmine16 from "../assets/images/arch_goldmine_16.webp";
// @ts-ignore
import goldmine17 from "../assets/images/arch_goldmine_17.webp";
// @ts-ignore
import goldmine18 from "../assets/images/arch_goldmine_18.webp";
// @ts-ignore
import goldmine19 from "../assets/images/arch_goldmine_19.webp";
// @ts-ignore
import goldmine20 from "../assets/images/arch_goldmine_20.webp";
// @ts-ignore
import goldmine21 from "../assets/images/arch_goldmine_21.webp";
// @ts-ignore
import goldmine22 from "../assets/images/arch_goldmine_22.webp";
// @ts-ignore
import goldmine23 from "../assets/images/arch_goldmine_23.webp";
// @ts-ignore
import goldmine24 from "../assets/images/arch_goldmine_24.webp";
// @ts-ignore
import goldmine25 from "../assets/images/arch_goldmine_25.webp";
// @ts-ignore
import goldmine26 from "../assets/images/arch_goldmine_26.webp";
// @ts-ignore
import goldmine27 from "../assets/images/arch_goldmine_27.webp";
// @ts-ignore
import goldmine28 from "../assets/images/arch_goldmine_28.webp";
// @ts-ignore
import goldmine29 from "../assets/images/arch_goldmine_29.webp";
// @ts-ignore
import goldmine30 from "../assets/images/arch_goldmine_30.webp";
// @ts-ignore
import goldmine31 from "../assets/images/arch_goldmine_31.webp";
// @ts-ignore
import goldmine32 from "../assets/images/arch_goldmine_32.webp";
// @ts-ignore
import goldmine33 from "../assets/images/arch_goldmine_33.webp";
// @ts-ignore
import goldmine34 from "../assets/images/arch_goldmine_34.webp";
// @ts-ignore
import goldmine35 from "../assets/images/arch_goldmine_35.webp";
// @ts-ignore
import pacaThumb from "../assets/images/arch_paca_thumb.webp";
// @ts-ignore
import paca01 from "../assets/images/arch_paca_01.webp";
// @ts-ignore
import paca02 from "../assets/images/arch_paca_02.webp";
// @ts-ignore
import paca03 from "../assets/images/arch_paca_03.webp";
// @ts-ignore
import paca04 from "../assets/images/arch_paca_04.webp";
// @ts-ignore
import paca05 from "../assets/images/arch_paca_05.webp";
// @ts-ignore
import paca06 from "../assets/images/arch_paca_06.webp";
// @ts-ignore
import paca07 from "../assets/images/arch_paca_07.webp";
// @ts-ignore
import paca08 from "../assets/images/arch_paca_08.webp";
// @ts-ignore
import paca09 from "../assets/images/arch_paca_09.webp";
// @ts-ignore
import paca10 from "../assets/images/arch_paca_10.webp";
// @ts-ignore
import paca11 from "../assets/images/arch_paca_11.webp";
// @ts-ignore
import paca12 from "../assets/images/arch_paca_12.webp";
// @ts-ignore
import paca13 from "../assets/images/arch_paca_13.webp";
// @ts-ignore
import paca14 from "../assets/images/arch_paca_14.webp";
// @ts-ignore
import storeyThumb from "../assets/images/arch_storey_thumb.webp";
// @ts-ignore
import storey01 from "../assets/images/arch_storey_01.webp";
// @ts-ignore
import storey02 from "../assets/images/arch_storey_02.webp";
// @ts-ignore
import storey03 from "../assets/images/arch_storey_03.webp";
// @ts-ignore
import storey04 from "../assets/images/arch_storey_04.webp";
// @ts-ignore
import storey05 from "../assets/images/arch_storey_05.webp";
// @ts-ignore
import storey06 from "../assets/images/arch_storey_06.webp";
// @ts-ignore
import storey07 from "../assets/images/arch_storey_07.webp";
// @ts-ignore
import storey08 from "../assets/images/arch_storey_08.webp";
// @ts-ignore
import storey09 from "../assets/images/arch_storey_09.webp";
// @ts-ignore
import storey10 from "../assets/images/arch_storey_10.webp";
// @ts-ignore
import storey11 from "../assets/images/arch_storey_11.webp";
// @ts-ignore
import storey12 from "../assets/images/arch_storey_12.webp";
// @ts-ignore
import storey13 from "../assets/images/arch_storey_13.webp";
// @ts-ignore
import storey14 from "../assets/images/arch_storey_14.webp";
// @ts-ignore
import storey15 from "../assets/images/arch_storey_15.webp";
// @ts-ignore
import storey16 from "../assets/images/arch_storey_16.webp";
// @ts-ignore
import storey17 from "../assets/images/arch_storey_17.webp";
// @ts-ignore
import storey18 from "../assets/images/arch_storey_18.webp";
// @ts-ignore
import storey19 from "../assets/images/arch_storey_19.webp";
// @ts-ignore
import storey20 from "../assets/images/arch_storey_20.webp";
// @ts-ignore
import storey21 from "../assets/images/arch_storey_21.webp";
// @ts-ignore
import storey22 from "../assets/images/arch_storey_22.webp";
// @ts-ignore
import storey23 from "../assets/images/arch_storey_23.webp";
// @ts-ignore
import storey24 from "../assets/images/arch_storey_24.webp";
// @ts-ignore
import storey25 from "../assets/images/arch_storey_25.webp";
// @ts-ignore
import storey26 from "../assets/images/arch_storey_26.webp";
// @ts-ignore
import storey27 from "../assets/images/arch_storey_27.webp";
// @ts-ignore
import storey28 from "../assets/images/arch_storey_28.webp";
// @ts-ignore
import storey29 from "../assets/images/arch_storey_29.webp";
// @ts-ignore
import storey30 from "../assets/images/arch_storey_30.webp";
// @ts-ignore
import storey31 from "../assets/images/arch_storey_31.webp";
// @ts-ignore
import storey32 from "../assets/images/arch_storey_32.webp";
// @ts-ignore
import storey33 from "../assets/images/arch_storey_33.webp";
// @ts-ignore
import storey34 from "../assets/images/arch_storey_34.webp";
// @ts-ignore
import storey35 from "../assets/images/arch_storey_35.webp";
// @ts-ignore
import storey36 from "../assets/images/arch_storey_36.webp";
// @ts-ignore
import storey37 from "../assets/images/arch_storey_37.webp";
// @ts-ignore
import storey38 from "../assets/images/arch_storey_38.webp";

interface ArchProject {
  id: string;
  name: string;
  descriptor: string;
  designStudio?: string;
  gradient: string;
  thumb: string;
  hero: string;
  images: string[];
}

const PROJECTS: ArchProject[] = [
  {
    id: "aravali-parisar",
    name: "Aravali Parisar",
    descriptor: "Architecture & Interiors",
    designStudio: "Locus Design Works",
    gradient: "linear-gradient(145deg, #efe6d8 0%, #cbb48f 45%, #977a4e 100%)",
    thumb: aravaliThumb,
    hero: aravaliThumb,
    images: [aravali01, aravali02, aravali03, aravali04, aravali05, aravali06, aravali07, aravali08, aravali09, aravali10, aravali11, aravali12, aravali13, aravali14, aravali15, aravali16, aravali17, aravali18, aravali19, aravali20, aravali21, aravali22, aravali23, aravali24, aravali25],
  },
  {
    id: "goldmine-consultants",
    name: "Goldmine Project Consultants",
    descriptor: "Corporate Interior Photography",
    gradient: "linear-gradient(145deg, #e6ddd4 0%, #b9a892 45%, #7c6a52 100%)",
    thumb: goldmineThumb,
    hero: goldmineThumb,
    images: [goldmine01, goldmine02, goldmine03, goldmine04, goldmine05, goldmine06, goldmine07, goldmine08, goldmine09, goldmine10, goldmine11, goldmine12, goldmine13, goldmine14, goldmine15, goldmine16, goldmine17, goldmine18, goldmine19, goldmine20, goldmine21, goldmine22, goldmine23, goldmine24, goldmine25, goldmine26, goldmine27, goldmine28, goldmine29, goldmine30, goldmine31, goldmine32, goldmine33, goldmine34, goldmine35],
  },
  {
    id: "paca-office",
    name: "PACA Office",
    descriptor: "Office Interior Photography",
    designStudio: "Locus Design Works",
    gradient: "linear-gradient(145deg, #dfe4e6 0%, #a9b6bd 45%, #6a7880 100%)",
    thumb: pacaThumb,
    hero: pacaThumb,
    images: [paca01, paca02, paca03, paca04, paca05, paca06, paca07, paca08, paca09, paca10, paca11, paca12, paca13, paca14],
  },
  {
    id: "storey-studio",
    name: "Storey Studio",
    descriptor: "Studio & Interior Photography",
    gradient: "linear-gradient(145deg, #e4e0da 0%, #b3aca2 45%, #726c62 100%)",
    thumb: storeyThumb,
    hero: storeyThumb,
    images: [storey01, storey02, storey03, storey04, storey05, storey06, storey07, storey08, storey09, storey10, storey11, storey12, storey13, storey14, storey15, storey16, storey17, storey18, storey19, storey20, storey21, storey22, storey23, storey24, storey25, storey26, storey27, storey28, storey29, storey30, storey31, storey32, storey33, storey34, storey35, storey36, storey37, storey38],
  },
];

interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
  // Close the overlay and jump to the site's contact section.
  onRequestContact?: () => void;
  // Project slug to open on mount / when the URL changes (null = collection landing).
  initialStory?: string | null;
  // Notify the parent so it can keep the shareable URL in sync.
  onStoryChange?: (storySlug: string | null) => void;
}

export default function ArchitectureInteriorsCaseStudy({ onClose, onRequestContact, initialStory, onStoryChange }: Props) {
  const [activeProject, setActiveProject] = useState<string | null>(initialStory ?? null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const current = PROJECTS.find(p => p.id === activeProject) ?? null;
  const galleryImages = current ? current.images : [];
  const related = activeProject ? PROJECTS.filter(p => p.id !== activeProject) : [];

  // Follow URL-driven project changes (deep links + browser Back/Forward).
  useEffect(() => {
    setActiveProject(initialStory ?? null);
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
  }, [activeProject]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        if (activeProject) { setActiveProject(null); onStoryChange?.(null); scrollToTop(); return; }
        onClose();
      }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeProject, photoIndex, galleryImages.length]);

  const next = () => setPhotoIndex(i => (i + 1) % galleryImages.length);
  const prev = () => setPhotoIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);

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

  const selectProject = (id: string) => {
    setActiveProject(id);
    onStoryChange?.(id);
    setPhotoIndex(0);
    scrollToTop();
  };

  const handleBack = () => {
    if (activeProject) { setActiveProject(null); onStoryChange?.(null); scrollToTop(); }
    else onClose();
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      id="architecture-case-study-scroller"
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
          <span>{activeProject ? "All Projects" : "Exit Case Study"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ═══════════════ MAIN COLLECTION PAGE ═══════════════ */}
        {!activeProject && (
          <motion.div
            key="main-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1 — HERO BANNER */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  opacity: 1 - Math.min(scrollY / 800, 0.75)
                }}
              >
                <img
                  src={archHero}
                  alt="Architectural and interior photography by Neorama Studios, Mumbai — professional project photography for architects and interior designers"
                  className="w-full h-full object-cover brightness-[0.6] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
              </div>

              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center justify-center gap-3 mb-5"
                >
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">
                    Architecture &amp; Interiors Photography
                  </span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                >
                  Spaces &amp; Structures
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                  className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-300 font-bold uppercase"
                >
                  FOUR PROJECTS // ARCHITECTURE &amp; INTERIOR STILLS
                </motion.p>
              </div>

              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
                onClick={() => document.getElementById("arch-projects-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Scroll to Explore</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — FEATURED PROJECTS */}
            <section id="arch-projects-sec" className="bg-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  EXPLORE PROJECTS // 04
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Featured Project Portfolios
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {PROJECTS.map((p, i) => (
                  <ProjectCard key={p.id} project={p} index={i} onClick={selectProject} />
                ))}
              </div>
            </section>

            {/* SECTION 3 — SPECS */}
            <section className="bg-neutral-50/50 py-24 md:py-32 border-y border-neutral-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="border border-neutral-200 rounded-3xl p-8 md:p-14 space-y-10 bg-white shadow-xs relative">
                  <div className="absolute -top-3.5 left-10 bg-white px-4 border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-[0.2em] font-black rounded-full">
                    Portfolio Certificate // Spatial Series
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-5">
                    Series Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Discipline //</span>
                      <p className="font-sans text-[15px] font-extrabold text-neutral-900">Architecture &amp; Interiors</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Projects //</span>
                      <p className="font-sans text-[14px] text-neutral-800 font-semibold">Four Spatial Portfolios</p>
                    </div>
                    <div className="md:col-span-2 space-y-3 pt-6 border-t border-neutral-100">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Services Rendered //</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {["Architecture Photography", "Interior Photography", "Spatial Storytelling", "Detail & Material Studies"].map((asset, index) => (
                          <span key={index} className="bg-neutral-50 text-neutral-800 font-mono text-[10.5px] font-bold tracking-tight px-3 py-1.5 rounded-lg border border-neutral-200/60 inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4 — CTA: get your project photographed */}
            <section className="bg-neutral-950 text-white py-24 md:py-32 px-6 border-t border-neutral-900/60">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
                  For Architects &amp; Interior Designers
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Get Your Project Photographed
                </h3>
                <p className="font-sans text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
                  We help architects and interior designers present their built work with professional architectural and interior photography. Tell us about your space and let&apos;s plan the shoot.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => onRequestContact?.()}
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                  >
                    Book a Shoot
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL ARCHITECTURE PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        )}

        {/* ═══════════════ INDIVIDUAL PROJECT PAGE ═══════════════ */}
        {activeProject && current && (
          <motion.div
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1 — PROJECT HERO BANNER */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  opacity: 1 - Math.min(scrollY / 800, 0.75)
                }}
              >
                <img
                  src={current.hero}
                  alt={`${current.name} — ${current.descriptor} by Neorama Studios`}
                  className="w-full h-full object-cover brightness-[0.6] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
              </div>

              <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex items-center justify-center gap-3 mb-5"
                >
                  <span className="h-[2px] w-8 bg-white" />
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">
                    {current.descriptor}
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
                onClick={() => document.getElementById("arch-gallery-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>View Gallery</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — PROJECT TITLE STRIP */}
            <section className="bg-white py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">
                    ARCHITECTURE &amp; INTERIORS PHOTOGRAPHY
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter leading-none">
                    {current.name}
                  </h2>
                </div>
                <div className={`grid ${current.designStudio ? "grid-cols-3" : "grid-cols-2"} gap-8 shrink-0`}>
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Discipline //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{current.descriptor}</p>
                  </div>
                  {current.designStudio && (
                    <div>
                      <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Design Studio //</p>
                      <p className="font-sans text-xs font-bold text-neutral-800">{current.designStudio}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Frames //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{current.images.length} Masters</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3 — MASONRY GALLERY (orientation-aware) */}
            <section id="arch-gallery-sec" className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-10 md:space-y-14">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  EDITORIAL ARCHIVE // {current.name.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Project Gallery Portfolio
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    onClick={() => openLightbox(idx)}
                    className="mb-5 md:mb-6 break-inside-avoid group cursor-zoom-in relative rounded-xl overflow-hidden shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`${current.name} ${current.descriptor.toLowerCase()} by Neorama Studios — frame ${String(idx + 1).padStart(2, "0")}`}
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
            </section>

            {/* CTA — book a shoot (project page) */}
            <section className="bg-white py-16 md:py-20 px-6 border-t border-neutral-100">
              <div className="max-w-3xl mx-auto text-center space-y-5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  For Architects &amp; Interior Designers
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none">
                  Have a Project to Photograph?
                </h3>
                <p className="font-sans text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
                  Professional architectural &amp; interior photography for your built work. Tell us about your space and let&apos;s plan the shoot.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onRequestContact?.()}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-neutral-950 text-white font-mono text-[11px] uppercase font-black tracking-widest hover:bg-[#3079D8] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                  >
                    Book a Shoot
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 4 — RELATED PROJECTS */}
            <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
              <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">
                      STUDIO DISCOVERY PORTAL //
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                      Explore Other Projects
                    </h2>
                  </div>
                  <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {related.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => selectProject(rel.id)}
                      className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-xl border border-neutral-800 flex flex-col justify-end p-5"
                    >
                      <img
                        src={rel.thumb}
                        alt={`${rel.name} — ${rel.descriptor} by Neorama Studios`}
                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="relative z-10 space-y-2 text-left">
                        <span className="inline-block bg-white/15 border border-white/25 text-white/90 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">
                          {rel.descriptor}
                        </span>
                        <h3 className="font-display font-extrabold uppercase text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                          {rel.name}
                        </h3>
                        <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                          <span>Explore Project</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL ARCHITECTURE PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
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
                  ARCHIVE INSPECTOR // {current.name.toUpperCase()}
                </span>
                <p className="font-display text-xs font-black uppercase">
                  {current.descriptor} // FRAME {String(photoIndex + 1).padStart(2, "0")}
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
                aria-label="Previous Frame"
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
                      alt={`${current.name} ${current.descriptor.toLowerCase()} by Neorama Studios — frame ${String(photoIndex + 1).padStart(2, "0")}`}
                      className="max-h-[72vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black text-white transition-all border border-white/10 cursor-pointer hidden sm:flex"
                aria-label="Next Frame"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom bar */}
            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">
                {current.descriptor} // ARCHITECTURE MASTER ARCHIVE
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

// ─── Project Card (collection landing page) ──────────────────────────────────
interface ProjectCardProps {
  project: ArchProject;
  index: number;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
      onClick={() => onClick(project.id)}
      className="group space-y-4 cursor-pointer"
    >
      <div className="aspect-[4/5] w-full rounded-xl overflow-hidden shadow-sm relative">
        <img
          src={project.thumb}
          alt={`${project.name} — ${project.descriptor} by Neorama Studios`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 w-full z-10">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/70 mb-1.5 font-bold">{project.descriptor}</p>
          <h3 className="font-display text-lg md:text-xl font-black text-white uppercase tracking-tight leading-none">
            {project.name}
          </h3>
        </div>
        <div className="absolute bottom-5 right-5 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={13} />
        </div>
      </div>
      <div className="flex items-center justify-between font-mono">
        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">{project.images.length} Master Frames</span>
        <span className="text-[9px] text-[#3079D8] uppercase tracking-widest font-black inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          View Gallery <ArrowRight size={10} />
        </span>
      </div>
      {project.designStudio && (
        <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest -mt-2">
          Design // <span className="text-neutral-700 font-bold">{project.designStudio}</span>
        </p>
      )}
    </motion.div>
  );
};
