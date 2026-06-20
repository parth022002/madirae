import PageTransition from "@/components/animations/PageTransition";
import { createMetadata } from "@/utils/seo";
import { ShieldCheck, Truck, Scale, AlertOctagon } from "lucide-react";

export const metadata = createMetadata({
  title: "Legal & Regulatory Policy",
  description: "MADIRÆ & Co. legal and regulatory policy for alcohol communication, age verification, state-wise pricing, excise variation, and responsible drinking.",
  path: "/legal"
});

export default function LegalPage() {
  const complianceStates = [
    { name: "Karnataka", age: 21, mode: "Active D2C Home Delivery", limit: "Maximum 9 Liters per transaction", dryDays: "National Holidays, Local Election Days" },
    { name: "Tamil Nadu", age: 21, mode: "Retail Store Pick-Up / Partner-Store Dispatch", limit: "Maximum 4.5 Liters per transaction", dryDays: "National Holidays, Thiruvalluvar Day" },
    { name: "Maharashtra", age: 25, mode: "Licensed Retail Hub Delivery", limit: "Maximum 12 Bulk Beers / 2 Spirits", dryDays: "National Holidays, State Foundation Day" },
    { name: "Telangana", age: 21, mode: "Boutique Lounge Pick-Up & Local Hub Release", limit: "Maximum 9 Liters per transaction", dryDays: "National Holidays, local Dry Days" },
    { name: "Andhra Pradesh", age: 21, mode: "Licensed State-Store Dispatch Only", limit: "Maximum 3 Bulk Bottles per carriage", dryDays: "National Holidays, Gandhi Jayanti" },
    { name: "Uttar Pradesh", age: 21, mode: "Active Warehouse Dispatch", limit: "Maximum 6 Liters per shipment", dryDays: "National Holidays, Ram Navami, Holi" },
    { name: "West Bengal", age: 21, mode: "Licensed Express Delivery Partner Hub", limit: "Maximum 9 Liters per transaction", dryDays: "National Holidays, Durga Puja Dashami" },
    { name: "Rajasthan", age: 21, mode: "Royal Boutique Lounge Pick-Up", limit: "Maximum 5 Liters per transaction", dryDays: "National Holidays, Rajasthan Day" },
    { name: "Punjab", age: 25, mode: "Partner Boutique Dispatch", limit: "Maximum 9 Liters per transaction", dryDays: "National Holidays, local dry days" },
    { name: "Haryana", age: 25, mode: "Elite Store Delivery Hub", limit: "Maximum 18 Bulk Beers / 4 Spirits", dryDays: "National Holidays, local dry days" }
  ];

  return (
    <PageTransition>
      {/* Luxury Liquid Gold Header Banner */}
      <section className="bg-liquid-gold px-4 pb-16 pt-32 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,164,65,.15),transparent_40%)]" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Excise & Logistics Database
          </span>
          <h1 className="mt-4 font-display font-serif text-5xl text-champagne sm:text-7xl leading-tight">
            Legal & Regulatory Framework
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            Indian state excise compliance guides, geofenced carriage rules, transaction limitations, and legal drinking ages for MADIRÆ & Co. products.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-ink relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[140px] h-[500px] w-[500px] rounded-full pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Core Principles Row */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="glass-panel p-6 border border-white/10 bg-black/40 rounded-xl">
              <ShieldCheck className="h-8 w-8 text-gold mb-4" />
              <h3 className="font-display font-serif text-xl text-champagne mb-2">Age Verification Gate</h3>
              <p className="text-xs leading-5 text-smoke/75 font-sans">
                Every visitor must pass our pre-entry date gate. All transaction flows enforce secure, ephemeral OCR checks on Government IDs to verify identity and legal age before checkout.
              </p>
            </div>
            <div className="glass-panel p-6 border border-white/10 bg-black/40 rounded-xl">
              <Truck className="h-8 w-8 text-gold mb-4" />
              <h3 className="font-display font-serif text-xl text-champagne mb-2">Geofenced Carriage</h3>
              <p className="text-xs leading-5 text-smoke/75 font-sans">
                Our D2C shipping is locked to coordinates in our 10 active states. Pincodes are verified in real time at checkout to ensure legal compliance with regional excise borders.
              </p>
            </div>
            <div className="glass-panel p-6 border border-white/10 bg-black/40 rounded-xl">
              <Scale className="h-8 w-8 text-gold mb-4" />
              <h3 className="font-display font-serif text-xl text-champagne mb-2">Excise MRP Integrity</h3>
              <p className="text-xs leading-5 text-smoke/75 font-sans">
                Catalog prices are suggestive maximum retail prices (MRP) aligned with Bangalore hub excise. Final local prices are synchronized at checkout based on localized duties and venue rules.
              </p>
            </div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <p className="eyebrow">Active Operational Network</p>
            <h2 className="section-title mt-2">State-Wise Excise & Delivery Policies</h2>
            <p className="mt-3 text-xs text-smoke opacity-80 max-w-xl font-sans">
              Clickable, compliant rules showing drink limits, dry days, and age rules for our 10 high-sales territories.
            </p>
          </div>

          {/* 10 State Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {complianceStates.map((st) => (
              <div 
                key={st.name} 
                className="glass-panel p-6 border border-white/10 bg-black/40 rounded-xl flex flex-col justify-between hover:border-gold/30 transition duration-300 shadow-glow"
              >
                <div>
                  <h3 className="font-display font-serif text-2xl text-champagne border-b border-white/10 pb-2 mb-4">{st.name}</h3>
                  <div className="space-y-3 font-sans text-[11px] leading-5 text-smoke/85">
                    <div>
                      <span className="block text-gold font-bold uppercase tracking-wider text-[9px]">Legal Drinking Age</span>
                      <span className="text-sm font-semibold">{st.age} Years or Older</span>
                    </div>
                    <div>
                      <span className="block text-gold font-bold uppercase tracking-wider text-[9px]">Distribution Mode</span>
                      <span>{st.mode}</span>
                    </div>
                    <div>
                      <span className="block text-gold font-bold uppercase tracking-wider text-[9px]">Carriage Limit</span>
                      <span>{st.limit}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5">
                  <span className="block text-gold font-bold uppercase tracking-wider text-[8px] font-sans">Declared Dry Days</span>
                  <span className="text-[10px] text-smoke opacity-70 font-sans block mt-1">{st.dryDays}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Double Verification Protocol Box */}
          <div className="mt-16 rounded-2xl border border-warning/20 bg-warning/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-warning/5 blur-3xl rounded-full"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-xl text-warning">
                <AlertOctagon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-serif text-2xl text-champagne mb-2">Double-Verification Carriage Protocol</h4>
                <p className="text-xs leading-6 text-smoke opacity-90 font-sans">
                  To safeguard against underage delivery, MADIRÆ & Co. implements a strict double-verification protocol. All digital purchases are registered with an ephemeral Government ID check (purged instantly under our DPDP Act policy). Upon home delivery or store release, our licensed carriage rider, Suresh Kumar, will conduct a physical age check and match your delivery OTP to execute secure release. Strictly no third-party collections are permitted.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageTransition>
  );
}
