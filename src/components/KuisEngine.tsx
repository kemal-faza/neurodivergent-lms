"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Flame, Star, TrendingUp, AlertCircle, ChevronRight, Volume2, Square } from "lucide-react";
import type { Soal } from "@/lib/types";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { toBionic } from "@/lib/bionic";
import { speak, stopSpeaking } from "@/lib/tts";


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
  const bionic = useAccessibilityStore((s) => s.bionic);
  const ttsEnabled = useAccessibilityStore((s) => s.ttsEnabled);
  const focusMode = useAccessibilityStore((s) => s.focusMode);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const [questionFocused, setQuestionFocused] = useState(false);

  useEffect(() => {
    stopSpeaking();
    setIsPlayingTts(false);
    setQuestionFocused(false);
  }, [qIndex]);

  useEffect(() => () => stopSpeaking(), []);

  const q = soalList[qIndex] || soalList[0];
  const totalQ = soalList.length;
  const isCorrect = selected === q.benar;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: { selected: selected!, isCorrect },
    }));
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

  const handleJumpToQuestion = (index: number) => {
    if (index === qIndex) return;
    setQIndex(index);
    const answer = answers[index];
    if (answer) {
      setSelected(answer.selected);
      setSubmitted(true);
    } else {
      setSelected(null);
      setSubmitted(false);
    }
  };

  const handleToggleTts = () => {
    if (isPlayingTts) {
      stopSpeaking();
      setIsPlayingTts(false);
    } else {
      const text = `${q.t} ${q.opsi.join(". ")}`;
      speak(text, {
        onend: () => setIsPlayingTts(false),
        onerror: () => setIsPlayingTts(false),
      });
      setIsPlayingTts(true);
    }
  };

  const levelLabel = adaptiveLevel === 1 ? "Mudah" : adaptiveLevel === 2 ? "Sedang" : "Sulit";
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans">
      <div className="mb-6 space-y-3">


        <div className={`flex items-center gap-4 flex-wrap justify-between bg-card border-2 border-border p-4 rounded-xl shadow-sm ${focusMode && questionFocused ? "focus-dimmed" : ""}`}>
          <div className="border-2 border-border rounded-lg px-3 py-1.5 text-xs font-sans font-semibold flex items-center gap-1.5">
            <TrendingUp size={14} />
            <span>Level: <strong>{levelLabel}</strong></span>
          </div>

          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-xs font-sans text-muted flex-shrink-0">Soal {qIndex + 1}/{totalQ}</span>
            <div className="flex-1 h-2.5 bg-muted/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-fg transition-all duration-300 rounded-full"
                style={{ width: `${(Object.keys(answers).length / totalQ) * 100}%` }}
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
          <div className="reader space-y-4">
          <div>

            <div
              className={`border-2 border-border bg-card rounded-xl p-5 sm:p-6 shadow-sm transition-all ${focusMode ? "cursor-pointer" : ""} ${
                focusMode && questionFocused ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => focusMode && setQuestionFocused((f) => !f)}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border-2 border-border rounded-lg flex items-center justify-center text-xs text-muted font-bold flex-shrink-0">
                  {qIndex + 1}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-2">
                    {bionic ? (
                      <p
                        className="text-fg font-medium flex-1"
                        dangerouslySetInnerHTML={{ __html: toBionic(q.t) }}
                      />
                    ) : (
                      <p className="text-fg font-medium flex-1">{q.t}</p>
                    )}
                    {focusMode && questionFocused && (
                      <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded font-bold flex-shrink-0">
                        Fokus
                      </span>
                    )}
                  </div>
                  {ttsEnabled && (
                    <button
                      type="button"
                      onClick={handleToggleTts}
                      className="px-3.5 py-1.5 bg-fg text-bg hover:opacity-90 rounded-lg text-xs flex items-center gap-1.5 font-sans font-bold shadow-sm"
                    >
                      {isPlayingTts ? <Square size={12} /> : <Volume2 size={12} />}
                      <span>{isPlayingTts ? "Berhenti" : "Dengarkan Soal dan Jawaban"}</span>
                    </button>
                  )}
                </div>
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
                    {bionic ? (
                      <span
                        className="text-fg flex-1"
                        dangerouslySetInnerHTML={{ __html: toBionic(opt) }}
                      />
                    ) : (
                      <span className="text-fg flex-1">{opt}</span>
                    )}
                    {submitted && i === q.benar && <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />}
                    {submitted && selected === i && i !== q.benar && <XCircle size={16} className="text-red-500 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
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

        <div className={`space-y-4 ${focusMode && questionFocused ? "focus-dimmed" : ""}`}>
          <div className="border-2 border-border bg-card rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-sans font-semibold text-fg mb-3">Navigator Soal</h3>
            <div className="grid grid-cols-5 gap-2">
              {soalList.map((_, i) => {
                const answer = answers[i];
                const isCurrent = i === qIndex;
                let cls = "border-2 border-border text-muted";
                if (isCurrent) {
                  cls = "bg-fg text-bg ring-2 ring-fg";
                } else if (answer?.isCorrect) {
                  cls = "bg-emerald-500 text-white";
                } else if (answer) {
                  cls = "bg-red-500 text-white";
                }
                const stateLabel = isCurrent
                  ? "sedang dikerjakan"
                  : answer?.isCorrect
                  ? "dijawab benar"
                  : answer
                  ? "dijawab salah"
                  : "belum dikerjakan";

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleJumpToQuestion(i)}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Soal ${i + 1}, ${stateLabel}`}
                    className={`w-9 h-9 rounded-full text-xs font-sans font-semibold flex items-center justify-center transition-all ${cls}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
