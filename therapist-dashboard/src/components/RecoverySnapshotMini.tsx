import { BODY_PARTS, type RecoverySnapshot } from "@/lib/types";
import styles from "./RecoverySnapshotMini.module.css";

const LABEL: Record<string, string> = {
  shoulder: "Shoulder",
  elbow: "Elbow",
  hand: "Hand",
  fingers: "Fingers",
};

// Numbers only, no progress bars — DESIGN_SYSTEM.md's Recovery Snapshot rule.
export default function RecoverySnapshotMini({
  snapshot,
}: {
  snapshot: RecoverySnapshot;
}) {
  return (
    <div className={styles.grid}>
      {BODY_PARTS.map((part) => (
        <div key={part} className={styles.row}>
          <span className={styles.label}>{LABEL[part]}</span>
          <span className={styles.value}>{snapshot[part].progressPercent}%</span>
        </div>
      ))}
    </div>
  );
}
