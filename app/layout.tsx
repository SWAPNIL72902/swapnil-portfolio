import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swapnil Pahari — Product Manager",
  description:
    "APM candidate from BITS Pilani. I solve product problems, not just build features. Explore my work through an interactive AI experience.",
  keywords: ["Product Manager", "APM", "BITS Pilani", "Swapnil Pahari"],
  openGraph: {
    title: "Swapnil Pahari — Product Manager",
    description: "Explore Swapnil's work through an interactive AI experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
