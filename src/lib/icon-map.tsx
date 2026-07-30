import { Dna, Sigma, BookOpen } from "lucide-react";
import type { FC } from "react";

const SUBJEK_ICON_MAP: Record<string, FC<{ size?: number }>> = {
  dna: Dna,
  sigma: Sigma,
  "book-open": BookOpen,
};

export function getSubjekIcon(name: string, size = 24) {
  const Icon = SUBJEK_ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}
