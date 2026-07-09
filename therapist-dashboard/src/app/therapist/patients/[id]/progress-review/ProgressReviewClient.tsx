"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BODY_PARTS,
  type BodyPart,
  type Goal,
  type Patient,
  type RecoverySnapshot,
  type Session,
  type Therapist,
} from "@/lib/types";
import { updatePatient, updateRecoverySnapshot } from "@/lib/api";
import Avatar from "@/components/Avatar";
import AttentionBadge from "@/components/AttentionBadge";
import GoalCard from "@/components/GoalCard";
import TherapistUpdateCard from "@/components/TherapistUpdateCard";
import LineChart from "@/components/LineChart";
import styles from "./page.module.css";

const LABEL: Record<BodyPart, string> = {
  shoulder: "Shoulder",
  elbow: "Elbow",
  hand: "Hand",
  fingers: "Fingers",
};

const REFLECTION_SCORE: Record<string, number> = {
  definitely: 100,
  a_little: 60,
  not_yet: 20,
};

const ASSESSMENT_TYPES = [
  "Grip Test/Dynamometer",
  "FMA-UE",
  "ARAT",
  "Box and Block Test",
  "Nine Hole Peg Test",
] as const;
type AssessmentType = (typeof ASSESSMENT_TYPES)[number];

// DRAFT mapping — flagged for clinical validation before this is finalized.
// ARAT has no mapping yet; applying it is blocked until one is defined.
const ASSESSMENT_BODY_PARTS: Record<AssessmentType, BodyPart[]> = {
  "Grip Test/Dynamometer": ["hand"],
  "FMA-UE": ["shoulder", "elbow", "hand"],
  ARAT: [],
  "Box and Block Test": ["hand", "fingers"],
  "Nine Hole Peg Test": ["fingers"],
};

// Standardized max score for assessments that have one (used to convert a
// raw score into a percentage, and to label the entry as "score/max").
// Grip Test/Dynamometer, Box and Block Test, and Nine Hole Peg Test have no
// fixed ceiling (kg / block count / seconds) — those are entered and shown
// as a raw score, still applied directly as a % until this is clinically
// validated.
const ASSESSMENT_MAX: Partial<Record<AssessmentType, number>> = {
  "FMA-UE": 66,
  ARAT: 57,
};

const ASSESSMENT_SCORE_HINT: Record<AssessmentType, string> = {
  "Grip Test/Dynamometer": "Score (kg)",
  "FMA-UE": "Score (out of 66)",
  ARAT: "Score (out of 57)",
  "Box and Block Test": "Score (blocks moved in 1 min)",
  "Nine Hole Peg Test": "Score (seconds to complete)",
};

function formatScore(type: AssessmentType, rawScore: number) {
  const max = ASSESSMENT_MAX[type];
  return max ? `${rawScore}/${max}` : `${rawScore}`;
}

interface AppliedAssessment {
  id: string;
  type: AssessmentType;
  rawScore: number;
  percent: number;
  parts: BodyPart[];
}

function round(n: number) {
  return Math.round(n);
}

