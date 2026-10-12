import { SITE } from "@/lib/site";

const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: ["AJ'S Studio", "Aj's Cycling Vlog"],
    url: siteUrl,
    email: SITE.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "#27, Castle street",
      addressLocality: "Bangalore",
      postalCode: "560025",
      addressCountry: "IN",
    },
    sameAs: [SITE.social.youtube, SITE.social.instagram].filter(Boolean),
    knowsAbout: ["Cycling", "Video production", "Podcasting", "Photography"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PodcastSeriesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoSeries",
    name: "Aj's Cycling Vlog",
    url: `${siteUrl}/podcast`,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    description: SITE.description,
    webFeedElement: SITE.social.youtube,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
