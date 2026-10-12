"use client";

import { useReducedMotion } from "framer-motion";

/** Fixed decorative layer — soft animated sky blobs behind page content. */
export function SiteAmbientBg() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-mesh-animated opacity-90" />
      <div
        className={
          reduceMotion
            ? "absolute -left-[20%] top-[8%] h-[min(520px,70vw)] w-[min(520px,70vw)] rounded-full bg-sky-400/25 blur-[100px]"
            : "absolute -left-[20%] top-[8%] h-[min(520px,70vw)] w-[min(520px,70vw)] animate-blob rounded-full bg-sky-400/30 blur-[100px]"
        }
      />
      <div
        className={
          reduceMotion
            ? "absolute -right-[15%] top-[35%] h-[min(480px,65vw)] w-[min(480px,65vw)] rounded-full bg-cyan-300/20 blur-[110px]"
            : "absolute -right-[15%] top-[35%] h-[min(480px,65vw)] w-[min(480px,65vw)] animate-blob animation-delay-2000 rounded-full bg-cyan-300/25 blur-[110px]"
        }
      />
      <div
        className={
          reduceMotion
            ? "absolute bottom-[5%] left-[25%] h-[min(400px,55vw)] w-[min(400px,55vw)] rounded-full bg-blue-200/35 blur-[90px]"
            : "absolute bottom-[5%] left-[25%] h-[min(400px,55vw)] w-[min(400px,55vw)] animate-blob animation-delay-4000 rounded-full bg-blue-200/40 blur-[90px]"
        }
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.85),transparent_55%)]" />
    </div>
  );
}
