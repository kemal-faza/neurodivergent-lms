"use client";

import { useRouter } from "next/navigation";
import {
  ChevronRight,
  BarChart2,
  Sparkles,
  Zap,
  BookOpen,
  Eye,
  Sliders,
  Check,
} from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";

export function Hero() {
  const router = useRouter();
  const fontFamily = useAccessibilityStore((s) => s.fontFamily);
  const bionic = useAccessibilityStore((s) => s.bionic);
  const focusMode = useAccessibilityStore((s) => s.focusMode);
  const setSetting = useAccessibilityStore((s) => s.setSetting);
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);

  return (
    <section className="hero-surface relative overflow-hidden mb-12 animate-fade-up rounded-none sm:rounded-2xl border-y sm:border border-border/60 shadow-xs">
      <div className="relative px-6 py-14 sm:py-20 flex flex-col items-center justify-center text-center gap-6 max-w-4xl mx-auto">
        {/* Adaptability badge */}
        <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium bg-fg/5 text-fg/70 border border-border rounded-full px-3.5 py-1">
          <Sparkles size={13} className="text-fg/50" aria-hidden />
          Adaptif &amp; Inklusif
        </span>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-lexend text-fg leading-[1.15] tracking-tight max-w-3xl">
          Belajar Nyaman &amp; Fokus,{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Sesuai Cara Otakmu</span>
            <span
              className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-amber-400/25 rounded-sm -z-0"
              aria-hidden
            />
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base font-sans text-muted max-w-2xl leading-relaxed">
          LMS berfitur adaptif yang dirancang untuk mendukung cara belajar pengidap ADHD dan Disleksia. Pilih profil atau sesuaikan tampilan bacaan kapan saja.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              applyProfile("disleksia");
              router.push("/belajar/materi/m1");
            }}
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-sans font-semibold bg-fg text-bg rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer min-h-[44px]"
          >
            Mulai Belajar Sekarang
            <ChevronRight size={16} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-full sm:w-auto px-5 py-3.5 text-sm font-sans font-medium text-fg border border-border bg-card/80 backdrop-blur-md rounded-xl hover:bg-card transition-all flex items-center justify-center gap-2 shadow-2xs hover:border-fg/30 cursor-pointer min-h-[44px]"
          >
            <BarChart2 size={15} aria-hidden />
            Lihat Dashboard Progress
          </button>
        </div>

        {/* Hero Image — authentic learning visual */}
        <div className="w-full max-w-2xl mt-2 rounded-2xl overflow-hidden border border-border/60 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
            alt="Siswa belajar di lingkungan yang nyaman dan inklusif"
            className="w-full h-48 sm:h-64 object-cover"
            loading="eager"
          />
        </div>

        {/* Interactive Feature Live Preview Sandbox */}
        <div className="w-full max-w-2xl mt-2 p-5 sm:p-6 bg-card/90 backdrop-blur-md rounded-2xl border border-border/80 shadow-sm text-left transition-all">
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Sliders size={15} className="text-muted" />
              <span className="text-xs font-bold font-sans text-fg">
                Uji Coba Tampilan Interaktif Real-Time
              </span>
            </div>
            <span className="text-[11px] font-sans text-muted bg-bg px-2 py-0.5 rounded-full border border-border/60">
              Demo Pengalaman Baca
            </span>
          </div>

          {/* Feature Toggle Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => setSetting("bionic", !bionic)}
              className={`px-3 py-2.5 text-xs font-sans font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                bionic
                  ? "bg-fg text-bg border-fg shadow-xs"
                  : "bg-bg text-fg border-border hover:border-fg/30"
              }`}
            >
              <Zap size={13} />
              Bionic Reading
              {bionic && <Check size={12} />}
            </button>

            <button
              type="button"
              onClick={() =>
                setSetting(
                  "fontFamily",
                  fontFamily === "opendyslexic" ? "lexend" : "opendyslexic"
                )
              }
              className={`px-3 py-2.5 text-xs font-sans font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                fontFamily === "opendyslexic"
                  ? "bg-fg text-bg border-fg shadow-xs"
                  : "bg-bg text-fg border-border hover:border-fg/30"
              }`}
            >
              <BookOpen size={13} />
              Font OpenDyslexic
              {fontFamily === "opendyslexic" && <Check size={12} />}
            </button>

            <button
              type="button"
              onClick={() => setSetting("focusMode", !focusMode)}
              className={`px-3 py-2.5 text-xs font-sans font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px] ${
                focusMode
                  ? "bg-fg text-bg border-fg shadow-xs"
                  : "bg-bg text-fg border-border hover:border-fg/30"
              }`}
            >
              <Eye size={13} />
              Focus Mode
              {focusMode && <Check size={12} />}
            </button>
          </div>

          {/* Interactive Demo Text Box */}
          <div
            className={`p-4 rounded-xl border border-border bg-bg/50 transition-all ${
              fontFamily === "opendyslexic" ? "font-dyslexic" : "font-sans"
            }`}
          >
            <p className="text-xs sm:text-sm text-fg leading-relaxed">
              {bionic ? (
                <>
                  <span className="bionic-bold">Sis</span>tem{" "}
                  <span className="bionic-bold">sa</span>raf{" "}
                  <span className="bionic-bold">man</span>usia{" "}
                  <span className="bionic-bold">mem</span>proses{" "}
                  <span className="bionic-bold">inf</span>ormasi{" "}
                  <span className="bionic-bold">den</span>gan{" "}
                  <span className="bionic-bold">ca</span>ra{" "}
                  <span className="bionic-bold">ya</span>ng{" "}
                  <span className="bionic-bold">un</span>ik. LevelUp{" "}
                  <span className="bionic-bold">men</span>yesuaikan{" "}
                  <span className="bionic-bold">tam</span>pilan{" "}
                  <span className="bionic-bold">mat</span>eri{" "}
                  <span className="bionic-bold">sec</span>ara{" "}
                  <span className="bionic-bold">lan</span>gsung{" "}
                  <span className="bionic-bold">ag</span>ar{" "}
                  <span className="bionic-bold">ka</span>mu{" "}
                  <span className="bionic-bold">da</span>pat{" "}
                  <span className="bionic-bold">mem</span>baca{" "}
                  <span className="bionic-bold">leb</span>ih{" "}
                  <span className="bionic-bold">ce</span>pat{" "}
                  <span className="bionic-bold">da</span>n{" "}
                  <span className="bionic-bold">tet</span>ap{" "}
                  <span className="bionic-bold">fo</span>kus.
                </>
              ) : (
                "Sistem saraf manusia memproses informasi dengan cara yang unik. LevelUp menyesuaikan tampilan materi secara langsung agar kamu dapat membaca lebih cepat dan tetap fokus."
              )}
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-2 text-xs font-sans text-muted">
          <li className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-fg/40" aria-hidden />
            Pembelajaran Adaptif
          </li>
          <li className="flex items-center gap-1.5">
            <BarChart2 size={13} className="text-fg/40" aria-hidden />
            Sistem Gamifikasi
          </li>
          <li className="flex items-center gap-1.5">
            <Check size={13} className="text-fg/40" aria-hidden />
            Penyimpanan Persisten &amp; Lokal
          </li>
        </ul>
      </div>
    </section>
  );
}
