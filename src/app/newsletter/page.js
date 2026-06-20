import PageTransition from "@/components/animations/PageTransition";
import Newsletter from "@/components/sections/Newsletter";
import { newsletterEmail } from "@/lib/constants";
import { createMetadata } from "@/utils/seo";

export const metadata = createMetadata({
  title: "MADIRÆ & Co. Newsletter - Premium Indian Craft Alcohol Drops",
  description: "Join the MADIRÆ & Co. newsletter list for luxury Indian spirit releases, product drops, cocktail recipes, tasting sessions, and exclusive Bengaluru pricing updates.",
  path: "/newsletter"
});

export default function NewsletterPage() {
  return (
    <PageTransition>
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Newsletter</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-champagne sm:text-7xl">
            MADIRÆ & Co. news, recipes, prices, and product drops.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-smoke">
            Subscribe for updates managed by the MADIRÆ & Co. project team at {newsletterEmail}.
          </p>
        </div>
      </section>
      <Newsletter />
    </PageTransition>
  );
}
