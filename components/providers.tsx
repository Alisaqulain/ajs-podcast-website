"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { LeadCaptureProvider } from "@/components/lead/lead-capture-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <LeadCaptureProvider>{children}</LeadCaptureProvider>
    </SessionProvider>
  );
}
