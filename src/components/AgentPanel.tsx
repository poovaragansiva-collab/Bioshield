import type { ReactNode } from "react";
import { AGENTS, FEED_MESSAGES, type Agent } from "../data/mock";
import { useJitter, useLiveFeed } from "../hooks";
import { Panel, Reveal, OnlineBadge } from "./ui";
import {
  IconEye,
  IconWave,
  IconHelm,
  IconScales,
  IconHub,
  IconRoute,
  IconFingerprint,
} from "./icons";

const AGENT_ICONS: Record<string, ReactNode> = {
  vision: <IconEye className="h-[18px] w-[18px]" />,
  acoustic: <IconWave className="h-[18px] w-[18px]" />,
  vessel: <IconHelm className="h-[18px] w-[18px]" />,
  conflict: <IconScales className="h-[18px] w-[18px]" />,
  coordinator: <IconHub className="h-[18px] w-[18px]" />,
  planner: <IconRoute className="h-[18px] w-[18px]" />,
  evidence: <IconFingerprint className="h-[18px] w-[18px]" />,
};

function AgentRow({ agent, index }: { agent: Agent; index: number }) {
  const latency = useJitter(agent.latencyMs, 9);
  return (
    <li
      className="group flex items-center gap-3 rounded-md border border-transparent px-2.5 py-2.5 transition-all duration-200 hover:border-line/70 hover:bg-abyss-800/70"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-cyber-400/30 bg-cyber-400/[0.08] text-cyber-300 transition-colors duration-200 group-hover:border-bio-500/40 group-hover:text-bio-300">
        {AGENT_ICONS[agent.id]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-semibold text-mist">{agent.name}</p>
          <span className="font-mono text-[10px] text-dim tnum">
            <span className={latency > agent.latencyMs ? "text-haze" : "text-cyber-300"}>
              {latency} ms
            </span>{" "}
            · cpu {agent.load}%
          </span>
        </div>
        <p className="mt-0.5 truncate text-[11px] text-dim">{agent.role}</p>
        <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-abyss-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyber-500 to-bio-400 transition-all duration-700"
            style={{ width: `${agent.load}%`, opacity: 0.85 }}
          />
        </div>
      </div>
      <OnlineBadge />
    </li>
  );
}

export default function AgentPanel() {
  const feed = useLiveFeed(FEED_MESSAGES, 4);

  return (
    <Reveal delay={80} className="h-full">
      <Panel
        index="04"
        title="Agent Swarm Status"
        className="h-full flex flex-col"
        bodyClassName="p-3.5 flex-1 flex flex-col"
        aside={
          <p className="font-mono text-[10px] tracking-[0.16em] text-bio-300">
            CONSENSUS <span className="text-mist tnum">7/7</span> · QUORUM LOCKED
          </p>
        }
      >
        <ul className="space-y-1">
          {AGENTS.map((a, i) => (
            <AgentRow key={a.id} agent={a} index={i} />
          ))}
        </ul>

        {/* live agent feed */}
        <div className="mt-auto pt-4">
          <div className="rounded-md border border-line/70 bg-abyss-950/70 p-3">
            <p className="mb-2 flex items-center gap-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-400 animate-blink" />
              Live agent feed
            </p>
            <ul className="space-y-1.5">
              {feed.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-2.5 font-mono text-[10.5px] leading-relaxed animate-rise"
                >
                  <span className="shrink-0 text-bio-400/90 tnum">{line.time}</span>
                  <span className="min-w-0 truncate text-haze">{line.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </Reveal>
  );
}
