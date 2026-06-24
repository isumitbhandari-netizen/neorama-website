import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  User, 
  Tag, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  Play
} from "lucide-react";
import { Project } from "../types";

// Local lookbook images representing the luxurious Linen & Linens Summer Collection photoshoot
// @ts-ignore
import summerImg1 from "../assets/images/regenerated_image_1780844703349.webp";
// @ts-ignore
import summerImg2 from "../assets/images/regenerated_image_1780844704935.webp";
// @ts-ignore
import summerImg3 from "../assets/images/regenerated_image_1780844705740.webp";
// @ts-ignore
import summerImg4 from "../assets/images/regenerated_image_1780844706891.webp";
// @ts-ignore
import summerImg5 from "../assets/images/regenerated_image_1780844707557.webp";
// @ts-ignore
import summerImg6 from "../assets/images/regenerated_image_1780844708249.webp";
// @ts-ignore
import summerImg7 from "../assets/images/regenerated_image_1780844708882.webp";
// @ts-ignore
import summerImg8 from "../assets/images/regenerated_image_1780844748489.webp";
// @ts-ignore
import festiveHeroImg from "../assets/images/regenerated_image_1780920612209.webp";
// @ts-ignore
import festiveLeftImg from "../assets/images/regenerated_image_1780920784625.webp";
// @ts-ignore
import festiveRightImg from "../assets/images/regenerated_image_1780920788786.webp";
// @ts-ignore
import festiveGrid1Img from "../assets/images/regenerated_image_1780921091119.webp";
// @ts-ignore
import festiveGrid2Img from "../assets/images/regenerated_image_1780921094066.webp";
// @ts-ignore
import festiveGrid3Img from "../assets/images/regenerated_image_1780921100290.webp";
// @ts-ignore
import festiveClosingImg from "../assets/images/regenerated_image_1780921103002.webp";

const IMAGES = {
  hero: summerImg8, // Best choice for Hero: stunning portrait/setting frame with highest definition
  summer: {
    fullWidth: summerImg1, // Look 01
    left: summerImg2,      // Look 02
    right: summerImg3,     // Look 03
    portrait: summerImg4,  // Look 04 Portrait study
    grid1: summerImg5,     // Textured detail 1
    grid2: summerImg6,     // Textured detail 2
    grid3: summerImg7      // Textured detail 3
  },
  festive: {
    hero: festiveHeroImg,
    left: festiveLeftImg,
    right: festiveRightImg,
    grid1: festiveGrid1Img,
    grid2: festiveGrid2Img,
    grid3: festiveGrid3Img,
    closing: festiveClosingImg
  }
};

// Flattened gallery photos for fullscreen Lightbox
const GALLERY_PHOTOS = [
  { url: IMAGES.hero, title: "Campaign Opening Visual", sub: "Signature linen drape" },
  { url: IMAGES.summer.fullWidth, title: "Summer Cover", sub: "Material folds & morning shadows" },
  { url: IMAGES.summer.left, title: "Summer Style I", sub: "Breathable vacation cottons" },
  { url: IMAGES.summer.right, title: "Summer Style II", sub: "Folded craft and linen apparel" },
  { url: IMAGES.summer.portrait, title: "Editorial Portrait", sub: "Clean framing & organic focus" },
  { url: IMAGES.summer.grid1, title: "Fabric Detail I", sub: "Sand-texture close-up study" },
  { url: IMAGES.summer.grid2, title: "Lifestyle Atmosphere", sub: "Serene bedroom setups" },
  { url: IMAGES.summer.grid3, title: "Fabric Detail II", sub: "Light cotton interactions" },
  { url: IMAGES.festive.hero, title: "Festive Collection Lead", sub: "Traditional textures & rich fibers" },
  { url: IMAGES.festive.left, title: "Festive Style I", sub: "Mid-day shadows across linen drapes" },
  { url: IMAGES.festive.right, title: "Festive Craftsmanship Detail", sub: "Warm pottery & textured walls" },
  { url: IMAGES.festive.grid1, title: "Fabric Detail III", sub: "Organic raw flax flax fibers" },
  { url: IMAGES.festive.grid2, title: "Fabric Detail IV", sub: "Intricate weaves with premium finish" },
  { url: IMAGES.festive.grid3, title: "Styling Detail V", sub: "Traditional folds and drape aesthetic" },
  { url: IMAGES.festive.closing, title: "Campaign Epilogue", sub: "Warm evening architectural light" }
];

