import { notFound } from "next/navigation";
import {
  getGoalsForPatient,
  getPatient,
  getRecoverySnapshotForPatient,
  getSessionsForPatient,
  getTherapists,
} from "@/lib/api";
import ProgressReviewClient from "./ProgressReviewClient";

export default async function ProgressReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patient = await getPatient(id).catch(() => null);
  if (!patient) {
    notFound();
  }

  const [snapshots, sessions, goals, therapists] = await Promise.all([
    getRecoverySnapshotForPatient(id),
    getSessionsForPatient(id),
    getGoalsForPatient(id),
    getTherapists(),
  ]);

  const snapshot = snapshots[0];
  const primaryGoal = goals.find((g) => g.type === "primary");
  const reviewer =
    therapists.find((t) => t.id === patient.assignedPT) ??
    therapists.find((t) => t.id === patient.assignedOT);

  if (!snapshot) {
    notFound();
  }

  return (
    <ProgressReviewClient
      patient={patient}
      snapshot={snapshot}
      sessions={sessions}
      primaryGoal={primaryGoal}
      reviewer={reviewer}
    />
  );
}
