import { createClient } from "@supabase/supabase-js";
import { newsletterEmail } from "@/lib/constants";

let supabase;

function getSupabase() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  if (!supabase) {
    supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }
  return supabase;
}

export async function subscribeToNewsletter(email, source = "website") {
  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, source })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Subscription failed");
    }

    // Save to localStorage for local Admin Dashboard logs
    try {
      if (typeof window !== "undefined") {
        const existingSubscribers = JSON.parse(localStorage.getItem("madirae_newsletter_subscribers") || "[]");
        if (!existingSubscribers.some(sub => sub.email === email)) {
          existingSubscribers.unshift({
            email,
            source: source || "website",
            date: new Date().toISOString()
          });
          localStorage.setItem("madirae_newsletter_subscribers", JSON.stringify(existingSubscribers));
        }
      }
    } catch (err) {
      console.error("Failed to save subscriber to local storage:", err);
    }

    return {
      ok: true,
      preview: data.preview || false,
      message: data.message || "Welcome to the reserve list."
    };
  } catch (error) {
    console.error("subscribeToNewsletter error:", error);
    return {
      ok: false,
      message: error.message || "An error occurred. Please try again."
    };
  }
}
