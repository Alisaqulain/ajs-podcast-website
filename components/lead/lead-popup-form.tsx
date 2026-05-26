"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeadCapture } from "./lead-capture-context";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  phone: z
    .string()
    .min(8, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(1, "Tell us about your podcast requirement").max(5000),
  preferredDateTime: z.string().min(1, "Preferred date/time is required").max(200),
});

type FormValues = z.infer<typeof schema>;

const intentCopy = {
  book: {
    title: "Book your podcast slot",
    subtitle: "Share your details and our team will confirm your session.",
  },
  enquire: {
    title: "Enquire now",
    subtitle: "Ask anything about packages, production, or guest slots.",
  },
  schedule: {
    title: "Schedule your podcast",
    subtitle: "Pick your preferred timing and we will align the studio calendar.",
  },
  "get-started": {
    title: "Get started",
    subtitle: "Take the first step toward a premium podcast feature with BN.",
  },
} as const;

/** Premium lead capture popup — opened via `CTAButton`. */
export function LeadPopupForm() {
  const { isOpen, close, intent } = useLeadCapture();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const copy = intentCopy[intent];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      reset();
    }
  }, [isOpen, reset]);

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        preferredDateTime: values.preferredDateTime,
        source: `lead-popup:${intent}`,
      }),
    });
    if (res.ok) {
      setStatus("ok");
      reset();
    } else {
      setStatus("err");
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close form"
            className="absolute inset-0 bg-[#1a1510]/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={cn(
              "relative z-10 flex max-h-[min(92dvh,720px)] w-full max-w-lg flex-col overflow-hidden",
              "rounded-t-3xl border border-luxury-border bg-[#fffdf9] shadow-soft-xl sm:rounded-3xl"
            )}
          >
            <div className="relative shrink-0 border-b border-luxury-border bg-gradient-to-br from-brand-gold/12 via-[#fffdf9] to-[#faf7f2] px-6 pb-5 pt-6 sm:px-8 sm:pt-8">
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-luxury-border bg-white text-luxury-heading transition hover:border-brand-gold/50 hover:bg-brand-gold/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
                BHAW Namrata
              </p>
              <h2
                id="lead-modal-title"
                className="mt-2 pr-10 font-display text-2xl font-semibold text-luxury-heading"
              >
                {copy.title}
              </h2>
              <p className="mt-2 text-sm text-luxury-body">{copy.subtitle}</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 py-5 sm:px-8 sm:py-6"
            >
              <div className="space-y-4">
                <Field label="Name" id="lead-name" error={errors.name?.message}>
                  <input
                    id="lead-name"
                    className="field-input"
                    autoComplete="name"
                    {...register("name")}
                  />
                </Field>
                <Field
                  label="Phone number"
                  id="lead-phone"
                  error={errors.phone?.message}
                >
                  <input
                    id="lead-phone"
                    type="tel"
                    className="field-input"
                    autoComplete="tel"
                    placeholder="+91 …"
                    {...register("phone")}
                  />
                </Field>
                <Field label="Email" id="lead-email" error={errors.email?.message}>
                  <input
                    id="lead-email"
                    type="email"
                    className="field-input"
                    autoComplete="email"
                    {...register("email")}
                  />
                </Field>
                <Field
                  label="Podcast requirement / message"
                  id="lead-message"
                  error={errors.message?.message}
                >
                  <textarea
                    id="lead-message"
                    rows={3}
                    className="field-input resize-y"
                    placeholder="Topic, audience, goals…"
                    {...register("message")}
                  />
                </Field>
                <Field
                  label="Preferred Date"
                  id="lead-datetime"
                  error={errors.preferredDateTime?.message}
                >
                  <input
                    id="lead-datetime"
                    type="date"
                    className="field-input"
                    {...register("preferredDateTime")}
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-[var(--gold-foreground)] shadow-gold-glow transition hover:brightness-105 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit enquiry"
                )}
              </button>

              {status === "ok" ? (
                <p className="mt-4 text-center text-sm font-medium text-emerald-700">
                  Thank you! We received your details and will follow up shortly.
                </p>
              ) : null}
              {status === "err" ? (
                <p className="mt-4 text-center text-sm font-medium text-red-600">
                  Something went wrong. Please try again or message us on WhatsApp.
                </p>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-luxury-heading" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
