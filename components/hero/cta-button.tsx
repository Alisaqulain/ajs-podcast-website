"use client";

import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";
import {
  useLeadCapture,
  type LeadCaptureIntent,
} from "@/components/lead/lead-capture-context";

export type CTAButtonProps = {
  children: ReactNode;
  className?: string;
  intent?: LeadCaptureIntent;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: ComponentProps<"button">["onClick"];
};

/** Opens `LeadPopupForm` — never routes to the contact page. */
export function CTAButton({
  children,
  className,
  intent = "book",
  variant = "primary",
  size = "md",
  disabled,
  onClick,
}: CTAButtonProps) {
  const { open } = useLeadCapture();

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(buttonStyles({ variant, size, className }))}
      onClick={(e) => {
        open(intent);
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}

/** @deprecated Use `CTAButton` */
export const CtaButton = CTAButton;
