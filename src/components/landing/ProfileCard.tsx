"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import type { Profile, AgeBand } from "@/lib/types";
import { cn } from "@/lib/cn";

interface ProfileCardProps {
  profile: {
    id: Profile;
    label: string;
    desc: string;
    tags: string[];
  };
  accentClass: string;
  iconClass: string;
  borderClass: string;
  iconBgClass: string;
  Icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  ageBand: AgeBand | null;
}

export function ProfileCard({
  profile,
  Icon,
  ageBand,
}: ProfileCardProps) {
  const router = useRouter();
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);
  const currentProfile = useAccessibilityStore((s) => s.profile);

  const isActive = currentProfile === profile.id;

  const handleSelect = () => {
    applyProfile(profile.id, ageBand ?? "dewasa");
    router.push("/belajar");
  };

  return (
    <Card
      onClick={handleSelect}
      className={cn(
        "cursor-pointer p-6 flex flex-col gap-5 group hover-lift overflow-hidden relative border transition-all shadow-xs bg-card",
        isActive
          ? "border-fg/30 ring-1 ring-fg/10 shadow-md"
          : "border-border hover:border-fg/20"
      )}
    >
      <div className="flex items-start justify-between">
        {/* Icon visual — neutral, consistent */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs transition-transform group-hover:scale-105 bg-bg border border-border/60"
          aria-hidden
        >
          <Icon size={24} className="text-fg/70" />
        </div>

        {isActive && (
          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-fg bg-fg/5 px-2.5 py-0.5 rounded-full border border-border">
            <Check size={12} /> Profil Aktif
          </span>
        )}
      </div>

      <div className="space-y-2.5 flex-1">
        <h3 className="text-base font-bold font-lexend text-fg">
          {profile.label}
        </h3>
        <p className="text-xs font-sans text-muted leading-relaxed">
          {profile.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.tags.map((tag) => (
            <Badge key={tag} variant="soft" className="bg-bg/80 border border-border/60">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
        }}
        className="w-full mt-auto py-3 px-4 text-xs font-sans font-semibold border border-border text-fg rounded-xl bg-card hover:bg-fg hover:text-bg transition-all flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-fg/40 min-h-[44px]"
      >
        Pilih Profil {profile.label}
        <ChevronRight size={14} aria-hidden />
      </button>
    </Card>
  );
}
