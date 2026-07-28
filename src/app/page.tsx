"use client";

import { BookOpen, Zap, BarChart2, Gamepad2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/WireframePrimitives";
import { Hero } from "@/components/landing/Hero";
import { ProfileCard } from "@/components/landing/ProfileCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FlowStep } from "@/components/landing/FlowStep";
import { ObserverCTA } from "@/components/landing/ObserverCTA";
import type { Profile } from "@/lib/types";

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

const profileAccents: Record<Profile, string> = {
  disleksia: "profile-accent-dyslexia",
  adhd: "profile-accent-adhd",
  umum: "profile-accent-umum",
};

const features = [
  {
    icon: <BookOpen size={18} />,
    label: "Accessibility Panel",
    desc: "Font, spacing, contrast, TTS, bionic — semua dalam satu panel melayang",
  },
  {
    icon: <Zap size={18} />,
    label: "Adaptive Quiz Engine",
    desc: "Kesulitan soal berubah otomatis berdasarkan performa jawaban",
  },
  {
    icon: <BarChart2 size={18} />,
    label: "Progress Tracking",
    desc: "Riwayat belajar persisten tersimpan otomatis di IndexedDB",
  },
  {
    icon: <Gamepad2 size={18} />,
    label: "Gamification",
    desc: "Streak harian, badge koleksi, dan leaderboard lokal",
  },
];

const flowSteps = [
  "1. Pilih Profil",
  "2. Panel Auto-Config",
  "3. Baca Materi + TTS",
  "4. Kerjakan Kuis",
  "5. Badge + Poin",
];

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-mono">
      {/* Hero — full-width, out of container for visual impact */}
      <div className="-mx-4 mb-12">
        <Hero />
      </div>

      <div className="space-y-12">
        {/* Profile Selector Section */}
        <section>
          <SectionLabel>
            profil selector — core flow: landing → pilih profil → materi
          </SectionLabel>
          <div className="mb-4">
            <h2 className="text-lg font-bold font-sans text-fg">
              Pilih Profil Belajarmu
            </h2>
            <p className="text-[11px] text-muted font-mono mt-0.5">
              Panel aksesibilitas akan otomatis menyesuaikan diri berdasarkan
              profil yang kamu pilih
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                accentClass={profileAccents[p.id]}
              />
            ))}
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section>
          <SectionLabel>
            fitur unggulan — differentiator vs platform konvensional
          </SectionLabel>
          <h2 className="text-lg font-bold font-sans text-fg mb-4">
            Kenapa LevelUp Berbeda?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <FeatureCard
                key={f.label}
                icon={f.icon}
                label={f.label}
                desc={f.desc}
              />
            ))}
          </div>
        </section>

        {/* User Flow Preview Section */}
        <section>
          <SectionLabel>
            user flow — alur kerja platform
          </SectionLabel>
          <h2 className="text-lg font-bold font-sans text-fg mb-4">
            Cara Kerjanya
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {flowSteps.map((step, i) => (
              <FlowStep
                key={step}
                step={i + 1}
                label={step}
                isLast={i === flowSteps.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Observer Mode CTA */}
        <section>
          <SectionLabel>
            observer mode — untuk orang tua &amp; guru
          </SectionLabel>
          <ObserverCTA />
        </section>
      </div>
    </div>
  );
}
