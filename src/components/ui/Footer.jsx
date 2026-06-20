"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";


const legalLinks = [
  { label: "Excise Licenses", href: "/legal" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Customer Support", href: "/support" },
  { label: "Boutique Stores", href: "/about#boutique-stores" },
  { label: "Admin Portal", href: "/admin" }
];

export default function Footer() {
  return (

    <footer className="border-t border-white/10 bg-[#0A0A0A] relative z-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.1fr] lg:px-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-gold/30 bg-white shadow-glow">
              <Image src={siteConfig.logo} alt="MADIRÆ & Co. logo" width={48} height={48} className="h-full w-full object-cover" />
            </div>
            <h2 className="font-display text-2xl text-champagne">MADIRÆ & Co.</h2>
          </div>
          <p className="text-xs leading-6 text-smoke opacity-80 max-w-sm font-sans">
            A refined Indian craft alcohol brand bringing regional ingredients, balanced pricing, and heritage-led drinking experiences to modern consumers.
          </p>
          <div className="pt-2 text-xs text-smoke opacity-70 space-y-1 font-sans">
            <p className="font-semibold text-gold">📍 Bengaluru Headquarter</p>
            <p>12/4, Richmond Road, Shanthala Nagar,</p>
            <p>Bengaluru, Karnataka - 560025.</p>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-4">Explore</h3>
          <ul className="space-y-2.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs text-smoke hover:text-gold transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Legals */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-4">Support & Legal</h3>
          <ul className="space-y-2.5 mb-6">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-xs text-smoke/80 hover:text-gold transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold mb-3">Connect</h3>
          <div className="flex gap-2">
            <Link 
              href={siteConfig.socials[0].href} 
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-smoke hover:border-gold hover:text-gold transition" 
              aria-label="MADIRÆ & Co. Instagram"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <a 
              href="mailto:madiraeandco@gmail.com" 
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-smoke hover:border-gold hover:text-gold transition" 
              aria-label="Email Support"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Location & Map Column */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Location & Presence</h3>
          <p className="text-[11px] leading-5 text-smoke opacity-80 font-sans">
            Available in <strong>10+ states</strong> across India (Excise registered). Local D2C delivery geofenced strictly to the **Bengaluru Hub** for verified pin codes.
          </p>
          {/* Map Embed with luxury styling filters */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black aspect-video w-full relative">
            <iframe 
              src="https://maps.google.com/maps?q=Richmond%20Road,%20Bengaluru,%20Karnataka%20560025&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale invert opacity-70 hover:opacity-100 transition duration-300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MADIRÆ & Co. Bengaluru HQ Location Map"
            ></iframe>
          </div>
        </div>

      </div>

      {/* Dynamic Responsible Drinking warning block */}
      <div className="border-t border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] leading-5 uppercase tracking-wider text-warning font-semibold max-w-3xl mx-auto mb-4">
            ⚠️ GOVERNMENT WARNING: ALCOHOL CONSUMPTION IS INJURIOUS TO HEALTH. BE RESPONSIBLE. THIS WEBSITE IS STRICTLY INTENDED FOR USERS ABOVE THE LEGAL DRINKING AGE. ALL ORDER TRANSACTIONS REQUIRE PHYSICAL GOVERNMENT ID OTP VERIFICATION UPON ARRIVAL.
          </p>
          <div className="text-[10px] text-smoke/50">
            Copyright © 2026 MADIRÆ & Co. Bengaluru HQ. Available in 10+ states. D2C carriage licensed under Karnataka Excise regulations.
          </div>
        </div>
      </div>
    </footer>
  );
}
