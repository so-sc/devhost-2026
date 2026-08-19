import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { Poppins, Lora } from "next/font/google";

const norse = localFont({
  src: "../assets/fonts/Norse.otf",
  variable: "--font-norse",
  preload: true,
});
const norseBold = localFont({
  src: "../assets/fonts/Norsebold.otf",
  variable: "--font-norse-bold",
  preload: true,
  display: "block",
});
const trajan = localFont({
  src: "../assets/fonts/Trajan Bold.ttf",
  variable: "--font-trajan",
  preload: true,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    default: "DevHost 2026",
    template: `%s - DevHost 2026`,
  },
  description: "Connecting Minds, Crafting Progress.",
  keywords: [
    "sosc",
    "Sahyadri Open Source Community",
    "sosc devhost",
    "devhost 2026",
    "DevHost",
    "Devhost",
    "Devhost 2026",
    "DevHost 2026",
  ],
  creator: "so-sc",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devhost.sosc.org.in/",
    title: "DevHost 2026",
    description: "Connecting Minds, Crafting Progress.",
    siteName: "DevHost 2026",
    images: [
      {
        url: "https://devhost.sosc.org.in/og.png",
        width: 1200,
        height: 630,
        alt: "DevHost 2026",
      },
    ],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${lora.variable} ${norse.variable} ${norseBold.variable} ${trajan.variable} antialiased`}
      >
        <ReactLenis root />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
