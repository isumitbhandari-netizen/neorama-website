import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown
} from "lucide-react";

// @ts-ignore
import adidasCampaignPhoto from "../assets/images/regenerated_image_1780924734124.webp";
// @ts-ignore
import relatedRawPresseryThumb from "../assets/images/regenerated_image_1780922541314.webp";
// @ts-ignore
import relatedLinenThumb from "../assets/images/regenerated_image_1780844748489.webp";
// @ts-ignore
import relatedSimhayanaThumb from "../assets/images/simhayana_knotted_thumb.webp";
// @ts-ignore
import row1_1_img from "../assets/images/regenerated_image_1780925148500.webp";
// @ts-ignore
import row1_2_img from "../assets/images/regenerated_image_1780925151098.webp";
// @ts-ignore
import row1_3_img from "../assets/images/regenerated_image_1780925160236.webp";
// @ts-ignore
import row2_feat_img from "../assets/images/regenerated_image_1780925280133.webp";
// @ts-ignore
import row3_1_img from "../assets/images/regenerated_image_1780925437323.webp";
// @ts-ignore
import row3_2_img from "../assets/images/regenerated_image_1780925439543.webp";
// @ts-ignore
import row4_land_img from "../assets/images/regenerated_image_1780925813789.webp";
// @ts-ignore
import row5_1_img from "../assets/images/regenerated_image_1780925816430.webp";
// @ts-ignore
import row5_2_img from "../assets/images/regenerated_image_1780926071809.webp";
// @ts-ignore
import row5_3_img from "../assets/images/regenerated_image_1780926073591.webp";
// @ts-ignore
import row6_closing_img from "../assets/images/regenerated_image_1780926080619.webp";

const IMAGES = {
  hero: adidasCampaignPhoto,
  row1_1: row1_1_img,
  row1_2: row1_2_img,
  row1_3: row1_3_img,
  row2_feat: row2_feat_img,
  row3_1: row3_1_img,
  row3_2: row3_2_img,
  row4_land: row4_land_img,
  row5_1: row5_1_img,
  row5_2: row5_2_img,
  row5_3: row5_3_img,
  row6_closing: row6_closing_img,
};

// Flattened campaign frames mapping to the exact 11 shots + captions for high-end digital agency layout
const STRIDE_GALLERY = [
  { url: IMAGES.row1_1, title: "01 // THE IGNITION STRETCH", sub: "Warm-up sequence capturing muscle readiness & focus.", category: "MINDSET" },
  { url: IMAGES.row1_2, title: "02 // PERFORMANCE IMPACT", sub: "High-intensity training pose framing athletic posture.", category: "DISCIPLINE" },
  { url: IMAGES.row1_3, title: "03 // MOMENTUM STILL", sub: "Grip selection & footwear locking, highlighting equipment precision.", category: "GEAR" },
  { url: IMAGES.row2_feat, title: "04 // RUNNING IN MOTION (LEAD)", sub: "Dynamic high-speed stride tracking on sun-cast pathways.", category: "MOVEMENT" },
  { url: IMAGES.row3_1, title: "05 // STRENGTH ANCHOR", sub: "Isometric posture highlighting core stability and power.", category: "DISCIPLINE" },
  { url: IMAGES.row3_2, title: "06 // RHYTHM INHALATION", sub: "Determined expression and breath pacing under ambient spotlighting.", category: "MINDSET" },
  { url: IMAGES.row4_land, title: "07 // THE TRACK OVERTAKE", sub: "Low-angle speed study, capturing explosive energy transfer.", category: "PERFORMANCE" },
  { url: IMAGES.row5_1, title: "08 // PRE-LAUNCH READYNESS", sub: "Athlete blocked squarely at starting posture under golden hues.", category: "ALIGNMENT" },
  { url: IMAGES.row5_2, title: "09 // POST-RUN RESTORATION", sub: "Symmetric cooling session and mindfulness breathing alignment.", category: "MINDSET" },
  { url: IMAGES.row5_3, title: "10 // POWER INTEGRITY", sub: "Outdoor training composure and balanced athletic posture.", category: "STRENGHT" },
  { url: IMAGES.row6_closing, title: "11 // APEX DISCIPLINE", sub: "Closing frame tracking Bhavisha conquering high elevation vistas under sunset.", category: "OUTCOME" }
];

