"use client";

import * as React from "react";
import Image from "next/image";
import { QUESTIONS, shuffle, type ExamQuestion } from "@/lib/questions";
import { TopBar } from "@/components/TopBar";
import { QuestionCard, type FeedbackState } from "@/components/QuestionCard";

type Screen = "start" | "playing" | "end";

const START_TIME_MS = 60_000;
const CORRECT_BONUS_MS = 15_000;
const INCORRECT_PENALTY_MS = 5_000;

const EXAM_ASSETS = {
  start: "/assets/exam/start.png",
  newQuestion: "/assets/exam/new-question.png",
  incorrect: "/assets/exam/incorrect-answer.png",
  correct: "/assets/exam/correct-answer.png",
  end: "/assets/exam/end.png",
} as const;

function BottomAsset({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-[220px] sm:h-[260px] pointer-events-none">
      <div className="h-full w-full flex items-center justify-center px-4">
        <div className="relative h-full w-full max-w-3xl">
          <Image src={src} alt={alt} fill className="object-contain" sizes="(min-width: 640px) 768px, 100vw" />
        </div>
      </div>
    </div>
  );
}

export function ExamGame() {
  const [screen, setScreen] = React.useState<Screen>("start");
  const [score, setScore] = React.useState(0);

  const [deck, setDeck] = React.useState<ExamQuestion[]>([]);
  const deckRef = React.useRef<ExamQuestion[]>([]);
  React.useEffect(() => {
    deckRef.current = deck;
  }, [deck]);
  const [deckIndex, setDeckIndex] = React.useState(0);

  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState<FeedbackState>(null);

  // Timer: store "end time" to avoid drift, and derive remaining ms from it.
  const [timeLeftMs, setTimeLeftMs] = React.useState(START_TIME_MS);
  const endAtRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [advanceTimeoutId, setAdvanceTimeoutId] = React.useState<number | null>(null);

  // UI: show a brief +/− time delta when answering.
  const [timeDeltaMs, setTimeDeltaMs] = React.useState<number | null>(null);
  const timeDeltaTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (advanceTimeoutId !== null) window.clearTimeout(advanceTimeoutId);
      if (timeDeltaTimeoutRef.current !== null) window.clearTimeout(timeDeltaTimeoutRef.current);
    };
  }, [advanceTimeoutId]);

  const currentQuestion = deck[deckIndex];

  const reshuffleDeck = React.useCallback(() => {
    const nextDeck = shuffle(QUESTIONS);
    setDeck(nextDeck);
    setDeckIndex(0);
  }, []);

  const hardResetGame = React.useCallback(() => {
    if (advanceTimeoutId !== null) window.clearTimeout(advanceTimeoutId);
    setAdvanceTimeoutId(null);
    setScore(0);
    setSelectedIndex(null);
    setFeedback(null);
    reshuffleDeck();
    setTimeLeftMs(START_TIME_MS);
    endAtRef.current = null;

    setTimeDeltaMs(null);
    if (timeDeltaTimeoutRef.current !== null) window.clearTimeout(timeDeltaTimeoutRef.current);
    timeDeltaTimeoutRef.current = null;
  }, [advanceTimeoutId, reshuffleDeck]);

  const startGame = React.useCallback(() => {
    hardResetGame();
    setScreen("playing");
    const now = performance.now();
    endAtRef.current = now + START_TIME_MS;
  }, [hardResetGame]);

  const endGame = React.useCallback(() => {
    endAtRef.current = null;
    setScreen("end");
  }, []);

  const adjustTime = React.useCallback(
    (deltaMs: number) => {
      if (endAtRef.current === null) return;
      endAtRef.current += deltaMs;
      const remaining = Math.max(0, Math.round(endAtRef.current - performance.now()));
      setTimeLeftMs(remaining);
      if (remaining <= 0) endGame();
    },
    [endGame],
  );

  const goToNextQuestion = React.useCallback(() => {
    setSelectedIndex(null);
    setFeedback(null);

    const d = deckRef.current;
    if (d.length === 0) {
      reshuffleDeck();
      return;
    }

    const nextIndex = deckIndex + 1;
    if (nextIndex < d.length) {
      setDeckIndex(nextIndex);
      return;
    }

    // Exhausted list: reshuffle and continue with fresh order.
    reshuffleDeck();
  }, [deckIndex, reshuffleDeck]);

  const submit = React.useCallback(() => {
    if (screen !== "playing") return;
    if (!currentQuestion) return;
    if (selectedIndex === null) return;
    if (feedback !== null) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    setFeedback(isCorrect ? "correct" : "incorrect");

    const deltaMs = isCorrect ? CORRECT_BONUS_MS : -INCORRECT_PENALTY_MS;
    setTimeDeltaMs(deltaMs);
    if (timeDeltaTimeoutRef.current !== null) window.clearTimeout(timeDeltaTimeoutRef.current);
    timeDeltaTimeoutRef.current = window.setTimeout(() => {
      setTimeDeltaMs(null);
      timeDeltaTimeoutRef.current = null;
    }, 900);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
    adjustTime(deltaMs);

    // Show feedback briefly, then advance.
    if (advanceTimeoutId !== null) window.clearTimeout(advanceTimeoutId);
    const id = window.setTimeout(() => {
      if (endAtRef.current === null) return; // already ended
      goToNextQuestion();
    }, 750);
    setAdvanceTimeoutId(id);
  }, [
    screen,
    currentQuestion,
    selectedIndex,
    feedback,
    adjustTime,
    goToNextQuestion,
    advanceTimeoutId,
  ]);

  // Timer loop (requestAnimationFrame) while playing
  React.useEffect(() => {
    if (screen !== "playing") {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const tick = () => {
      if (endAtRef.current === null) return;
      const remaining = Math.max(0, Math.round(endAtRef.current - performance.now()));
      setTimeLeftMs(remaining);
      if (remaining <= 0) {
        endGame();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [screen, endGame]);

  // Ensure we have a deck ready when entering play.
  React.useEffect(() => {
    if (screen === "playing" && deckRef.current.length === 0) {
      reshuffleDeck();
    }
  }, [screen, reshuffleDeck]);

  const bottomAssetSrc =
    screen === "start"
      ? EXAM_ASSETS.start
      : screen === "end"
        ? EXAM_ASSETS.end
        : feedback === "correct"
          ? EXAM_ASSETS.correct
          : feedback === "incorrect"
            ? EXAM_ASSETS.incorrect
            : EXAM_ASSETS.newQuestion;

  const bottomAssetAlt =
    screen === "start"
      ? "Start"
      : screen === "end"
        ? "End"
        : feedback === "correct"
          ? "Correct answer"
          : feedback === "incorrect"
            ? "Incorrect answer"
            : "New question";

  return (
    <main className="min-h-dvh flex flex-col pb-[220px] sm:pb-[260px]">
      {screen === "start" ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-xl">
            <div className="rounded-none border border-zinc-200 bg-white shadow-sm p-8 sm:p-10 text-center">
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
                MATH 141: Exam Challenge
              </div>
              <div className="mt-3 text-sm sm:text-base text-zinc-600">
                You have 60 seconds. Answer correctly to gain time. Mistakes will cost you valuable seconds.
              </div>
              <button
                type="button"
                onClick={startGame}
                className={[
                  "mt-7 w-full rounded-none px-4 py-3",
                  "bg-zinc-900 text-white",
                  "shadow-sm",
                  "transition-colors",
                  "hover:bg-zinc-800 active:bg-zinc-900",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
                ].join(" ")}
              >
                Begin Your Exam
              </button>
            </div>

            <div className="mt-5 text-center text-xs text-zinc-500">
              <div>MATH 141 Final Project - San Diego Mesa College</div>
              <div>Created by Elijah Bilokur, December 2025</div>
            </div>
          </div>
        </div>
      ) : screen === "end" ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-xl rounded-none border border-zinc-200 bg-white shadow-sm p-8 sm:p-10 text-center">
            <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              Time’s Up
            </div>
            <div className="mt-4 text-zinc-700">Final score</div>
            <div className="mt-1 text-5xl font-semibold tracking-tight text-zinc-900 tabular-nums">
              {score}
            </div>
            <button
              type="button"
              onClick={() => {
                hardResetGame();
                setScreen("start");
              }}
              className={[
                "mt-7 w-full rounded-none px-4 py-3",
                "bg-zinc-900 text-white",
                "shadow-sm",
                "transition-colors",
                "hover:bg-zinc-800 active:bg-zinc-900",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20",
              ].join(" ")}
            >
              Retake the Exam
            </button>
          </div>
        </div>
      ) : (
        <>
          <TopBar timeLeftMs={timeLeftMs} score={score} timeDeltaMs={timeDeltaMs} />
          {currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              selectedIndex={selectedIndex}
              feedback={feedback}
              onSelect={(idx) => setSelectedIndex(idx)}
              onSubmit={submit}
            />
          ) : (
            <div className="w-full max-w-3xl mx-auto px-4 pb-10">
              <div className="rounded-none border border-zinc-200 bg-white shadow-sm p-6 text-zinc-700">
                Loading question…
              </div>
            </div>
          )}
        </>
      )}

      <BottomAsset src={bottomAssetSrc} alt={bottomAssetAlt} />
    </main>
  );
}
