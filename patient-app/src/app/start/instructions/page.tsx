"use client";

import Link from "next/link";
import { useStartFlow } from "@/context/StartFlowContext";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ChevronLeftIcon } from "@/components/icons";
import { ExercisePhoto } from "@/components/illustrations/ExercisePhotos";

export default function ExerciseInstructionsPage() {
  const { currentExercise, currentExerciseIndex, exercises } = useStartFlow();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/start/overview" aria-label="Back" className="text-slate">
          <ChevronLeftIcon size={24} />
        </Link>
        <span className="text-caption font-medium text-slate">
          {currentExerciseIndex + 1} / {exercises.length}
        </span>
        <span className="w-6" />
      </div>

      <div>
        <h1 className="text-heading font-semibold text-navy">{currentExercise.name}</h1>
        <div className="mt-1 flex items-center gap-3 text-body text-slate">
          <span>{currentExercise.defaultParameters.sets} sets</span>
          <span aria-hidden>&middot;</span>
          <span>{currentExercise.defaultParameters.reps} reps</span>
        </div>
      </div>

      <ExercisePhoto exerciseName={currentExercise.name} className="h-64 w-full" />

      <div>
        <p className="mb-2 text-body font-semibold text-turquoise">How to do it</p>
        <ol className="list-decimal space-y-2 pl-5 text-body text-navy">
          {currentExercise.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="mt-auto">
        <PrimaryButton href="/start/exercise">Start exercise</PrimaryButton>
      </div>
    </div>
  );
}
