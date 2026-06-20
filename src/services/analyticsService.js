import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase";

export async function trackEvent(name, params = {}) {
  const analytics = await getFirebaseAnalytics();
  if (analytics) logEvent(analytics, name, params);
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  }
}
