"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getMateriById, getKuis } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";
import { KuisEngine } from "@/components/KuisEngine";

export default function KuisMaterialPage() {
  const params = useParams<{ subjek: string; material: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const materi = getMateriById(params.material);

  const poin = useProgressStore((s) => s.poin);
  const adaptiveLevel = useProgressStore((s) => s.adaptiveLevel);
  const recordQuizSession = useProgressStore((s) => s.recordQuizSession);

  if (!materi || !materi.kuisId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
        <p className="text-muted">Kuis tidak ditemukan untuk materi ini.</p>
        <button onClick={() => router.push("/kuis")} className="mt-4 px-4 py-2 text-xs border rounded">
          Ke Daftar Kuis
        </button>
      </div>
    );
  }

  const kuis = getKuis(materi.kuisId);

  if (!kuis || !kuis.soal.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
        <p className="text-muted">Kuis tidak ditemukan.</p>
        <button onClick={() => router.push(`/kuis/${params.subjek}`)} className="mt-4 px-4 py-2 text-xs border rounded">
          Kembali ke Daftar Kuis
        </button>
      </div>
    );
  }

  const handleFinish = (correct: number, total: number) => {
    recordQuizSession(materi.id, correct, total);
    router.push(`/hasil/${materi.id}`);
  };

  const backUrl = searchParams.get("back") ?? `/kuis/${params.subjek}`;

  return (
    <KuisEngine
      soalList={kuis.soal}
      materiId={materi.id}
      onFinishSession={handleFinish}
      backUrl={backUrl}
      poin={poin}
      adaptiveLevel={adaptiveLevel}
    />
  );
}
