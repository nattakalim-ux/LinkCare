"use client";

import { useId } from "react";

export function EmptyStateIllustration({ className }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1ABC9C" />
          <stop offset="100%" stopColor="#1D4EDB" />
        </linearGradient>
      </defs>
      <rect x="24" y="30" width="72" height="62" rx="10" fill="#F5F6F7" />
      <path
        d="M24 46h72"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path d="M42 22v14M78 22v14" stroke={`url(#${gradientId})`} strokeWidth={5} strokeLinecap="round" />
      <circle cx="60" cy="68" r="12" fill="none" stroke={`url(#${gradientId})`} strokeWidth={4} opacity={0.4} />
      <path
        d="M55 68l4 4 7-8"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
    </svg>
  );
}
