// ============================================================================
// Social Media & Marketing — Reel Data (single source of truth)
// ----------------------------------------------------------------------------
// HOW TO ADD A NEW REEL  (no code changes required — just add a data entry):
//
//   1. Upload the reel to Vimeo.
//   2. From the video's embed link, copy:
//        https://player.vimeo.com/video/123456789?h=abcdef123
//                                       ^^^^^^^^^   ^^^^^^^^^
//                                       vimeoId     vimeoHash (private/unlisted only)
//      For a plain public link (https://vimeo.com/123456789) just the id is
//      needed and vimeoHash can be omitted.
//   3. Drop a vertical (9:16) thumbnail image into:
//        public/images/social/
//      and reference it by path, e.g. "/images/social/my-reel.jpg".
//   4. Add one object to the SOCIAL_REELS array below.
//
//   The reel then appears in the gallery automatically — no component edits.
//
//   Notes:
//   • vimeoId may be left as null until the video is uploaded. The card still
//     renders; the modal shows a "Video coming soon" state.
//   • vimeoHash is only required for private/unlisted videos (the `h=` value).
//   • `category` controls the filter pill it lands under + its accent color.
//   • `gradient` is only a fallback shown before the thumbnail loads.
// ============================================================================

export type SocialReelCategory =
  | "Fashion"
  | "Lifestyle"
  | "Food & Beverage"
  | "Events"
  | "Hospitality";

export interface SocialReel {
  id: string;
  client: string;
  title: string;
  category: SocialReelCategory;
  /** Local thumbnail served from /public, e.g. "/images/social/azul-social.png". */
  thumbnail: string;
  /** Numeric Vimeo video ID, e.g. "123456789". null = not uploaded yet. */
  vimeoId: string | null;
  /** Privacy hash (the `h=` value) — only for private/unlisted videos. */
  vimeoHash?: string | null;
  /** Fallback background shown before the thumbnail loads / when missing. */
  gradient: string;
}

// Category accent colors + filter order live here so the gallery is data-driven.
export const CATEGORY_COLORS: Record<SocialReelCategory, string> = {
  Fashion: "#e879a0",
  Lifestyle: "#a78bfa",
  "Food & Beverage": "#fb923c",
  Events: "#34d399",
  Hospitality: "#38bdf8",
};

// Order the filter pills appear in (after the "All" pill).
export const CATEGORY_ORDER: SocialReelCategory[] = [
  "Fashion",
  "Lifestyle",
  "Food & Beverage",
  "Events",
  "Hospitality",
];

export const SOCIAL_REELS: SocialReel[] = [
  { id: "azul-social",       client: "Azul Perfumes",     title: "Social Media Content",         category: "Lifestyle",       thumbnail: "/images/social/azul-social.png",       vimeoId: "1199863772", gradient: "linear-gradient(145deg,#1a1040 0%,#3d1f8a 50%,#6b3fc7 100%)" },
  { id: "knotted-fashion",   client: "knotted.in",        title: "Fashion Content",              category: "Fashion",         thumbnail: "/images/social/knotted-fashion.png",   vimeoId: "1199863602", gradient: "linear-gradient(145deg,#0d2b1a 0%,#1e5c38 50%,#2d8a55 100%)" },
  { id: "linen-festive-1",   client: "Linen and Linens",  title: "Festive Campaign Reel 1",      category: "Fashion",         thumbnail: "/images/social/linen-festive-1.png",   vimeoId: "1199863737", gradient: "linear-gradient(145deg,#3b2510 0%,#8a5c2e 50%,#c49455 100%)" },
  { id: "linen-festive-2",   client: "Linen and Linens",  title: "Festive Campaign Reel 2",      category: "Fashion",         thumbnail: "/images/social/linen-festive-2.png",   vimeoId: "1199863727", gradient: "linear-gradient(145deg,#3b2510 0%,#7a4c20 50%,#b07840 100%)" },
  { id: "linen-social-1",    client: "Linen and Linens",  title: "Social Media Campaign Reel 1", category: "Fashion",         thumbnail: "/images/social/linen-social-1.png",    vimeoId: "1199863688", gradient: "linear-gradient(145deg,#2a1c0e 0%,#6e4422 50%,#a06838 100%)" },
  { id: "linen-social-2",    client: "Linen and Linens",  title: "Social Media Campaign Reel 2", category: "Fashion",         thumbnail: "/images/social/linen-social-2.png",    vimeoId: "1199863686", gradient: "linear-gradient(145deg,#2a1c0e 0%,#5e3818 50%,#905830 100%)" },
  { id: "raw-social",        client: "Raw Pressery",      title: "Social Content",               category: "Food & Beverage", thumbnail: "/images/social/raw-social.png",        vimeoId: "1199863676", gradient: "linear-gradient(145deg,#0c2010 0%,#1e5020 50%,#3a8030 100%)" },
  { id: "raw-halloween",     client: "Raw Pressery",      title: "Halloween Campaign",           category: "Food & Beverage", thumbnail: "/images/social/raw-halloween.png",     vimeoId: "1199863664", gradient: "linear-gradient(145deg,#200a00 0%,#6b2200 50%,#c04400 100%)" },
  { id: "raw-brand-story",   client: "Raw Pressery",      title: "Brand Story Reel",             category: "Food & Beverage", thumbnail: "/images/social/raw-brand-story.png",   vimeoId: "1199863603", gradient: "linear-gradient(145deg,#071a06 0%,#154014 50%,#2a6828 100%)" },
  { id: "sanj-sangeet",      client: "Sanj Events",       title: "Sangeet Setup Story",          category: "Events",          thumbnail: "/images/social/sanj-sangeet.png",      vimeoId: "1199863775", gradient: "linear-gradient(145deg,#1a1200 0%,#4d3800 50%,#9c7200 100%)" },
  { id: "sanj-making",       client: "Sanj Events",       title: "Making & Ready Moments",       category: "Events",          thumbnail: "/images/social/sanj-making.png",       vimeoId: "1199863816", gradient: "linear-gradient(145deg,#160e00 0%,#422c00 50%,#886000 100%)" },
  { id: "sanj-transform",    client: "Sanj Events",       title: "Day to Night Transformation",  category: "Events",          thumbnail: "/images/social/sanj-transform.png",    vimeoId: "1199863781", gradient: "linear-gradient(145deg,#100a1a 0%,#2e1a4e 50%,#5c3494 100%)" },
  { id: "simhayana-fashion", client: "Simhayana",         title: "Fashion Reel",                 category: "Fashion",         thumbnail: "/images/social/simhayana-fashion.png", vimeoId: "1199863601", gradient: "linear-gradient(145deg,#2a0808 0%,#7a1818 50%,#c43030 100%)" },
  { id: "welspun-ganpati",   client: "Welspun x Ganpati", title: "Campaign Content",             category: "Lifestyle",       thumbnail: "/images/social/welspun-ganpati.png",   vimeoId: "1199863600", gradient: "linear-gradient(145deg,#1a0c00 0%,#5c3000 50%,#c46800 100%)" },
];
