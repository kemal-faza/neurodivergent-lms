"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getKuis } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";

/**
 * QuizEngine stub (PRD: Kuis dasar + scoring). Functional end-to-end: selecting
 * answers, submitting, and recording the score into the progress store (which
 * also bumps the adaptive level via lib/adaptive.ts). Person A adds the adaptive
 * difficulty switching on top of this baseline.
 */
export default function KuisPage() {
  const params = useParams<{ id: string }>();
  const kuis = getKuis(params.id);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correct = useMemo(() => {
    if (!kuis || !submitted) return 0;
    return kuis.soal.filter((q) => answers[q.id] === q.benar).length;
  }, [kuis, answers, submitted]);

  if (!kuis) return <p className="reader">Kuis tidak ditemukan.</p>;

  const total = kuis.soal.length;

  function submit() {
    setSubmitted(true);
    recordQuiz(kuis!.id, correct, total);
  }

  return (
    <section className="reader space-y-6">
      <h1 className="text-2xl font-bold">Kuis</h1>

      {kuis.soal.map((q, i) => (
        <fieldset key={q.id} className="rounded-lg border border-border bg-card p-4">
          <legend className="px-1 font-semibold">
            {i + 1}. {q.t}
          </legend>
          <div className="mt-2 space-y-1">
            {q.opsi.map((opt, oi) => {
              const chosen = answers[q.id] === oi;
              const isCorrect = q.benar === oi;
              let cls = "px-2 py-1 rounded";
              if (submitted) {
                if (isCorrect) cls += " bg-green-100 text-green-900";
                else if (chosen) cls += " bg-red-100 text-red-900";
              } else if (chosen) cls += " bg-accent/10";
              return (
                <label key={oi} className={`flex items-center gap-2 ${cls}`}>
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={chosen}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          className="rounded-md bg-accent px-4 py-2 text-accent-fg"
        >
          Kirim Jawaban
        </button>
      ) : (
        <p className="font-semibold">
          Skor: {correct} / {total} — poin & level diperbarui di Dashboard.
        </p>
      )}
    </section>
  );
}
