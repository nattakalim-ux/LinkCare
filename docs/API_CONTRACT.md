# LinkCare API Contract

This MVP uses a shared mock server (`/mock-server`, powered by json-server) as a live mock backend, running at `http://localhost:4000`. Both the patient app and therapist dashboard fetch from this same running server — this is what lets the two separately-built apps stay connected without a real backend. `/mock-data/*.json` files are the readable source-of-truth reference copies; the live server actually runs from `/mock-server/db.json`, which combines them. Do not invent new fields unless explicitly instructed. Do not import `/mock-data/*.json` directly into either app's code — fetch from the server instead.

## Files
- patients.json
- therapists.json
- goals.json
- exercises.json
- assignments.json
- sessions.json
- recoverySnapshots.json

## Key Demo Patient
Use `PT00018472` (Prasert Wongwipha) as the primary demo patient.

## Patient App

### Home
Reads: `patients.json`, `goals.json`, `assignments.json`, `recoverySnapshots.json`
Displays: greeting, calendar, Recovery Snapshot, Primary Goal, Today's Focus, Play CTA.

### Start Flow
Reads: `assignments.json`, `exercises.json`, `goals.json`
Writes: session-shaped object matching `sessions.json` at the end of Session Capture.

### Session Capture
Collects: painScore, fatigueScore, difficulty, barriers, noteToTherapist, goalReflection.
Writes via `POST http://localhost:4000/sessions` — a real request to the shared server, not just local state, so the therapist dashboard's Patient Detail/Barrier Insights reflect it immediately on next fetch.

### Progress
Reads: `goals.json`, `sessions.json`, `recoverySnapshots.json`

### History / Recovery Journal
Reads: `sessions.json`
Display only high-level timeline on main screen. Show `not_completed` as "No session recorded".

### Profile
Reads: `patients.json`, `therapists.json`
Displays personal info, recovery goal, recovery team, latest update, next appointment, health information, settings/help/about.

## Therapist Dashboard

### Patient List
Reads: `patients.json`
Displays patient cards, consistency, attentionStatus, primaryGoal, recoveryStage, lastSession, nextAppointment, and a Recovery Snapshot preview (joined from `recoverySnapshots.json` by patientId — patients.json itself has no snapshot data).

### Patient Detail
Reads: `patients.json`, `goals.json`, `sessions.json`, `recoverySnapshots.json`, `assignments.json`, `exercises.json`
Displays background, goals, Recovery Snapshot (from , not patients.json), sessions, pain/fatigue trends, barriers, current programme.

### Assign Programme
Reads: `goals.json`, `exercises.json`, `assignments.json`
For MVP, only Prasert has a detailed assignment.

## assignments.json exercise shape — read this before building Start Flow

`assignment.exercises` is `{ exerciseId: string, sets: number, reps: number }[]` — **not** `exerciseIds: string[]`. An earlier draft of this data used a plain ID array, but that has no way to express per-patient sets/reps overrides, which the Therapist Dashboard's Assign Programme screen requires (therapists can edit sets/reps per exercise, per patient — `exercises.json`'s `defaultParameters` are shared library defaults, not a per-patient override). This was a deliberate, documented shape change, not a data sync error.

```json
"exercises": [
  { "exerciseId": "EX0001", "sets": 3, "reps": 10 },
  { "exerciseId": "EX0002", "sets": 3, "reps": 10 },
  { "exerciseId": "EX0008", "sets": 3, "reps": 15 }
]
```

If your app's Start Flow reads `assignment.exerciseIds[]`, update it to read `assignment.exercises[].exerciseId` — and prefer `.sets`/`.reps` from that same object over `exercises.json`'s `defaultParameters`, since the per-patient values are the ones a therapist may have actually customized.

## Language Rules
Use `consistency`, not adherence.
Use `attentionStatus`, not risk.
Use "No session recorded", not missed.
