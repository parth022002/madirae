"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { subscribeToNewsletter } from "@/services/newsletterService";
import { trackEvent } from "@/services/analyticsService";
import { newsletterEmail } from "@/lib/constants";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await subscribeToNewsletter(email, "newsletter_section");
    await trackEvent("newsletter_signup", { source: "homepage" });
    setMessage(response.message);
    setEmail("");
  }

  return (
    <section className="section-padding bg-burgundy">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Mail className="mx-auto h-10 w-10 text-gold" />
        <p className="eyebrow mt-5">Reserve List</p>
        <h2 className="section-title mt-3">Join MADIRÆ & Co. updates for product launches, recipes, and tasting ideas.</h2>
        <p className="mt-5 text-sm leading-7 text-smoke">Newsletter requests are routed to {newsletterEmail} for the project team.</p>
        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="min-h-12 flex-1 border border-white/15 bg-black/35 px-4 text-champagne outline-none transition placeholder:text-smoke/50 focus:border-gold"
          />
          <Button type="submit">Claim invite</Button>
        </form>
        {message && <p className="mt-4 text-sm text-champagne">{message}</p>}
        <a href={`mailto:${newsletterEmail}?subject=MADIRAE Newsletter Request`} className="mt-5 inline-block text-sm text-gold underline-offset-4 hover:underline">
          Email newsletter request directly
        </a>
      </div>
    </section>
  );
}
