"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { Container } from "@/components/ui/container";
import { PaymentTrustBadges } from "@/components/payment/payment-trust-badges";
import { BookingDateTimePicker } from "@/components/booking/booking-datetime-picker";
import { BookingDetailsFields } from "@/components/booking/booking-details-fields";
import {
  createBookingRequest,
  formatInrPaise,
  payablePaise,
  startRazorpayCheckout,
  validateBookingForm,
  type BookingFormValues,
} from "@/lib/booking-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export type PackagePublic = {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  features: string[];
  badge?: string;
  buttonText?: string;
  isDefault?: boolean;
  active?: boolean;
};

const emptyForm: BookingFormValues = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  topic: "",
  dateStr: "",
  time: "",
};

function pickInitialPackageId(
  list: PackagePublic[],
  queryPackageId: string | null
) {
  if (queryPackageId && list.some((p) => p._id === queryPackageId)) {
    return queryPackageId;
  }
  const def = list.find((p) => p.isDefault);
  return def?._id ?? list[0]?._id ?? null;
}

export function BookingExperience({
  initialPackages,
}: {
  initialPackages: PackagePublic[];
}) {
  const searchParams = useSearchParams();
  const queryPackageId = searchParams.get("package");

  const [packages, setPackages] = useState<PackagePublic[]>(initialPackages);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    pickInitialPackageId(initialPackages, queryPackageId)
  );
  const [values, setValues] = useState<BookingFormValues>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (initialPackages.length) return;
    (async () => {
      const res = await fetch("/api/packages");
      const data = (await res.json()) as PackagePublic[];
      const list = Array.isArray(data) ? data : [];
      setPackages(list);
      setSelectedId((prev) =>
        prev && list.some((p) => p._id === prev)
          ? prev
          : pickInitialPackageId(list, queryPackageId)
      );
    })();
  }, [initialPackages.length, queryPackageId]);

  const selected = useMemo(
    () => packages.find((p) => p._id === selectedId) ?? null,
    [packages, selectedId]
  );

  const scrollToForm = useCallback(() => {
    document
      .getElementById("booking-details")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const selectPackage = useCallback(
    (id: string) => {
      setSelectedId(id);
      setMessage(null);
      requestAnimationFrame(scrollToForm);
    },
    [scrollToForm]
  );

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

  return (
    <div id="packages" className="scroll-mt-28 space-y-16 md:space-y-24">
      <section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              Packages
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-luxury-heading md:text-4xl">
              Choose your studio package
            </h2>
            <p className="mt-4 text-base text-luxury-body">
              Pick your studio set (2, 3 or 5 seats) at ₹1,000 an hour. Add a videographer
              or editing if you need them. Select one to unlock the booking calendar—sessions are
              held on{" "}
              <strong className="text-luxury-heading">Wednesdays &amp; Fridays</strong>.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {packages.length === 0 ? (
              <div className="glass-panel xl:col-span-3 rounded-4xl border border-dashed border-brand-gold/40 p-12 text-center text-luxury-body">
                Packages are being curated. Please check back soon or{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-brand-gold-deep underline"
                >
                  contact us
                </Link>
                .
              </div>
            ) : (
              packages.map((pkg, i) => {
                const active = pkg._id === selectedId;
                const pay = payablePaise(pkg);
                const showStrike =
                  pkg.discountPrice != null &&
                  pkg.discountPrice > 0 &&
                  pay < Math.round(pkg.price);
                const popular =
                  pkg.badge?.toLowerCase().includes("popular") ?? false;
                return (
                  <motion.article
                    key={pkg._id}
                    layout
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className={cn(
                      "glass-panel group relative flex flex-col overflow-hidden rounded-4xl border border-luxury-border p-8 shadow-luxury-card transition-shadow duration-300 hover:border-brand-gold/45 hover:shadow-gold-glow",
                      active &&
                        "ring-2 ring-brand-gold/45 shadow-[0_12px_40px_-10px_rgba(201,161,74,0.28)]",
                      popular && !active && "ring-1 ring-brand-gold/35"
                    )}
                  >
                    {pkg.badge ? (
                      <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {pkg.badge}
                      </span>
                    ) : null}
                    <h3 className="pr-24 font-display text-xl font-semibold text-luxury-heading md:text-2xl">
                      {pkg.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-luxury-muted">
                      {pkg.description}
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5 text-sm text-luxury-body">
                      {pkg.features?.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-deep" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 border-t border-luxury-border pt-6">
                      <div className="flex flex-wrap items-end gap-2">
                        {showStrike ? (
                          <span className="text-sm text-luxury-muted line-through">
                            {formatInrPaise(pkg.price)}
                          </span>
                        ) : null}
                        <span className="font-display text-3xl font-semibold bg-gold-gradient bg-clip-text text-transparent tabular-nums">
                          {formatInrPaise(pay)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => selectPackage(pkg._id)}
                        className={cn(
                          "mt-5 w-full rounded-full py-3.5 text-sm font-semibold tracking-wide transition",
                          active
                            ? "bg-gold-gradient text-[#1A1A1A] shadow-gold-glow"
                            : "border-2 border-luxury-border bg-transparent text-luxury-heading hover:border-brand-gold hover:bg-brand-gold/10"
                        )}
                      >
                        {active ? "Selected" : "Select package"}
                      </button>
                    </div>
                  </motion.article>
                );
              })
            )}
          </div>
        </Container>
      </section>

      <section id="booking-details" className="scroll-mt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={onSubmit}
              className="surface-form space-y-6 rounded-4xl p-8 md:p-10"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-luxury-heading">
                  Your details
                </h3>
                <p className="mt-2 text-sm text-luxury-muted">
                  {selected
                    ? `Booking for: ${selected.title}`
                    : "Select a package above."}
                </p>
              </div>

              <BookingDetailsFields
                values={values}
                onChange={patch}
              />

              <BookingDateTimePicker
                dateStr={values.dateStr}
                time={values.time}
                onDateChange={(dateStr) => patch({ dateStr })}
                onTimeChange={(time) => patch({ time })}
              />

              <button
                type="submit"
                disabled={submitting || !selected}
                className="inline-flex w-full min-h-14 items-center justify-center gap-2 rounded-full bg-gold-gradient text-sm font-semibold text-[#1A1A1A] shadow-gold-glow transition hover:brightness-110 hover:-translate-y-0.5 hover:scale-[1.01] disabled:opacity-55"
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
                    "text-sm font-medium",
                    message.type === "ok" ? "text-emerald-700" : "text-red-600"
                  )}
                  role="status"
                >
                  {message.text}
                </p>
              ) : null}

              <PaymentTrustBadges />
            </motion.form>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="glass-panel rounded-4xl p-8 shadow-luxury-card">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold-deep">
                  Summary
                </p>
                <p className="mt-4 text-sm text-luxury-body">
                  {selected ? selected.title : "No package selected"}
                </p>
                {selected ? (
                  <p className="mt-6 font-display text-3xl font-semibold bg-gold-gradient bg-clip-text text-transparent tabular-nums">
                    {formatInrPaise(payablePaise(selected))}
                  </p>
                ) : null}
                <ul className="mt-6 space-y-2 text-xs text-luxury-muted">
                  <li>Razorpay secure checkout</li>
                  <li>Calendar holds Wed &amp; Fri (IST)</li>
                  <li>Confirmation after successful payment</li>
                </ul>
              </div>
              <p className="text-center text-xs text-luxury-muted">
                By paying you agree to our{" "}
                <Link href="/terms" className="text-brand-gold-deep underline hover:text-brand-gold">
                  Terms
                </Link>
                ,{" "}
                <Link href="/privacy-policy" className="text-brand-gold-deep underline hover:text-brand-gold">
                  Privacy
                </Link>
                , and{" "}
                <Link href="/refund-policy" className="text-brand-gold-deep underline hover:text-brand-gold">
                  Refund policy
                </Link>
                .
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
