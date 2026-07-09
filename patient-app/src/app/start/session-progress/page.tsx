"use client";

import { useStartFlow } from "@/context/StartFlowContext";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Card } from "@/components/Card";
import { CheckIcon } from "@/components/icons";
import { ExerciseThumbnail } from "@/components/illustrations/ExercisePhotos";

export default function SessionProgressPage() {
  const { exercises } = useStartFlow();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-heading font-semibold text-navy">Session Progress</h1>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
          <div className="h-full w-full rounded-full bg-turquoise" />
        </div>
        <p className="mt-2 text-body text-slate">
          {exercises.length} of {exercises.length} exercises completed
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {exercises.map((exercise, i) => (
          <Card key={exercise.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ExerciseThumbnail exerciseName={exercise.name} index={i + 1} />
              <div>
                <div className="text-body font-medium text-navy">{exercise.name}</div>
                <div className="text-caption text-slate">
                  {exercise.defaultParameters.sets} sets &middot; {exercise.defaultParameters.reps} reps
                </div>
              </div>
            </div>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
              <CheckIcon size={12} />
            </span>
          </Card>
        ))}
      </div>

      <div className="mt-auto">
        <PrimaryButton href="/start/capture">Continue</PrimaryButton>
      </div>
    </div>
  );
}
