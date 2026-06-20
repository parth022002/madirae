import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";

const timeline = [
  ["Sourcing", "Himalayan water, coastal cane, Goan cashew apples, Ratnagiri Alphonso, and wild Mahua flowers."],
  ["Distillation", "Small-batch copper work, clean fermentation, patient oak, and controlled carbonation."],
  ["Heritage", "Mahua flowers, Rajputana saffron notes, Goan Feni, and mountain Chhang reimagined for modern bars."],
  ["Ritual", "Bottle design, pairing logic, and cocktail essentials built for memorable social moments."]
];

export default function BrandStory() {
  return (
    <section className="section-padding relative overflow-hidden bg-mahogany">
      <div className="absolute inset-0 opacity-25">
        <Image src="/images/products/P40/Product-images-P40-P40.png" alt="MADIRÆ & Co. cocktail kit" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-mahogany via-mahogany/95 to-black/70" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8">
        <ScrollReveal>
          <p className="eyebrow">Brand Story</p>
          <h2 className="section-title mt-3">A modern Indian craft story with patient making.</h2>
          <p className="mt-6 text-base leading-8 text-smoke font-sans">
            Headquartered in Bengaluru and proudly available in 10+ states across India, MADIRÆ & Co. began with a simple idea: Indian ingredients, regions, and drinking occasions can create a brand that feels aspirational, approachable, and proudly local.
          </p>
        </ScrollReveal>
        <div className="grid gap-4">
          {timeline.map(([title, copy], index) => (
            <ScrollReveal key={title} className="glass-panel p-5">
              <div className="flex gap-5">
                <span className="font-display text-4xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl text-champagne">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-smoke">{copy}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
