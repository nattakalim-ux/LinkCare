import "server-only";

import patientsData from "./data/patients.json";
import therapistsData from "./data/therapists.json";
import goalsData from "./data/goals.json";
import exercisesData from "./data/exercises.json";
import assignmentsData from "./data/assignments.json";
import sessionsData from "./data/sessions.json";
import recoverySnapshotsData from "./data/recoverySnapshots.json";

import type {
  Assignment,
  Exercise,
  Goal,
  Patient,
  RecoverySnapshot,
  Session,
  Therapist,
} from "@/lib/types";

// In-memory only: mutations (new sessions) live for the lifetime of this
// server process and reset to the JSON snapshot on restart, same as the
// json-server setup this replaces.
const patients: Patient[] = patientsData as Patient[];
const therapists: Therapist[] = therapistsData as Therapist[];
const goals: Goal[] = goalsData as Goal[];
const exercises: Exercise[] = exercisesData as Exercise[];
const assignments: Assignment[] = assignmentsData as Assignment[];
const recoverySnapshots: RecoverySnapshot[] = recoverySnapshotsData as RecoverySnapshot[];

let sessions: Session[] = sessionsData as Session[];

function randomId() {
  return Math.random().toString(36).slice(2, 9);
}

export const db = {
  getPatient(id: string): Patient | null {
    return patients.find((p) => p.id === id) ?? null;
  },
  getTherapists(): Therapist[] {
    return therapists;
  },
  getGoals(patientId: string): Goal[] {
    return goals.filter((g) => g.patientId === patientId);
  },
  getExercises(): Exercise[] {
    return exercises;
  },
  getAssignments(patientId: string): Assignment[] {
    return assignments.filter((a) => a.patientId === patientId);
  },
  getSessions(patientId: string): Session[] {
    return sessions.filter((s) => s.patientId === patientId);
  },
  getRecoverySnapshots(patientId: string): RecoverySnapshot[] {
    return recoverySnapshots.filter((s) => s.patientId === patientId);
  },
  addSession(session: Session): Session {
    const created = { ...session, id: session.id ?? randomId() };
    sessions = [...sessions, created];
    return created;
  },
};
