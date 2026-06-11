import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Player from "@vimeo/player";
import {
  SOCIAL_REELS,
  CATEGORY_COLORS,
  CATEGORY_ORDER,
  type SocialReel,
  type SocialReelCategory,
} from "../socialReels";
import { reelCategorySlug } from "../projectRoutes";

// ─── Reel Data ────────────────────────────────────────────────────────────────
// Reels now stream from Vimeo. All content lives in ../socialReels.ts —
// add a new reel there (no edits to this component required).
const REELS = SOCIAL_REELS;

const ALL_FILTERS = ["All", ...CATEGORY_ORDER] as const;
type FilterOption = (typeof ALL_FILTERS)[number];

// ─── Reel Card ────────────────────────────────────────────────────────────────
function ReelCard({ reel, onClick }: { reel: SocialReel; onClick: () => void }) {
  const accent = CATEGORY_COLORS[reel.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden flex flex-col"
      style={{ aspectRatio: "9/16" }}
    >
      {/* Thumbnail — local image (served from /public) with gradient fallback.
          No Vimeo player loads here — only when the modal opens. */}
      {reel.thumbnail ? (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" style={{ background: reel.gradient }} />
      )}

      {/* Gradient bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${accent}22`, border: `1.5px solid ${accent}66`, backdropFilter: "blur(8px)" }}
        >
          <Play size={22} className="translate-x-0.5" style={{ color: accent }} fill="currentColor" />
        </div>
      </div>

      {/* Category chip top-left */}
      <div className="absolute top-3 left-3">
        <span
          className="font-mono text-[8px] uppercase tracking-[0.18em] font-black px-2.5 py-1 rounded-full"
          style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44`, backdropFilter: "blur(8px)" }}
        >
          {reel.category}
        </span>
      </div>

      {/* Text info bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-0.5 z-10">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold" style={{ color: `${accent}cc` }}>
          {reel.client}
        </p>
        <h3 className="font-display text-sm font-extrabold text-pure-white leading-snug tracking-wide uppercase">
          {reel.title}
        </h3>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${accent}55` }}
      />
    </motion.div>
  );
}

