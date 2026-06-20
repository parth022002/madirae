"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import Modal from "@/components/ui/Modal";
import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import AiRecipeAssistant from "@/components/sections/AiRecipeAssistant";
import FloatingAdPreview from "@/components/sections/FloatingAdPreview";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { usePathname } from "next/navigation";



const STATE_COMPLIANCE = {
  "Andhra Pradesh": { age: 21, dry: false },
  "Arunachal Pradesh": { age: 21, dry: false },
  "Assam": { age: 21, dry: false },
  "Bihar": { age: 0, dry: true, reason: "Excise Restriction: Delivery and carriage of alcohol is legally prohibited in Bihar (Dry State)." },
  "Chhattisgarh": { age: 21, dry: false },
  "Goa": { age: 18, dry: false },
  "Gujarat": { age: 0, dry: true, reason: "Excise Restriction: Delivery and carriage of alcohol is legally prohibited in Gujarat (Dry State)." },
  "Haryana": { age: 25, dry: false },
  "Himachal Pradesh": { age: 18, dry: false },
  "Jharkhand": { age: 21, dry: false },
  "Karnataka": { age: 21, dry: false },
  "Kerala": { age: 23, dry: false },
  "Madhya Pradesh": { age: 21, dry: false },
  "Maharashtra": { age: 25, dry: false },
  "Manipur": { age: 0, dry: true, reason: "Excise Restriction: Carriage regulations restrict D2C home delivery in Manipur." },
  "Meghalaya": { age: 21, dry: false },
  "Mizoram": { age: 0, dry: true, reason: "Excise Restriction: Delivery and carriage of alcohol is legally prohibited in Mizoram (Dry State)." },
  "Nagaland": { age: 0, dry: true, reason: "Excise Restriction: Delivery and carriage of alcohol is legally prohibited in Nagaland (Dry State)." },
  "Odisha": { age: 21, dry: false },
  "Punjab": { age: 25, dry: false },
  "Rajasthan": { age: 21, dry: false },
  "Sikkim": { age: 18, dry: false },
  "Tamil Nadu": { age: 21, dry: false },
  "Telangana": { age: 21, dry: false },
  "Tripura": { age: 21, dry: false },
  "Uttar Pradesh": { age: 21, dry: false },
  "Uttarakhand": { age: 21, dry: false },
  "West Bengal": { age: 21, dry: false },
  "Andaman and Nicobar Islands": { age: 21, dry: false },
  "Chandigarh": { age: 25, dry: false },
  "Dadra and Nagar Haveli and Daman and Diu": { age: 25, dry: false },
  "Delhi": { age: 25, dry: false },
  "Jammu and Kashmir": { age: 21, dry: false },
  "Ladakh": { age: 21, dry: false },
  "Lakshadweep": { age: 0, dry: true, reason: "Excise Restriction: Delivery and carriage of alcohol is legally prohibited in Lakshadweep (Dry State)." },
  "Puducherry": { age: 18, dry: false }
};

