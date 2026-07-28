"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, BookOpen, Zap, Globe } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import type { Profile } from "@/lib/types";
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
}

export function ProfileCard({
  profile,
  accentClass,
  iconClass,
  borderClass,
  iconBgClass,
  Icon,
}: ProfileCardProps) {
  const router = useRouter();
  const applyProfile = useAccessibilityStore((s) => s.applyProfile);

  const handleSelect = () => {
    applyProfile(profile.id);
    router.push("/belajar/materi/m1");
  };

  return (
    <Card
      onClick={handleSelect}
      className={cn(
        "cursor-pointer p-5 flex flex-col gap-4 group hover-lift overflow-hidden relative",
        accentClass,
        borderClass
      )}
    >
      {/* Icon visual — solid, themed */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shadow-sm",
          iconBgClass
        )}
        aria-hidden
      >
        <Icon size={22} className={iconClass} />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-bold font-sans text-fg block">
          {profile.label}
        </span>
        <p className="text-xs font-sans text-muted leading-relaxed">
          {profile.desc}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {profile.tags.map((tag) => (
            <Badge key={tag} variant="soft">
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
        className="w-full mt-auto py-2 text-xs font-sans font-medium border border-border text-fg rounded-lg hover:bg-card transition-colors flex items-center justify-center gap-1.5 group-hover:border-fg"
      >
        Pilih Profil {profile.label}
        <ChevronRight size={12} aria-hidden />
      </button>
    </Card>
  );
}
