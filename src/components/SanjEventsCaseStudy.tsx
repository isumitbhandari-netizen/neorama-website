import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, ChevronDown, ArrowRight } from "lucide-react";
// @ts-ignore
import sanjEventsCampaignThumb from "../assets/images/sanj_events_campaign_thumb.webp";
// @ts-ignore
import sanjEventsStory01Thumb from "../assets/images/sanj_events_story01_thumb.webp";
// @ts-ignore
import sanjEventsStory02Thumb from "../assets/images/sanj_events_story02_thumb.webp";
// @ts-ignore
import sanjStory02_01 from "../assets/images/sanj_events_story02_01.webp";
// @ts-ignore
import sanjStory02_02 from "../assets/images/sanj_events_story02_02.webp";
// @ts-ignore
import sanjStory02_03 from "../assets/images/sanj_events_story02_03.webp";
// @ts-ignore
import sanjStory02_04 from "../assets/images/sanj_events_story02_04.webp";
// @ts-ignore
import sanjStory02_05 from "../assets/images/sanj_events_story02_05.webp";
// @ts-ignore
import sanjStory02_06 from "../assets/images/sanj_events_story02_06.webp";
// @ts-ignore
import sanjStory02_07 from "../assets/images/sanj_events_story02_07.webp";
// @ts-ignore
import sanjStory02_08 from "../assets/images/sanj_events_story02_08.webp";
// @ts-ignore
import sanjStory02_09 from "../assets/images/sanj_events_story02_09.webp";
// @ts-ignore
import sanjStory02_10 from "../assets/images/sanj_events_story02_10.webp";
// @ts-ignore
import sanjStory02_11 from "../assets/images/sanj_events_story02_11.webp";
// @ts-ignore
import sanjStory02_12 from "../assets/images/sanj_events_story02_12.webp";
// @ts-ignore
import sanjStory02_13 from "../assets/images/sanj_events_story02_13.webp";
// @ts-ignore
import sanjStory02_14 from "../assets/images/sanj_events_story02_14.webp";
// @ts-ignore
import sanjStory02_15 from "../assets/images/sanj_events_story02_15.webp";
// @ts-ignore
import sanjStory02_16 from "../assets/images/sanj_events_story02_16.webp";
// @ts-ignore
import sanjStory02_17 from "../assets/images/sanj_events_story02_17.webp";
// @ts-ignore
import sanjStory02_18 from "../assets/images/sanj_events_story02_18.webp";
// @ts-ignore
import sanjStory02_19 from "../assets/images/sanj_events_story02_19.webp";
// @ts-ignore
import sanjStory02_20 from "../assets/images/sanj_events_story02_20.webp";
// @ts-ignore
import sanjStory02_21 from "../assets/images/sanj_events_story02_21.webp";
// @ts-ignore
import sanjStory02_22 from "../assets/images/sanj_events_story02_22.webp";
// @ts-ignore
import sanjStory02_23 from "../assets/images/sanj_events_story02_23.webp";
// @ts-ignore
import sanjStory02_24 from "../assets/images/sanj_events_story02_24.webp";
// @ts-ignore
import sanjStory02_25 from "../assets/images/sanj_events_story02_25.webp";
// @ts-ignore
import sanjStory02_26 from "../assets/images/sanj_events_story02_26.webp";
// @ts-ignore
import sanjStory02_27 from "../assets/images/sanj_events_story02_27.webp";
// @ts-ignore
import sanjStory02_28 from "../assets/images/sanj_events_story02_28.webp";
// @ts-ignore
import sanjStory01_01 from "../assets/images/sanj_events_story01_01.webp";
// @ts-ignore
import sanjStory01_02 from "../assets/images/sanj_events_story01_02.webp";
// @ts-ignore
import sanjStory01_03 from "../assets/images/sanj_events_story01_03.webp";
// @ts-ignore
import sanjStory01_04 from "../assets/images/sanj_events_story01_04.webp";
// @ts-ignore
import sanjStory01_05 from "../assets/images/sanj_events_story01_05.webp";
// @ts-ignore
import sanjStory01_06 from "../assets/images/sanj_events_story01_06.webp";
// @ts-ignore
import sanjStory01_07 from "../assets/images/sanj_events_story01_07.webp";
// @ts-ignore
import sanjStory01_08 from "../assets/images/sanj_events_story01_08.webp";
// @ts-ignore
import sanjStory01_09 from "../assets/images/sanj_events_story01_09.webp";
// @ts-ignore
import sanjStory01_10 from "../assets/images/sanj_events_story01_10.webp";
// @ts-ignore
import sanjStory01_11 from "../assets/images/sanj_events_story01_11.webp";
// @ts-ignore
import sanjStory01_12 from "../assets/images/sanj_events_story01_12.webp";
// @ts-ignore
import sanjStory01_13 from "../assets/images/sanj_events_story01_13.webp";
// @ts-ignore
import sanjStory01_14 from "../assets/images/sanj_events_story01_14.webp";
// @ts-ignore
import sanjStory01_15 from "../assets/images/sanj_events_story01_15.webp";
// @ts-ignore
import sanjStory01_16 from "../assets/images/sanj_events_story01_16.webp";
// @ts-ignore
import sanjStory01_17 from "../assets/images/sanj_events_story01_17.webp";
// @ts-ignore
import sanjStory01_18 from "../assets/images/sanj_events_story01_18.webp";
// @ts-ignore
import sanjStory01_19 from "../assets/images/sanj_events_story01_19.webp";
// @ts-ignore
import sanjStory01_20 from "../assets/images/sanj_events_story01_20.webp";
// @ts-ignore
import sanjStory01_21 from "../assets/images/sanj_events_story01_21.webp";
// @ts-ignore
import sanjStory01_22 from "../assets/images/sanj_events_story01_22.webp";
// @ts-ignore
import sanjStory01_23 from "../assets/images/sanj_events_story01_23.webp";
// @ts-ignore
import sanjStory01_24 from "../assets/images/sanj_events_story01_24.webp";

