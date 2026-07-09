import type { Goal, RecoverySnapshot } from "@/lib/types";
import LineChart from "./LineChart";
import styles from "./ProgressOverTime.module.css";

const BODY_PART_COLORS: Record<string, string> = {
  shoulder: "#1ABC9C",
  elbow: "#3498DB",
  hand: "#1D4ED8",
  fingers: "#0D2B45",
};

export default function ProgressOverTime({
  primaryGoal,
  snapshot,
}: {
  primaryGoal?: Goal;
  snapshot?: RecoverySnapshot;
}) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.title}>Overall Progress (%)</div>
        {primaryGoal?.history ? (
          <LineChart
            yMax={100}
            yLabels={[0, 25, 50, 75, 100]}
            series={[
              {
                id: "goal",
                label: primaryGoal.title,
                color: "#3498DB",
                points: primaryGoal.history.map((h) => ({
                  x: h.date,
                  y: h.progressPercent,
                })),
              },
            ]}
          />
        ) : (
          <p className={styles.empty}>No goal progress recorded yet.</p>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.title}>Body Part Progress (%)</div>
        {snapshot && snapshot.history.length > 0 ? (
          <LineChart
            yMax={100}
            yLabels={[0, 25, 50, 75, 100]}
            series={(["shoulder", "elbow", "hand", "fingers"] as const).map(
              (part) => ({
                id: part,
                label: part[0].toUpperCase() + part.slice(1),
                color: BODY_PART_COLORS[part],
                points: snapshot.history.map((h) => ({ x: h.date, y: h[part] })),
              })
            )}
          />
        ) : (
          <p className={styles.empty}>No Recovery Snapshot history yet.</p>
        )}
      </div>
    </div>
  );
}
