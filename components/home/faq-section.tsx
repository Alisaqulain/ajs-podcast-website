"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import { HOME_FAQ } from "@/lib/site-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="scroll-mt-28 border-t border-luxury-border bg-luxury-section py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow={HOME_FAQ.eyebrow}
          title={HOME_FAQ.title}
        />

        <div className="mx-auto max-w-3xl divide-y divide-luxury-border rounded-3xl border border-luxury-border bg-luxury-bg/90">
          {HOME_FAQ.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-luxury-section/50 sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-display text-base font-semibold text-luxury-heading sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-brand-gold-deep transition-transform",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-luxury-body sm:px-6 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
