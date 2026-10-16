import type { Metadata } from "next";
import { PageHero } from "@/components/hero/page-hero";
import { GoldButton } from "@/components/ui/gold-button";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { HOME_FAQ } from "@/lib/site-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Answers to common questions about recording a podcast at ${SITE.name}, Bengaluru.`,
  openGraph: {
    title: `FAQ | ${SITE.name}`,
    description: "Location, equipment, turnaround, publishing, and more.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default async function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="Everything you might want to know before your first session. Can't find it? Call or WhatsApp us."
      >
        <GoldButton href="/contact">Ask us anything</GoldButton>
      </PageHero>
      <FaqSection showMoreLink={false} />
      <CtaSection />
    </div>
  );
}
