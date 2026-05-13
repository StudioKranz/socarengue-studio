import type { ReactNode } from "react";

interface SignalFrameProps {
  children: ReactNode;
  className?: string;
}

export function SignalFrame({ children, className = "" }: SignalFrameProps) {
  return (
    <section className={`signal-surface relative overflow-hidden rounded-[6px] ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative">{children}</div>
    </section>
  );
}