interface AdidasCaseStudyProps {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function AdidasCaseStudy({ onClose, onSelectProjectById }: AdidasCaseStudyProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // Lock parent screen scrolling while viewing case study
    document.body.style.overflow = "hidden";

    const container = wrapperRef.current;
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
          handleNext();
        }
        if (e.key === "ArrowLeft") {
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      container?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, currentIdx]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % STRIDE_GALLERY.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + STRIDE_GALLERY.length) % STRIDE_GALLERY.length);
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
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const openLightbox = (index: number) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div 
      ref={wrapperRef}
      id="adidas-case-study-scroller"
      className="fixed inset-0 z-50 bg-[#ffffff] text-neutral-900 overflow-y-auto selection:bg-neutral-900 selection:text-white"
      style={{ scrollBehavior: "smooth" }}
    >
      
      {/* FLOATING ACTION-BACK OVERLAY */}
      <div className="fixed top-8 left-6 md:left-12 z-50 mix-blend-difference">
        <button
          onClick={onClose}
          id="adidas-exit-button"
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white text-neutral-950 font-mono text-[10px] uppercase font-black tracking-widest shadow-2xl border border-neutral-200/50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-[1.03] cursor-pointer"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          <span>Exit Campaign</span>
        </button>
      </div>

      {/* SECTION 1 — HERO HEADER */}
      <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden bg-black select-none">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transform: `translateY(${scrollY * 0.25}px)`,
            opacity: 1 - Math.min(scrollY / 800, 0.75)
          }}
        >
          <img 
            src={IMAGES.hero} 
            alt="Adidas | Sports & Lifestyle Photography Hero" 
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
        </div>

        {/* Cinematic Text Block overlays */}
        <div className="relative z-10 text-center text-white max-w-5xl px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-[2px] w-8 bg-white" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/95 font-bold">
              Sports & Lifestyle Photography
            </span>
            <span className="h-[2px] w-8 bg-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
          >
            Adidas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-300 font-bold uppercase"
          >
            RUNNING & LIFESTYLE STORYTELLING // CAMPAIGN STILLS
          </motion.p>
        </div>

        {/* Scroll tracker cues */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
             onClick={() => {
               document.getElementById("adidas-overview-sec")?.scrollIntoView({ behavior: "smooth" });
             }}>
          <span>Scroll to Read</span>
          <ChevronDown size={14} className="animate-bounce text-white/70" />
        </div>
      </section>

      {/* SECTION 2 — PROJECT OVERVIEW */}
      <section id="adidas-overview-sec" className="bg-white py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Metadata Block Column */}
          <div className="lg:col-span-5 space-y-8">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">
              CAMPAIGN METADATA //
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-tighter leading-none">
              Project <br /> Overview
            </h2>
            
            {/* Spec grid list */}
            <div className="pt-8 grid grid-cols-2 gap-y-6 gap-x-4 border-t border-neutral-150">
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Client //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Adidas</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Featured Athlete //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Bhavisha Kothari</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Category //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Sports & Lifestyle</p>
              </div>
              <div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Industry //</p>
                <p className="font-sans text-xs font-bold text-neutral-800">Sportswear & Fitness</p>
              </div>
            </div>
          </div>

          {/* Description Paragraph Column in 2-column styling */}
          <div className="lg:col-span-7 space-y-8 text-neutral-600 font-sans text-slate-800 text-sm md:text-base leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p className="text-neutral-700 leading-relaxed font-sans font-medium text-[15px]">
                A sports and lifestyle photography collaboration created for Adidas featuring runner and fitness enthusiast Bhavisha Kothari. Designed to celebrate movement, performance, and determination, the shoot captures the energy and mindset of modern running culture through dynamic imagery and authentic storytelling.
              </p>
              <p className="text-neutral-600 leading-relaxed font-sans text-xs sm:text-sm">
                Blending athletic performance with lifestyle aesthetics, the photographs highlight the relationship between sport, individuality, and everyday discipline. Created for digital marketing, social media, brand storytelling, and athlete-focused content, the project showcases Adidas' commitment to empowering athletes through movement and self-expression.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — CURATED SPORTS EDITORIAL GALLERY */}
      <section className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-16 md:space-y-24">
        
        {/* Curated Separator Label */}
        <div className="text-center space-y-3">
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
            EDITORIAL CHAPTER // 03
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
            STRIDE STORYTELLING SERIES
          </h3>
          <div className="w-16 h-[2px] bg-neutral-900 mx-auto" col-span={3}/>
        </div>

        {/* ROW 1: THREE PORTRAIT IMAGES SIDE-BY-SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { img: IMAGES.row1_1, index: 0, label: "Look 01 // Muscle Readiness" },
            { img: IMAGES.row1_2, index: 1, label: "Look 02 // Precision Focus" },
            { img: IMAGES.row1_3, index: 2, label: "Look 03 // Core Equipment" }
          ].map((item) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (item.index % 3) * 0.15 }}
              onClick={() => openLightbox(item.index)}
              className="group space-y-3 cursor-zoom-in"
            >
              <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-950 shadow-sm relative">
                <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/15 transition-colors" />
                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={13} />
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">FRAME {String(item.index + 1).padStart(2, "0")}</span>
                <p className="text-[10px] text-neutral-900 font-extrabold tracking-tight uppercase">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 2: ONE LARGE FEATURE PORTRAIT IMAGE */}
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0 }}
            onClick={() => openLightbox(3)}
            className="group space-y-4 cursor-zoom-in"
          >
            <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-md relative">
              <img 
                src={IMAGES.row2_feat} 
                alt="Large campaign feature portrait" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-neutral-950/20 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white text-left z-10 hidden sm:block">
                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 backdrop-blur-xs text-white">FEATURED SHOT // MOVE FRAME 04</span>
                <p className="font-display text-lg font-black uppercase mt-2 tracking-tight">DYNAMIC MOTION STRIDE STUDY</p>
              </div>
              <div className="absolute top-6 right-6 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={15} />
              </div>
            </div>
            <div className="text-center font-mono">
              <span className="text-[9px] text-neutral-450 uppercase tracking-widest block font-semibold">FRAME 04 // FOCUS UNIT</span>
              <p className="text-[11px] text-neutral-900 font-black uppercase tracking-tight">Runner Bhavisha Kothari capturing peak stride motion under directional sunlight.</p>
            </div>
          </motion.div>
        </div>

        {/* ROW 3: TWO PORTRAIT IMAGES SIDE-BY-SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto md:pt-10">
          {[
            { img: IMAGES.row3_1, index: 4, label: "Look 05 // Core Isometric Force" },
            { img: IMAGES.row3_2, index: 5, label: "Look 06 // Paced Focus Breathing", shift: true }
          ].map((item) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: item.index === 5 ? 0.2 : 0 }}
              onClick={() => openLightbox(item.index)}
              className={`group space-y-3 cursor-zoom-in ${item.shift ? "md:mt-16" : ""}`}
            >
              <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-sm relative">
                <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/15 transition-colors" />
                <div className="absolute top-6 right-6 p-2.5 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={13} />
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">FRAME {String(item.index + 1).padStart(2, "0")}</span>
                <p className="text-[10px] text-neutral-900 font-extrabold uppercase tracking-tight">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 4: ONE FULL-WIDTH LANDSCAPE IMAGE */}
        <div className="w-full py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            onClick={() => openLightbox(6)}
            className="group cursor-zoom-in relative rounded-2xl overflow-hidden bg-neutral-950 shadow-md aspect-[21/9]"
          >
            <img 
              src={IMAGES.row4_land} 
              alt="Track landscape sprint frame" 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-1015"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/30 transition-colors" />
            <div className="absolute bottom-6 right-6 text-white text-right z-10 hidden sm:block">
              <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-black/60 rounded text-neutral-200">LANDSCAPE COMPOSITION // FRAME 07</span>
              <p className="font-display text-sm font-extrabold uppercase tracking-widest mt-1">THE SPRINT VELOCITY EXPLOSION</p>
            </div>
            <div className="absolute top-6 right-5 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={14} />
            </div>
          </motion.div>
        </div>

        {/* ROW 5: THREE PORTRAIT IMAGES SIDE-BY-SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { img: IMAGES.row5_1, index: 7, label: "Look 08 // Block Composure Ready" },
            { img: IMAGES.row5_2, index: 8, label: "Look 09 // Mindfulness Reflection" },
            { img: IMAGES.row5_3, index: 9, label: "Look 10 // Composed Athletic Power" }
          ].map((item) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (item.index - 7) * 0.15 }}
              onClick={() => openLightbox(item.index)}
              className="group space-y-3 cursor-zoom-in"
            >
              <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-950 shadow-sm relative">
                <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/15 transition-colors" />
                <div className="absolute bottom-4 right-4 p-2  rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={13} />
                </div>
              </div>
              <div className="text-left font-mono">
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest block font-bold">FRAME {String(item.index + 1).padStart(2, "0")}</span>
                <p className="text-[10px] text-neutral-900 font-extrabold tracking-tight uppercase">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ROW 6: ONE LARGE CLOSING PORTRAIT IMAGE */}
        <div className="max-w-[1000px] mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => openLightbox(10)}
            className="group space-y-4 cursor-zoom-in"
          >
            <div className="aspect-[3/2] w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-lg relative">
              <img 
                src={IMAGES.row6_closing} 
                alt="Large campaign closing portrait" 
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/15 group-hover:bg-neutral-950/20 transition-colors" />
              <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-white border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-widest font-black rounded shadow-md">
                CAMPAIGN EPILOGUE FRAME // #11
              </div>
              <div className="absolute bottom-6 right-6 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={15} />
              </div>
            </div>
            <div className="text-center font-mono max-w-xl mx-auto space-y-1">
              <span className="text-[9px] text-[#3079D8] uppercase tracking-[0.2em] block font-extrabold">FRAME 11 // THE HEIGHT OF DISCIPLINE</span>
              <p className="text-[11px] text-neutral-700 leading-normal">Conquered Apex. Running athlete Bhavisha standing above landscape vistas overlooking the golden sun lines.</p>
            </div>
          </motion.div>
        </div>

        {/* Short aesthetic campaign breakdown phrase */}
        <div className="py-16 text-center border-t border-neutral-100/70">
          <p className="font-mono text-neutral-400 text-[10px] tracking-widest uppercase">
            RE-INVENT MOVEMENT. EMPOWER DISCIPLINE. CAPTURED BY NEORAMA STUDIOS.
          </p>
        </div>

      </section>

      {/* SECTION 4 — PROJECT DETAILS */}
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
                <p className="font-sans text-[15px] font-extrabold text-neutral-900">Adidas</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Featured Athlete //</span>
                <p className="font-sans text-[15px] font-extrabold text-neutral-900">Bhavisha Kothari</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Industry //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-semibold">Sportswear & Fitness</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Services Rendered //</span>
                <p className="font-sans text-[14px] text-neutral-800 font-medium">Sports Photography, Lifestyle Photography, Campaign Photography</p>
              </div>

              <div className="md:col-span-2 space-y-3 pt-6 border-t border-neutral-100">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Deliverables Delivered //</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Marketing Assets", 
                    "Social Media Content", 
                    "Campaign Imagery"
                  ].map((asset, index) => (
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

      {/* SECTION 5 — RELATED PHOTOGRAPHY PROJECTS */}
      <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
        {/* Abstract blur backdrop ornament */}
        <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-neutral-450 uppercase tracking-[0.25em] font-black block text-[#3079D8]">
                STUDIO DISCOVERY PORTAL //
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                Related Photography Projects
              </h2>
            </div>
            <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "raw-pressery-commercial",
                title: "Raw Pressery",
                subTitle: "Commercial Photography",
                desc: "Vibrant cold-press setups with refraction, product flats and brand campaign stills.",
                tag: "COMMERCIAL",
                img: relatedRawPresseryThumb
              },
              {
                id: "linen-editorial-photography",
                title: "Linen & Linens",
                subTitle: "Summer & Festive Collection Photography",
                desc: "Breathable vacation cotton lookbooks alongside warm festive collection editorials.",
                tag: "EDITORIAL",
                img: relatedLinenThumb
              },
              {
                id: "simhayana-knotted-photography",
                title: "knotted.in × Simhayana",
                subTitle: "Influencer-Led Brand Photography",
                desc: "Creator-led fashion and lifestyle imagery across two distinct brand collaborations.",
                tag: "CREATOR CONTENT",
                img: relatedSimhayanaThumb
              }
            ].map((rel) => (
              <div 
                key={rel.id}
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    onSelectProjectById(rel.id);
                  }, 180);
                }}
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
                    <span className="text-neutral-500 font-mono text-[8px] uppercase font-bold">
                      Stills Link
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold uppercase text-xs md:text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                    {rel.title} | {rel.subTitle}
                  </h3>
                  <p className="font-sans text-[10px] text-neutral-400 select-none group-hover:text-white/90 transition-colors">
                    {rel.desc}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                    <span>EXPLORE SPECS</span>
                    <ChevronRight size={10} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ACCENTS */}
      <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
        <p>© 2026 NEORAMA STUDIO. ATHLETIC STORY ARCHIVES PROOFS PROTECTED BY NDA.</p>
      </footer>

      {/* LIGHTBOX POPUP IMPLEMENTATION */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-white mb-2 pt-2 z-10">
              <div className="space-y-0.5">
                <span className="font-mono text-[#3079D8] text-[9.5px] uppercase tracking-widest block font-black">
                  ADIDAS WORKSPACE ARCHIVE PROOFING SYSTEM //
                </span>
                <p className="font-display text-xs font-black uppercase">
                  {STRIDE_GALLERY[currentIdx].title}
                </p>
              </div>

              {/* Counter Fractional tracker */}
              <div className="font-mono text-[10px] tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-bold">
                CAPTURE {String(currentIdx + 1).padStart(2, "0")} // {String(STRIDE_GALLERY.length).padStart(2, "0")}
              </div>

              {/* Cross trigger */}
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-neutral-950 transition-all cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={15} />
              </button>
            </div>

            {/* Middle Image Previewer stage */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              
              {/* Previous trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-[#000000] text-white transition-all border border-white/10 cursor-pointer hidden sm:flex"
                aria-label="Previous Frame"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Picture Stage frame container */}
              <div className="max-h-[70vh] max-w-[90vw] aspect-auto relative rounded-xl overflow-hidden shadow-2xl border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIdx}
                    src={STRIDE_GALLERY[currentIdx].url}
                    alt={STRIDE_GALLERY[currentIdx].title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-full h-full max-h-[70vh] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Next trigger */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-white/5 hover:bg-white hover:text-[#000000] text-white transition-all border border-white/10 cursor-pointer hidden sm:flex"
                aria-label="Next Frame"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Meta Cues */}
            <div className="text-center font-mono text-neutral-450 py-3 space-y-2 z-10 border-t border-white/10">
              <p className="text-[9.5px] tracking-widest text-neutral-400 uppercase">
                {STRIDE_GALLERY[currentIdx].sub} // {STRIDE_GALLERY[currentIdx].category} STRENGTH ARCHIVE
              </p>
              
              <div className="flex items-center justify-center gap-6 text-[8.5px] tracking-widest uppercase text-neutral-500">
                <span className="inline-flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Swipe left/right to browse
                </span>
                <span className="inline-flex items-center gap-1 hidden md:inline-flex font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3079D8]" />
                  Keyboard Arrow Keys active
                </span>
                <span className="inline-flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  RAW Sports Capture Proof
                </span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
