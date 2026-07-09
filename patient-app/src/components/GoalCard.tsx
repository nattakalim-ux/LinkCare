"use client";

import { useState } from "react";
import type { Goal } from "@/lib/types";
import { Card } from "./Card";
import {
  TargetIcon,
  BagIcon,
  FamilyIcon,
  PeopleIcon,
  BriefcaseIcon,
  HeartIcon,
  HomeIcon,
  CheckIcon,
  StarIcon,
  ChevronDownIcon,
} from "./icons";

const CATEGORY_ICONS: Record<string, (props: { size?: number; className?: string }) => React.ReactElement> = {
  "Work & Productivity": BriefcaseIcon,
  "Daily Living": BagIcon,
  Family: FamilyIcon,
  "Social & Community": PeopleIcon,
  Independence: HomeIcon,
  "Health & Recreation": HeartIcon,
  Mobility: TargetIcon,
};

function CategoryIcon({
  category,
  size = 22,
  className,
}: {
  category: string;
  size?: number;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category] ?? TargetIcon;
  return <Icon size={size} className={className} />;
}

// Segmented bar: filled = completed, half-filled = in progress, empty = not
// yet reached. Milestone text is available on tap, not shown by default.
function GoalJourney({ milestones }: { milestones: NonNullable<Goal["milestones"]> }) {
  const [expanded, setExpanded] = useState(false);
  const hasInProgress = milestones.some((m) => m.status === "in_progress");

  return (
    <div className="mt-4 border-t border-surface pt-4">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mb-3 flex w-full items-center justify-between"
      >
        <h3 className="text-caption font-semibold uppercase tracking-wide text-slate">
          Goal Journey
        </h3>
        <span className="flex items-center gap-1 text-caption text-slate">
          {expanded ? "Hide details" : "View details"}
          <ChevronDownIcon
            size={14}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <div className="flex gap-1">
        {milestones.map((m) => {
          const isCompleted = m.status === "completed";
          const isCurrent = m.status === "in_progress";
          return (
            <div key={m.id} className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface">
              <div
                className={`h-full rounded-full ${
                  isCompleted
                    ? "w-full bg-turquoise"
                    : isCurrent
                      ? "w-1/2 bg-turquoise/50"
                      : "w-0"
                }`}
              />
            </div>
          );
        })}
      </div>

      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {milestones.map((m, i) => {
            const isCompleted = m.status === "completed";
            const isCurrent = m.status === "in_progress";
            const badgeClasses = isCompleted
              ? "bg-turquoise text-white"
              : isCurrent
                ? "border-2 border-turquoise text-turquoise"
                : "border-2 border-surface text-slate";
            return (
              <div key={m.id} className="flex items-center gap-2 text-caption">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-semibold ${badgeClasses}`}
                >
                  {isCompleted ? <CheckIcon size={10} /> : i + 1}
                </span>
                <span className="text-navy">{m.title}</span>
              </div>
            );
          })}
        </div>
      )}

      {hasInProgress && (
        <div className="mt-3 flex items-center gap-2 rounded-card bg-turquoise/8 px-3 py-2.5 text-caption text-navy">
          <StarIcon size={16} className="shrink-0 text-turquoise" />
          Keep going! You&apos;re making great progress toward your next milestone.
        </div>
      )}
    </div>
  );
}

function OtherGoals({ goals }: { goals: Goal[] }) {
  return (
    <div className="mt-4 border-t border-surface pt-4">
      <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-slate">
        Other Goals
      </h3>
      <div className="flex flex-col gap-2">
        {goals.map((goal) => (
          <div key={goal.id} className="flex items-center gap-2.5 rounded-card border border-surface p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
              <CategoryIcon category={goal.category} size={16} />
            </span>
            <span className="truncate text-xs font-medium text-navy">{goal.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GoalCard({
  primaryGoal,
  secondaryGoals,
}: {
  primaryGoal: Goal;
  secondaryGoals: Goal[];
}) {
  return (
    <Card>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
          <TargetIcon size={20} />
        </span>
        <div>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Primary Goal
          </div>
          <h2 className="text-section font-semibold text-navy">{primaryGoal.title}</h2>
        </div>
      </div>

      <div className="mb-1 flex items-center justify-between">
        <span className="text-caption font-medium uppercase tracking-wide text-slate">
          Recovery Progress
        </span>
        <span className="text-caption font-semibold text-turquoise">
          {primaryGoal.progressPercent}%
        </span>
      </div>
      <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-turquoise transition-all"
          style={{ width: `${primaryGoal.progressPercent}%` }}
        />
      </div>
      <p className="text-caption text-slate">
        Reflects functional rehabilitation progress. Does not replace clinical judgment for
        real-world activity clearance.
      </p>

      {primaryGoal.milestones && <GoalJourney milestones={primaryGoal.milestones} />}

      {secondaryGoals.length > 0 && <OtherGoals goals={secondaryGoals} />}
    </Card>
  );
}
