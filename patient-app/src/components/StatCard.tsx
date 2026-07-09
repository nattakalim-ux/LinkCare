import { Card } from "./Card";

export function StatCard({
  label,
  value,
  caption,
  icon,
}: {
  label: string;
  value: string;
  caption?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card>
      <div className="mb-1 flex min-h-10 items-start gap-2 text-caption font-medium uppercase tracking-wide text-slate">
        {icon && <span className="mt-0.5 shrink-0 text-turquoise">{icon}</span>}
        {label}
      </div>
      <div className="text-display font-semibold text-navy">{value}</div>
      {caption && <div className="mt-1 text-caption text-slate">{caption}</div>}
    </Card>
  );
}
