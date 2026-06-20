"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingCart, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { trackSearch } from "@/utils/analytics";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems, totalVolume, maxVolumeLimit } = useCart();

  useEffect(() => {
    const storedPincode = localStorage.getItem("madirae_user_pincode");
    if (storedPincode) {
      setPincode(storedPincode);
    }
  }, []);



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery.trim());
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleChangePincode = () => {
    localStorage.removeItem("madirae_compliance_verified");
    localStorage.removeItem("madirae_user_pincode");
    localStorage.removeItem("madirae_user_state");
    localStorage.removeItem("madirae_user_dob");
    localStorage.removeItem("madirae_blocked_reason");
    window.location.reload();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gold/15 bg-black/85 shadow-glow backdrop-blur-2xl transition duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {searchOpen ? (
          <div className="flex w-full items-center gap-3 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <input
                type="text"
                placeholder="Search spirits, beers, wines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gold/25 bg-black/60 py-1.5 pl-4 pr-10 text-xs text-smoke placeholder-white/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all font-sans"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold" aria-label="Submit search">
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>
            <button 
              onClick={() => setSearchOpen(false)}
              className="text-xs uppercase tracking-wider text-smoke hover:text-gold transition font-bold font-sans"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            {/* Brand Logo - Left Aligned */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="MADIRÆ & Co. home">
              <Image src={siteConfig.logo} alt="MADIRÆ & Co. logo" width={38} height={38} className="h-9 w-9 rounded-full object-cover transition duration-300 group-hover:scale-105" priority />
              <span className="font-display font-serif text-sm tracking-wider text-champagne hidden sm:inline group-hover:text-gold transition duration-300">MADIRÆ & Co.</span>
            </Link>

            {/* Desktop Nav Links - Centered */}
            <div className="hidden items-center gap-6 md:flex">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-xs uppercase tracking-[0.16em] text-smoke transition duration-300 hover:text-gold hover:shadow-glow-sm relative py-1 group">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Controls - Grouped Search, Pincode & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Global Search Bar (Hidden on Mobile) */}
              <form onSubmit={handleSearchSubmit} className="relative hidden max-w-[160px] lg:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gold/25 bg-black/60 py-1.5 pl-4 pr-8 text-xs text-smoke placeholder-white/30 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all duration-300 shadow-glow-sm font-sans"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition duration-300" aria-label="Submit search">
                  <Search className="h-3.5 w-3.5" />
                </button>
              </form>

              {/* Mobile Search Button (Visible only on mobile/tablet) */}
              <button 
                className="text-smoke hover:text-gold md:hidden p-1.5" 
                onClick={() => setSearchOpen(true)}
                aria-label="Open search bar"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Bangalore Pincode Indicator */}
              {pincode && (
                <button 
                  onClick={handleChangePincode}
                  className="group hidden items-center gap-1 rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold hover:bg-gold/10 transition sm:flex font-sans"
                  title="Change Delivery Pincode"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>📍 {pincode}</span>
                </button>
              )}

              {/* Instagram Link */}
              <a 
                href="https://www.instagram.com/madirae_and_co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-smoke hover:text-gold transition-colors duration-300 p-1.5"
                title="Follow MADIRÆ on Instagram"
                aria-label="Instagram Link"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>

              {/* Volumetric Cart Indicator */}
              <Link 
                href="/cart"
                className="relative flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-smoke hover:border-gold hover:text-gold transition font-sans"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartItems.length > 0 && (
                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    totalVolume >= maxVolumeLimit - 0.5 
                      ? "bg-warning text-white" 
                      : "bg-gold text-ink"
                  }`}>
                    {totalVolume.toFixed(2)}L
                  </span>
                )}
              </Link>

              {/* Mobile Navigation Toggle Button */}
              <button className="text-champagne md:hidden p-1.5" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

            </div>
          </>
        )}
      </nav>

      {/* Mobile Drawer Menu Panel */}
      <AnimatePresence>
        {open && (
          <motion.div className="border-t border-white/10 bg-ink/95 px-4 py-6 md:hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {/* Mobile Pincode Indicator */}
            {pincode && (
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4 font-sans">
                <span className="text-xs uppercase tracking-wider text-smoke">Zone: Bangalore</span>
                <button 
                  onClick={handleChangePincode}
                  className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs text-gold flex items-center gap-1"
                >
                  <span>📍 {pincode}</span>
                  <span className="text-[9px] text-white/50">(Change)</span>
                </button>
              </div>
            )}
            
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6 block">
              <input
                type="text"
                placeholder="Search spirits, wines, beers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-black/40 py-2 pl-4 pr-10 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold" aria-label="Submit search">
                <Search className="h-4.5 w-4.5" />
              </button>
            </form>

            {/* Navigation links grid */}
            <div className="grid gap-4 font-sans">
              {siteConfig.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-base uppercase tracking-[0.18em] text-smoke hover:text-gold transition">
                  {item.label}
                </Link>
              ))}
              <Link href="/cart" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-base uppercase tracking-[0.18em] text-gold">
                <span>View Cart</span>
                <span>{totalVolume.toFixed(2)}L</span>
              </Link>
              
              {/* Instagram Link in Mobile Drawer */}
              <div className="flex items-center justify-center border-t border-white/10 pt-4 mt-2">
                <a 
                  href="https://www.instagram.com/madirae_and_co/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm uppercase tracking-wider text-smoke hover:text-gold transition font-sans font-bold"
                  onClick={() => setOpen(false)}
                >
                  <Instagram className="h-4.5 w-4.5 text-gold animate-pulse" />
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
