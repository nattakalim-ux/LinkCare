# LinkCare Claude Starter Pack

Upload this folder into your Claude Code project.

## Contents
- `/mock-data`: canonical JSON mock backend
- `/docs/CLAUDE.md`
- `/docs/API_CONTRACT.md`
- `/docs/DATA_DICTIONARY.md`
- `/docs/NORTH_STAR.md` — product vision, why, demo story
- `/docs/PRODUCT_SPECIFICATION_THERAPIST.md` — full therapist dashboard spec
- `/docs/PRODUCT_SPECIFICATION_PATIENT.md` — full patient app spec
- `/docs/DESIGN_SYSTEM.md` — visual language, components, now with real hex codes

## Changelog (2026-07-09 review pass)
- Fixed a milestone wording mismatch: `goals.json` said "Steer for 10 minutes without fatigue," now corrected to "5 minutes" to match the canonical demo story.
- Removed a duplicate `snapshot` field that was embedded directly in `patients.json` (Recovery Snapshot data now lives exclusively in `recoverySnapshots.json`, joined by `patientId`). All 6 patients' snapshot data was migrated there so nothing was lost.
- Added real brand-kit hex codes to `DESIGN_SYSTEM.md`'s colour tables (previously only named colours like "Turquoise"/"Navy" with no values).
- **Note on the other 5 patients' Recovery Snapshot trend data:** only Prasert had real `trendPercent` values in the original file. The other 5 were migrated with `trendPercent: 0` as a placeholder — replace with real values if the demo needs to show trends for anyone besides Prasert.

## Setup — do this FIRST, before either person starts a Claude Code session

The patient app and therapist dashboard are built separately (by two different people) but need to stay connected. This works via a shared mock API server:

```bash
cd mock-server
npm install
npm start
```

This runs at `http://localhost:4000`. **One person runs this** (agree who), and both apps' Claude Code sessions fetch from it — see `mock-server/README.md` for full details, endpoints, and cross-machine network setup if you're not both on the same wifi.

## First Claude Code prompt (run this in BOTH sessions)
Read `docs/CLAUDE.md`, `docs/NORTH_STAR.md`, `docs/PRODUCT_SPECIFICATION_THERAPIST.md`, `docs/PRODUCT_SPECIFICATION_PATIENT.md`, `docs/DESIGN_SYSTEM.md`, `docs/API_CONTRACT.md`, `docs/DATA_DICTIONARY.md`, `mock-server/README.md`, and all files in `mock-data` (as reference — the live data comes from the running mock-server, not by importing these files directly).

Do not write code yet.

Summarize the product, data model, patient app screens, therapist dashboard screens, and build plan. Confirm you understand that data is fetched from `http://localhost:4000`, not imported from local JSON files. Ask for confirmation before coding.

## Changelog (2026-07-09 technical QA pass #2)
- Fixed `attentionStatus` for Daranee Limpikul: was "Doing Well" despite a severity-adjusted low Recovery Snapshot average (31%, Severe/12-months-post-stroke/dual-limb involvement) — changed to "On Track" to avoid a busy therapist skipping review of a high-effort patient who may still need a plateau-vs-progress conversation. All other patients' attentionStatus values were cross-checked against consistency + snapshot average + severity and are internally consistent.
- Flagged (not solved) in `CLAUDE.md`: `exercises.json`'s `functionalGoals` tags do not match any real goal title in `goals.json` — no defined mapping exists yet for Assign Programme's goal-based exercise highlighting. Claude Code is instructed to ask before inventing this logic.
- Ran full referential-integrity check across all 7 mock-data files (every patientId/therapistId/exerciseId/goalId/assignmentId reference resolves correctly) — no broken references found.

## Changelog (2026-07-09 technical QA pass #3 - deep recheck)
- Fixed Prasert's `consistency`: was 72, corrected to 71 (mathematically precise 5/7 completed-session rate).
- Corrected an overstated finding from pass #2: "Return to Work" DOES match an exercise `functionalGoals` tag directly — but this is a coincidental match only for Prasert/Kade's specific primary goal wording, not a general working mechanism. All other goal titles (every secondary goal, 4 of 6 primary goals) still have zero matching exercise tags. Updated the CLAUDE.md flag to warn against mistaking "works for the demo patient" as "works in general."
- Verified clean (no issues found): goal count rules (1 primary + 2-3 secondary per patient), milestone status sequencing, exercise/session enum consistency, exercise parameter ranges, appointment date sanity, PT/OT assignment consistency, and that the None values in sessions.json are correctly scoped to not_completed sessions only.

## Changelog (2026-07-09 - mock server added for separate builds)
- Added `/mock-server` — a `json-server`-based shared mock API (combining all `/mock-data/*.json` files into `db.json`) so the patient app and therapist dashboard, built separately by two people, can stay genuinely connected (a write from one app is visible to the other on next fetch) without a real backend.
- Updated `CLAUDE.md` and `API_CONTRACT.md` to instruct both apps to fetch from `http://localhost:4000/...` rather than importing `/mock-data/*.json` directly.
- `/mock-data/*.json` files are kept as the readable reference/source docs — they are no longer what either app's code reads from directly.
