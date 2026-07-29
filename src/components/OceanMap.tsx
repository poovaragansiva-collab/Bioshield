import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FLEET, SECTOR, type Incident, type RiskLevel } from "../data/mock";
import { Panel, Reveal } from "./ui";

const RISK_COLOR: Record<RiskLevel, string> = {
  CRITICAL: "#ff6470",
  HIGH: "#ff6470",
  ELEVATED: "#f5b054",
  MODERATE: "#41d6f0",
  LOW: "#3ee6a4",
};

/* ---------------- custom HUD marker builders ---------------- */

const SHIP_GLYPH = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#41d6f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14.5h18l-2.3 4.4H5.3L3 14.5Z"/><path d="M6 14.5V9h12v5.5M12 9V5"/></svg>`;

const vesselIcon = () =>
  L.divIcon({
    className: "",
    html: `<div class="bs-ping" style="color:#41d6f0;width:100%;height:100%;display:grid;place-items:center;cursor:pointer">
      <div style="width:27px;height:27px;display:grid;place-items:center;background:#062030;border:1.5px solid #41d6f0;border-radius:7px;box-shadow:0 0 14px rgba(65,214,240,.55)">${SHIP_GLYPH}</div>
    </div>`,
    iconSize: [27, 27],
    iconAnchor: [13.5, 13.5],
  });

const droneIcon = () =>
  L.divIcon({
    className: "",
    html: `<div class="bs-ping" style="color:#3ee6a4;width:100%;height:100%;display:grid;place-items:center;cursor:pointer">
      <div style="width:16px;height:16px;transform:rotate(45deg);background:#04301f;border:1.5px solid #3ee6a4;border-radius:4px;box-shadow:0 0 12px rgba(62,230,164,.6)">
        <div style="position:absolute;inset:0;margin:auto;width:5px;height:5px;background:#3ee6a4;border-radius:1px"></div>
      </div>
    </div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

const incidentIcon = (color: string, selected: boolean) =>
  L.divIcon({
    className: "",
    html: `<div class="bs-ping ${selected ? "bs-ping-fast" : ""}" style="color:${color};width:100%;height:100%;display:grid;place-items:center;cursor:pointer">
      ${
        selected
          ? `<div style="position:absolute;inset:-7px;border:1.5px dashed ${color};border-radius:9999px;opacity:.8"></div>`
          : ""
      }
      <div style="width:24px;height:24px;display:grid;place-items:center;background:#2a0d14aa;background:color-mix(in srgb, ${color} 16%, #0a1420);border:1.5px solid ${color};border-radius:50% 50% 50% 4px;box-shadow:0 0 14px ${color}66">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"><path d="M12 6.5v6"/><circle cx="12" cy="16.4" r="0.6" fill="${color}"/></svg>
      </div>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

/* ---------------- fly-to controller ---------------- */

function FlyTo({ target }: { target: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(target, Math.max(map.getZoom(), 11), { duration: 1.15 });
  }, [target, map]);
  return null;
}

/* ---------------- legend ---------------- */

function Legend() {
  const row = "flex items-center gap-2";
  return (
    <div className="pointer-events-none absolute bottom-6 left-3 z-[1000] hidden rounded-md border border-line/80 bg-abyss-900/92 px-3.5 py-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-haze backdrop-blur-sm sm:block">
      <p className="mb-2 text-cyber-400">Legend</p>
      <ul className="space-y-1.5">
        <li className={row}>
          <span className="h-2.5 w-2.5 rounded-[3px] border border-cyber-400 bg-cyber-400/20" />
          Patrol vessel
        </li>
        <li className={row}>
          <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] border border-bio-400 bg-bio-400/25" />
          UAV drone
        </li>
        <li className={row}>
          <span className="h-2.5 w-2.5 rounded-full border border-crit bg-crit/25" />
          Incident
        </li>
        <li className={row}>
          <span className="h-0 w-4 border-t-2 border-dashed border-bio-400" />
          Drone route
        </li>
        <li className={row}>
          <span className="h-2.5 w-4 rounded-[2px] border border-dashed border-bio-500/70 bg-bio-500/10" />
          No-take zone
        </li>
      </ul>
    </div>
  );
}

