import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import { listTestimonials } from "@/lib/data";
import { TestimonialSlider } from "@/components/testimonials/testimonial-slider";
import type { TestimonialItem } from "@/components/testimonials/testimonial-slider";
import { TestimonialGridCard } from "@/components/testimonials/testimonial-grid-card";
import { BOOK_NOW_LABEL } from "@/lib/cta";
import { SITE } from "@/lib/site";
import { stripHtml } from "@/lib/strip-html";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    `What hosts, guests, and brands say about recording at ${SITE.name}.`,
  openGraph: {
    title: `Testimonials | ${SITE.name}`,
    description: "What hosts, guests, and brands say about recording at AJ's Studio Space.",
  },
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const raw = await listTestimonials();
  const items: TestimonialItem[] = raw.map((t) => ({
    id: t.id,
    name: String(t.name),
    message: String(
      t.shortDescription ||
        stripHtml(String(t.content || t.message || ""))
    ),
    image:
      t.featuredImage || t.image
        ? String(t.featuredImage || t.image)
        : undefined,
    rating:
      typeof t.rating === "number" && t.rating >= 1 && t.rating <= 5
        ? t.rating
        : undefined,
  }));

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Testimonials"
        title="What people say about the studio"
        subtitle="Reflections from clients, collaborators, and viewers."
      >
        <CTAButton intent="book">{BOOK_NOW_LABEL}</CTAButton>
      </PageHero>

      <Container className="mt-14">
        {items.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-luxury-body">
            Testimonials will appear here as they are shared.{" "}
            <a href="/contact" className="font-semibold text-brand-gold-deep underline hover:text-brand-gold">
              Share your experience with us
            </a>
            .
          </div>
        ) : (
          <>
            <TestimonialSlider items={items} />
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t, idx) => (
                <TestimonialGridCard key={t.id ?? idx} item={t} index={idx} />
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
