/**
 * FOUNDATION STUB — Person B builds the real dashboard.
 * Wire: useProgressStore for real stats, Recharts/SVG ProgressChart,
 * leaderboard, badge visuals, gamification.
 */
export default function DashboardPage() {
  return (
    <section className="reader space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Placeholder label="Poin" />
        <Placeholder label="Streak" />
        <Placeholder label="Level Adaptif" />
        <Placeholder label="Materi Selesai" />
      </div>

      {/* Person B: replace with StreakBadge + real badge display */}
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted">
        Badge — milik Person B
      </div>

      {/* Person B: replace with a real chart (Recharts or SVG). */}
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted">
        ProgressChart — milik Person B
      </div>

      {/* Person B: dummy multi-user leaderboard. */}
      <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted">
        Leaderboard lokal — milik Person B
      </div>
    </section>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-center">
      <div className="text-sm uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}
