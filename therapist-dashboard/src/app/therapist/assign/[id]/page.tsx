import { notFound } from "next/navigation";
import {
  getAssignmentsForPatient,
  getExercises,
  getGoalsForPatient,
  getPatient,
} from "@/lib/api";
import AssignProgrammeClient from "./AssignProgrammeClient";

export default async function AssignProgrammePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patient = await getPatient(id).catch(() => null);
  if (!patient) {
    notFound();
  }

  const [assignments, exercises, goals] = await Promise.all([
    getAssignmentsForPatient(id),
    getExercises(),
    getGoalsForPatient(id),
  ]);

  const primaryGoal = goals.find((g) => g.type === "primary");

  return (
    <AssignProgrammeClient
      patient={patient}
      existingAssignment={assignments[0] ?? null}
      exercises={exercises}
      primaryGoal={primaryGoal}
    />
  );
}
