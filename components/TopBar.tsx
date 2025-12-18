"use client";

import * as React from "react";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function formatTimeMs(ms: number) {
  const safe = Math.max(0, ms);
  const totalHundredths = Math.floor(safe / 10);
  const hundredths = totalHundredths % 100;
  const totalSeconds = Math.floor(totalHundredths / 100);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  return `${pad2(minutes)}:${pad2(seconds)}:${pad2(hundredths)}`;
}

function formatDeltaSeconds(deltaMs: number) {
  const seconds = Math.round(Math.abs(deltaMs) / 1000);
  const sign = deltaMs >= 0 ? "+" : "-";
  return `${sign}${seconds}s`;
}

export function TopBar({
  timeLeftMs,
  score,
  timeDeltaMs,
}: {
  timeLeftMs: number;
  score: number;
  timeDeltaMs: number | null;
}) {
  return (
    <div className="sticky top-0 z-10 bg-[#f7f7f8]/85 backdrop-blur">
      <div className="w-full max-w-3xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between gap-6 tracking-wide text-zinc-800">
          <div className="flex items-baseline gap-3 select-none">
            <div className="font-mono tabular-nums text-2xl sm:text-3xl">
              {formatTimeMs(timeLeftMs)}
            </div>
            {timeDeltaMs !== null ? (
              <div
                className={[
                  "font-mono tabular-nums text-base sm:text-lg",
                  "transition-opacity",
                  timeDeltaMs >= 0 ? "text-emerald-700" : "text-rose-700",
                ].join(" ")}
                aria-live="polite"
              >
                {formatDeltaSeconds(timeDeltaMs)}
              </div>
            ) : null}
          </div>
          <div className="select-none text-2xl sm:text-3xl tabular-nums">
            Score: {score}
          </div>
        </div>
      </div>
    </div>
  );
}

