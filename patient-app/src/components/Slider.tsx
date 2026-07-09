"use client";

export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  lowLabel,
  highLabel,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-body font-medium text-navy">{label}</span>
        <span className="text-section font-semibold text-turquoise">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface accent-turquoise"
      />
      <div className="mt-1 flex justify-between text-caption text-slate">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
