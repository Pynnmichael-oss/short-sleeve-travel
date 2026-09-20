import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
// import { IntroAnimation } from "@/components/IntroAnimation";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Single source of truth for the public origin. Update when the final domain
// is set. Keep the trailing slash: it includes the GitHub Pages basePath.
const SITE_URL = "https://pynnmichael-oss.github.io/short-sleeve-travel/";
const SITE_NAME = "The Shortsleeve Travel Club";
const SITE_TITLE = "Shortsleeve Travel Club";
const SITE_DESCRIPTION =
  "Curated small-group adventure travel. Big landscapes, real connections, and a community you'll keep traveling with.";
// Next does not apply basePath to metadata URLs in a static export, so the
// image URL is built absolute with the basePath included.
const OG_IMAGE = {
  url: `${SITE_URL}images/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "A group of Shortsleeve travelers smiling together at a mountain lake in the Andes",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/short-sleeve-travel/favicon.ico",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-sst-surface text-sst-navy font-body">
        {/* <IntroAnimation /> */}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
