"use client";

import { useState } from "react";
import { HelpCircle, Mail, Phone, Clock, ShieldCheck, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel border border-white/10 bg-black/45 rounded-xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none hover:text-gold transition"
      >
        <span className="font-display font-serif text-lg text-champagne sm:text-xl">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gold shrink-0" /> : <ChevronDown className="h-5 w-5 text-gold shrink-0" />}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-black/20">
          <p className="text-xs leading-6 text-smoke/90 font-sans">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const faqs = [
    {
      question: "In which states does MADIRÆ & Co. distribute?",
      answer: "MADIRÆ & Co. is currently excise registered and active in 10 major high-sales states: Karnataka, Tamil Nadu, Maharashtra, Telangana, Andhra Pradesh, Uttar Pradesh, West Bengal, Rajasthan, Punjab, and Haryana. Deliveries or retail pick-ups are strictly restricted within these states in compliance with individual state guidelines."
    },
    {
      id: "age-gate-faq",
      question: "How is the digital age verification executed?",
      answer: "We implement a secure double-verification system. First, users register by uploading their Government ID for an ephemeral OCR check (processed in RAM and purged instantly to comply with the DPDP Act). Second, upon doorstep delivery or retail collection, our licensed carriage rider, Suresh Kumar, will conduct a physical age check and require the transaction OTP to complete the release."
    },
    {
      question: "What are your delivery hours and limits?",
      answer: "In compliance with excise guidelines, D2C home carriage operates strictly between 10:00 AM and 10:00 PM. Carriage is fully locked on state-declared Dry Days. Individual state volume limits apply (e.g. maximum 9 liters per transaction in Karnataka)."
    },
    {
      question: "Can I cancel or return my alcohol order?",
      answer: "Under state excise laws, once an alcoholic product's security seal is broken or it has left our distribution hub, returns or refunds cannot be processed. Cancellations are only permitted prior to logistics dispatch. If you receive a damaged bottle, please email support at madiraeandco@gmail.com with photo evidence within 2 hours of delivery for a replacement."
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  };

  return (
    <PageTransition>
      {/* Luxury Liquid Gold Header Banner */}
      <section className="bg-liquid-gold px-4 pb-16 pt-32 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(217,164,65,.15),transparent_40%)]" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Support Center
          </span>
          <h1 className="mt-4 font-display font-serif text-5xl text-champagne sm:text-7xl leading-tight">
            Customer Care & Carriage Help
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80 font-sans">
            Have questions about our 10-state shipping rules, age gate verification, or orders? We are here to help you experience MADIRÆ smoothly.
          </p>
        </div>
      </section>

      {/* Main Support Grid */}
      <section className="section-padding bg-ink relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold/5 blur-[130px] h-[450px] w-[450px] rounded-full pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* Left Column: FAQs & Policies */}
            <div className="space-y-8">
              <div>
                <p className="eyebrow">Frequently Asked Questions</p>
                <h2 className="section-title mt-2">Excise & General Inquiry Guides</h2>
              </div>
              
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>

              <div className="pt-6">
                <p className="eyebrow">Shipping & Refunds Policy</p>
                <h2 className="section-title mt-2">State-by-State Carriage Rules</h2>
                <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-black/40 rounded-xl mt-6 space-y-6 font-sans text-xs leading-6 text-smoke">
                  <div className="flex gap-4">
                    <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-champagne text-sm mb-1">Carriage Delivery Timelines</h4>
                      <p>
                        Our Bangalore hub executes local home delivery within 2 hours. Deliveries in Tamil Nadu, Maharashtra, Telangana, and other active states are dispatched via licensed partner stores and typically arrive within 24 to 48 hours depending on municipal permit checks.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-champagne text-sm mb-1">Excise Sealed Goods Return Restriction</h4>
                      <p>
                        In absolute compliance with state excise policies, we operate under a strict no-return policy once goods have left retail warehouses. Should you cancel before dispatch, refunds are credited back to your original payment method within 5-7 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Contact form & details */}
            <div className="space-y-8">
              
              {/* Quick Contact Cards */}
              <div className="glass-panel p-6 border border-white/10 bg-black/40 rounded-xl space-y-4">
                <h3 className="font-display font-serif text-xl text-champagne mb-4 border-b border-white/10 pb-2">Direct Channels</h3>
                <div className="flex items-center gap-4 text-xs font-sans text-smoke">
                  <div className="h-9 w-9 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-gold uppercase tracking-wider text-[8px] font-bold">Email Support</span>
                    <a href="mailto:madiraeandco@gmail.com" className="hover:underline text-champagne font-semibold">madiraeandco@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-sans text-smoke">
                  <div className="h-9 w-9 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="block text-gold uppercase tracking-wider text-[8px] font-bold">Helpline Hours</span>
                    <span className="text-champagne font-semibold">10:00 AM - 10:00 PM Daily</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="glass-panel p-6 sm:p-8 border border-white/10 bg-black/40 rounded-xl relative overflow-hidden shadow-glow">
                <h3 className="font-display font-serif text-2xl text-champagne mb-2">Send an Inquiry</h3>
                <p className="text-xs text-smoke opacity-85 font-sans mb-6">
                  Have a custom support query or order detail to discuss? Drop us a line.
                </p>

                {formSubmitted ? (
                  <div className="text-center py-8 space-y-4">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                    <h4 className="font-display text-xl text-champagne">Inquiry Received</h4>
                    <p className="text-xs leading-5 text-smoke/90 font-sans">
                      Thank you for contacting MADIRÆ support. Our support desk has logged your request and will reply within 4 business hours.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)} className="mx-auto mt-4 font-sans text-xs">
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2 font-sans">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Rohan Sharma"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2 font-sans">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rohan@gmail.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2 font-sans">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. Order Delivery Status"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2 font-sans">Message / Query</label>
                      <textarea
                        placeholder="Explain your support inquiry here..."
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full justify-center mt-2">Submit Query</Button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>
    </PageTransition>
  );
}
