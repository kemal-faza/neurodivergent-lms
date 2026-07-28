"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, BarChart2, Sparkles, Gamepad2, Lock, Accessibility } from "lucide-react";

export function Hero() {
  const router = useRouter();

  return (
    <section className="hero-surface relative overflow-hidden mb-12 animate-fade-up">
      {/* Decorative blurred orbs */}
      <div
        aria-hidden
        className="absolute -top-12 -right-16 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -left-12 w-56 h-56 rounded-full bg-sky-200/40 blur-3xl pointer-events-none"
      />

      <div className="relative px-6 py-16 sm:py-20 flex flex-col items-center justify-center text-center gap-5 max-w-3xl mx-auto">
        {/* Accessibility badge */}
        <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium bg-accent/5 text-accent border border-accent/15 rounded-full px-3 py-1">
          <Accessibility size={12} aria-hidden />
          Accessibility-by-design
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold font-lexend text-fg leading-tight tracking-tight">
          Belajar Tanpa Batas,
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-amber-500 to-sky-600 bg-clip-text text-transparent">
            Sesuai Cara Otakmu
          </span>
        </h1>

        <p className="text-sm sm:text-base font-sans text-muted max-w-xl leading-relaxed">
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
            <ChevronRight size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 text-sm font-sans text-fg border border-border bg-card/80 backdrop-blur rounded-lg hover:bg-card transition-colors flex items-center gap-1.5"
          >
            <BarChart2 size={14} aria-hidden />
            Lihat Dashboard
          </button>
        </div>

        {/* Trust badges — lucide icons */}
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-[11px] font-sans text-muted">
          <li className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-500" aria-hidden />
            Adaptive Learning
          </li>
          <li aria-hidden className="w-1 h-1 bg-muted/50 rounded-full" />
          <li className="flex items-center gap-1.5">
            <Gamepad2 size={12} className="text-sky-600" aria-hidden />
            Gamified Progress
          </li>
          <li aria-hidden className="w-1 h-1 bg-muted/50 rounded-full" />
          <li className="flex items-center gap-1.5">
            <Lock size={12} className="text-emerald-600" aria-hidden />
            Persisten &amp; Lokal
          </li>
        </ul>
      </div>
    </section>
  );
}
