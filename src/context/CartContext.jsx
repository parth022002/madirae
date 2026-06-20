"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// Dry Days list for 2026
const DRY_DAYS_2026 = [
  "2026-01-26", // Republic Day
  "2026-01-30", // Martyrs' Day
  "2026-03-05", // Holi / excise dry day
  "2026-04-02", // Mahavir Jayanti
  "2026-04-03", // Good Friday
  "2026-08-15", // Independence Day
  "2026-10-02", // Gandhi Jayanti
  "2026-10-24", // Dussehra
  "2026-11-09", // Diwali / excise close
];

export function parseVolumeToLiters(volumeStr, productName = "") {
  if (!volumeStr) return 0;
  const name = productName.toLowerCase();
  
  // Custom kit volume mappings (spirit volume contributing to possession limit)
  if (volumeStr.toLowerCase().includes("kit") || name.includes("kit")) {
    if (name.includes("himalayan highball")) return 0.75;
    if (name.includes("valley botanica")) return 0.50;
    if (name.includes("spiced awadh")) return 0.75;
    if (name.includes("black soil")) return 0.75;
    if (name.includes("andaman guava")) return 0.75;
    if (name.includes("midnight mahua")) return 0.50;
    if (name.includes("goan tropical")) return 0.75;
    if (name.includes("coromandel stout")) return 1.25; // 0.75L rum + 0.5L stout
    return 0.75;
  }

  // Regular parses
  const str = volumeStr.toLowerCase();
  // If multiple sizes, take the first size or standard
  const primarySize = str.split(",")[0].trim();
  const match = primarySize.match(/(\d+)\s*ml/);
  if (match) {
    return parseFloat(match[1]) / 1000;
  }
  return 0.75;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [darkHoursActive, setDarkHoursActive] = useState(false);
  const [dryDayActive, setDryDayActive] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("madirae_cart");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing cart storage", e);
      }
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("madirae_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Dark Hours & Dry Days check on load/interval
  useEffect(() => {
    const checkComplianceLimits = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      // Dark Hours check: 10:00 PM (22) to 10:00 AM (10)
      const isDark = currentHour >= 22 || currentHour < 10;
      setDarkHoursActive(isDark);

      // Dry Day check
      const dateString = now.toISOString().split("T")[0];
      const isDry = DRY_DAYS_2026.includes(dateString);
      setDryDayActive(isDry);
    };

    checkComplianceLimits();
    const interval = setInterval(checkComplianceLimits, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  // Compute total volume in Liters
  const totalVolume = cartItems.reduce((sum, item) => {
    const itemVol = parseVolumeToLiters(item.selectedVolume || item.product.volume, item.product.name);
    return sum + itemVol * item.quantity;
  }, 0);

  const maxVolumeLimit = 9.0; // Karnataka State Possession Limit

  const addToCart = (product, quantity = 1, selectedVolume = null) => {
    const itemVol = parseVolumeToLiters(selectedVolume || product.volume, product.name);
    const addedVol = itemVol * quantity;

    if (totalVolume + addedVol > maxVolumeLimit) {
      return {
        success: false,
        error: `Exceeds volumetric limit. Karnataka state regulations cap personal alcohol possession at ${maxVolumeLimit} Liters. Your current cart totals ${totalVolume.toFixed(2)}L, and adding this would exceed the legal threshold.`,
      };
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVolume === selectedVolume
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVolume: selectedVolume || product.volume }];
      }
    });

    return { success: true };
  };

  const updateQuantity = (productId, selectedVolume, newQty) => {
    const existing = cartItems.find(
      (item) => item.product.id === productId && item.selectedVolume === selectedVolume
    );
    if (!existing) return { success: false, error: "Item not found" };

    const itemVol = parseVolumeToLiters(selectedVolume || existing.product.volume, existing.product.name);
    const volumeDiff = itemVol * (newQty - existing.quantity);

    if (totalVolume + volumeDiff > maxVolumeLimit) {
      return {
        success: false,
        error: `Volumetric ceiling reached. Under Karnataka Excise rules, personal carriage limits are capped at ${maxVolumeLimit} Liters. Adjust quantity to remain compliant.`,
      };
    }

    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.selectedVolume === selectedVolume
            ? { ...item, quantity: newQty }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    return { success: true };
  };

  const removeFromCart = (productId, selectedVolume) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedVolume === selectedVolume))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalVolume,
        maxVolumeLimit,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        darkHoursActive,
        dryDayActive,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
