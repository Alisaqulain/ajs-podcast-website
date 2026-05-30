"use client";

import { BOOK_NOW_LABEL } from "@/lib/cta";
import { CtaButton } from "@/components/lead/cta-button";

export function TestimonialsSectionCta() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <CtaButton intent="book">{BOOK_NOW_LABEL}</CtaButton>
    </div>
  );
}
