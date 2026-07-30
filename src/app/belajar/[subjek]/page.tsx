"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/WireframePrimitives";
import { getSubjekById, getMateriBySubjek } from "@/lib/dummy-data";
import { getSubjekIcon } from "@/lib/icon-map";

export default function SubjekPage() {
  const params = useParams<{ subjek: string }>();
  const router = useRouter();
  const subjek = getSubjekById(params.subjek);

  if (!subjek) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center font-sans">
        <p className="text-muted text-lg mb-4">Mata pelajaran tidak ditemukan.</p>
        <button
          onClick={() => router.push("/belajar")}
          className="px-5 py-2.5 text-sm font-sans font-semibold border-2 border-border text-fg rounded-xl hover:bg-muted/10 transition-colors min-h-[44px]"
        >
          ← Kembali ke Daftar Mata Pelajaran
        </button>
      </div>
    );
  }

  const materiList = getMateriBySubjek(params.subjek);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-muted hover:text-fg mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Daftar Mata Pelajaran
      </Link>

      <div className="mb-8">
        <SectionLabel>daftar materi</SectionLabel>
        <h1 className="text-2xl sm:text-3xl font-bold font-lexend text-fg flex items-center gap-3">
          <span className="w-12 h-12 rounded-xl bg-muted/10 border border-border/60 flex items-center justify-center text-2xl">
            {getSubjekIcon(subjek.icon, 24)}
          </span>
          {subjek.nama}
        </h1>
        <p className="text-sm text-muted mt-1.5 max-w-xl">
          Pilih materi yang ingin kamu pelajari. Setiap materi terdiri dari 4 paragraf yang bisa dibaca dengan fitur aksesibilitas lengkap.
        </p>
      </div>

      <div className="space-y-4">
        {materiList.map((materi) => (
          <div
            key={materi.id}
            className="group border-2 border-border bg-card rounded-xl p-5 hover:border-fg/30 transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center gap-4"
          >
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
              href={`/belajar/${params.subjek}/${materi.id}`}
              className="flex-shrink-0 px-5 py-2.5 text-xs font-sans font-semibold border-2 border-fg bg-fg text-bg rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:shadow-md min-h-[44px]"
            >
              Mulai Belajar <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
