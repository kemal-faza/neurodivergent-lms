"use client";

import { useProgressStore } from "../../stores/progressStore";
import { useHydrated } from "../../lib/useHydrated";

/**
 * Progress Dashboard stub (PRD: ProgressChart, StreakBadge, Leaderboard).
 * Reads the progress store and renders the core stats. The chart + leaderboard
 * visuals are Person B's area — placeholders below mark where they slot in.
 */
export default function DashboardPage() {
  const hydrated = useHydrated();
  const progress = useProgressStore();

  if (!hydrated) {
    return <p className="reader">Memuat progres…</p>;
  }

  return (
    <section className="reader space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Poin" value={progress.poin} />
        <Stat label="Streak" value={progress.streak} />
        <Stat label="Level Adaptif" value={progress.adaptiveLevel} />
        <Stat label="Materi Selesai" value={progress.completedMateri.length} />
      </div>

      <div>
        <h2 className="mb-2 font-semibold">Badge</h2>
        <div className="flex flex-wrap gap-2">
          {progress.badge.length === 0 && <span className="text-muted">Belum ada badge.</span>}
          {progress.badge.map((b) => (
            <span key={b} className="rounded-full bg-accent px-3 py-1 text-sm text-accent-fg">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Person B: replace with a real chart (Recharts or SVG). */}
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted">
        ProgressChart (placeholder) — milik Person B
      </div>

      {/* Person B: dummy multi-user leaderboard. */}
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted">
        Leaderboard lokal (placeholder) — milik Person B
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
