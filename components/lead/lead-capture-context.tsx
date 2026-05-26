"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LeadPopupForm } from "./lead-popup-form";

export type LeadCaptureIntent =
  | "book"
  | "enquire"
  | "schedule"
  | "get-started";

type LeadCaptureContextValue = {
  open: (intent?: LeadCaptureIntent) => void;
  close: () => void;
  isOpen: boolean;
  intent: LeadCaptureIntent;
};

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(null);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<LeadCaptureIntent>("book");

  const open = useCallback((next: LeadCaptureIntent = "book") => {
    setIntent(next);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, isOpen, intent }),
    [open, close, isOpen, intent]
  );

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      <LeadPopupForm />
    </LeadCaptureContext.Provider>
  );
}

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  }
  return ctx;
}
