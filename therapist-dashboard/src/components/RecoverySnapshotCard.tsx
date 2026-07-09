import { BODY_PARTS, type RecoverySnapshot } from "@/lib/types";
import styles from "./RecoverySnapshotCard.module.css";

const LABEL: Record<string, string> = {
  shoulder: "Shoulder",
  elbow: "Elbow",
  hand: "Hand",
  fingers: "Fingers",
};

interface RecoverySnapshotCardProps {
  snapshot: RecoverySnapshot;
  compact?: boolean;
}

export default function RecoverySnapshotCard({
  snapshot,
  compact = false,
}: RecoverySnapshotCardProps) {
  return (
    <div className={compact ? styles.compact : styles.card}>
      {!compact && <div className={styles.title}>Recovery Snapshot</div>}
      <div className={styles.grid}>
        {BODY_PARTS.map((part) => {
          const data = snapshot[part];
          return (
            <div key={part} className={styles.part}>
              <div className={styles.percent}>{data.progressPercent}%</div>
              <div className={styles.label}>{LABEL[part]}</div>
              {data.trendPercent !== 0 && (
                <div className={styles.trend}>+{data.trendPercent}%</div>
              )}
            </div>
          );
        })}
      </div>
      {!compact && (
        <div className={styles.updated}>
          Last updated {new Date(snapshot.lastUpdated).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
