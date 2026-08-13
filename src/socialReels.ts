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
  | "Fashion & Jewellery"
  | "Lifestyle"
  | "Food & Beverage"
  | "Events"
  | "Hospitality";

export interface SocialReel {
  id: string;
  client: string;
  title: string;
  category: SocialReelCategory;
  /** Local thumbnail served from /public, e.g. "/images/social/azul-social.webp". */
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
  "Fashion & Jewellery": "#e879a0",
  Lifestyle: "#a78bfa",
  "Food & Beverage": "#fb923c",
  Events: "#34d399",
  Hospitality: "#38bdf8",
};

// Order the filter pills appear in (after the "All" pill).
export const CATEGORY_ORDER: SocialReelCategory[] = [
  "Fashion & Jewellery",
  "Lifestyle",
  "Food & Beverage",
  "Events",
  "Hospitality",
];

export const SOCIAL_REELS: SocialReel[] = [
  { id: "azul-social",       client: "Azul Perfumes",     title: "Social Media Content",         category: "Lifestyle",       thumbnail: "/images/social/azul-social.webp",       vimeoId: "1199863772", gradient: "linear-gradient(145deg,#1a1040 0%,#3d1f8a 50%,#6b3fc7 100%)" },
  { id: "knotted-fashion",   client: "knotted.in",        title: "Fashion Content",              category: "Fashion & Jewellery",         thumbnail: "/images/social/knotted-fashion.webp",   vimeoId: "1199863602", gradient: "linear-gradient(145deg,#0d2b1a 0%,#1e5c38 50%,#2d8a55 100%)" },
  { id: "linen-festive-1",   client: "Linen and Linens",  title: "Festive Campaign Reel 1",      category: "Fashion & Jewellery",         thumbnail: "/images/social/linen-festive-1.webp",   vimeoId: "1199863737", gradient: "linear-gradient(145deg,#3b2510 0%,#8a5c2e 50%,#c49455 100%)" },
  { id: "linen-festive-2",   client: "Linen and Linens",  title: "Festive Campaign Reel 2",      category: "Fashion & Jewellery",         thumbnail: "/images/social/linen-festive-2.webp",   vimeoId: "1199863727", gradient: "linear-gradient(145deg,#3b2510 0%,#7a4c20 50%,#b07840 100%)" },
  { id: "linen-social-1",    client: "Linen and Linens",  title: "Social Media Campaign Reel 1", category: "Fashion & Jewellery",         thumbnail: "/images/social/linen-social-1.webp",    vimeoId: "1199863688", gradient: "linear-gradient(145deg,#2a1c0e 0%,#6e4422 50%,#a06838 100%)" },
  { id: "linen-social-2",    client: "Linen and Linens",  title: "Social Media Campaign Reel 2", category: "Fashion & Jewellery",         thumbnail: "/images/social/linen-social-2.webp",    vimeoId: "1199863686", gradient: "linear-gradient(145deg,#2a1c0e 0%,#5e3818 50%,#905830 100%)" },
  { id: "raw-social",        client: "Raw Pressery",      title: "Social Content",               category: "Food & Beverage", thumbnail: "/images/social/raw-social.webp",        vimeoId: "1199863676", gradient: "linear-gradient(145deg,#0c2010 0%,#1e5020 50%,#3a8030 100%)" },
  { id: "raw-halloween",     client: "Raw Pressery",      title: "Halloween Campaign",           category: "Food & Beverage", thumbnail: "/images/social/raw-halloween.webp",     vimeoId: "1199863664", gradient: "linear-gradient(145deg,#200a00 0%,#6b2200 50%,#c04400 100%)" },
  { id: "raw-brand-story",   client: "Raw Pressery",      title: "Brand Story Reel",             category: "Food & Beverage", thumbnail: "/images/social/raw-brand-story.webp",   vimeoId: "1199863603", gradient: "linear-gradient(145deg,#071a06 0%,#154014 50%,#2a6828 100%)" },
  { id: "sanj-sangeet",      client: "Sanj Events",       title: "Sangeet Setup Story",          category: "Events",          thumbnail: "/images/social/sanj-sangeet.webp",      vimeoId: "1199863775", gradient: "linear-gradient(145deg,#1a1200 0%,#4d3800 50%,#9c7200 100%)" },
  { id: "sanj-making",       client: "Sanj Events",       title: "Making & Ready Moments",       category: "Events",          thumbnail: "/images/social/sanj-making.webp",       vimeoId: "1199863816", gradient: "linear-gradient(145deg,#160e00 0%,#422c00 50%,#886000 100%)" },
  { id: "sanj-transform",    client: "Sanj Events",       title: "Day to Night Transformation",  category: "Events",          thumbnail: "/images/social/sanj-transform.webp",    vimeoId: "1199863781", gradient: "linear-gradient(145deg,#100a1a 0%,#2e1a4e 50%,#5c3494 100%)" },
  { id: "simhayana-fashion", client: "Simhayana",         title: "Fashion Reel",                 category: "Fashion & Jewellery",         thumbnail: "/images/social/simhayana-fashion.webp", vimeoId: "1199863601", gradient: "linear-gradient(145deg,#2a0808 0%,#7a1818 50%,#c43030 100%)" },
  { id: "welspun-ganpati",   client: "Welspun x Ganpati", title: "Campaign Content",             category: "Lifestyle",       thumbnail: "/images/social/welspun-ganpati.webp",   vimeoId: "1199863600", gradient: "linear-gradient(145deg,#1a0c00 0%,#5c3000 50%,#c46800 100%)" },
  { id: "monarque-cufflinks", client: "Monarque Gold & Diamond", title: "Campaign Reel 1",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-cufflinks.webp", vimeoId: "1212562696", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-duo",       client: "Monarque Gold & Diamond", title: "Campaign Reel 2",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-duo.webp",       vimeoId: "1212562675", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-rings",     client: "Monarque Gold & Diamond", title: "Campaign Reel 3",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-rings.webp",     vimeoId: "1212562631", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-hands",     client: "Monarque Gold & Diamond", title: "Campaign Reel 4",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-hands.webp",     vimeoId: "1212562633", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-signet",    client: "Monarque Gold & Diamond", title: "Campaign Reel 5",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-signet.webp",    vimeoId: "1212562630", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-earring",   client: "Monarque Gold & Diamond", title: "Campaign Reel 6",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-earring.webp",   vimeoId: "1212562632", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel07",    client: "Monarque Gold & Diamond", title: "Campaign Reel 7",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel07.webp",    vimeoId: "1217595249", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-reel08",    client: "Monarque Gold & Diamond", title: "Campaign Reel 8",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel08.webp",    vimeoId: "1217595255", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel09",    client: "Monarque Gold & Diamond", title: "Campaign Reel 9",       category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel09.webp",    vimeoId: "1217595236", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-reel10",    client: "Monarque Gold & Diamond", title: "Campaign Reel 10",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel10.webp",    vimeoId: "1217595232", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel11",    client: "Monarque Gold & Diamond", title: "Campaign Reel 11",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel11.webp",    vimeoId: "1217595223", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-reel12",    client: "Monarque Gold & Diamond", title: "Campaign Reel 12",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel12.webp",    vimeoId: "1217595224", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel13",    client: "Monarque Gold & Diamond", title: "Campaign Reel 13",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel13.webp",    vimeoId: "1217595193", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-reel14",    client: "Monarque Gold & Diamond", title: "Campaign Reel 14",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel14.webp",    vimeoId: "1217595191", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel15",    client: "Monarque Gold & Diamond", title: "Campaign Reel 15",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel15.webp",    vimeoId: "1217595262", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
  { id: "monarque-reel16",    client: "Monarque Gold & Diamond", title: "Campaign Reel 16",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel16.webp",    vimeoId: "1217595275", gradient: "linear-gradient(145deg,#141414 0%,#3a3a3a 50%,#6e6e6e 100%)" },
  { id: "monarque-reel17",    client: "Monarque Gold & Diamond", title: "Campaign Reel 17",      category: "Fashion & Jewellery",         thumbnail: "/images/social/monarque-reel17.webp",    vimeoId: "1217595263", gradient: "linear-gradient(145deg,#1a1408 0%,#4a3a18 50%,#8a6f2e 100%)" },
];
