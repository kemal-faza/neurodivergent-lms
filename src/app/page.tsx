"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Zap, BarChart2, Gamepad2, ArrowRight, ChevronRight, Eye } from "lucide-react";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { SectionLabel, WBox, WBtn } from "@/components/ui/WireframePrimitives";
import type { Profile } from "@/lib/types";

export default function LandingPage() {
  const router = useRouter();
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);

  const profiles = [
    {
      id: "disleksia" as Profile,
      emoji: "📖",
      label: "Disleksia",
      desc: "Font OpenDyslexic, spacing lebar, line guide ruler, TTS otomatis",
      tags: ["OpenDyslexic", "Line Guide", "TTS", "High Contrast"],
    },
    {
      id: "adhd" as Profile,
      emoji: "⚡",
      label: "ADHD",
      desc: "Focus mode paragraf, bionic reading, reward streak, timer Pomodoro",
      tags: ["Focus Mode", "Bionic", "Streak", "Pomodoro"],
    },
    {
      id: "umum" as Profile,
      emoji: "🌐",
      label: "Umum",
      desc: "Pengaturan default yang nyaman, fleksibel dikustomisasi kapan saja",
      tags: ["Kustomisasi", "Standar", "Fleksibel"],
    },
  ];

  const features = [
    { icon: <BookOpen size={18} />, label: "Accessibility Panel", desc: "Font, spacing, contrast, TTS, bionic — semua dalam satu panel melayang" },
    { icon: <Zap size={18} />, label: "Adaptive Quiz Engine", desc: "Kesulitan soal berubah otomatis berdasarkan performa jawaban" },
    { icon: <BarChart2 size={18} />, label: "Progress Tracking", desc: "Riwayat belajar persisten tersimpan otomatis di IndexedDB" },
    { icon: <Gamepad2 size={18} />, label: "Gamification", desc: "Streak harian, badge koleksi, dan leaderboard lokal" },
  ];

  const handleSelectProfile = (pId: Profile) => {
    applyProfile(pId);
    router.push("/belajar/materi/m1");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-mono">
      {/* Hero Section */}
      <section className="relative border-2 border-border bg-card rounded-xl overflow-hidden mb-12 shadow-sm">
        <WBox label="[ Ilustrasi Hero — Belajar Inklusif Ramah Neurodivergent ]" className="w-full h-44 !rounded-none !border-0 !border-b-2 !border-dashed" />

        <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
          <SectionLabel>hero section</SectionLabel>
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold font-sans text-fg">
              Belajar Tanpa Batas, Sesuai Cara Otakmu
            </h1>
            <p className="text-xs sm:text-sm font-sans text-muted">
              Platform LMS inklusif berfitur adaptif khusus untuk pengidap ADHD & Disleksia.
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            <WBtn primary onClick={() => router.push("/belajar/materi/m1")}>
              Mulai Belajar <ChevronRight size={14} />
            </WBtn>
            <WBtn onClick={() => router.push("/dashboard")}>
              Lihat Dashboard
            </WBtn>
          </div>
        </div>
      </section>

      <div className="space-y-12">
        {/* Profile Selector Section */}
        <section>
          <SectionLabel>profil selector — core flow: landing → pilih profil → materi</SectionLabel>
          <div className="mb-4">
            <h2 className="text-lg font-bold font-sans text-fg">Pilih Profil Belajarmu</h2>
            <p className="text-[11px] text-muted font-mono mt-0.5">
              Panel aksesibilitas akan otomatis menyesuaikan diri berdasarkan profil yang kamu pilih
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profiles.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProfile(p.id)}
                className="border-2 border-border bg-card rounded-xl p-5 hover:border-fg cursor-pointer transition-colors group flex flex-col justify-between"
              >
                <div>
                  <WBox label={`Ilustrasi / Ikon ${p.label}`} className="!h-24 mb-3 rounded-lg" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{p.emoji}</span>
                      <span className="text-sm font-bold font-sans text-fg">{p.label}</span>
                    </div>
                    <p className="text-xs font-sans text-muted leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[9px] border border-dashed border-border px-1.5 py-0.5 text-muted font-mono rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProfile(p.id);
                  }}
                  className="w-full mt-4 py-2 text-xs font-mono border-2 border-border text-fg rounded-lg hover:bg-muted/10 flex items-center justify-center gap-1.5 group-hover:border-fg transition-colors"
                >
                  Pilih Profil {p.label} <ChevronRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section>
          <SectionLabel>fitur unggulan — differentiator vs platform konvensional</SectionLabel>
          <h2 className="text-lg font-bold font-sans text-fg mb-4">Kenapa LevelUp Berbeda?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <div key={f.label} className="border-2 border-dashed border-border bg-card rounded-xl p-4">
                <div className="w-10 h-10 border-2 border-dashed border-border bg-muted/10 rounded-lg flex items-center justify-center text-fg mb-3">
                  {f.icon}
                </div>
                <h3 className="text-xs font-bold font-sans text-fg mb-1">{f.label}</h3>
                <p className="text-[11px] font-mono text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User Flow Preview Section */}
        <section>
          <SectionLabel>user flow — alur kerja platform</SectionLabel>
          <h2 className="text-lg font-bold font-sans text-fg mb-4">Cara Kerjanya</h2>
          <div className="flex flex-wrap items-center gap-2">
            {["1. Pilih Profil", "2. Panel Auto-Config", "3. Baca Materi + TTS", "4. Kerjakan Kuis", "5. Badge + Poin"].map((step, i) => (
              <Fragment key={step}>
                <div className="flex-1 min-w-[110px] border-2 border-dashed border-border bg-card rounded-lg p-3 text-center">
                  <span className="text-xs text-fg font-mono font-bold">{step}</span>
                </div>
                {i < 4 && <ArrowRight size={14} className="text-muted flex-shrink-0" />}
              </Fragment>
            ))}
          </div>
        </section>

        {/* Observer Mode CTA */}
        <section>
          <SectionLabel>observer mode — untuk orang tua & guru</SectionLabel>
          <div className="border-2 border-dashed border-border bg-card rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-fg" />
                <span className="text-xs font-bold font-sans text-fg">Mode Observer</span>
              </div>
              <p className="text-xs font-mono text-muted">Pantau progress anak / siswa tanpa perlu login</p>
            </div>
            <WBtn onClick={() => router.push("/dashboard")}>
              Masuk sebagai Observer →
            </WBtn>
          </div>
        </section>
      </div>
    </div>
  );
}
