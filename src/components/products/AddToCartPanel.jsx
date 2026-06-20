"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, AlertTriangle, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart, parseVolumeToLiters } from "@/context/CartContext";
import { trackAddToCart } from "@/utils/analytics";

export default function AddToCartPanel({ product }) {
  const { addToCart, totalVolume, maxVolumeLimit, darkHoursActive, dryDayActive } = useCart();
  
  // Extract volume choices (e.g. "330ml, 500ml" -> ["330ml", "500ml"])
  const volumeOptions = product.volume ? product.volume.split(",").map(v => v.trim()) : [];
  const [selectedVolume, setSelectedVolume] = useState(volumeOptions[0] || "750ml");
  const [quantity, setQuantity] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const itemLiters = parseVolumeToLiters(selectedVolume, product.name);
  const potentialTotalVolume = totalVolume + (itemLiters * quantity);
  const isOverLimit = potentialTotalVolume > maxVolumeLimit;

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg("");
    if (isOverLimit) {
      setErrorMsg(
        `Possession Ceiling Alert: Adding ${quantity} unit(s) of this item (${(itemLiters * quantity).toFixed(2)}L) will push your total cart volume to ${potentialTotalVolume.toFixed(2)}L, which exceeds the Karnataka State Excise personal possession limit of ${maxVolumeLimit}L.`
      );
    }
  }, [quantity, selectedVolume, totalVolume, isOverLimit]);

  const handleIncrement = () => {
    setQuantity(q => q + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handleAddToCartClick = () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (darkHoursActive) {
      setErrorMsg("Excise Delivery Regulation: Deliveries are legally closed between 10:00 PM and 10:00 AM.");
      return;
    }

    if (dryDayActive) {
      setErrorMsg("Dry Day Restriction: Today alcohol sales are legally restricted. Order placements are blocked.");
      return;
    }

    const result = addToCart(product, quantity, selectedVolume);
    if (result.success) {
      setSuccessMsg(`Savor the Discovery: Added ${quantity} unit(s) of ${product.name} (${selectedVolume}) to your cart.`);
      trackAddToCart(product, quantity, selectedVolume);
      setQuantity(1);
    } else {
      setErrorMsg(result.error);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 bg-black/40 p-6 space-y-5">
      
      {/* Volume Size Selection (Only if multiple options are listed) */}
      {volumeOptions.length > 1 && (
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">Select Serving Volume</label>
          <div className="flex gap-2">
            {volumeOptions.map((vol) => (
              <button
                key={vol}
                onClick={() => setSelectedVolume(vol)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedVolume === vol 
                    ? "bg-gold text-ink" 
                    : "border border-white/15 bg-transparent text-smoke hover:border-gold/50"
                }`}
              >
                {vol}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Volume Statistics */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Quantity selector */}
        <div>
          <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-2">Quantity</label>
          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1.5">
            <button 
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="p-1 text-smoke hover:text-gold disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-semibold text-champagne">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="p-1 text-smoke hover:text-gold"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Volume calculator readout */}
        <div className="text-left sm:text-right">
          <label className="block text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1">Volumetric Impact</label>
          <p className="text-sm font-semibold text-champagne">
            {(itemLiters * quantity).toFixed(2)} Liters
          </p>
          <p className="text-[10px] text-smoke opacity-60">
            Current Cart Total: {totalVolume.toFixed(2)}L / {maxVolumeLimit}L
          </p>
        </div>

      </div>

      {/* Notices */}
      {errorMsg && (
        <div className="flex items-start gap-2 rounded-lg border border-warning/20 bg-warning/5 p-3 text-xs text-warning leading-5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-400 leading-5">
          <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add-to-cart Button CTA */}
      <div>
        {isOverLimit ? (
          <button
            disabled
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-warning/20 border border-warning/30 p-3 text-xs font-bold uppercase tracking-[0.15em] text-warning cursor-not-allowed"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Exceeds Possession Limit
          </button>
        ) : darkHoursActive ? (
          <button
            disabled
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-warning/20 border border-warning/30 p-3 text-xs font-bold uppercase tracking-[0.15em] text-warning cursor-not-allowed"
          >
            Carriage Window Closed
          </button>
        ) : dryDayActive ? (
          <button
            disabled
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-warning/20 border border-warning/30 p-3 text-xs font-bold uppercase tracking-[0.15em] text-warning cursor-not-allowed"
          >
            Blocked due to Dry Day
          </button>
        ) : (
          <button
            onClick={handleAddToCartClick}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-gold px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-ink hover:bg-gold/90 transition shadow-glow"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
        )}
      </div>

      <p className="text-[10px] text-center text-smoke opacity-50">
        Suggested maximum retail prices (MRP) apply in Bangalore, Karnataka.
      </p>

    </div>
  );
}
