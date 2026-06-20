/**
 * Utility helper to track Google Analytics events safely.
 * Checks for window.gtag and pushes events to the dataLayer.
 */

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    // In development mode, log to console for debugging purposes
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Dev] Event: ${eventName}`, params);
    }
  }
};

// GA4 Standard e-commerce view_item event
export const trackViewItem = (product) => {
  trackEvent("view_item", {
    currency: "INR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: 1,
      }
    ]
  });
};

// GA4 Standard e-commerce add_to_cart event
export const trackAddToCart = (product, quantity, selectedVolume) => {
  trackEvent("add_to_cart", {
    currency: "INR",
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity: quantity,
        item_variant: selectedVolume
      }
    ]
  });
};

// GA4 Standard search event
export const trackSearch = (searchQuery) => {
  trackEvent("search", {
    search_term: searchQuery
  });
};

// Custom write_review event
export const trackWriteReview = (productId, productName, reviewerName) => {
  trackEvent("write_review", {
    product_id: productId,
    product_name: productName,
    reviewer_name: reviewerName
  });
};

// GA4 Standard e-commerce purchase event
export const trackPurchase = (orderId, cartItems, subtotal, deliveryFee, grandTotal) => {
  trackEvent("purchase", {
    transaction_id: orderId,
    value: grandTotal,
    tax: 0,
    shipping: deliveryFee,
    currency: "INR",
    items: cartItems.map((item) => ({
      item_id: item.product.id,
      item_name: item.product.name,
      item_category: item.product.category,
      price: item.product.price,
      quantity: item.quantity,
      item_variant: item.selectedVolume
    }))
  });
};