const PLACEHOLDER_COUNT = 24;

interface EventStory {
  id: string;
  title: string;
  pageTitle: string;
  location: string;
  description: string;
  gradient: string;
  gradientDark: string;
  cover: string | null;
  images: (string | null)[];
}

function placeholderImages(): null[] {
  return Array.from({ length: PLACEHOLDER_COUNT }, () => null);
}

const EVENT_STORIES: EventStory[] = [
  {
    id: "event-story-01",
    title: "Event Story 01",
    pageTitle: "Sanj Events | Event Story 01",
    location: "Rishikesh",
    description:
      "Rishikesh, Uttarakhand — A behind-the-scenes look at the planning, setup, execution, and final transformation of an event produced by Sanj Events. The imagery documents the creative process, production details, team effort, and atmosphere that bring large-scale experiences to life.",
    gradient: "linear-gradient(145deg, #f5e6c8 0%, #d4a84b 45%, #a07020 100%)",
    gradientDark: "linear-gradient(145deg, #2a1800 0%, #4a3000 55%, #2a1800 100%)",
    cover: sanjEventsStory01Thumb,
    images: [
      sanjStory01_01, sanjStory01_02, sanjStory01_03, sanjStory01_04,
      sanjStory01_05, sanjStory01_06, sanjStory01_07, sanjStory01_08,
      sanjStory01_09, sanjStory01_10, sanjStory01_11, sanjStory01_12,
      sanjStory01_13, sanjStory01_14, sanjStory01_15, sanjStory01_16,
      sanjStory01_17, sanjStory01_18, sanjStory01_19, sanjStory01_20,
      sanjStory01_21, sanjStory01_22, sanjStory01_23, sanjStory01_24,
    ],
  },
  {
    id: "event-story-02",
    title: "Event Story 02",
    pageTitle: "Sanj Events | Event Story 02",
    location: "Mumbai",
    description:
      "A behind-the-scenes look at the planning, setup, execution, and final transformation of an event produced by Sanj Events. The imagery documents the creative process, production details, team effort, and atmosphere that bring large-scale experiences to life.",
    gradient: "linear-gradient(145deg, #e8d5f0 0%, #b080d0 45%, #7040a0 100%)",
    gradientDark: "linear-gradient(145deg, #1a0030 0%, #380060 55%, #1a0030 100%)",
    cover: sanjEventsStory02Thumb,
    images: [
      sanjStory02_01, sanjStory02_02, sanjStory02_03, sanjStory02_04,
      sanjStory02_05, sanjStory02_06, sanjStory02_07, sanjStory02_08,
      sanjStory02_09, sanjStory02_10, sanjStory02_11, sanjStory02_12,
      sanjStory02_13, sanjStory02_14, sanjStory02_15, sanjStory02_16,
      sanjStory02_17, sanjStory02_18, sanjStory02_19, sanjStory02_20,
      sanjStory02_21, sanjStory02_22, sanjStory02_23, sanjStory02_24,
      sanjStory02_25, sanjStory02_26, sanjStory02_27, sanjStory02_28,
    ],
  },
];

