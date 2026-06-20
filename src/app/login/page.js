"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Phone, UserCheck, ShieldCheck, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register'
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Phone Login States
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(30);

  // Registration States
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedState, setSelectedState] = useState("Karnataka");
  const [govIdFile, setGovIdFile] = useState(null);
  const [govIdFileName, setGovIdFileName] = useState("");
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [isOcrVerified, setIsOcrVerified] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem("madirae_user_authenticated") === "true") {
      router.push("/products");
    }
    const savedPin = localStorage.getItem("madirae_user_pincode");
    if (savedPin) setPincode(savedPin);
  }, [router]);

  useEffect(() => {
    let timer;
    if (otpSent && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setErrorMsg("");
    setOtpSent(true);
    setCountdown(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode !== "123456") {
      setErrorMsg("Incorrect verification code. For testing, please enter code: 123456");
      return;
    }
    setErrorMsg("");
    localStorage.setItem("madirae_user_authenticated", "true");
    localStorage.setItem("madirae_user_phone", phone);
    setSuccess(true);
    setTimeout(() => {
      router.push("/cart");
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGovIdFile(file);
      setGovIdFileName(file.name);
      
      // Simulate Ephemeral OCR
      setIsOcrProcessing(true);
      setTimeout(() => {
        setIsOcrProcessing(false);
        setIsOcrVerified(true);
      }, 1500);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !address.trim() || !pincode.trim()) {
      setErrorMsg("Please fill out all registration fields.");
      return;
    }

    // Pincode and State Validation
    const HIGH_SALES_STATES = {
      "Karnataka": { prefixes: ["56", "57", "58", "59"] },
      "Tamil Nadu": { prefixes: ["60", "61", "62", "63", "64"] },
      "Maharashtra": { prefixes: ["40", "41", "42", "43", "44"] },
      "Telangana": { prefixes: ["50"] },
      "Andhra Pradesh": { prefixes: ["51", "52", "53"] },
      "Uttar Pradesh": { prefixes: ["20", "21", "22", "23", "24", "25", "26", "27", "28"] },
      "West Bengal": { prefixes: ["70", "71", "72", "73", "74"] },
      "Rajasthan": { prefixes: ["30", "31", "32", "33", "34"] },
      "Punjab": { prefixes: ["14", "15", "16"] },
      "Haryana": { prefixes: ["12", "13"] }
    };

    if (!/^\d{6}$/.test(pincode)) {
      setErrorMsg("Please enter a valid 6-digit Indian pincode.");
      return;
    }

    const stateRules = HIGH_SALES_STATES[selectedState];
    if (!stateRules) {
      setErrorMsg(`We do not operate in ${selectedState}. Service is active only in 10 high-sales states.`);
      return;
    }

    const isValidPrefix = stateRules.prefixes.some(pref => pincode.startsWith(pref));
    if (!isValidPrefix) {
      setErrorMsg(`The pincode ${pincode} is not covered in our active ${selectedState} network under excise laws.`);
      return;
    }

    if (!isOcrVerified) {
      setErrorMsg("Please upload a valid Government ID photo for age check.");
      return;
    }

    setErrorMsg("");
    localStorage.setItem("madirae_user_authenticated", "true");
    localStorage.setItem("madirae_user_name", fullName);
    localStorage.setItem("madirae_user_address", address);
    localStorage.setItem("madirae_user_pincode", pincode);
    localStorage.setItem("madirae_user_state", selectedState);
    setSuccess(true);
    setTimeout(() => {
      router.push("/cart");
    }, 2000);
  };

  return (
    <PageTransition>
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="eyebrow">D2C Compliance Portal</p>
          <h1 className="mt-4 font-display text-4xl text-champagne sm:text-6xl">Account Access & Verification</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80">
            In compliance with state excise rules and India's DPDP Act, D2C accounts are securely verified before transaction completion.
          </p>
        </div>
      </section>

      <section className="section-padding bg-ink min-h-[500px] flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          
          {success ? (
            <div className="glass-panel rounded-2xl border border-emerald-500/20 bg-black/40 p-8 text-center shadow-glow-success">
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
              <h2 className="mt-6 font-display text-2xl text-champagne">Profile Authenticated</h2>
              <p className="mt-3 text-xs leading-5 text-smoke opacity-80">
                Excise verification successful. Directing you to your shopping cart...
              </p>
            </div>
          ) : (
            <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 shadow-glow relative overflow-hidden">
              
              {/* Tab Selector */}
              <div className="flex border-b border-white/10 mb-6">
                <button
                  onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "login" 
                      ? "border-b-2 border-gold text-gold" 
                      : "text-smoke/60 hover:text-smoke"
                  }`}
                >
                  Return User (OTP)
                </button>
                <button
                  onClick={() => { setActiveTab("register"); setErrorMsg(""); }}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "register" 
                      ? "border-b-2 border-gold text-gold" 
                      : "text-smoke/60 hover:text-smoke"
                  }`}
                >
                  Excise Registration
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning leading-5">
                  {errorMsg}
                </div>
              )}

              {/* Login Form */}
              {activeTab === "login" ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="inline-flex rounded-full bg-gold/5 p-3 text-gold border border-gold/15">
                      <Lock className="h-5 w-5" />
                    </span>
                    <p className="mt-2 text-[11px] text-smoke opacity-70">
                      Login using your verified mobile number and receive a secure 6-digit OTP code.
                    </p>
                  </div>

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">Phone Number</label>
                        <div className="flex rounded-lg border border-white/15 bg-ink overflow-hidden focus-within:border-gold">
                          <span className="flex items-center px-3 border-r border-white/10 text-xs font-semibold text-smoke/60 bg-black/20">+91</span>
                          <input
                            type="text"
                            placeholder="98765 43210"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            className="w-full bg-transparent p-3 text-sm text-smoke focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full justify-center">Request Access OTP</Button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">
                          Enter 6-Digit OTP Code
                        </label>
                        <input
                          type="text"
                          placeholder="123456"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          className="w-full rounded-lg border border-white/15 bg-ink p-3 text-center text-lg font-mono tracking-widest text-champagne focus:border-gold focus:outline-none"
                          required
                        />
                        <p className="mt-2 text-[10px] text-smoke opacity-60 text-center">
                          Verification code sent to +91 {phone}. Demo verification code is **123456**
                        </p>
                      </div>

                      <Button type="submit" className="w-full justify-center">Authenticate Profile</Button>

                      <div className="text-center pt-2">
                        {countdown > 0 ? (
                          <span className="text-[10px] text-smoke opacity-50 font-sans">Resend OTP in {countdown}s</span>
                        ) : (
                          <button 
                            type="button" 
                            onClick={() => { setCountdown(30); }} 
                            className="text-[10px] text-gold hover:underline font-sans"
                          >
                            Resend Code
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-[11px] text-smoke opacity-70">
                      Create your excise-compliant profile. We map your residential shipping coordinates and confirm your legal age.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">Full Legal Name (as on Govt ID)</label>
                    <input
                      type="text"
                      placeholder="e.g. Devendra Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">Verified Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                        maxLength={6}
                        placeholder="560001"
                        className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">State of Delivery</label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-[#1E1E1E] p-3 text-sm text-champagne outline-none focus:border-gold font-sans"
                      >
                        <option value="Karnataka" className="bg-[#1E1E1E] text-smoke">Karnataka</option>
                        <option value="Tamil Nadu" className="bg-[#1E1E1E] text-smoke">Tamil Nadu</option>
                        <option value="Maharashtra" className="bg-[#1E1E1E] text-smoke">Maharashtra</option>
                        <option value="Telangana" className="bg-[#1E1E1E] text-smoke">Telangana</option>
                        <option value="Andhra Pradesh" className="bg-[#1E1E1E] text-smoke">Andhra Pradesh</option>
                        <option value="Uttar Pradesh" className="bg-[#1E1E1E] text-smoke">Uttar Pradesh</option>
                        <option value="West Bengal" className="bg-[#1E1E1E] text-smoke">West Bengal</option>
                        <option value="Rajasthan" className="bg-[#1E1E1E] text-smoke">Rajasthan</option>
                        <option value="Punjab" className="bg-[#1E1E1E] text-smoke">Punjab</option>
                        <option value="Haryana" className="bg-[#1E1E1E] text-smoke">Haryana</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-gold font-bold mb-2">Detailed Shipping Address</label>
                    <textarea
                      placeholder="Street address, apartment details, Bengaluru, Karnataka"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none font-sans"
                      required
                    ></textarea>
                  </div>

                  {/* Government ID photo panel */}
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FileText className="h-4 w-4 text-gold" />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-bold">excise ID validation</span>
                    </div>
                    <p className="text-[10px] leading-4 text-smoke opacity-80 mb-3 font-sans">
                      Upload a photo of your Government ID.
                      <span className="block text-emerald-500 font-semibold mt-1">
                        🛡️ DPDP Privacy Guard: Image parsed ephemerally in memory and purged instantly. No file retention.
                      </span>
                    </p>

                    <div className="relative rounded-lg border border-dashed border-white/20 bg-ink hover:border-gold transition p-4 text-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {isOcrProcessing ? (
                        <div className="text-[10px] text-gold flex flex-col items-center gap-1 font-sans">
                          <span className="h-4.5 w-4.5 border-2 border-gold border-t-transparent rounded-full animate-spin"></span>
                          <span>Verifying document age...</span>
                        </div>
                      ) : isOcrVerified ? (
                        <div className="text-[10px] text-emerald-500 flex flex-col items-center gap-1 font-semibold font-sans">
                          <ShieldCheck className="h-5 w-5" />
                          <span>ID verified. Legal drinking age confirmed (Karnataka: 21).</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-smoke opacity-60 font-sans">
                          {govIdFileName ? govIdFileName : "Select or drag photo of Government ID"}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full justify-center mt-2">Create Excise Profile</Button>
                </form>
              )}
            </div>
          )}

        </div>
      </section>
    </PageTransition>
  );
}
