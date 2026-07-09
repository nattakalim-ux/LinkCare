"use client";

import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import type { Session } from "@/lib/types";
import { Card } from "@/components/Card";
import { StatCard } from "@/components/StatCard";
import { LoadingScreen, ErrorScreen } from "@/components/StatusScreens";
import { EmptyStateIllustration } from "@/components/illustrations/EmptyStateIllustration";
import {
  CheckIcon,
  FlameIcon,
  ClockIcon,
  TrendingUpIcon,
  ChevronDownIcon,
} from "@/components/icons";

type Filter = "all" | "completed" | "not_completed";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "not_completed", label: "Not Recorded" },
];

const DIFFICULTY_EMOJI: Record<string, string> = {
  easy: "😊",
  moderate: "😐",
  hard: "☹️",
};

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString(undefined, { month: "short" }),
  };
}

function longestStreak(sessions: Session[]) {
  const sorted = [...sessions].sort((a, b) => (a.date < b.date ? -1 : 1));
  let best = 0;
  let current = 0;
  for (const s of sorted) {
    if (s.status === "completed") {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}

function SessionRow({ session }: { session: Session }) {
  const [open, setOpen] = useState(false);
  const isCompleted = session.status === "completed";
  const { weekday, day, month } = formatDate(session.date);

  return (
    <div className="flex gap-3">
      <div className="flex w-9 shrink-0 flex-col items-center pt-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full text-caption ${
            isCompleted ? "bg-success text-white" : "border-2 border-surface"
          }`}
        >
          {isCompleted && <CheckIcon size={12} />}
        </div>
        <div className="mt-1 w-px flex-1 bg-surface" />
      </div>

      <Card className="mb-3 flex-1 !p-0">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
        >
          <div className="w-14 shrink-0 text-center">
            <div className="text-caption text-slate">{weekday}</div>
            <div className="text-section font-semibold text-navy">{day}</div>
            <div className="text-caption text-slate">{month}</div>
          </div>

          <div className="flex-1">
            <div className="text-body font-semibold text-navy">
              {isCompleted ? "Completed" : "No session recorded"}
            </div>
            {isCompleted ? (
              <div className="mt-1 flex items-center gap-3 text-caption text-slate">
                <span>{session.durationMinutes} min</span>
                <span>{session.exerciseCount} exercises</span>
                {session.difficulty && (
                  <span>
                    {DIFFICULTY_EMOJI[session.difficulty]} {session.difficulty}
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-1 text-caption text-slate">
                Take care of yourself. We&apos;re here whenever you&apos;re ready.
              </p>
            )}
          </div>

          <ChevronDownIcon
            size={18}
            className={`shrink-0 text-slate transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && isCompleted && (
          <div className="space-y-2 border-t border-surface px-4 py-3 text-body text-navy">
            <div className="flex justify-between">
              <span className="text-slate">Pain</span>
              <span>{session.painScore}/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate">Fatigue</span>
              <span>{session.fatigueScore}/10</span>
            </div>
            {session.barriers.length > 0 && (
              <div className="flex justify-between">
                <span className="text-slate">Barriers</span>
                <span>{session.barriers.join(", ")}</span>
              </div>
            )}
            {session.noteToTherapist && (
              <div>
                <span className="text-slate">Note</span>
                <p className="mt-1">{session.noteToTherapist}</p>
              </div>
            )}
          </div>
        )}

        {open && !isCompleted && session.barriers.length > 0 && (
          <div className="border-t border-surface px-4 py-3 text-body text-navy">
            <span className="text-slate">Reason: </span>
            {session.barriers.join(", ")}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const { data, error, loading } = useResource(async () => {
    const [sessions, patient] = await Promise.all([
      api.getSessions(DEMO_PATIENT_ID),
      api.getPatient(DEMO_PATIENT_ID),
    ]);
    return { sessions, patient };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const sorted = [...data.sessions].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (filter === "all") return sorted;
    return sorted.filter((s) => s.status === filter);
  }, [data, filter]);

  const stats = useMemo(() => {
    if (!data) return null;
    const completed = data.sessions.filter((s) => s.status === "completed");
    const totalMinutes = completed.reduce((sum, s) => sum + s.durationMinutes, 0);
    return {
      sessionsCompleted: completed.length,
      bestStreak: longestStreak(data.sessions),
      hoursInvested: Math.round((totalMinutes / 60) * 10) / 10,
      consistency: data.patient.consistency,
    };
  }, [data]);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error?.message} />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-heading font-semibold text-navy">Recovery Journal</h1>
        <p className="text-caption text-slate">Your recovery journey, one day at a time.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Sessions Completed"
            value={`${stats.sessionsCompleted}`}
            icon={<CheckIcon size={14} />}
          />
          <StatCard
            label="Best Streak"
            value={`${stats.bestStreak}d`}
            icon={<FlameIcon size={14} />}
          />
          <StatCard
            label="Hours Invested"
            value={`${stats.hoursInvested}`}
            icon={<ClockIcon size={14} />}
          />
          <StatCard
            label="Consistency"
            value={`${stats.consistency}%`}
            icon={<TrendingUpIcon size={14} />}
          />
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-caption font-medium transition-colors ${
              filter === f.value ? "bg-turquoise text-white" : "bg-surface text-navy"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {filtered.map((session) => (
          <SessionRow key={session.id ?? session.date} session={session} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-8">
            <EmptyStateIllustration className="h-20 w-20" />
            <p className="text-center text-body text-slate">No sessions to show.</p>
          </div>
        )}
      </div>
    </div>
  );
}
