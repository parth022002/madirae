"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, Key, Phone, UserCheck, FileText, CheckCircle2, Lock } from "lucide-react";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { trackPurchase } from "@/utils/analytics";

export default function CheckoutPage() {
  const { cartItems, totalVolume, maxVolumeLimit, clearCart, darkHoursActive, dryDayActive } = useCart();
  
  // Checkout stages: 'auth' -> 'billing' -> 'complete'
  const [stage, setStage] = useState("auth"); 
  
  // Return user info
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [otpVerified, setOtpVerified] = useState(false);

  // New registration states
  const [fullName, setFullName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [govIdFile, setGovIdFile] = useState(null);
  const [govIdFileName, setGovIdFileName] = useState("");
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [isOcrVerified, setIsOcrVerified] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Order Success states
  const [orderId, setOrderId] = useState("");
  const [deliveryOtp, setDeliveryOtp] = useState("");
  
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // Sync values from compliance gate and registration
    const savedPincode = localStorage.getItem("madirae_user_pincode");
    if (savedPincode) {
      setPincode(savedPincode);
    }
    const savedName = localStorage.getItem("madirae_user_name");
    if (savedName) {
      setFullName(savedName);
    }
    const savedAddress = localStorage.getItem("madirae_user_address");
    if (savedAddress) {
      setShippingAddress(savedAddress);
    }

    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("madirae_user_authenticated") === "true";
    if (isAuthenticated) {
      setStage("billing");
      const savedPhone = localStorage.getItem("madirae_user_phone");
      if (savedPhone) {
        setPhone(savedPhone);
      }
    }
  }, []);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (otpSent && countdown > 0 && !otpVerified) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpSent, countdown, otpVerified]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setAuthError("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    setAuthError("");
    setOtpSent(true);
    setCountdown(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode !== "123456") {
      setAuthError("Incorrect code. For testing, please use verification code: 123456");
      return;
    }
    setAuthError("");
    setOtpVerified(true);
    // Proceed to billing step once authenticated
    setStage("billing");
  };

  const processFile = (file) => {
    if (file) {
      setGovIdFile(file);
      setGovIdFileName(file.name);
      
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        setFilePreview("pdf");
      } else {
        setFilePreview("unknown");
      }
      
      // Simulate Ephemeral OCR parse
      setIsOcrProcessing(true);
      setIsOcrVerified(false);
      setAuthError("");
      
      setTimeout(() => {
        setIsOcrProcessing(false);
        setIsOcrVerified(true);
      }, 1500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    processFile(file);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !shippingAddress.trim()) {
      setAuthError("Please fill out your full legal name and delivery address.");
      return;
    }
    if (!isOcrVerified) {
      setAuthError("Please upload a valid Government ID for excise verification.");
      return;
    }

    // Double check compliance
    if (totalVolume > maxVolumeLimit || darkHoursActive || dryDayActive) {
      setAuthError("Order blocked. Compliance parameters are invalid.");
      return;
    }

    // Place Order Success
    const randomOrderId = `MDR-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomDeliveryOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Save order data to local storage for Admin Dashboard
    const INDIAN_RIDERS = [
      "Suresh Kumar",
      "Ramesh Singh",
      "Amit Patel",
      "Rahul Sharma",
      "Vikram Rathore",
      "Deepak Gupta",
      "Vijay Yadav",
      "Rajesh Pillai",
      "Arjun Nair",
      "Sanjay Dutta"
    ];
    const randomRider = INDIAN_RIDERS[Math.floor(Math.random() * INDIAN_RIDERS.length)];

    const orderData = {
      orderId: randomOrderId,
      customerName: fullName,
      phone: phone,
      address: shippingAddress,
      pincode: pincode,
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        volume: item.product.volume,
        quantity: item.quantity
      })),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      grandTotal: grandTotal,
      date: new Date().toISOString(),
      deliveryOtp: randomDeliveryOtp,
      riderName: randomRider
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem("madirae_placed_orders") || "[]");
      existingOrders.unshift(orderData);
      localStorage.setItem("madirae_placed_orders", JSON.stringify(existingOrders));
    } catch (err) {
      console.error("Failed to write order to local storage:", err);
    }

    setOrderId(randomOrderId);
    setDeliveryOtp(randomDeliveryOtp);
    
    // Track GA4 Purchase Event
    trackPurchase(randomOrderId, cartItems, subtotal, deliveryFee, grandTotal);
    
    // Transition to complete screen
    setStage("complete");
    clearCart();
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 1500 ? 0 : 150;
  const grandTotal = subtotal + deliveryFee;

  return (
    <PageTransition>
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="eyebrow">D2C SECURE PROTOCOL</p>
          <h1 className="mt-4 font-display text-4xl text-champagne sm:text-6xl">Excise Compliance Checkout</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xs leading-6 text-smoke opacity-80">
            India's alcohol regulations dictate verified buyer profiles and possession compliance bounds.
          </p>
        </div>
      </section>

      <section className="section-padding bg-ink min-h-[500px]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {stage === "auth" && (
            <div className="mx-auto max-w-md">
              <div className="glass-panel rounded-2xl border border-gold/15 bg-black/40 p-8 shadow-glow">
                <div className="text-center mb-6">
                  <span className="inline-flex rounded-full bg-gold/10 p-3 text-gold">
                    <Lock className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-2xl text-champagne">Secure Authentication</h2>
                  <p className="mt-2 text-xs text-smoke opacity-70">
                    Verify your phone number via secure OTP to authenticate your excise profile.
                  </p>
                </div>

                {authError && (
                  <div className="mb-4 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning leading-5">
                    {authError}
                  </div>
                )}

                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">Phone Number</label>
                      <div className="flex rounded-lg border border-white/15 bg-ink overflow-hidden focus-within:border-gold">
                        <span className="flex items-center px-3 border-r border-white/10 text-xs font-semibold text-smoke/70 bg-black/30">+91</span>
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
                    <Button type="submit" className="w-full justify-center">Send Verification OTP</Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">
                        Enter 6-Digit OTP code
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
                        Code sent to +91 {phone.substring(0, 5)}... For demo, enter **123456**
                      </p>
                    </div>

                    <Button type="submit" className="w-full justify-center">Verify & Proceed</Button>

                    <div className="text-center pt-2">
                      {countdown > 0 ? (
                        <span className="text-[10px] text-smoke opacity-50">Resend OTP in {countdown}s</span>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => { setCountdown(30); }} 
                          className="text-[10px] text-gold hover:underline"
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {stage === "billing" && (
            <div className="grid gap-8 lg:grid-cols-[1.7fr_1.3fr]">
              
              {/* Left Column: Form details */}
              <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6">
                <h3 className="font-display text-xl text-champagne border-b border-white/10 pb-4 mb-6">
                  Verified Registration Profile
                </h3>

                {authError && (
                  <div className="mb-6 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning leading-5">
                    {authError}
                  </div>
                )}

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">
                      Full Legal Name (as matches Government ID)
                    </label>
                    <input
                      type="text"
                      placeholder="Devendra Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">Verified Pincode</label>
                      <input
                        type="text"
                        value={pincode}
                        disabled
                        className="w-full rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-smoke opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">State of Delivery</label>
                      <input
                        type="text"
                        value="Karnataka (Bangalore Hub)"
                        disabled
                        className="w-full rounded-lg border border-white/15 bg-white/5 p-3 text-sm text-smoke opacity-60 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">
                      Detailed Bangalore Shipping Address
                    </label>
                    <textarea
                      placeholder="e.g. Apartment/Villa No, Street Name, Shanthala Nagar, Indiranagar, Bangalore"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-white/15 bg-ink p-3 text-sm text-smoke focus:border-gold focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  {/* Government ID Ephemeral upload panel */}
                  <div className="rounded-xl border border-white/10 bg-black/60 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4.5 w-4.5 text-gold" />
                      <h4 className="text-xs uppercase tracking-[0.15em] text-gold font-bold">Government ID Verification</h4>
                    </div>
                    <p className="text-[11px] leading-5 text-smoke opacity-80 mb-4">
                      Upload a clean photograph of your Indian Passport, Driving License, Voter ID, or Aadhaar. 
                      <span className="block text-emerald-500 font-semibold mt-1">
                        🛡️ DPDP Act Privacy Notice: Parsed in memory ephemerally via secure OCR. The image file is NOT saved or stored.
                      </span>
                    </p>
                    <div 
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`relative rounded-lg border-2 border-dashed transition p-6 text-center cursor-pointer ${
                        isDragging ? "border-gold bg-gold/5" : "border-white/20 bg-ink hover:border-gold"
                      }`}
                     >
                      {!isOcrVerified && !isOcrProcessing && (
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      )}
                      {isOcrProcessing ? (
                        <div className="text-xs text-gold flex flex-col items-center gap-2">
                          <span className="h-5 w-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></span>
                          <span>In-Memory OCR Extracting DOB and Name...</span>
                        </div>
                      ) : isOcrVerified ? (
                        <div className="flex flex-col items-center justify-center gap-3">
                          {filePreview === "pdf" ? (
                            <div className="h-16 w-16 rounded border border-white/10 bg-white/5 flex items-center justify-center text-red-500 font-bold text-xs uppercase font-sans">
                              PDF
                            </div>
                          ) : filePreview ? (
                            <div className="relative h-16 w-16 rounded overflow-hidden border border-white/20">
                              <img src={filePreview} alt="ID preview" className="h-full w-full object-cover" />
                            </div>
                          ) : null}
                          <div className="text-xs text-emerald-500 flex flex-col items-center gap-1.5 font-semibold">
                            <ShieldCheck className="h-6 w-6" />
                            <span>ID verified. Birthdate match verified (Karnataka legal limit: 21).</span>
                            <span className="text-[10px] text-smoke opacity-60">Document: {govIdFileName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setGovIdFile(null);
                              setGovIdFileName("");
                              setFilePreview(null);
                              setIsOcrVerified(false);
                            }}
                            className="mt-1 text-[10px] uppercase tracking-wider text-gold hover:underline font-bold font-sans z-10"
                          >
                            Remove / Change ID
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs text-smoke opacity-60">
                          {govIdFileName ? govIdFileName : "Click to select or drag photo of Government ID"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    {totalVolume > maxVolumeLimit || darkHoursActive || dryDayActive ? (
                      <button 
                        disabled
                        className="w-full rounded-lg bg-warning/20 border border-warning/30 p-4 text-center text-xs uppercase tracking-[0.15em] text-warning font-bold cursor-not-allowed"
                      >
                        Checkout Locked: Check Compliance Warnings
                      </button>
                    ) : (
                      <Button type="submit" className="w-full justify-center shadow-glow">
                        Place Order & Secure Delivery OTP
                      </Button>
                    )}
                  </div>

                </form>
              </div>

              {/* Right Column: Order details */}
              <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 h-fit">
                <h3 className="font-display text-lg text-champagne border-b border-white/10 pb-3 mb-4">
                  Checkout Summary
                </h3>

                <div className="divide-y divide-white/5 space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.product.id}-${item.selectedVolume}`} className="flex justify-between py-2 text-xs">
                      <div className="text-smoke">
                        <span className="font-medium text-champagne">{item.product.name}</span>
                        <span className="block text-[10px] opacity-60">Qty: {item.quantity} | Size: {item.selectedVolume}</span>
                      </div>
                      <span className="font-semibold text-champagne shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between text-smoke opacity-70">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-smoke opacity-70">
                    <span>Total volume</span>
                    <span>{totalVolume.toFixed(2)} Liters</span>
                  </div>
                  <div className="flex justify-between text-smoke opacity-70">
                    <span>Delivery fee</span>
                    <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-champagne text-sm pt-2">
                    <span>Total Amount</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Compliance Badge */}
                <div className="mt-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-[10px] leading-5 text-emerald-400">
                  <ShieldCheck className="h-4.5 w-4.5 inline mr-1 text-emerald-400 align-text-bottom" />
                  <strong>D2C License Active:</strong> Karnataka Excise Dept Retail Delivery authorization #KA-EX-560-2026. Volumetric controls synchronized.
                </div>
              </div>

            </div>
          )}

          {stage === "complete" && (
            <div className="mx-auto max-w-xl">
              <div className="glass-panel rounded-2xl border border-emerald-500/20 bg-black/40 p-8 text-center shadow-glow-success">
                <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
                <h2 className="mt-6 font-display text-3xl text-champagne">Order Confirmed</h2>
                <p className="mt-2 text-sm text-smoke opacity-80">
                  Your Bangalore craft alcohol delivery is legally verified and dispatched!
                </p>

                <div className="mt-8 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/50 p-6 text-left space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-smoke opacity-60">Order ID:</span>
                    <span className="font-mono text-sm font-semibold text-champagne">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4">
                    <span className="text-smoke opacity-60">Carriage Delivery Pincode:</span>
                    <span className="font-semibold text-champagne">📍 {pincode}</span>
                  </div>
                  
                  {/* Delivery secure OTP display */}
                  <div className="pt-4">
                    <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
                        Secure Delivery Release OTP
                      </p>
                      <h3 className="font-mono text-3xl font-extrabold text-champagne tracking-widest">
                        {deliveryOtp}
                      </h3>
                      <p className="mt-2 text-[10px] text-smoke opacity-80 leading-4">
                        ⚠️ Legally mandated validation. Give this 4-digit code to Suresh Kumar (our certified delivery rider) upon arrival.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-4">
                    <span className="text-smoke opacity-60">Expected Window:</span>
                    <span className="font-semibold text-emerald-500">Within 2 Hours (Prior to 10:00 PM)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4">
                    <span className="text-smoke opacity-60">Rider assigned:</span>
                    <span className="font-semibold text-champagne">Suresh Kumar (Bangalore Central Warehouse)</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button href="/products">Browse More Flavors</Button>
                  <Button href="/" variant="secondary">Go to Homepage</Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </PageTransition>
  );
}
