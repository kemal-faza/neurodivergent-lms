"use client";

import { BookOpen, Zap, BarChart2, Gamepad2, Settings2 } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { ProfileCard } from "@/components/landing/ProfileCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FlowStep } from "@/components/landing/FlowStep";
import { ObserverCTA } from "@/components/landing/ObserverCTA";
import type { Profile } from "@/lib/types";
import type { LucideIcon } from "lucide-react";

const profiles: Array<{
  id: Profile;
  label: string;
  desc: string;
  tags: string[];
  Icon: LucideIcon;
  accentClass: string;
  borderClass: string;
  iconBgClass: string;
  iconClass: string;
}> = [
  {
    id: "disleksia",
    label: "Disleksia",
    desc: "Font OpenDyslexic, spacing lebar, line guide ruler, TTS otomatis",
    tags: ["OpenDyslexic", "Line Guide", "TTS", "High Contrast"],
    Icon: BookOpen,
    accentClass: "profile-accent-dyslexia",
    borderClass: "border-profile-dyslexia-border",
    iconBgClass: "bg-amber-100",
    iconClass: "text-amber-700",
  },
  {
    id: "adhd",
    label: "ADHD",
    desc: "Focus mode paragraf, bionic reading, reward streak, timer Pomodoro",
    tags: ["Focus Mode", "Bionic", "Streak", "Pomodoro"],
    Icon: Zap,
    accentClass: "profile-accent-adhd",
    borderClass: "border-profile-adhd-border",
    iconBgClass: "bg-orange-100",
    iconClass: "text-orange-600",
  },
  {
    id: "umum",
    label: "Umum",
    desc: "Pengaturan default yang nyaman, fleksibel dikustomisasi kapan saja",
    tags: ["Kustomisasi", "Standar", "Fleksibel"],
    Icon: Settings2,
    accentClass: "profile-accent-umum",
    borderClass: "border-profile-umum-border",
    iconBgClass: "bg-emerald-100",
    iconClass: "text-emerald-700",
  },
];

const features: Array<{
  icon: LucideIcon;
  label: string;
  desc: string;
  tone: "amber" | "sky" | "violet" | "emerald";
}> = [
  {
    icon: Settings2,
    label: "Accessibility Panel",
    desc: "Font, spacing, contrast, TTS, bionic — semua dalam satu panel melayang",
    tone: "amber",
  },
  {
    icon: Zap,
    label: "Adaptive Quiz Engine",
    desc: "Kesulitan soal berubah otomatis berdasarkan performa jawaban",
    tone: "sky",
  },
  {
    icon: BarChart2,
    label: "Progress Tracking",
    desc: "Riwayat belajar persisten tersimpan otomatis di IndexedDB",
    tone: "violet",
  },
  {
    icon: Gamepad2,
    label: "Gamification",
    desc: "Streak harian, badge koleksi, dan leaderboard lokal",
    tone: "emerald",
  },
];

const flowSteps = [
  "Pilih Profil",
  "Panel Auto-Config",
  "Baca Materi + TTS",
  "Kerjakan Kuis",
  "Badge + Poin",
];

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans">
      {/* Hero — full-width, out of container for visual impact */}
      <div className="-mx-4 mb-16">
        <Hero />
      </div>

      <div className="space-y-16">
        {/* Profile Selector Section */}
        <section>
          <div className="mb-5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Pilih Profil Belajarmu
            </h2>
            <p className="text-sm text-muted mt-1.5 max-w-xl">
              Panel aksesibilitas akan otomatis menyesuaikan diri berdasarkan
              profil yang kamu pilih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {profiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                accentClass={p.accentClass}
                borderClass={p.borderClass}
                iconBgClass={p.iconBgClass}
                iconClass={p.iconClass}
                Icon={p.Icon}
              />
            ))}
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section>
          <div className="mb-5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Kenapa LevelUp Berbeda?
            </h2>
            <p className="text-sm text-muted mt-1.5 max-w-xl">
              Empat pilar yang membuat platform ini ramah untuk setiap profil
              neurodivergen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <FeatureCard
                key={f.label}
                icon={f.icon}
                label={f.label}
                desc={f.desc}
                tone={f.tone}
              />
            ))}
          </div>
        </section>

        {/* User Flow Preview Section */}
        <section>
          <div className="mb-5 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Cara Kerjanya
            </h2>
            <p className="text-sm text-muted mt-1.5">
              Dari pilih profil sampai dapat badge — lima langkah simpel.
            </p>
          </div>
          <div className="flex flex-wrap items-stretch gap-2 sm:gap-3">
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
          <ObserverCTA />
        </section>
      </div>
    </div>
  );
}
