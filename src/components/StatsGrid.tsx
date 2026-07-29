import type { ReactNode } from "react";
import { STATS } from "../data/mock";
import { useCountUp } from "../hooks";
import { Reveal, CornerTicks } from "./ui";
import { IconRadar, IconAlert, IconCrosshair, IconSeal, IconArrowUp, IconArrowDown } from "./icons";
import { cn } from "../utils/cn";

const ICONS: Record<string, ReactNode> = {
  incidents: <IconRadar className="h-5 w-5" />,
  highrisk: <IconAlert className="h-5 w-5" />,
  missions: <IconCrosshair className="h-5 w-5" />,
  evidence: <IconSeal className="h-5 w-5" />,
};

const TONES = {
  cyber: {
    chip: "border-cyber-400/35 bg-cyber-400/10 text-cyber-300",
    hover: "hover:border-cyber-400/55 hover:shadow-[0_16px_44px_-14px_rgba(31,180,212,0.45)]",
    stroke: "#41d6f0",
    value: "text-mist",
  },
  crit: {
    chip: "border-crit/40 bg-crit/10 text-crit",
    hover: "hover:border-crit/55 hover:shadow-[0_16px_44px_-14px_rgba(255,100,112,0.4)]",
    stroke: "#ff6470",
    value: "text-mist",
  },
  bio: {
    chip: "border-bio-500/40 bg-bio-500/10 text-bio-300",
    hover: "hover:border-bio-500/55 hover:shadow-[0_16px_44px_-14px_rgba(31,206,135,0.4)]",
    stroke: "#3ee6a4",
    value: "text-mist",
  },
} as const;

const DELTA_TONE: Record<string, string> = {
  incidents: "text-warn",
  highrisk: "text-bio-300",
  missions: "text-cyber-300",
  evidence: "text-bio-300",
};

function Sparkline({ data, stroke }: { data: number[]; stroke: string }) {
  const w = 128;
  const h = 38;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - min) / range) * (h - 10),
  ]);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const [lx, ly] = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={area} fill={stroke} opacity="0.09" />
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" className="spark-line" />
      <circle cx={lx} cy={ly} r="2.6" fill={stroke} className="animate-pulse" />
    </svg>
  );
}

function StatCard({ stat, delay }: { stat: (typeof STATS)[number]; delay: number }) {
  const tone = TONES[stat.tone];
  const value = useCountUp(stat.value);
  const display = Number.isInteger(stat.value) ? Math.round(value) : value.toFixed(1);

  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cn(
          "group relative h-full overflow-hidden rounded-lg border border-line/70 bg-gradient-to-b from-abyss-800/90 to-abyss-900/95 p-5 transition-all duration-300 hover:-translate-y-1",
          tone.hover
        )}
      >
        <CornerTicks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-3">
          <p className="pt-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-dim">
            {stat.label}
          </p>
          <span
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-md border transition-transform duration-300 group-hover:scale-110",
              tone.chip
            )}
          >
            {ICONS[stat.id]}
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className={cn("font-display text-[38px] font-bold leading-none tnum", tone.value)}>
            {display}
          </span>
          {stat.suffix && (
            <span className="font-display text-xl font-semibold text-haze">{stat.suffix}</span>
          )}
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1 font-mono text-[11px] font-semibold",
              DELTA_TONE[stat.id]
            )}
          >
            {stat.deltaDir === "up" ? (
              <IconArrowUp className="h-3 w-3" strokeWidth={2.2} />
            ) : (
              <IconArrowDown className="h-3 w-3" strokeWidth={2.2} />
            )}
            {stat.delta}
          </span>
        </div>

        <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-dim">
          {stat.deltaNote} · {stat.caption}
        </p>

        <div className="mt-3 border-t border-line-soft/70 pt-2.5">
          <Sparkline data={stat.spark} stroke={tone.stroke} />
        </div>
      </article>
    </Reveal>
  );
}

export default function StatsGrid() {
  return (
    <div>
      <Reveal>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-cyber-400">
              //01
            </span>
            <h2 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-mist">
              30-Day Fleet Overview
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
            window <span className="text-haze">FEB 11 → MAR 12</span> · sector Tubbataha
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.id} stat={s} delay={i * 90} />
        ))}
      </div>
    </div>
  );
}
