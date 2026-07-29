"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Bell, Flame, Star, Menu, X } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";
import { PROFILE_LABELS } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const profile = useAccessibilityStore((s) => s.profile);

  const poin = useProgressStore((s) => s.poin);
  const streak = useProgressStore((s) => s.streak);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/belajar", label: "Belajar" },
    { href: "/belajar/kuis/q1", label: "Kuis" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  // Needed for createPortal — only available after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const segments = href.split("/").filter(Boolean);
    const prefix = segments.length >= 2
      ? `/${segments[0]}/${segments[1]}`
      : `/${segments[0]}`;
    return pathname?.startsWith(prefix) ?? false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border/80 px-4 lg:px-8 py-2.5 shadow-xs">
        <div className="mx-auto max-w-6xl flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-fg text-bg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Brain size={18} />
            </div>
            <span className="text-base font-bold font-lexend tracking-tight text-fg">LevelUp</span>
          </Link>

          {/* Desktop Nav Links — hidden below lg */}
          <nav className="hidden lg:flex items-center gap-1.5 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-sans font-medium px-3 py-2 min-h-[36px] rounded-md transition-colors flex items-center ${
                  isLinkActive(link.href)
                    ? "bg-accent/10 text-fg font-semibold"
                    : "text-muted hover:text-fg hover:bg-muted/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="ml-auto flex items-center gap-2.5">
            {/* Active Profile Pill — hidden below lg */}
            {profile && (
              <span className="hidden lg:inline-flex text-[11px] font-sans border border-border px-2.5 py-0.5 rounded-full bg-bg text-fg/70 font-medium">
                Profil: {PROFILE_LABELS[profile]}
              </span>
            )}

            {/* Gamification Stats — hidden below lg */}
            <div className="hidden lg:flex border border-border px-3 py-1 items-center gap-2 text-xs font-sans text-fg rounded-full bg-card shadow-2xs">
              <span className="flex items-center gap-1 font-medium">
                <Flame size={13} className="text-fg/60" /> {streak} streak
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1 font-medium">
                <Star size={13} className="text-fg/60" /> {poin} pts
              </span>
            </div>

            {/* Avatar & Notification */}
            <div className="w-9 h-9 border border-border rounded-full bg-muted/20 flex items-center justify-center text-xs shadow-2xs">
              👤
            </div>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-muted/10 transition-colors flex items-center justify-center text-muted hover:text-fg"
              aria-label="Notifikasi"
            >
              <Bell size={16} />
            </button>

            {/* Hamburger Button — shown below lg */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 text-fg rounded-lg hover:bg-muted/10 flex items-center justify-center"
              aria-label="Menu navigasi"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Drawer — rendered via portal to escape header stacking context */}
      {mobileOpen && mounted && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-fg/30 backdrop-blur-sm z-[60] lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <nav className="fixed top-0 right-0 h-full w-72 bg-card border-l border-border z-[70] p-6 space-y-2 shadow-2xl animate-fade-in lg:hidden flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-border">
              <span className="text-sm font-bold font-lexend text-fg">Menu Navigasi</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-fg hover:bg-muted/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-sans rounded-xl min-h-[44px] transition-colors ${
                    isLinkActive(link.href)
                      ? "bg-accent/10 text-fg font-semibold"
                      : "text-muted hover:bg-muted/10 hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Drawer Footer Info */}
            <div className="border-t border-border pt-4 space-y-3 font-sans">
              {profile && (
                <div className="text-xs text-muted">
                  Profil: <strong className="text-fg">{PROFILE_LABELS[profile]}</strong>
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1 font-medium text-fg">
                  <Flame size={14} className="text-fg/60" /> {streak} streak
                </span>
                <span className="flex items-center gap-1 font-medium text-fg">
                  <Star size={14} className="text-fg/60" /> {poin} pts
                </span>
              </div>
            </div>
          </nav>
        </>,
        document.body
      )}
    </>
  );
}