function ComplianceGate() {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [blockedReason, setBlockedReason] = useState("");
  
  // Form states
  const [stateOfResidence, setStateOfResidence] = useState("Karnataka");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthYear, setBirthYear] = useState("2000");
  const [pincode, setPincode] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const verified = localStorage.getItem("madirae_compliance_verified");
    if (verified === "blocked") {
      setBlocked(true);
      setBlockedReason(localStorage.getItem("madirae_blocked_reason") || "Service unavailable in your region.");
    } else if (verified !== "true") {
      setOpen(true);
    }
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate pincode: 6 digits
    if (!/^\d{6}$/.test(pincode)) {
      setFormError("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    const stateRules = STATE_COMPLIANCE[stateOfResidence];

    // Dry State Check
    if (stateRules && stateRules.dry) {
      localStorage.setItem("madirae_compliance_verified", "blocked");
      localStorage.setItem("madirae_blocked_reason", stateRules.reason);
      setBlockedReason(stateRules.reason);
      setBlocked(true);
      setOpen(false);
      return;
    }

    // 10 High-Sales States Compliance Database Check
    const HIGH_SALES_STATES = {
      "Karnataka": { prefixes: ["56", "57", "58", "59"], label: "Karnataka" },
      "Tamil Nadu": { prefixes: ["60", "61", "62", "63", "64"], label: "Tamil Nadu" },
      "Maharashtra": { prefixes: ["40", "41", "42", "43", "44"], label: "Maharashtra" },
      "Telangana": { prefixes: ["50"], label: "Telangana" },
      "Andhra Pradesh": { prefixes: ["51", "52", "53"], label: "Andhra Pradesh" },
      "Uttar Pradesh": { prefixes: ["20", "21", "22", "23", "24", "25", "26", "27", "28"], label: "Uttar Pradesh" },
      "West Bengal": { prefixes: ["70", "71", "72", "73", "74"], label: "West Bengal" },
      "Rajasthan": { prefixes: ["30", "31", "32", "33", "34"], label: "Rajasthan" },
      "Punjab": { prefixes: ["14", "15", "16"], label: "Punjab" },
      "Haryana": { prefixes: ["12", "13"], label: "Haryana" }
    };

    const allowedState = HIGH_SALES_STATES[stateOfResidence];
    if (!allowedState) {
      const reason = `Access Denied. While MADIRÆ & Co. products are available in retail, our D2C home carriage service does not operate in ${stateOfResidence}. Service is active only in 10 high-sales states.`;
      localStorage.setItem("madirae_compliance_verified", "blocked");
      localStorage.setItem("madirae_blocked_reason", reason);
      setBlockedReason(reason);
      setBlocked(true);
      setOpen(false);
      return;
    }

    const isValidPrefix = allowedState.prefixes.some(pref => pincode.startsWith(pref));
    if (!isValidPrefix) {
      const reason = `Service Restricted. The entered pincode (${pincode}) does not match valid postal ranges for our licensed carriage network in ${stateOfResidence} under state excise guidelines.`;
      localStorage.setItem("madirae_compliance_verified", "blocked");
      localStorage.setItem("madirae_blocked_reason", reason);
      setBlockedReason(reason);
      setBlocked(true);
      setOpen(false);
      return;
    }

    // Age Calculation
    const currentYear = 2026; // Current local time year is 2026
    const currentMonth = 6;    // Current local time month is June (6)
    
    let age = currentYear - parseInt(birthYear);
    if (currentMonth < parseInt(birthMonth)) {
      age--;
    }

    // Legal Drinking Age limit checks
    const requiredAge = stateRules ? stateRules.age : 21;
    if (age < requiredAge) {
      const reason = `Access Denied. Under state regulations, the legal drinking age in ${stateOfResidence} is ${requiredAge} years or older. You are not permitted to enter or purchase from MADIRÆ & Co.`;
      localStorage.setItem("madirae_compliance_verified", "blocked");
      localStorage.setItem("madirae_blocked_reason", reason);
      setBlockedReason(reason);
      setBlocked(true);
      setOpen(false);
      return;
    }

    // If verified
    localStorage.setItem("madirae_compliance_verified", "true");
    localStorage.setItem("madirae_user_pincode", pincode);
    localStorage.setItem("madirae_user_state", stateOfResidence);
    localStorage.setItem("madirae_user_dob", `${birthYear}-${birthMonth}`);
    setOpen(false);
  };

  const handleResetBlocked = () => {
    localStorage.removeItem("madirae_compliance_verified");
    localStorage.removeItem("madirae_blocked_reason");
    setBlocked(false);
    setOpen(true);
  };

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 text-center overflow-y-auto py-8">
        {/* Luxury glowing background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-warning/10 to-transparent blur-[120px] h-[400px] w-[400px] rounded-full pointer-events-none"></div>
        
        <div className="glass-panel max-w-lg rounded-2xl border border-warning/30 p-6 sm:p-8 shadow-glow-error relative overflow-hidden backdrop-blur-2xl my-auto">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-warning/45 to-transparent"></div>
          
          <span className="inline-block rounded-full bg-warning/10 border border-warning/20 px-3.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-warning">
            Excise Restriction
          </span>
          <h2 className="mt-5 sm:mt-6 font-display font-serif text-2xl sm:text-3xl text-champagne tracking-wider">Access Restricted</h2>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-7 sm:leading-8 text-smoke/90 font-sans">
            {blockedReason}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={handleResetBlocked} className="w-full sm:w-auto font-sans font-semibold text-xs py-3 px-6">
              Re-verify Details
            </Button>
            <a 
              href="https://www.google.com" 
              className="inline-flex min-h-11 items-center justify-center border border-white/15 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-smoke transition hover:border-gold hover:text-gold rounded-lg font-sans"
            >
              Leave Site
            </a>
          </div>
          
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 text-[9px] sm:text-[10px] text-smoke/50 font-sans">
            MADIRÆ & Co. | Legacy Refined &bull; Available in 10+ states
          </div>
        </div>
      </div>
    );
  }

  // Generate Year Options
  const years = [];
  for (let y = 2012; y >= 1930; y--) {
    years.push(y);
  }

  return (
    <Modal open={open} title="Compliance Verification">
      <div className="mb-3 sm:mb-4 text-center">
        <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          MADIRÆ & Co. | Legacy Refined
        </span>
      </div>
      <p className="text-center text-xs leading-5 sm:leading-6 text-smoke/80 mb-5 sm:mb-6 font-sans">
        Every user-facing element enforces India's strict excise rules and age limitations. Please select your purchase details to proceed.
      </p>
      
      <form onSubmit={handleVerify} className="space-y-4">
        <div>
          <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1.5 font-sans">State of Purchase</label>
          <select 
            value={stateOfResidence} 
            onChange={(e) => setStateOfResidence(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-2.5 sm:p-3 text-xs sm:text-sm text-smoke outline-none focus:border-gold transition duration-200"
          >
            {Object.keys(STATE_COMPLIANCE).map((st) => (
              <option key={st} value={st} className="bg-[#1E1E1E] text-smoke">{st}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1.5 font-sans">Birth Month</label>
            <select 
              value={birthMonth} 
              onChange={(e) => setBirthMonth(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-2.5 sm:p-3 text-xs sm:text-sm text-smoke outline-none focus:border-gold transition duration-200"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m} className="bg-[#1E1E1E] text-smoke">{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1.5 font-sans">Birth Year</label>
            <select 
              value={birthYear} 
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-2.5 sm:p-3 text-xs sm:text-sm text-smoke outline-none focus:border-gold transition duration-200"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-[#1E1E1E] text-smoke">{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1.5 font-sans">Delivery Pincode (Bangalore Only)</label>
          <input 
            type="text" 
            placeholder="e.g. 560001"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-lg border border-white/15 bg-[#0b0a0a] p-2.5 sm:p-3 text-xs sm:text-sm text-smoke focus:border-gold focus:outline-none transition duration-200"
            required
          />
        </div>

        {formError && (
          <p className="text-xs text-warning leading-6 font-semibold">{formError}</p>
        )}

        <div className="pt-3 flex flex-col sm:flex-row gap-3">
          <Button type="submit" className="w-full justify-center text-xs py-3">Enter Website</Button>
          <a href="https://www.google.com" className="inline-flex min-h-11 items-center justify-center border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.18em] text-smoke transition hover:border-gold hover:text-gold w-full sm:w-1/2 rounded-lg font-sans">
            Leave
          </a>
        </div>
      </form>
    </Modal>
  );
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}



export default function ClientShell({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = pathname && pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      <LoadingProvider>
        <CartProvider>
          <SmoothScroll />
          <Loader />
          
          <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
          </div>

          {mounted && !isAdmin && <ComplianceGate />}
          {mounted && !isAdmin && <AiRecipeAssistant />}
          {mounted && !isAdmin && <FloatingAdPreview />}
        </CartProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

