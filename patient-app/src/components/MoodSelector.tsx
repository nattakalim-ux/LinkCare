"use client";

const OPTIONS = [
  { value: "not_yet", emoji: "😞", label: "Not yet" },
  { value: "a_little", emoji: "😐", label: "A little" },
  { value: "definitely", emoji: "😊", label: "Definitely" },
] as const;

export type MoodValue = (typeof OPTIONS)[number]["value"];

export function MoodSelector({
  value,
  onChange,
}: {
  value: MoodValue | null;
  onChange: (value: MoodValue) => void;
}) {
  return (
    <div className="flex justify-between gap-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex flex-1 flex-col items-center gap-1 rounded-card border-2 py-3 transition-colors ${
            value === opt.value
              ? "border-turquoise bg-turquoise/10"
              : "border-surface bg-white"
          }`}
        >
          <span className="text-3xl">{opt.emoji}</span>
          <span className="text-caption font-medium text-navy">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
