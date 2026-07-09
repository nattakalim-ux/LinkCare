# LinkCare Data Dictionary

## patients.json
Patient cards, profile, recovery team, next appointment, latest update, attention status.
**Note:** does NOT include Recovery Snapshot body-part data — that lives exclusively in `recoverySnapshots.json`. An earlier draft had a duplicate `snapshot` field embedded in patients.json; this was removed to avoid two sources of truth for the same data. Always read Recovery Snapshot values from recoverySnapshots.json, joined on patientId.

## therapists.json
Static PT/OT team list.

## goals.json
Primary and secondary functional goals. Primary goals may include milestones.

## exercises.json
Upper limb exercise library.

## assignments.json
Active programme. MVP includes only Prasert.
`exercises` is `{ exerciseId, sets, reps }[]`, not `exerciseIds: string[]` — see `API_CONTRACT.md` for the full shape and why.

## sessions.json
Home rehab session history: status, duration, pain, fatigue, barriers, notes, goal reflection.

## recoverySnapshots.json
Body-part progress for Recovery Snapshot visualizations.
