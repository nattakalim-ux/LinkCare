"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStartFlow } from "@/context/StartFlowContext";
import { CircularProgress } from "@/components/CircularProgress";
import { ExerciseVideo } from "@/components/ExerciseVideo";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CloseIcon, PauseIcon, PlayIcon } from "@/components/icons";

const LONG_PRESS_MS = 450;

export default function ExerciseInProgressPage() {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didHold = useRef(false);
  const {
    currentExercise,
    currentSetIndex,
    currentReps,
    incrementRep,
    fillCurrentSet,
    isSetComplete,
    isLastSet,
    isLastExercise,
    exercises,
    currentExerciseIndex,
    goToRest,
    goToNextSet,
    goToNextExercise,
  } = useStartFlow();

  const target = currentExercise.defaultParameters.reps;
  const percent = (currentReps / target) * 100;

  function handleNext() {
    if (!isLastSet) {
      const nextLabel = `Set ${currentSetIndex + 1} of ${currentExercise.defaultParameters.sets}`;
      goToRest(nextLabel, goToNextSet, "/start/exercise");
      router.push("/start/rest");
      return;
    }

    if (!isLastExercise) {
      const nextExercise = exercises[currentExerciseIndex + 1];
      goToRest(nextExercise.name, goToNextExercise, "/start/instructions");
      router.push("/start/rest");
      return;
    }

    router.push("/start/session-progress");
  }

  function handlePressStart() {
    if (isSetComplete) return;
    didHold.current = false;
    holdTimer.current = setTimeout(() => {
      didHold.current = true;
      fillCurrentSet();
    }, LONG_PRESS_MS);
  }

  function handlePressEnd() {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    if (!didHold.current && !isSetComplete) {
      incrementRep();
    }
  }

  function handlePressCancel() {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/start/instructions" aria-label="Close" className="text-slate">
          <CloseIcon size={22} />
        </Link>
        <span className="text-caption font-medium text-slate">
          Set {currentSetIndex} of {currentExercise.defaultParameters.sets}
        </span>
        <span className="w-6" />
      </div>

      <div className="text-center">
        <h1 className="text-heading font-semibold text-navy">{currentExercise.name}</h1>
        <p className="mt-1 text-body text-slate">{target} reps</p>
      </div>

      <ExerciseVideo exerciseName={currentExercise.name} className="h-72 w-full" />

      <button
        onPointerDown={handlePressStart}
        onPointerUp={handlePressEnd}
        onPointerLeave={handlePressCancel}
        onPointerCancel={handlePressCancel}
        disabled={isSetComplete}
        className="mx-auto flex flex-col items-center disabled:cursor-default"
        aria-label="Log a rep"
      >
        <CircularProgress percent={percent} size={112} strokeWidth={9}>
          <div className="text-center">
            <div className="text-section font-bold text-navy">{currentReps}</div>
            <div className="text-caption text-slate">/{target}</div>
          </div>
        </CircularProgress>
      </button>

      <p className="text-center text-body font-medium text-turquoise">
        {isSetComplete ? "Set complete, great job!" : "Tap the ring to log a rep"}
      </p>

      <div className="mt-auto flex flex-col gap-3">
        {isSetComplete ? (
          <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
        ) : (
          <PrimaryButton variant="secondary" onClick={() => setPaused((p) => !p)}>
            <span className="flex items-center gap-2">
              {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
              {paused ? "Resume" : "Pause"}
            </span>
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
