import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Saqib Ali Butt - Portfolio",
  description: "Portfolio of Saqib Ali Butt, an AI Engineer and Creative Developer specializing in Computer Vision, NLP, and Building Intelligent Systems.",
  keywords: ["Saqib Ali Butt", "AI Engineer", "Software Engineer", "Computer Vision", "NLP", "React", "Next.js", "Creative Developer", "Portfolio"],
  authors: [{ name: "Saqib Ali Butt", url: "https://github.com/Saqibb786" }],
  creator: "Saqib Ali Butt",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saqib-portfolio786.vercel.app/",
    title: "Saqib Ali Butt - Portfolio",
    description: "Building intelligent systems that see, understand, and predict.",
    siteName: "Saqib Ali Butt Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saqib Ali Butt - Portfolio",
    description: "Building intelligent systems that see, understand, and predict.",
    creator: "@SaqibAliButt", // Placeholder if user has twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import CursorSpotlight from "@/components/CursorSpotlight";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
