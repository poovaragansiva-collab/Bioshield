import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

/* Brand mark — shield cut by sonar waves */
export const IconLogo = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.5 4.5 5.4v6.1c0 4.6 3.1 8 7.5 9.9 4.4-1.9 7.5-5.3 7.5-9.9V5.4L12 2.5Z" />
    <path d="M7.6 12.2c1.4-1.4 3-1.4 4.4 0s3 1.4 4.4 0" />
    <path d="M9 15.3c1-.9 2-.9 3 0s2 .9 3 0" />
    <circle cx="12" cy="8.6" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);

export const IconRadar = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4.6" strokeDasharray="2.4 2.8" />
    <path d="M12 12 18.4 5.8" />
    <circle cx="15" cy="14.6" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="8.6" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconAlert = (p: P) => (
  <svg {...base(p)}>
    <path d="M10.5 4.1 2.9 17.3c-.7 1.2.2 2.7 1.5 2.7h15.2c1.3 0 2.2-1.5 1.5-2.7L13.5 4.1c-.7-1.2-2.3-1.2-3 0Z" />
    <path d="M12 9.4v4.2" />
    <circle cx="12" cy="16.6" r="0.5" fill="currentColor" stroke="none" strokeWidth="1" />
  </svg>
);

export const IconCrosshair = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="7.2" />
    <path d="M12 2.8v3.4M12 17.8v3.4M2.8 12h3.4M17.8 12h3.4" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSeal = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="10" r="6.4" />
    <path d="m9.6 10 1.7 1.7 3.2-3.4" />
    <path d="m8.2 15.4-1.7 5 3.6-1.6 1.9 1.9 1.9-1.9 3.6 1.6-1.7-5" />
  </svg>
);

export const IconShip = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 14.5h17l-2.1 4.2c-.3.7-1 1.1-1.8 1.1H7.4c-.8 0-1.5-.4-1.8-1.1L3.5 14.5Z" />
    <path d="M6 14.5V9.8h12v4.7" />
    <path d="M9.5 9.8V6.5h5v3.3M12 6.5V4.2" />
    <path d="M2.5 21.6c1.6 1 3.2 1 4.8 0s3.1-1 4.7 0 3.2 1 4.8 0 3.1-1 4.7 0" opacity="0.55" />
  </svg>
);

export const IconDrone = (p: P) => (
  <svg {...base(p)}>
    <circle cx="5.4" cy="5.4" r="2.5" />
    <circle cx="18.6" cy="5.4" r="2.5" />
    <circle cx="5.4" cy="18.6" r="2.5" />
    <circle cx="18.6" cy="18.6" r="2.5" />
    <rect x="9.4" y="9.4" width="5.2" height="5.2" rx="1.2" />
    <path d="m7.2 7.2 2.2 2.2M16.8 7.2l-2.2 2.2M7.2 16.8l2.2-2.2M16.8 16.8l-2.2-2.2" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="2.8" />
    <circle cx="13" cy="11" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const IconWave = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.8 12h2.1l1.7-4.6 2.6 8.8 2.4-11 2.5 13 2.2-8.4 1.4 2.2h3.5" />
  </svg>
);

export const IconHelm = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="6.2" />
    <circle cx="12" cy="12" r="2.2" />
    <path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2M5.4 5.4l2.2 2.2M16.4 16.4l2.2 2.2M18.6 5.4l-2.2 2.2M7.6 16.4l-2.2 2.2" />
  </svg>
);

export const IconScales = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4.4v15.2M8 19.6h8" />
    <path d="M5.4 7.2h13.2" />
    <path d="m5.4 7.2-2.6 5.6c.6 1.3 2.1 2.2 3.8 2.2s3.2-.9 3.8-2.2L7.8 7.2" transform="translate(-1.4 0)" />
    <path d="m16.2 7.2-2.6 5.6c.6 1.3 2.1 2.2 3.8 2.2s3.2-.9 3.8-2.2L18.6 7.2" transform="translate(1.4 0)" />
  </svg>
);

export const IconHub = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="2.6" />
    <circle cx="12" cy="4.2" r="1.8" />
    <circle cx="19.4" cy="16.2" r="1.8" />
    <circle cx="4.6" cy="16.2" r="1.8" />
    <path d="M12 6v3.4M13.9 13.4l3.9 1.9M10.1 13.4l-3.9 1.9" />
  </svg>
);

export const IconRoute = (p: P) => (
  <svg {...base(p)}>
    <circle cx="5.2" cy="18.8" r="2.2" />
    <circle cx="18.8" cy="5.2" r="2.2" />
    <path d="M7.4 18.8h7.4a3.4 3.4 0 0 0 0-6.8H9.2a3.4 3.4 0 0 1 0-6.8h7.4" strokeDasharray="3.2 2.6" />
  </svg>
);

export const IconFingerprint = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 5.1A8 8 0 0 1 20 12c0 2.4-.3 4.6-.9 6.5" />
    <path d="M4.6 8.6A8 8 0 0 0 4 12c0 3 .6 5.6 1.7 7.6" />
    <path d="M12 8a4 4 0 0 0-4 4c0 2.7.4 5 1.2 6.9" />
    <path d="M12 12c0 3.2.5 5.9 1.5 8" />
    <path d="M16 12.6c0 2.2-.2 4.3-.6 6.1" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
  </svg>
);

export const IconSat = (p: P) => (
  <svg {...base(p)}>
    <rect x="9.2" y="9.2" width="5.6" height="5.6" rx="1" transform="rotate(45 12 12)" />
    <path d="m5.6 8.4 4-4M14.4 19.6l4-4" />
    <rect x="2.6" y="4" width="4.6" height="3" rx="0.8" transform="rotate(-45 4.9 5.5)" />
    <rect x="16.8" y="17" width="4.6" height="3" rx="0.8" transform="rotate(-45 19.1 18.5)" />
    <path d="M8.4 15.6a5 5 0 0 1-2.9-2.9M6.2 19.4a9 9 0 0 1-1.6-1.6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);

export const IconArrowUp = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5.5 12.5 12 19l6.5-6.5" />
  </svg>
);

export const IconHash = (p: P) => (
  <svg {...base(p)}>
    <path d="M9.2 3.6 7.6 20.4M16.4 3.6l-1.6 16.8M4.4 8.6h16M3.6 15.4h16" />
  </svg>
);

export const IconStamp = (p: P) => (
  <svg {...base(p)}>
    <path d="M9.4 10.6c.9-1.2 1.4-2.6 1.4-4.2A1.9 1.9 0 0 1 12 4.5a1.9 1.9 0 0 1 1.2 1.9c0 1.6.5 3 1.4 4.2l1.2 1.7H8.2l1.2-1.7Z" />
    <path d="M5.4 16.4a2 2 0 0 1 2-2h9.2a2 2 0 0 1 2 2v1.4H5.4v-1.4Z" />
    <path d="M5 20.5h14" />
  </svg>
);

export const IconCompass = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z" />
  </svg>
);
