import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, MapPin, ChevronDown, ArrowRight } from "lucide-react";
// @ts-ignore
import stayVistaCampaignHero from "../assets/images/stayvista_campaign_hero.jpg";
// @ts-ignore
import azureBlissThumb from "../assets/images/stayvista_azure_bliss_thumb.jpg";
// @ts-ignore
import bayleafVillaThumb from "../assets/images/stayvista_bayleaf_villa_thumb.jpg";
// @ts-ignore
import villaTeseroThumb from "../assets/images/stayvista_villa_tesoro_thumb.jpg";
// @ts-ignore
import esteriaEnclaveThumb from "../assets/images/stayvista_esteria_enclave_thumb.jpg";
// @ts-ignore
import villaRomaniaThumb from "../assets/images/stayvista_villa_romania_thumb.webp";
// @ts-ignore
import azureBlissFeature from "../assets/images/stayvista_azure_bliss_feature.jpg";
// @ts-ignore
import azureBliss01 from "../assets/images/stayvista_azure_bliss_01.jpg";
// @ts-ignore
import azureBliss02 from "../assets/images/stayvista_azure_bliss_02.jpg";
// @ts-ignore
import azureBliss03 from "../assets/images/stayvista_azure_bliss_03.jpg";
// @ts-ignore
import azureBliss04 from "../assets/images/stayvista_azure_bliss_04.jpg";
// @ts-ignore
import azureBliss05 from "../assets/images/stayvista_azure_bliss_05.jpg";
// @ts-ignore
import azureBliss06 from "../assets/images/stayvista_azure_bliss_06.jpg";
// @ts-ignore
import azureBliss07 from "../assets/images/stayvista_azure_bliss_07.jpg";
// @ts-ignore
import azureBliss08 from "../assets/images/stayvista_azure_bliss_08.jpg";
// @ts-ignore
import azureBliss09 from "../assets/images/stayvista_azure_bliss_09.jpg";
// @ts-ignore
import azureBliss10 from "../assets/images/stayvista_azure_bliss_10.jpg";
// @ts-ignore
import azureBliss11 from "../assets/images/stayvista_azure_bliss_11.jpg";
// @ts-ignore
import azureBliss12 from "../assets/images/stayvista_azure_bliss_12.jpg";
// @ts-ignore
import azureBliss13 from "../assets/images/stayvista_azure_bliss_13.jpg";
// @ts-ignore
import azureBliss14 from "../assets/images/stayvista_azure_bliss_14.jpg";
// @ts-ignore
import azureBliss15 from "../assets/images/stayvista_azure_bliss_15.jpg";
// @ts-ignore
import bayleafFeature from "../assets/images/stayvista_bayleaf_feature.jpg";
// @ts-ignore
import bayleaf01 from "../assets/images/stayvista_bayleaf_01.jpg";
// @ts-ignore
import bayleaf02 from "../assets/images/stayvista_bayleaf_02.jpg";
// @ts-ignore
import bayleaf03 from "../assets/images/stayvista_bayleaf_03.jpg";
// @ts-ignore
import bayleaf04 from "../assets/images/stayvista_bayleaf_04.jpg";
// @ts-ignore
import bayleaf05 from "../assets/images/stayvista_bayleaf_05.jpg";
// @ts-ignore
import bayleaf06 from "../assets/images/stayvista_bayleaf_06.jpg";
// @ts-ignore
import bayleaf07 from "../assets/images/stayvista_bayleaf_07.jpg";
// @ts-ignore
import bayleaf08 from "../assets/images/stayvista_bayleaf_08.jpg";
// @ts-ignore
import bayleaf09 from "../assets/images/stayvista_bayleaf_09.jpg";
// @ts-ignore
import bayleaf10 from "../assets/images/stayvista_bayleaf_10.jpg";
// @ts-ignore
import bayleaf11 from "../assets/images/stayvista_bayleaf_11.jpg";
// @ts-ignore
import bayleaf12 from "../assets/images/stayvista_bayleaf_12.jpg";
// @ts-ignore
import bayleaf13 from "../assets/images/stayvista_bayleaf_13.jpg";
// @ts-ignore
import bayleaf14 from "../assets/images/stayvista_bayleaf_14.jpg";
// @ts-ignore
import bayleaf15 from "../assets/images/stayvista_bayleaf_15.jpg";
// @ts-ignore
import teseroFeature from "../assets/images/stayvista_tesoro_feature.jpg";
// @ts-ignore
import tesero01 from "../assets/images/stayvista_tesoro_01.jpg";
// @ts-ignore
import tesero02 from "../assets/images/stayvista_tesoro_02.jpg";
// @ts-ignore
import tesero03 from "../assets/images/stayvista_tesoro_03.jpg";
// @ts-ignore
import tesero04 from "../assets/images/stayvista_tesoro_04.jpg";
// @ts-ignore
import tesero05 from "../assets/images/stayvista_tesoro_05.jpg";
// @ts-ignore
import tesero06 from "../assets/images/stayvista_tesoro_06.jpg";
// @ts-ignore
import tesero07 from "../assets/images/stayvista_tesoro_07.jpg";
// @ts-ignore
import tesero08 from "../assets/images/stayvista_tesoro_08.jpg";
// @ts-ignore
import tesero09 from "../assets/images/stayvista_tesoro_09.jpg";
// @ts-ignore
import tesero10 from "../assets/images/stayvista_tesoro_10.jpg";
// @ts-ignore
import tesero11 from "../assets/images/stayvista_tesoro_11.jpg";
// @ts-ignore
import tesero12 from "../assets/images/stayvista_tesoro_12.jpg";
// @ts-ignore
import tesero13 from "../assets/images/stayvista_tesoro_13.jpg";
// @ts-ignore
import tesero14 from "../assets/images/stayvista_tesoro_14.jpg";
// @ts-ignore
import tesero15 from "../assets/images/stayvista_tesoro_15.jpg";
// @ts-ignore
import tesero16 from "../assets/images/stayvista_tesoro_16.jpg";
// @ts-ignore
import tesero17 from "../assets/images/stayvista_tesoro_17.jpg";
// @ts-ignore
import tesero18 from "../assets/images/stayvista_tesoro_18.jpg";
// @ts-ignore
import esteriaFeature from "../assets/images/stayvista_esteria_feature.jpg";
// @ts-ignore
import esteria01 from "../assets/images/stayvista_esteria_01.jpg";
// @ts-ignore
import esteria02 from "../assets/images/stayvista_esteria_02.jpg";
// @ts-ignore
import esteria03 from "../assets/images/stayvista_esteria_03.jpg";
// @ts-ignore
import esteria04 from "../assets/images/stayvista_esteria_04.jpg";
// @ts-ignore
import esteria05 from "../assets/images/stayvista_esteria_05.jpg";
// @ts-ignore
import esteria06 from "../assets/images/stayvista_esteria_06.jpg";
// @ts-ignore
import esteria07 from "../assets/images/stayvista_esteria_07.jpg";
// @ts-ignore
import esteria08 from "../assets/images/stayvista_esteria_08.jpg";
// @ts-ignore
import esteria09 from "../assets/images/stayvista_esteria_09.jpg";
// @ts-ignore
import esteria10 from "../assets/images/stayvista_esteria_10.jpg";
// @ts-ignore
import esteria11 from "../assets/images/stayvista_esteria_11.jpg";
// @ts-ignore
import esteria12 from "../assets/images/stayvista_esteria_12.jpg";
// @ts-ignore
import esteria13 from "../assets/images/stayvista_esteria_13.jpg";
// @ts-ignore
import esteria14 from "../assets/images/stayvista_esteria_14.jpg";
// @ts-ignore
import esteria15 from "../assets/images/stayvista_esteria_15.jpg";
// @ts-ignore
import romaniaFeature from "../assets/images/stayvista_romania_feature.jpg";
// @ts-ignore
import romania01 from "../assets/images/stayvista_romania_01.jpg";
// @ts-ignore
import romania02 from "../assets/images/stayvista_romania_02.jpg";
// @ts-ignore
import romania03 from "../assets/images/stayvista_romania_03.jpg";
// @ts-ignore
import romania04 from "../assets/images/stayvista_romania_04.jpg";
// @ts-ignore
import romania05 from "../assets/images/stayvista_romania_05.jpg";
// @ts-ignore
import romania06 from "../assets/images/stayvista_romania_06.jpg";
// @ts-ignore
import romania07 from "../assets/images/stayvista_romania_07.jpg";
// @ts-ignore
import romania08 from "../assets/images/stayvista_romania_08.jpg";
// @ts-ignore
import romania09 from "../assets/images/stayvista_romania_09.jpg";
// @ts-ignore
import romania10 from "../assets/images/stayvista_romania_10.webp";
// @ts-ignore
import romania11 from "../assets/images/stayvista_romania_11.jpg";
// @ts-ignore
import romania12 from "../assets/images/stayvista_romania_12.jpg";
// @ts-ignore
import romania13 from "../assets/images/stayvista_romania_13.jpg";
// @ts-ignore
import romania14 from "../assets/images/stayvista_romania_14.jpg";
// @ts-ignore
import romania15 from "../assets/images/stayvista_romania_15.jpg";