/* ---------------- main map panel ---------------- */

export default function OceanMap({
  incidents,
  selectedId,
  onSelect,
}: {
  incidents: Incident[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const selected = incidents.find((i) => i.id === selectedId) ?? incidents[0];

  return (
    <Reveal className="h-full">
      <Panel
        index="02"
        title="Live Operations Map"
        className="h-full"
        bodyClassName="p-0"
        aside={
          <p className="font-mono text-[10px] tracking-[0.14em] text-dim tnum">
            TGT <span className="text-cyber-300">{selected.id}</span> ·{" "}
            {selected.position[0].toFixed(4)}°N {selected.position[1].toFixed(4)}°E
          </p>
        }
      >
        <div className="relative h-[420px] sm:h-[480px] lg:h-[588px]">
          <MapContainer
            center={SECTOR.center}
            zoom={SECTOR.zoom}
            zoomControl={false}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              subdomains="abcd"
              maxZoom={18}
            />
            <ZoomControl position="bottomright" />
            <FlyTo target={selected.position} />

            {/* protected no-take zone */}
            <Polygon
              positions={FLEET.protectedZone}
              pathOptions={{
                color: "#3ee6a4",
                weight: 1.3,
                dashArray: "7 9",
                fillColor: "#3ee6a4",
                fillOpacity: 0.045,
              }}
            />

            {/* threat radius around selected incident */}
            <Circle
              center={selected.position}
              radius={480}
              pathOptions={{
                color: RISK_COLOR[selected.riskLevel],
                weight: 1.2,
                dashArray: "4 7",
                fillColor: RISK_COLOR[selected.riskLevel],
                fillOpacity: 0.07,
              }}
            />

            {/* drone routes (glow underlay + animated dashes) */}
            {FLEET.droneRoutes.map((r) => (
              <Polyline
                key={r.droneId}
                positions={[r.points[0], ...r.points.slice(1)]}
                pathOptions={{ color: r.color, weight: 5, opacity: 0.12 }}
              />
            ))}
            {FLEET.droneRoutes.map((r) => (
              <Polyline
                key={r.droneId + "-anim"}
                positions={r.points}
                pathOptions={{ color: r.color, weight: 2.2, opacity: 0.95, className: "bs-route" }}
              />
            ))}

            {/* patrol vessels */}
            {FLEET.vessels.map((v) => (
              <Marker key={v.id} position={v.position} icon={vesselIcon()}>
                <Tooltip className="bs-tip" direction="top" offset={[0, -16]}>
                  {v.name} · {v.heading} · {v.speedKn} kn
                </Tooltip>
              </Marker>
            ))}

            {/* drones */}
            {FLEET.drones.map((d) => (
              <Marker key={d.id} position={d.position} icon={droneIcon()}>
                <Tooltip className="bs-tip" direction="top" offset={[0, -14]}>
                  {d.name} · BATT {d.battery}% · → {d.target}
                </Tooltip>
              </Marker>
            ))}

            {/* incidents */}
            {incidents.map((inc) => (
              <Marker
                key={inc.id}
                position={inc.position}
                icon={incidentIcon(RISK_COLOR[inc.riskLevel], inc.id === selectedId)}
                eventHandlers={{ click: () => onSelect(inc.id) }}
              >
                <Tooltip className="bs-tip" direction="top" offset={[0, -16]}>
                  {inc.id} · {inc.vesselName} · threat {inc.threatScore}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>

          {/* map chrome */}
          <div className="pointer-events-none absolute inset-0 z-[900] overflow-hidden">
            <div className="bs-scanline" />
          </div>
          <div className="pointer-events-none absolute left-3 top-3 z-[1000] flex items-center gap-2 rounded-md border border-line/80 bg-abyss-900/92 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-mist backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-crit opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-crit" />
            </span>
            LIVE TRACKING
            <span className="text-dim">·</span>
            <span className="text-haze">{SECTOR.name}</span>
          </div>
          <Legend />
        </div>
      </Panel>
    </Reveal>
  );
}
