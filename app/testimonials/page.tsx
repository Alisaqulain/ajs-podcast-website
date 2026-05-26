import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { CTAButton } from "@/components/hero/cta-button";
import { Container } from "@/components/ui/container";
import { listTestimonials } from "@/lib/data";
import { TestimonialSlider } from "@/components/testimonials/testimonial-slider";
import type { TestimonialItem } from "@/components/testimonials/testimonial-slider";
import { TestimonialGridCard } from "@/components/testimonials/testimonial-grid-card";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Stories from women who worked with Namrata and listened to the BHAW Namrata Podcast.",
  openGraph: {
    title: `Testimonials | ${SITE.name}`,
    description: "Client and listener reflections on confidence and self-image.",
  },
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const raw = await listTestimonials();
  const items: TestimonialItem[] = raw.map((t) => ({
    id: t.id,
    name: String(t.name),
    message: String(t.message),
    image: t.image ? String(t.image) : undefined,
  }));

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Testimonials"
        title="What founders say after they choose themselves"
        subtitle="A living gallery of courage, clarity, and the kind of confidence that compounds on camera."
      >
        <CTAButton intent="book">Book Podcast Now</CTAButton>
      </PageHero>

      <Container className="mt-14">
        {items.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-luxury-body">
            Testimonials will appear here as they are shared.{" "}
            <a href="/contact" className="font-semibold text-brand-gold-deep underline hover:text-brand-gold">
              Tell Namrata about your transformation
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
