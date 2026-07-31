"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle, XCircle, Flame, Star, TrendingUp, AlertCircle, ChevronRight, Database } from "lucide-react";
import type { Soal } from "@/lib/types";


interface KuisEngineProps {
  soalList: Soal[];
  materiId: string;
  onFinishSession: (correct: number, total: number) => void;
  backUrl: string;
  poin: number;
  streak: number;
  adaptiveLevel: number;
}

export function KuisEngine({
  soalList,
  materiId,
  onFinishSession,
  backUrl,
  poin,
  streak,
  adaptiveLevel,
}: KuisEngineProps) {
  const router = useRouter();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState<number[]>([]);

  const q = soalList[qIndex] || soalList[0];
  const totalQ = soalList.length;
  const isCorrect = selected === q.benar;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    const newSession = [...sessionCorrect, isCorrect ? 1 : 0];
    setSessionCorrect(newSession);
  };

  const handleNext = () => {
    if (qIndex + 1 < soalList.length) {
      setSelected(null);
      setSubmitted(false);
      setQIndex(qIndex + 1);
    } else {
      const correct = sessionCorrect.filter(Boolean).length;
      onFinishSession(correct, soalList.length);
    }
  };

  const levelLabel = adaptiveLevel === 1 ? "Mudah" : adaptiveLevel === 2 ? "Sedang" : "Sulit";
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <div className="mb-6 space-y-3">


        <div className="flex items-center gap-4 flex-wrap justify-between bg-card border-2 border-border p-4 rounded-xl shadow-sm">
          <div className="border-2 border-border rounded-lg px-3 py-1.5 text-xs font-sans font-semibold flex items-center gap-1.5">
            <TrendingUp size={14} />
            <span>Level: <strong>{levelLabel}</strong></span>
            <span className="text-[9px] text-muted ml-1">(auto-adjust)</span>
          </div>

          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-xs font-sans text-muted flex-shrink-0">Soal {qIndex + 1}/{totalQ}</span>
            <div className="flex-1 h-2.5 bg-muted/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-fg transition-all duration-300 rounded-full"
                style={{ width: `${((qIndex + (submitted ? 1 : 0)) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3 text-xs font-sans">
            <span className="border-2 border-border px-2.5 py-1 rounded flex items-center gap-1.5">
              <Star size={13} className="text-amber-500" /> {poin} pts
            </span>
            <span className="border-2 border-border px-2.5 py-1 rounded flex items-center gap-1.5">
              <Flame size={13} className="text-amber-500" /> {streak} streak
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div>

            <div className="border-2 border-border bg-card rounded-xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border-2 border-border rounded-lg flex items-center justify-center text-xs text-muted font-bold flex-shrink-0">
                  {qIndex + 1}
                </div>
                <p className="text-base sm:text-lg text-fg font-sans font-medium leading-relaxed">{q.t}</p>
              </div>
            </div>
          </div>

          <div>

            <div className="space-y-2.5">
              {q.opsi.map((opt, i) => {
                let stateClass = "border-border bg-card hover:border-fg hover:bg-muted/10";
                if (selected === i && !submitted) stateClass = "border-fg bg-muted/10 shadow-sm";
                if (submitted && i === q.benar) stateClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200 font-semibold";
                if (submitted && selected === i && i !== q.benar) stateClass = "border-red-500 bg-red-50 dark:bg-red-950/20 opacity-70";

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

          {submitted && (
            <div className={`border-2 rounded-xl p-5 animate-fade-in ${
              isCorrect ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/5" : "border-red-500 bg-amber-50/60 dark:bg-amber-950/5"
            }`}>

              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-2 flex-1">
                  <p className="text-xs font-sans font-semibold text-fg">
                    {isCorrect
                      ? "Jawaban Benar! +20 Poin — Level adaptif kamu berpeluang naik!"
                      : "Jawaban Belum Tepat — Streak reset, kesulitan soal akan disesuaikan otomatis"}
                  </p>
                  <p className="text-xs font-sans text-fg leading-relaxed">
                    {isCorrect
                      ? "Bagus sekali! Pemahaman kamu mengenai materi ini sudah sangat tepat. Lanjutkan ke pertanyaan berikutnya."
                      : "Jangan berkecil hati! Pelajari kembali poin utama materi jika perlu. Tingkat kesulitan soal berikutnya akan disesuaikan."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-3">
            <button
              type="button"
              onClick={() => router.push(backUrl)}
              className="px-4 py-2 text-xs border-2 border-border text-fg rounded-xl hover:bg-muted/10 font-sans font-semibold min-h-[44px]"
            >
              Kembali
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={selected === null}
                className={`px-6 py-2.5 text-xs font-sans font-semibold border-2 rounded-xl transition-all shadow-sm min-h-[44px] ${
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
                className="px-6 py-2.5 text-xs font-sans font-semibold border-2 border-fg bg-fg text-bg rounded-xl hover:opacity-90 flex items-center gap-2 shadow-sm min-h-[44px]"
              >
                {qIndex + 1 < soalList.length ? "Soal Berikutnya" : "Lihat Hasil →"} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-border bg-card rounded-xl p-4 shadow-sm">

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-muted">Total Poin</span>
                <span className="text-lg font-sans font-bold text-fg">{poin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-muted flex items-center gap-1">
                  <Flame size={12} className="text-amber-500" /> Streak
                </span>
                <span className="text-lg font-sans font-bold text-fg">{streak}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-sans text-muted">Level Adaptif</span>
                <span className="text-xs font-sans border-2 border-border rounded px-2 py-0.5 font-semibold">{levelLabel}</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-border bg-card rounded-xl p-4">
            <div className="space-y-2 text-[11px] font-sans text-muted">
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
              <span className="text-[10px] font-sans text-muted mt-2 block">Threshold disimpan di progressStore</span>
            </div>
          </div>

          <div className="border-2 border-border rounded-lg p-3 text-[10px] text-muted font-sans bg-muted/5 flex items-center gap-1.5">
            <Database size={12} /> Progress kuis otomatis tersimpan ke IndexedDB (idb-keyval)
          </div>
        </div>
      </div>
    </div>
  );
}
