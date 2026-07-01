import React, { useState, useEffect } from "react";
import { PROJECTS, PRESS_MENTIONS, TEAM_MEMBERS, BLOG_POSTS } from "./data";
import { Project } from "./types";
import { projectPath, categoryPath, parseRoute, type PortfolioFilter } from "./projectRoutes";
import { type SocialReelCategory } from "./socialReels";
import ProjectDetail from "./components/ProjectDetail";
import PhotographyCaseStudy from "./components/PhotographyCaseStudy";
import RawPresseryCaseStudy from "./components/RawPresseryCaseStudy";
import AdidasCaseStudy from "./components/AdidasCaseStudy";
import StayVistaCaseStudy from "./components/StayVistaCaseStudy";
import SanjEventsCaseStudy from "./components/SanjEventsCaseStudy";
import SimhayanaKnottedCaseStudy from "./components/SimhayanaKnottedCaseStudy";
import ArchitectureInteriorsCaseStudy from "./components/ArchitectureInteriorsCaseStudy";
import TatvaVedaCaseStudy from "./components/TatvaVedaCaseStudy";
import MWBCaseStudy from "./components/MWBCaseStudy";
import SocialMediaGallery from "./components/SocialMediaGallery";
import ServicesShowcase from "./components/ServicesShowcase";
// @ts-ignore
import neoramaLogo from "./assets/images/neorama_logo_1780850974615.webp";
import FAQAccordion from "./components/FAQAccordion";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Send, 
  Check, 
  Menu, 
  X, 
  Globe, 
  ChevronRight,
  ThumbsUp,
  Instagram,
  Linkedin,
  Search,
  Mic,
  ArrowDown,
  Phone,
  Mail
} from "lucide-react";

