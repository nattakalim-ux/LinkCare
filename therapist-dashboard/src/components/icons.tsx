type IconProps = { size?: number; className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconDashboard({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function IconPatients({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6" />
      <circle cx="17" cy="8.5" r="2.3" />
      <path d="M15.5 14.2c2.4.4 4 2.6 4 5.8" />
    </svg>
  );
}

export function IconClock({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.3 2" />
    </svg>
  );
}

export function IconAlert({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <path d="M12 4 21 20H3L12 4Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTrend({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <path d="M4 16 9.5 10.5 13.5 14.5 20 7" />
      <path d="M14.5 7h5.5v5.5" />
    </svg>
  );
}

export function IconCalendar({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconSettings({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.7 6.3l-1.6 1.6M7.9 16.1l-1.6 1.6M17.7 17.7l-1.6-1.6M7.9 7.9 6.3 6.3" />
    </svg>
  );
}

export function IconProfile({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <circle cx="12" cy="8.2" r="3.7" />
      <path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    </svg>
  );
}

export function IconChevronRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} {...base} className={className} aria-hidden>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
