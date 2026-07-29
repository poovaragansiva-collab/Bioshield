import { INCIDENTS, type Incident } from "../data/mock";
import { useCountUp } from "../hooks";
import { Panel, Reveal, DataRow, RiskPill } from "./ui";
import { IconHash, IconSeal, IconStamp, IconCompass } from "./icons";
import { cn } from "../utils/cn";

/* ---------------- threat gauge ---------------- */

function gaugeColor(score: number): string {
  if (score >= 75) return "#ff6470";
  if (score >= 50) return "#f5b054";
  if (score >= 25) return "#41d6f0";
  return "#3ee6a4";
}

function ThreatGauge({ score }: { score: number }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const ARC = C * (240 / 360);
  const frac = score / 100;
  const color = gaugeColor(score);
  const display = Math.round(useCountUp(score, 1000));

  return (
    <div className="relative h-[118px] w-[118px] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-0">
        <circle
          cx="60" cy="60" r={R}
          fill="none" stroke="#0e2c47" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${ARC} ${C}`} transform="rotate(150 60 60)"
        />
        <circle
          cx="60" cy="60" r={R}
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${ARC} ${C}`}
          strokeDashoffset={ARC - frac * ARC}
          transform="rotate(150 60 60)"
          className="gauge-arc"
          style={{ filter: `drop-shadow(0 0 7px ${color}88)` }}
        />
        {Array.from({ length: 13 }).map((_, i) => {
          const a = ((150 + (i / 12) * 240) * Math.PI) / 180;
          const x1 = 60 + Math.cos(a) * 36;
          const y1 = 60 + Math.sin(a) * 36;
          const x2 = 60 + Math.cos(a) * 39;
          const y2 = 60 + Math.sin(a) * 39;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1b4d70" strokeWidth="1.2" />;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="font-display text-[26px] font-bold leading-none tnum" style={{ color }}>
            {display}
          </p>
          <p className="mt-1 font-mono text-[8px] tracking-[0.22em] text-dim">THREAT /100</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- status pills ---------------- */

const EVIDENCE_TONE: Record<Incident["evidence"]["status"], string> = {
  VERIFIED: "border-bio-500/45 bg-bio-500/10 text-bio-300",
  COLLECTED: "border-cyber-400/45 bg-cyber-400/10 text-cyber-300",
  "PENDING REVIEW": "border-warn/45 bg-warn/10 text-warn",
  "NOT REQUIRED": "border-line bg-abyss-700/40 text-dim",
};

function ApprovalBlock({ inc }: { inc: Incident }) {
  const a = inc.approval;
  if (a.state === "APPROVED") {
    return (
      <div className="rounded-md border border-bio-500/35 bg-bio-500/[0.07] p-3">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-bio-300">
          <IconStamp className="h-3.5 w-3.5" /> HUMAN APPROVAL · GRANTED
        </p>
        <p className="mt-1.5 text-[12px] font-medium text-mist">{a.by}</p>
        <p className="font-mono text-[10px] tracking-[0.1em] text-dim tnum">{a.at} · board op authorized</p>
      </div>
    );
  }
  if (a.state === "AWAITING") {
    return (
      <div className="rounded-md border border-warn/35 bg-warn/[0.07] p-3">
        <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-warn">
          <IconStamp className="h-3.5 w-3.5 animate-blink" /> HUMAN APPROVAL · PENDING
        </p>
        <p className="mt-1.5 text-[12px] font-medium text-mist">Duty officer review queue</p>
        <p className="font-mono text-[10px] tracking-[0.1em] text-dim">est. response &lt; 15 min</p>
      </div>
    );
  }
  return (
    <div className="rounded-md border border-line bg-abyss-700/30 p-3">
      <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-haze">
        <IconStamp className="h-3.5 w-3.5" /> HUMAN APPROVAL · AUTO-CLEARED
      </p>
      <p className="mt-1.5 text-[12px] font-medium text-mist">Policy R-12 · friendly traffic</p>
      <p className="font-mono text-[10px] tracking-[0.1em] text-dim tnum">{a.at} · audit sealed</p>
    </div>
  );
}

/* ---------------- panel ---------------- */

export default function IncidentPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const inc = INCIDENTS.find((i) => i.id === selectedId) ?? INCIDENTS[0];
  const riskDot: Record<string, string> = {
    HIGH: "bg-crit",
    ELEVATED: "bg-warn",
    MODERATE: "bg-cyber-400",
    LOW: "bg-bio-400",
    CRITICAL: "bg-crit",
  };

  return (
    <Reveal delay={120} className="h-full">
      <Panel
        index="03"
        title="Incident Details"
        className="h-full"
        aside={
          <RiskPill level={inc.riskLevel} />
        }
      >
        {/* incident selector */}
        <div className="mb-4 grid grid-cols-4 gap-1.5" role="tablist" aria-label="Select incident">
          {INCIDENTS.map((i) => (
            <button
              key={i.id}
              role="tab"
              aria-selected={i.id === inc.id}
              onClick={() => onSelect(i.id)}
              className={cn(
                "group flex items-center justify-center gap-1.5 rounded-md border px-1 py-2 font-mono text-[10px] font-medium tracking-[0.06em] transition-all duration-200",
                i.id === inc.id
                  ? "border-cyber-400/60 bg-cyber-400/10 text-cyber-300 shadow-[0_0_18px_-6px_rgba(65,214,240,0.6)]"
                  : "border-line/70 bg-abyss-800/60 text-dim hover:border-cyber-400/35 hover:text-haze"
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", riskDot[i.riskLevel])} />
              {i.id.replace("INC-", "#")}
            </button>
          ))}
        </div>

        {/* gauge + identity */}
        <div className="flex items-center gap-4 rounded-md border border-line-soft bg-abyss-850/70 p-4">
          <ThreatGauge key={inc.id} score={inc.threatScore} />
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.2em] text-dim">SUSPECT TRACK</p>
            <p className="mt-1 truncate font-display text-lg font-semibold leading-tight text-mist">
              {inc.vesselName}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-haze">{inc.vesselType}</p>
            <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-dim tnum">
              <IconCompass className="h-3.5 w-3.5 text-cyber-400" />
              {inc.heading ?? "—"} · {inc.speedKn !== null ? `${inc.speedKn} kn` : "stationary"}
            </p>
          </div>
        </div>

        {/* core data rows */}
        <dl className="mt-3">
          <DataRow label="Incident ID">
            <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-cyber-300">
              <IconHash className="h-3.5 w-3.5" /> {inc.id}
            </span>
          </DataRow>
          <DataRow label="Vessel Name">
            <span className="font-semibold">{inc.vesselName}</span>
          </DataRow>
          <DataRow label="Detected">
            <span className="font-mono text-[12px] text-haze tnum">{inc.detectedAt}</span>
          </DataRow>
          <DataRow label="Risk Level">
            <RiskPill level={inc.riskLevel} />
          </DataRow>
          <DataRow label="Decision">
            <span className="text-[12.5px] font-semibold text-warn">{inc.decision}</span>
          </DataRow>
          <DataRow label="Decided By">
            <span className="text-[12px] text-haze">{inc.decidedBy}</span>
          </DataRow>
          {inc.droneId && (
            <DataRow label="Assigned UAV">
              <span className="font-mono text-[12px] text-bio-300">{inc.droneId} → target</span>
            </DataRow>
          )}
        </dl>

        {/* evidence + approval */}
        <div className="mt-4 grid gap-3">
          <div className="rounded-md border border-line bg-abyss-850/70 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-dim">
                <IconSeal className="h-3.5 w-3.5 text-cyber-400" /> EVIDENCE STATUS
              </p>
              <span
                className={cn(
                  "rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em]",
                  EVIDENCE_TONE[inc.evidence.status]
                )}
              >
                {inc.evidence.status}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10.5px] text-haze tnum">
              <span>{inc.evidence.items} asset{inc.evidence.items === 1 ? "" : "s"} sealed</span>
              <span className="text-dim">{inc.evidence.sealHash ?? "no hash required"}</span>
            </div>
          </div>
          <ApprovalBlock inc={inc} />
        </div>
      </Panel>
    </Reveal>
  );
}
