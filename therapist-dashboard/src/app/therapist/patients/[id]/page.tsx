import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAssignmentsForPatient,
  getExercises,
  getGoalsForPatient,
  getPatient,
  getRecoverySnapshotForPatient,
  getSessionsForPatient,
  getTherapists,
} from "@/lib/api";
import AttentionBadge from "@/components/AttentionBadge";
import RecoverySnapshotCard from "@/components/RecoverySnapshotCard";
import GoalCard from "@/components/GoalCard";
import AppointmentCard from "@/components/AppointmentCard";
import TherapistUpdateCard from "@/components/TherapistUpdateCard";
import BarrierInsights from "@/components/BarrierInsights";
import RecoveryJournal from "@/components/RecoveryJournal";
import RecoveryTrendChart from "@/components/RecoveryTrendChart";
import ProgressOverTime from "@/components/ProgressOverTime";
import styles from "./page.module.css";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patient = await getPatient(id).catch(() => null);
  if (!patient) {
    notFound();
  }

  const [goals, snapshots, sessions, assignments, exercises, therapists] =
    await Promise.all([
      getGoalsForPatient(id),
      getRecoverySnapshotForPatient(id),
      getSessionsForPatient(id),
      getAssignmentsForPatient(id),
      getExercises(),
      getTherapists(),
    ]);

  const snapshot = snapshots[0];
  const primaryGoal = goals.find((g) => g.type === "primary");
  const secondaryGoals = goals.filter((g) => g.type === "secondary");
  const assignment = assignments[0];
  const assignedExercises = assignment
    ? assignment.exercises.map((item) => ({
        item,
        exercise: exercises.find((e) => e.id === item.exerciseId),
      }))
    : [];

  const pt = therapists.find((t) => t.id === patient.assignedPT);
  const ot = therapists.find((t) => t.id === patient.assignedOT);
  const updateAuthor = therapists.find(
    (t) => t.id === patient.latestUpdate.therapistId
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>{patient.displayName}</h1>
          <p className={styles.meta}>
            {patient.age} &middot; {patient.sex} &middot; {patient.occupation}
            &middot; {patient.location}
          </p>
          <p className={styles.meta}>
            {patient.stroke.type} stroke, {patient.stroke.timeSinceStrokeMonths}{" "}
            months ago &middot; {patient.stroke.affectedSide} side affected
          </p>
        </div>
        <div className={styles.headerActions}>
          <AttentionBadge status={patient.attentionStatus} />
          <Link
            href={`/therapist/patients/${patient.id}/progress-review`}
            className={styles.reviewButton}
          >
            Progress Review
          </Link>
          <Link href={`/therapist/assign/${patient.id}`} className={styles.assignButton}>
            Assign Rehabilitation Programme
          </Link>
        </div>
      </div>

      <div className={styles.columns}>
        <div className={styles.main}>
          {snapshot && (
            <section className={styles.section}>
              <RecoverySnapshotCard snapshot={snapshot} />
            </section>
          )}

          {primaryGoal && (
            <section className={styles.section}>
              <div className={styles.sectionTitle}>Primary Goal</div>
              <GoalCard goal={primaryGoal} />
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Progress Over Time</div>
            <ProgressOverTime primaryGoal={primaryGoal} snapshot={snapshot} />
          </section>

          {secondaryGoals.length > 0 && (
            <section className={styles.section}>
              <details className={styles.secondaryGoals}>
                <summary className={styles.sectionTitle}>
                  Secondary Goals ({secondaryGoals.length})
                </summary>
                <div className={styles.secondaryGoalsList}>
                  {secondaryGoals.map((g) => (
                    <GoalCard key={g.id} goal={g} />
                  ))}
                </div>
              </details>
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Weekly Consistency</div>
            <div className={styles.card}>
              <div className={styles.consistencyValue}>{patient.consistency}%</div>
              <p className={styles.consistencyNote}>
                Last session recorded{" "}
                {new Date(patient.lastSession).toLocaleDateString()}.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Barrier Insights</div>
            <div className={styles.card}>
              <BarrierInsights sessions={sessions} />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Recovery Journal</div>
            <div className={styles.card}>
              <RecoveryTrendChart sessions={sessions} />
            </div>
            <div className={styles.card}>
              <RecoveryJournal sessions={sessions} />
            </div>
          </section>
        </div>

        <div className={styles.sidebar}>
          <section className={styles.section}>
            <div className={styles.sectionTitle}>Progress Review</div>
            <div className={styles.card}>
              {snapshot ? (
                <>
                  <p className={styles.reviewMeta}>
                    Last updated {new Date(snapshot.lastUpdated).toLocaleDateString()}
                  </p>
                  <p className={styles.reviewMeta}>
                    Next appointment{" "}
                    {new Date(patient.nextAppointment.date).toLocaleDateString()}
                  </p>
                  <Link
                    href={`/therapist/patients/${patient.id}/progress-review`}
                    className={styles.reviewLink}
                  >
                    Review &amp; approve updated snapshot &rarr;
                  </Link>
                </>
              ) : (
                <p className={styles.reviewMeta}>No Recovery Snapshot yet.</p>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Today&apos;s Focus</div>
            <div className={styles.card}>
              {assignment ? (
                <>
                  <div className={styles.focusTitle}>{assignment.focusTitle}</div>
                  <p className={styles.reviewMeta}>
                    {assignment.schedule.frequency},{" "}
                    {assignment.schedule.daysPerWeek} days/week &middot;{" "}
                    {assignment.schedule.estimatedMinutes} min
                  </p>
                  <ul className={styles.exerciseList}>
                    {assignedExercises.map(({ item, exercise }) => (
                      <li key={item.exerciseId}>
                        {exercise?.name ?? item.exerciseId} &mdash; {item.sets}x
                        {item.reps}
                      </li>
                    ))}
                  </ul>
                  {assignment.therapistTip && (
                    <p className={styles.tip}>&ldquo;{assignment.therapistTip}&rdquo;</p>
                  )}
                </>
              ) : (
                <p className={styles.reviewMeta}>No programme assigned yet.</p>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Latest Therapist Update</div>
            <TherapistUpdateCard
              update={patient.latestUpdate}
              therapist={updateAuthor}
            />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Next Appointment</div>
            <AppointmentCard appointment={patient.nextAppointment} />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Recovery Team</div>
            <div className={styles.card}>
              {pt && <p className={styles.reviewMeta}>{pt.displayName} &middot; PT</p>}
              {ot && <p className={styles.reviewMeta}>{ot.displayName} &middot; OT</p>}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionTitle}>Medical Information</div>
            <div className={styles.card}>
              <p className={styles.reviewMeta}>Stroke type: {patient.stroke.type}</p>
              <p className={styles.reviewMeta}>
                Affected domains: {patient.stroke.affectedDomains.join(", ")}
              </p>
              <p className={styles.reviewMeta}>
                Living situation: {patient.livingSituation}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
