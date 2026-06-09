import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  Tag, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Project } from "../types";
// @ts-ignore
import regeneratedCampaignImage from "../assets/images/regenerated_image_1780922703682.webp";
// @ts-ignore
import regeneratedPourImage from "../assets/images/regenerated_image_1780922896337.webp";
// @ts-ignore
import regeneratedFlatlayImage from "../assets/images/regenerated_image_1780922897931.webp";
// @ts-ignore
import regeneratedRow4_1Image from "../assets/images/regenerated_image_1780923202738.webp";
// @ts-ignore
import regeneratedRow4_2Image from "../assets/images/regenerated_image_1780923204247.webp";
// @ts-ignore
import regeneratedRow4_3Image from "../assets/images/regenerated_image_1780923205617.webp";
// @ts-ignore
import relatedLinenThumb from "../assets/images/regenerated_image_1780844748489.jpg";
// @ts-ignore
import relatedAdidasThumb from "../assets/images/regenerated_image_1780924734124.jpg";
// @ts-ignore
import relatedSimhayanaThumb from "../assets/images/simhayana_knotted_thumb.jpg";

// Curated high-fidelity Unsplash images representing Raw Pressery's vibrant commercial campaign
const IMAGES = {
  hero: regeneratedCampaignImage,
  row2_1: regeneratedPourImage,
  row2_2: regeneratedFlatlayImage,
  row4_1: regeneratedRow4_1Image,
  row4_2: regeneratedRow4_2Image,
  row4_3: regeneratedRow4_3Image
};

// Curated list of details/proof numbers for the Lightbox
const GALLERY_PHOTOS = [
  { url: IMAGES.hero, title: "Campaign Lead Art", sub: "Vibrant single bottle with sun-cast palm shadows" },
  { url: IMAGES.row2_1, title: "Pouring Splash Study", sub: "Dynamic motion capture of organic juice stream" },
  { url: IMAGES.row2_2, title: "Styled Harvest Flatlay", sub: "Minimalist layout of raw mangoes and fresh mint for Aam Panna" },
  { url: IMAGES.row4_1, title: "Coconut Water Scrabble", sub: "Coconut water bottle styled elegantly around a classic scrabble board setup" },
  { url: IMAGES.row4_2, title: "Pink Guava Chilli", sub: "Refreshingly styled pink guava chilli juice bottle resting on a bed of crushed ice" },
  { url: IMAGES.row4_3, title: "Valencia Oranges", sub: "Valencia orange juice bottle arranged alongside whole fresh oranges kept on natural wood" }
];

interface RawPresseryCaseStudyProps {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function RawPresseryCaseStudy({ onClose, onSelectProjectById }: RawPresseryCaseStudyProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Lock body scroll of parent background
    document.body.style.overflow = "hidden";
    
    const container = document.getElementById("raw-pressery-page-wrapper");
    const handleScroll = () => {
      if (container) {
        setScrollY(container.scrollTop);
      }
    };
    
    container?.addEventListener("scroll", handleScroll);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
      if (lightboxOpen) {
        if (e.key === "ArrowRight") {
          handleNextPhoto();
        }
        if (e.key === "ArrowLeft") {
          handlePrevPhoto();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, currentPhotoIndex]);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % GALLERY_PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartX.current = null;
  };

  const openLightboxAtIndex = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div 
      id="raw-pressery-page-wrapper"
      className="fixed inset-0 z-50 bg-pure-white text-[#2a2c30] overflow-y-auto selection:bg-[#3079D8] selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      
      {/* GLOBAL FLOATING EXIT COMMAND */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={onClose}
          className="group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-pure-white/95 text-neutral-950 font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl border border-neutral-200/40 hover:bg-neutral-950 hover:text-pure-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Case Study</span>
        </button>
      </div>

      {/* SECTION 1 — HERO */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-950 select-none">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transform: `translateY(${scrollY * 0.28}px)`,
            opacity: 1 - Math.min(scrollY / 800, 0.7)
          }}
        >
          <img 
            src={IMAGES.hero} 
            alt="Raw Pressery Commercial Hero" 
            className="w-full h-full object-cover brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />
        </div>

