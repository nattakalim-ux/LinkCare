import {
  getAllGoals,
  getAllRecoverySnapshots,
  getAllSessions,
  getPatients,
} from "@/lib/api";
import StatisticCard from "@/components/StatisticCard";
import NeedsReviewStrip from "@/components/NeedsReviewStrip";
import PatientTable from "@/components/PatientTable";
import { IconPatients, IconClock, IconAlert, IconTrend } from "@/components/icons";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const [patients, snapshots, sessions, goals] = await Promise.all([
    getPatients(),
    getAllRecoverySnapshots(),
    getAllSessions(),
    getAllGoals(),
  ]);

  const todayIso = new Date().toISOString().slice(0, 10);
  const sessionsCompletedToday = sessions.filter(
    (s) => s.date === todayIso && s.status === "completed"
  ).length;

  const needsReviewPatients = patients.filter(
    (p) => p.attentionStatus === "Needs Attention"
  );

  const avgConsistency = Math.round(
    patients.reduce((sum, p) => sum + p.consistency, 0) / patients.length
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.subheading}>Welcome back.</p>

      <div className={styles.stats}>
        <StatisticCard
          label="Total Patients"
          value={patients.length}
          icon={<IconPatients size={22} />}
          accent="blue"
        />
        <StatisticCard
          label="Needs Review"
          value={needsReviewPatients.length}
          icon={<IconAlert size={22} />}
          accent="attention"
        />
        <StatisticCard
          label="Sessions Completed Today"
          value={sessionsCompletedToday}
          icon={<IconClock size={22} />}
          accent="teal"
        />
        <StatisticCard
          label="Average Weekly Consistency"
          value={`${avgConsistency}%`}
          icon={<IconTrend size={22} />}
          accent="success"
        />
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Needs Review</h2>
        </div>
        <NeedsReviewStrip patients={needsReviewPatients} sessions={sessions} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Patients Overview</h2>
        </div>
        <PatientTable
          patients={patients}
          snapshots={snapshots}
          goals={goals}
          sessions={sessions}
        />
      </section>
    </div>
  );
}
