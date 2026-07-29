import { useState } from "react";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import OceanMap from "./components/OceanMap";
import IncidentPanel from "./components/IncidentPanel";
import AgentPanel from "./components/AgentPanel";
import Timeline from "./components/Timeline";
import { INCIDENTS } from "./data/mock";

export default function App() {
  const [selectedId, setSelectedId] = useState(INCIDENTS[0].id);

  return (
    <div className="min-h-screen font-body text-mist">
      <Header />

      <main className="mx-auto max-w-[1440px] space-y-7 px-4 py-7 sm:px-6">
        <StatsGrid />

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12" aria-label="Operations">
          <div className="lg:col-span-8">
            <OceanMap incidents={INCIDENTS} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="lg:col-span-4">
            <IncidentPanel selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12" aria-label="Swarm and timeline">
          <div className="lg:col-span-5">
            <AgentPanel />
          </div>
          <div className="lg:col-span-7">
            <Timeline selectedId={selectedId} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line/60 bg-abyss-900/60">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-4 py-4 font-mono text-[10px] tracking-[0.16em] text-dim sm:px-6">
          <p>
            BIOSHIELD COMMAND <span className="text-cyber-400">v2.4.1</span> · ENCRYPTED DATALINK
            AES-256 · MOCK TELEMETRY
          </p>
          <p>
            TUBBATAHA SECTOR · SULU SEA · <span className="text-bio-400">REEF WATCH ACTIVE</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
