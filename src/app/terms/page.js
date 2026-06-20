import PageTransition from "@/components/animations/PageTransition";
import { createMetadata } from "@/utils/seo";
import { Scale, Lock, BookOpen, AlertTriangle } from "lucide-react";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "MADIRÆ & Co. website terms of use covering legal drinking age, responsible consumption, product information, pricing, and website access.",
  path: "/terms"
});

export default function TermsPage() {
  const termSections = [
    {
      id: "age-affirmation",
      icon: <Lock className="h-6 w-6 text-gold" />,
      title: "1. Legal Drinking Age Affirmation",
      content: "By accessing the MADIRÆ & Co. digital catalog or entering this platform, you affirm under oath that you are of legal drinking age in your state of residence. In India, these limits vary by state (e.g. Karnataka: 21, Tamil Nadu: 21, Maharashtra: 25, Haryana: 25, Punjab: 25, Goa: 18). Any attempt to falsify compliance or browse underage constitutes a material breach of this agreement and is strictly prohibited."
    },
    {
      id: "geofenced-carriage",
      icon: <Scale className="h-6 w-6 text-gold" />,
      title: "2. Geofenced D2C Order Transactions",
      content: "Our online transaction portal operates under strict state excise regulations. Home carriage and retail pick-up orders are strictly geofenced within our 10 active states: Karnataka, Tamil Nadu, Maharashtra, Telangana, Andhra Pradesh, Uttar Pradesh, West Bengal, Rajasthan, Punjab, and Haryana. Pincodes must be verified at checkout, and orders originating from dry states (such as Bihar, Gujarat, Mizoram, Nagaland, and Lakshadweep) are automatically blocked in compliance with local excise codes."
    },
    {
      id: "doorstep-verification",
      icon: <BookOpen className="h-6 w-6 text-gold" />,
      title: "3. Doorstep Verification & OTP Release Rules",
      content: "To guarantee zero underage deliveries, all completed orders are subject to physical verification by our licensed carriage rider, Suresh Kumar, or authorized retail partners. Upon arrival, the customer must present a physical Government ID that matches the date of birth entered at registration and supply the secure transactional delivery OTP. MADIRÆ & Co. reserves the absolute right to refuse release and forfeit delivery charges if matching credentials cannot be physically produced."
    },
    {
      id: "mrp-guidance",
      icon: <Scale className="h-6 w-6 text-gold" />,
      title: "4. Excise MRP & Catalog Integrity",
      content: "Product images, ABV (Alcohol by Volume), ingredients profiles, and pricing catalogs are for general discovery and information. Maximum retail prices (MRP) shown across the site are suggestive and include standard state excise. Final transaction prices are calculated based on local state excise duty structures, local retail tax brackets, and municipal merchant markups at the exact time of order validation."
    },
    {
      id: "intellectual-property",
      icon: <BookOpen className="h-6 w-6 text-gold" />,
      title: "5. Proprietary Branding & Media Limits",
      content: "The custom design systems, liquid gold CSS variables, high-fidelity responsive bottle showreels, vector assets, logos, and ingredients timelines shown on the MADIRÆ & Co. website are the exclusive intellectual property of MADIRÆ & Co. Bengaluru Headquarters. Visitors are granted a limited, non-transferable personal license to view the site. No mirroring, replication, or commercial exploitation is permitted."
    }
  ];

  return (
    <PageTransition>
      {/* Luxury Liquid Gold Header Banner */}
      <section className="bg-liquid-gold px-4 pb-16 pt-32 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(217,164,65,.15),transparent_40%)]" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <p className="eyebrow">User Agreement</p>
          <h1 className="mt-4 font-display font-serif text-5xl text-champagne sm:text-6xl leading-tight">
            Terms of Use & Service
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            Please read these terms carefully. Accessing the MADIRÆ & Co. experience implies full assent to our legal distribution, age limits, and carriage guidelines.
          </p>
        </div>
      </section>

      {/* Main Terms Layout */}
      <section className="section-padding bg-ink relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[125px] h-[400px] w-[400px] rounded-full pointer-events-none"></div>
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="space-y-6">
            {termSections.map((sect) => (
              <div 
                key={sect.id} 
                className="glass-panel p-8 border border-white/10 bg-black/40 shadow-glow rounded-2xl hover:border-gold/30 transition duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-gold/5 border border-gold/15 shrink-0">
                    {sect.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-serif text-2xl text-champagne mb-4">{sect.title}</h2>
                    <p className="text-xs leading-7 text-smoke/90 font-sans">{sect.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Health and Legal Mandate warning */}
            <div className="glass-panel p-8 border border-warning/20 bg-warning/5 rounded-2xl">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 rounded-lg bg-warning/10 border border-warning/20 text-warning shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display font-serif text-2xl text-warning mb-3">6. Responsible Consumption Mandate</h2>
                  <p className="text-xs leading-6 text-smoke/90 font-sans mb-4">
                    MADIRÆ & Co. products are created solely for legal, mature, and responsible consumption. 
                    Alcohol must never be consumed or ordered by minors, pregnant individuals, or those advised against consumption by medical professionals. Do not drink and drive. Under state laws, driving under the influence (DUI) constitutes a major offense.
                  </p>
                  <div className="text-[10px] text-smoke opacity-60 uppercase font-sans tracking-wide">
                    ⚠️ Government Health Warning: Alcohol consumption is injurious to health. Be Responsible.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
