import React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="w-2 h-2 bg-gray-500 rounded-sm inline-block" />
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted">{children}</span>
    </div>
  );
}

export function WBox({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`border-2 border-dashed border-border bg-card/60 flex items-center justify-center text-muted text-[11px] font-mono text-center p-2 rounded ${className}`}>
      {label}
    </div>
  );
}

export function WBtn({
  label,
  primary = false,
  onClick,
  full = false,
  children,
}: {
  label?: string;
  primary?: boolean;
  onClick?: () => void;
  full?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${full ? "w-full" : ""} px-4 py-2 text-xs font-mono border-2 rounded transition-colors flex items-center justify-center gap-1.5 ${
        primary
          ? "bg-accent text-accent-fg border-accent hover:opacity-90 shadow-sm font-semibold"
          : "bg-card text-fg border-border hover:bg-muted/10"
      }`}
    >
      {children || label}
    </button>
  );
}

export function ToggleSwitch({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between w-full text-[11px] font-mono px-3 py-2 border rounded transition-colors ${
        active
          ? "border-fg bg-fg text-bg"
          : "border-border bg-card text-fg hover:bg-muted/10"
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
          active ? "bg-emerald-500 text-white" : "bg-muted/20 text-muted"
        }`}
      >
        {active ? "ON" : "OFF"}
      </span>
    </button>
  );
}
