/* ------------------------------------------------------------------ */
/*  BioShield mock telemetry — Tubbataha Reefs sector, Sulu Sea        */
/* ------------------------------------------------------------------ */

export type RiskLevel = "CRITICAL" | "HIGH" | "ELEVATED" | "MODERATE" | "LOW";
export type ApprovalState = "APPROVED" | "AWAITING" | "AUTO-CLEARED";

export interface EvidenceInfo {
  status: "VERIFIED" | "COLLECTED" | "PENDING REVIEW" | "NOT REQUIRED";
  items: number;
  sealHash: string | null;
}

export interface Incident {
  id: string;
  vesselName: string;
  vesselType: string;
  position: [number, number];
  detectedAt: string;
  threatScore: number;
  riskLevel: RiskLevel;
  decision: string;
  decidedBy: string;
  droneId: string | null;
  speedKn: number | null;
  heading: string | null;
  evidence: EvidenceInfo;
  approval: { state: ApprovalState; by?: string; at?: string };
}

export interface TimelineEvent {
  time: string;
  stage: string;
  agent: string;
  note: string;
  status: "done" | "active" | "pending";
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  latencyMs: number;
  load: number;
}

export const FLEET = {
  vessels: [
    {
      id: "PV-01",
      name: "MV Sentinel Reef",
      position: [8.9161, 119.8618] as [number, number],
      heading: "142°",
      speedKn: 12.4,
    },
    {
      id: "PV-02",
      name: "MV Blue Ranger",
      position: [8.7428, 119.9004] as [number, number],
      heading: "017°",
      speedKn: 9.1,
    },
  ],
  drones: [
    {
      id: "D-02",
      name: "Alcyone D-02",
      position: [8.7905, 119.9744] as [number, number],
      battery: 84,
      target: "INC-2214",
    },
    {
      id: "D-05",
      name: "Alcyone D-05",
      position: [8.9433, 119.8322] as [number, number],
      battery: 67,
      target: "INC-2216",
    },
    {
      id: "D-01",
      name: "Alcyone D-01",
      position: [8.8481, 119.8892] as [number, number],
      battery: 91,
      target: "PATROL K-7",
    },
  ],
  droneRoutes: [
    {
      droneId: "D-02",
      color: "#3ee6a4",
      points: [
        [8.7905, 119.9744],
        [8.8042, 119.9631],
        [8.8158, 119.9527],
        [8.8264, 119.9421],
      ] as [number, number][],
    },
    {
      droneId: "D-05",
      color: "#41d6f0",
      points: [
        [8.9433, 119.8322],
        [8.9571, 119.8208],
        [8.9655, 119.8101],
        [8.9712, 119.8043],
      ] as [number, number][],
    },
  ],
  protectedZone: [
    [9.031, 119.772],
    [9.058, 120.014],
    [8.871, 120.143],
    [8.664, 120.068],
    [8.628, 119.861],
    [8.782, 119.736],
  ] as [number, number][],
};

export const INCIDENTS: Incident[] = [
  {
    id: "INC-2214",
    vesselName: "Hai Lang 07",
    vesselType: "Steel-hull trawler · no AIS",
    position: [8.8264, 119.9421],
    detectedAt: "13:47 UTC",
    threatScore: 87,
    riskLevel: "HIGH",
    decision: "INTERCEPT & BOARD",
    decidedBy: "Conflict Resolver + Command",
    droneId: "D-02",
    speedKn: 9.4,
    heading: "231°",
    evidence: {
      status: "VERIFIED",
      items: 14,
      sealHash: "0x88f31c…e2a9d4",
    },
    approval: { state: "APPROVED", by: "Cmdr. A. Reyes", at: "14:32 UTC" },
  },
  {
    id: "INC-2216",
    vesselName: "FAD Array B-114",
    vesselType: "Illegal longline gear · drifting",
    position: [8.9712, 119.8043],
    detectedAt: "15:02 UTC",
    threatScore: 64,
    riskLevel: "ELEVATED",
    decision: "RECOVER GEAR — D-05 TAGGING",
    decidedBy: "Mission Planner",
    droneId: "D-05",
    speedKn: 1.2,
    heading: "drift NW",
    evidence: {
      status: "COLLECTED",
      items: 6,
      sealHash: "0x41b8e0…77c1f2",
    },
    approval: { state: "AWAITING" },
  },
  {
    id: "INC-2215",
    vesselName: "Skiff SR-09",
    vesselType: "Open skiff · zone boundary",
    position: [8.7088, 120.0366],
    detectedAt: "14:21 UTC",
    threatScore: 41,
    riskLevel: "MODERATE",
    decision: "CONTINUE OBSERVE — HOLD VECTOR",
    decidedBy: "Coordinator",
    droneId: "D-01",
    speedKn: 6.8,
    heading: "084°",
    evidence: {
      status: "PENDING REVIEW",
      items: 3,
      sealHash: null,
    },
    approval: { state: "AWAITING" },
  },
  {
    id: "INC-2213",
    vesselName: "MV Coral Star",
    vesselType: "Licensed fishing vessel · friendly",
    position: [8.9023, 120.0912],
    detectedAt: "11:58 UTC",
    threatScore: 12,
    riskLevel: "LOW",
    decision: "DISMISS — FRIENDLY TRAFFIC",
    decidedBy: "Vessel Agent",
    droneId: null,
    speedKn: 7.5,
    heading: "118°",
    evidence: {
      status: "NOT REQUIRED",
      items: 0,
      sealHash: null,
    },
    approval: { state: "AUTO-CLEARED", at: "12:04 UTC" },
  },
];

