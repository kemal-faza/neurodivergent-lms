"use client";

import Link from "next/link";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { PROFILE_LABELS } from "@/lib/constants";

/** Top navigation. Shows the active profile (if any). Person A/B can extend. */
export function Navbar() {
  const profile = useAccessibilityStore((s) => s.profile);

  return (
    <header className="border-b border-border bg-card">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-reader text-lg font-bold text-fg">
          LevelUp
        </Link>
        <ul className="flex items-center gap-4 text-sm text-fg">
          <li>
            <Link href="/belajar/materi/m1" className="hover:underline">
              Materi
            </Link>
          </li>
          <li>
            <Link href="/belajar/kuis/q1" className="hover:underline">
              Kuis
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="rounded-full bg-accent px-3 py-1 text-accent-fg">
            {profile ? PROFILE_LABELS[profile] : "Profil?"}
          </li>
        </ul>
      </nav>
    </header>
  );
}
