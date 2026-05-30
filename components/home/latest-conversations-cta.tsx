"use client";

import Link from "next/link";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { CtaButton } from "@/components/lead/cta-button";

export function LatestConversationsCta() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12">
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <CtaButton intent="book" className="w-full max-w-sm sm:w-auto">
          {BOOK_NOW_LABEL}
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
