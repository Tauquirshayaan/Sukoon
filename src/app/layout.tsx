import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: "Sukoon",
  description: "Ambient Qur'an Radio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} ${amiri.variable}`}>
      <body>{children}</body>
    </html>
  );
}
