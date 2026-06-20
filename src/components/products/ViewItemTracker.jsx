"use client";

import { useEffect } from "react";
import { trackViewItem } from "@/utils/analytics";

export default function ViewItemTracker({ product }) {
  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  return null;
}