interface Props {
  onClose: () => void;
  onSelectProjectById: (id: string) => void;
  // Story slug to open on mount / when the URL changes (null = project landing).
  initialStory?: string | null;
  // Notify the parent so it can keep the shareable URL in sync.
  onStoryChange?: (storySlug: string | null) => void;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}

export default function SanjEventsCaseStudy({ onClose, initialStory, onStoryChange }: Props) {
  const [activeStory, setActiveStory] = useState<string | null>(initialStory ?? null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentStory = EVENT_STORIES.find(s => s.id === activeStory) ?? null;
  const galleryImages = currentStory ? currentStory.images : [];

  // Follow URL-driven story changes (deep links + browser Back/Forward).
  useEffect(() => {
    setActiveStory(initialStory ?? null);
  }, [initialStory]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handleScroll = () => setScrollTop(el.scrollTop);
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "ArrowRight") next();
        else if (e.key === "ArrowLeft") prev();
        else if (e.key === "Escape") setLightboxOpen(false);
        return;
      }
      if (e.key === "Escape") {
        if (activeStory) { setActiveStory(null); onStoryChange?.(null); scrollToTop(); return; }
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, activeStory, photoIndex, galleryImages.length]);

  const next = () => setPhotoIndex(i => (i + 1) % galleryImages.length);
  const prev = () => setPhotoIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const openLightbox = (idx: number) => { setPhotoIndex(idx); setLightboxOpen(true); };

  const selectStory = (id: string) => {
    setActiveStory(id);
    onStoryChange?.(id);
    if (wrapperRef.current) wrapperRef.current.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleBack = () => {
    if (lightboxOpen) { setLightboxOpen(false); return; }
    if (activeStory) { setActiveStory(null); onStoryChange?.(null); if (wrapperRef.current) wrapperRef.current.scrollTo({ top: 0, behavior: "instant" }); return; }
    onClose();
  };

  const relatedStories = activeStory ? EVENT_STORIES.filter(s => s.id !== activeStory) : [];

  const parallaxOffset = scrollTop * 0.35;

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* BACK BUTTON */}
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-[55] flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-neutral-200 shadow-md font-mono text-[10px] uppercase tracking-widest font-black text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
      >
        <ArrowLeft size={12} />
        {activeStory ? "All Stories" : "All Projects"}
      </button>

      <AnimatePresence mode="wait">
        {!activeStory ? (
          /* ── MAIN PROJECT PAGE ──────────────────────────────────────── */
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO */}
            <div className="relative h-[75vh] md:h-screen overflow-hidden bg-neutral-950">
              <div
                className="absolute inset-0"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                <img src={sanjEventsCampaignThumb} alt="Sanj Events" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 z-10">
                <span className="font-mono text-[10px] text-[#3079D8] uppercase tracking-[0.35em] font-black block mb-4">
                  EVENT & EXPERIENCE PHOTOGRAPHY // SANJ EVENTS
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase text-white tracking-tight leading-[0.92] mb-6">
                  Sanj Events<br />
                  <span className="text-neutral-400">Event Production</span><br />
                  Stories
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[2px] bg-[#3079D8]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Visual Documentation Project</span>
                </div>
              </div>
              <button
                onClick={() => document.getElementById("sanj-stories-sec")?.scrollIntoView({ behavior: "smooth" })}
                className="absolute bottom-10 right-10 p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-all animate-bounce cursor-pointer"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* PROJECT OVERVIEW */}
            <section className="bg-white py-20 px-6 md:px-16 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12 items-start">
                <div className="md:col-span-1 space-y-3">
                  <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">Project Overview</span>
                  <div className="w-8 h-[2px] bg-neutral-900" />
                  <div className="space-y-2">
                    {[["Client", "Sanj Events"], ["Category", "Event & Experience Photography"], ["Year", "2025"]].map(([label, value]) => (
                      <div key={label} className="flex flex-col">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400">{label}</span>
                        <span className="font-display text-sm font-bold text-neutral-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-5">
                  <p className="font-sans text-base md:text-lg text-neutral-700 leading-relaxed">
                    A visual documentation project created for Sanj Events, capturing the creativity, coordination,
                    craftsmanship, and execution behind large-scale celebrations and immersive event experiences.
                    The photography focuses on the people, processes, details, and moments that transform concepts
                    into memorable events.
                  </p>
                  <p className="font-sans text-sm md:text-base text-neutral-500 leading-relaxed">
                    The collection showcases behind-the-scenes activity, production workflows, setup execution,
                    design details, team coordination, and the final event environment through authentic visual
                    storytelling.
                  </p>
                </div>
              </div>
            </section>

            {/* DIVIDER */}
            <div className="max-w-5xl mx-auto px-6 md:px-16">
              <div className="h-px bg-neutral-100" />
            </div>

            {/* EVENT STORY CARDS */}
            <section id="sanj-stories-sec" className="bg-white py-20 px-6 md:px-16">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black block">
                      EVENT ARCHIVE // {String(EVENT_STORIES.length).padStart(2, "0")} STORIES
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900">
                      Production Stories
                    </h2>
                  </div>
                  <div className="hidden md:block w-24 h-[2px] bg-neutral-900 mb-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {EVENT_STORIES.map((story, i) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.12 }}
                      onClick={() => selectStory(story.id)}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] shadow-lg border border-neutral-100"
                    >
                      {story.cover ? (
                        <img src={story.cover} alt={story.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: story.gradient }} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />

                      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                        <span className="font-mono text-[8px] text-white/60 uppercase tracking-widest block mb-1.5">
                          {String(i + 1).padStart(2, "0")} / {String(EVENT_STORIES.length).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase text-white tracking-tight mb-3 group-hover:text-[#3079D8] transition-colors">
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-2 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-3 transition-all duration-300">
                          <span>View Story</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>

                      <div className="absolute top-5 right-5 font-mono text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 backdrop-blur-sm">
                        {story.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>

        ) : currentStory ? (
          /* ── INDIVIDUAL STORY PAGE ──────────────────────────────────── */
          <motion.div
            key={activeStory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* HERO */}
            <div className="relative h-[60vh] md:h-[75vh] overflow-hidden bg-neutral-950">
              <div
                className="absolute inset-0"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                {currentStory.cover ? (
                  <img src={currentStory.cover} alt={currentStory.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" style={{ background: currentStory.gradient }} />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 z-10">
                <span className="font-mono text-[9px] text-[#3079D8] uppercase tracking-[0.3em] font-black block mb-3">
                  EVENT & EXPERIENCE PHOTOGRAPHY // SANJ EVENTS
                </span>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase text-white tracking-tight leading-tight">
                  {currentStory.pageTitle}
                </h1>
              </div>
            </div>

            {/* TITLE STRIP */}
            <div className="bg-neutral-950 border-b border-neutral-800 py-5 px-8 md:px-16 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-1 h-6 bg-[#3079D8] rounded-full" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-black">
                  Visual Production Archive
                </span>
              </div>
              <button
                onClick={() => document.getElementById("sanj-gallery-sec")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-[#3079D8] font-black hover:gap-3 transition-all"
              >
                View Gallery <ChevronDown size={10} />
              </button>
            </div>

            {/* STORY OVERVIEW */}
            <section className="bg-white py-16 px-6 md:px-16 max-w-4xl mx-auto">
              <p className="font-sans text-base md:text-lg text-neutral-600 leading-relaxed">
                {currentStory.description}
              </p>
            </section>

            {/* GALLERY */}
            <section id="sanj-gallery-sec" className="bg-white py-8 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
              <div className="text-center space-y-3 mb-12">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-black block">
                  PRODUCTION ARCHIVE // {currentStory.title.toUpperCase()}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-neutral-900">
                  Event Gallery
                </h3>
                <div className="w-16 h-[2px] bg-neutral-900 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: (i % 4) * 0.07 }}
                    onClick={() => openLightbox(i)}
                    className="group cursor-zoom-in space-y-2"
                  >
                    <div
                      className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm relative"
                      style={img ? undefined : { background: currentStory.gradient }}
                    >
                      {img ? (
                        <img src={img} alt={`${currentStory.title} Photo ${String(i + 1).padStart(2, "0")}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-mono text-xs uppercase tracking-[0.28em] text-white/35">
                            Photo {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/14 transition-colors duration-300" />
                      <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Maximize2 size={12} />
                      </div>
                      <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-sm pointer-events-none" />
                      <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-white/0 group-hover:border-white/50 transition-all duration-300 rounded-sm pointer-events-none" />
                    </div>
                    <div className="text-left font-mono">
                      <span className="text-[8px] text-neutral-400 uppercase tracking-widest font-bold">
                        FRAME {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* RELATED EVENT STORIES */}
            {relatedStories.length > 0 && (
              <section className="bg-neutral-950 py-24 md:py-36 text-white overflow-hidden relative">
                <div className="absolute bottom-1/2 right-1/2 w-80 h-80 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-4">
                    <div className="space-y-3">
                      <span className="font-mono text-xs text-[#3079D8] uppercase tracking-[0.25em] font-black block">
                        PRODUCTION ARCHIVE //
                      </span>
                      <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
                        More Event Stories
                      </h2>
                    </div>
                    <div className="hidden md:block w-32 h-[1px] bg-neutral-700 mb-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedStories.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => selectStory(rel.id)}
                        className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer shadow-xl border border-neutral-800 flex flex-col justify-end p-5"
                      >
                        {rel.cover ? (
                          <img src={rel.cover} alt={rel.title} className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                        ) : (
                          <div className="absolute inset-0 opacity-45 group-hover:opacity-70 transition-opacity duration-500" style={{ background: rel.gradientDark }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                        <div className="relative z-10 space-y-2 text-left">
                          <span className="inline-block bg-white/15 border border-white/25 text-white/90 font-mono text-[8px] uppercase px-2 py-0.5 rounded tracking-widest font-black">
                            Sanj Events
                          </span>
                          <h3 className="font-display font-extrabold uppercase text-sm text-white tracking-wide group-hover:text-[#3079D8] transition-colors leading-tight">
                            {rel.title}
                          </h3>
                          <div className="pt-2 flex items-center gap-1.5 font-mono text-[8px] uppercase text-[#3079D8] font-black tracking-widest group-hover:gap-2.5 transition-all">
                            <span>Explore Story</span>
                            <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <footer className="bg-neutral-950 py-16 text-center text-neutral-600 border-t border-neutral-900/60 font-mono text-[10px] tracking-widest uppercase">
              <p>© 2025 NEORAMA STUDIO. ALL EVENT PHOTOGRAPHY PROOFS PROTECTED BY NDA.</p>
            </footer>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && currentStory && (
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
                  SANJ EVENTS ARCHIVE // {currentStory.title.toUpperCase()}
                </span>
                <p className="font-display text-xs font-black uppercase">
                  Production Stories // FRAME {String(photoIndex + 1).padStart(2, "0")}
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
                    style={galleryImages[photoIndex] ? undefined : { background: currentStory.gradient, width: "80vw", height: "60vh" }}
                  >
                    {galleryImages[photoIndex] ? (
                      <img
                        src={galleryImages[photoIndex]!}
                        alt={`${currentStory.title} Photo ${String(photoIndex + 1).padStart(2, "0")}`}
                        className="max-h-[72vh] max-w-[88vw] w-auto h-auto rounded-xl shadow-2xl border border-white/5"
                      />
                    ) : (
                      <>
                        <span className="font-mono text-xl uppercase tracking-[0.3em] text-white/35">
                          Photo {String(photoIndex + 1).padStart(2, "0")}
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
