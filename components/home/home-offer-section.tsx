import Link from "next/link";
import { ArrowRight, DoorOpen, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { STUDIO_SPACES } from "@/lib/site-content";

/** Homepage "What we offer": the three spaces and the green room. Deliberately calm. */
export function HomeOfferSection() {
  return (
    <section
      id="offer"
      className="scroll-mt-28 bg-white py-20 md:py-28"
      aria-labelledby="offer-heading"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
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

        </div>
      </Container>
    </section>
  );
}
