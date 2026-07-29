import { IconLogo, IconSat } from "./icons";
import { TICKER_ITEMS } from "../data/mock";
import { useClock } from "../hooks";

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-bio-500/45 bg-bio-500/10 px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-bio-300">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio-400 opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-bio-400" />
      </span>
      SYSTEMS&nbsp;ONLINE
    </span>
  );
}

export default function Header() {
  const now = useClock();
  const date = now.toISOString().slice(0, 10);
  const time = now.toISOString().slice(11, 19);

  return (
    <header className="sticky top-0 z-[1100]">
      {/* command bar */}
      <div className="border-b border-line/70 bg-abyss-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-md border border-cyber-400/35 bg-cyber-400/10 text-cyber-300 shadow-[0_0_24px_-4px_rgba(65,214,240,0.45)]">
              <IconLogo className="h-6 w-6" />
              <i className="pointer-events-none absolute inset-0 rounded-md animate-spin-slow border border-dashed border-cyber-400/25" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl font-bold leading-none tracking-[0.08em] text-mist sm:text-[22px]">
                BIO<span className="text-cyber-400">SHIELD</span>
              </p>
              <p className="mt-1.5 truncate font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-dim sm:text-[10px]">
                Ocean Biodiversity &amp; Anti-Poaching Autonomous Fleet
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 font-mono text-[11px] text-haze lg:flex">
              <IconSat className="h-4 w-4 text-cyber-400" />
              <span className="tracking-[0.12em]">SAT-7 LINK</span>
              <span className="h-1 w-1 rounded-full bg-bio-400 animate-blink" />
            </div>
            <div className="hidden text-right sm:block">
              <p className="font-mono text-[15px] font-semibold tracking-[0.12em] text-mist tnum">
                {time} <span className="text-cyber-400">UTC</span>
              </p>
              <p className="font-mono text-[10px] tracking-[0.24em] text-dim tnum">{date}</p>
            </div>
            <StatusPill />
          </div>
        </div>
      </div>

      {/* telemetry ticker */}
      <div className="overflow-hidden border-b border-line/60 bg-abyss-900/90 backdrop-blur-md">
        <div className="flex w-max animate-marquee items-center">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              aria-hidden={dup === 1}
              className="flex items-center whitespace-nowrap py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-haze"
            >
              {TICKER_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-4">{item}</span>
                  <span className="text-cyber-400/70">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
