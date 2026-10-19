/** Marketing copy for AJ's Studio Space (by Anushtan) — single source for homepage & shared sections. */

/** Studio hire rate in rupees per hour (space + lights + wireless RODE mic). */
export const STUDIO_HOURLY_RATE = 1000;

export const STUDIO_RATE_LABEL = "₹1,000 / hour";

/** Footnote for items marked ★ — available with any booking but billed separately. */
export const CHARGEABLE_NOTE = "Add-on, charged at actuals";

/**
 * What every booking includes, straight from the studio's rate card.
 * `chargeable` items are available on request and billed at actuals (shown with a ★).
 */
export const STUDIO_INCLUDES = [
  { text: "Your choice of studio space", chargeable: false },
  { text: "Studio lights", chargeable: false },
  { text: "Wireless RODE microphone", chargeable: false },
  { text: "Access to the green room", chargeable: false },
  { text: "Videographer on request", chargeable: true },
  { text: "Editing on request", chargeable: true },
] as const;

/** Optional extras — add-ons charged at actuals. */
export const STUDIO_ADDONS = [
  {
    title: "Videographer",
    description: "A camera operator to shoot your session. Add-on, charged at actuals.",
  },
  {
    title: "Editing",
    description: "Your recording edited into a finished episode or clips. Add-on, charged at actuals.",
  },
  {
    title: "Additional equipment",
    description: "Anything beyond the standard setup, charged at actuals.",
  },
] as const;

export const STUDIO_SPACES = {
  eyebrow: "The spaces",
  title: "Three Sets. Pick Your Size.",
  subtitle:
    "Every space comes with lights and a wireless RODE microphone, plus a green room to get ready. All at one simple rate.",
  items: [
    {
      seats: 2,
      name: "The Duo",
      label: "2-seater",
      description: "Made for one-on-one interviews and two-host shows.",
      bestFor: ["Interviews", "Co-hosted shows", "Expert conversations"],
    },
    {
      seats: 3,
      name: "The Trio",
      label: "3-seater",
      description: "Room for a host and two guests, or a small team.",
      bestFor: ["Host + 2 guests", "Founder chats", "Mini panels"],
    },
    {
      seats: 5,
      name: "The Roundtable",
      label: "5-seater",
      description: "Our largest set, built for group discussions.",
      bestFor: ["Panel discussions", "Group podcasts", "Team recordings"],
    },
  ],
  greenRoom: {
    title: "Green room",
    description:
      "A small private room where you and your guests can get ready before you go on camera.",
  },
} as const;

export const HOME_HERO = {
  trustLine: "Podcast Studio · Castle Street · Bengaluru",
  headline: "Your story deserves a",
  headlineAccent: "studio built for conversation",
  subheading:
    "Three ready-to-record sets with studio lights and a wireless RODE mic, from ₹1,000 an hour. Add a videographer or editor whenever you need one.",
  ctaPrimary: "Book a Studio Session",
  ctaSecondary: "See the Spaces",
} as const;

export const HOME_INTRO = {
  eyebrow: "The Studio",
  title: "Welcome to AJ's Studio Space",
  lead: "A calm, camera-ready space in central Bengaluru where founders, experts, and creators sit down and talk.",
  mission:
    "Choose a 2, 3, or 5-seater set. The lights are set and a wireless RODE mic is ready, so you can sit down and start talking.",
  attention:
    "Need more? Add a videographer to shoot your session and an editor to turn it into a finished episode. Both are add-ons, charged at actuals.",
  podcastTrust:
    "AJ's Studio Space is run by Anushtan and its founder Ajay Rao, a creator with 400+ published videos and twenty years of brand-building in retail. He knows what it takes to hold an audience.",
  audienceIntro: "Included with every booking",
  audiences: [
    "2, 3 & 5-seater studio sets",
    "Studio lighting",
    "Wireless RODE microphone",
    "Private green room",
    "Videographer on request ★",
    "Editing on request ★",
  ],
  closing: "All from ₹1,000 an hour.",
} as const;

export const HOME_WHY_PODCAST = {
  eyebrow: "Why a podcast",
  title: "Why Video Podcasts Work",
  subtitle: "One conversation, a month of content.",
  intro:
    "A well-run hour in the studio can become a full episode, a stack of reels, and the trust that only comes from people hearing you think out loud.",
  helpsIntro: "A podcast helps you:",
  benefits: [
    "Build authority in your field, in your own voice",
    "Turn one recording into reels, shorts, and posts",
    "Open doors with guests, partners, and clients",
    "Show customers the people behind the brand",
    "Train and onboard teams with reusable video",
    "Stay visible on YouTube, Spotify, and Instagram",
  ],
  becomesIntro: "One studio hour can become:",
  becomes: [
    "A full-length video and audio episode",
    "Vertical clips ready for social",
    "Talking points for your next post",
    "An asset your brand keeps using for years",
  ],
} as const;

