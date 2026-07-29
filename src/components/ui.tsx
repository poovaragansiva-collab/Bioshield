import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks";
import type { RiskLevel } from "../data/mock";

/* ------------------------------------------------------------------ */
/*  HUD corner brackets                                                */
/* ------------------------------------------------------------------ */
export function CornerTicks({ className }: { className?: string }) {
  const tick = "pointer-events-none absolute h-3 w-3 border-cyber-400/50";
  return (
    <span aria-hidden className={className}>
      <i className={cn(tick, "left-0 top-0 rounded-tl border-l border-t")} />
      <i className={cn(tick, "right-0 top-0 rounded-tr border-r border-t")} />
      <i className={cn(tick, "bottom-0 left-0 rounded-bl border-b border-l")} />
      <i className={cn(tick, "bottom-0 right-0 rounded-br border-b border-r")} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Panel — the recurring HUD frame                                    */
/* ------------------------------------------------------------------ */
export function Panel({
  index,
  title,
  aside,
  children,
  className,
  bodyClassName,
}: {
  index: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-lg border border-line/70 bg-gradient-to-b from-abyss-800/90 to-abyss-900/95 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      <CornerTicks />
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-cyber-400">
            {"//" + index}
          </span>
          <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-mist">
            {title}
          </h2>
        </div>
        {aside && <div className="flex items-center gap-2">{aside}</div>}
      </header>
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper with stagger support                         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal();
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : {};
  return (
    <div ref={ref} style={style} className={cn("reveal", shown && "is-in", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Badges & pills                                                     */
/* ------------------------------------------------------------------ */
export function OnlineBadge({ label = "ONLINE" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-bio-500/40 bg-bio-500/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-bio-300">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio-400 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bio-400" />
      </span>
      {label}
    </span>
  );
}

const RISK_STYLE: Record<RiskLevel, { cls: string; dot: string }> = {
  CRITICAL: { cls: "border-crit/50 bg-crit/10 text-crit", dot: "bg-crit" },
  HIGH: { cls: "border-crit/40 bg-crit/10 text-[#ff8a93]", dot: "bg-crit" },
  ELEVATED: { cls: "border-warn/45 bg-warn/10 text-warn", dot: "bg-warn" },
  MODERATE: { cls: "border-cyber-400/40 bg-cyber-400/10 text-cyber-300", dot: "bg-cyber-400" },
  LOW: { cls: "border-bio-500/40 bg-bio-500/10 text-bio-300", dot: "bg-bio-400" },
};

export function RiskPill({ level, className }: { level: RiskLevel; className?: string }) {
  const s = RISK_STYLE[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.16em]",
        s.cls,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {level}
    </span>
  );
}

/* Detail row used across panels */
export function DataRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line-soft/70 py-2.5 last:border-b-0">
      <dt className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-dim">
        {label}
      </dt>
      <dd className="min-w-0 text-right text-[13px] font-medium text-mist">{children}</dd>
    </div>
  );
}