        {/* Hero Headline Overlay */}
        <div className="relative z-10 text-center text-pure-white max-w-5xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-pure-white/95 font-bold">
              Product & Lifestyle Photography
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8] animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-pure-white tracking-tight uppercase leading-none md:mb-5"
          >
            Raw Pressery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.6 }}
            className="font-mono text-xs sm:text-sm tracking-[0.22em] text-pure-white/80 font-semibold"
          >
            COMMERCIAL & CAMPAIGN CASE STUDY
          </motion.p>
        </div>

        {/* Dynamic Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-pure-white/60 text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
          <span>Scroll to Read //</span>
          <div className="w-[1px] h-8 bg-pure-white/30 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-pure-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROJECT OVERVIEW */}
      <section className="bg-pure-white py-24 md:py-36 max-w-6xl mx-auto px-6 md:px-12 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Symmetrical Left Column with Quick Facts metadata */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-extrabold block">
              LIFESTYLE INJECTION // AESTHETIC 01
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight leading-none">
              Commercial <br />
              Overview
            </h2>
            
            {/* Quick Metadata Info Grid */}
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-100">
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Client //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Raw Pressery</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Industry //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Food & Beverage</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-50">
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Category //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Product & Lifestyle Photography</p>
              </div>
            </div>
          </div>

          {/* Symmetrical Right Column with Overview Paragraph */}
          <div className="lg:col-span-7 space-y-6 text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#3079D8] first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              A commercial photography project created for Raw Pressery, designed to showcase the brand's vibrant identity, premium product range, and refreshing lifestyle appeal. Through clean compositions, thoughtful styling, and attention to detail, the imagery highlights the quality, freshness, and visual character of the products while maintaining a modern and engaging aesthetic.
            </p>
            <p>
              The photographs were created for digital marketing, social media, brand communication, and promotional campaigns, helping strengthen Raw Pressery's visual presence across multiple platforms. Every frame is highly calibrated to isolate key ingredient colors, using dynamic sun shadows and glass refractions to communicate refreshing pure textures.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — EDITORIAL PHOTO SHOWCASE */}
      <section className="bg-pure-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* Curated Separator Label */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <span className="font-mono text-[10px] tracking-widest text-[#727784] uppercase">
            CHAPTER 02 // CAMPAIGN IMAGERY
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            6 CURATED PROOF FRAMES // ISO 100
          </span>
        </div>

        {/* Row 1: One large full-width hero image */}
        <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(0)}>
          <img 
            src={IMAGES.hero} 
            alt="Raw Pressery Hero Wide Frame" 
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            style={{ height: "700px" }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-500" />
          <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 size={15} />
          </div>
          <div className="absolute bottom-6 left-6 text-pure-white z-10 hidden sm:block">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/70">LOOK 01 // OVERVIEW HERO</p>
            <p className="font-display font-bold text-lg">Lead Artwork - Sun casts and marble pedestals</p>
          </div>
        </div>

        {/* Row 2: Two images side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(1)}>
            <img 
              src={IMAGES.row2_1} 
              alt="Raw Pressery Shot 2" 
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ height: "550px" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={15} />
            </div>
            <div className="absolute bottom-6 left-6 text-pure-white z-10 hidden sm:block">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/70">LOOK 02 // DYNAMIC SPLASH</p>
              <p className="font-display font-medium text-base">Pure Citrus Pouring - Dynamic liquid study</p>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(2)}>
            <img 
              src={IMAGES.row2_2} 
              alt="Raw Pressery Shot 3" 
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{ height: "550px" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={15} />
            </div>
            <div className="absolute bottom-6 left-6 text-pure-white z-10 hidden sm:block">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/70">LOOK 03 // MINIMAL FLATLAY</p>
              <p className="font-display font-medium text-base">Aesthetic components - Raw mangoes, fresh mint, and spices for Aam Panna</p>
            </div>
          </div>

        </div>

        {/* Row 4: Three images displayed in a clean grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          
          <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(3)}>
            <img 
              src={IMAGES.row4_1} 
              alt="Coconut Water around Scrabble Board" 
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ height: "450px" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={14} />
            </div>
            <div className="absolute bottom-4 left-4 text-pure-white z-10 hidden sm:block">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/75">LOOK 04 // COCONUT SCRABBLE</p>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(4)}>
            <img 
              src={IMAGES.row4_2} 
              alt="Pink Guava Chilli on Ice" 
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ height: "450px" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={14} />
            </div>
            <div className="absolute bottom-4 left-4 text-pure-white z-10 hidden sm:block">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/75">LOOK 05 // GUAVA CHILLI ON ICE</p>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden cursor-zoom-in bg-neutral-950" onClick={() => openLightboxAtIndex(5)}>
            <img 
              src={IMAGES.row4_3} 
              alt="Valencia Oranges on Wood" 
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{ height: "450px" }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/90 shadow text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-305">
              <Maximize2 size={14} />
            </div>
            <div className="absolute bottom-4 left-4 text-pure-white z-10 hidden sm:block">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/75">LOOK 06 // VALENCIA ON WOOD</p>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 4 — PROJECT DETAILS */}
      <section className="bg-[#fcfcfd] border-y border-neutral-100 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-xs text-[#3079D8] tracking-widest uppercase font-extrabold block mb-8 text-center md:text-left">
            PROJECT SPECS & EXECUTION
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            
            <div className="text-center md:text-left space-y-2">
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold">Client //</p>
              <p className="font-display font-extrabold text-base text-neutral-900">Raw Pressery</p>
              <p className="font-sans text-[11px] text-[#727784]">Cold-pressed juice pioneer</p>
            </div>

            <div className="text-center md:text-left space-y-2">
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold">Industry //</p>
              <p className="font-display font-extrabold text-base text-neutral-900">Food & Beverage</p>
              <p className="font-sans text-[11px] text-[#727784]">Premium FMCG segment</p>
            </div>

            <div className="text-center md:text-left space-y-2">
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold">Services //</p>
              <div className="space-y-1">
                <p className="font-display font-extrabold text-base text-neutral-900">Creative Production</p>
                <p className="font-sans text-[11px] text-[#727784]">Commercial & Lifestyle Photography</p>
              </div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold">Deliverables //</p>
              <div className="space-y-1">
                <p className="font-display font-extrabold text-base text-neutral-900">Campaign Stills</p>
                <p className="font-sans text-[11px] text-[#727784]">Marketing Assets, Social Content, Brand Assets</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — RELATED PHOTOGRAPHY PROJECTS */}
      <section className="bg-pure-white py-24 md:py-32 border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-extrabold block">
              MORE FROM THE ARCHIVE
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-black text-neutral-950 uppercase tracking-tight">
              Related Photography Projects
            </h3>
            <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
              explore similar editorial campaigns from neorama
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">

            {[
              { id: "linen-editorial-photography", thumb: relatedLinenThumb, tag: "FASHION STUDY", title: "Linen and Linens | Summer & Festive Collection Photography", sub: "Fashion & Lifestyle Photography" },
              { id: "adidas-bhavisha-kothari", thumb: relatedAdidasThumb, tag: "SPORTS WORK", title: "Adidas | Sports & Lifestyle Photography", sub: "Sports & Lifestyle Photography" },
              { id: "simhayana-knotted-photography", thumb: relatedSimhayanaThumb, tag: "CREATOR CONTENT", title: "knotted.in × Simhayana | Influencer-Led Brand Photography", sub: "Fashion, Lifestyle & Creator Content Photography" },
            ].map((rel) => (
              <article
                key={rel.id}
                onClick={() => onSelectProjectById(rel.id)}
                className="group space-y-4 cursor-pointer"
              >
                <div className="aspect-[3/2] rounded-xl overflow-hidden bg-neutral-100 relative shadow-sm border border-neutral-200/50">
                  <img
                    src={rel.thumb}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 bg-pure-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono tracking-wider font-extrabold">
                    {rel.tag}
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-base text-neutral-900 group-hover:text-[#3079D8] transition-colors leading-tight">
                    {rel.title}
                  </h4>
                  <p className="font-mono text-[9px] text-[#727784] uppercase tracking-wider">
                    {rel.sub}
                  </p>
                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX GALARY portal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#090b0e] flex flex-col justify-between select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Toolbar Navigation control bar */}
            <div className="z-10 flex items-center justify-between px-6 md:px-10 py-6 border-b border-pure-white/10 text-pure-white">
              
              <div className="space-y-0.5 max-w-[70%]">
                <p className="font-mono text-[9px] tracking-widest text-[#727784] uppercase">Raw Pressery Case Proof</p>
                <h4 className="font-display font-bold text-sm tracking-tight truncate">
                  {GALLERY_PHOTOS[currentPhotoIndex].title}
                </h4>
              </div>

              {/* Fractional counter */}
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-pure-white/5 border border-pure-white/10">
                FRAME {String(currentPhotoIndex + 1).padStart(2, '0')} // {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              </div>

              {/* Close Button UI tool */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-full bg-pure-white/5 border border-pure-white/10 hover:bg-[#3079D8] hover:text-pure-white transition-all cursor-pointer shadow-lg"
                aria-label="Close Lightbox"
              >
                <X size={15} />
              </button>
            </div>

            {/* Middle Frame Display section */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 md:left-6 p-3 rounded-full bg-pure-white/5 hover:bg-[#3079D8] hover:scale-105 text-pure-white transition-all border border-pure-white/10 cursor-pointer hidden sm:flex"
                aria-label="Previous Frame"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="max-h-[70vh] max-w-[90vw] aspect-auto relative rounded-xl overflow-hidden shadow-2xl border border-pure-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhotoIndex}
                    src={GALLERY_PHOTOS[currentPhotoIndex].url}
                    alt={GALLERY_PHOTOS[currentPhotoIndex].title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="w-full h-full max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              <button
                onClick={handleNextPhoto}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-pure-white/5 hover:bg-[#3079D8] hover:scale-105 text-pure-white transition-all border border-pure-white/10 cursor-pointer hidden sm:flex"
                aria-label="Next Frame"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Bottom Status Info details bar */}
            <div className="text-center font-mono text-neutral-400 py-4 space-y-2 z-10 border-t border-pure-white/10 bg-[#07090b]">
              <p className="text-[9px] tracking-widest text-[#727784] uppercase">
                {GALLERY_PHOTOS[currentPhotoIndex].sub} // 16-BIT UHD RAW DIGITAL PROOF
              </p>
              
              <div className="flex items-center justify-center gap-6 text-[9px] tracking-widest uppercase">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  Swipe left/right to browse
                </span>
                <span className="inline-flex items-center gap-1 hidden md:inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                  Arrow keys active
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Pure Commercial Stills
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
