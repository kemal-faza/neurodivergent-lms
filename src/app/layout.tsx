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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={lexend.variable}>
      <body>
        <StoreHydrator>
          <AccessibilityApplier />
          <Navbar />
          <main className="dim-when-focus mx-auto max-w-5xl px-4 py-8">{children}</main>
          <AccessibilityPanel />
          <LineGuide />
        </StoreHydrator>
      </body>
    </html>
  );
}
