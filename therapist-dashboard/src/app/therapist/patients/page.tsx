import {
  getAllGoals,
  getAllRecoverySnapshots,
  getAllSessions,
  getPatients,
} from "@/lib/api";
import PatientListClient from "./PatientListClient";

export default async function PatientsPage() {
  const [patients, snapshots, goals, sessions] = await Promise.all([
    getPatients(),
    getAllRecoverySnapshots(),
    getAllGoals(),
    getAllSessions(),
  ]);

  return (
    <PatientListClient
      patients={patients}
      snapshots={snapshots}
      goals={goals}
      sessions={sessions}
    />
  );
}
