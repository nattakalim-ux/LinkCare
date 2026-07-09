"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Goal, MilestoneStatus } from "@/lib/types";
import { updateGoal } from "@/lib/api";
import styles from "./GoalCard.module.css";

const RECOVERY_PROGRESS_DISCLAIMER =
  "Reflects functional rehabilitation progress. Does not replace clinical judgment for real-world activity clearance.";

const MILESTONE_LABEL: Record<MilestoneStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  locked: "Locked",
};

export default function GoalCard({ goal }: { goal: Goal }) {
  const router = useRouter();
  const [activeMilestoneId, setActiveMilestoneId] = useState<string | null>(null);
  const [signingOff, setSigningOff] = useState(false);

  const milestones = goal.milestones ?? [];
  const completedCount = milestones.filter((m) => m.status === "completed").length;
  const active = milestones.find((m) => m.id === activeMilestoneId);
  const lastMilestone = milestones[milestones.length - 1];

  // Final milestone must never auto-complete just because the underlying
  // data hits 100% — a therapist has to explicitly sign off on it.
  const needsSignOff =
    !!lastMilestone &&
    lastMilestone.status === "in_progress" &&
    goal.progressPercent >= 100;

  async function handleSignOff() {
    if (!lastMilestone) return;
    setSigningOff(true);
    try {
      const updatedMilestones = milestones.map((m) =>
        m.id === lastMilestone.id ? { ...m, status: "completed" as const } : m
      );
      await updateGoal(goal.id, { milestones: updatedMilestones });
      router.refresh();
    } finally {
      setSigningOff(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{goal.category}</span>
        <span className={styles.percent}>{goal.progressPercent}%</span>
      </div>
      <div className={styles.title}>{goal.title}</div>
      <div className={styles.progressLabel}>Recovery Progress</div>
      <p className={styles.disclaimer}>{RECOVERY_PROGRESS_DISCLAIMER}</p>

      {milestones.length > 0 && (
        <div className={styles.journey}>
          <div className={styles.journeyLabel}>
            Goal Journey &middot; {completedCount}/{milestones.length} milestones
            complete
          </div>

          <div className={styles.segments}>
            {milestones.map((m) => (
              <button
                key={m.id}
                type="button"
                title={m.title}
                aria-label={m.title}
                onClick={() =>
                  setActiveMilestoneId((prev) => (prev === m.id ? null : m.id))
                }
                className={`${styles.segment} ${styles[m.status]} ${
                  activeMilestoneId === m.id ? styles.segmentActive : ""
                }`}
              />
            ))}
          </div>

          {active && (
            <div className={styles.milestoneDetail}>
              <span className={styles.milestoneDetailTitle}>{active.title}</span>
              <span className={styles.milestoneDetailStatus}>
                {MILESTONE_LABEL[active.status]}
              </span>
            </div>
          )}

          {needsSignOff && (
            <div className={styles.signOff}>
              <span>Final milestone reached 100% &mdash; requires therapist sign-off.</span>
              <button
                type="button"
                onClick={handleSignOff}
                disabled={signingOff}
                className={styles.signOffButton}
              >
                {signingOff ? "Marking…" : "Mark Milestone Complete"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
