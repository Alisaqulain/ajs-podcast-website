import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutGrid, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FOUNDER } from "@/lib/site-content";

const CARDS = [
  {
    href: "/spaces",
    eyebrow: "Spaces",
    title: "2, 3 & 5-seater sets",
    body: "See each set and the green room.",
    icon: LayoutGrid,
  },
  {
    href: "/services",
    eyebrow: "Services",
    title: "Studio hire & add-ons",
    body: "Videographer, editing and extra equipment.",
    icon: Wrench,
  },
] as const;

/** Homepage signposts into the deeper pages. */
export function ExploreSection() {
  return (
    <section className="border-t border-luxury-border bg-white py-20 md:py-24" aria-label="Explore">
      <Container>
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map(({ href, eyebrow, title, body, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-[1.75rem] border border-luxury-border bg-sky-50/50 p-8 transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_18px_40px_-20px_rgba(14,116,144,0.4)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold-deep">
                {eyebrow}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-luxury-heading">{title}</p>
              <p className="mt-2 flex-1 text-luxury-body">{body}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold-deep">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}

          <Link
            href="/founder"
            className="group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[1.75rem] p-8 text-white transition hover:-translate-y-1"
          >
            <Image
              src={FOUNDER.photo}
              alt={FOUNDER.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-[50%_25%] transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#04223a] via-[#04223a]/50 to-transparent" />
            <span className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                Founder
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold">{FOUNDER.name}</span>
              <span className="mt-1 block text-sky-100/85">Creator with 400+ published videos.</span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                Meet Ajay <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
