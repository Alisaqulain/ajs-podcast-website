import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialsSectionCta } from "@/components/home/testimonials-section-cta";
import { listTestimonials } from "@/lib/data";
import { HOME_TESTIMONIALS } from "@/lib/site-content";
import {
  TestimonialSlider,
  type TestimonialItem,
} from "@/components/testimonials/testimonial-slider";
import { TestimonialGridCard } from "@/components/testimonials/testimonial-grid-card";
import { stripHtml } from "@/lib/strip-html";

export async function TestimonialsSection() {
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

  const displayItems: TestimonialItem[] =
    items.length > 0
      ? items
      : HOME_TESTIMONIALS.fallbacks.map((t, i) => ({
          id: `fallback-${i}`,
          name: t.name,
          message: t.message,
        }));

  const preview = displayItems.slice(0, 6);

  return (
    <section className="border-t border-luxury-border bg-luxury-section py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={HOME_TESTIMONIALS.eyebrow}
          title={HOME_TESTIMONIALS.title}
          subtitle={
            items.length === 0
              ? "What hosts, guests, and brands say about recording at Anushtan."
              : "Real words from guests and clients who turned one conversation into lasting credibility."
          }
        />

        <TestimonialSlider items={displayItems} />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((t, idx) => (
            <TestimonialGridCard key={t.id ?? idx} item={t} index={idx} />
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-8 text-center text-sm text-luxury-muted">
            Share your experience on the{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-gold-deep hover:text-brand-gold"
            >
              contact page
            </Link>
            .
          </p>
        ) : null}

        <TestimonialsSectionCta />
      </Container>
    </section>
  );
}
