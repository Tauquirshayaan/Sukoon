import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: '--font-arabic' });

const SITE_URL = "https://www.sukoon.click";
const SITE_TITLE = "Sukoon — Play Quran Online Free | Ambient Qur'an Radio";
const SITE_DESCRIPTION =
  "Listen to Quran online free with Sukoon — a distraction-free ambient Quran radio. No sign-up, no ads. Play beautiful recitations blended with calming rain, night sky, and desert-wind atmospheres.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Sukoon",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "play Quran online",
    "listen to Quran online free",
    "Quran radio",
    "ambient Quran radio",
    "Quran audio online",
    "free Quran radio",
    "Islamic ambient radio",
    "Quran recitation online",
    "Quran MP3 online",
    "Sukoon",
    "peace",
    "tranquility",
  ],
  authors: [{ name: "Sukoon" }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sukoon",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sukoon — Ambient Qur'an Radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#120806",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sukoon",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${amiri.variable}`}>
        {/* Static, authored JSON-LD only — no user input involved */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
