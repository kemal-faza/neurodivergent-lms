"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Bell, Sliders, Flame, Star } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";
import { PROFILE_LABELS } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const profile = useAccessibilityStore((s) => s.profile);
  const bionic = useAccessibilityStore((s) => s.bionic);
  const lineGuide = useAccessibilityStore((s) => s.lineGuide);
  const focusMode = useAccessibilityStore((s) => s.focusMode);
  const ttsEnabled = useAccessibilityStore((s) => s.ttsEnabled);

  const poin = useProgressStore((s) => s.poin);
  const streak = useProgressStore((s) => s.streak);

  // Count active accessibility features
  const activeCount = [bionic, lineGuide, focusMode, ttsEnabled].filter(Boolean).length;

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/belajar/materi/m1", label: "Belajar" },
    { href: "/belajar/kuis/q1", label: "Kuis" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-card border-b-2 border-border px-4 lg:px-8 py-3 shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 border-2 border-border rounded flex items-center justify-center bg-muted/10 group-hover:border-fg transition-colors">
            <Brain size={16} className="text-fg" />
          </div>
          <span className="text-base font-bold font-sans tracking-tight text-fg">LevelUp</span>
          <span className="text-[9px] font-mono text-muted border border-dashed border-border px-1 rounded">logo</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-4 ml-4">
          {navLinks.map((link) => {
            const isActive = (() => {
              if (link.href === "/") return pathname === "/";
              const segments = link.href.split("/").filter(Boolean);
              const prefix = segments.length >= 2
                ? `/${segments[0]}/${segments[1]}`
                : `/${segments[0]}`;
              return pathname?.startsWith(prefix) ?? false;
            })();

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-mono pb-0.5 border-b-2 transition-colors ${
                  isActive
                    ? "border-fg text-fg font-semibold"
                    : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-3">
          {/* Active Profile Pill */}
          {profile && (
            <span className="hidden sm:inline-flex text-[10px] font-mono border border-border px-2 py-0.5 rounded bg-muted/10 font-medium">
              Profil: {PROFILE_LABELS[profile]}
            </span>
          )}

          {/* Gamification Stats */}
          <div className="hidden md:flex border border-dashed border-border px-2.5 py-1 items-center gap-2.5 text-[11px] font-mono text-fg rounded">
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-amber-500" /> {streak} streak
            </span>
            <span className="text-muted">|</span>
            <span className="flex items-center gap-1">
              <Star size={12} className="text-amber-500" /> {poin} pts
            </span>
          </div>

          {/* Accessibility Indicator Button */}
          <div className="flex items-center gap-1 text-[11px] font-mono border border-border px-2 py-1 rounded bg-muted/10">
            <Sliders size={12} className="text-amber-500" />
            <span className="hidden sm:inline font-sans text-[11px]">Aksesibilitas</span>
            {activeCount > 0 && (
              <span className="w-4 h-4 bg-amber-400 text-gray-900 rounded-full text-[9px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>

          {/* Avatar & Notification */}
          <div className="w-7 h-7 border border-dashed border-border rounded-full bg-muted/10 flex items-center justify-center text-[10px]">
            👤
          </div>
          <Bell size={14} className="text-muted cursor-pointer hover:text-fg" />
        </div>
      </div>
    </header>
  );
}
