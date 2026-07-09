"use client";

import type { Difficulty } from "@/lib/types";

const OPTIONS: { value: Difficulty; emoji: string; label: string }[] = [
  { value: "easy", emoji: "😊", label: "Easy" },
  { value: "moderate", emoji: "😐", label: "Moderate" },
  { value: "hard", emoji: "☹️", label: "Hard" },
];

export function DifficultySelector({
  value,
  onChange,
}: {
  value: Difficulty | null;
  onChange: (value: Difficulty) => void;
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
