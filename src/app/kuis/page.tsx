"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllSubjek, getMateriWithQuizBySubjek } from "@/lib/dummy-data";
import { getSubjekIcon } from "@/lib/icon-map";

export default function KuisPage() {
  const subjekList = getAllSubjek();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-fg">
          Pilih Mata Pelajaran
        </h1>
        <p className="text-sm text-muted mt-1.5 max-w-xl">
          Pilih mata pelajaran untuk melihat daftar kuis yang tersedia. Kerjakan kuis untuk menguji pemahamanmu dan dapatkan poin!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {subjekList.map((subjek) => {
          const quizCount = getMateriWithQuizBySubjek(subjek.id).length;
          return (
            <Link
              key={subjek.id}
              href={`/kuis/${subjek.id}`}
              className="group border-2 border-border bg-card rounded-xl p-6 hover:border-fg/30 transition-all hover:shadow-md flex flex-col gap-4 min-h-[44px]"
            >
              <div className="w-14 h-14 rounded-xl bg-muted/10 border border-border/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                {getSubjekIcon(subjek.icon, 28)}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-bold font-lexend text-fg group-hover:text-fg transition-colors">
                  {subjek.nama}
                </h3>
                <p className="text-xs text-muted font-sans">
                  {quizCount} Kuis Tersedia
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-sans font-medium text-muted group-hover:text-fg transition-colors mt-auto">
                Lihat Kuis <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
