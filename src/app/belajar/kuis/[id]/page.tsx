"use client";

import { useParams, useRouter } from "next/navigation";
import { getKuis } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";
import { KuisEngine } from "@/components/KuisEngine";

export default function KuisPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const kuis = getKuis(params.id || "q1");

  const poin = useProgressStore((s) => s.poin);
  const adaptiveLevel = useProgressStore((s) => s.adaptiveLevel);
  const recordQuiz = useProgressStore((s) => s.recordQuiz);

  if (!kuis || !kuis.soal.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
        <p className="text-muted">Kuis tidak ditemukan.</p>
        <button onClick={() => router.push("/dashboard")} className="mt-4 px-4 py-2 text-xs border rounded">
          Ke Dashboard
        </button>
      </div>
    );
  }

  const handleFinish = (correct: number, total: number) => {
    recordQuiz(kuis.id, correct, total);
    router.push("/dashboard");
  };

  return (
    <KuisEngine
      soalList={kuis.soal}
      materiId={kuis.materiId}
      onFinishSession={handleFinish}
      backUrl="/belajar"
      poin={poin}
      adaptiveLevel={adaptiveLevel}
    />
  );
}
