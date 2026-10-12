"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import {
  createBookingRequest,
  startRazorpayCheckout,
  validateBookingForm,
  type BookingFormValues,
} from "@/lib/booking-client";
import { BookingDateTimePicker } from "@/components/booking/booking-datetime-picker";
import { BookingDetailsFields } from "@/components/booking/booking-details-fields";
import { BookingPackageSelect } from "@/components/booking/booking-package-select";
import type { PackagePublic } from "@/components/booking/booking-experience";
import { useLeadCapture } from "./lead-capture-context";

const emptyForm: BookingFormValues = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  topic: "",
  dateStr: "",
  time: "",
};

/** Booking popup — same fields & calendar as /book */
export function LeadPopupForm() {
  const { isOpen, close } = useLeadCapture();
  const [mounted, setMounted] = useState(false);
  const [packages, setPackages] = useState<PackagePublic[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [values, setValues] = useState<BookingFormValues>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

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
      setValues(emptyForm);
      setMessage(null);
      setSubmitting(false);
      return;
    }
    (async () => {
      const res = await fetch("/api/packages");
      const data = (await res.json()) as PackagePublic[];
      const list = Array.isArray(data) ? data : [];
      setPackages(list);
      setSelectedId(list[0]?._id ?? null);
    })();
  }, [isOpen]);

  function patch(patch: Partial<BookingFormValues>) {
    setValues((v) => ({ ...v, ...patch }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const err = validateBookingForm(values, selectedId);
    if (err) {
      setMessage({ type: "err", text: err });
      return;
    }

    setSubmitting(true);
    try {
      const { bookingId } = await createBookingRequest(selectedId!, values);
      await startRazorpayCheckout({
        bookingId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        onSuccess: () => {
          setMessage({
            type: "ok",
            text: "Booking confirmed. The studio will reach out with session details.",
          });
          setValues(emptyForm);
        },
        onError: (text) => setMessage({ type: "err", text }),
      });
    } catch (e) {
      setMessage({
        type: "err",
        text:
          e instanceof Error ? e.message : "Something went wrong. Try again.",
      });
    } finally {
      setSubmitting(false);
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
              "relative z-10 flex max-h-[min(94dvh,900px)] w-full max-w-3xl flex-col overflow-hidden",
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
                AJ&apos;S Studio
              </p>
              <h2
                id="lead-modal-title"
                className="mt-2 pr-10 font-display text-2xl font-semibold text-luxury-heading"
              >
                {BOOK_NOW_LABEL}
              </h2>
              <p className="mt-2 text-sm text-luxury-body">
                Same booking flow as our book page—choose a package, Wed/Fri slot,
                and complete secure payment.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 py-5 sm:px-8 sm:py-6"
            >
              <div className="space-y-6">
                <BookingPackageSelect
                  idPrefix="lead"
                  packages={packages}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <BookingDetailsFields
                  idPrefix="lead"
                  values={values}
                  onChange={patch}
                  labelClassName="text-sm font-medium normal-case tracking-normal"
                />
                <BookingDateTimePicker
                  idPrefix="lead"
                  dateStr={values.dateStr}
                  time={values.time}
                  onDateChange={(dateStr) => patch({ dateStr })}
                  onTimeChange={(time) => patch({ time })}
                  compact
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !selectedId}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-gradient py-3.5 text-sm font-semibold text-[var(--gold-foreground)] shadow-gold-glow transition hover:brightness-105 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  BOOK_NOW_LABEL
                )}
              </button>

              {message ? (
                <p
                  className={cn(
                    "mt-4 text-center text-sm font-medium",
                    message.type === "ok" ? "text-emerald-700" : "text-red-600"
                  )}
                  role="status"
                >
                  {message.text}
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