export const HOME_WHY_US = {
  eyebrow: "Why AJ's Studio Space",
  title: "Why Record With Us?",
  subtitle: "Run by a creator, not just a rental room.",
  tagline:
    "Our founder has built YouTube channels from zero, so the studio is set up the way creators actually work.",
  focusIntro: "What you get with every booking:",
  focusAreas: [
    "Clear sound with a wireless RODE mic",
    "Three sets: 2, 3 & 5 seaters",
    "Studio lights, ready when you arrive",
    "A green room to get camera-ready",
    "Videographer on request ★ (charged at actuals)",
    "Editing on request ★ (charged at actuals)",
    "One simple rate: ₹1,000 an hour",
    "Sessions in English, Hindi, Kannada & Tamil",
  ],
  closing:
    "Whether it's your first episode or your fiftieth, we make the studio feel like a conversation, not a production.",
} as const;

export const HOME_SERVICES = {
  eyebrow: "Services",
  title: "What We Offer",
  items: [
    {
      title: "Studio Hire",
      description:
        "Book any of our three sets by the hour. Everything you need to start recording is already in place.",
      includes: [
        "2, 3 or 5-seater space",
        "Studio lights",
        "Wireless RODE microphone",
        "Green room access",
        "₹1,000 per hour",
      ],
    },
    {
      title: "Videographer",
      description:
        "Add a camera operator to shoot your session so you can focus on the conversation.",
      includes: [
        "Camera setup & framing",
        "Shoots your full session",
        "Add-on, charged at actuals",
      ],
    },
    {
      title: "Editing",
      description:
        "Hand over your recording and get it back edited as an episode or short clips.",
      includes: [
        "Full-length episode edit",
        "Short clips for reels & shorts",
        "Add-on, charged at actuals",
      ],
    },
    {
      title: "Additional Equipment",
      description:
        "Need something beyond the standard setup? Tell us and we'll arrange it.",
      includes: [
        "Extra mics, cameras or gear",
        "Arranged before your session",
        "Charged at actuals",
      ],
    },
  ],
} as const;

export const HOME_IDEAL_CLIENT = {
  eyebrow: "Who it's for",
  title: "Who Records With Us",
  clients: [
    "Founders & business owners",
    "Doctors, coaches & consultants",
    "Brands launching a show",
    "Creators upgrading their setup",
    "Interviewers & panel hosts",
    "Teams recording training video",
    "Authors & speakers",
    "First-time podcasters",
  ],
  closing:
    "If you have something worth saying, we'll give you the space to say it well.",
} as const;

export const HOME_PROCESS = {
  eyebrow: "How it works",
  title: "From Idea to Episode",
  steps: [
    {
      title: "Choose a space",
      description: "Pick the 2, 3 or 5-seater set that fits your guests.",
    },
    {
      title: "Book",
      description: "Pick a slot online or call us to confirm your hours.",
    },
    {
      title: "Get ready",
      description: "Freshen up in the green room before you go on camera.",
    },
    {
      title: "Record",
      description: "Lights are set and the mic is ready. Just talk.",
    },
    {
      title: "Add-ons",
      description: "Optionally add a videographer and editing for a finished episode.",
    },
  ],
} as const;

export const HOME_TESTIMONIALS = {
  eyebrow: "Testimonials",
  title: "What Guests Say",
  /** Shown only from the admin panel — no placeholder quotes. */
  fallbacks: [] as { name: string; message: string }[],
} as const;

export const HOME_FAQ = {
  eyebrow: "FAQ",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "How much does the studio cost?",
      answer: "₹1,000 per hour. This includes the studio space, lights, and a wireless RODE microphone.",
    },
    {
      question: "How many people can record at once?",
      answer: "We have three spaces: a 2-seater, a 3-seater, and a 5-seater. Pick the one that fits your guests.",
    },
    {
      question: "Is there a place to get ready?",
      answer: "Yes. A small green room is available for you and your guests to get ready before recording.",
    },
    {
      question: "Can you film and edit my podcast?",
      answer: "Yes. A videographer and editing are available on request as add-ons, charged at actuals.",
    },
    {
      question: "What if I need more equipment?",
      answer: "Let us know when you book. Any additional equipment is arranged for you and charged at actuals.",
    },
    {
      question: "Where is the studio?",
      answer: "#27, Castle Street, Bengaluru 560025.",
    },
  ],
} as const;

