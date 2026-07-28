"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, CheckCircle, XCircle, Flame, Star, TrendingUp, AlertCircle } from "lucide-react";
import { getKuis } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";
import { SectionLabel, WBox } from "@/components/ui/WireframePrimitives";

export default function KuisPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const kuis = getKuis(params.id || "q1");

  const poin = useProgressStore((s) => s.poin);
  const streak = useProgressStore((s) => s.streak);
  const adaptiveLevel = useProgressStore((s) => s.adaptiveLevel);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  if (!kuis || !kuis.soal.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
        <p className="text-muted">Kuis tidak ditemukan.</p>
        <button onClick={() => router.push("/dashboard")} className="mt-4 px-4 py-2 text-xs border rounded">
          ← Ke Dashboard
        </button>
      </div>
    );
  }

  const q = kuis.soal[qIndex] || kuis.soal[0];
  const totalQ = kuis.soal.length;
  const isCorrect = selected === q.benar;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);

    const newCorrect = isCorrect ? sessionCorrectCount + 1 : sessionCorrectCount;
    if (isCorrect) setSessionCorrectCount(newCorrect);

    // Record progress state attempt
    recordQuiz(kuis.id, isCorrect ? 1 : 0, 1);
  };

  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);
    if (qIndex + 1 < kuis.soal.length) {
      setQIndex((i) => i + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const levelLabel = adaptiveLevel === 1 ? "Mudah" : adaptiveLevel === 2 ? "Sedang" : "Sulit";
  const levelColor =
    adaptiveLevel === 1
      ? "text-blue-600 border-blue-400 bg-blue-50 dark:bg-blue-950/40"
      : adaptiveLevel === 2
      ? "text-amber-600 border-amber-400 bg-amber-50 dark:bg-amber-950/40"
      : "text-purple-600 border-purple-400 bg-purple-50 dark:bg-purple-950/40";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-mono">
      {/* Quiz Header */}
      <div className="mb-6 space-y-3">
        <SectionLabel>kuis adaptif — QuizEngine + AdaptiveLogic (rule-based threshold)</SectionLabel>

        <div className="flex items-center gap-4 flex-wrap justify-between bg-card border-2 border-border p-4 rounded-xl shadow-sm">
          {/* Adaptive level badge */}
          <div className={`border-2 ${levelColor} rounded-lg px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5`}>
            <TrendingUp size={14} />
            <span>Level: <strong>{levelLabel}</strong></span>
            <span className="text-[9px] text-muted ml-1">(auto-adjust)</span>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-xs font-mono text-muted flex-shrink-0">Soal {qIndex + 1}/{totalQ}</span>
            <div className="flex-1 h-2.5 bg-muted/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-fg transition-all duration-300 rounded-full"
                style={{ width: `${((qIndex + (submitted ? 1 : 0)) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          {/* Live Score + Streak */}
          <div className="flex gap-3 text-xs font-mono">
            <span className="border border-dashed border-border px-2.5 py-1 rounded flex items-center gap-1.5">
              <Star size={13} className="text-amber-500" /> {poin} pts
            </span>
            <span className="border border-dashed border-border px-2.5 py-1 rounded flex items-center gap-1.5">
              <Flame size={13} className="text-amber-500" /> {streak} streak
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Question & Answer Options Column */}
        <div className="md:col-span-2 space-y-4">
          {/* Question Card */}
          <div>
            <SectionLabel>pertanyaan — tingkat kesulitan: {q.diff === 1 ? "mudah" : q.diff === 2 ? "sedang" : "sulit"}</SectionLabel>
            <div className="border-2 border-border bg-card rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-xs text-muted font-bold flex-shrink-0">
                  {qIndex + 1}
                </div>
                <p className="text-base sm:text-lg text-fg font-sans font-medium leading-relaxed">{q.t}</p>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div>
            <SectionLabel>pilihan jawaban — gaya kartu radio button</SectionLabel>
            <div className="space-y-2.5">
              {q.opsi.map((opt, i) => {
                let stateClass = "border-border bg-card hover:border-fg hover:bg-muted/10";
                if (selected === i && !submitted) stateClass = "border-fg bg-muted/10 shadow-sm";
                if (submitted && i === q.benar) stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 font-semibold";
                if (submitted && selected === i && i !== q.benar) stateClass = "border-red-400 bg-red-50 dark:bg-red-950/30 opacity-70";

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => !submitted && setSelected(i)}
                    disabled={submitted}
                    className={`w-full text-left border-2 rounded-xl px-4 py-3.5 text-sm font-sans transition-all flex items-center gap-3 ${stateClass}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selected === i ? "border-fg bg-fg" : "border-border"
                    }`}>
                      {selected === i && <div className="w-2 h-2 bg-bg rounded-full" />}
                    </div>
                    <span className="text-fg flex-1">{opt}</span>
                    {submitted && i === q.benar && <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />}
                    {submitted && selected === i && i !== q.benar && <XCircle size={16} className="text-red-500 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Adaptive Feedback Box */}
          {submitted && (
            <div className={`border-2 rounded-xl p-5 animate-fade-in ${
              isCorrect ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20" : "border-amber-400 bg-amber-50/60 dark:bg-amber-950/20"
            }`}>
              <SectionLabel>feedback adaptif — hasil submit</SectionLabel>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-2 flex-1">
                  <WBox
                    label={isCorrect
                      ? `✓ Jawaban Benar! +20 Poin — Level adaptif kamu berpeluang naik!`
                      : "✗ Jawaban Belum Tepat — Streak reset, kesulitan soal akan disesuaikan otomatis"}
                    className="!h-9 !text-xs !border-border font-bold"
                  />
                  <p className="text-xs font-sans text-fg leading-relaxed">
                    {isCorrect
                      ? "Bagus sekali! Pemahaman kamu mengenai materi ini sudah sangat tepat. Lanjutkan ke pertanyaan berikutnya."
                      : "Jangan berkecil hati! Pelajari kembali poin utama materi jika perlu. Tingkat kesulitan soal berikutnya akan disesuaikan."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={() => router.push("/belajar/materi/m1")}
              className="px-4 py-2 text-xs border-2 border-border text-muted rounded-lg hover:bg-muted/10 font-mono"
            >
              ← Kembali ke Materi
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selected === null}
                className={`px-6 py-2.5 text-xs font-mono font-bold border-2 rounded-lg transition-all shadow-sm ${
                  selected !== null
                    ? "border-fg bg-fg text-bg hover:opacity-90"
                    : "border-border text-muted bg-muted/10 cursor-not-allowed"
                }`}
              >
                Submit Jawaban
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-mono font-bold border-2 border-fg bg-fg text-bg rounded-lg hover:opacity-90 flex items-center gap-2 shadow-sm"
              >
                {qIndex + 1 < kuis.soal.length ? "Soal Berikutnya" : "Lihat Dashboard →"} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Side Panel: Session Progress & Adaptive Logic */}
        <div className="space-y-4">
          {/* Session Score Card */}
          <div className="border-2 border-border bg-card rounded-xl p-4 shadow-sm">
            <SectionLabel>skor sesi ini</SectionLabel>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-muted">Total Poin</span>
                <span className="text-lg font-sans font-bold text-fg">{poin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-muted flex items-center gap-1">
                  <Flame size={12} className="text-amber-500" /> Streak
                </span>
                <span className="text-lg font-sans font-bold text-fg">{streak}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-muted">Level Adaptif</span>
                <span className={`text-xs font-mono border rounded px-2 py-0.5 font-bold ${levelColor}`}>{levelLabel}</span>
              </div>
            </div>
          </div>

          {/* Adaptive Logic Explanation */}
          <div className="border-2 border-dashed border-border bg-card rounded-xl p-4">
            <SectionLabel>adaptive logic — rule-based</SectionLabel>
            <div className="space-y-2 text-[11px] font-mono text-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Score ≥ 80% → naik level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span>Score ≤ 40% → turun level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span>40–80% → level tetap</span>
              </div>
              <WBox label="[Threshold disimpan di progressStore]" className="!h-8 !text-[9px] mt-2" />
            </div>
          </div>

          {/* Badge Progress */}
          <div className="border-2 border-dashed border-border bg-card rounded-xl p-4">
            <SectionLabel>badge progress</SectionLabel>
            <WBox label="[ Badge: Quiz Master — 5 kuis benar berturut ]" className="!h-14 rounded-lg mb-2" />
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-amber-500 rounded-full" />
              </div>
              <span className="text-[10px] text-muted font-mono font-bold">3/5</span>
            </div>
          </div>

          {/* IndexedDB Note */}
          <div className="border border-dashed border-border rounded-lg p-3 text-[10px] text-muted font-mono bg-muted/5">
            💾 Progress kuis otomatis tersimpan ke IndexedDB (idb-keyval)
          </div>
        </div>
      </div>
    </div>
  );
}
