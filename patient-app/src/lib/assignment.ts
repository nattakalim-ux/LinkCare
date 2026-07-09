import type { Assignment, AssignmentExercise } from "./types";

export interface AssignmentExerciseRef {
  exerciseId: string;
  sets?: number;
  reps?: number;
}

// assignments.json's canonical shape is `exercises: [{ exerciseId, sets, reps }]`
// (see API_CONTRACT.md) — sets/reps are per-patient therapist overrides that
// take precedence over exercises.json's shared defaultParameters. Some
// environments may still serve the older flat `exerciseIds: string[]`, which
// carries no overrides; sets/reps then fall back to the exercise catalog.
export function getAssignmentExercises(assignment: Assignment): AssignmentExerciseRef[] {
  if (Array.isArray(assignment.exercises)) {
    return assignment.exercises
      .filter((e): e is AssignmentExercise => Boolean(e?.exerciseId))
      .map((e) => ({ exerciseId: e.exerciseId, sets: e.sets, reps: e.reps }));
  }

  if (Array.isArray(assignment.exerciseIds)) {
    return assignment.exerciseIds.map((exerciseId) => ({ exerciseId }));
  }

  return [];
}

export function getAssignmentExerciseIds(assignment: Assignment): string[] {
  return getAssignmentExercises(assignment).map((e) => e.exerciseId);
}
