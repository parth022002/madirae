"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquarePlus, MessageSquare, Trash2, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { trackWriteReview } from "@/utils/analytics";

// Seed reviews for demo/premium initial state
const SEED_REVIEWS = [
  {
    id: "rev-seed-1",
    productId: "the-deccan-jamun-reserve",
    productName: "The Deccan Jamun Reserve (Dry Red Wine)",
    name: "Aarav Mehta",
    email: "aarav.mehta@gmail.com",
    text: "Remarkable depth and body. The wild jamun gives it a tartness that is highly unique and contrasts beautifully with the dry finish. Best served slightly chilled.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rev-seed-2",
    productId: "the-deccan-jamun-reserve",
    productName: "The Deccan Jamun Reserve (Dry Red Wine)",
    name: "Pooja Hegde",
    email: "pooja.h@yahoo.com",
    text: "Absolute masterpiece! I was skeptical about fruit-based dry red wines, but this Deccan Jamun reserve blew me away. Paired perfectly with spiced lamb.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rev-seed-3",
    productId: "konkan-alphonso-sour",
    productName: "Konkan Alphonso Sour (Fruited Sour Ale)",
    name: "Siddharth Sen",
    email: "sid.sen@gmail.com",
    text: "So refreshing! The alphonso flavor is authentic and has a lovely sour finish that isn't too sweet. Ideal for warm afternoons in Bengaluru.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function ProductReviews({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load reviews from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("madirae_product_reviews");
      if (!stored) {
        localStorage.setItem("madirae_product_reviews", JSON.stringify(SEED_REVIEWS));
        setReviews(SEED_REVIEWS);
      } else {
        setReviews(JSON.parse(stored));
      }
    }
  }, []);

  const handleOpenModal = () => {
    setName("");
    setEmail("");
    setReviewText("");
    setFormError("");
    setSuccessMsg("");
    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setFormError("Please enter a review of at least 10 characters.");
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      productId,
      productName,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      text: reviewText.trim(),
      date: new Date().toISOString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("madirae_product_reviews", JSON.stringify(updatedReviews));
    
    trackWriteReview(productId, productName, name.trim());
    
    setSuccessMsg("Tasting review recorded successfully!");
    setTimeout(() => {
      setOpenModal(false);
    }, 1500);
  };

  // Filter reviews for this specific product
  const productReviews = reviews.filter((r) => r.productId === productId);

  return (
    <div className="space-y-8 mt-12 border-t border-white/10 pt-10">
      
      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gold font-sans mb-2">
            <MessageSquare className="h-3 w-3" /> Tasting Feedback
          </span>
          <h2 className="font-display font-serif text-3xl text-champagne">Connoisseur Reviews</h2>
        </div>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 rounded-sm bg-gold text-ink px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] transition duration-300 hover:bg-champagne shadow-glow font-sans self-start sm:self-center"
        >
          <MessageSquarePlus className="h-4 w-4" /> Write Tasting Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {productReviews.length > 0 ? (
          productReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-xl border border-white/5 bg-white/[0.015] hover:border-gold/20 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle top gold line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <h4 className="text-sm font-bold text-champagne font-sans">{rev.name}</h4>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-smoke/40 font-sans">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(rev.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-7 text-smoke/95 font-sans whitespace-pre-line">{rev.text}</p>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 glass-panel rounded-xl border border-white/5 bg-white/[0.01] p-8">
            <MessageSquare className="h-10 w-10 text-smoke/25 mx-auto mb-3" />
            <p className="text-xs sm:text-sm text-smoke/60 font-sans">No reviews recorded yet for this reserve. Be the first to share your tasting experience!</p>
          </div>
        )}
      </div>

      {/* Review Modal Form */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Write Tasting Review">
        <p className="text-center text-xs leading-5 text-smoke/70 mb-5 font-sans">
          Share your tasting notes, serving recommendations, and pairing reviews for <span className="text-gold font-semibold">{productName}</span>.
        </p>

        {successMsg ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center text-emerald-400 font-sans text-xs font-semibold"
          >
            {successMsg}
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
            {formError && (
              <p className="text-xs text-warning leading-5 font-semibold bg-warning/5 border border-warning/20 p-2.5 rounded-lg">{formError}</p>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-smoke focus:border-gold/50 focus:outline-none transition duration-300"
                  placeholder="e.g. Parth"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gold font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-smoke focus:border-gold/50 focus:outline-none transition duration-300"
                  placeholder="e.g. parth@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gold font-bold mb-2 font-sans">Tasting Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-[#141312] p-3 text-smoke focus:border-gold/50 focus:outline-none transition duration-300 resize-none font-sans"
                placeholder="Describe flavor notes, body, aroma, serving suggestions..."
                required
              />
            </div>

            <div className="pt-3 flex gap-3">
              <Button type="submit" icon={false} className="w-full justify-center">Submit Review</Button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="inline-flex min-h-11 items-center justify-center border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.18em] text-smoke transition hover:border-gold hover:text-gold sm:w-1/3 rounded-lg font-sans"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
}
