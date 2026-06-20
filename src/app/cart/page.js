"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";
import { useCart, parseVolumeToLiters } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    totalVolume,
    maxVolumeLimit,
    updateQuantity,
    removeFromCart,
    darkHoursActive,
    dryDayActive,
  } = useCart();

  const [qtyError, setQtyError] = useState("");

  const handleQtyChange = (productId, selectedVolume, newQty) => {
    setQtyError("");
    const result = updateQuantity(productId, selectedVolume, newQty);
    if (!result.success) {
      setQtyError(result.error);
    }
  };

  const volumePercentage = Math.min((totalVolume / maxVolumeLimit) * 100, 100);

  // Subtotal Calculation
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 1500 ? 0 : 150;
  const grandTotal = subtotal + deliveryFee;

  return (
    <PageTransition>
      <section className="bg-liquid-gold px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Checkout Gatekeeper</p>
          <h1 className="mt-4 font-display text-5xl text-champagne sm:text-7xl">Shopping Cart</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-smoke">
            Your cart is subject to real-time state possession thresholds and excise delivery timings.
          </p>
        </div>
      </section>

      <section className="section-padding bg-ink min-h-[500px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl border border-white/5 max-w-2xl mx-auto">
              <AlertTriangle className="mx-auto h-12 w-12 text-gold opacity-60" />
              <h2 className="mt-4 font-display text-2xl text-champagne">Your cart is empty</h2>
              <p className="mt-3 text-sm text-smoke">Explore our premium catalog of wines, beers, and single malts in Bangalore.</p>
              <div className="mt-8">
                <Button href="/products">Browse Catalog</Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.8fr_1.2fr]">
              
              {/* Left Column: Cart Items */}
              <div className="space-y-6">
                
                {/* Volumetric Monitor Header Panel */}
                <div className="glass-panel rounded-2xl border border-gold/15 p-6 bg-black/35 shadow-glow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg text-champagne">Excise Possession Monitor</h3>
                    <span className={`text-xs uppercase tracking-wider font-semibold ${
                      totalVolume > maxVolumeLimit 
                        ? "text-warning" 
                        : totalVolume >= maxVolumeLimit - 1 
                          ? "text-gold" 
                          : "text-emerald-500"
                    }`}>
                      {totalVolume.toFixed(2)}L / {maxVolumeLimit.toFixed(2)}L
                    </span>
                  </div>
                  
                  {/* Volumetric Progress Bar */}
                  <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        totalVolume > maxVolumeLimit 
                          ? "bg-warning" 
                          : totalVolume >= maxVolumeLimit - 1 
                            ? "bg-amber-500" 
                            : "bg-emerald-500"
                      }`}
                      style={{ width: `${volumePercentage}%` }}
                    ></div>
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-smoke opacity-80">
                    ⓘ Under Karnataka Excise regulations, personal possession limits for domestic retail transactions are strictly capped at 9.0 Liters in total per transaction. Adding further items beyond this threshold will restrict checkout.
                  </p>

                  {qtyError && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning leading-5">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{qtyError}</span>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="divide-y divide-white/10 rounded-2xl border border-white/5 bg-black/40 p-4 sm:p-6">
                  {cartItems.map((item) => {
                    const itemVol = parseVolumeToLiters(item.selectedVolume || item.product.volume, item.product.name);
                    const totalItemVol = itemVol * item.quantity;
                    
                    return (
                      <div key={`${item.product.id}-${item.selectedVolume}`} className="flex flex-col py-6 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black">
                            <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <Link href={`/products/${item.product.id}`} className="font-display text-md text-champagne hover:text-gold transition">
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-smoke opacity-60 mt-1">
                              Style: {item.product.style} | Size: {item.selectedVolume} | ABV: {item.product.abv ? `${item.product.abv}%` : "0.0%"}
                            </p>
                            <p className="text-xs text-gold/80 font-medium mt-1">
                              Volume per unit: {itemVol.toFixed(2)}L (Total: {totalItemVol.toFixed(2)}L)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div className="flex items-center rounded-full border border-white/15 bg-black/60 px-2 py-1">
                            <button 
                              onClick={() => handleQtyChange(item.product.id, item.selectedVolume, item.quantity - 1)}
                              className="p-1.5 text-smoke hover:text-gold"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold text-champagne">{item.quantity}</span>
                            <button 
                              onClick={() => handleQtyChange(item.product.id, item.selectedVolume, item.quantity + 1)}
                              className="p-1.5 text-smoke hover:text-gold"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-champagne">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                            <button 
                              onClick={() => removeFromCart(item.product.id, item.selectedVolume)}
                              className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-warning opacity-70 hover:opacity-100 transition"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Right Column: Checkout Block Panel */}
              <div className="space-y-6">
                
                <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6">
                  <h3 className="font-display text-xl text-champagne border-b border-white/10 pb-4 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-smoke opacity-80">
                      <span>Bag Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-smoke opacity-80">
                      <span>Total Volume</span>
                      <span>{totalVolume.toFixed(2)} Liters</span>
                    </div>
                    <div className="flex justify-between text-smoke opacity-80">
                      <span>Excise Duty (KA)</span>
                      <span className="text-emerald-500 text-xs uppercase tracking-wider font-semibold">Included</span>
                    </div>
                    <div className="flex justify-between text-smoke opacity-80">
                      <span>Bangalore Delivery Fee</span>
                      <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4 flex justify-between text-base font-bold text-champagne">
                      <span>Total Amount</span>
                      <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Excise Constraints Box */}
                  <div className="mt-6 space-y-3 rounded-xl border border-white/10 bg-black/50 p-4">
                    <div className="flex gap-2">
                      <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5 text-emerald-500" />
                      <p className="text-[11px] leading-5 text-smoke">
                        <strong>Bangalore geofenced:</strong> Delivery restricted to verified Bangalore zones.
                      </p>
                    </div>
                    
                    {/* Dark Hours warning display */}
                    <div className="flex gap-2">
                      <AlertTriangle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${darkHoursActive ? "text-warning" : "text-emerald-500"}`} />
                      <p className="text-[11px] leading-5 text-smoke">
                        <strong>Excise Carriage Hours:</strong> Daily 10:00 AM - 10:00 PM. 
                        {darkHoursActive ? (
                          <span className="block text-warning font-semibold mt-0.5">
                            Orders closed past 10 PM. Delivery resumes tomorrow 11 AM.
                          </span>
                        ) : (
                          <span className="block text-emerald-500 font-semibold mt-0.5">
                            Active Carriage Window: Operational.
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Dry Day check */}
                    {dryDayActive && (
                      <div className="flex gap-2">
                        <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-warning" />
                        <p className="text-[11px] leading-5 text-warning font-semibold">
                          <strong>Dry Day Active:</strong> Today alcohol deliveries are legally restricted. Payments are blocked.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Checkout Action Button */}
                  <div className="mt-6">
                    {totalVolume > maxVolumeLimit ? (
                      <button 
                        disabled 
                        className="w-full rounded-lg bg-warning/20 border border-warning/30 p-4 text-center text-xs uppercase tracking-[0.15em] text-warning font-bold cursor-not-allowed"
                      >
                        Possession Limit Exceeded
                      </button>
                    ) : darkHoursActive ? (
                      <button 
                        disabled 
                        className="w-full rounded-lg bg-warning/20 border border-warning/30 p-4 text-center text-xs uppercase tracking-[0.15em] text-warning font-bold cursor-not-allowed"
                      >
                        Carriage Hours Closed
                      </button>
                    ) : dryDayActive ? (
                      <button 
                        disabled 
                        className="w-full rounded-lg bg-warning/20 border border-warning/30 p-4 text-center text-xs uppercase tracking-[0.15em] text-warning font-bold cursor-not-allowed"
                      >
                        Blocked due to Dry Day
                      </button>
                    ) : (
                      <Link 
                        href="/checkout"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-gold px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-ink hover:bg-gold/90 transition shadow-glow"
                      >
                        <span>Secure Checkout</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    )}
                  </div>

                  <p className="mt-4 text-[10px] text-center leading-4 text-smoke opacity-60">
                    We parse and verify government identities ephemerally at checkout to comply with state laws.
                  </p>

                </div>

              </div>

            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
