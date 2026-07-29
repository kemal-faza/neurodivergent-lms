"use client";

import { useRouter } from "next/navigation";
import { Flame, Star, Award, TrendingUp, Download, BookOpen, ChevronRight } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";
import { PROFILE_LABELS } from "@/lib/constants";
import { getAllSubjek, getMateriBySubjek } from "@/lib/dummy-data";
import { SectionLabel, WBox } from "@/components/ui/WireframePrimitives";

export default function DashboardPage() {
  const router = useRouter();
  const profile = useAccessibilityStore((s) => s.profile);

  const poin = useProgressStore((s) => s.poin);
  const streak = useProgressStore((s) => s.streak);
  const maxStreak = useProgressStore((s) => s.maxStreak);
  const dailyPoints = useProgressStore((s) => s.dailyPoints);
  const adaptiveLevel = useProgressStore((s) => s.adaptiveLevel);
  const badgeEarned = useProgressStore((s) => s.badge);
  const completedMateri = useProgressStore((s) => s.completedMateri);
  const quizScores = useProgressStore((s) => s.quizScores);

  const leaderboard = [
    { name: "Eka (ADHD)", pts: 350, streak: 12 },
    { name: "Dewi (Disleksia)", pts: 280, streak: 8 },
    { name: "Budi (Umum)", pts: 210, streak: 5 },
    { name: "Kamu", pts: poin, streak: streak, isMe: true },
    { name: "Ani (ADHD)", pts: 90, streak: 2 },
  ]
    .sort((a, b) => b.pts - a.pts)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  const badges = [
    { id: "starter", label: "Starter", desc: "Selesaikan materi pertama", earned: completedMateri.length > 0 || badgeEarned.includes("starter") },
    { id: "week", label: "Week Streak", desc: "7 hari berturut belajar", earned: streak >= 7 || badgeEarned.includes("week") },
    { id: "reader", label: "Speed Reader", desc: "Baca 5 artikel dalam 1 hari", earned: badgeEarned.includes("reader") },
    { id: "perfect", label: "Perfect Score", desc: "100% pada satu kuis", earned: badgeEarned.includes("perfect") },
    { id: "explorer", label: "Explorer", desc: "Coba semua profil aksesibilitas", earned: profile !== null || badgeEarned.includes("explorer") },
    { id: "master", label: "Quiz Master", desc: "5 kuis berturut jawaban benar", earned: badgeEarned.includes("master") },
  ];

  const materiList = getAllSubjek().flatMap((subjek) =>
    getMateriBySubjek(subjek.id).map((m) => ({
      id: m.id,
      subjekId: m.subjekId,
      label: m.judul,
      progress: completedMateri.includes(m.id) ? 100 : 0,
      quizScore: m.kuisId ? (quizScores[m.kuisId] ?? null) : null,
    })),
  );

  const levelText = adaptiveLevel === 1 ? "Mudah" : adaptiveLevel === 2 ? "Sedang" : "Sulit";

  const dayLabels = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { day: dayLabels[d.getDay()], val: dailyPoints[key] ?? 0 };
  });
  const maxVal = Math.max(...chartData.map((d) => d.val), 1);
  const totalWeekPoints = chartData.reduce((sum, d) => sum + d.val, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-mono space-y-8">
      {/* Page Header */}
      <div>
        <SectionLabel>dashboard — progress tracking + gamification</SectionLabel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-sans text-fg">
              Halo, Pelajar LevelUp! 👋 Tetap Semangat Belajar!
            </h1>
            <p className="text-xs text-muted font-mono mt-1">
              Profil aktif: <strong>{profile ? PROFILE_LABELS[profile] : "Belum Dipilih"}</strong> · Record streak: <strong>{maxStreak} hari</strong>
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs border-2 border-dashed border-border text-muted rounded-lg hover:bg-muted/10 font-mono"
            >
              <Download size={12} /> Export PDF
            </button>
            <span className="text-[9px] border border-dashed border-border text-muted px-1.5 py-0.5 rounded">P3 feature</span>
          </div>
        </div>
      </div>

      {/* Main Stats Row */}
      <section>
        <SectionLabel>statistik utama — dari progress store</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Poin", value: `${poin} pts`, icon: <Star size={20} className="text-amber-500" />, sub: "+20 hari ini" },
            { label: "Streak Saat Ini", value: `${streak} 🔥`, icon: <Flame size={20} className="text-amber-500" />, sub: `Record: ${maxStreak} hari` },
            { label: "Badge Diraih", value: `${badges.filter((b) => b.earned).length}/${badges.length}`, icon: <Award size={20} className="text-amber-500" />, sub: `${badges.filter((b) => !b.earned).length} badge tersisa` },
            { label: "Level Adaptif", value: levelText, icon: <TrendingUp size={20} className="text-amber-500" />, sub: "Auto-adjusted" },
          ].map((stat) => (
            <div key={stat.label} className="border-2 border-border bg-card rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-muted">{stat.label}</span>
                <div className="w-8 h-8 border border-dashed border-border rounded-lg flex items-center justify-center bg-muted/10">
                  {stat.icon}
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-sans font-bold text-fg">{stat.value}</div>
              <p className="text-[10px] font-mono text-muted mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart + Leaderboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Chart & Materi Progress (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Weekly Points Bar Chart */}
          <div>
            <SectionLabel>progress chart — grafik aktivitas mingguan</SectionLabel>
            <div className="border-2 border-border bg-card rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-end gap-3 h-32 pt-4">
                {chartData.map((d) => (
                  <div key={d.day} className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end">
                    <div
                      className="w-full bg-fg rounded-t-md transition-all duration-300 hover:opacity-80"
                      style={{ height: `${(d.val / maxVal) * 100}%` }}
                    />
                    <span className="text-[10px] font-mono text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-border pt-2 flex justify-between text-[10px] text-muted font-mono">
                <span>Poin per hari (minggu ini)</span>
                <span>Total: {totalWeekPoints} pts</span>
              </div>
            </div>
          </div>

          {/* Materi Progress List */}
          <div>
            <SectionLabel>progres materi — status baca & kuis</SectionLabel>
            <div className="border-2 border-border bg-card rounded-xl divide-y divide-dashed divide-border shadow-sm">
              {materiList.map((m) => (
                <div key={`${m.subjekId}-${m.id}`} className="flex items-center gap-4 px-4 py-3.5">
                  <div className="w-9 h-9 border border-dashed border-border rounded-lg flex items-center justify-center bg-muted/10">
                    <BookOpen size={15} className="text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-sans font-semibold text-fg truncate">{m.label}</span>
                      <span className="text-[10px] font-mono text-muted">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                      <div className="h-full bg-fg rounded-full transition-all" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                  {m.quizScore !== null ? (
                    <span className="text-[10px] font-mono border border-border px-2 py-0.5 rounded text-fg font-bold">
                      Kuis: {m.quizScore}%
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => router.push(`/belajar/${m.subjekId}/${m.id}`)}
                      className="text-[10px] font-mono border border-dashed border-border px-2 py-0.5 rounded text-muted hover:bg-muted/10 flex items-center gap-0.5"
                    >
                      Mulai <ChevronRight size={10} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Column (1 col) */}
        <div>
          <SectionLabel>leaderboard lokal — simulasi multi-user</SectionLabel>
          <div className="border-2 border-border bg-card rounded-xl overflow-hidden shadow-sm">
            <div className="border-b-2 border-dashed border-border px-4 py-2.5 flex justify-between items-center">
              <span className="text-xs font-mono font-bold text-fg">Top Pelajar</span>
              <span className="text-[9px] text-muted border border-dashed border-border px-1.5 py-0.5 rounded">simulasi lokal</span>
            </div>
            <div className="divide-y divide-dashed divide-border">
              {leaderboard.map((u) => (
                <div
                  key={u.rank}
                  className={`flex items-center gap-3 px-4 py-2.5 ${u.isMe ? "bg-muted/10 border-l-4 border-fg" : ""}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono font-bold flex-shrink-0 ${
                    u.rank === 1 ? "border-fg bg-fg text-bg" :
                    u.rank === 2 ? "border-muted bg-muted text-bg" :
                    u.rank === 3 ? "border-border bg-muted/20 text-fg" :
                    "border-border text-muted"
                  }`}>
                    {u.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-sans truncate ${u.isMe ? "text-fg font-bold" : "text-fg"}`}>
                      {u.name} {u.isMe && "← kamu"}
                    </p>
                    <p className="text-[9px] font-mono text-muted">
                      <Flame size={8} className="inline text-amber-500" /> {u.streak} streak
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-fg">{u.pts}</span>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-dashed border-border px-4 py-2 text-[9px] text-muted font-mono">
              Data dummy · Simulasi kompetisi positif
            </div>
          </div>
        </div>
      </div>

      {/* Badge Collection Section */}
      <section>
        <SectionLabel>badge koleksi — gamifikasi</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`border-2 rounded-xl p-3.5 text-center transition-opacity flex flex-col justify-between ${
                b.earned
                  ? "border-border bg-card shadow-sm"
                  : "border-dashed border-border bg-muted/5 opacity-50"
              }`}
            >
              <div className="text-3xl mb-1">{b.earned ? "🏅" : "🔒"}</div>
              <div>
                <p className="text-xs font-sans font-bold text-fg leading-tight">{b.label}</p>
                <p className="text-[9px] font-mono text-muted mt-1 leading-tight">{b.desc}</p>
              </div>
              {b.earned ? (
                <span className="text-[8px] font-mono border border-emerald-500 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded mt-2 inline-block font-bold">
                  earned ✓
                </span>
              ) : (
                <span className="text-[8px] font-mono border border-border text-muted px-1.5 py-0.5 rounded mt-2 inline-block">
                  locked
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Notes */}
      <div className="border-t-2 border-dashed border-border pt-4 flex flex-wrap gap-2 text-[9px] font-mono text-muted">
        <span>💾 IndexedDB persist (idb-keyval)</span>
        <span>·</span>
        <span>📊 SVG Bar Chart</span>
        <span>·</span>
        <span>🏆 Leaderboard = simulasi lokal</span>
        <span>·</span>
        <span>🔄 State Zustand shared</span>
      </div>
    </div>
  );
}