interface PhotographyCaseStudyProps {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function PhotographyCaseStudy({ onClose, onSelectProjectById }: PhotographyCaseStudyProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Keyboard navigation ref and touch gestures for swipe
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Lock body scroll of parent background if needed
    document.body.style.overflow = "hidden";
    
    // Track local scroll for simple parallax effects
    const container = document.getElementById("case-study-page-wrapper");
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

  // Mobile swipe support implementations
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50; // pixels
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div 
      id="case-study-page-wrapper"
      className="fixed inset-0 z-50 bg-pure-white text-[#2a2c30] overflow-y-auto selection:bg-[#3079D8] selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      
      {/* GLOBAL FLOATING NAVIGATION BACK TRIGGER */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={onClose}
          className="group flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-pure-white/95 text-neutral-950 font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl border border-neutral-200/40 hover:bg-neutral-950 hover:text-pure-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Case Study</span>
        </button>
      </div>

      {/* SECTION 1 — HERO WITH PARALLAX IMPACT */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-neutral-950 select-none">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - Math.min(scrollY / 700, 0.7)
          }}
        >
          <img 
            src={IMAGES.hero} 
            alt="Linen & Linens Editorial" 
            className="w-full h-full object-cover brightness-[0.82]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/15" />
        </div>

        {/* Hero Title Container */}
        <div className="relative z-10 text-center text-pure-white max-w-5xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-pure-white/95 font-bold">
              Fashion & Lifestyle Photography
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-pure-white tracking-tight uppercase leading-none md:mb-6"
          >
            Linen & Linens
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-mono text-xs sm:text-sm tracking-[0.25em] text-pure-white/80 font-semibold"
          >
            SUMMER & FESTIVE CAMPAIGN STILLS
          </motion.p>
        </div>

        {/* Scroll indicator banner */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-pure-white/60 text-[9px] font-mono uppercase tracking-[0.2em] font-bold">
          <span>Scroll to Read //</span>
          <div className="w-[1px] h-10 bg-pure-white/30 relative overflow-hidden">
            <span className="absolute top-0 left-0 w-full h-1/2 bg-pure-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROJECT OVERVIEW */}
      <section className="bg-pure-white py-24 md:py-36 max-w-6xl mx-auto px-6 md:px-12 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Headline Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-extrabold block">
              LOOKBOOK CHAPTER // 01
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tight leading-none">
              Project <br />
              Overview
            </h2>
            
            {/* Quick Metadata tags */}
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-105">
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Client //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Linen and Linens</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Industry //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Fashion & Lifestyle</p>
              </div>
              <div className="col-span-2 pt-2">
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-extrabold">Services //</p>
                <p className="font-sans text-xs font-semibold text-neutral-800">Fashion Photography, Lifestyle Photography, Creative Direction</p>
              </div>
            </div>
          </div>

          {/* Description Paragraph Column */}
          <div className="lg:col-span-7 space-y-6 text-neutral-600 font-sans text-sm md:text-base leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-[#3079D8] first-letter:mr-3 first-letter:float-left first-letter:mt-1">
              A premium fashion and lifestyle photography project created for Linen and Linens, showcasing both the Summer and Festive Collections through elegant visual storytelling. The shoot was designed to capture the versatility of the brand across seasons—highlighting the lightness, comfort, and effortless sophistication of the summer range alongside the warmth, richness, and celebratory spirit of the festive collection.
            </p>
            <p>
              Through natural light, refined styling, thoughtful compositions, and attention to fabric textures, the imagery presents a cohesive brand narrative that balances contemporary living with timeless elegance. The photographs were created for use across digital platforms, marketing campaigns, social media, e-commerce, and brand communications.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — CURATED EDITORIAL GALLERY WITH COLLECTION SEPARATORS */}
      <section className="bg-pure-white py-16">
        
        {/* ======================================= */}
        {/* SUBSECTION A: SUMMER COLLECTION */}
        {/* ======================================= */}
        <div className="space-y-24 md:space-y-36">
          
          {/* Visual separations header */}
          <div className="max-w-4xl mx-auto text-center px-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-extrabold block mb-3">
              CHAPTER ONE //
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-extrabold text-[#2a2c30] uppercase tracking-wider mb-4">
              The Summer Collection
            </h3>
            <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
          </div>

          {/* 1. Large Full Width Lifestyle Image */}
          <div className="max-w-[1440px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-neutral-100 group shadow-sm"
            >
              <img 
                src={IMAGES.summer.fullWidth} 
                alt="Summer Collection Lifestyle Full" 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                style={{ height: "1600px" }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 text-pure-white hidden sm:block">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#3079D8]">LOOK 01 / AMBIENT MORNING</p>
                <p className="font-display text-sm font-semibold tracking-wide">Flowing linen drapes captured under soft East-facing skylights.</p>
              </div>
            </motion.div>
          </div>

          {/* 2. Two Images Side by Side */}
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="space-y-4"
            >
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 group">
                <img 
                  src={IMAGES.summer.left} 
                  alt="Summer Look Detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">LOOK 02 // OUTDOOR FOLIAGE</span>
                <p className="font-sans text-xs text-neutral-600">Pure luxury cottons blending with warm organic shadows.</p>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="space-y-4 md:mt-16"
            >
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 group">
                <img 
                  src={IMAGES.summer.right} 
                  alt="Summer Material folded" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">LOOK 03 // FOLD INTERACTION</span>
                <p className="font-sans text-xs text-neutral-600">Tangible textile study representing lightweight, airy comfort.</p>
              </div>
            </motion.div>

          </div>

          {/* 3. Large Editorial Portrait (Spacious styling) */}
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-sm relative group">
                <img 
                  src={IMAGES.summer.portrait} 
                  alt="Large Editorial Portrait" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-pure-white/90 backdrop-blur-md rounded font-mono text-[9px] text-neutral-800 border border-neutral-200 uppercase tracking-widest font-black">
                  MIDDLE-FORMAT RETOUCHED FRAME
                </div>
              </div>
              <div className="text-center max-w-xl mx-auto space-y-1.5">
                <p className="font-mono text-[10px] text-[#3079D8] tracking-[0.2em] uppercase font-bold">PORTRAIT STUDY / LACE SILHOUETTE</p>
                <h4 className="font-display text-sm font-semibold text-neutral-800">A deliberate study of negative whitespace and soft human interaction.</h4>
              </div>
            </motion.div>
          </div>

          {/* 4. Three Detail Images in Grid */}
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-100 pb-3">
              <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-neutral-400">MICRO-TEXTURE FOCUS GRIDS //</span>
              <span className="font-mono text-[9px] text-neutral-400">FRAMES #04 - #06</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[IMAGES.summer.grid1, IMAGES.summer.grid2, IMAGES.summer.grid3].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-100 group shadow-xs border border-neutral-100"
                >
                  <img 
                    src={img} 
                    alt={`Summer detail image ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Short divider text */}
          <div className="py-20 md:py-28 bg-[#fdfdfd] border-y border-neutral-100/50 text-center px-6">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display font-medium text-lg sm:text-2xl text-neutral-800 tracking-wider uppercase max-w-3xl mx-auto leading-relaxed"
            >
              "Light, breathable, and designed for effortless summer living."
            </motion.p>
          </div>

        </div>

        {/* ======================================= */}
        {/* SUBSECTION B: FESTIVE COLLECTION */}
        {/* ======================================= */}
        <div className="space-y-24 md:space-y-36 pt-24">
          
          {/* Chapter separation header */}
          <div className="max-w-4xl mx-auto text-center px-6">
            <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-extrabold block mb-3">
              CHAPTER TWO //
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-extrabold text-[#2a2c30] uppercase tracking-wider mb-4">
              The Festive Collection
            </h3>
            <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
          </div>

          {/* 1. Large Hero Image */}
          <div className="max-w-[1440px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9 }}
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 group shadow-sm"
            >
              <img 
                src={IMAGES.festive.hero} 
                alt="Festive Collection Large Setup" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-neutral-900/90 backdrop-blur-md rounded text-pure-white border border-neutral-700/50 text-[10px] font-mono tracking-widest uppercase">
                Campaign Showcase Frame
              </div>
            </motion.div>
          </div>

          {/* 2. Two Lifestyle Images Side by Side */}
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Left Frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="space-y-4"
            >
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 group">
                <img 
                  src={IMAGES.festive.left} 
                  alt="Festive Weave Detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">LOOK 04 // WARM FLAX INTERACTION</span>
                <p className="font-sans text-xs text-neutral-600">Celebrating gold shadows cascading over deep traditional weaves.</p>
              </div>
            </motion.div>

            {/* Right Frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="space-y-4 md:mt-16"
            >
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-100 group">
                <img 
                  src={IMAGES.festive.right} 
                  alt="Interior Pottery Detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#727784] uppercase tracking-wider block">LOOK 05 // ARCHITECTURAL CORNER</span>
                <p className="font-sans text-xs text-neutral-600">Aesthetic lifestyle integration framing linen textures on clay pottery.</p>
              </div>
            </motion.div>

          </div>

          {/* 3. Three Detail Images Grid */}
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            <div className="flex justify-between items-end border-b border-neutral-100 pb-3">
              <span className="font-mono text-[10px] uppercase font-extrabold tracking-widest text-neutral-400">ORGANIC EMBROIDERY DETAIL GRIDS //</span>
              <span className="font-mono text-[9px] text-neutral-400">FRAMES #07 - #09</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[IMAGES.festive.grid1, IMAGES.festive.grid2, IMAGES.festive.grid3].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-100 group shadow-xs border border-neutral-100"
                >
                  <img 
                    src={img} 
                    alt={`Festive detail image ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Large Closing Image */}
          <div className="max-w-[1300px] mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-100 shadow-md group relative"
            >
              <img 
                src={IMAGES.festive.closing} 
                alt="Festive Closing Image" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
            </motion.div>
          </div>

          {/* Short divider text */}
          <div className="py-20 md:py-28 bg-[#fbfbfa] border-y border-neutral-100/50 text-center px-6">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="font-display font-medium text-lg sm:text-2xl text-neutral-800 tracking-wider uppercase max-w-3xl mx-auto leading-relaxed"
            >
              "Celebrating craftsmanship, texture, and timeless festive elegance."
            </motion.p>
          </div>

        </div>

      </section>

      {/* SECTION 4 — VIEW FULL COLLECTION WITH DETAILED LIGHTBOX DISPLAY */}
      <section className="bg-neutral-950 py-32 text-center text-pure-white transition-colors duration-300 relative overflow-hidden">
        
        {/* Background blurry sphere ornament */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#3079D8]/10 blur-[130px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto px-6 space-y-6">
          <span className="font-mono text-xs text-[#3079D8] tracking-[0.3em] uppercase block font-bold">
            HIGH-RES COLLECTION PROOFS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Curated Gallery Archive
          </h2>
          <p className="font-sans text-xs text-pure-white/70 max-w-md mx-auto leading-relaxed">
            Examine all 15 raw editorial captures, texture studies, and lighting arrangements in full-bleed display mode.
          </p>
          
          <button
            onClick={() => {
              setCurrentPhotoIndex(0);
              setLightboxOpen(true);
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pure-white text-[#2a2c30] font-mono text-[11px] uppercase font-bold tracking-widest cursor-pointer shadow-lg hover:bg-[#3079D8] hover:text-pure-white transition-all duration-300 hover:scale-[1.04]"
          >
            <span>View Full Gallery</span>
            <Maximize2 size={13} className="text-[#3079D8] group-hover:text-pure-white transition-colors" />
          </button>
        </div>
      </section>

      {/* SECTION 5 — CLIENT DETAILS REPORT */}
      <section className="bg-pure-white py-24 md:py-32 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border border-neutral-200/90 rounded-2xl p-8 md:p-14 space-y-8 bg-neutral-50/40 relative">
            
            <div className="absolute -top-3 left-8 bg-pure-white px-4 border border-neutral-200 text-neutral-800 font-mono text-[9px] uppercase tracking-widest font-black rounded-full">
              Metadata Record // Campaign Sheet
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold block">Client //</span>
                <p className="font-display text-[15px] font-extrabold text-neutral-800 uppercase tracking-wide">Linen and Linens</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold block">Project Type //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-medium">Summer & Festive Collection Photography</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold block">Industry //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-medium">Fashion & Lifestyle</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold block">Delivery Year //</span>
                <p className="font-mono text-[14px] text-neutral-800 font-bold">2025</p>
              </div>

              <div className="md:col-span-2 space-y-1.5 border-t border-neutral-200/60 pt-6">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-extrabold block">Deliverables Delivered //</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Fashion Photography", 
                    "Lifestyle Photography", 
                    "Marketing Assets", 
                    "Social Media Content", 
                    "E-commerce Imagery"
                  ].map((asset, index) => (
                    <span key={index} className="bg-neutral-100 text-neutral-700 font-sans text-xs px-3 py-1.5 rounded-lg border border-neutral-200/50 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {asset}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — RELATED PROJECTS CROSS-HYPERLINKS */}
      <section className="bg-neutral-900 py-24 md:py-36 text-pure-white border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.2em] font-extrabold block">Explore More Campaign Units //</span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">Related Production Chapters</h2>
            </div>
            <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "linen-luxury-brand",
                title: "Linen & Linens | Luxury Brand Film",
                category: "Ads & Corporate Films",
                desc: "Cinematic narrative exploring material honesty & weavers craft.",
                tag: "Brand Film",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "linen-fashion-campaign",
                title: "Linen & Linens | Fashion Film Campaign",
                category: "Ads & Corporate Films",
                desc: "A rhythmic digital cinema sequence showcasing textile drapes.",
                tag: "Fashion Campaign",
                img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
              },
              {
                id: "rani-pink-kirthi",
                title: "Rani Pink x Kirthi Diamond Jewellery",
                category: "Ads & Corporate Films",
                desc: "Luxury ornament campaign celebrating hand-sourced stones.",
                tag: "Jewellery Film",
                img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
              }
            ].map((rel) => (
              <div 
                key={rel.id}
                onClick={() => {
                  // Exit the photography case study, and immediately cue/open the clicked project!
                  onClose();
                  // We delays slightly to let state update gracefully
                  setTimeout(() => {
                    onSelectProjectById(rel.id);
                  }, 180);
                }}
                className="group relative rounded-xl overflow-hidden bg-neutral-950 aspect-[4/3] cursor-pointer shadow-lg border border-neutral-800 flex flex-col justify-end p-6"
              >
                <div className="absolute inset-0 bg-neutral-950">
                  <img src={rel.img} alt={rel.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                
                <div className="relative z-10 space-y-2 text-left">
                  <div className="flex gap-2 items-center">
                    <span className="bg-[#3079D8]/50 text-white font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest">
                      {rel.tag}
                    </span>
                    <span className="text-neutral-400 font-mono text-[8px] uppercase">
                      Cinema Link
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-pure-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                    {rel.title}
                  </h3>
                  <p className="font-sans text-[10px] text-neutral-400 select-none group-hover:text-pure-white/90 transition-colors">
                    {rel.desc}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1 font-mono text-[8px] uppercase text-[#3079D8] font-bold tracking-widest group-hover:gap-2 transition-all">
                    <span>PLAY CINEMATIC MASTER</span>
                    <Play size={8} fill="currentColor" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ACCENTS */}
      <footer className="bg-neutral-950 py-16 text-center text-neutral-500 border-t border-neutral-900/50 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2026 NEORAMA STUDIO. ALL STILLS AND LOOKBOOKS RESERVED PROOFS.</p>
      </footer>

      {/* ======================================= */}
      {/* SECTION 4 - LIGHTBOX IMPLEMENTATION */}
      {/* ======================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0d0e11] flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-pure-white mb-2 pt-2 z-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9px] uppercase tracking-widest block font-bold">
                  NEORAMA IMAGE ARCHIVE INSPECTOR //
                </span>
                <p className="font-display text-xs font-semibold">
                  {GALLERY_PHOTOS[currentPhotoIndex].title}
                </p>
              </div>

              {/* Fractional counter */}
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-pure-white/5 border border-pure-white/10">
                FRAME {String(currentPhotoIndex + 1).padStart(2, '0')} // {String(GALLERY_PHOTOS.length).padStart(2, '0')}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2.5 rounded-full bg-pure-white/5 border border-pure-white/10 hover:bg-[#3079D8] hover:text-pure-white transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={16} />
              </button>
            </div>

            {/* Middle Main Picture Zone */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              
              {/* Previous Click Arrow Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2 md:left-6 p-3 rounded-full bg-pure-white/5 hover:bg-[#3079D8] hover:scale-105 text-pure-white transition-all border border-pure-white/10 cursor-pointer hidden sm:flex"
                aria-label="Previous Frame"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Main Photo Visual display */}
              <div className="max-h-[70vh] max-w-[90vw] aspect-auto relative rounded-xl overflow-hidden shadow-2xl border border-pure-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhotoIndex}
                    src={GALLERY_PHOTOS[currentPhotoIndex].url}
                    alt={GALLERY_PHOTOS[currentPhotoIndex].title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Next Click Arrow Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-pure-white/5 hover:bg-[#3079D8] hover:scale-105 text-pure-white transition-all border border-pure-white/10 cursor-pointer hidden sm:flex"
                aria-label="Next Frame"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="text-center font-mono text-neutral-400 py-2 space-y-2 z-10 border-t border-pure-white/10">
              <p className="text-[9px] tracking-widest text-[#727784] uppercase">
                {GALLERY_PHOTOS[currentPhotoIndex].sub} // 16-BIT UHD PROOF
              </p>
              
              <div className="flex items-center justify-center gap-6 text-[9px] tracking-widest uppercase">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Swipe left/right to browse
                </span>
                <span className="inline-flex items-center gap-1 hidden md:inline-flex">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                  Arrow keys active
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  RAW Space
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
