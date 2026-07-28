"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAccessibilityStore } from "@/stores/accessibilityStore";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/cn";

interface ProfileCardProps {
  profile: {
    id: Profile;
    emoji: string;
    label: string;
    desc: string;
    tags: string[];
  };
  accentClass: string;
}

export function ProfileCard({ profile, accentClass }: ProfileCardProps) {
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
        "cursor-pointer p-5 flex flex-col justify-between group",
        "hover:border-fg hover:shadow-md transition-all duration-200",
        accentClass
      )}
    >
      {/* Illustration placeholder */}
      <div className="w-full h-28 rounded-lg border-2 border-dashed border-border bg-card/60 flex items-center justify-center text-muted text-[11px] font-mono mb-4">
        Ilustrasi {profile.label}
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img" aria-label={profile.label}>
            {profile.emoji}
          </span>
          <span className="text-sm font-bold font-sans text-fg">{profile.label}</span>
        </div>

        <p className="text-xs font-sans text-muted leading-relaxed">{profile.desc}</p>

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
        className="w-full mt-4 py-2 text-xs font-mono border-2 border-border text-fg rounded-lg hover:bg-muted/10 flex items-center justify-center gap-1.5 group-hover:border-fg transition-colors"
      >
        Pilih Profil {profile.label}
        <ChevronRight size={12} />
      </button>
    </Card>
  );
}
