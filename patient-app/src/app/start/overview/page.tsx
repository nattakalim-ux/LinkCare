"use client";

import Link from "next/link";
import { useStartFlow } from "@/context/StartFlowContext";
import { ExerciseCard } from "@/components/ExerciseCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ChevronLeftIcon, ClockIcon, ListIcon, LightbulbIcon } from "@/components/icons";
import { ExerciseThumbnail } from "@/components/illustrations/ExercisePhotos";

export default function SessionOverviewPage() {
  const { exercises, assignment } = useStartFlow();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center">
        <Link href="/start" aria-label="Back" className="text-slate">
          <ChevronLeftIcon size={24} />
        </Link>
      </div>

      <div>
        <h1 className="text-heading font-semibold text-navy">Today&apos;s Session</h1>
        <div className="mt-2 flex items-center gap-3 text-body text-slate">
          <span className="flex items-center gap-1.5">
            <ClockIcon size={16} />
            ~{assignment.schedule.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <ListIcon size={16} />
            {exercises.length} exercises
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {exercises.map((exercise, i) => (
          <div key={exercise.id} className="flex items-start gap-3">
            <ExerciseThumbnail exerciseName={exercise.name} index={i + 1} className="mt-1" />
            <div className="flex-1">
              <ExerciseCard exercise={exercise} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-card bg-surface p-4">
        <LightbulbIcon size={18} className="mt-0.5 shrink-0 text-turquoise" />
        <div>
          <p className="mb-1 text-caption font-semibold text-navy">Tips for today</p>
          <p className="text-body text-slate">{assignment.therapistTip}</p>
        </div>
      </div>

      <div className="mt-auto">
        <PrimaryButton href="/start/instructions">Begin</PrimaryButton>
      </div>
    </div>
  );
}