export default function App() {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Routing state
  const [currentPage, setCurrentPage] = useState<string>("home");

  // Dual layout mode: "scroll" (fully continuous scrolling layout) or "page" (individual pages)
  const [viewMode, setViewMode] = useState<"scroll" | "page">(() => {
    const saved = localStorage.getItem("neorama_view_mode");
    return (saved as "scroll" | "page") || "scroll";
  });

  useEffect(() => {
    localStorage.setItem("neorama_view_mode", viewMode);
  }, [viewMode]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "services", "projects", "team", "blog", "contact"].includes(hash)) {
        setCurrentPage(hash);
        if (viewMode === "page") {
          window.scrollTo({ top: 0 });
        } else {
          // scrolling mode: smoothly scroll to element
          scrollToSection(hash);
        }
      } else if (!hash) {
        setCurrentPage("home");
        if (viewMode === "page") {
          window.scrollTo({ top: 0 });
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [viewMode]);

  // Track active screen section while scrolling in continuous scroll mode
  useEffect(() => {
    if (viewMode !== "scroll") return;

    const sections = ["home", "projects", "services", "team", "blog", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentPage(id);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, [viewMode]);

  // Modals + routing state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Story/villa slug a deep link or internal navigation should open in a project.
  const [initialStory, setInitialStory] = useState<string | null>(null);
  // Social reel a deep link / internal navigation should open in the gallery.
  const [initialReelId, setInitialReelId] = useState<string | null>(null);
  // Reel sub-category (Fashion, Lifestyle, …) the gallery should filter to.
  const [initialReelCategory, setInitialReelCategory] = useState<SocialReelCategory | null>(null);
  // Portfolio filter section (also reflected in the URL).
  const [projectFilter, setProjectFilter] = useState<PortfolioFilter>("all");

  // Smoothly scroll a section into view, re-aligning for a short window after.
  // Web fonts (display=swap) and unsized images finish loading after the first
  // paint, which shifts a section's position while the initial smooth scroll is
  // still animating — on the very first click that left us landing short, inside
  // the previous section (e.g. clicking "services" stopped inside "projects").
  // We nudge it back to the top a few times until it settles.
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    let tries = 0;
    const realign = () => {
      if (tries >= 4) return;
      tries++;
      // Once the section sits at the top (~0) there's nothing to correct.
      if (Math.abs(el.getBoundingClientRect().top) > 2) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(realign, 200);
    };
    setTimeout(realign, 200);
  };

  // Bring the projects section into view (deep link / Back navigation). Deferred
  // so the section has rendered first.
  const scrollToProjects = () => {
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 80);
  };

  // Apply a campaigns sub-route (reel / reel-category / campaigns landing) to state.
  // A reel deliberately leaves the active sub-category in place, so closing it
  // returns to the right filtered view.
  const applyCampaignSub = (match: ReturnType<typeof parseRoute>) => {
    setProjectFilter("campaign");
    if (match?.kind === "reel") {
      setInitialReelId(match.reelId);
    } else if (match?.kind === "reelCategory") {
      setInitialReelCategory(match.reelCategory);
      setInitialReelId(null);
    } else {
      setInitialReelCategory(null);
      setInitialReelId(null);
    }
  };

  // Open a project (and optionally one of its stories) as a shareable URL.
  const openProject = (proj: Project, storySlug?: string | null) => {
    setSelectedProject(proj);
    setInitialStory(storySlug ?? null);
    setInitialReelId(null);
    setInitialReelCategory(null);
    const base = projectPath(proj.id);
    if (base) {
      const url = storySlug ? `${base}/${storySlug}` : base;
      if (window.location.pathname !== url) {
        window.history.pushState({}, "", url);
      }
    }
  };

  // Close the active project overlay and restore the projects URL.
  const closeProject = () => {
    setSelectedProject(null);
    setInitialStory(null);
    if (window.location.pathname.startsWith("/projects/")) {
      window.history.pushState({}, "", "/");
      requestAnimationFrame(() => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    }
  };

  // Sync the URL when navigating between a project and its nested stories.
  const handleStoryChange = (projId: string) => (storySlug: string | null) => {
    setInitialStory(storySlug);
    const base = projectPath(projId);
    if (base) {
      window.history.pushState({}, "", storySlug ? `${base}/${storySlug}` : base);
    }
  };

  // Sync the URL from inside the reel gallery (sub-segment = "", a reel-category
  // slug, or a reel id) and keep state in step so Back/Forward stay correct.
  const handleCampaignNav = (subSegment: string) => {
    const url = subSegment ? `/projects/social-media/${subSegment}` : "/projects/social-media";
    window.history.pushState({}, "", url);
    applyCampaignSub(parseRoute(url));
  };

  // Select a portfolio filter section and reflect it as a shareable URL.
  const selectFilter = (cat: PortfolioFilter) => {
    setProjectFilter(cat);
    setInitialReelId(null);
    setInitialReelCategory(null);
    const url = categoryPath(cat);
    if (window.location.pathname !== url) {
      window.history.pushState({}, "", url);
    }
  };

  // Resolve the current URL to the right project / story / reel / section, and
  // respond to browser Back/Forward. Runs once on mount + on every popstate.
  useEffect(() => {
    const syncFromPath = () => {
      const match = parseRoute(window.location.pathname);

      if (match?.kind === "project") {
        const proj = PROJECTS.find((p) => p.id === match.id);
        if (proj) {
          setSelectedProject(proj);
          setInitialStory(match.storySlug ?? null);
          setInitialReelId(null);
          setInitialReelCategory(null);
          return;
        }
      }

      // Every non-project route closes the project overlay.
      setSelectedProject(null);
      setInitialStory(null);

      if (match?.kind === "reel" || match?.kind === "reelCategory") {
        applyCampaignSub(match);
        scrollToProjects();
        return;
      }
      if (match?.kind === "category") {
        if (match.filter === "campaign") {
          applyCampaignSub(match);
        } else {
          setProjectFilter(match.filter);
          setInitialReelId(null);
          setInitialReelCategory(null);
        }
        scrollToProjects();
        return;
      }

      setInitialReelId(null);
      setInitialReelCategory(null);
    };

    syncFromPath();
    window.addEventListener("popstate", syncFromPath);
    return () => window.removeEventListener("popstate", syncFromPath);
  }, []);

  // Contact form submission state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Hero Scroll Navigation Effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter projects depending on selected tag category
  const filteredProjects = PROJECTS.filter((proj) => {
    if (projectFilter === "all") return true;
    if (projectFilter === "cinematography") {
      return proj.category.toLowerCase().includes("film") || proj.category.toLowerCase().includes("documentary") || proj.category.toLowerCase().includes("cinematography") || proj.category.toLowerCase().includes("audio");
    }
    if (projectFilter === "photography") {
      return proj.category.toLowerCase().includes("photography") || proj.category.toLowerCase().includes("stills");
    }
    if (projectFilter === "campaign") {
      return proj.category.toLowerCase().includes("social") || proj.category.toLowerCase().includes("campaign") || proj.category.toLowerCase().includes("marketing");
    }
    if (projectFilter === "brand") {
      return proj.category.toLowerCase().includes("design") || proj.category.toLowerCase().includes("brand") || proj.category.toLowerCase().includes("identity");
    }
    return true;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please provide all required entries to dispatch contact request.");
      return;
    }
    setContactSuccess(true);
    setTimeout(() => {
      // Clear values safely after some animation
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  return (
    <div className="bg-pure-white text-on-surface font-sans antialiased selection:bg-electric-blue selection:text-pure-white overflow-x-hidden min-h-screen flex flex-col justify-between">
      
      {/* GLASSMORPHIC NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled || (viewMode === "page" && currentPage !== "home")
          ? "glass-nav bg-pure-white/90 border-soft-gray/50 text-on-surface" 
          : "bg-black/15 backdrop-blur-sm border-pure-white/10 text-pure-white"
      }`}>
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1440px] mx-auto relative">
          
          {/* Main Logo brand mark */}
          <a 
            href="#home" 
            className="hover:scale-[1.02] transform transition-all duration-300 flex items-center"
            id="main-brand-logo"
          >
            <img 
              src={neoramaLogo} 
              alt="NEORAMA" 
              style={{ width: "320px", height: "100px", paddingLeft: "0px" }}
              className={`object-contain transition-all duration-300 ${!scrolled && (viewMode === "scroll" || currentPage === "home") ? "brightness-0 invert" : ""}`}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Navigation Link Elements */}
          <nav className="hidden lg:flex items-center gap-7 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
            {(["home", "services", "projects", "team", "blog", "contact"] as const).map((page) => (
              <a 
                key={page}
                href={`#${page}`} 
                onClick={(e) => {
                  if (viewMode === "scroll") {
                    e.preventDefault();
                    setCurrentPage(page);
                    scrollToSection(page);
                    window.location.hash = page;
                  }
                }}
                className={`font-sans text-xs uppercase tracking-widest transition-all duration-200 border-b-2 pb-0.5 ${
                  currentPage === page
                    ? "text-[#3079D8] border-[#3079D8] font-bold"
                    : scrolled || (viewMode === "page" && currentPage !== "home")
                      ? "text-[#414752] border-transparent hover:text-[#3079D8] hover:border-[#3079D8]/50" 
                      : "text-pure-white/80 border-transparent hover:text-pure-white hover:border-pure-white/50"
                }`}
              >
                {page}
              </a>
            ))}
          </nav>

          {/* Aesthetic Toggle Controller for View Mode */}
          <div className={`hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-300 ml-auto mr-4 shrink-0 z-10 ${
            scrolled || (viewMode === "page" && currentPage !== "home")
              ? "bg-[#f4f4f7] border-soft-gray/60" 
              : "bg-pure-white/10 border-pure-white/20 backdrop-blur-md"
          }`}>
            <button
              onClick={() => setViewMode("scroll")}
              className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-extrabold transition-all duration-200 cursor-pointer ${
                viewMode === "scroll"
                  ? "bg-[#3079D8] text-pure-white shadow-sm"
                  : scrolled || (viewMode === "page" && currentPage !== "home")
                    ? "text-[#727784] hover:text-on-surface"
                    : "text-pure-white/70 hover:text-pure-white"
              }`}
            >
              Scroll View
            </button>
            <button
              onClick={() => setViewMode("page")}
              className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-extrabold transition-all duration-200 cursor-pointer ${
                viewMode === "page"
                  ? "bg-[#3079D8] text-pure-white shadow-sm"
                  : scrolled || (viewMode === "page" && currentPage !== "home")
                    ? "text-[#727784] hover:text-on-surface"
                    : "text-pure-white/70 hover:text-pure-white"
              }`}
            >
              Split Pages
            </button>
          </div>

           {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
              scrolled || (viewMode === "page" && currentPage !== "home")
                ? "text-on-surface hover:text-[#3079D8] bg-[#f9f9f9]" 
                : "text-pure-white hover:text-white bg-pure-white/10 border border-pure-white/15"
            }`}
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE SLIDEOUT DRAWER PANEL */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-pure-white border-b border-soft-gray px-6 py-6 space-y-6 animate-fadeInUp">
            {/* Mobile View Mode Choice Selector */}
            <div className="flex items-center justify-between border-b border-soft-gray/60 pb-4">
              <span className="font-mono text-[10px] text-[#727784] uppercase tracking-wider font-extrabold">View Format //</span>
              <div className="flex bg-[#f4f4f7] p-1 rounded-full border border-soft-gray/60">
                <button
                  onClick={() => setViewMode("scroll")}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                    viewMode === "scroll" ? "bg-[#3079D8] text-pure-white" : "text-[#727784]"
                  }`}
                >
                  Scroll View
                </button>
                <button
                  onClick={() => setViewMode("page")}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-extrabold transition-all cursor-pointer ${
                    viewMode === "page" ? "bg-[#3079D8] text-pure-white" : "text-[#727784]"
                  }`}
                >
                  Split Pages
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-4">
              {(["home", "services", "projects", "team", "blog", "contact"] as const).map((page, index) => (
                <a 
                  key={page}
                  href={`#${page}`} 
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (viewMode === "scroll") {
                      e.preventDefault();
                      setCurrentPage(page);
                      scrollToSection(page);
                      window.location.hash = page;
                    }
                  }}
                  className={`font-display font-semibold text-base py-1.5 border-b border-soft-gray/40 transition-colors uppercase tracking-wider ${
                    currentPage === page 
                      ? "text-[#3079D8] font-black border-l-4 pl-2 border-[#3079D8]" 
                      : "text-on-surface hover:text-[#3079D8]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")} // {page}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {(viewMode === "scroll" || currentPage === "home") && (
        <div className="animate-fadeInUp flex-grow flex flex-col justify-center">
          {/* HERO SECTION CONTAINER */}
          <section id="home" className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-black select-none">
            
            {/* CINEMATIC BACKGROUND VIDEO EMBED */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
              <iframe
                src="https://player.vimeo.com/video/1194799588?autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1&background=1&autopause=0&quality=1080p&fe=ec&fl=ip"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  width: "100vw",
                  height: "56.25vw", /* 16:9 ratio */
                  minHeight: "100vh",
                  minWidth: "177.77vh" /* 16:9 ratio */
                }}
                frameBorder="0"
                allow="autoplay; fullscreen"
                title="Neorama Showreel Background Opener"
              />
              {/* Subtle overlay gradient & vignetting to ensure high contrast legibility of text details */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-[#0e1117] z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)] opacity-80 z-10" />
              {/* Subtle grid elements to amplify technology/modern agency theme */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.015),rgba(0,0,255,0.04))] bg-[length:100%_4px,3px_100%] opacity-15 pointer-events-none z-10" />
            </div>

            {/* Central Brand Narrative Info Blocks */}
            <div className="relative max-w-4xl space-y-8 animate-fadeInUp z-20 pt-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-electric-blue/20 border border-electric-blue/40 text-electric-blue text-xs font-mono uppercase tracking-wider mx-auto backdrop-blur-md">
                <Sparkles size={12} className="animate-spin-slow text-electric-blue" />
                CONTEMPORARY FILM & MARKETING AGENCY
              </div>
              
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-pure-white tracking-tighter leading-none select-none drop-shadow-md">
                Where art meets<br /><span className="text-electric-blue">innovation.</span>
              </h1>
              
              <p className="font-sans text-base md:text-xl text-pure-white/80 max-w-2xl mx-auto leading-relaxed pt-2 select-none drop-shadow">
                We are a contemporary film and marketing agency crafting high-end, responsive visual experiences and cinematic assets for modern ambitious brands.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 max-w-sm mx-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-4 bg-electric-blue hover:bg-primary-container text-pure-white font-sans text-sm font-bold uppercase tracking-wider rounded-lg transition-all hover:scale-[1.03] shadow-lg text-center transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  See our projects
                </a>
              </div>
            </div>

            {/* Elegant aesthetic scroll hint floating at the bottom */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block opacity-70">
              <p className="font-mono text-[9px] text-pure-white/60 uppercase tracking-[0.25em]">
                SCROLL DOWN FOR PROJECTS // INVENT THE FUTURE
              </p>
            </div>

          </section>

          {/* CLIENT MARQUEE BAND */}
          {(() => {
            const clients = [
              "Myntra", "House of Pataudi", "Dulux", "Linen and Linens", "StayVista",
              "Tata Trusts", "Manik Public School", "Rani Pink", "Kirthi Diamond Jewellery",
              "Raw Pressery", "Adidas", "Sanj Events", "Simhayana", "knotted.in",
              "Azul Perfumes", "Welspun",
            ];
            const track = [...clients, ...clients, ...clients];
            return (
              <section className="bg-background-gray/50 border-y border-soft-gray py-8 overflow-hidden">
                <style>{`
                  @keyframes neorama-marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                  }
                  .neorama-marquee-track {
                    animation: neorama-marquee 38s linear infinite;
                    will-change: transform;
                  }
                  .neorama-marquee-track:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <p className="font-mono text-[10px] uppercase tracking-widest text-center text-[#727784] mb-6">
                  Trusted by Brands Across Industries
                </p>
                <div className="flex neorama-marquee-track whitespace-nowrap">
                  {track.map((name, i) => (
                    <span key={i} className="inline-flex items-center shrink-0">
                      <span className="font-display font-extrabold text-base md:text-lg tracking-wider text-on-surface/70 px-6 md:px-10 cursor-default hover:text-[#3079D8] transition-colors duration-300">
                        {name}
                      </span>
                      <span className="text-[#3079D8]/40 text-xs select-none">•</span>
                    </span>
                  ))}
                </div>
              </section>
            );
          })()}
        </div>
      )}

      {/* DETAILED / SELECTED PROJECTS PORTFOLIO */}
      {(viewMode === "scroll" || currentPage === "projects") && (
        <section className={`px-6 md:px-12 pb-24 md:pb-36 max-w-[1440px] mx-auto animate-fadeInUp ${viewMode === "page" ? "pt-32" : "py-24 md:py-36"}`} id="projects">
          
          {/* Work Section Header with Metadata label */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-on-surface tracking-tight">
                Selected Projects
              </h2>
            </div>
            
            <div className="flex flex-col items-end gap-1.5">
              <span className="font-mono text-xs text-[#727784] tracking-widest uppercase mb-1">
                01 // PROJECTS
              </span>
              <div className="flex flex-wrap gap-3 font-mono text-xs tracking-wider uppercase">
                {(["all", "cinematography", "photography", "campaign", "brand"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => selectFilter(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      projectFilter === cat 
                        ? "bg-[#3079D8] text-pure-white shadow-sm" 
                        : "border-2 border-soft-gray text-on-surface hover:border-[#3079D8] hover:text-[#3079D8]"
                    }`}
                    id={`filter-btn-${cat}`}
                  >
                    {cat === "all" 
                      ? "All" 
                      : cat === "cinematography" 
                      ? "Ads & Corporate Films"
                      : cat === "photography" 
                      ? "Photography" 
                      : cat === "campaign" 
                      ? "Social Media & Marketing" 
                      : "Branding/Design"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Grid Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:auto-rows-[400px]">
            {filteredProjects.map((proj, index) => {
              const gridType = index % 4;
              
              if (gridType === 0) {
                // Project 1: Large Featured (Film) - Spans 8 cols, 2 rows
                return (
                  <article 
                    key={proj.id}
                    onClick={() => openProject(proj)}
                    className="md:col-span-8 md:row-span-2 group relative rounded-xl overflow-hidden cursor-pointer fade-in-up flex flex-col justify-end min-h-[350px] shadow border border-soft-gray/50"
                    id={`project-card-${proj.id}`}
                  >
                    <div className="absolute inset-0 bg-soft-gray">
                      <img 
                        alt={proj.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={proj.imageUrl}
                        referrerPolicy="no-referrer"
                        style={proj.id === "rani-pink-kirthi" ? { width: "900px" } : undefined}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 via-[#000000]/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 bg-pure-white/95 backdrop-blur-md rounded-full p-2.5 text-[#3079D8] shadow-lg transform group-hover:scale-115 transition-transform duration-300">
                        <Play size={18} fill="currentColor" className="translate-x-0.5" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full z-10 text-pure-white">
                      <div className="flex gap-2 mb-3">
                        <span className="bg-[#3079D8]/40 text-pure-white px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                          {proj.category.split(" // ")[0]}
                        </span>
                        {proj.year && (
                          <span className="bg-pure-white/20 text-pure-white px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm">
                            {proj.year}
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-extrabold text-pure-white mb-2 leading-none">
                        {proj.title}
                      </h2>
                      <p className="font-sans text-xs md:text-sm text-pure-white/85 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </article>
                );
              } else if (gridType === 1) {
                // Project 2: Portrait (Social) - Spans 4 cols, 2 rows
                return (
                  <article 
                    key={proj.id}
                    onClick={() => openProject(proj)}
                    className="md:col-span-4 md:row-span-2 group relative rounded-xl overflow-hidden cursor-pointer fade-in-up flex flex-col justify-end min-h-[350px] shadow border border-soft-gray/50"
                    id={`project-card-${proj.id}`}
                  >
                    <div className="absolute inset-0 bg-surface-container">
                      <img 
                        alt={proj.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={proj.imageUrl}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/95 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full z-10 text-pure-white">
                      <div className="flex gap-2 mb-3">
                        <span className="bg-pure-white/20 text-pure-white px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm border border-pure-white/30">
                          {proj.category.split(" // ")[0]}
                        </span>
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-extrabold text-pure-white mb-2 leading-none">
                        {proj.title}
                      </h2>
                      <p className="font-sans text-xs text-pure-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </article>
                );
              } else {
                // Project 3 & 4: Standard Cards - Spans 6 cols, 1 row
                return (
                  <article 
                    key={proj.id}
                    onClick={() => openProject(proj)}
                    className="md:col-span-6 md:row-span-1 group relative rounded-xl overflow-hidden cursor-pointer h-full fade-in-up flex flex-col justify-end min-h-[300px] shadow border border-soft-gray/50 animate-fadeInUp"
                    id={`project-card-${proj.id}`}
                  >
                    <div className="absolute inset-0 bg-soft-gray">
                      <img 
                        alt={proj.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={proj.imageUrl}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/85 via-black/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 p-6 w-full z-10 text-pure-white">
                      <div className="flex gap-2 mb-2">
                        <span className="bg-pure-white/20 text-pure-white px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm text-[9px]">
                          {proj.category.split(" // ")[0]}
                        </span>
                        {proj.year && (
                          <span className="bg-pure-white/10 text-pure-white/90 px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider backdrop-blur-sm text-[9px]">
                            {proj.year}
                          </span>
                        )}
                      </div>
                      <h2 className="font-display text-lg md:text-xl font-bold text-pure-white">
                        {proj.title}
                      </h2>
                    </div>
                  </article>
                );
              }
            })}
          </div>

          {filteredProjects.length === 0 && projectFilter !== "campaign" && (
            <div className="py-20 text-center bg-background-gray border border-dashed border-soft-gray rounded-xl mt-12">
              <p className="font-mono text-xs text-[#727784]">NO PROJECTS FOUND FOR THIS DISCIPLINE FILTER.</p>
            </div>
          )}

          {/* Social Media Content Gallery — shown inside the campaign filter */}
          {projectFilter === "campaign" && (
            <SocialMediaGallery
              initialReelId={initialReelId}
              initialReelCategory={initialReelCategory}
              onCampaignNav={handleCampaignNav}
            />
          )}
        </section>
      )}

      {/* CORE CAPABILITIES SECTION */}
      {(viewMode === "scroll" || currentPage === "services") && (
        <section className={`bg-background-gray/40 border-b border-soft-gray/60 px-6 md:px-12 pb-24 md:pb-36 max-w-[1440px] mx-auto animate-fadeInUp ${viewMode === "page" ? "pt-32" : "py-24 md:py-36"}`} id="services">
          <div className="space-y-16">
            
            {/* Header layout */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
                  WHAT WE EXCEL AT
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-black text-on-surface tracking-tight">
                  Our Services & Capabilities
                </h2>
              </div>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed">
                We specialize in full-spectrum brand launches. No generic designs. No templated solutions. Just architectural elegance paired with energetic brand visuals.
              </p>
            </div>

            {/* Imported Services Showcase interactive component cards */}
            <ServicesShowcase />

            {/* FAQ Block section for complete services overview */}
            <div className="border-t border-soft-gray/60 pt-16 max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider block">
                  FAQ // CLIENT QUESTIONS
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-black text-on-surface tracking-tight">
                  Frequently Asked Questions
                </h3>
              </div>
              <FAQAccordion />
            </div>

          </div>
        </section>
      )}

      {/* AGENCY TEAM SECTION */}
      {(viewMode === "scroll" || currentPage === "team") && (
        <section className={`px-6 md:px-12 pb-24 md:pb-36 max-w-[1440px] mx-auto animate-fadeInUp ${viewMode === "page" ? "pt-32" : "py-24 md:py-36"}`} id="team">
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl mx-auto">
              <div className="space-y-4 text-center md:text-left">
                <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
                  CREATORS & VISIONARIES
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-black text-on-surface tracking-tight">
                  Our Creative Collective
                </h2>
              </div>
              <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed text-center md:text-left">
                We gather distinguished film directors, brand theorists, and interactive designers who focus purely on elevated visual aesthetics and spatial composition.
              </p>
            </div>

            {/* Symmetrical modern layout sectioned by hierarchy */}
            {/* Founders Subsection */}
            <div className="space-y-8 max-w-5xl mx-auto">
              <h3 className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold border-b border-soft-gray/60 pb-3">
                01 // Leadership
              </h3>
              <div className="flex justify-center">
                {TEAM_MEMBERS.filter((m) => m.group === "founders").map((member) => (
                  <div 
                    key={member.id} 
                    className="group space-y-5 bg-pure-white border border-soft-gray p-6 rounded-2xl hover:border-[#3079D8] transition-all duration-300 shadow-sm w-full max-w-md"
                  >
                    <div className="rounded-xl overflow-hidden bg-background-gray relative h-[400px]">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        style={{ height: "400px" }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#3079D8]/0 group-hover:bg-[#3079D8]/4 transition-colors duration-300 pointer-events-none" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between gap-4">
                        <h4 className="font-display font-extrabold text-xl text-on-surface group-hover:text-[#3079D8] transition-colors duration-300">
                          {member.name}
                        </h4>
                        <span className="font-mono text-[9px] font-semibold text-[#727784] uppercase tracking-wider bg-background-gray px-2 py-0.5 rounded border border-soft-gray/30">
                          FOUNDER
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#3079D8] uppercase tracking-widest font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Collective Subsection */}
            <div className="space-y-8 max-w-[1440px] mx-auto pt-8">
              <h3 className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold border-b border-soft-gray/60 pb-3">
                02 // Core Collective
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                {TEAM_MEMBERS.filter((m) => m.group === "core").map((member) => (
                  <div 
                    key={member.id} 
                    className="group space-y-4 bg-pure-white border border-soft-gray p-4 rounded-xl hover:border-[#3079D8] transition-all duration-300 shadow-sm"
                  >
                    <div className="h-[350px] rounded-lg overflow-hidden bg-background-gray relative">
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ height: "350px" }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#3079D8]/0 group-hover:bg-[#3079D8]/4 transition-colors duration-300 pointer-events-none" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-display font-extrabold text-base text-on-surface group-hover:text-[#3079D8] transition-colors duration-300">
                        {member.name}
                      </h4>
                      <p className="font-mono text-[10px] text-[#3079D8] uppercase tracking-wider font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COGNITIVE INSIGHTS / BLOG SECTION */}
      {(viewMode === "scroll" || currentPage === "blog") && (
        <section className={`bg-background-gray/30 border-soft-gray px-6 md:px-12 pb-24 md:pb-36 max-w-[1440px] mx-auto animate-fadeInUp ${viewMode === "page" ? "pt-32 border-b" : "py-24 md:py-36 border-y"}`} id="blog">
          <div className="space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
                STUDIO ESSAYS & EDITORIALS
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-on-surface tracking-tight">
                Intellectual Perspectives
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#414752]">
                Dive deep into modern brand philosophy, advanced camera physics, and symmetric user-interface alignments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}/`}
                  className="group flex flex-col justify-between bg-pure-white border border-soft-gray rounded-xl overflow-hidden shadow-sm hover:border-[#3079D8] hover:shadow-xl transition-all duration-300 animate-fadeInUp no-underline"
                >
                  <div className="aspect-video w-full overflow-hidden bg-background-gray">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#727784] uppercase">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-on-surface leading-snug group-hover:text-[#3079D8] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="font-sans text-xs text-[#414752] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-soft-gray/60 flex justify-end">
                      <span className="font-mono text-[10px] text-[#3079D8] hover:text-[#414752] inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer font-bold">
                        Read Essay <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HIGHEST FIDELITY ARTISTIC CONTACT FORM */}
      {(viewMode === "scroll" || currentPage === "contact") && (
        <section className={`px-6 md:px-12 pb-24 md:pb-36 max-w-[1440px] mx-auto animate-fadeInUp ${viewMode === "page" ? "pt-32" : "py-24 md:py-36 border-t border-soft-gray"}`} id="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-stretch animate-fadeInUp">
            
            {/* Left Column Information */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#3079D8] uppercase tracking-wider font-semibold block">
                  LET'S TALK
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-black text-on-surface tracking-tight leading-tight">
                  Have a concept in active motion?
                </h2>
                <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Whether you're starting from a blank page or seeking deep editorial cinema direction, we bring focus and style to your goals. Let us code something custom.
                </p>
              </div>

              {/* Direct Details Card */}
              <div className="space-y-4 font-mono text-xs border border-soft-gray p-6 rounded-xl bg-background-gray/25">
                <p className="text-[#727784] uppercase tracking-wider">NEORAMA STUDIO HEADQUARTERS</p>
                <div className="space-y-3 text-[#414752] text-[11px]">
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#3079D8] mt-0.5 shrink-0" />
                    <span className="leading-relaxed">906 (9th floor) Dev Plaza, S V Road, Andheri West, Mumbai - 400068<br /><span className="text-[#727784]">(Landmark: Vijay Sales, Andheri West)</span></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-[#3079D8] shrink-0" />
                    <span>Contact: +91-9713102046</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={14} className="text-[#3079D8] shrink-0" />
                    <span>Inquiries: <a href="mailto:neoramastudios@gmail.com" className="hover:text-[#3079D8] underline transition-colors">neoramastudios@gmail.com</a></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-[#3079D8] shrink-0" />
                    <span>Active Hours: 09:30 - 18:30 (IST timezone)</span>
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#727784] font-sans">
                * By submitting this request, you agree to connect with our art coordinator. We store all creative ideas securely under strict NDA practices.
              </p>
            </div>

            {/* Right Column Form */}
            <div className="bg-pure-white border border-soft-gray rounded-2xl p-6 md:p-8 flex flex-col justify-between">
              {contactSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-fadeInUp">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#3079D8] flex items-center justify-center border border-blue-100">
                    <ThumbsUp size={22} className="text-[#3079D8]" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-on-surface">Message Dispatch Completed</h4>
                    <p className="text-xs text-[#414752] mt-1.5 font-sans leading-relaxed">
                      Our creative studio directors will reach back via <i>{contactEmail}</i> shortly with dynamic moodboard templates.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <Check size={11} strokeWidth={3} />
                    SECURE TRANSMISSION SECURED
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <h3 className="font-display font-extrabold text-lg text-on-surface border-b border-soft-gray pb-3">
                    Direct Inbound Composer
                  </h3>
                  
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-on-surface block">Your Full Identity</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Director of Brand Marketing"
                      className="w-full px-4 py-3 bg-background-gray/70 border border-soft-gray rounded-lg focus:outline-none focus:border-[#3079D8] font-sans text-xs text-on-surface placeholder:text-[#727784]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-on-surface block">Reply Address (Email)</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. design-lead@capsule.co"
                      className="w-full px-4 py-3 bg-background-gray/70 border border-soft-gray rounded-lg focus:outline-none focus:border-[#3079D8] font-sans text-xs text-on-surface placeholder:text-[#727784]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-on-surface block">Conceptual Brief Summary</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Share initial objectives, scope limits, project budget limits or scheduling milestones..."
                      className="w-full px-4 py-3 bg-background-gray/70 border border-soft-gray rounded-lg focus:outline-none focus:border-[#3079D8] font-sans text-xs text-on-surface placeholder:text-[#727784] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#3079D8] text-pure-white hover:bg-opacity-90 text-xs font-mono uppercase tracking-widest rounded-lg transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer focus:ring-2 focus:ring-[#3079D8]"
                    id="direct-contact-submit"
                  >
                    <span>Dispatch Letter</span>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER AREA */}
      <footer className="w-full py-16 md:py-24 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-pure-white border-t border-soft-gray">
        
        {/* Left column Copy */}
        <div className="order-3 md:order-1 font-mono text-[11px] text-[#727784] text-center md:text-left">
          © 2024 Neorama Studios. All rights reserved.
        </div>

        {/* Center Name Logo */}
        <div className="order-1 md:order-2 flex justify-center">
          <img 
            src={neoramaLogo} 
            alt="NEORAMA" 
            style={{ width: "150px", height: "90px" }}
            className="object-contain hover:opacity-90 transition-opacity"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right navigation links */}
        <nav className="order-2 md:order-3 flex flex-wrap justify-center items-center gap-6">
          <a href="/brand-films-mumbai/" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Brand Films Mumbai
          </a>
          <a href="/corporate-video-production-mumbai/" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Corporate Video Mumbai
          </a>
          <a href="/social-media-content-agency-mumbai/" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Social Media Mumbai
          </a>
          <a href="/commercial-photography-mumbai/" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Photography Mumbai
          </a>
          <a href="/branding-design-agency-mumbai/" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Branding & Design Mumbai
          </a>
          <a href="#" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors">
            Terms of Service
          </a>
          <a href="#" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors inline-flex items-center gap-1">
            <Instagram size={12} />
            Instagram
          </a>
          <a href="#" className="font-mono text-[11px] text-[#727784] hover:text-electric-blue transition-colors inline-flex items-center gap-1">
            <Linkedin size={12} />
            LinkedIn
          </a>
        </nav>

      </footer>

      {/* MODAL & DRAWER PORTAL ATTACHMENTS */}
      {selectedProject?.id === "simhayana-knotted-photography" ? (
        <SimhayanaKnottedCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "linen-editorial-photography" ? (
        <PhotographyCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "raw-pressery-commercial" ? (
        <RawPresseryCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "adidas-bhavisha-kothari" ? (
        <AdidasCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "stayvista-luxury-photography" ? (
        <StayVistaCaseStudy
          onClose={closeProject}
          initialStory={initialStory}
          onStoryChange={handleStoryChange("stayvista-luxury-photography")}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "sanj-events-photography" ? (
        <SanjEventsCaseStudy
          onClose={closeProject}
          initialStory={initialStory}
          onStoryChange={handleStoryChange("sanj-events-photography")}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "architecture-interiors-photography" ? (
        <ArchitectureInteriorsCaseStudy
          onClose={closeProject}
          initialStory={initialStory}
          onStoryChange={handleStoryChange("architecture-interiors-photography")}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "tatva-veda-branding" ? (
        <TatvaVedaCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : selectedProject?.id === "mwb-packaging-design" ? (
        <MWBCaseStudy
          onClose={closeProject}
          onSelectProjectById={(id) => {
            const relProj = PROJECTS.find(p => p.id === id);
            if (relProj) {
              openProject(relProj);
            }
          }}
        />
      ) : (
        <ProjectDetail
          project={selectedProject}
          onClose={closeProject}
        />
      )}

    </div>
  );
}