// ─── Lazy Vimeo Player ────────────────────────────────────────────────────────
// The Vimeo player (and its iframe) is created only while this component is
// mounted — i.e. only while the modal is open. Destroying it on unmount stops
// playback. Autoplay starts muted (browser-safe); the parent's mute state is
// pushed into the player so the custom mute button stays in sync.
function VimeoPlayer({ reel, muted }: { reel: SocialReel; muted: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!containerRef.current || !reel.vimeoId) return;
    const player = new Player(containerRef.current, {
      ...(reel.vimeoHash
        ? { url: `https://vimeo.com/${reel.vimeoId}/${reel.vimeoHash}` }
        : { id: Number(reel.vimeoId) }),
      autoplay: true,
      muted: true, // required for reliable autoplay; real state applied below
      controls: true,
      playsinline: true,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
      responsive: false,
    });
    playerRef.current = player;
    // Apply the current mute state once the video is ready to play.
    player.ready().then(() => {
      player.setMuted(muted).catch(() => {});
      if (!muted) player.setVolume(1).catch(() => {});
    }).catch(() => {});

    return () => {
      playerRef.current = null;
      player.destroy().catch(() => {});
    };
    // Re-create the player when the reel changes (prev/next navigation).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reel.id]);

  // React to mute-button toggles.
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.setMuted(muted).catch(() => {});
    if (!muted) player.setVolume(1).catch(() => {});
  }, [muted]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full"
    />
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  reel,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  reel: SocialReel;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const touchStartX = useRef<number | null>(null);
  const [muted, setMuted] = useState(true); // start muted so autoplay is allowed
  const accent = CATEGORY_COLORS[reel.category];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) { diff > 0 ? (hasNext && onNext()) : (hasPrev && onPrev()); }
    touchStartX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
      >
        <X size={16} className="text-white" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      )}

      {/* Video container — stopPropagation so clicking it doesn't close the modal */}
      <div className="relative flex flex-col items-center gap-5 w-full max-w-sm px-16 md:px-0" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl" style={{ aspectRatio: "9/16", maxHeight: "80vh" }}>
          {reel.vimeoId ? (
            <VimeoPlayer reel={reel} muted={muted} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: reel.gradient }}>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: `${accent}22`, border: `1.5px solid ${accent}66` }}
              >
                <Play size={26} className="translate-x-0.5" style={{ color: accent }} fill="currentColor" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Video coming soon</p>
            </div>
          )}

          {/* Mute toggle — overlaid; only shown when a video is present */}
          {reel.vimeoId && (
            <button
              onClick={() => setMuted(m => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors cursor-pointer"
            >
              {muted ? <VolumeX size={13} className="text-white" /> : <Volume2 size={13} className="text-white" />}
            </button>
          )}
        </div>

        {/* Meta */}
        <div className="text-center space-y-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold" style={{ color: accent }}>
            {reel.client} // {reel.category}
          </p>
          <h3 className="font-display text-base font-extrabold text-white uppercase tracking-wide">
            {reel.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props {
  // Reel to open on mount / when the URL changes (null = none open).
  initialReelId?: string | null;
  // Reel sub-category to filter to on mount / URL change (null = "All").
  initialReelCategory?: SocialReelCategory | null;
  // Report the current campaigns sub-segment ("" = all, a category slug, or a
  // reel id) so the parent can keep the shareable URL in sync.
  onCampaignNav?: (subSegment: string) => void;
}

export default function SocialMediaGallery({ initialReelId, initialReelCategory, onCampaignNav }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>(initialReelCategory ?? "All");
  const [openReel, setOpenReel] = useState<SocialReel | null>(
    () => REELS.find(r => r.id === initialReelId) ?? null
  );

  const filtered = activeFilter === "All" ? REELS : REELS.filter(r => r.category === activeFilter);

  const openIndex = openReel ? filtered.findIndex(r => r.id === openReel.id) : -1;

  // The current campaigns sub-segment for the URL: a reel id wins, else the
  // active sub-category slug, else "" (the campaigns landing).
  const currentSubSegment = (reel: SocialReel | null, filter: FilterOption) =>
    reel ? reel.id : filter === "All" ? "" : reelCategorySlug(filter);

  const selectReel = (reel: SocialReel | null) => {
    setOpenReel(reel);
    onCampaignNav?.(currentSubSegment(reel, activeFilter));
  };

  const selectFilter = (f: FilterOption) => {
    setActiveFilter(f);
    onCampaignNav?.(f === "All" ? "" : reelCategorySlug(f));
  };

  const goPrev = useCallback(() => { if (openIndex > 0) selectReel(filtered[openIndex - 1]); }, [openIndex, filtered, activeFilter]);
  const goNext = useCallback(() => { if (openIndex < filtered.length - 1) selectReel(filtered[openIndex + 1]); }, [openIndex, filtered, activeFilter]);

  // Follow URL-driven changes (deep links + browser Back/Forward).
  useEffect(() => {
    setActiveFilter(initialReelCategory ?? "All");
  }, [initialReelCategory]);
  useEffect(() => {
    setOpenReel(initialReelId ? REELS.find(r => r.id === initialReelId) ?? null : null);
  }, [initialReelId]);

  // Close modal if active reel filtered out
  useEffect(() => {
    if (openReel && !filtered.find(r => r.id === openReel.id)) setOpenReel(null);
  }, [activeFilter]);

  return (
    <>
      <div className="mt-20 md:mt-28 space-y-10">

        {/* Section header */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
            CONTENT GALLERY // SOCIAL & MARKETING
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-black text-on-surface uppercase tracking-tight leading-none">
            Social Media Content<br />
            <span className="text-neutral-400">& Marketing</span>
          </h3>
          <p className="font-sans text-sm text-neutral-500 max-w-2xl leading-relaxed">
            A collection of short-form content, campaign reels, brand storytelling, and social-first visual content created for brands across fashion, lifestyle, food & beverage, hospitality, and events.
          </p>
          <div className="w-10 h-[2px] bg-[#3079D8]" />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2.5">
          {ALL_FILTERS.map((f) => {
            const isActive = activeFilter === f;
            const count = f === "All" ? REELS.length : REELS.filter(r => r.category === f).length;
            return (
              <button
                key={f}
                onClick={() => selectFilter(f)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#3079D8] text-pure-white shadow-sm scale-[1.02]"
                    : "border-2 border-soft-gray text-on-surface hover:border-[#3079D8] hover:text-[#3079D8]"
                }`}
              >
                {f}
                <span className={`text-[9px] font-black ${isActive ? "text-white/70" : "text-neutral-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reel grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((reel) => (
              <React.Fragment key={reel.id}>
                <ReelCard
                  reel={reel}
                  onClick={() => selectReel(reel)}
                />
              </React.Fragment>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-16 text-center border border-dashed border-soft-gray rounded-xl">
            <p className="font-mono text-xs text-[#727784] uppercase tracking-widest">No reels in this category yet.</p>
          </div>
        )}
      </div>

      {/* Fullscreen video modal — rendered via portal directly on document.body
          so parent CSS transforms/stacking contexts don't interfere */}
      {createPortal(
        <AnimatePresence>
          {openReel && (
            <VideoModal
              reel={openReel}
              onClose={() => selectReel(null)}
              onPrev={goPrev}
              onNext={goNext}
              hasPrev={openIndex > 0}
              hasNext={openIndex < filtered.length - 1}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
