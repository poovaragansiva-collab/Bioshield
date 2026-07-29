import { TIMELINES, type TimelineEvent } from "../data/mock";
import { Panel, Reveal } from "./ui";
import { IconCheck, IconClock } from "./icons";
import { cn } from "../utils/cn";

function Node({ status }: { status: TimelineEvent["status"] }) {
  if (status === "done") {
    return (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-bio-500/45 bg-bio-500/10 text-bio-300 shadow-[0_0_14px_-4px_rgba(62,230,164,0.5)]">
        <IconCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-md border border-cyber-400/60 bg-cyber-400/10">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute h-full w-full animate-ping rounded-full bg-cyber-400 opacity-70" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-cyber-300" />
        </span>
      </span>
    );
  }
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line bg-abyss-800/70 text-dim">
      <IconClock className="h-3.5 w-3.5" />
    </span>
  );
}

function EventRow({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <li className="relative pb-5 last:pb-0">
      <Reveal delay={index * 70} className="flex gap-3.5">
        <Node status={event.status} />
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
            <p
              className={cn(
                "text-[13.5px] font-semibold leading-snug",
                event.status === "pending" ? "text-dim" : "text-mist"
              )}
            >
              {event.stage}
              {event.status === "active" && (
                <span className="ml-2 inline-flex translate-y-[-1px] items-center gap-1 rounded-sm border border-cyber-400/50 bg-cyber-400/10 px-1.5 py-px font-mono text-[9px] font-semibold tracking-[0.18em] text-cyber-300">
                  <span className="h-1 w-1 rounded-full bg-cyber-300 animate-blink" />
                  LIVE
                </span>
              )}
            </p>
            <span className="font-mono text-[10.5px] tracking-[0.08em] text-dim tnum">
              {event.time}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-cyber-400/90">
            {event.agent}
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-haze">{event.note}</p>
        </div>
      </Reveal>
      {/* connector to next node */}
      <span
        aria-hidden
        className={cn(
          "absolute left-4 top-9 h-[calc(100%-2.5rem)] w-px",
          event.status === "pending" ? "bg-line/60" : "bg-gradient-to-b from-bio-500/50 to-line/60"
        )}
      />
    </li>
  );
}

export default function Timeline({ selectedId }: { selectedId: string }) {
  const events = TIMELINES[selectedId] ?? [];
  const doneCount = events.filter((e) => e.status === "done").length;

  return (
    <Reveal delay={140} className="h-full">
      <Panel
        index="05"
        title="Recent Incident Timeline"
        className="h-full"
        aside={
          <p className="font-mono text-[10px] tracking-[0.14em] text-dim">
            <span className="text-cyber-300">{selectedId}</span> ·{" "}
            <span className="text-bio-300 tnum">{doneCount}</span>
            <span className="text-dim tnum">/{events.length} stages</span> · detection → verification
          </p>
        }
      >
        <ol key={selectedId} className="relative">
          {events.map((e, i) => (
            <EventRow key={`${selectedId}-${i}`} event={e} index={i} />
          ))}
        </ol>
      </Panel>
    </Reveal>
  );
}
