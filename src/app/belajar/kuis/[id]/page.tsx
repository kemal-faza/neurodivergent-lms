"use client";

import { useParams } from "next/navigation";
import { getKuis } from "@/lib/dummy-data";

/**
 * FOUNDATION STUB — Person A builds QuizEngine.
 * Wire: answer selection, scoring, recordQuiz, adaptive difficulty
 * via nextAdaptiveLevel() and useProgressStore((s) => s.recordQuiz).
 */
export default function KuisPage() {
  const params = useParams<{ id: string }>();
  const kuis = getKuis(params.id);

  if (!kuis) return <p className="reader">Kuis tidak ditemukan.</p>;

  return (
    <section className="reader space-y-6">
      <h1 className="text-2xl font-bold">Kuis</h1>
      {kuis.soal.map((q, i) => (
        <div key={q.id} className="rounded-lg border border-border bg-card p-4">
          <p className="font-semibold">
            {i + 1}. {q.t}
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-muted">
            {q.opsi.map((opt) => (
              <li key={opt}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-sm text-muted">
        (FOUNDATION STUB — Person A akan menambahkan interaksi kuis + scoring)
      </p>
    </section>
  );
}
