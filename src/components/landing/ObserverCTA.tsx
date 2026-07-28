"use client";

import { useRouter } from "next/navigation";
import { Eye, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ObserverCTA() {
  const router = useRouter();

  return (
    <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover-lift border border-border bg-card shadow-xs rounded-2xl">
      <div
        className="w-12 h-12 rounded-xl bg-bg text-fg/70 border border-border/60 flex items-center justify-center shadow-2xs flex-shrink-0"
        aria-hidden
      >
        <Eye size={22} />
      </div>

      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-bold font-lexend text-fg">
            Mode Observer
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-fg/70 bg-fg/5 border border-border px-2.5 py-0.5 rounded-full">
            Akses Langsung
          </span>
        </div>
        <p className="text-xs font-sans text-muted leading-relaxed max-w-xl">
          Pantau perkembangan belajar siswa atau anak langsung melalui dashboard pemantauan tanpa perlu pendaftaran akun.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="w-full sm:w-auto px-5 py-3 text-xs font-sans font-semibold bg-fg text-bg rounded-xl hover:opacity-90 flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-xs active:scale-95 min-h-[44px]"
      >
        Buka Dashboard Observer
        <ArrowRight size={14} aria-hidden />
      </button>
    </Card>
  );
}
