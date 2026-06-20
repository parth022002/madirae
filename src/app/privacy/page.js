import PageTransition from "@/components/animations/PageTransition";
import { createMetadata } from "@/utils/seo";
import { ShieldAlert, Trash2, EyeOff, Cookie } from "lucide-react";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "MADIRÆ & Co. privacy policy covering newsletter data, analytics, contact preferences, cookies, and responsible use of visitor information.",
  path: "/privacy"
});

export default function PrivacyPage() {
  const policyPoints = [
    {
      id: "data-minimization",
      icon: <EyeOff className="h-6 w-6 text-gold" />,
      title: "1. Data Minimization & Consent Limits",
      content: "In absolute alignment with India's Digital Personal Data Protection (DPDP) Act, 2023, MADIRÆ & Co. operates under strict data minimization rules. We capture only the bare minimum personal data required to safely route D2C carriage, confirm legal ages, and deliver product launch newsletters. We never lease, trade, sell, or profile your personal data with third-party tracking corporations."
    },
    {
      id: "ephemeral-ocr",
      icon: <ShieldAlert className="h-6 w-6 text-gold" />,
      title: "2. Ephemeral Govt ID OCR Verification",
      content: "For compliance with state excise age limits, we verify age using a photograph of a Government ID (such as Aadhaar, PAN, Voter ID, or DL) during registration. Under our DPDP Privacy Guard policy, this document is parsed instantly in temporary RAM to verify age and legal name. The file is IMMEDIATELY PURGED from memory and is never written to disk, saved to databases, or cached on our servers. No copies or logs of the ID are retained."
    },
    {
      id: "newsletter-supabase",
      icon: <Trash2 className="h-6 w-6 text-gold" />,
      title: "3. Newsletter Data & Communication Privacy",
      content: "Newsletter subscriptions are captured voluntarily. Customer emails are stored in a secure Supabase database schema strictly to distribute flavor updates, heritage stouts recipes, and local MRP guidance. Submissions trigger secure email alerts to madiraeandco@gmail.com. Customers possess the absolute right to withdraw consent and request immediate deletion by emailing us."
    },
    {
      id: "cookie-policy",
      icon: <Cookie className="h-6 w-6 text-gold" />,
      title: "4. Cookie Storage & Anonymous Analytics",
      content: "We utilize cookies to maintain verification states (such as '__madirae_gate_v2') and preserve state selections during your catalog navigation. Anonymous analytics are captured solely to measure page compile speeds and visual showcase rendering times. No marketing tracking cookies or invasive scripts are loaded."
    }
  ];

  return (
    <PageTransition>
      {/* Luxury Liquid Gold Header Banner */}
      <section className="bg-liquid-gold px-4 pb-16 pt-32 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,164,65,.15),transparent_40%)]" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <p className="eyebrow">DPDP Act Safeguard</p>
          <h1 className="mt-4 font-display font-serif text-5xl text-champagne sm:text-6xl leading-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            How MADIRÆ & Co. implements privacy shields and securely manages customer personal profiles under modern Indian privacy frameworks.
          </p>
        </div>
      </section>

      {/* Main Privacy Layout */}
      <section className="section-padding bg-ink relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[125px] h-[400px] w-[400px] rounded-full pointer-events-none"></div>
        
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="space-y-6">
            {policyPoints.map((point) => (
              <div 
                key={point.id} 
                className="glass-panel p-8 border border-white/10 bg-black/40 shadow-glow rounded-2xl hover:border-gold/30 transition duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-gold/5 border border-gold/15 shrink-0">
                    {point.icon}
                  </div>
                  <div>
                    <h2 className="font-display font-serif text-2xl text-champagne mb-4">{point.title}</h2>
                    <p className="text-xs leading-7 text-smoke/90 font-sans">{point.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Account Deletion and Erase Action Box */}
            <div className="glass-panel p-8 border border-emerald-500/20 bg-emerald-950/5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-glow-success">
              <div>
                <h3 className="font-display font-serif text-2xl text-champagne mb-2">Right to Deletion (Right to be Forgotten)</h3>
                <p className="text-xs leading-6 text-smoke/80 font-sans max-w-xl">
                  You hold full authority to request data deletion. To request complete, instant erasure of your newsletter records or verified login credentials, simply contact our privacy officers. We process all deletion requests within 24 hours.
                </p>
              </div>
              <a 
                href="mailto:madiraeandco@gmail.com?subject=MADIRAE Data Erasure Request"
                className="inline-flex min-h-10 items-center justify-center bg-gold hover:bg-gold-light text-ink text-[11px] font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg font-sans transition shrink-0 shadow-glow"
              >
                Request Erasure
              </a>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
