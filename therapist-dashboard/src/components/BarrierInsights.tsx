import type { Session } from "@/lib/types";
import styles from "./BarrierInsights.module.css";

export default function BarrierInsights({ sessions }: { sessions: Session[] }) {
  const counts = new Map<string, number>();
  const painSums = new Map<string, number>();
  const painCounts = new Map<string, number>();

  for (const s of sessions) {
    for (const barrier of s.barriers) {
      counts.set(barrier, (counts.get(barrier) ?? 0) + 1);
      if (s.painScore !== null) {
        painSums.set(barrier, (painSums.get(barrier) ?? 0) + s.painScore);
        painCounts.set(barrier, (painCounts.get(barrier) ?? 0) + 1);
      }
    }
  }
  const ranked = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) {
    return <p className={styles.empty}>No barriers reported. Great consistency.</p>;
  }

  const max = ranked[0][1];

  return (
    <div className={styles.list}>
      {ranked.map(([barrier, count]) => {
        const painCount = painCounts.get(barrier) ?? 0;
        const avgPain = painCount > 0 ? (painSums.get(barrier)! / painCount).toFixed(1) : null;
        return (
          <div key={barrier} className={styles.row}>
            <span className={styles.label}>{barrier}</span>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className={styles.count}>
              {count}x{avgPain !== null && <> &middot; avg pain {avgPain}/10</>}
            </span>
          </div>
        );
      })}
    </div>
  );
}
