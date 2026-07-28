"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, BarChart2 } from "lucide-react";

export function Hero() {
  const router = useRouter();

  return (
    <section className="hero-surface relative overflow-hidden mb-12 animate-fade-up">
      {/* Subtle decorative dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden>
        <div className="absolute top-4 right-8 w-32 h-32 border-2 border-fg rounded-full" />
        <div className="absolute bottom-6 left-12 w-20 h-20 border-2 border-fg rounded-full" />
      </div>

      <div className="relative px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center gap-5 max-w-3xl mx-auto">
        {/* Accessibility badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium bg-accent/5 text-accent border border-accent/10 rounded-full px-3 py-1">
          ♿ Accessibility-by-design
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold font-lexend text-fg leading-tight tracking-tight">
          Belajar Tanpa Batas,
          <br />
          Sesuai Cara Otakmu
        </h1>

        <p className="text-sm sm:text-base font-sans text-muted max-w-lg leading-relaxed">
          Platform LMS inklusif berfitur adaptif yang dirancang khusus untuk
          pengidap ADHD &amp; Disleksia. Bukan sekadar toggle font — tapi
          pengalaman belajar yang benar-benar ramah.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => router.push("/belajar/materi/m1")}
            className="px-5 py-2.5 text-sm font-sans font-semibold bg-accent text-accent-fg rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
          >
            Mulai Belajar
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 text-sm font-sans text-fg border-2 border-border bg-card rounded-lg hover:bg-muted/10 transition-colors flex items-center gap-1.5"
          >
            <BarChart2 size={14} />
            Lihat Dashboard
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-[10px] font-mono text-muted">
          <span className="flex items-center gap-1">🎯 Adaptive Learning</span>
          <span className="w-1 h-1 bg-muted rounded-full" />
          <span className="flex items-center gap-1">🎮 Gamified Progress</span>
          <span className="w-1 h-1 bg-muted rounded-full" />
          <span className="flex items-center gap-1">🔒 Persisten &amp; Lokal</span>
        </div>
      </div>
    </section>
  );
}
