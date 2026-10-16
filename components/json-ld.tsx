import { SITE } from "@/lib/site";

const siteUrl = SITE.url;

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: ["Anushtan Podcast Studio", "Anushtan Studio"],
    founder: { "@type": "Person", name: "Ajay Rao", url: SITE.creatorSiteUrl },
    url: siteUrl,
    email: SITE.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "#27, Castle Street",
      addressLocality: "Bengaluru",
      postalCode: "560025",
      addressCountry: "IN",
    },
    sameAs: [SITE.social.youtube, SITE.social.instagram, SITE.creatorSiteUrl].filter(Boolean),
    knowsAbout: ["Podcast production", "Video production", "Brand storytelling", "Short-form video"],
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
    name: "Anushtan Episodes",
    url: `${siteUrl}/podcast`,
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
    description: SITE.description,
    webFeedElement: SITE.videosUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
