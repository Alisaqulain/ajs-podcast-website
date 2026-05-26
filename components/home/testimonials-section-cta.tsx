"use client";

import { CtaButton } from "@/components/lead/cta-button";

export function TestimonialsSectionCta() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <CtaButton intent="book">Book Now</CtaButton>
      <CtaButton intent="enquire" variant="outline">
        Enquire Now
      </CtaButton>
    </div>
  );
}
