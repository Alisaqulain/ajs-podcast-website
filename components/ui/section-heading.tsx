"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, margin: "-10% 0px" as const },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      };

  return (
    <motion.div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...motionProps}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-gradient-to-r from-brand-gold to-transparent sm:w-8" />
          {eyebrow}
          {align === "center" ? (
            <span className="h-px w-6 bg-gradient-to-l from-brand-gold to-transparent sm:w-8" />
          ) : null}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-balance font-display text-[1.65rem] font-semibold leading-[1.12] text-luxury-heading sm:text-4xl md:text-[2.75rem]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-[0.9375rem] leading-relaxed text-luxury-body sm:mt-4 sm:text-base md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