export const TIMELINES: Record<string, TimelineEvent[]> = {
  "INC-2214": [
    { time: "13:47:12", stage: "Acoustic contact", agent: "Acoustic Agent", note: "Hydrophone array H-3 — low-frequency diesel signature, 2.1 km NW of reef buoy.", status: "done" },
    { time: "13:48:03", stage: "Visual detection", agent: "Vision Agent", note: "EO/IR sweep confirms vessel wake track inside the no-take zone.", status: "done" },
    { time: "13:49:20", stage: "Vessel identification", agent: "Vessel Agent", note: "No AIS broadcast — dark vessel. Hull profile match 78% against watchlist.", status: "done" },
    { time: "13:51:44", stage: "Risk escalation", agent: "Coordinator", note: "Threat scored 87/100. Case elevated to HIGH, fleet consensus requested.", status: "done" },
    { time: "13:52:10", stage: "Task deconfliction", agent: "Conflict Resolver", note: "D-02 retasked from survey grid K-7; PV-01 vector adjusted to hold 800 m off.", status: "done" },
    { time: "13:55:02", stage: "Intercept mission launched", agent: "Mission Planner", note: "Route plotted — ETA 9 min, wind 14 kn NE, endurance margin 41%.", status: "done" },
    { time: "14:12:39", stage: "Evidence capture", agent: "Vision Agent", note: "14 assets sealed: deck imagery, gear ID frames, GPS-stamped 4K video.", status: "done" },
    { time: "14:16:58", stage: "Chain of custody sealed", agent: "Evidence Verification", note: "SHA-256 hashes anchored to custody ledger — block #88,213.", status: "done" },
    { time: "14:32:07", stage: "Human approval granted", agent: "Command · Cmdr. Reyes", note: "Boarding operation authorized. PV-01 RHIB launched for intercept.", status: "done" },
    { time: "14:41:55", stage: "Case filed to authorities", agent: "Coordinator", note: "Dossier packet transmitted to BFAR maritime enforcement desk.", status: "active" },
  ],
  "INC-2216": [
    { time: "15:02:41", stage: "Visual detection", agent: "Vision Agent", note: "Drifting FAD cluster with longline buoys spotted on patrol sweep.", status: "done" },
    { time: "15:04:18", stage: "Gear classification", agent: "Vision Agent", note: "Illegal commercial longline configuration — approx. 400 m line.", status: "done" },
    { time: "15:06:02", stage: "Risk scoring", agent: "Coordinator", note: "Threat 64/100 — gear loss risk to turtle migration corridor.", status: "done" },
    { time: "15:08:47", stage: "Recovery mission planned", agent: "Mission Planner", note: "D-05 dispatched for marking + recovery; PV-02 notified.", status: "done" },
    { time: "15:19:33", stage: "Evidence capture", agent: "Vision Agent", note: "6 assets: buoy serials, line run imagery, drift trajectory log.", status: "done" },
    { time: "15:23:12", stage: "Chain of custody sealed", agent: "Evidence Verification", note: "Hashes sealed — awaiting verification quorum.", status: "active" },
    { time: "—", stage: "Human approval", agent: "Command", note: "Recovery authorization pending duty officer review.", status: "pending" },
  ],
  "INC-2215": [
    { time: "14:21:09", stage: "Radar contact", agent: "Vessel Agent", note: "Small craft crossing the southern boundary at 6.8 kn.", status: "done" },
    { time: "14:23:51", stage: "Visual detection", agent: "Vision Agent", note: "Open skiff, two persons aboard, no fishing gear visible.", status: "done" },
    { time: "14:25:30", stage: "Risk scoring", agent: "Coordinator", note: "Threat 41/100 — possible scouting run, low immediate impact.", status: "done" },
    { time: "14:27:44", stage: "Observe order issued", agent: "Conflict Resolver", note: "D-01 holds shadow vector at 1.2 km; no intercept warranted.", status: "done" },
    { time: "14:36:20", stage: "Evidence capture", agent: "Vision Agent", note: "3 assets logged — imagery under review queue.", status: "active" },
    { time: "—", stage: "Verification & approval", agent: "Evidence Verification", note: "Awaiting review outcome before escalation decision.", status: "pending" },
  ],
  "INC-2213": [
    { time: "11:58:16", stage: "Acoustic contact", agent: "Acoustic Agent", note: "Engine signature east of the atoll — single screw, medium rpm.", status: "done" },
    { time: "12:00:02", stage: "Vessel identification", agent: "Vessel Agent", note: "AIS match: MV Coral Star — licensed municipal vessel, permit valid.", status: "done" },
    { time: "12:01:47", stage: "Risk scoring", agent: "Coordinator", note: "Threat 12/100 — transit corridor usage compliant.", status: "done" },
    { time: "12:03:35", stage: "Dismissal", agent: "Vessel Agent", note: "Classified friendly traffic; watchlist flag cleared automatically.", status: "done" },
    { time: "12:04:10", stage: "Auto-clear logged", agent: "Coordinator", note: "Case closed — no evidence required, audit entry sealed.", status: "done" },
  ],
};

