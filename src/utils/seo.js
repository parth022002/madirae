import { siteConfig } from "@/config/siteConfig";

export function createMetadata({ title, description, path = "/", image = siteConfig.logo }) {
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.name} | ${siteConfig.tagline}`;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: description || siteConfig.description,
    alternates: { canonical: url },
    icons: {
      icon: "/images/logos/favicon-32x32.png",
      shortcut: "/images/logos/favicon-32x32.png",
      apple: "/images/logos/madirae-logo-optimized.png"
    },
    openGraph: {
      title: fullTitle,
      description: description || siteConfig.description,
      url,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630 }],
      type: "website"
    }
  };
}
