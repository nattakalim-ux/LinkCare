import { API_BASE_URL } from "./constants";
import type {
  Assignment,
  Exercise,
  Goal,
  Patient,
  RecoverySnapshot,
  Session,
  Therapist,
} from "./types";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed: GET ${path} (${res.status})`);
  }
  return res.json();
}

export const api = {
  getPatient: (patientId: string) => getJSON<Patient>(`/patients/${patientId}`),
  getTherapists: () => getJSON<Therapist[]>("/therapists"),
  getGoals: (patientId: string) => getJSON<Goal[]>(`/goals?patientId=${patientId}`),
  getExercises: () => getJSON<Exercise[]>("/exercises"),
  getAssignments: (patientId: string) =>
    getJSON<Assignment[]>(`/assignments?patientId=${patientId}`),
  getSessions: (patientId: string) => getJSON<Session[]>(`/sessions?patientId=${patientId}`),
  getRecoverySnapshot: async (patientId: string) => {
    const snapshots = await getJSON<RecoverySnapshot[]>(
      `/recoverySnapshots?patientId=${patientId}`
    );
    return snapshots[0] ?? null;
  },
  postSession: async (session: Session): Promise<Session> => {
    const res = await fetch(`${API_BASE_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session),
    });
    if (!res.ok) {
      throw new Error(`Request failed: POST /sessions (${res.status})`);
    }
    return res.json();
  },
};
