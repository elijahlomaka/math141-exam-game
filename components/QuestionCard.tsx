"use client";

import * as React from "react";
import type { ExamQuestion } from "@/lib/questions";

const LETTERS = ["A", "B", "C", "D"] as const;

export type FeedbackState = "correct" | "incorrect" | null;

export function QuestionCard({
  question,
  selectedIndex,
  onSelect,
  onSubmit,
  feedback,
}: {
  question: ExamQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onSubmit: () => void;
  feedback: FeedbackState;
}) {
  const disabled = feedback !== null;

  const feedbackStyles =
    feedback === "correct"
      ? "border-emerald-200 bg-emerald-50/40"
      : feedback === "incorrect"
        ? "border-rose-200 bg-rose-50/40"
        : "border-zinc-200 bg-white";

  const feedbackPill =
    feedback === "correct"
      ? "text-emerald-800 bg-emerald-100 border-emerald-200"
      : feedback === "incorrect"
        ? "text-rose-800 bg-rose-100 border-rose-200"
        : "text-zinc-600 bg-zinc-50 border-zinc-200";

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div
        className={[
          "rounded-none border shadow-sm",
          "transition-colors",
          "p-6 sm:p-7",
          feedbackStyles,
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-900">
            {question.prompt}
          </h2>
          {feedback !== null ? (
            <div
              className={[
                "shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide select-none",
                feedbackPill,
              ].join(" ")}
              aria-live="polite"
            >
              {feedback === "correct" ? "Correct" : "Incorrect"}
            </div>
          ) : null}
        </div>

        <div
          className="mt-5 grid gap-3"
          role="radiogroup"
          aria-label="Multiple choice answers"
        >
          {question.choices.map((choice, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(idx)}
                disabled={disabled}
                role="radio"
                aria-checked={isSelected}
                className={[
                  "w-full text-left rounded-none border px-4 py-3",
                  "transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/10",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  isSelected
                    ? "border-zinc-900/20 bg-zinc-50"
                    : "border-zinc-200 bg-white hover:bg-zinc-50/60",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={[
                      "mt-0.5 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center",
                      isSelected ? "border-zinc-900/35" : "border-zinc-300",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <div
                      className={[
                        "h-2.5 w-2.5 rounded-full transition-opacity",
                        isSelected ? "bg-zinc-900/70 opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-zinc-500 select-none">
                      {LETTERS[idx]}
                    </div>
                    <div className="mt-0.5 text-sm sm:text-base text-zinc-900">
                      {choice}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedIndex !== null && feedback === null ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={onSubmit}
              className={[
                "w-full rounded-none px-4 py-3",
                "bg-zinc-900 text-white",
                "shadow-sm",
                "transition-colors",
                "hover:bg-zinc-800 active:bg-zinc-900",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
              ].join(" ")}
            >
              Submit Question
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

