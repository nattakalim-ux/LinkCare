import styles from "./LineChart.module.css";

export interface LineChartSeries {
  id: string;
  label: string;
  color: string;
  points: { x: string; y: number }[];
}

interface LineChartProps {
  series: LineChartSeries[];
  yMax: number;
  yLabels: number[];
  height?: number;
  unit?: string;
}

const WIDTH = 480;

export default function LineChart({
  series,
  yMax,
  yLabels,
  height = 160,
  unit = "%",
}: LineChartProps) {
  const xLabels = series[0]?.points.map((p) => p.x) ?? [];
  const n = xLabels.length;

  function coords(points: { x: string; y: number }[]) {
    return points.map((p, i) => {
      const x = n <= 1 ? WIDTH / 2 : (i / (n - 1)) * WIDTH;
      const y = height - (Math.max(0, Math.min(yMax, p.y)) / yMax) * height;
      return { x, y, value: p.y };
    });
  }

  if (n === 0) {
    return <p className={styles.empty}>Not enough data yet.</p>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.legend}>
        {series.map((s) => (
          <span key={s.id} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <div className={styles.chartRow}>
        <div className={styles.axis} style={{ height }}>
          {yLabels
            .slice()
            .reverse()
            .map((label) => (
              <span key={label}>{label}</span>
            ))}
        </div>

        <div className={styles.chartArea}>
          <svg
            viewBox={`0 0 ${WIDTH} ${height}`}
            width="100%"
            height={height}
            preserveAspectRatio="none"
            className={styles.svg}
          >
            {yLabels.map((label) => {
              const y = height - (label / yMax) * height;
              return (
                <line
                  key={label}
                  x1="0"
                  x2={WIDTH}
                  y1={y}
                  y2={y}
                  className={styles.gridline}
                />
              );
            })}

            {series.map((s) => {
              const pts = coords(s.points);
              if (pts.length === 1) {
                return (
                  <circle
                    key={s.id}
                    cx={pts[0].x}
                    cy={pts[0].y}
                    r={4}
                    fill={s.color}
                  />
                );
              }
              return (
                <g key={s.id}>
                  <polyline
                    points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {pts.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={s.color} />
                  ))}
                </g>
              );
            })}
          </svg>

          <div className={styles.xLabels}>
            {xLabels.map((label, i) => (
              <span key={i}>
                {new Date(label).toLocaleDateString(undefined, {
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.endValues}>
          {series.map((s) => {
            const last = s.points[s.points.length - 1];
            return (
              <span key={s.id} style={{ color: s.color }}>
                {last?.y}
                {unit}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
