"use client";

import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function ObserverCTA() {
  const router = useRouter();

  return (
    <Card className="border-dashed p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-fg" />
          <span className="text-xs font-bold font-sans text-fg">Mode Observer</span>
        </div>
        <p className="text-xs font-mono text-muted">
          Pantau progress anak / siswa tanpa perlu login
        </p>
      </div>
      <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 text-xs font-mono border-2 border-border text-fg rounded-lg hover:bg-muted/10 flex items-center justify-center gap-1.5 transition-colors"
      >
        Masuk sebagai Observer →
      </button>
    </Card>
  );
}
