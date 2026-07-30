"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllSubjek } from "@/lib/dummy-data";
import { useProgressStore } from "@/stores/progressStore";

export default function BelajarPage() {
  const subjekList = getAllSubjek();
  const completedMateri = useProgressStore((s) => s.completedMateri);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-fg">
          Pilih Mata Pelajaran
        </h1>
        <p className="text-sm text-muted mt-1.5 max-w-xl">
          Pilih mata pelajaran yang ingin kamu pelajari. Setiap mata pelajaran memiliki beberapa materi dengan tingkat kesulitan berbeda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {subjekList.map((subjek) => (
          <Link
            key={subjek.id}
            href={`/belajar/${subjek.id}`}
            className="group border-2 border-border bg-card rounded-xl p-6 hover:border-fg/30 transition-all hover:shadow-md flex flex-col gap-4 min-h-[44px]"
          >
            <div className="w-14 h-14 rounded-xl bg-muted/10 border border-border/60 flex items-center justify-center group-hover:scale-105 transition-transform">
              <subjek.icon size={28} />
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-base font-bold font-lexend text-fg group-hover:text-fg transition-colors">
                {subjek.nama}
              </h3>
              <p className="text-xs text-muted font-sans">
                {subjek.materiIds.length} Materi
              </p>
              <div className="space-y-1">
                {(() => {
                  const completed = completedMateri.filter((id) => subjek.materiIds.includes(id)).length;
                  const total = subjek.materiIds.length;
                  const pct = Math.round((completed / total) * 100);
                  return (
                    <>
                      <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                        <div className="h-full bg-fg rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-sans text-muted">{completed}/{total} selesai</span>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-sans font-medium text-muted group-hover:text-fg transition-colors mt-auto">
              Lihat Materi <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
