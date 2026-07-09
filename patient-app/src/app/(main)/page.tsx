"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import { RecoverySnapshot } from "@/components/RecoverySnapshot";
import { TodaysFocusCard } from "@/components/TodaysFocusCard";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { LoadingScreen, ErrorScreen } from "@/components/StatusScreens";
import { ChevronLeftIcon, ChevronRightIcon, SunIcon } from "@/components/icons";

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const { data, error, loading } = useResource(async () => {
    const [patient, assignments, snapshot, sessions] = await Promise.all([
      api.getPatient(DEMO_PATIENT_ID),
      api.getAssignments(DEMO_PATIENT_ID),
      api.getRecoverySnapshot(DEMO_PATIENT_ID),
      api.getSessions(DEMO_PATIENT_ID),
    ]);
    return { patient, assignment: assignments[0] ?? null, snapshot, sessions };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error?.message} />;

  const { patient, assignment, snapshot, sessions } = data;

  const today = new Date();
  const viewedDate = new Date(today);
  viewedDate.setDate(viewedDate.getDate() + weekOffset * 7);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset((v) => v - 1)}
          aria-label="Previous week"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-surface text-slate transition-colors hover:bg-surface"
        >
          <ChevronLeftIcon size={18} />
        </button>
        <span className="text-body font-semibold text-navy">
          {viewedDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setWeekOffset((v) => v + 1)}
          aria-label="Next week"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-surface text-slate transition-colors hover:bg-surface"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>

      <WeeklyCalendar sessions={sessions} today={viewedDate} />

      <div className="flex items-center justify-between rounded-card bg-gradient-to-br from-teal/10 to-dashboard-blue/10 p-4">
        <div>
          <h1 className="text-section font-semibold text-navy">
            {greeting(today.getHours())}, {patient.displayName.split(" ")[0]}.
          </h1>
          <p className="mt-1 text-body text-slate">
            Each session brings you one step closer to your goal.
          </p>
        </div>
        <SunIcon size={26} className="shrink-0 text-turquoise" />
      </div>

      {snapshot && <RecoverySnapshot snapshot={snapshot} />}

      {assignment && <TodaysFocusCard assignment={assignment} />}
    </div>
  );
}
