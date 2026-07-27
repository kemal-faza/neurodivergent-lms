"use client";

import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { PROFILE_LABELS } from "@/lib/constants";
import type { Profile } from "@/lib/types";
import Link from "next/link";

const PROFILES: { id: Profile; desc: string }[] = [
  { id: "disleksia", desc: "Font khusus, line guide, spacing lebar, TTS." },
  { id: "adhd", desc: "Focus mode, bionic reading, reward streak." },
  { id: "umum", desc: "Pengaturan default yang nyaman untuk semua." },
];

/** Landing — profile selector (PRD Flow Learner step 1). */
export default function LandingPage() {
  const profile = useAccessibilityStore((s) => s.profile);
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);

  return (
    <section className="reader">
      <h1 className="mb-2 text-2xl font-bold">LevelUp</h1>
      <p className="mb-6 text-muted">
        Pilih profilmu agar panel aksesibilitas otomatis menyesuaikan diri.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyProfile(p.id)}
            className={`rounded-xl border p-4 text-left transition ${
              profile === p.id
                ? "border-accent bg-accent/10"
                : "border-border bg-card"
            }`}
          >
            <span className="block font-semibold">{PROFILE_LABELS[p.id]}</span>
            <span className="mt-1 block text-sm text-muted">{p.desc}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/belajar/materi/m1"
          className="rounded-md bg-accent px-4 py-2 text-accent-fg"
        >
          Mulai Belajar
        </Link>
        <Link href="/dashboard" className="rounded-md border border-border px-4 py-2">
          Lihat Dashboard
        </Link>
      </div>
    </section>
  );
}
