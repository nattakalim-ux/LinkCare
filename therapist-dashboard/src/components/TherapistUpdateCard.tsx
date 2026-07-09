import type { LatestUpdate, Therapist } from "@/lib/types";
import styles from "./TherapistUpdateCard.module.css";

export default function TherapistUpdateCard({
  update,
  therapist,
}: {
  update: LatestUpdate;
  therapist?: Therapist;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.author}>
          {therapist ? therapist.displayName : update.therapistId}
        </span>
        <span className={styles.date}>
          {new Date(update.date).toLocaleDateString()}
        </span>
      </div>
      <p className={styles.message}>{update.message}</p>
    </div>
  );
}
