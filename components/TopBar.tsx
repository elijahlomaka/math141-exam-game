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

export function TopBar({ timeLeftMs, score }: { timeLeftMs: number; score: number }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between text-sm tracking-wide text-zinc-700">
        <div className="font-mono tabular-nums select-none">
          {formatTimeMs(timeLeftMs)}
        </div>
        <div className="select-none">Score: {score}</div>
      </div>
    </div>
  );
}

