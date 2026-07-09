"use client";

import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import { useStartFlow } from "@/context/StartFlowContext";
import { RecoverySnapshot } from "@/components/RecoverySnapshot";
import { PrimaryButton } from "@/components/PrimaryButton";
import { LoadingScreen } from "@/components/StatusScreens";
import { CheckIcon, ClockIcon, ListIcon, RepsIcon } from "@/components/icons";

const REFLECTION_COPY: Record<string, string> = {
  definitely: "You told us you feel closer to your goal today. Keep that momentum going.",
  a_little: "Every small step counts. You're building toward your goal.",
  not_yet: "Recovery isn't always linear. Tomorrow is another chance to move forward.",
};

export default function SessionCompletePage() {
  const { primaryGoal, totalMinutes, exercises, totalReps, capture } = useStartFlow();

  const { data: snapshot, loading } = useResource(
    () => api.getRecoverySnapshot(DEMO_PATIENT_ID),
    []
  );

  if (loading) return <LoadingScreen />;

  const reflection = capture.goalReflection
    ? REFLECTION_COPY[capture.goalReflection]
    : "Great work showing up for your recovery today.";

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal to-dashboard-blue text-white shadow-lg shadow-turquoise/25">
          <CheckIcon size={36} />
        </div>
        <h1 className="text-heading font-semibold text-navy">Great work!</h1>
        <p className="text-body text-slate">You completed today&apos;s session.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-card bg-surface p-3">
          <ClockIcon size={18} className="mx-auto mb-1 text-turquoise" />
          <div className="text-section font-semibold text-navy">{totalMinutes}</div>
          <div className="text-caption text-slate">Minutes</div>
        </div>
        <div className="rounded-card bg-surface p-3">
          <ListIcon size={18} className="mx-auto mb-1 text-turquoise" />
          <div className="text-section font-semibold text-navy">{exercises.length}</div>
          <div className="text-caption text-slate">Exercises</div>
        </div>
        <div className="rounded-card bg-surface p-3">
          <RepsIcon size={18} className="mx-auto mb-1 text-turquoise" />
          <div className="text-section font-semibold text-navy">{totalReps}</div>
          <div className="text-caption text-slate">Total reps</div>
        </div>
      </div>

      {snapshot && <RecoverySnapshot snapshot={snapshot} />}

      {primaryGoal && (
        <div className="rounded-card bg-gradient-to-br from-teal/10 to-dashboard-blue/10 p-4">
          <p className="text-caption font-medium uppercase tracking-wide text-slate">
            Primary Goal
          </p>
          <p className="mb-2 text-body font-semibold text-navy">{primaryGoal.title}</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-turquoise"
              style={{ width: `${primaryGoal.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <p className="text-center text-body text-navy">{reflection}</p>

      <div className="mt-auto">
        <PrimaryButton href="/">Return home</PrimaryButton>
      </div>
    </div>
  );
}
