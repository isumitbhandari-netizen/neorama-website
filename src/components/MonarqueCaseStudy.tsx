import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight, Play } from "lucide-react";

// @ts-ignore
import monarqueHero from "../assets/images/monarque_thumb.webp";
// @ts-ignore
import relatedRaniThumb from "../assets/images/rani_pink_jewellery_1780905915920.webp";
// @ts-ignore
import relatedLinenThumb from "../assets/images/regenerated_image_1780844748489.webp";
// @ts-ignore
import relatedAdidasThumb from "../assets/images/regenerated_image_1780924734124.webp";

// Editorial gallery loaded via Vite glob (monarque_01..monarque_43).
const galleryGlob = import.meta.glob("../assets/images/monarque_[0-9]*.webp", { eager: true, import: "default" }) as Record<string, string>;
const GALLERY_IMAGES: string[] = Object.entries(galleryGlob)
  .sort((a, b) => {
    const na = parseInt(a[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
    const nb = parseInt(b[0].match(/_(\d+)\.webp$/)?.[1] ?? "0", 10);
    return na - nb;
  })
  .map((e) => e[1]);

interface Reel {
  id: string;
  vimeoId: string;
  label: string;
  thumbnail: string;
}

// Social media films shot for the same campaign — matches src/socialReels.ts entries.
// Thumbnails are the real exported video frames, served from /public/images/social.
const REELS: Reel[] = [
  { id: "monarque-cufflinks", vimeoId: "1212562696", label: "Reel 01", thumbnail: "/images/social/monarque-cufflinks.webp" },
  { id: "monarque-duo", vimeoId: "1212562675", label: "Reel 02", thumbnail: "/images/social/monarque-duo.webp" },
  { id: "monarque-rings", vimeoId: "1212562631", label: "Reel 03", thumbnail: "/images/social/monarque-rings.webp" },
  { id: "monarque-hands", vimeoId: "1212562633", label: "Reel 04", thumbnail: "/images/social/monarque-hands.webp" },
  { id: "monarque-signet", vimeoId: "1212562630", label: "Reel 05", thumbnail: "/images/social/monarque-signet.webp" },
  { id: "monarque-earring", vimeoId: "1212562632", label: "Reel 06", thumbnail: "/images/social/monarque-earring.webp" },
  { id: "monarque-reel07", vimeoId: "1217595249", label: "Reel 07", thumbnail: "/images/social/monarque-reel07.webp" },
  { id: "monarque-reel08", vimeoId: "1217595255", label: "Reel 08", thumbnail: "/images/social/monarque-reel08.webp" },
  { id: "monarque-reel09", vimeoId: "1217595236", label: "Reel 09", thumbnail: "/images/social/monarque-reel09.webp" },
  { id: "monarque-reel10", vimeoId: "1217595232", label: "Reel 10", thumbnail: "/images/social/monarque-reel10.webp" },
  { id: "monarque-reel11", vimeoId: "1217595223", label: "Reel 11", thumbnail: "/images/social/monarque-reel11.webp" },
  { id: "monarque-reel12", vimeoId: "1217595224", label: "Reel 12", thumbnail: "/images/social/monarque-reel12.webp" },
  { id: "monarque-reel13", vimeoId: "1217595193", label: "Reel 13", thumbnail: "/images/social/monarque-reel13.webp" },
  { id: "monarque-reel14", vimeoId: "1217595191", label: "Reel 14", thumbnail: "/images/social/monarque-reel14.webp" },
  { id: "monarque-reel15", vimeoId: "1217595262", label: "Reel 15", thumbnail: "/images/social/monarque-reel15.webp" },
  { id: "monarque-reel16", vimeoId: "1217595275", label: "Reel 16", thumbnail: "/images/social/monarque-reel16.webp" },
  { id: "monarque-reel17", vimeoId: "1217595263", label: "Reel 17", thumbnail: "/images/social/monarque-reel17.webp" },
];

interface Props {
  onClose: () => void;
  onRequestContact?: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function MonarqueCaseStudy({ onClose, onRequestContact, onSelectProjectById }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openReelIndex, setOpenReelIndex] = useState<number | null>(null);
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
        if (openReelIndex !== null) { setOpenReelIndex(null); return; }
        onClose();
      }
      if (lightboxOpen) {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
      if (openReelIndex !== null) {
        if (e.key === "ArrowRight") setOpenReelIndex((i) => (i === null ? i : (i + 1) % REELS.length));
        if (e.key === "ArrowLeft") setOpenReelIndex((i) => (i === null ? i : (i - 1 + REELS.length) % REELS.length));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, photoIndex, openReelIndex]);

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

  const goToProject = (id: string) => {
    onClose();
    setTimeout(() => onSelectProjectById(id), 180);
  };

  return (
    <div
      ref={wrapperRef}
      id="monarque-case-study-scroller"
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
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none bg-black">
        <div
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.25}px)`, opacity: 1 - Math.min(scrollY / 800, 0.75) }}
        >
          <img
            src={monarqueHero}
            alt="Monarque Gold & Diamond — jewellery campaign photography by Neorama Studios"
            className="w-full h-full object-cover brightness-[0.65] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-[2px] w-8 bg-white" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">
              Jewellery Photography &amp; Films
            </span>
            <span className="h-[2px] w-8 bg-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
          >
            Monarque
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.5 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-300 font-bold uppercase"
          >
            GOLD &amp; DIAMOND // EDITORIAL STILLS + SOCIAL FILMS
          </motion.p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
          onClick={() => document.getElementById("monarque-overview-sec")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span>Scroll to Explore</span>
          <ChevronDown size={14} className="animate-bounce text-white/70" />
        </div>
      </section>

      {/* SECTION 2 — PROJECT OVERVIEW */}
      <section id="monarque-overview-sec" className="bg-white py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          <div className="lg:col-span-5 space-y-8">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">
              CAMPAIGN METADATA //
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter leading-none">
              Project <br /> Overview
            </h2>

            <div className="pt-8 grid grid-cols-2 gap-y-6 gap-x-4 border-t border-neutral-150">
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Client //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Monarque Gold &amp; Diamond</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Category //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Jewellery Photography &amp; Film</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Industry //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Fine Jewellery</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Deliverables //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">{GALLERY_IMAGES.length} Stills, {REELS.length} Films</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-neutral-700 leading-relaxed font-sans font-medium text-[15px]">
                A jewellery campaign created for Monarque Gold &amp; Diamond, pairing editorial photography with a series of social media films to showcase the brand's gold and diamond collection. Rings, chains, cufflinks, studs and bracelets are shot in close, deliberate detail — on hands, ears and necklines — so the craftsmanship and brilliance of each piece reads clearly.
              </p>
              <p className="text-neutral-600 leading-relaxed font-sans text-xs sm:text-sm">
                Styled against a clean, minimal studio backdrop, the campaign balances intimate macro detail with confident editorial portraiture, giving Monarque a content library built for its website, social channels and marketing across both men's and women's collections.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — SOCIAL FILMS */}
      <section id="monarque-films-sec" className="bg-neutral-50/60 py-16 md:py-24 px-6 md:px-12 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
              SOCIAL MEDIA CONTENT // {String(REELS.length).padStart(2, "0")} FILMS
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
              Campaign Films
            </h3>
            <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {REELS.map((reel, idx) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (idx % 6) * 0.06 }}
                onClick={() => setOpenReelIndex(idx)}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-neutral-900 shadow-sm"
                style={{ aspectRatio: "9/16" }}
              >
                <img
                  src={reel.thumbnail}
                  alt={`Monarque Gold & Diamond — ${reel.label}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/25">
                    <Play size={16} className="text-white translate-x-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="font-mono text-[8px] uppercase tracking-widest text-white/90 font-bold">
                    Film {String(idx + 1).padStart(2, "0")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — EDITORIAL PHOTO MASONRY */}
      <section id="monarque-gallery-sec" className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-10 md:space-y-14">
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
            EDITORIAL ARCHIVE // MONARQUE
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
            Jewellery Photography
          </h3>
          <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
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
                alt={`Monarque Gold & Diamond jewellery photography by Neorama Studios — frame ${String(idx + 1).padStart(2, "0")}`}
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

      {/* SECTION 5 — PROJECT DETAILS */}
      <section className="bg-neutral-50/50 py-24 md:py-32 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-neutral-200 rounded-3xl p-8 md:p-14 space-y-10 bg-white shadow-xs relative">
            <div className="absolute -top-3.5 left-10 bg-white px-4 border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-[0.2em] font-black rounded-full">
              Metadata Certificate // Active Logistics
            </div>

            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-5">
              Campaign Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Client //</span>
                <p className="font-sans text-[15px] font-extrabold text-neutral-900">Monarque Gold &amp; Diamond</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Industry //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-semibold">Fine Jewellery</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Services Rendered //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-medium">Jewellery Photography, Editorial Portraiture, Social Media Films</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Assets Delivered //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-medium">{GALLERY_IMAGES.length} Edited Stills, {REELS.length} Vertical Films</p>
              </div>

              <div className="md:col-span-2 space-y-3 pt-6 border-t border-neutral-100">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Deliverables Delivered //</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Jewellery Photography", "Editorial Portraiture", "Social Media Content", "Marketing Assets"].map((asset, index) => (
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

      {/* CTA */}
      <section className="bg-white py-16 md:py-20 px-6 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
            For Jewellery Brands
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-neutral-900 leading-none">
            Have a Collection to Showcase?
          </h3>
          <p className="font-sans text-sm text-neutral-500 max-w-lg mx-auto leading-relaxed">
            We shoot jewellery photography and social media films built to show off craftsmanship and brilliance. Tell us about your collection and let's plan the shoot.
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

      {/* SECTION 6 — RELATED PROJECTS */}
      <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
        <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">
                STUDIO DISCOVERY PORTAL //
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                Related Projects
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: "rani-pink-kirthi", title: "Rani Pink x Kirthi Diamond Jewellery", tag: "JEWELLERY FILM", desc: "A jewellery advertisement celebrating elegance, brilliance and craftsmanship.", img: relatedRaniThumb },
              { id: "linen-editorial-photography", title: "Linen & Linens | Summer & Festive Photography", tag: "EDITORIAL", desc: "Fashion and lifestyle photography across two seasonal collections.", img: relatedLinenThumb },
              { id: "adidas-bhavisha-kothari", title: "Adidas | Sports & Lifestyle Photography", tag: "CAMPAIGN", desc: "Sports and lifestyle photography celebrating movement and determination.", img: relatedAdidasThumb },
            ].map((rel) => (
              <div
                key={rel.id}
                onClick={() => goToProject(rel.id)}
                className="group relative rounded-xl overflow-hidden bg-neutral-900 aspect-[4/3] cursor-pointer shadow-xl border border-neutral-850 flex flex-col justify-end p-6"
              >
                <div className="absolute inset-0 bg-neutral-900">
                  <img src={rel.img} alt={rel.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-65 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2 text-left">
                  <div className="flex gap-2 items-center">
                    <span className="bg-white/15 text-white/90 border border-white/20 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">
                      {rel.tag}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                    {rel.title}
                  </h3>
                  <p className="font-sans text-[10px] text-neutral-400 select-none group-hover:text-white/90 transition-colors">
                    {rel.desc}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                    <span>EXPLORE PROJECT</span>
                    <ChevronRight size={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2026 NEORAMA STUDIO. ALL JEWELLERY CAMPAIGN PROOFS PROTECTED BY NDA.</p>
      </footer>

      {/* ═══════════════ PHOTO LIGHTBOX ═══════════════ */}
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
                  MONARQUE // ARCHIVE INSPECTOR
                </span>
                <p className="font-display text-xs font-black uppercase">
                  Jewellery Editorial // FRAME {String(photoIndex + 1).padStart(2, "0")}
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
                aria-label="Previous Frame"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={GALLERY_IMAGES[photoIndex]}
                      alt={`Monarque Gold & Diamond jewellery photography by Neorama Studios — frame ${String(photoIndex + 1).padStart(2, "0")}`}
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

            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">
                MONARQUE GOLD &amp; DIAMOND // JEWELLERY MASTER ARCHIVE
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

      {/* ═══════════════ REEL / FILM MODAL ═══════════════ */}
      <AnimatePresence>
        {openReelIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center select-none"
            onClick={() => setOpenReelIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setOpenReelIndex(null); }}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <X size={16} className="text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setOpenReelIndex((i) => (i === null ? i : (i - 1 + REELS.length) % REELS.length)); }}
              className="absolute left-4 md:left-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              aria-label="Previous Film"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenReelIndex((i) => (i === null ? i : (i + 1) % REELS.length)); }}
              className="absolute right-4 md:right-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
              aria-label="Next Film"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            <div className="relative flex flex-col items-center gap-5 w-full max-w-sm px-16 md:px-0" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl" style={{ aspectRatio: "9/16", maxHeight: "80vh" }}>
                <iframe
                  key={REELS[openReelIndex].id}
                  src={`https://player.vimeo.com/video/${REELS[openReelIndex].vimeoId}?autoplay=1&title=0&byline=0&portrait=0&color=3079D8`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`Monarque Gold & Diamond — ${REELS[openReelIndex].label}`}
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold text-[#3079D8]">
                  Monarque Gold &amp; Diamond // Social Media Content
                </p>
                <h3 className="font-display text-base font-extrabold text-white uppercase tracking-wide">
                  {REELS[openReelIndex].label}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
