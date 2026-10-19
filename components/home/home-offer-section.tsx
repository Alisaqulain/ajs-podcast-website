import Link from "next/link";
import { ArrowRight, Check, DoorOpen, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  CHARGEABLE_NOTE,
  STUDIO_INCLUDES,
  STUDIO_SPACES,
} from "@/lib/site-content";

/** Homepage "What we offer": spaces on the left, rate card on the right. Deliberately calm. */
export function HomeOfferSection() {
  return (
    <section
      id="offer"
      className="scroll-mt-28 bg-white py-20 md:py-28"
      aria-labelledby="offer-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Spaces */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold-deep">
              What we offer
            </p>
            <h2
              id="offer-heading"
              className="mt-4 font-display text-4xl font-semibold leading-tight text-luxury-heading md:text-5xl"
            >
              A podcast studio, ready when you are
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-luxury-body">
              Three sets to choose from, a green room to get ready, and everything you
              need to start recording.
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {STUDIO_SPACES.items.map((s) => (
                <li
                  key={s.label}
                  className="rounded-3xl border border-luxury-border bg-sky-50/50 p-6 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_40px_-20px_rgba(14,116,144,0.4)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white">
                    <Users className="h-5 w-5" />
                  </span>
                  <p className="mt-5 font-display text-4xl font-semibold text-luxury-heading">
                    {s.seats}
                  </p>
                  <p className="text-sm font-medium text-luxury-body">Seater</p>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-4 rounded-3xl border border-luxury-border bg-sky-50/50 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <DoorOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-luxury-heading">{STUDIO_SPACES.greenRoom.title}</p>
                <p className="text-sm text-luxury-body">{STUDIO_SPACES.greenRoom.description}</p>
              </div>
            </div>

            <Link
              href="/spaces"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-deep hover:underline"
            >
              Explore the spaces <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Rate card */}
          <div className="relative">
            <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#04223a] via-[#062f4f] to-[#0b3d63] p-8 text-white shadow-[0_30px_80px_-30px_rgba(4,34,58,0.7)] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                Every booking
              </p>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-6xl font-semibold">₹1,000</span>
                <span className="text-lg text-sky-100/80">/ hour</span>
              </p>
              <p className="mt-2 text-sm text-sky-100/70">Same rate for every set.</p>

              <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-8">
                {STUDIO_INCLUDES.map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-400/25">
                      <Check className="h-3.5 w-3.5 text-sky-200" />
                    </span>
                    <span className="text-sky-50">
                      {item.text}
                      {item.chargeable ? (
                        <span className="ml-1 text-amber-300" aria-label={CHARGEABLE_NOTE}>
                          ★
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-sky-100/70">
                <span className="text-amber-300">★</span> {CHARGEABLE_NOTE}. Any additional
                equipment is also charged at actuals.
              </p>

              <Link
                href="/book"
                className="mt-8 flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 text-sm font-semibold text-[#04223a] transition hover:brightness-110"
              >
                Book a session <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
