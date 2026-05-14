import type { ReactNode } from "react";

interface IntakeFieldProps {
  label: string;
  signal?: string;
  children: ReactNode;
}

export function IntakeField({ label, signal, children }: IntakeFieldProps) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.22em] text-signal/75">{label}</span>
      {signal ? <span className="mt-1 block text-sm leading-6 text-paper/48">{signal}</span> : null}
      <span className="mt-3 block">{children}</span>
    </label>
  );
}
