import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL('https://thulirorganics.in'),
  title: {
    default: "Thulir Organics — Nature, Made Easy.",
    template: "%s | Thulir Organics",
  },
  description:
    "Natural goodness, thoughtfully transformed into simple everyday care for your skin, hair and wellness. Discover Thulir Organics — a Tamil Nadu-based organic personal-care brand.",
  keywords: [
    "organic skincare",
    "natural hair care",
    "Tamil Nadu organic",
    "Thulir Organics",
    "botanical beauty",
    "Ayurvedic skincare",
    "nalangu maavu",
    "shikakai",
    "kumkumadi",
  ],
  authors: [{ name: "Thulir Organics" }],
  creator: "Thulir Organics",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Thulir Organics",
    title: "Thulir Organics — Nature, Made Easy.",
    description:
      "Natural goodness, thoughtfully transformed into simple everyday care for your skin, hair and wellness.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-cream-light text-forest font-body antialiased">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
