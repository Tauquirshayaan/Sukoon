import type { Metadata, Viewport } from "next";
import { Inter, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: "Sukoon — Ambient Qur'an Radio",
  description: "A free, distraction-free ambient Qur'an radio. Find peace and tranquility through beautiful recitations.",
  keywords: ["Quran", "Islamic", "ambient", "radio", "recitation", "Sukoon", "peace"],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#120806",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${amiri.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
