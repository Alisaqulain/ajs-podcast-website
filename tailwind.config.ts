import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#38BDF8",
          "gold-light": "#7DD3FC",
          "gold-deep": "#0284C7",
          red: "#E11D48",
          dark: "#1A1A1A",
          cream: "#F5F1EB",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        luxury: {
          bg: "var(--luxury-bg)",
          section: "var(--luxury-section)",
          heading: "var(--luxury-heading)",
          body: "var(--luxury-body)",
          muted: "var(--luxury-muted)",
          border: "var(--luxury-border)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #0EA5E9 0%, #7DD3FC 42%, #BAE6FD 100%)",
        "gold-shine":
          "linear-gradient(120deg, rgba(14,165,233,0.35) 0%, rgba(125,211,252,0.95) 50%, rgba(56,189,248,0.9) 100%)",
        "section-mesh":
          "radial-gradient(1200px 600px at 10% 0%, rgba(56,189,248,0.14), transparent 55%), radial-gradient(900px 500px at 90% 20%, rgba(14,116,144,0.06), transparent 50%), linear-gradient(180deg, var(--surface) 0%, var(--luxury-bg) 100%)",
        "mesh-animated":
          "linear-gradient(125deg, #f0f9ff 0%, #e0f2fe 25%, #f8fafc 50%, #dbeafe 75%, #f0f9ff 100%)",
        "text-shimmer":
          "linear-gradient(90deg, #0284c7 0%, #38bdf8 35%, #0ea5e9 50%, #38bdf8 65%, #0284c7 100%)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        "soft-xl": "var(--glass-shadow)",
        "gold-glow":
          "0 10px 32px -8px rgba(14, 165, 233, 0.35), 0 4px 12px rgba(56, 189, 248, 0.18)",
        "gold-glow-lg":
          "0 16px 44px -10px rgba(14, 165, 233, 0.32), 0 8px 20px rgba(56, 189, 248, 0.14)",
        card: "var(--glass-shadow)",
        "luxury-card": "var(--glass-shadow)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        theme: "350ms",
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        blob: "blob 18s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            transform: "translate(28px, -36px) scale(1.06)",
          },
          "66%": {
            transform: "translate(-22px, 18px) scale(0.94)",
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
