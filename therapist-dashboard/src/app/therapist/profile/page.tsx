import { notFound } from "next/navigation";
import {
  getAllGoals,
  getAllRecoverySnapshots,
  getAllSessions,
  getPatients,
  getTherapists,
} from "@/lib/api";
import { CURRENT_THERAPIST_ID } from "@/lib/currentTherapist";
import Avatar from "@/components/Avatar";
import PatientTable from "@/components/PatientTable";
import styles from "./page.module.css";

export default async function ProfilePage() {
  const [therapists, patients, snapshots, goals, sessions] = await Promise.all([
    getTherapists(),
    getPatients(),
    getAllRecoverySnapshots(),
    getAllGoals(),
    getAllSessions(),
  ]);

  const therapist = therapists.find((t) => t.id === CURRENT_THERAPIST_ID);
  if (!therapist) {
    notFound();
  }

  const assignedPatients = patients.filter(
    (p) => p.assignedPT === therapist.id || p.assignedOT === therapist.id
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Profile</h1>

      <div className={styles.card}>
        <Avatar name={therapist.displayName} size={72} />
        <div>
          <div className={styles.name}>{therapist.displayName}</div>
          <div className={styles.role}>
            {therapist.role} &middot; {therapist.credentials}
          </div>
          <div className={styles.meta}>
            {therapist.department} &middot; {therapist.hospital}
          </div>
        </div>
      </div>

      <h2 className={styles.subheading}>
        Assigned Patients ({assignedPatients.length})
      </h2>
      <PatientTable
        patients={assignedPatients}
        snapshots={snapshots}
        goals={goals}
        sessions={sessions}
      />
    </div>
  );
}
