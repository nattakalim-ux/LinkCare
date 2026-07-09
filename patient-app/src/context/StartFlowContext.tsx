"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import type {
  Assignment,
  Difficulty,
  Exercise,
  Goal,
  GoalReflection,
  Patient,
} from "@/lib/types";
import { LoadingScreen, ErrorScreen } from "@/components/StatusScreens";
import { getAssignmentExercises } from "@/lib/assignment";

export interface SessionCaptureAnswers {
  painScore: number;
  fatigueScore: number;
  difficulty: Difficulty | null;
  barriers: string[];
  noteToTherapist: string;
  goalReflection: GoalReflection | null;
}

interface PendingRest {
  label: string;
  onDone: () => void;
  nextPath: string;
}

interface StartFlowValue {
  patient: Patient;
  assignment: Assignment;
  exercises: Exercise[];
  primaryGoal: Goal | null;

  currentExerciseIndex: number;
  currentSetIndex: number;
  currentReps: number;
  currentExercise: Exercise;

  incrementRep: () => void;
  fillCurrentSet: () => void;
  isSetComplete: boolean;
  isLastSet: boolean;
  isLastExercise: boolean;

  pendingRest: PendingRest | null;
  goToRest: (label: string, onDone: () => void, nextPath: string) => void;
  clearRest: () => void;

  goToNextSet: () => void;
  goToNextExercise: () => void;

  capture: SessionCaptureAnswers;
  updateCapture: (partial: Partial<SessionCaptureAnswers>) => void;

  totalMinutes: number;
  totalReps: number;
  submitSession: (overrides?: Partial<SessionCaptureAnswers>) => Promise<void>;
}

const StartFlowReactContext = createContext<StartFlowValue | null>(null);

const DEFAULT_CAPTURE: SessionCaptureAnswers = {
  painScore: 0,
  fatigueScore: 0,
  difficulty: null,
  barriers: [],
  noteToTherapist: "",
  goalReflection: null,
};

export function StartFlowProvider({ children }: { children: React.ReactNode }) {
  const { data, error, loading } = useResource(async () => {
    const [patient, assignments, allExercises, goals] = await Promise.all([
      api.getPatient(DEMO_PATIENT_ID),
      api.getAssignments(DEMO_PATIENT_ID),
      api.getExercises(),
      api.getGoals(DEMO_PATIENT_ID),
    ]);
    const assignment = assignments[0];
    // Per-patient sets/reps on the assignment (therapist-customized) take
    // precedence over exercises.json's shared defaultParameters.
    const exercises = assignment
      ? getAssignmentExercises(assignment)
          .map((ref) => {
            const catalogExercise = allExercises.find((ex) => ex.id === ref.exerciseId);
            if (!catalogExercise) return null;
            return {
              ...catalogExercise,
              defaultParameters: {
                ...catalogExercise.defaultParameters,
                sets: ref.sets ?? catalogExercise.defaultParameters.sets,
                reps: ref.reps ?? catalogExercise.defaultParameters.reps,
              },
            };
          })
          .filter((ex): ex is Exercise => Boolean(ex))
      : [];
    const primaryGoal = goals.find((g) => g.type === "primary") ?? null;
    return { patient, assignment, exercises, primaryGoal };
  }, []);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [pendingRest, setPendingRest] = useState<PendingRest | null>(null);
  const [capture, setCapture] = useState<SessionCaptureAnswers>(DEFAULT_CAPTURE);

  const updateCapture = useCallback((partial: Partial<SessionCaptureAnswers>) => {
    setCapture((prev) => ({ ...prev, ...partial }));
  }, []);

  const goToRest = useCallback((label: string, onDone: () => void, nextPath: string) => {
    setPendingRest({ label, onDone, nextPath });
  }, []);

  const clearRest = useCallback(() => setPendingRest(null), []);

  const incrementRep = useCallback(() => {
    setCurrentReps((prev) => {
      const exercise = data?.exercises[currentExerciseIndex];
      const max = exercise?.defaultParameters.reps ?? prev + 1;
      return Math.min(prev + 1, max);
    });
  }, [data, currentExerciseIndex]);

  // Presenter-only shortcut (triggered by a long-press, no visible control) to
  // fast-forward a live demo — jumps straight to the set's target rep count.
  const fillCurrentSet = useCallback(() => {
    const exercise = data?.exercises[currentExerciseIndex];
    if (exercise) setCurrentReps(exercise.defaultParameters.reps);
  }, [data, currentExerciseIndex]);

  const goToNextSet = useCallback(() => {
    setCurrentSetIndex((s) => s + 1);
    setCurrentReps(0);
  }, []);

  const goToNextExercise = useCallback(() => {
    setCurrentExerciseIndex((i) => i + 1);
    setCurrentSetIndex(1);
    setCurrentReps(0);
  }, []);

  const totals = useMemo(() => {
    if (!data) return { totalMinutes: 0, totalReps: 0 };
    return data.exercises.reduce(
      (acc, ex) => ({
        totalMinutes: acc.totalMinutes + ex.defaultParameters.estimatedMinutes,
        totalReps: acc.totalReps + ex.defaultParameters.sets * ex.defaultParameters.reps,
      }),
      { totalMinutes: 0, totalReps: 0 }
    );
  }, [data]);

  const submitSession = useCallback(
    async (overrides?: Partial<SessionCaptureAnswers>) => {
      if (!data) return;
      const finalCapture = { ...capture, ...overrides };
      const today = new Date().toISOString().slice(0, 10);
      await api.postSession({
        patientId: DEMO_PATIENT_ID,
        assignmentId: data.assignment.id,
        date: today,
        status: "completed",
        durationMinutes: totals.totalMinutes,
        exerciseCount: data.exercises.length,
        totalReps: totals.totalReps,
        difficulty: finalCapture.difficulty,
        painScore: finalCapture.painScore,
        fatigueScore: finalCapture.fatigueScore,
        barriers: finalCapture.barriers,
        noteToTherapist: finalCapture.noteToTherapist,
        goalReflection: finalCapture.goalReflection,
        sharedWithTherapist: true,
      });
    },
    [data, totals, capture]
  );

  if (loading) return <LoadingScreen />;
  if (error || !data || !data.assignment) {
    return <ErrorScreen message={error?.message ?? "No active programme found for this patient."} />;
  }

  const exercise = data.exercises[currentExerciseIndex];
  const isSetComplete = currentReps >= exercise.defaultParameters.reps;
  const isLastSet = currentSetIndex >= exercise.defaultParameters.sets;
  const isLastExercise = currentExerciseIndex >= data.exercises.length - 1;

  const value: StartFlowValue = {
    patient: data.patient,
    assignment: data.assignment,
    exercises: data.exercises,
    primaryGoal: data.primaryGoal,
    currentExerciseIndex,
    currentSetIndex,
    currentReps,
    currentExercise: exercise,
    incrementRep,
    fillCurrentSet,
    isSetComplete,
    isLastSet,
    isLastExercise,
    pendingRest,
    goToRest,
    clearRest,
    goToNextSet,
    goToNextExercise,
    capture,
    updateCapture,
    totalMinutes: totals.totalMinutes,
    totalReps: totals.totalReps,
    submitSession,
  };

  return (
    <StartFlowReactContext.Provider value={value}>{children}</StartFlowReactContext.Provider>
  );
}

export function useStartFlow() {
  const ctx = useContext(StartFlowReactContext);
  if (!ctx) throw new Error("useStartFlow must be used within StartFlowProvider");
  return ctx;
}
