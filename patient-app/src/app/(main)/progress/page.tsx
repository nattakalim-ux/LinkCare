"use client";

import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import { GoalCard } from "@/components/GoalCard";
import { StatCard } from "@/components/StatCard";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Card } from "@/components/Card";
import { LoadingScreen, ErrorScreen } from "@/components/StatusScreens";

export default function ProgressPage() {
  const { data, error, loading } = useResource(async () => {
    const [patient, goals, sessions] = await Promise.all([
      api.getPatient(DEMO_PATIENT_ID),
      api.getGoals(DEMO_PATIENT_ID),
      api.getSessions(DEMO_PATIENT_ID),
    ]);
    return { patient, goals, sessions };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error?.message} />;

  const { patient, goals, sessions } = data;
  const primaryGoal = goals.find((g) => g.type === "primary");
  const secondaryGoals = goals.filter((g) => g.type === "secondary");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-heading font-semibold text-navy">Progress</h1>
        <p className="text-caption text-slate">Track your recovery, celebrate every step.</p>
      </div>

      <StatCard
        label="Weekly Consistency"
        value={`${patient.consistency}%`}
        caption="Your rehabilitation engagement this week"
      />

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-caption font-semibold uppercase tracking-wide text-slate">
            This Week
          </h2>
          <span className="text-body font-semibold text-turquoise">{patient.consistency}%</span>
        </div>
        <WeeklyCalendar sessions={sessions} today={new Date()} />
      </Card>

      {primaryGoal && <GoalCard primaryGoal={primaryGoal} secondaryGoals={secondaryGoals} />}
    </div>
  );
}
