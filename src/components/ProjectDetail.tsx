import React, { useState } from "react";
import { Project } from "../types";
import { X, Play, Clock, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Track the previous project ID to reset state when project changes
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null);
  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setIsPlaying(false);
    setActiveVideoIndex(0);
    setActiveImageIndex(0);
  }

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-md transition-opacity duration-300">
      {/* Outer Dismiss Tap Zone */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-4xl h-full bg-pure-white text-on-surface shadow-2xl flex flex-col overflow-y-auto animate-fadeInUp">
        {/* Detail Header */}
        <div className="sticky top-0 z-20 bg-pure-white/95 backdrop-blur-md px-6 md:px-12 py-6 border-b border-soft-gray flex justify-between items-center">
          <div>
            <span className="font-mono text-xs tracking-widest text-electric-blue uppercase">Case Study // {project.year}</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-1">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-background-gray hover:bg-soft-gray text-on-surface transition-colors cursor-pointer"
            aria-label="Close panel"
            id="close-detail-modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 md:p-12 space-y-12">
          {/* Main Media Showcase Container (Video Player or Photography Gallery) */}
          {project.galleryImages && project.galleryImages.length > 0 ? (
            <div className="relative rounded-xl overflow-hidden bg-neutral-950 aspect-[16/10] group shadow-md border border-soft-gray flex items-center justify-center">
              <img
                src={project.galleryImages[activeImageIndex]}
                alt={`${project.title} - Frame ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 ease-out"
                key={activeImageIndex} // force re-render for visual transitions
              />
              
              {/* Overlay shadow mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

              {/* Slider Arrow Controls */}
              <button
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : project.galleryImages!.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#3079D8] text-pure-white transition-all duration-200 cursor-pointer border border-pure-white/10 hover:scale-105"
                aria-label="Previous Image"
              >
                <ChevronLeft size={18} />
              </button>
              
              <button
                onClick={() => setActiveImageIndex((prev) => (prev < project.galleryImages!.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#3079D8] text-pure-white transition-all duration-200 cursor-pointer border border-pure-white/10 hover:scale-105"
                aria-label="Next Image"
              >
                <ChevronRight size={18} />
              </button>

              {/* Info tags */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-pure-white tracking-widest flex items-center gap-2 border border-pure-white/10">
                <ImageIcon size={11} className="text-[#3079D8]" />
                <span>FRAME {String(activeImageIndex + 1).padStart(2, '0')} OF {String(project.galleryImages.length).padStart(2, '0')}</span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-pure-white tracking-widest flex items-center gap-1.5 border border-pure-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>MEDIUM FORMAT RAW</span>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video group shadow-md border border-soft-gray">
              {isPlaying ? (
                project.youtubeIds && project.youtubeIds.length > 0 ? (
                  <div className="absolute inset-0 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.youtubeIds[activeVideoIndex]}?autoplay=1&rel=0`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`YouTube Video Player - Film ${activeVideoIndex + 1}`}
                    />
                  </div>
                ) : project.vimeoIds && project.vimeoIds.length > 0 ? (
                  <div className="absolute inset-0 bg-black">
                    <iframe
                      src={`https://player.vimeo.com/video/${project.vimeoIds[activeVideoIndex]}?autoplay=1&color=0066FF&title=0&byline=0&portrait=0`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={`Vimeo Video Player - Film ${activeVideoIndex + 1}`}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-8 text-center text-pure-white">
                    <div className="w-16 h-16 rounded-full border-4 border-electric-blue border-t-transparent animate-spin mb-4" />
                    <p className="font-mono text-sm tracking-wider text-electric-blue animate-pulse">STREAMING MASTER REEL IN UHD</p>
                    <p className="text-xs text-neutral-400 mt-2 font-mono">Soundtrack compiled at 24-bit Spatial Aura audio</p>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="mt-6 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs rounded-lg transition-colors font-mono"
                    >
                      Pause Playback
                    </button>
                  </div>
                )
              ) : (
                <>
                  <img
                    src={project.imageUrl}
                    alt={project.description}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/30">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-20 h-20 rounded-full bg-electric-blue hover:bg-primary-container text-pure-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer focus:ring-4 focus:ring-electric-blue/40"
                      id={`play-button-${project.id}`}
                    >
                      <Play fill="white" size={28} className="translate-x-0.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-pure-white tracking-widest flex items-center gap-1.5">
                    <Clock size={12} className="text-electric-blue" />
                    {(project.vimeoIds || project.youtubeIds) ? "PLAY CAMPAIGN FILM" : "HD CINEMA SHOWREEL"}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Gallery Thumbnails List Switcher */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="bg-background-gray border border-soft-gray rounded-xl p-4 md:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] tracking-widest text-[#727784] uppercase block">
                    EXPLORE HIGH-RESOLUTION PROOFS
                  </span>
                  <p className="font-display text-xs font-bold text-on-surface">
                    Frame {activeImageIndex + 1} Selected: 16-bit Raw Colorway Grid
                  </p>
                </div>
                <div className="font-mono text-[10px] text-[#3079D8] tracking-widest uppercase">
                  Click any frame to inspect details
                </div>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
                {project.galleryImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                      activeImageIndex === index
                        ? "border-[#3079D8] ring-2 ring-[#3079D8]/20 shadow-md"
                        : "border-soft-gray/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Reference Proof ${index + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 right-1 font-mono text-[8px] px-1 bg-black/60 text-white rounded">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Video Campaign Trilogy/List Switcher */}
          {((project.vimeoIds && project.vimeoIds.length > 1) || (project.youtubeIds && project.youtubeIds.length > 1)) && (
            <div className="bg-background-gray border border-soft-gray rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-[#727784] uppercase block">
                  {project.id === "dulux-simply-refresh" ? "DULUX CAMPAIGN TRILOGY" : "CAMPAIGN CHRONICLES"}
                </span>
                <p className="font-display text-sm font-bold text-on-surface">
                  {project.id === "dulux-simply-refresh"
                    ? (activeVideoIndex === 0 ? "Film I: Quiet Spaces (Oyster Living)" : activeVideoIndex === 1 ? "Film II: Restoration (Creative Light)" : "Film III: Symmetry (Artisanal Pigment)")
                    : `Film ${activeVideoIndex + 1}`}
                </p>
              </div>
              <div className="flex gap-2 font-mono text-xs">
                {(project.youtubeIds || project.vimeoIds || []).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveVideoIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`px-4 py-2 rounded-lg font-bold border transition-all cursor-pointer ${
                      isPlaying && activeVideoIndex === idx
                        ? "bg-electric-blue border-electric-blue text-pure-white shadow-sm"
                        : "bg-pure-white border-soft-gray text-on-surface hover:border-electric-blue"
                    }`}
                  >
                    Film {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Project Summary Stats Grid */}
          {project.customStats && project.customStats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-background-gray p-6 md:p-8 rounded-xl border border-soft-gray">
              {project.customStats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-electric-blue tracking-tight">{stat.value}</p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Project Overview Information */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-electric-blue uppercase tracking-wider">Project Overview</h4>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                {project.clientBrief || project.description || "We partnered to deploy physical-digital alignments designed from meticulous brand grids, elevating simple assets into long-term cultural artifacts."}
              </p>
            </div>
          </div>

          {/* Project Deliverables Details */}
          {project.deliverables && (
            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs text-on-surface uppercase tracking-wider">Key Project Deliverables</h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.split(", ").map((del, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-soft-gray/50 text-xs font-mono text-on-surface-variant border border-soft-gray"
                  >
                    <Sparkles size={11} className="text-electric-blue" />
                    {del}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detail Footer Sticky Actions */}
        <div className="sticky bottom-0 z-20 bg-pure-white/95 backdrop-blur-md px-6 md:px-12 py-5 border-t border-soft-gray flex flex-col sm:flex-row gap-4 items-center justify-between">
          <span className="text-xs font-mono text-on-surface-variant hidden sm:inline">
            Interested in doing something similar?
          </span>
          <div className="flex w-full sm:w-auto gap-4">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-3 bg-electric-blue hover:bg-primary-container text-pure-white text-xs font-mono tracking-widest uppercase rounded-lg transition-all text-center focus:ring-2 focus:ring-electric-blue/50 cursor-pointer flex items-center justify-center font-semibold"
            >
              Consult On This Style
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-soft-gray hover:border-on-surface text-on-surface text-xs font-mono tracking-widest uppercase rounded-lg transition-all text-center cursor-pointer"
            >
              Back To Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
