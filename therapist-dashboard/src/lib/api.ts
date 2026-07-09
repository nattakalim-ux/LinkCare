import type {
  Assignment,
  Exercise,
  Goal,
  Patient,
  RecoverySnapshot,
  Session,
  Therapist,
} from "./types";

// All reads/writes go through the shared mock server, never local JSON files.
// See docs/CLAUDE.md and docs/API_CONTRACT.md.
const BASE_URL = process.env.NEXT_PUBLIC_MOCK_API_URL ?? "http://localhost:4000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`GET ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function patch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`PATCH ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`POST ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getPatients(): Promise<Patient[]> {
  return get<Patient[]>("/patients");
}

export function getPatient(id: string): Promise<Patient> {
  return get<Patient>(`/patients/${id}`);
}

export function getTherapists(): Promise<Therapist[]> {
  return get<Therapist[]>("/therapists");
}

export function getGoalsForPatient(patientId: string): Promise<Goal[]> {
  return get<Goal[]>(`/goals?patientId=${patientId}`);
}

export function getExercises(): Promise<Exercise[]> {
  return get<Exercise[]>("/exercises");
}

export function getAssignmentsForPatient(patientId: string): Promise<Assignment[]> {
  return get<Assignment[]>(`/assignments?patientId=${patientId}`);
}

export function getSessionsForPatient(patientId: string): Promise<Session[]> {
  return get<Session[]>(`/sessions?patientId=${patientId}`);
}

export function getRecoverySnapshotForPatient(
  patientId: string
): Promise<RecoverySnapshot[]> {
  return get<RecoverySnapshot[]>(`/recoverySnapshots?patientId=${patientId}`);
}

export function getAllRecoverySnapshots(): Promise<RecoverySnapshot[]> {
  return get<RecoverySnapshot[]>("/recoverySnapshots");
}

export function getAllSessions(): Promise<Session[]> {
  return get<Session[]>("/sessions");
}

export function getAllGoals(): Promise<Goal[]> {
  return get<Goal[]>("/goals");
}

export function updateRecoverySnapshot(
  patientId: string,
  body: Partial<RecoverySnapshot>
): Promise<RecoverySnapshot> {
  return patch<RecoverySnapshot>(`/recoverySnapshots/${patientId}`, body);
}

export function updatePatient(
  id: string,
  body: Partial<Patient>
): Promise<Patient> {
  return patch<Patient>(`/patients/${id}`, body);
}

export function createAssignment(body: Omit<Assignment, "id">): Promise<Assignment> {
  return post<Assignment>("/assignments", body);
}

export function updateAssignment(
  id: string,
  body: Partial<Assignment>
): Promise<Assignment> {
  return patch<Assignment>(`/assignments/${id}`, body);
}

export function updateGoal(id: string, body: Partial<Goal>): Promise<Goal> {
  return patch<Goal>(`/goals/${id}`, body);
}