export const HOME_FINAL_CTA = {
  eyebrow: "Book the studio",
  title: "Ready to Hit Record?",
  body: [
    "Pick a space, bring your guests, and start talking. From ₹1,000 an hour.",
    "Want it filmed and edited too? Add a videographer and editing when you book (charged at actuals).",
  ],
  ctaPrimary: "Book a Studio Session",
  ctaSecondary: "Contact the studio",
} as const;

/** Founder profile — shown on the homepage and About page. */
export const FOUNDER = {
  name: "Ajay Rao",
  role: "Founder, Anushtan · AJ's Studio Space",
  photo: "/founder.jpeg",
  headline: "Content Creator & Retail Marketing Professional",
  summary:
    "Ajay has spent a decade publishing video independently and twenty years building brands in retail and distribution. He started a cycling YouTube channel from scratch in 2016 and grew it to 400+ videos and nearly 20,000 subscribers, then brought the same camera-facing storytelling into his professional work, producing training and brand videos for national retail brands.",
  studioStory:
    "Anushtan is the name of the business Ajay founded in 2003. AJ's Studio Space carries it forward: a space where the instincts he built as a creator (framing, pacing, keeping an audience) and as a marketer (positioning, brand story, what makes people buy) come together for every guest who walks in.",
  stats: [
    { value: "10+", label: "Years publishing video" },
    { value: "400+", label: "Videos produced" },
    { value: "~20K", label: "YouTube subscribers" },
    { value: "20+", label: "Years in retail & brands" },
  ],
  highlights: [
    "Built a cycling YouTube channel from zero to 400+ videos and ~20K subscribers",
    "Runs two more channels: AJs Vlogz (tech & food) and Rides by AJ (motovlogs)",
    "Shoots, edits, and publishes all of his own content",
    "Produced social video training for retail staff nationwide at Brightex Synergizer",
    "Launched the Garmin brand store at Dickenson Road, Bengaluru",
    "Consulted food brands on retail placement across Bengaluru and Mumbai",
  ],
  timeline: [
    {
      period: "2025 – Present",
      title: "Managing Partner & Founder, Thvisha",
      body: "Solar power, home automation, and LED lighting solutions, built on two decades of clean-energy retail experience.",
    },
    {
      period: "2022 – 2025",
      title: "Freelance Retail Marketing Specialist",
      body: "Retail marketing and merchandising for food brands including Waterful India, Awe Foods, and Parapocraft Tales.",
    },
    {
      period: "2019 – 2022",
      title: "Product Manager, Brightex Synergizer",
      body: "Built retail training modules, led the Garmin brand store, and produced social video as a scalable training channel.",
    },
    {
      period: "2016 – Present",
      title: "Independent Creator",
      body: "Cycling, tech, food, and moto content across YouTube, Instagram, and Facebook.",
    },
    {
      period: "2003 – 2019",
      title: "Proprietor, Anushtan Associates",
      body: "Distribution for William Penn, Crossword, Landmark, and Sapna; later 5 EV and solar retail outlets across Bengaluru.",
    },
  ],
  education: [
    "MBA (Dual Degree), Marketing & HR — IIPM New Delhi with IMI Belgium",
    "BBM — Seshadripuram College, Bengaluru",
  ],
  languages: ["English", "Hindi", "Kannada", "Tamil"],
  channels: [
    { name: "AJs Vlog", topic: "Cycling", href: "https://www.youtube.com/c/ajsvlog" },
    { name: "AJs Vlogz", topic: "Tech & Food", href: "https://www.youtube.com/c/ajsvlogz" },
    { name: "Rides by AJ", topic: "Motovlogs", href: "https://www.youtube.com/@ridesbyaj" },
  ],
} as const;

export const FOOTER_CONTENT = {
  tagline: "Podcast Studio by Anushtan",
  quote: "Show up with your voice. Leave with content.",
  location: "#27, Castle Street, Bengaluru 560025",
  phoneDisplay: "080 41126938 · 9845826938",
  quickLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About the Studio" },
    { href: "/spaces", label: "Studio Spaces" },
    { href: "/services", label: "Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/founder", label: "Founder" },
    { href: "/creators", label: "Recorded Here" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
    { href: "/book", label: "Book" },
    { href: "/contact", label: "Contact" },
  ],
  socialLabels: ["Instagram", "YouTube"] as const,
} as const;