// ─── Villa definitions ────────────────────────────────────────────────────────
// hero and images will be populated once the client provides final photography.
// Each villa retains a gradient identity used for placeholder rendering.

interface Villa {
  id: string;
  name: string;
  location: string;
  atmosphere: string;
  gradient: string;
  gradientDark: string;
  thumb: string;
  hero: string | null;
  images: (string | null)[];
}

const PLACEHOLDER_COUNT = 15;

function placeholderImages(): null[] {
  return Array.from({ length: PLACEHOLDER_COUNT }, () => null);
}

const VILLAS: Villa[] = [
  {
    id: "azure-bliss",
    name: "Azure Bliss",
    location: "Alibaug Coastline",
    atmosphere: "Coastal Mediterranean Escape",
    gradient: "linear-gradient(145deg, #c8e4f5 0%, #93c5e2 45%, #4d95c0 100%)",
    gradientDark: "linear-gradient(145deg, #1a3a54 0%, #2a5a7a 55%, #1a3a54 100%)",
    thumb: azureBlissThumb,
    hero: azureBlissThumb,
    images: [
      azureBlissFeature,
      azureBliss01, azureBliss02, azureBliss03, azureBliss04, azureBliss05,
      azureBliss06, azureBliss07, azureBliss08, azureBliss09, azureBliss10,
      azureBliss11, azureBliss12, azureBliss13, azureBliss14, azureBliss15,
    ]
  },
  {
    id: "bayleaf-villa",
    name: "Bayleaf Villa",
    location: "Nashik Foothills",
    atmosphere: "Organic Wellness Sanctuary",
    gradient: "linear-gradient(145deg, #cde8c9 0%, #8cbd87 45%, #3e8c40 100%)",
    gradientDark: "linear-gradient(145deg, #1a3019 0%, #2a502a 55%, #1a3019 100%)",
    thumb: bayleafVillaThumb,
    hero: bayleafVillaThumb,
    images: [
      bayleafFeature,
      bayleaf01, bayleaf02, bayleaf03, bayleaf04, bayleaf05,
      bayleaf06, bayleaf07, bayleaf08, bayleaf09, bayleaf10,
      bayleaf11, bayleaf12, bayleaf13, bayleaf14, bayleaf15,
    ]
  },
  {
    id: "villa-tesoro",
    name: "Villa Tesoro",
    location: "Lonavala",
    atmosphere: "Heritage Palatial Grandeur",
    gradient: "linear-gradient(145deg, #f0e3c0 0%, #d4ae6e 45%, #a87c34 100%)",
    gradientDark: "linear-gradient(145deg, #3c2800 0%, #5a3e0a 55%, #3c2800 100%)",
    thumb: villaTeseroThumb,
    hero: villaTeseroThumb,
    images: [
      teseroFeature,
      tesero01, tesero02, tesero03, tesero04, tesero05,
      tesero06, tesero07, tesero08, tesero09, tesero10,
      tesero11, tesero12, tesero13,
      tesero14, tesero15, tesero16, tesero17, tesero18,
    ]
  },
  {
    id: "esteria-enclave",
    name: "Esteria Enclave",
    location: "Nashik",
    atmosphere: "Misty Valley Glass Chalet",
    gradient: "linear-gradient(145deg, #ead8f2 0%, #c09cd8 45%, #8050b0 100%)",
    gradientDark: "linear-gradient(145deg, #2c0c44 0%, #4c2468 55%, #2c0c44 100%)",
    thumb: esteriaEnclaveThumb,
    hero: esteriaEnclaveThumb,
    images: [
      esteriaFeature,
      esteria01, esteria02, esteria03, esteria04, esteria05,
      esteria06, esteria07, esteria08, esteria09, esteria10,
      esteria11, esteria12, esteria13, esteria14, esteria15,
    ]
  },
  {
    id: "villa-romania",
    name: "Villa Romania",
    location: "Madh Island",
    atmosphere: "Seaside Minimalist Masterpiece",
    gradient: "linear-gradient(145deg, #e4ddd8 0%, #bdb0aa 45%, #857670 100%)",
    gradientDark: "linear-gradient(145deg, #2c1c18 0%, #4c3430 55%, #2c1c18 100%)",
    thumb: villaRomaniaThumb,
    hero: villaRomaniaThumb,
    images: [
      romaniaFeature,
      romania01, romania02, romania03, romania04, romania05,
      romania06, romania07, romania08, romania09, romania10,
      romania11, romania12, romania13, romania14, romania15,
    ]
  }
];

interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
}

export default function StayVistaCaseStudy({ onClose }: Props) {
  const [activeVilla, setActiveVilla] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentVilla = VILLAS.find(v => v.id === activeVilla) ?? null;
  const galleryImages = currentVilla ? currentVilla.images : [];
  const relatedVillas = activeVilla ? VILLAS.filter(v => v.id !== activeVilla) : [];

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
  }, [activeVilla]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxOpen) { setLightboxOpen(false); return; }
        if (activeVilla) { setActiveVilla(null); scrollToTop(); return; }
        onClose();
      }
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeVilla, photoIndex, galleryImages.length]);

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

  const selectVilla = (id: string) => {
    setActiveVilla(id);
    setPhotoIndex(0);
    scrollToTop();
  };

  const handleBack = () => {
    if (activeVilla) { setActiveVilla(null); scrollToTop(); }
    else onClose();
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  return (
    <div
      ref={wrapperRef}
      id="stayvista-case-study-scroller"
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
          <span>{activeVilla ? "All Villas" : "Exit Case Study"}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">

        {/* ═══════════════ MAIN PORTFOLIO PAGE ═══════════════ */}
        {!activeVilla && (
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
                  src={stayVistaCampaignHero}
                  alt="StayVista Luxury Villa Photography"
                  className="w-full h-full object-cover brightness-[0.65] contrast-[1.05]"
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
                    Luxury Stay &amp; Villa Photography
                  </span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                >
                  StayVista
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                  className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-neutral-300 font-bold uppercase"
                >
                  FIVE EXCLUSIVE PROPERTIES // ARCHITECTURE & LIFESTYLE STILLS
                </motion.p>
              </div>

              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
                onClick={() => document.getElementById("stayvista-villas-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>Scroll to Explore</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — FEATURED PROPERTIES */}
            <section id="stayvista-villas-sec" className="bg-white py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  EXPLORE DESTINATIONS // 05
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Featured Villa Portfolios
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {VILLAS.map((v, i) => (
                  <VillaCard key={v.id} villa={v} index={i} onClick={selectVilla} />
                ))}
              </div>
            </section>

            {/* SECTION 3 — CAMPAIGN SPECS */}
            <section className="bg-neutral-50/50 py-24 md:py-32 border-y border-neutral-100">
              <div className="max-w-4xl mx-auto px-6">
                <div className="border border-neutral-200 rounded-3xl p-8 md:p-14 space-y-10 bg-white shadow-xs relative">
                  <div className="absolute -top-3.5 left-10 bg-white px-4 border border-neutral-200 text-neutral-900 font-mono text-[9px] uppercase tracking-[0.2em] font-black rounded-full">
                    Portfolio Certificate // Active Logistics
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900 border-b border-neutral-100 pb-5">
                    Campaign Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Client //</span>
                      <p className="font-sans text-[15px] font-extrabold text-neutral-900">StayVista</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Industry //</span>
                      <p className="font-sans text-[14px] text-neutral-800 font-semibold">Luxury Travel &amp; Vacation Rentals</p>
                    </div>
                    <div className="md:col-span-2 space-y-3 pt-6 border-t border-neutral-100">
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold block">Services Rendered //</span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {["Luxury Stay Photography", "Villa Photography", "Lifestyle Photography", "Travel Content Creation"].map((asset, index) => (
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

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL VILLA PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        )}

        {/* ═══════════════ INDIVIDUAL VILLA PAGE ═══════════════ */}
        {activeVilla && currentVilla && (
          <motion.div
            key={activeVilla}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* SECTION 1 — VILLA HERO BANNER */}
            <section className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden select-none">
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  transform: `translateY(${scrollY * 0.25}px)`,
                  opacity: 1 - Math.min(scrollY / 800, 0.75)
                }}
              >
                <img
                  src={currentVilla.hero!}
                  alt={`${currentVilla.name} Hero`}
                  className="w-full h-full object-cover brightness-[0.65] contrast-[1.05]"
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
                    StayVista // {currentVilla.atmosphere}
                  </span>
                  <span className="h-[2px] w-8 bg-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6"
                >
                  {currentVilla.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                  className="flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-neutral-200 font-bold uppercase"
                >
                  <MapPin size={13} className="text-[#3079D8]" />
                  {currentVilla.location}
                </motion.div>
              </div>

              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold cursor-pointer"
                onClick={() => document.getElementById("villa-gallery-sec")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span>View Gallery</span>
                <ChevronDown size={14} className="animate-bounce text-white/70" />
              </div>
            </section>

            {/* SECTION 2 — VILLA TITLE STRIP */}
            <section className="bg-white py-16 md:py-20 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-[0.25em] font-black block">
                    LUXURY STAY & VILLA PHOTOGRAPHY
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-black text-neutral-900 tracking-tighter leading-none">
                    StayVista's {currentVilla.name}
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-8 shrink-0">
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Location //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{currentVilla.location}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Atmosphere //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{currentVilla.atmosphere}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-black">Frames //</p>
                    <p className="font-sans text-xs font-bold text-neutral-800">{PLACEHOLDER_COUNT} Masters</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3 — 15-IMAGE EDITORIAL GALLERY */}
            <section id="villa-gallery-sec" className="bg-white py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-10 md:space-y-14">
              <div className="text-center space-y-3">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  EDITORIAL ARCHIVE // {currentVilla.name.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Villa Gallery Portfolio
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              {/* Image 01 — full-width feature frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                onClick={() => openLightbox(0)}
                className="group cursor-zoom-in relative rounded-2xl overflow-hidden shadow-md aspect-[21/9]"
                style={galleryImages[0] ? undefined : { background: currentVilla.gradient }}
              >
                {galleryImages[0] ? (
                  <img src={galleryImages[0]} alt={`${currentVilla.name} Feature Frame`} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono text-base uppercase tracking-[0.3em] text-white/35">Image 01</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/12 transition-colors duration-400" />
                <div className="absolute bottom-6 left-6 text-white text-left z-10 hidden sm:block">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 bg-black/50 rounded text-neutral-200">FEATURE FRAME // 01</span>
                </div>
                <div className="absolute top-6 right-6 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </div>
              </motion.div>

              {/* Grid — 3-column, dynamic row count based on images array */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {galleryImages.slice(1).map((_, i) => { const idx = i + 1; return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: (idx % 3) * 0.1 }}
                    onClick={() => openLightbox(idx)}
                    className="group space-y-3 cursor-zoom-in"
                  >
                    <div
                      className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm relative"
                      style={galleryImages[idx] ? undefined : { background: currentVilla.gradient }}
                    >
                      {galleryImages[idx] ? (
                        <img src={galleryImages[idx]!} alt={`${currentVilla.name} Frame ${String(idx + 1).padStart(2, "0")}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/35">
                            Image {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/14 transition-colors duration-300" />
                      <div className="absolute bottom-4 right-4 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 size={13} />
                      </div>
                      <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-sm pointer-events-none" />
                      <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-sm pointer-events-none" />
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
                        FRAME {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                ); })}
              </div>
            </section>

            {/* SECTION 4 — RELATED VILLAS */}
            <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
              <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
              <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">
                      STUDIO DISCOVERY PORTAL //
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                      Explore Other Premium Stays
                    </h2>
                  </div>
                  <div className="w-16 h-[2px] bg-neutral-800 hidden md:block" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedVillas.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => selectVilla(rel.id)}
                      className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-xl border border-neutral-800 flex flex-col justify-end p-5"
                    >
                      <img
                        src={rel.thumb}
                        alt={rel.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                      <div className="relative z-10 space-y-2 text-left">
                        <span className="inline-block bg-white/15 border border-white/25 text-white/90 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">
                          {rel.location}
                        </span>
                        <h3 className="font-display font-extrabold uppercase text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                          {rel.name}
                        </h3>
                        <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                          <span>Explore Stay</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL VILLA PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ═══════════════ LIGHTBOX ═══════════════ */}
      <AnimatePresence>
        {lightboxOpen && currentVilla && (
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
                  STAYVISTA ARCHIVE INSPECTOR // {currentVilla.name.toUpperCase()}
                </span>
                <p className="font-display text-xs font-black uppercase">
                  {currentVilla.location} // FRAME {String(photoIndex + 1).padStart(2, "0")}
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
                    style={galleryImages[photoIndex] ? undefined : { background: currentVilla.gradient, width: "80vw", height: "60vh" }}
                  >
                    {galleryImages[photoIndex] ? (
                      <img src={galleryImages[photoIndex]!} alt={`${currentVilla.name} Frame ${String(photoIndex + 1).padStart(2, "0")}`} className="max-h-[72vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5" />
                    ) : (
                      <>
                        <span className="font-mono text-xl uppercase tracking-[0.3em] text-white/35">
                          Image {String(photoIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/20 mt-2">
                          {currentVilla.name}
                        </span>
                      </>
                    )}
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
                {currentVilla.atmosphere} // LUXURY STAY MASTER ARCHIVE
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

// ─── Villa Card (main portfolio page) ────────────────────────────────────────
interface VillaCardProps {
  villa: Villa;
  index: number;
  onClick: (id: string) => void;
}

const VillaCard: React.FC<VillaCardProps> = ({ villa, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12 }}
      onClick={() => onClick(villa.id)}
      className="group space-y-4 cursor-pointer"
    >
      <div className="aspect-[4/5] w-full rounded-xl overflow-hidden shadow-sm relative">
        <img
          src={villa.thumb}
          alt={villa.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm font-mono text-[8px] uppercase tracking-widest font-black text-neutral-900 inline-flex items-center gap-1">
          <MapPin size={9} className="text-[#3079D8]" />
          {villa.location}
        </div>
        <div className="absolute bottom-0 left-0 p-5 w-full z-10">
          <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/70 mb-1.5 font-bold">{villa.atmosphere}</p>
          <h3 className="font-display text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none group-hover:text-white transition-colors">
            {villa.name}
          </h3>
        </div>
        <div className="absolute bottom-5 right-5 p-2 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={13} />
        </div>
      </div>
      <div className="flex items-center justify-between font-mono">
        <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">{PLACEHOLDER_COUNT} Master Frames</span>
        <span className="text-[9px] text-[#3079D8] uppercase tracking-widest font-black inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          View Gallery <ArrowRight size={10} />
        </span>
      </div>
    </motion.div>
  );
};
