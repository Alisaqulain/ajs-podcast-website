export const SITE = {
  name: "AJ'S Studio",
  /** Primary brand mark (navbar, footer, auth, payments). */
  logoSrc: "/ajs-logo.jpeg",
  tagline: "Films, Photoshoots, Podcasts",
  description:
    "Welcome to Aj's Cycling Vlog — entertaining videos on all things cycling, plus films, photoshoots, and podcasts from AJ'S Studio in Bangalore.",
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  /** Optional full-screen hero video (mp4 URL or path like /hero.mp4). Leave empty for gradient-only hero. */
  heroVideoUrl: (process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "").trim(),
  /**
   * Homepage hero media (mp4 or path like /hero-home.mp4).
   * TODO: Replace with final hero video link
   */
  homeHeroVideoUrl: (process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_URL || "").trim(),
  /**
   * Viral-style background video for inner page heroes.
   * TODO: Replace with viral background video URL
   */
  pageHeroVideoUrl: (process.env.NEXT_PUBLIC_PAGE_HERO_VIDEO_URL || "").trim(),
  /** Poster shown before video loads or if video errors */
  heroPosterUrl:
    (process.env.NEXT_PUBLIC_HERO_POSTER_URL || "").trim() || "/ajs-logo.jpeg",
  /** Homepage hero card poster — unused while CSS placeholder is active */
  homeHeroPosterUrl:
    (process.env.NEXT_PUBLIC_HOME_HERO_POSTER_URL || "").trim() ||
    "/ajs-logo.jpeg",
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
  address: "#27, Castle street, Bangalore 560025",
  phones: {
    landline: "080 41126938",
    mobile: "9845826938",
  },
  /** Optional Calendly embed URL, e.g. https://calendly.com/your-handle/discovery-call */
  calendlyUrl: (process.env.NEXT_PUBLIC_CALENDLY_URL || "").trim(),
  social: {
    youtube: "https://www.youtube.com/c/ajsvlog",
    linkedin: "",
    instagram: "http://www.instagram.com/ajs.studio.space",
    facebook: "",
    whatsapp: "https://wa.me/919845826938",
  },
};
