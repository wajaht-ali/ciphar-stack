"use client";

import type { Mode } from "@/types";

export function ConnectorArrow({ mode }: { mode: Mode }) {
  const stroke = mode === "encrypt" ? "#2DD4BF" : "#FBBF24";
  return (
    <div
      aria-hidden
      className="flex items-center justify-center"
      style={{ height: 32 }}
    >
      <svg
        width="24"
        height="32"
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="24"
          stroke={stroke}
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 22 L12 30 L18 22"
          stroke={stroke}
          strokeOpacity="0.85"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
