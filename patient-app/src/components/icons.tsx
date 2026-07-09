type IconProps = { size?: number; className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function ProgressIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 20V10" />
      <path d="M11 20V4" />
      <path d="M18 20v-7" />
    </svg>
  );
}

export function HistoryIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16" />
      <path d="M8 3v3M16 3v3" />
    </svg>
  );
}

export function ProfileIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
    </svg>
  );
}

export function BellIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.2 5.5 1.2 5.5H4.8S6 14 6 10Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function PlayIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M7 6l15 6-15 6Z" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

export function InfoIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SunIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
    </svg>
  );
}

export function TargetIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FocusIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}

export function ClockIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ListIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RepsIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M6 8v8M18 8v8" />
      <path d="M3 12h3M18 12h3" />
      <rect x="6" y="9" width="12" height="6" rx="1.5" />
    </svg>
  );
}

export function LightbulbIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.2 1 2.1h5c0-.9.4-1.65 1-2.1A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function PauseIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function GearIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2M12 18.5v2M20.5 12h-2M5.5 12h-2M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4M17.7 17.7l-1.4-1.4M7.7 7.7 6.3 6.3" />
    </svg>
  );
}

export function QuestionIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.5a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1 .8-1 1.6" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FlameIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 3c1 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1.2-.6-2-1.2-2.8.9.3 2.2 1.5 2.2 4a4 4 0 0 1-8 0c0-3.5 2.6-5 4-9.2Z" />
    </svg>
  );
}

export function TrendingUpIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M3 16l6-6 4 4 8-9" />
      <path d="M15 5h6v6" />
    </svg>
  );
}

export function PeopleIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M15.8 14.6c2-.1 3.7 1.4 4.3 3.6" />
    </svg>
  );
}

export function ChatIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4Z" />
    </svg>
  );
}

export function CalendarIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M8 3v3M16 3v3" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

export function ClipboardIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="6" y="4.5" width="12" height="16" rx="2" />
      <path d="M9 4.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5" />
      <path d="M12 10v5M9.5 12.5H12" />
    </svg>
  );
}

export function BagIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M6 8h12l-1 12H7Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function FamilyIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="8" cy="7" r="2.6" />
      <circle cx="16" cy="7" r="2.2" />
      <path d="M3.5 19c.6-3 2.3-4.6 4.5-4.6s3.9 1.6 4.5 4.6" />
      <path d="M13 19c.5-2.4 1.9-3.8 3.5-3.8s3 1.4 3.5 3.8" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <rect x="3.5" y="7.5" width="17" height="11" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
    </svg>
  );
}

export function HeartIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 20s-7-4.4-9-8.7C1.6 8 3 5 6.3 5c2 0 3.3 1.1 3.7 2 .4-.9 1.7-2 3.7-2 3.3 0 4.7 3 3.3 6.3-2 4.3-9 8.7-9 8.7Z" />
    </svg>
  );
}

export function ArmRaiseIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="10" cy="4.5" r="2" />
      <path d="M10 6.5v6M10 12.5l-3 6M10 12.5l3.5 1M13.5 13.5 15 8" />
    </svg>
  );
}

export function SteeringWheelIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 6v4M7.8 15.5l3.2-2.3M16.2 15.5l-3.2-2.3" />
    </svg>
  );
}

export function CarIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 16v-3.5L6 8h12l2 4.5V16" />
      <path d="M4 16h16M4 16v2M20 16v2" />
      <circle cx="7.5" cy="16" r="1.4" />
      <circle cx="16.5" cy="16" r="1.4" />
    </svg>
  );
}

export function StarIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M12 3.5l2.5 5.3 5.7.7-4.2 4 1.1 5.8L12 16.5l-5.1 2.8L8 13.5l-4.2-4 5.7-.7Z" />
    </svg>
  );
}
