"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type {
  AssignedExercise,
  Assignment,
  Exercise,
  Goal,
  Patient,
} from "@/lib/types";
import { createAssignment, updateAssignment } from "@/lib/api";
import styles from "./page.module.css";

export default function AssignProgrammeClient({
  patient,
  existingAssignment,
  exercises,
  primaryGoal,
}: {
  patient: Patient;
  existingAssignment: Assignment | null;
  exercises: Exercise[];
  primaryGoal?: Goal;
}) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState<string>("All");
  const [focusTitle, setFocusTitle] = useState(
    existingAssignment?.focusTitle ?? ""
  );
  const [therapistTip, setTherapistTip] = useState(
    existingAssignment?.therapistTip ?? ""
  );
  const [programme, setProgramme] = useState<AssignedExercise[]>(
    existingAssignment?.exercises ?? []
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const programmeIds = new Set(programme.map((p) => p.exerciseId));

  const bodyParts = useMemo(() => {
    const set = new Set<string>();
    for (const e of exercises) {
      for (const part of e.targetBodyParts) set.add(part);
    }
    return ["All", ...Array.from(set).sort()];
  }, [exercises]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter((e) => {
      const matchesQuery =
        q.length === 0 ||
        e.name.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.targetBodyParts.some((p) => p.toLowerCase().includes(q));
      const matchesBodyPart =
        bodyPartFilter === "All" || e.targetBodyParts.includes(bodyPartFilter);
      return matchesQuery && matchesBodyPart;
    });
  }, [exercises, query, bodyPartFilter]);

  const totalDuration = programme.reduce((sum, item) => {
    const exercise = exercises.find((e) => e.id === item.exerciseId);
    return sum + (exercise?.defaultParameters.estimatedMinutes ?? 0);
  }, 0);

  function addExercise(exercise: Exercise) {
    if (programmeIds.has(exercise.id)) return;
    setProgramme((prev) => [
      ...prev,
      {
        exerciseId: exercise.id,
        sets: exercise.defaultParameters.sets,
        reps: exercise.defaultParameters.reps,
      },
    ]);
    setSaved(false);
  }

  function removeExercise(exerciseId: string) {
    setProgramme((prev) => prev.filter((p) => p.exerciseId !== exerciseId));
    setSaved(false);
  }

  function updateItem(exerciseId: string, field: "sets" | "reps", value: number) {
    setProgramme((prev) =>
      prev.map((p) =>
        p.exerciseId === exerciseId ? { ...p, [field]: Math.max(1, value) } : p
      )
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (existingAssignment) {
        await updateAssignment(existingAssignment.id, {
          focusTitle,
          exercises: programme,
          therapistTip,
        });
      } else {
        await createAssignment({
          patientId: patient.id,
          status: "active",
          primaryGoalId: primaryGoal?.id ?? "",
          focusTitle,
          rehabDomain: "Upper Limb",
          exercises: programme,
          schedule: { frequency: "Daily", daysPerWeek: 5, estimatedMinutes: 20 },
          therapistTip,
        });
      }
      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Assign Rehabilitation Programme</h1>
          <p className={styles.subheading}>
            {patient.displayName}
            {primaryGoal && ` — ${primaryGoal.title}`}
          </p>
        </div>
        <Link href={`/therapist/patients/${patient.id}`} className={styles.backLink}>
          View Patient
        </Link>
      </div>

      <div className={styles.columns}>
        <div className={styles.picker}>
          <div className={styles.sectionTitle}>
            <span className={styles.stepBadge}>1</span> Exercise Library
          </div>
          <input
            type="search"
            placeholder="Search exercises by name, category, or body part"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
          />
          <div className={styles.bodyPartFilters}>
            {bodyParts.map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => setBodyPartFilter(part)}
                className={
                  part === bodyPartFilter ? styles.filterActive : styles.filter
                }
              >
                {part}
              </button>
            ))}
          </div>
          <div className={styles.exerciseGrid}>
            {results.map((exercise) => {
              const added = programmeIds.has(exercise.id);
              return (
                <div key={exercise.id} className={styles.exerciseCard}>
                  <div className={styles.exerciseNameRow}>
                    <span className={styles.exerciseName}>{exercise.name}</span>
                    <span className={styles.categoryBadge}>{exercise.category}</span>
                  </div>
                  <div className={styles.exerciseMeta}>
                    {exercise.difficulty} &middot;{" "}
                    {exercise.targetBodyParts.join(", ")}
                  </div>
                  <div className={styles.exerciseMeta}>
                    Default: {exercise.defaultParameters.sets}x
                    {exercise.defaultParameters.reps} (
                    {exercise.defaultParameters.estimatedMinutes} min)
                  </div>
                  <button
                    type="button"
                    className={added ? styles.addedButton : styles.addButton}
                    onClick={() => addExercise(exercise)}
                    disabled={added}
                  >
                    {added ? "Added" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.builder}>
          <div className={styles.builderHeader}>
            <div className={styles.sectionTitle}>
              <span className={styles.stepBadge}>2</span> Today&apos;s Focus (Current
              Programme)
            </div>
            <div className={styles.summaryStats}>
              <span>
                <strong>{programme.length}</strong> Exercises
              </span>
              <span>
                <strong>{existingAssignment?.schedule.daysPerWeek ?? 5}</strong>{" "}
                Sessions/week
              </span>
              <span>
                <strong>~{totalDuration}</strong> min/session
              </span>
            </div>
          </div>

          <label className={styles.fieldLabel}>
            Focus title
            <input
              type="text"
              value={focusTitle}
              onChange={(e) => setFocusTitle(e.target.value)}
              className={styles.textInput}
              placeholder="e.g. Steering Control & Grip Confidence"
            />
          </label>

          {programme.length === 0 ? (
            <p className={styles.empty}>No exercises added yet.</p>
          ) : (
            <div className={styles.programmeList}>
              {programme.map((item, index) => {
                const exercise = exercises.find((e) => e.id === item.exerciseId);
                return (
                  <div key={item.exerciseId} className={styles.programmeItem}>
                    <span className={styles.itemNumber}>{index + 1}</span>
                    <div className={styles.programmeItemBody}>
                      <div className={styles.programmeNameRow}>
                        <span className={styles.programmeName}>
                          {exercise?.name ?? item.exerciseId}
                        </span>
                        {exercise && (
                          <span className={styles.itemDuration}>
                            ~{exercise.defaultParameters.estimatedMinutes} min
                          </span>
                        )}
                      </div>
                      <div className={styles.programmeControls}>
                        <label>
                          Sets
                          <input
                            type="number"
                            min={1}
                            value={item.sets}
                            onChange={(e) =>
                              updateItem(
                                item.exerciseId,
                                "sets",
                                Number(e.target.value)
                              )
                            }
                          />
                        </label>
                        <label>
                          Reps
                          <input
                            type="number"
                            min={1}
                            value={item.reps}
                            onChange={(e) =>
                              updateItem(
                                item.exerciseId,
                                "reps",
                                Number(e.target.value)
                              )
                            }
                          />
                        </label>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => removeExercise(item.exerciseId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <label className={styles.fieldLabel}>
            Therapist Tip
            <textarea
              value={therapistTip}
              onChange={(e) => setTherapistTip(e.target.value.slice(0, 500))}
              className={styles.textarea}
              rows={3}
              maxLength={500}
              placeholder="Guidance for the patient while completing this programme"
            />
            <span className={styles.charCount}>{therapistTip.length} / 500</span>
          </label>

          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saving || programme.length === 0}
          >
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save Programme"}
          </button>
        </div>
      </div>
    </div>
  );
}
