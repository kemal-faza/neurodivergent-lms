"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, CheckCircle, Circle } from "lucide-react";
import { getSubjekById, getMateriWithQuizBySubjek } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";

export default function KuisSubjekPage() {
  const params = useParams<{ subjek: string }>();
  const router = useRouter();
  const subjek = getSubjekById(params.subjek);
  const getQuizProgress = useProgressStore((s) => s.getQuizProgress);

  if (!subjek) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-sans">
        <p className="text-muted text-lg mb-4">Mata pelajaran tidak ditemukan.</p>
        <button
          onClick={() => router.push("/kuis")}
          className="px-5 py-2.5 text-sm font-sans font-semibold border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-colors min-h-[44px]"
        >
          Kembali ke Daftar Mata Pelajaran
        </button>
      </div>
    );
  }

  const materiList = getMateriWithQuizBySubjek(params.subjek);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <Link
        href="/kuis"
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted hover:text-fg mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Daftar Mata Pelajaran
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-fg flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-muted/10 border border-border/60 flex items-center justify-center">
            <subjek.icon size={24} />
          </span>
          {subjek.nama}
        </h1>
        <p className="text-sm text-muted mt-1.5 max-w-xl">
          Pilih kuis untuk menguji pemahamanmu. Setiap kuis terdiri dari 5 soal adaptif.
        </p>
      </div>

      <div className="space-y-4">
        {materiList.map((materi) => {
          const progress = getQuizProgress(materi.id);
          const lastRatio = progress.lastAttempt
            ? Math.round((progress.lastAttempt.correct / progress.lastAttempt.total) * 100)
            : 0;

          return (
            <div
              key={materi.id}
              className="group border-2 border-border bg-card rounded-xl p-5 hover:border-fg/30 transition-all hover:shadow-md flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold font-lexend text-fg">
                      {materi.judul}
                    </h3>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-muted/10 border border-border text-muted">
                      Level {materi.level}
                    </span>
                  </div>
                  <p className="text-xs text-muted font-sans leading-relaxed">
                    {materi.deskripsi}
                  </p>
                </div>

                <Link
                  href={`/kuis/${params.subjek}/${materi.id}`}
                  className="flex-shrink-0 px-5 py-2.5 text-xs font-sans font-semibold border-2 border-fg bg-fg text-bg rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
                >
                  {progress.isCompleted ? "Ulangi Kuis" : "Mulai Kuis"} <ChevronRight size={14} />
                </Link>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  {progress.isCompleted ? (
                    <CheckCircle size={14} className="text-emerald-500" />
                  ) : (
                    <Circle size={14} className="text-muted" />
                  )}
                  <span className="text-xs font-sans text-muted">
                    {progress.isCompleted ? "Selesai" : "Belum Dikerjakan"}
                  </span>
                </div>

                {progress.isCompleted && progress.bestScore !== null && (
                  <>
                    <span className="text-border">|</span>
                    <span className="text-xs font-sans text-muted">
                      Skor Terbaik: <strong className="text-fg">{progress.bestScore} pts</strong>
                    </span>
                    <span className="text-border">|</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${lastRatio}%` }}
                        />
                      </div>
                      <span className="text-xs font-sans font-semibold text-fg">{lastRatio}%</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {materiList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-sm">Belum ada kuis tersedia untuk mata pelajaran ini.</p>
        </div>
      )}
    </div>
  );
}
