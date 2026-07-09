# CLAUDE.md

## Project
LinkCare

## Mission
Build a goal-oriented stroke rehabilitation MVP connecting meaningful patient recovery goals, home rehabilitation sessions, and therapist oversight.

## Users
Only two user types:
1. Patient/Caregiver
2. PT/OT

## MVP Scope
Use mock JSON data only. No authentication, backend, database, EMR integration, messaging, AI diagnosis, payments, or complex settings.

## Design Philosophy
Patient app: mobile-first, calm, hopeful, minimal, wellness-app feel, one clear task at a time.
Therapist dashboard: desktop-first, clinical workspace, information-dense but clear, actionable insights.

## Core Concepts
- Goal-oriented rehabilitation
- Recovery Snapshot
- Barrier Tracking
- Connected Care
- Therapist oversight between clinic visits

## Patient Navigation
Home, Progress, Start, History, Profile

## Patient Start Flow
1. Today's Focus
2. Session Overview
3. Exercise Instructions
4. Exercise In Progress
5. Rest Timer
6. Session Progress
7. Session Capture
8. Session Complete

## Data Rules — IMPORTANT, changed from earlier draft
This project has TWO apps built separately (patient app, therapist dashboard) that need to stay connected without a real backend. To make that work, do NOT import the files in `/mock-data` directly into either app's code.

Instead, both apps fetch from a shared local mock API server running at `http://localhost:4000` (see `/mock-server/README.md` for setup). This server is generated from the exact same data — `/mock-data/*.json` files are kept as the readable reference/source docs, while `/mock-server/db.json` is the combined file the live server actually runs from.

Fetch from these endpoints instead of importing JSON:
- `GET http://localhost:4000/patients`
- `GET http://localhost:4000/patients/:id`
- `GET http://localhost:4000/therapists`
- `GET http://localhost:4000/goals?patientId=...`
- `GET http://localhost:4000/exercises`
- `GET http://localhost:4000/assignments?patientId=...`
- `GET http://localhost:4000/sessions?patientId=...`
- `GET http://localhost:4000/recoverySnapshots?patientId=...`

Writes (e.g. patient completing a session, therapist assigning a programme) should be real POST/PATCH requests to this server, not just local component state — this is what makes a write on one app actually visible to the other app, which is the whole point of using a shared server instead of two separate static file imports.

Do not invent new fields.
Use `patients` for therapist dashboard patient cards.
Use `sessions` for history, trends, barriers, and monitoring.
Use `assignments` — for MVP, only Prasert (`PT00018472`) has a real assignment; other patients will return an empty result for this endpoint, which is expected, not a bug.

## Display Language
Use: Consistency, Attention Status, Recovery Snapshot, Today's Focus, Recovery Journal, No session recorded.
Avoid: adherence, risk, missed, compliance, failed.

## Implementation
Build reusable components.
Use TypeScript types derived from JSON.
Keep patient and therapist routes separate.
Manual rep counting is acceptable.
Webcam/computer vision is optional.
Prioritize demo reliability.

## ⚠️ Open Question — Do Not Invent, Ask First
`exercises.json`'s `functionalGoals` field only reliably matches a real goal `title` in `goals.json` for the literal string "Return to Work" (Prasert's and Kade's primary goal). Every other goal title — ALL secondary goals across all 6 patients, and 4 of the 6 patients' primary goals (e.g. "Improve Functional Mobility," "Regain Independence in Daily Living") — has NO matching exercise tag at all.

**This is a trap, not a working feature:** a naive literal string-match implementation would appear to work correctly in the demo (Prasert is the featured patient, and his goal happens to match), while silently failing for almost every other patient and every secondary goal in the system. Do not implement goal-based exercise highlighting via direct string matching and assume it works — verify it against a patient other than Prasert before considering it done.

Do not invent a broader mapping (e.g. fuzzy string matching, keyword guessing) on your own — ask the team how this should work before building that part of Assign Programme. Options worth asking about: (a) add an explicit goalId reference to each exercise, (b) build a small lookup table mapping goal titles to relevant functional tags, (c) skip goal-based highlighting for MVP and just let the therapist browse/search the full exercise list manually.
