import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { StoreHydrator } from "../components/providers/StoreHydrator";
import { AccessibilityApplier } from "../components/AccessibilityApplier";
import { Navbar } from "../components/Navbar";
import { AccessibilityPanel } from "../components/AccessibilityPanel";
import { LineGuide } from "../components/LineGuide";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: "LevelUp — Belajar Ramah Neurodivergent",
  description:
    "Platform belajar web yang aksesibilitas-by-design untuk pengidap ADHD dan Disleksia.",
  icons: {
    icon: [
      { url: "/levelup-favicon.ico", sizes: "any" },
      { url: "/levelup-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/levelup-apple-touch-icon-180.png",
    shortcut: "/levelup-mark-512.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={lexend.variable}>
      <body className="min-h-screen bg-bg text-fg font-sans pb-16 antialiased">
        <StoreHydrator>
          <AccessibilityApplier />
          <Navbar />
          <main className="dim-when-focus">{children}</main>
          <AccessibilityPanel />
          <LineGuide />
        </StoreHydrator>
      </body>
    </html>
  );
}
