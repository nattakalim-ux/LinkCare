import type { Patient, Session } from "./types";

export function statusReason(patient: Patient, sessions: Session[]): string {
  const ordered = sessions
    .filter((s) => s.patientId === patient.id)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const latest = ordered[0];

  if (patient.attentionStatus === "Needs Attention") {
    if (latest?.status === "not_completed") return "No session recorded last visit";
    if (latest && (latest.painScore ?? 0) >= 6) return "Pain reported above usual range";
    if (patient.consistency < 60) return "Weekly consistency below target";
    return "Review recommended";
  }

  if (patient.attentionStatus === "Doing Well") {
    return "Good consistency";
  }

  return "Steady progress";
}