export const AGENTS: Agent[] = [
  { id: "vision", name: "Vision Agent", role: "EO/IR + satellite classification", latencyMs: 42, load: 61 },
  { id: "acoustic", name: "Acoustic Agent", role: "Hydrophone array · 12 channels", latencyMs: 38, load: 47 },
  { id: "vessel", name: "Vessel Agent", role: "AIS + dark-vessel correlation", latencyMs: 51, load: 55 },
  { id: "conflict", name: "Conflict Resolver", role: "Task deconfliction & arbitration", latencyMs: 29, load: 23 },
  { id: "coordinator", name: "Coordinator", role: "Fleet consensus & threat scoring", latencyMs: 33, load: 40 },
  { id: "planner", name: "Mission Planner", role: "Route + endurance optimization", latencyMs: 46, load: 52 },
  { id: "evidence", name: "Evidence Verification", role: "SHA-256 seal · custody ledger", latencyMs: 57, load: 31 },
];

export const STATS = [
  {
    id: "incidents",
    label: "Total Incidents",
    value: 128,
    suffix: "",
    delta: "+9.4%",
    deltaDir: "up" as const,
    deltaNote: "vs prev 30 days",
    tone: "cyber" as const,
    spark: [6, 9, 7, 12, 10, 14, 11, 16, 13, 18, 15, 21],
    caption: "30-day detection window",
  },
  {
    id: "highrisk",
    label: "High Risk Incidents",
    value: 17,
    suffix: "",
    delta: "−22.7%",
    deltaDir: "down" as const,
    deltaNote: "vs prev 30 days",
    tone: "crit" as const,
    spark: [9, 7, 8, 6, 7, 5, 6, 4, 5, 3, 4, 2],
    caption: "threat score ≥ 75",
  },
  {
    id: "missions",
    label: "Active Missions",
    value: 6,
    suffix: "",
    delta: "+2",
    deltaDir: "up" as const,
    deltaNote: "launched today",
    tone: "cyber" as const,
    spark: [2, 3, 2, 4, 3, 5, 4, 4, 6, 5, 6, 6],
    caption: "intercept · survey · recovery",
  },
  {
    id: "evidence",
    label: "Verified Evidence",
    value: 94,
    suffix: "%",
    delta: "+3.1 pts",
    deltaDir: "up" as const,
    deltaNote: "verification rate",
    tone: "bio" as const,
    spark: [78, 80, 79, 83, 85, 84, 87, 88, 90, 89, 92, 94],
    caption: "custody ledger acceptance",
  },
];

export const TICKER_ITEMS = [
  "SAT-7 DOWNLINK LOCKED · LATENCY 412 ms",
  "ACOUSTIC ARRAY H-3 · PING 12.4 kHz · SNR 21 dB",
  "D-02 BATTERY 84% · GROUNDSPEED 31 kn",
  "SEA STATE 3 · SWELL 1.2 m · WIND NE 14 kn",
  "CUSTODY LEDGER · BLOCK #88,213 SEALED",
  "PV-01 HEADING 142° · SPEED 12.4 kn",
  "VISION MODEL v4.2 · CLASS ACCURACY 96.8%",
  "TURTLE CORRIDOR T-2 · NO ANOMALIES 6 h",
  "D-05 PAYLOAD: TAG KIT READY",
  "REEF BUOY NET · 18/18 REPORTING",
];

export const FEED_MESSAGES = [
  "Acoustic Agent · new hydrophone frame classified — biological (cetacean)",
  "Vision Agent · D-01 sweep grid K-7 complete — 0 anomalies",
  "Coordinator · consensus quorum 7/7 — heartbeat nominal",
  "Evidence Verification · block #88,214 proposal received",
  "Mission Planner · D-02 endurance recheck — margin 39%",
  "Vessel Agent · AIS delta scan — 2 dark tracks archived",
  "Conflict Resolver · task queue depth 2 — no contention",
  "Acoustic Agent · array H-1 recalibrated — drift 0.3 dB",
];

export const SECTOR = {
  name: "TUBBATAHA SECTOR · SULU SEA",
  center: [8.86, 119.94] as [number, number],
  zoom: 10,
};
