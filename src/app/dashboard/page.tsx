"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  Flame,
  Star,
  Award,
  TrendingUp,
  Download,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Hand,
  Lock,
  Brain,
  Medal,
  CheckCircle2,
} from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { useProgressStore } from "@/stores/progressStore";
import { PROFILE_LABELS } from "@/lib/constants";
import { getAllSubjek, getMateriBySubjek } from "@/lib/dummy-data";

export default function DashboardPage() {
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);
  const profile = useAccessibilityStore((s) => s.profile);

  const poin = useProgressStore((s) => s.poin);
  const streak = useProgressStore((s) => s.streak);
  const maxStreak = useProgressStore((s) => s.maxStreak);
  const dailyPoints = useProgressStore((s) => s.dailyPoints);
  const adaptiveLevel = useProgressStore((s) => s.adaptiveLevel);
  const badgeEarned = useProgressStore((s) => s.badge);
  const completedMateri = useProgressStore((s) => s.completedMateri);
  const materiProgress = useProgressStore((s) => s.materiProgress);
  const quizScores = useProgressStore((s) => s.quizScores);
  const hasHydrated = useProgressStore((s) => s.hasHydrated);

  const pdfDate = new Date().toISOString().slice(0, 10);
  const exportPdf = async () => {
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");
    const el = pdfRef.current;
    if (!el) return;
    await new Promise((resolve) => setTimeout(resolve, 200));
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = 210;
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`levelup-progress-${pdfDate}.pdf`);
  };

  const leaderboard = [
    { name: "Eka", pts: 350, streak: 12 },
    { name: "Dewi", pts: 280, streak: 8 },
    { name: "Budi", pts: 210, streak: 5 },
    { name: "Kamu", pts: poin, streak: streak, isMe: true },
    { name: "Ani", pts: 90, streak: 2 },
  ]
    .sort((a, b) => b.pts - a.pts)
    .map((u, i) => ({ ...u, rank: i + 1 }));

  const badges = [
    {
      id: "starter",
      label: "Starter",
      desc: "Selesaikan materi pertama",
      earned: completedMateri.length > 0 || badgeEarned.includes("starter"),
    },
    {
      id: "week",
      label: "Week Streak",
      desc: "7 hari berturut belajar",
      earned: streak >= 7 || badgeEarned.includes("week"),
    },
    {
      id: "reader",
      label: "Speed Reader",
      desc: "Baca 5 artikel dalam 1 hari",
      earned: badgeEarned.includes("reader"),
    },
    {
      id: "perfect",
      label: "Perfect Score",
      desc: "100% pada satu kuis",
      earned: badgeEarned.includes("perfect"),
    },
    {
      id: "explorer",
      label: "Explorer",
      desc: "Coba semua profil aksesibilitas",
      earned: profile !== null || badgeEarned.includes("explorer"),
    },
    {
      id: "master",
      label: "Quiz Master",
      desc: "5 kuis berturut jawaban benar",
      earned: badgeEarned.includes("master"),
    },
  ];

  const [expandedSubjek, setExpandedSubjek] = useState<Set<string>>(new Set());
  const toggleSubjek = (id: string) => {
    setExpandedSubjek((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const subjekList = getAllSubjek().map((subjek) => {
    const materis = getMateriBySubjek(subjek.id).map((m) => ({
      id: m.id,
      subjekId: m.subjekId,
      label: m.judul,
      progress: materiProgress[m.id] ?? 0,
      quizScore: m.kuisId ? (quizScores[m.kuisId] ?? null) : null,
    }));
    const avgProgress =
      materis.length > 0
        ? Math.round(
            materis.reduce((s, m) => s + m.progress, 0) / materis.length,
          )
        : 0;
    return { ...subjek, materis, avgProgress };
  });

  const materiList = subjekList.flatMap((s) => s.materis);

  const levelText =
    adaptiveLevel === 1 ? "Mudah" : adaptiveLevel === 2 ? "Sedang" : "Sulit";

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
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 font-mono space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold font-sans text-fg">
            Halo, Pelajar LevelUp! Tetap Semangat Belajar!
          </h1>

          <button
            type="button"
            onClick={exportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border/60 text-muted rounded-lg hover:bg-fg hover:text-bg transition-all font-mono cursor-pointer"
          >
            <Download size={12} /> Export PDF
          </button>
        </div>

        {!hasHydrated ? (
          <div className="space-y-8 animate-pulse">
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-border/80 bg-card rounded-xl p-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-3 w-16 bg-muted/20 rounded" />
                      <div className="w-10 h-10 rounded-xl bg-muted/20" />
                    </div>
                    <div className="h-6 w-20 bg-muted/20 rounded" />
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="border border-border/80 bg-card rounded-xl p-5 shadow-xs space-y-3">
                    <div className="flex items-end gap-3 h-32 pt-4">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                        >
                          <div
                            className="w-full bg-muted/20 rounded-t-md"
                            style={{ height: `${25 + ((i * 17) % 50)}%` }}
                          />
                          <div className="h-2.5 w-6 bg-muted/20 rounded" />
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/60 pt-2 flex justify-between">
                      <div className="h-2.5 w-36 bg-muted/20 rounded" />
                      <div className="h-2.5 w-16 bg-muted/20 rounded" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-border/80 bg-card rounded-xl overflow-hidden shadow-xs divide-y divide-border/60">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-5 py-4 bg-muted/5"
                      >
                        <div className="w-11 h-11 rounded-xl bg-muted/20" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3.5 w-40 bg-muted/20 rounded" />
                          <div className="h-2.5 w-28 bg-muted/20 rounded" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-muted/20" />
                        <div className="w-4 h-4 bg-muted/20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="border border-border/80 bg-card rounded-xl overflow-hidden shadow-xs">
                  <div className="border-b border-border/60 px-4 py-2.5">
                    <div className="h-3 w-20 bg-muted/20 rounded" />
                  </div>
                  <div className="divide-y divide-border">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-2.5"
                      >
                        <div className="w-5 h-5 rounded-full bg-muted/20" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-24 bg-muted/20 rounded" />
                          <div className="h-2 w-16 bg-muted/20 rounded" />
                        </div>
                        <div className="h-3 w-8 bg-muted/20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="border border-border/80 bg-card rounded-xl p-3 flex flex-col items-center gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-muted/20" />
                    <div className="w-full space-y-1.5 flex flex-col items-center">
                      <div className="h-3 w-16 bg-muted/20 rounded" />
                      <div className="h-2 w-24 bg-muted/20 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <>
        {/* Main Stats Row */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Poin",
                value: `${poin} pts`,
                icon: <Star size={20} className="text-amber-500" />,
              },
              {
                label: "Streak Saat Ini",
                value: `${streak}`,
                icon: <Flame size={20} className="text-amber-500" />,
              },
              {
                label: "Badge Diraih",
                value: `${badges.filter((b) => b.earned).length}/${badges.length}`,
                icon: <Award size={20} className="text-amber-500" />,
              },
              {
                label: "Level Adaptif",
                value: levelText,
                icon: <TrendingUp size={20} className="text-amber-500" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-border/80 bg-card rounded-xl p-4 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-muted">
                    {stat.label}
                  </span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-border/60 bg-bg shadow-2xs">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-sans font-bold text-fg">
                  {stat.value}
                </div>
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
              <div className="border border-border/80 bg-card rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-end gap-3 h-32 pt-4">
                  {chartData.map((d) => (
                    <div
                      key={d.day}
                      className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end"
                    >
                      <div
                        className="w-full bg-fg rounded-t-md transition-all duration-300 hover:opacity-80"
                        style={{ height: `${(d.val / maxVal) * 100}%` }}
                      />
                      <span className="text-[10px] font-mono text-muted">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/60 pt-2 flex justify-between text-[10px] text-muted font-mono">
                  <span>Poin per hari (minggu ini)</span>
                  <span>Total: {totalWeekPoints} pts</span>
                </div>
              </div>
            </div>

            {/* Materi Progress List — Accordion per Subjek */}
            <div>
              <div className="border border-border/80 bg-card rounded-xl overflow-hidden shadow-xs">
                {subjekList.map((subjek, si) => {
                  const colors = {
                    light: "bg-bg",
                    border: "border-border/60",
                    ring: "text-fg",
                    bar: "bg-fg",
                    accent: "border-l-fg",
                  };
                  const r = 14;
                  const circ = 2 * Math.PI * r;
                  const offset = circ - (subjek.avgProgress / 100) * circ;
                  const isOpen = expandedSubjek.has(subjek.id);
                  return (
                    <div
                      key={subjek.id}
                      className={si > 0 ? "border-t border-border/60" : ""}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSubjek(subjek.id)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-left bg-muted/5 hover:bg-muted/10 transition-colors"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.light} ${colors.border} border flex-shrink-0`}
                        >
                          <subjek.icon size={24} className="text-fg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-sans font-bold text-fg">
                            {subjek.nama}
                          </p>
                          <p className="text-[10px] font-mono text-muted mt-0.5 flex items-center gap-1">
                            <CheckCircle2
                              size={11}
                              className="text-muted inline"
                            />
                            {
                              subjek.materis.filter((m) => m.progress >= 100)
                                .length
                            }
                            /{subjek.materis.length} selesai
                          </p>
                        </div>
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <svg
                            className="w-10 h-10 -rotate-90"
                            viewBox="0 0 32 32"
                          >
                            <circle
                              cx="16"
                              cy="16"
                              r={r}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="text-gray-300"
                            />
                            <circle
                              cx="16"
                              cy="16"
                              r={r}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray={circ}
                              strokeDashoffset={offset}
                              strokeLinecap="round"
                              className={`${colors.ring} transition-all duration-700`}
                            />
                          </svg>
                          <span
                            className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono ${subjek.avgProgress >= 100 ? colors.ring : "text-muted"}`}
                          >
                            {subjek.avgProgress}%
                          </span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`text-muted transition-transform duration-300 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="border-t-2 border-border/60 bg-bg">
                          {subjek.materis.map((m, mi) => {
                            const completed = m.progress >= 100;
                            const hasQuiz = m.quizScore !== null;
                            return (
                              <div
                                key={m.id}
                                className={`flex items-center gap-3 px-5 py-3.5 ${mi > 0 ? "border-t border-border/30" : ""} ${colors.accent} border-l-2 pl-[52px] hover:bg-muted/5 transition-colors`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center border flex-shrink-0 ${completed ? `${colors.border} ${colors.light}` : "border-border/60 bg-bg"} shadow-xs`}
                                >
                                  <BookOpen
                                    size={11}
                                    className={
                                      completed ? colors.ring : "text-muted"
                                    }
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                    <span
                                      className={`text-[12px] font-sans font-semibold truncate ${completed ? "text-fg" : "text-fg"}`}
                                    >
                                      {m.label}
                                    </span>
                                    <span
                                      className={`text-[9px] font-mono ${completed ? colors.ring : "text-muted"}`}
                                    >
                                      {m.progress}%
                                    </span>
                                  </div>
                                  <div className="h-1 bg-muted/15 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                                      style={{ width: `${m.progress}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  {hasQuiz ? (
                                    <span
                                      className={`text-[9px] font-mono border px-1.5 py-0.5 rounded font-bold ${completed ? `${colors.border} ${colors.ring}` : "border-border text-fg"}`}
                                    >
                                      {m.quizScore}%
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        router.push(
                                          `/belajar/${m.subjekId}/${m.id}`,
                                        )
                                      }
                                      className="text-[9px] font-mono border border-border/60 px-1.5 py-0.5 rounded text-muted hover:bg-muted/10 flex items-center gap-0.5 transition-colors"
                                    >
                                      Mulai <ChevronRight size={8} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Leaderboard Column (1 col) */}
          <div>
            <div className="border border-border/80 bg-card rounded-xl overflow-hidden shadow-xs">
              <div className="border-b border-border/60 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-fg">
                  Top Pelajar
                </span>
                <span className="text-[9px] text-muted border border-border/60 px-1.5 py-0.5 rounded">
                  simulasi lokal
                </span>
              </div>
              <div className="divide-y divide-border">
                {leaderboard.map((u) => (
                  <div
                    key={u.rank}
                    className={`flex items-center gap-3 px-4 py-2.5 ${u.isMe ? "bg-muted/10 border-l-4 border-fg" : ""}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] font-mono font-bold flex-shrink-0 ${
                        u.rank === 1
                          ? "border-fg bg-fg text-bg"
                          : u.rank === 2
                            ? "border-muted bg-muted text-bg"
                            : u.rank === 3
                              ? "border-border bg-muted/20 text-fg"
                              : "border-border text-muted"
                      }`}
                    >
                      {u.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-sans truncate ${u.isMe ? "text-fg font-bold" : "text-fg"}`}
                      >
                        {u.name}
                      </p>
                      <p className="text-[9px] font-mono text-muted">
                        <Flame size={8} className="inline text-amber-500" />{" "}
                        {u.streak} streak
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-fg">
                      {u.pts}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badge Collection Section */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`border rounded-xl p-3 text-center transition-opacity flex flex-col items-center gap-2 ${
                  b.earned
                    ? "border-border/80 bg-card shadow-xs"
                    : "border-border/60 bg-muted/5 opacity-50"
                }`}
              >
                {b.earned ? (
                  <Award size={28} className="text-amber-500" />
                ) : (
                  <Lock size={28} className="text-muted" />
                )}
                <div>
                  <p className="text-xs font-sans font-bold text-fg leading-tight">
                    {b.label}
                  </p>
                  <p className="text-[9px] font-mono text-muted mt-0.5 leading-snug">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </div>

      {/* PDF template — hidden off-screen */}
      <div
        ref={pdfRef}
        className="fixed -left-[9999px] top-0 w-[794px] bg-white p-10"
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
          border: 0,
          outline: "none",
          boxSizing: "border-box",
        }}
      >
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 leading-tight">
                LevelUp
              </p>
              <p className="text-[10px] text-gray-400 leading-tight">
                Platform Belajar Adaptif
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              Laporan Progress Belajar
            </p>
            <p className="text-sm text-gray-400 mt-0.5">Tanggal: {pdfDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            {
              label: "Total Poin",
              value: `${poin} pts`,
              icon: <Star size={16} className="text-amber-500" />,
              highlight: false,
            },
            {
              label: "Streak Saat Ini",
              value: `${streak}`,
              icon: <Flame size={16} className="text-amber-500" />,
              highlight: false,
            },
            {
              label: "Badge Diraih",
              value: `${badges.filter((b) => b.earned).length}/${badges.length}`,
              icon: <Award size={16} className="text-amber-500" />,
              highlight: false,
            },
            {
              label: "Level Adaptif",
              value: levelText,
              icon: <TrendingUp size={16} className="text-amber-500" />,
              highlight: false,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="border border-gray-200 bg-white rounded-xl p-3"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gray-100">
                  {s.icon}
                </div>
                <span className="text-[9px] text-gray-500 font-medium">
                  {s.label}
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="mb-3">
            <span
              style={{ lineHeight: "1", margin: 0 }}
              className="text-sm font-bold text-gray-900"
            >
              Badge yang Sudah Diraih
            </span>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`rounded-lg border p-2.5 text-center ${b.earned ? "bg-white border-gray-200" : "bg-gray-50 border-gray-200"}`}
              >
                <div className="w-[22px] h-[22px] mx-auto mb-1 flex items-center justify-center">
                  {b.earned ? (
                    <Award size={22} className="text-amber-500" />
                  ) : (
                    <Lock size={22} className="text-gray-300" />
                  )}
                </div>
                <p
                  className={`text-[10px] font-bold leading-tight ${b.earned ? "text-gray-900" : "text-gray-400"}`}
                >
                  {b.label}
                </p>
                <p
                  className={`text-[7px] leading-tight mt-0.5 ${b.earned ? "text-gray-500" : "text-gray-300"}`}
                >
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-3">
            <span
              style={{ lineHeight: "1", margin: 0 }}
              className="text-sm font-bold text-gray-900"
            >
              Progress Materi
            </span>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-[9px] text-gray-500 font-semibold pb-2 pl-1">
                  Materi
                </th>
                <th className="text-left text-[9px] text-gray-500 font-semibold pb-2">
                  Progress
                </th>
                <th className="text-right text-[9px] text-gray-500 font-semibold pb-2 pr-1">
                  %
                </th>
                <th className="text-right text-[9px] text-gray-500 font-semibold pb-2 pr-1">
                  Skor Kuis
                </th>
              </tr>
            </thead>
            <tbody>
              {materiList.map((m, i) => (
                <tr
                  key={m.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-2.5 pl-1">
                    <span className="text-[11px] text-gray-800 font-medium">
                      {m.label}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 w-[180px]">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full min-w-[100px]">
                      <div
                        className="h-full bg-gray-900 rounded-full transition-all"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 text-right pr-1 text-[11px] text-gray-700 font-medium">
                    {m.progress}%
                  </td>
                  <td className="py-2.5 text-right pr-1 text-[11px] text-gray-700">
                    {m.quizScore !== null ? `${m.quizScore}%` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between text-[8px] text-gray-400">
          <span>Generated by LevelUp — Platform Belajar Adaptif</span>
          <span>Halaman 1 dari 1</span>
        </div>
      </div>
    </>
  );
}
