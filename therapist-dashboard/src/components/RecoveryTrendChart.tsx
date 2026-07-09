import type { Session, SessionDifficulty } from "@/lib/types";
import styles from "./RecoveryTrendChart.module.css";

const WIDTH = 480;
const HEIGHT = 160;
const DOT_ROW_HEIGHT = 28;

const DIFFICULTY_COLOR: Record<string, string> = {
  easy: "#27ae60",
  moderate: "#f0997b",
  hard: "#d85a30",
};

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Difficult",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "numeric",
    day: "numeric",
  });
}

function average(values: number[]) {
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function mostCommonDifficulty(sessions: Session[]) {
  const order: SessionDifficulty[] = ["easy", "moderate", "hard"];
  const counts = new Map<string, number>();
  for (const s of sessions) {
    if (s.difficulty) counts.set(s.difficulty, (counts.get(s.difficulty) ?? 0) + 1);
  }
  if (counts.size === 0) return null;
  let best: string | null = null;
  let bestCount = -1;
  for (const d of order) {
    const c = counts.get(d as string) ?? 0;
    if (c > bestCount) {
      bestCount = c;
      best = d as string;
    }
  }
  return best;
}

// Connects every real (non-null) session into one continuous line, in date
// order — a "no session" day is skipped over, not a break in the line.
// The gap itself is still called out separately via the dashed gap marker.
function points(values: (number | null)[], xAt: (i: number) => number) {
  const pts: { x: number; y: number }[] = [];
  values.forEach((v, i) => {
    if (v === null) return;
    pts.push({ x: xAt(i), y: HEIGHT - (Math.max(0, Math.min(10, v)) / 10) * HEIGHT });
  });
  return pts;
}

export default function RecoveryTrendChart({ sessions }: { sessions: Session[] }) {
  const ordered = sessions.slice().sort((a, b) => a.date.localeCompare(b.date));
  const n = ordered.length;

  if (n === 0) {
    return <p className={styles.empty}>No sessions recorded yet.</p>;
  }

  const xAt = (i: number) => (n <= 1 ? WIDTH / 2 : (i / (n - 1)) * WIDTH);

  const painPoints = points(
    ordered.map((s) => s.painScore),
    xAt
  );
  const fatiguePoints = points(
    ordered.map((s) => s.fatigueScore),
    xAt
  );

  const gapIndices = ordered
    .map((s, i) => (s.status === "not_completed" ? i : -1))
    .filter((i) => i >= 0);

  const avgPain = average(
    ordered.filter((s) => s.painScore !== null).map((s) => s.painScore as number)
  );
  const avgFatigue = average(
    ordered.filter((s) => s.fatigueScore !== null).map((s) => s.fatigueScore as number)
  );
  const commonDifficulty = mostCommonDifficulty(ordered);

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#3498DB" }} />
          Pain
        </span>
        <span className={styles.legendItem}>
          <span className={styles.swatch} style={{ background: "#1ABC9C" }} />
          Fatigue
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dashSwatch} />
          No session
        </span>
      </div>

      <div className={styles.chartRow}>
        <div className={styles.axis} style={{ height: HEIGHT }}>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        <div className={styles.chartArea}>
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            width="100%"
            height={HEIGHT}
            preserveAspectRatio="none"
            className={styles.svg}
          >
            {[0, 5, 10].map((label) => (
              <line
                key={label}
                x1="0"
                x2={WIDTH}
                y1={HEIGHT - (label / 10) * HEIGHT}
                y2={HEIGHT - (label / 10) * HEIGHT}
                className={styles.gridline}
              />
            ))}

            {gapIndices.map((i) => (
              <line
                key={i}
                x1={xAt(i)}
                x2={xAt(i)}
                y1={0}
                y2={HEIGHT}
                className={styles.gapLine}
              />
            ))}
            {gapIndices.map((i) => (
              <text
                key={`label-${i}`}
                x={xAt(i)}
                y={12}
                textAnchor="middle"
                className={styles.gapLabel}
              >
                No session
              </text>
            ))}

            {painPoints.length > 1 ? (
              <polyline
                points={painPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#3498DB"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
            {painPoints.map((p, i) => (
              <circle key={`pain-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#3498DB" />
            ))}

            {fatiguePoints.length > 1 ? (
              <polyline
                points={fatiguePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="#1ABC9C"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null}
            {fatiguePoints.map((p, i) => (
              <circle key={`fatigue-${i}`} cx={p.x} cy={p.y} r={3.5} fill="#1ABC9C" />
            ))}
          </svg>

          <div className={styles.difficultyLegend}>
            <span className={styles.difficultyLegendLabel}>Session Difficulty</span>
            <span className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: DIFFICULTY_COLOR.easy }} />
              Easy
            </span>
            <span className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: DIFFICULTY_COLOR.moderate }} />
              Moderate
            </span>
            <span className={styles.legendItem}>
              <span className={styles.swatch} style={{ background: DIFFICULTY_COLOR.hard }} />
              Difficult
            </span>
          </div>

          <svg
            viewBox={`0 0 ${WIDTH} ${DOT_ROW_HEIGHT}`}
            width="100%"
            height={DOT_ROW_HEIGHT}
            preserveAspectRatio="none"
            className={styles.svg}
          >
            {ordered.map((s, i) =>
              s.difficulty ? (
                <circle
                  key={s.id}
                  cx={xAt(i)}
                  cy={DOT_ROW_HEIGHT / 2}
                  r={5}
                  fill={DIFFICULTY_COLOR[s.difficulty]}
                >
                  <title>{DIFFICULTY_LABEL[s.difficulty]}</title>
                </circle>
              ) : null
            )}
          </svg>

          <div className={styles.xLabels}>
            {ordered.map((s) => (
              <span
                key={s.id}
                className={s.status === "not_completed" ? styles.xLabelGap : undefined}
              >
                {formatDate(s.date)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Average Pain</span>
          <span className={styles.summaryValue}>
            {avgPain !== null ? `${avgPain.toFixed(1)}/10` : "—"}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Average Fatigue</span>
          <span className={styles.summaryValue}>
            {avgFatigue !== null ? `${avgFatigue.toFixed(1)}/10` : "—"}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Most Common Difficulty</span>
          <span className={styles.summaryValue}>
            {commonDifficulty ? DIFFICULTY_LABEL[commonDifficulty] : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