export default function ProgressReviewClient({
  patient,
  snapshot,
  sessions,
  primaryGoal,
  reviewer,
}: {
  patient: Patient;
  snapshot: RecoverySnapshot;
  sessions: Session[];
  primaryGoal?: Goal;
  reviewer?: Therapist;
}) {
  const router = useRouter();

  const exerciseCompletion = useMemo(() => {
    if (sessions.length === 0) return 0;
    const completed = sessions.filter((s) => s.status === "completed").length;
    return round((completed / sessions.length) * 100);
  }, [sessions]);

  const checkIns = useMemo(() => {
    const reflected = sessions.filter(
      (s) => s.status === "completed" && s.goalReflection
    );
    if (reflected.length === 0) return 0;
    const total = reflected.reduce(
      (sum, s) => sum + REFLECTION_SCORE[s.goalReflection as string],
      0
    );
    return round(total / reflected.length);
  }, [sessions]);

  const consistency = patient.consistency;

  // Functional Assessment values are only ever set by a real Add Assessment
  // entry — never dragged. Before any assessment is entered, a body part's
  // Functional Assessment defaults to its current recorded level (no change
  // implied), and that is visibly labeled as "baseline", not a real reading.
  const [assessment, setAssessment] = useState<Record<BodyPart, number>>(() => {
    const initial: Record<BodyPart, number> = {} as Record<BodyPart, number>;
    for (const part of BODY_PARTS) initial[part] = snapshot[part].progressPercent;
    return initial;
  });
  const [assessmentSource, setAssessmentSource] = useState<
    Record<BodyPart, { type: AssessmentType; rawScore: number } | null>
  >(() => {
    const initial: Record<
      BodyPart,
      { type: AssessmentType; rawScore: number } | null
    > = {} as Record<BodyPart, { type: AssessmentType; rawScore: number } | null>;
    for (const part of BODY_PARTS) initial[part] = null;
    return initial;
  });

  const suggested = useMemo(() => {
    const result: Record<BodyPart, number> = {} as Record<BodyPart, number>;
    for (const part of BODY_PARTS) {
      const value =
        assessment[part] * 0.5 +
        exerciseCompletion * 0.2 +
        checkIns * 0.15 +
        consistency * 0.15;
      result[part] = Math.max(0, Math.min(100, round(value)));
    }
    return result;
  }, [assessment, exerciseCompletion, checkIns, consistency]);

  // Manual overrides of the Suggested Target column, per body part. Kept
  // partial so applying a new assessment only replaces the parts it maps
  // to, without discarding overrides the therapist made on other parts.
  const [edited, setEdited] = useState<Partial<Record<BodyPart, number>>>({});
  const displayValues = useMemo(() => {
    const result: Record<BodyPart, number> = {} as Record<BodyPart, number>;
    for (const part of BODY_PARTS) result[part] = edited[part] ?? suggested[part];
    return result;
  }, [edited, suggested]);

  const [updateMessage, setUpdateMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [approved, setApproved] = useState(false);

  const [addingAssessment, setAddingAssessment] = useState(false);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>(
    ASSESSMENT_TYPES[0]
  );
  const [assessmentScore, setAssessmentScore] = useState("");
  const [appliedAssessments, setAppliedAssessments] = useState<AppliedAssessment[]>(
    []
  );

  function step(part: BodyPart, delta: number) {
    setEdited((prev) => ({
      ...prev,
      [part]: Math.max(0, Math.min(100, displayValues[part] + delta)),
    }));
  }

  function applyAssessment() {
    const parts = ASSESSMENT_BODY_PARTS[assessmentType];
    if (parts.length === 0) return;
    const rawScore = Number(assessmentScore);
    if (Number.isNaN(rawScore)) return;

    const max = ASSESSMENT_MAX[assessmentType];
    const percent = max
      ? Math.max(0, Math.min(100, round((rawScore / max) * 100)))
      : Math.max(0, Math.min(100, round(rawScore)));

    setAssessment((prev) => {
      const next = { ...prev };
      for (const part of parts) next[part] = percent;
      return next;
    });
    setAssessmentSource((prev) => {
      const next = { ...prev };
      for (const part of parts) next[part] = { type: assessmentType, rawScore };
      return next;
    });
    // Clear any manual Suggested Target override only for the affected
    // parts, so the freshly computed suggestion is what's shown — other
    // body parts' overrides are left alone.
    setEdited((prev) => {
      const next = { ...prev };
      for (const part of parts) delete next[part];
      return next;
    });
    setAppliedAssessments((prev) => [
      ...prev,
      {
        id: `${assessmentType}-${Date.now()}`,
        type: assessmentType,
        rawScore,
        percent,
        parts,
      },
    ]);
    setAssessmentScore("");
    setAddingAssessment(false);
  }

  async function handleApprove() {
    setSaving(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const body: Partial<RecoverySnapshot> = { lastUpdated: today };
      for (const part of BODY_PARTS) {
        const newValue = displayValues[part];
        body[part] = {
          progressPercent: newValue,
          trendPercent: newValue - snapshot[part].progressPercent,
        };
      }
      const existingHistory = snapshot.history.filter((h) => h.date !== today);
      body.history = [
        ...existingHistory,
        {
          date: today,
          shoulder: displayValues.shoulder,
          elbow: displayValues.elbow,
          hand: displayValues.hand,
          fingers: displayValues.fingers,
        },
      ].sort((a, b) => a.date.localeCompare(b.date));
      await updateRecoverySnapshot(patient.id, body);

      if (updateMessage.trim()) {
        await updatePatient(patient.id, {
          latestUpdate: {
            date: today,
            therapistId: reviewer?.id ?? patient.assignedPT,
            message: updateMessage.trim(),
          },
        });
      }

      setApproved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href={`/therapist/patients/${patient.id}`} className={styles.backLink}>
          &larr; Back to Patient
        </Link>
        <h1 className={styles.heading}>Progress Review</h1>
        <p className={styles.subheading}>
          Review patient progress and adjust targets as needed.
        </p>
      </div>

      <div className={styles.patientRow}>
        <Avatar name={patient.displayName} size={56} />
        <div>
          <div className={styles.patientName}>
            {patient.displayName} <AttentionBadge status={patient.attentionStatus} />
          </div>
          <div className={styles.patientMeta}>
            {patient.age} yo &middot; {patient.occupation} &middot; {patient.location}
            &middot; Injury: {patient.stroke.timeSinceStrokeMonths} months ago
          </div>
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.main}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Recovery Snapshot</div>

            <div className={styles.driversStrip}>
              <span>
                Exercise Completion <strong>{exerciseCompletion}%</strong>{" "}
                <em>(20%)</em>
              </span>
              <span>
                Patient Check-ins <strong>{checkIns}%</strong> <em>(15%)</em>
              </span>
              <span>
                Weekly Consistency <strong>{consistency}%</strong> <em>(15%)</em>
              </span>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Body Part</th>
                  <th>Current</th>
                  <th>Functional Assessment (50%)</th>
                  <th>Suggested Target</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {BODY_PARTS.map((part) => {
                  const change = displayValues[part] - snapshot[part].progressPercent;
                  return (
                    <tr key={part}>
                      <td className={styles.partLabel}>{LABEL[part]}</td>
                      <td>{snapshot[part].progressPercent}%</td>
                      <td>
                        <span className={styles.assessmentValue}>
                          {assessment[part]}%
                        </span>
                        <div className={styles.assessmentSourceNote}>
                          {assessmentSource[part]
                            ? `${assessmentSource[part]!.type}: ${formatScore(
                                assessmentSource[part]!.type,
                                assessmentSource[part]!.rawScore
                              )}`
                            : "baseline — no assessment entered"}
                        </div>
                      </td>
                      <td>
                        <div className={styles.stepper}>
                          <button
                            type="button"
                            onClick={() => step(part, -1)}
                            aria-label={`Decrease ${LABEL[part]} target`}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={displayValues[part]}
                            onChange={(e) =>
                              setEdited((prev) => ({
                                ...prev,
                                [part]: Math.max(
                                  0,
                                  Math.min(100, Number(e.target.value))
                                ),
                              }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() => step(part, 1)}
                            aria-label={`Increase ${LABEL[part]} target`}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td
                        className={change >= 0 ? styles.changeUp : styles.changeDown}
                      >
                        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.card}>
            <div className={styles.assessmentHeader}>
              <div className={styles.cardTitle}>Add Assessment</div>
              {!addingAssessment && (
                <button
                  type="button"
                  className={styles.addAssessmentButton}
                  onClick={() => setAddingAssessment(true)}
                >
                  + Add Assessment
                </button>
              )}
            </div>

            {addingAssessment && (
              <div className={styles.assessmentForm}>
                <label className={styles.assessmentField}>
                  Assessment
                  <select
                    value={assessmentType}
                    onChange={(e) =>
                      setAssessmentType(e.target.value as AssessmentType)
                    }
                  >
                    {ASSESSMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                {ASSESSMENT_BODY_PARTS[assessmentType].length === 0 ? (
                  <p className={styles.assessmentWarning}>
                    No body-part mapping is defined for {assessmentType} yet — this
                    needs clinical validation before it can update the Recovery
                    Snapshot. Choose a different assessment for now.
                  </p>
                ) : (
                  <>
                    <label className={styles.assessmentField}>
                      {ASSESSMENT_SCORE_HINT[assessmentType]}
                      <input
                        type="number"
                        min={0}
                        max={ASSESSMENT_MAX[assessmentType]}
                        value={assessmentScore}
                        onChange={(e) => setAssessmentScore(e.target.value)}
                        placeholder={
                          ASSESSMENT_MAX[assessmentType]
                            ? `e.g. ${Math.round(ASSESSMENT_MAX[assessmentType]! * 0.5)}`
                            : "e.g. 72"
                        }
                      />
                    </label>
                    <p className={styles.assessmentWarning}>
                      Draft mapping — flagged for clinical validation:{" "}
                      {assessmentType} &rarr;{" "}
                      {ASSESSMENT_BODY_PARTS[assessmentType]
                        .map((p) => LABEL[p])
                        .join(", ")}
                      . Score-to-percent conversion is not yet clinically
                      validated;{" "}
                      {ASSESSMENT_MAX[assessmentType]
                        ? "it is currently computed as score ÷ max score."
                        : "it is currently applied directly as entered (no standard maximum for this assessment)."}
                    </p>
                  </>
                )}

                <div className={styles.assessmentActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setAddingAssessment(false);
                      setAssessmentScore("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styles.approveButton}
                    onClick={applyAssessment}
                    disabled={
                      ASSESSMENT_BODY_PARTS[assessmentType].length === 0 ||
                      assessmentScore.trim() === ""
                    }
                  >
                    Apply to Suggested Targets
                  </button>
                </div>
              </div>
            )}

            {appliedAssessments.length > 0 && (
              <ul className={styles.assessmentLog}>
                {appliedAssessments.map((a) => (
                  <li key={a.id}>
                    {a.type}: {formatScore(a.type, a.rawScore)} (&asymp; {a.percent}%)
                    &rarr; {a.parts.map((p) => LABEL[p]).join(", ")}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Latest Therapist Update</div>
            <textarea
              className={styles.updateInput}
              placeholder="Add an update the patient will see, and any adjustments made this review…"
              value={updateMessage}
              onChange={(e) => setUpdateMessage(e.target.value)}
              rows={5}
            />
          </div>

          <div className={styles.actions}>
            <Link href={`/therapist/patients/${patient.id}`} className={styles.cancelButton}>
              Cancel
            </Link>
            <button
              type="button"
              className={styles.approveButton}
              onClick={handleApprove}
              disabled={saving}
            >
              {saving ? "Saving…" : approved ? "Approved ✓" : "Approve & Apply Changes"}
            </button>
          </div>
        </div>

        <div className={styles.sidebar}>
          {primaryGoal && (
            <div className={styles.section}>
              <div className={styles.cardTitle}>Primary Goal Recovery Progress</div>
              <GoalCard goal={primaryGoal} />
            </div>
          )}

          <div className={styles.section}>
            <div className={styles.cardTitle}>Recent Trend (Overall Progress)</div>
            <div className={styles.card}>
              {primaryGoal?.history ? (
                <LineChart
                  yMax={100}
                  yLabels={[0, 25, 50, 75, 100]}
                  series={[
                    {
                      id: "goal",
                      label: primaryGoal.title,
                      color: "#3498DB",
                      points: primaryGoal.history.map((h) => ({
                        x: h.date,
                        y: h.progressPercent,
                      })),
                    },
                  ]}
                />
              ) : (
                <p className={styles.empty}>No goal progress recorded yet.</p>
              )}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.cardTitle}>Last Therapist Update</div>
            <TherapistUpdateCard update={patient.latestUpdate} therapist={reviewer} />
          </div>
        </div>
      </div>
    </div>
  );
}
