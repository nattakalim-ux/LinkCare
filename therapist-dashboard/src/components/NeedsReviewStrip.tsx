import Link from "next/link";
import type { Patient, Session } from "@/lib/types";
import { statusReason } from "@/lib/statusReason";
import Avatar from "./Avatar";
import styles from "./NeedsReviewStrip.module.css";

export default function NeedsReviewStrip({
  patients,
  sessions,
}: {
  patients: Patient[];
  sessions: Session[];
}) {
  if (patients.length === 0) {
    return <p className={styles.empty}>No patients currently need review.</p>;
  }

  return (
    <div className={styles.strip}>
      {patients.map((patient) => (
        <Link
          key={patient.id}
          href={`/therapist/patients/${patient.id}`}
          className={styles.card}
        >
          <Avatar name={patient.displayName} size={36} />
          <div>
            <div className={styles.name}>{patient.displayName}</div>
            <div className={styles.reason}>{statusReason(patient, sessions)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
