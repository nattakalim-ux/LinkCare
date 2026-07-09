// Empty string = same-origin (this app's own Next.js Route Handlers in
// src/app/**/route.ts) — used for standalone/public-link demos.
// Set NEXT_PUBLIC_API_BASE_URL=http://localhost:4000 (see .env.local) to point
// at the shared mock-server instead, so writes are visible to the therapist
// dashboard too. Requires a rebuild to take effect (Next.js inlines NEXT_PUBLIC_
// vars at build time).
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// MVP demo scope: only this patient has a real assignment + session history.
export const DEMO_PATIENT_ID = "PT00018472";

// Exact wording matters here: the therapist dashboard groups sessions by these
// same strings for its Barrier Insights chart, so any change here must be
// mirrored on that side too.
export const BARRIER_OPTIONS = [
  "Pain",
  "Fatigue",
  "Exercise too difficult",
  "Needed assistance",
  "Dizziness or balance concern",
  "Low mood/low motivation",
] as const;

export const OTHER_BARRIER = "Other";
