"use client";

import Link from "next/link";
import { CtaButton } from "@/components/lead/cta-button";

export function LatestConversationsCta() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <CtaButton intent="book" className="w-full max-w-sm sm:w-auto">
          Book Now
        </CtaButton>
        <CtaButton intent="enquire" variant="outline" className="w-full max-w-sm sm:w-auto">
          Enquire Now
        </CtaButton>
      </div>
      <Link
        href="/podcast"
        className="text-sm font-semibold text-brand-gold-deep underline-offset-4 hover:underline"
      >
        View all episodes →
      </Link>
    </div>
  );
}
