"use client";

import { BookOpen, Zap, BarChart2, Gamepad2, Settings2 } from "lucide-react";
import { Hero } from "@/components/landing/Hero";
import { ProfileCard } from "@/components/landing/ProfileCard";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FlowStep } from "@/components/landing/FlowStep";
import { ObserverCTA } from "@/components/landing/ObserverCTA";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import { AGE_BAND_LABELS } from "@/lib/constants";
import type { AgeBand, Profile } from "@/lib/types";
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
    desc: "Dilengkapi font OpenDyslexic, jarak antar baris lebih luas, pembaca garis, dan Text-to-Speech.",
    tags: ["OpenDyslexic", "Line Guide", "TTS", "High Contrast"],
    Icon: BookOpen,
    accentClass: "",
    borderClass: "",
    iconBgClass: "",
    iconClass: "",
  },
  {
    id: "adhd",
    label: "ADHD",
    desc: "Dilengkapi mode fokus per paragraf, Bionic Reading, pelacak streak, dan timer Pomodoro interaktif.",
    tags: ["Focus Mode", "Bionic", "Streak", "Pomodoro"],
    Icon: Zap,
    accentClass: "",
    borderClass: "",
    iconBgClass: "",
    iconClass: "",
  },
  {
    id: "umum",
    label: "Umum",
    desc: "Tampilan belajar standar yang nyaman dan fleksibel disesuaikan dengan kebutuhanmu kapan saja.",
    tags: ["Kustomisasi", "Standar", "Fleksibel"],
    Icon: Settings2,
    accentClass: "",
    borderClass: "",
    iconBgClass: "",
    iconClass: "",
  },
];

const features: Array<{
  icon: LucideIcon;
  label: string;
  desc: string;
}> = [
  {
    icon: Settings2,
    label: "Accessibility Panel",
    desc: "Atur ukuran font, kontras, pembaca teks, dan bionic reading dari satu panel floating.",
  },
  {
    icon: Zap,
    label: "Adaptive Quiz Engine",
    desc: "Tingkat kesulitan kuis menyesuaikan secara otomatis berdasarkan performa jawabanmu.",
  },
  {
    icon: BarChart2,
    label: "Progress Tracking",
    desc: "Catatan dan riwayat belajar tersimpan secara otomatis di penyimpanan lokal perangkatmu.",
  },
  {
    icon: Gamepad2,
    label: "Gamification System",
    desc: "Bangun konsistensi belajar lewat streak harian, koleksi badge, dan papan skor.",
  },
];

const flowSteps = [
  "Pilih Profil",
  "Panel Auto-Config",
  "Baca Materi & TTS",
  "Kerjakan Kuis",
  "Dapatkan Badge",
];

export default function LandingPage() {
  const profile = useAccessibilityStore((s) => s.profile);
  const ageBand = useAccessibilityStore((s) => s.ageBand);
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 font-sans">
      {/* Hero */}
      <div className="-mx-4 mb-16">
        <Hero />
      </div>

      <div className="space-y-16">
        {/* Profile Selector Section */}
        <section>
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Pilih Profil Belajarmu
            </h2>
            <p className="text-sm text-muted mt-1.5 max-w-xl">
              Panel aksesibilitas akan otomatis mengonfigurasi tampilan materi berdasarkan profil yang kamu pilih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profiles.map((p) => (
              <ProfileCard
                key={p.id}
                profile={p}
                accentClass={p.accentClass}
                borderClass={p.borderClass}
                iconBgClass={p.iconBgClass}
                iconClass={p.iconClass}
                Icon={p.Icon}
                ageBand={ageBand}
              />
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold font-lexend text-fg mb-2">
              Rentang Usia
            </h3>
            <p className="text-xs text-muted mb-3 font-sans">
              Pengaturan visual disesuaikan dengan rentang usiamu. Bisa kamu ubah kapan saja.
            </p>
            <div className="grid grid-cols-3 gap-2 max-w-md">
              {(["anak", "remaja", "dewasa"] as AgeBand[]).map((band) => (
                <button
                  key={band}
                  type="button"
                  onClick={() => applyProfile(profile ?? "umum", band)}
                  className={`text-xs px-3 py-2.5 border-2 rounded-xl font-sans font-semibold min-h-[44px] transition-colors ${
                    ageBand === band
                      ? "border-fg bg-fg text-bg"
                      : "border-border bg-card text-fg hover:bg-muted/10"
                  }`}
                >
                  {AGE_BAND_LABELS[band]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section>
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Kenapa LevelUp Berbeda?
            </h2>
            <p className="text-sm text-muted mt-1.5 max-w-xl">
              Empat pilar utama yang dirancang untuk memberikan pengalaman belajar inklusif dan ramah neurodivergen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
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
          <style>{`
            /* End-of-row arrow: hide right arrow, show down arrow on every 3rd item in 3-col grid */
            @media (min-width: 640px) and (max-width: 1023px) {
              [data-flow-grid] > *:nth-child(3n):not(:last-child) .arrow-right {
                display: none !important;
              }
              [data-flow-grid] > *:nth-child(3n):not(:last-child) .arrow-down {
                display: block !important;
              }
            }
          `}</style>
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-lexend text-fg">
              Cara Kerja Platform
            </h2>
            <p className="text-sm text-muted mt-1.5">
              Alur sederhana dari menentukan profil hingga mengumpulkan badge belajar.
            </p>
          </div>
          <div
            data-flow-grid
            className="flex flex-col sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 items-center"
          >
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
