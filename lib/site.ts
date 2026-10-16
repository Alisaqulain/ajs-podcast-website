export const SITE = {
  name: "Anushtan",
  /** Primary brand mark (navbar, footer, auth, payments). */
  logoSrc: "/anushtan-logo.png",
  tagline: "Podcast & Video Studio, Bengaluru",
  description:
    "Anushtan is a podcast and video studio in Bengaluru. Record, film, and publish conversations that build your brand, with production led by creator and brand storyteller Ajay Rao.",
  url: process.env.NEXTAUTH_URL || "https://www.anushtan.com",
  /** Founder's personal creator hub — YouTube channel links live there, not on this site. */
  creatorSiteUrl: "https://ajsvlog.com",
  /** Where "watch" links go: the studio channel once set, otherwise the founder's hub. */
  videosUrl:
    (process.env.NEXT_PUBLIC_STUDIO_YOUTUBE_URL || "").trim() ||
    "https://ajsvlog.com",
  /** Optional full-screen hero video (mp4 URL or path like /hero.mp4). Leave empty for gradient-only hero. */
  heroVideoUrl: (process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "").trim(),
  /**
   * Homepage hero media (mp4 or path like /hero-home.mp4).
   * TODO: Replace with final hero video link
   */
  homeHeroVideoUrl: (process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_URL || "").trim(),
  /**
   * YouTube video played muted behind the homepage hero (used when no mp4 is set).
   * Default: the "Ajs Studio" studio tour. Override with NEXT_PUBLIC_HOME_HERO_YOUTUBE_ID.
   */
  homeHeroYoutubeId:
    (process.env.NEXT_PUBLIC_HOME_HERO_YOUTUBE_ID || "").trim() || "l01F2OFq0L4",
  /**
   * Viral-style background video for inner page heroes.
   * TODO: Replace with viral background video URL
   */
  pageHeroVideoUrl: (process.env.NEXT_PUBLIC_PAGE_HERO_VIDEO_URL || "").trim(),
  /** Poster shown before video loads or if video errors */
  heroPosterUrl:
    (process.env.NEXT_PUBLIC_HERO_POSTER_URL || "").trim() || "/anushtan-logo.png",
  /** Homepage hero card poster — unused while CSS placeholder is active */
  homeHeroPosterUrl:
    (process.env.NEXT_PUBLIC_HOME_HERO_POSTER_URL || "").trim() ||
    "/anushtan-logo.png",
  /**
   * Extra zoom on hero YouTube embed so the frame **covers** the viewport (true landscape crop).
   * Long-form landscape uploads need less aggressive scale than Shorts — default ~1.1; override via env.
   */
  heroVideoCoverScale: (() => {
    const raw = process.env.NEXT_PUBLIC_HERO_VIDEO_COVER_SCALE?.trim();
    const n = raw ? Number.parseFloat(raw) : 1.1;
    const v = Number.isFinite(n) ? n : 1.1;
    return Math.min(1.65, Math.max(1, v));
  })(),
  /** Public inquiries; replace with your live inbox if different */
  contactEmail: "info@anushtan.com",
  address: "#27, Castle Street, Bengaluru 560025",
  phones: {
    landline: "080 41126938",
    mobile: "9845826938",
  },
  /** Optional Calendly embed URL, e.g. https://calendly.com/your-handle/discovery-call */
  calendlyUrl: (process.env.NEXT_PUBLIC_CALENDLY_URL || "").trim(),
  social: {
    /** Studio YouTube channel — set NEXT_PUBLIC_STUDIO_YOUTUBE_URL once it is live. */
    youtube: (process.env.NEXT_PUBLIC_STUDIO_YOUTUBE_URL || "").trim(),
    linkedin: "",
    instagram: "http://www.instagram.com/ajs.studio.space",
    facebook: "",
    whatsapp: "https://wa.me/919845826938",
  },
};
