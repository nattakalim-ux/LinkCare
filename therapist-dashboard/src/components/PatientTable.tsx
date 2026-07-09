import Link from "next/link";
import type { Goal, Patient, RecoverySnapshot, Session } from "@/lib/types";
import { statusReason } from "@/lib/statusReason";
import Avatar from "./Avatar";
import AttentionBadge from "./AttentionBadge";
import RecoverySnapshotMini from "./RecoverySnapshotMini";
import styles from "./PatientTable.module.css";

interface PatientTableProps {
  patients: Patient[];
  snapshots: RecoverySnapshot[];
  goals: Goal[];
  sessions: Session[];
}

export default function PatientTable({
  patients,
  snapshots,
  goals,
  sessions,
}: PatientTableProps) {
  const snapshotByPatient = new Map(snapshots.map((s) => [s.patientId, s]));
  const primaryGoalByPatient = new Map(
    goals.filter((g) => g.type === "primary").map((g) => [g.patientId, g])
  );

  if (patients.length === 0) {
    return <p className={styles.empty}>No patients match this search.</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Primary Goal</th>
            <th>Recovery Snapshot</th>
            <th>Last Activity</th>
            <th>Next Appointment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            const snapshot = snapshotByPatient.get(patient.id);
            const goal = primaryGoalByPatient.get(patient.id);
            return (
              <tr key={patient.id}>
                <td>
                  <Link
                    href={`/therapist/patients/${patient.id}`}
                    className={styles.patientCell}
                  >
                    <Avatar name={patient.displayName} size={40} />
                    <div>
                      <div className={styles.patientName}>{patient.displayName}</div>
                      <div className={styles.patientMeta}>
                        {patient.age} yo &middot; {patient.occupation}
                      </div>
                    </div>
                  </Link>
                </td>
                <td>
                  <div className={styles.goalTitle}>{patient.primaryGoal}</div>
                  {goal && (
                    <div className={styles.goalMeta}>
                      {goal.progressPercent}% &middot; {patient.consistency}%
                      consistency
                    </div>
                  )}
                </td>
                <td>
                  {snapshot ? (
                    <RecoverySnapshotMini snapshot={snapshot} />
                  ) : (
                    <span className={styles.goalMeta}>No snapshot</span>
                  )}
                </td>
                <td>
                  <div className={styles.goalMeta}>
                    {new Date(patient.lastSession).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>
                <td>
                  <div className={styles.patientName}>
                    {new Date(patient.nextAppointment.date).toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric" }
                    )}
                  </div>
                  <div className={styles.goalMeta}>{patient.nextAppointment.time}</div>
                </td>
                <td>
                  <AttentionBadge status={patient.attentionStatus} />
                  <div className={styles.goalMeta}>
                    {statusReason(patient, sessions)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
