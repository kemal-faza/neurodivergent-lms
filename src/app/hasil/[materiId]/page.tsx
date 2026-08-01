"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import type { Soal, QuizSessionAnswer } from "@/lib/types";
import { getKuis, getMateriById } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";
import { quizPoints } from "@/lib/adaptive";
import { trailingCorrectStreak } from "@/lib/quiz-session";

const levelLabel = (level: number) =>
  level === 1 ? "Mudah" : level === 2 ? "Sedang" : "Sulit";

export default function HasilKuisPage() {
  const params = useParams<{ materiId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastQuizResult = useProgressStore((s) => s.lastQuizResult);
  const materi = getMateriById(params.materiId);
  const back = searchParams.get("back");

  const result =
    lastQuizResult && lastQuizResult.materiId === params.materiId
      ? lastQuizResult
      : null;

  const backUrl = back ?? (materi ? `/kuis/${materi.subjekId}` : "/kuis");

  if (!result || !materi || !materi.kuisId) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-sans">
        <p className="text-muted text-lg mb-4">Belum ada hasil kuis.</p>
        <button
          onClick={() => router.push(backUrl)}
          className="px-5 py-2.5 text-sm font-sans font-semibold border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-colors min-h-[44px]"
        >
          <ArrowLeft size={16} className="inline" /> Kembali ke Daftar Kuis
        </button>
      </div>
    );
  }

  const kuis = getKuis(materi.kuisId);
  const byId = new Map((kuis?.soal ?? []).map((s) => [s.id, s]));
  const review: { soal: Soal; level: number; answer: QuizSessionAnswer }[] = [];
  result.soalIds.forEach((id, i) => {
    const soal = byId.get(id);
    const answer = result.answers[i];
    if (!soal || !answer) return;
    review.push({ soal, level: result.levels[i] ?? 1, answer });
  });

  const poin = quizPoints(result.correct, result.total);
  const streakBenar = trailingCorrectStreak(
    result.answers.map((a) => (a.isCorrect ? 1 : 0)),
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <button
        onClick={() => router.push(backUrl)}
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted hover:text-fg mb-6 transition-colors min-h-[44px]"
      >
        <ArrowLeft size={14} /> Kembali ke Daftar Kuis Materi
      </button>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-fg">
          Hasil Kuis
        </h1>
        <p className="text-sm text-muted mt-1.5">{materi.judul}</p>
      </div>

      <div className="border-2 border-border bg-card rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Jawaban Benar", value: `${result.correct}/${result.total}` },
          { label: "Poin Diraih", value: `${poin} pts` },
          { label: "Streak Benar", value: `${streakBenar}` },
          { label: "Status", value: "Selesai" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-[11px] font-mono text-muted mb-1">{stat.label}</p>
            <p className="text-xl font-sans font-bold text-fg">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {review.map(({ soal, level, answer }, i) => (
          <div
            key={soal.id}
            className="border-2 border-border bg-card rounded-xl p-5"
          >
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="w-8 h-8 border-2 border-border rounded-lg flex items-center justify-center text-xs text-muted font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-muted/10 border border-border text-muted">
                Level {levelLabel(level)}
              </span>
              {answer.isCorrect ? (
                <CheckCircle size={16} className="text-emerald-500" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
            </div>
            <p className="text-sm font-medium text-fg mb-3">{soal.t}</p>
            <div className="space-y-2">
              {soal.opsi.map((opt, oi) => {
                const isUser = oi === answer.selected;
                const isKey = oi === soal.benar;
                let cls = "border-border bg-card";
                if (isKey) cls = "border-emerald-500 bg-emerald-50/60";
                else if (isUser) cls = "border-red-500 bg-red-50/60 opacity-80";
                return (
                  <div
                    key={oi}
                    className={`w-full text-left border-2 rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${cls}`}
                  >
                    <span className="text-sm text-fg flex-1">{opt}</span>
                    {isKey && (
                      <CheckCircle
                        size={16}
                        className="text-emerald-600 flex-shrink-0"
                      />
                    )}
                    {isUser && !isKey && (
                      <XCircle size={16} className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={() => router.push(backUrl)}
          className="px-6 py-2.5 text-xs font-sans font-semibold border-2 border-fg bg-fg text-bg rounded-xl hover:opacity-90 transition-all min-h-[44px]"
        >
          Kembali ke Daftar Kuis Materi
        </button>
      </div>
    </div>
  );
}
