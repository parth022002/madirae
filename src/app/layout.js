import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ui/ClientShell";
import { createMetadata } from "@/utils/seo";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = createMetadata({
  verification: {
    google: "SZtP7zroEaRBhyjcsgPK1OJeoGHAlpdUzl4Gi6xHfwg",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R8PW4LD2PF"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R8PW4LD2PF');
          `}
        </Script>
        <ClientShell>
          {children}
        </ClientShell>
        <SpeedInsights />
      </body>
    </html>
  );
}

