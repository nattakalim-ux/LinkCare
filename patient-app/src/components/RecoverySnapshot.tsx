import Image from "next/image";
import type { RecoverySnapshot as RecoverySnapshotData } from "@/lib/types";
import { Card } from "./Card";
import { InfoIcon } from "./icons";

// markerX/markerY are percentages of the 1254x1254 recovery-body.png, anatomically
// placed on the figure's left arm (viewer's right), matching Prasert's
// affectedSide: "Left" in patients.json. labelY is spread out further than the
// true marker position so the four label blocks don't collide (hand and fingers
// sit only ~4% apart on the actual figure) — the connector line bridges the gap.
const MARKERS: {
  key: keyof Omit<RecoverySnapshotData, "patientId" | "lastUpdated">;
  label: string;
  markerX: number;
  markerY: number;
  labelY: number;
}[] = [
  { key: "shoulder", label: "Shoulder", markerX: 62.2, markerY: 23.9, labelY: 18 },
  { key: "elbow", label: "Elbow", markerX: 66.6, markerY: 38.1, labelY: 36 },
  { key: "hand", label: "Hand", markerX: 68.4, markerY: 48.2, labelY: 54 },
  { key: "fingers", label: "Fingers", markerX: 70.2, markerY: 52.2, labelY: 72 },
];

const LABEL_X = 84;

function formatDDMMYYYY(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export function RecoverySnapshot({ snapshot }: { snapshot: RecoverySnapshotData }) {
  return (
    <Card>
      <h2 className="mb-2 flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-slate">
        Recovery Snapshot
        <span
          className="normal-case text-slate"
          title="Updates only after a therapist review during your clinic appointment."
        >
          <InfoIcon size={14} />
        </span>
      </h2>

      <div className="relative mx-auto aspect-square w-full">
        <Image
          src="/illustrations/recovery-body.png"
          alt="Front-facing body diagram highlighting shoulder, elbow, hand, and finger recovery"
          fill
          className="object-contain"
          priority
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden
        >
          {MARKERS.map((m) => (
            <line
              key={m.key}
              x1={m.markerX}
              y1={m.markerY}
              x2={LABEL_X - 2}
              y2={m.labelY}
              stroke="#2EC4B6"
              strokeWidth={0.4}
              strokeDasharray="1.6 1.6"
              strokeLinecap="round"
            />
          ))}
          {MARKERS.map((m) => (
            <g key={m.key}>
              <circle cx={m.markerX} cy={m.markerY} r={2.6} fill="#2EC4B6" fillOpacity={0.18} />
              <circle cx={m.markerX} cy={m.markerY} r={1.15} fill="#2EC4B6" />
            </g>
          ))}
        </svg>

        {MARKERS.map((m) => {
          const part = snapshot[m.key];
          return (
            <div
              key={m.key}
              className="absolute -translate-y-1/2 text-left"
              style={{ left: `${LABEL_X}%`, top: `${m.labelY}%` }}
            >
              <div className="text-body font-bold leading-tight text-turquoise">
                {part.progressPercent}%
              </div>
              <div className="text-caption leading-tight text-navy">{m.label}</div>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-caption text-slate">
        Last updated: {formatDDMMYYYY(snapshot.lastUpdated)}
      </p>
    </Card>
  );
}
