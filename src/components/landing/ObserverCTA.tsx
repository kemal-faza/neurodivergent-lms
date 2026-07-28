"use client";

import { useRouter } from "next/navigation";
import { Eye, ArrowRight, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ObserverCTA() {
  const router = useRouter();

  return (
    <Card className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 hover-lift bg-gradient-to-br from-sky-50 to-amber-50">
      <div
        className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-sm flex-shrink-0"
        aria-hidden
      >
        <Eye size={22} />
      </div>

      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-sans text-fg">
            Mode Observer
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-sans text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
            <ShieldCheck size={10} aria-hidden />
            Tanpa login
          </span>
        </div>
        <p className="text-xs font-sans text-muted leading-relaxed">
          Pantau progress anak / siswa lewat dashboard, tanpa perlu akun.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2.5 text-xs font-sans font-medium bg-accent text-accent-fg rounded-lg hover:opacity-90 flex items-center justify-center gap-1.5 transition-opacity flex-shrink-0"
      >
        Masuk sebagai Observer
        <ArrowRight size={14} aria-hidden />
      </button>
    </Card>
  );
}
