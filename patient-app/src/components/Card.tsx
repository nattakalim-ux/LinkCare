export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card bg-white p-4 shadow-[0_1px_2px_rgba(13,43,69,0.04),0_8px_20px_-4px_rgba(13,43,69,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
