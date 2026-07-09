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

## Changelog (2026-07-09 - schema fixes needed for therapist dashboard writes)
Two pre-existing gaps in the shared mock-data blocked real writes from the Therapist Dashboard (Progress Review's Approve Snapshot, Assign Programme's per-exercise sets/reps). Both were confirmed with the team before changing shared files.

- **`recoverySnapshots.json` / `db.json`**: each entry was missing an `id` field (only had `patientId`). `json-server` requires `id` to support `PATCH /recoverySnapshots/:id` — without it, approving a Recovery Snapshot update had no working endpoint. Added `"id": "<patientId>"` to all 6 entries. Purely additive; every other field is unchanged. If the patient app reads `recoverySnapshots`, it will now also see this `id` field (harmless to ignore).
- **`assignments.json` / `db.json`**: `exerciseIds: string[]` had no way to express per-patient sets/reps overrides (Assign Programme's acceptance criteria requires editing sets/reps per exercise, and `exercises.json`'s `defaultParameters` are shared library defaults, not per-patient). Changed to `exercises: [{ exerciseId, sets, reps }]`. **This is a breaking shape change** — if the patient app's Start Flow reads `assignments.json`'s exercise list (per `API_CONTRACT.md`), it needs to read `assignment.exercises[].exerciseId` instead of `assignment.exerciseIds[]`, and can use `.sets`/`.reps` directly instead of falling back to `exercises.json` defaults. Prasert's existing assignment (`A00018472`) was migrated to the new shape with its original 3 exercises, sets/reps copied from their prior library defaults (3×10, 3×10, 3×15).

## Changelog (2026-07-09 - history tracking added for trend charts)
Therapist Dashboard needed real "progress over time" line charts (goal progress, per-body-part Recovery Snapshot), but neither file stored more than a single current value. Rather than fabricate a fake multi-point trend line, both files gained a `history` array — additive only, all existing fields unchanged.

- **`recoverySnapshots.json` / `db.json`**: each entry gained `"history": [{ date, shoulder, elbow, hand, fingers }]`, seeded with one point matching the entry's existing current values and `lastUpdated` date. The Therapist Dashboard's Progress Review "Approve Snapshot" action now appends a new point to this array on every approval (replacing same-day entries rather than duplicating), so the chart genuinely grows richer over the course of real use instead of ever showing invented data.
- **`goals.json`**: primary goals only (not secondary) gained `"history": [{ date, progressPercent }]`, seeded with one point from the goal's current `progressPercent`. Nothing in the Therapist Dashboard writes to `goals.json` yet — if the patient app is the one that updates goal progress, it would need to append to this array for the goal trend chart to show more than a single point. Until then this chart correctly renders as a single dot rather than a fake curve.

## Changelog (2026-07-09 - illustrative history backfilled for demo charts)
Per explicit request, the single-point `history` arrays above (in both `recoverySnapshots.json` and primary `goals.json` entries) were backfilled with 4 additional earlier points per patient (5 total, spaced ~2 weeks apart over ~2 months) so the Progress Over Time / Recent Trend line charts have something to show in the demo, rather than every chart rendering as a single dot until real reviews accumulate.

**These earlier points are illustrative, not real clinical history** — generated with a mild-upward-trend-plus-noise pattern, always ending exactly at the entry's real current value (the most recent point is never altered). If this matters for a demo/pitch context, say so explicitly rather than presenting the trend as measured data. Going forward, real Therapist Dashboard approvals continue to append genuine new points on top of this seed (see the entry above) — only the historical run-up was backfilled, not future data.

## Changelog (2026-07-09 - clinical advisor review fixes #1-5)
Five confirmed changes from a clinical advisor review, scoped to the Therapist Dashboard (this repo has no patient app to build against — see notes below on the pieces that only apply there).

1. **Goal title / overclaiming fixes** (`goals.json`, `patients.json`, `exercises.json`, `db.json`): renamed `"Return to Work"` → `"Improve Work Readiness"`, `"Return to Social Community"` → `"Improve Social Participation"`, and consolidated the two inconsistent daily-living strings (`"Regain Daily Living Skills"` and `"Regain Independence in Daily Living"`) into one: `"Improve Daily Living Skills"`. `"Improve Functional Mobility"` was already correct and untouched. The `"Primary Goal Progress"` card title in Progress Review is now `"Primary Goal Recovery Progress"`, and `GoalCard` now shows an explicit "Recovery Progress" label plus a disclaimer ("Reflects functional rehabilitation progress. Does not replace clinical judgment for real-world activity clearance.") under every goal's percent. Added a **therapist sign-off requirement**: a goal's final milestone never auto-completes just because `progressPercent` hits 100 — `GoalCard` now surfaces a "Mark Milestone Complete" action the therapist must click explicitly. This required a new `PATCH /goals/:id` write path (`updateGoal` in `lib/api.ts`), which didn't exist before since nothing previously wrote to `goals.json`.
2. **Barrier list replacement**: canonical barrier set is now Pain, Fatigue, Exercise too difficult, Needed assistance, Dizziness or balance concern, Low mood / low motivation, Other (free text). `sessions.json`'s two old placeholder values (`"Too busy"`, `"Forgot"`) were replaced with free-text-style entries (`"Had a family commitment come up"`, `"Simply forgot to start the session"`) representative of what the new "Other" free-text button would capture — no new field was added; `barriers` is still `string[]`. **Not built**: the actual Session Capture picker UI — that screen lives in the patient app, which does not exist in this repo. Barrier Insights (Therapist Dashboard) now shows average pain score alongside each barrier's frequency, computed from sessions where that barrier was selected and a pain score was recorded.
3. **Goal Journey redesigned** as a single horizontal segmented bar (green = complete, blue = in-progress, gray = locked) in `GoalCard`. Full milestone text now only appears on hover (native tooltip) or click (toggles a detail row) instead of always-visible list text.
4. **"Add Assessment" flow** added to Progress Review: pick an assessment (Grip Test/Dynamometer, FMA-UE, ARAT, Box and Block Test, Nine Hole Peg Test), enter a score, and it updates the draft Functional Assessment value for the mapped body part(s) — which then flows into the existing suggested-target calculation automatically. Nothing is written to the Recovery Snapshot until the therapist clicks the existing Approve action. **Two things flagged, not silently invented:**
   - The assessment → body-part mapping is a **draft** (Grip Test/Dynamometer → Hand; FMA-UE → Shoulder, Elbow, Hand; Box and Block Test → Hand, Fingers; Nine Hole Peg Test → Fingers) and needs clinical validation before relying on it.
   - **ARAT has no defined mapping** — it's selectable in the dropdown but applying it is blocked with an inline warning, rather than guessing.
   - No score-to-percent conversion formula was specified per assessment type (and several, like Nine Hole Peg Test, are inverted — lower is better — so a naive scale would be actively wrong). The score field is currently treated as already being 0–100 ("entered as % of maximum"), clearly labeled as unvalidated in the UI. This needs a real conversion table before it's clinically meaningful.
   - Applied assessments are session-only (shown in a "recent assessments" log on the page) and are not persisted — there's no backing field in `recoverySnapshots.json` for assessment history, and adding one wasn't part of this round's confirmed scope.
5. **Recovery Journal trend chart**: replaced the old plain "Pain & Fatigue Trend" chart + separate Recovery Journal timeline with one new component (`RecoveryTrendChart`) showing Pain and Fatigue as two line charts on a shared 0–10 axis, with Session Difficulty as a separate row of colored dots underneath (green/amber/red) — not a third line, not numerically averaged with pain/fatigue. Days with no session recorded show a dashed vertical gap marker labeled "No session" at the correct calendar position (never silently skipped), and both rows share the exact same x-axis coordinate function so the dots line up under the correct date. Below the chart: Average Pain, Average Fatigue, and Most Common Difficulty (a mode, e.g. "Easy" — deliberately not averaged into a meaningless number). The old per-day notes/goal-reflection/barrier-tag list (`RecoveryJournal`) is kept underneath the new chart, since that clinical narrative data has no home in the chart itself.

Out of scope for this round, per the reviewer's instruction: AI-recommended exercises for Assign Programme.

## Changelog (2026-07-09 - barrier list: decision trail + cross-app consistency flag)
Follow-up clinical advisor review pass on the barrier list already introduced above. The canonical list itself is unchanged from the earlier entry — **Pain, Fatigue, Exercise too difficult, Needed assistance, Dizziness or balance concern, Low mood / low motivation, Other (free text)** — but this pass formally records the decisions behind the two open questions the earlier change had glossed over, per explicit instruction to ask rather than guess.

1. **Historical data with pre-canonical-list values**: `sessions.json`'s two `not_completed` entries (7/4 and 7/7) predate this list and hold free text I generated earlier (`"Simply forgot to start the session"`, `"Had a family commitment come up"`) rather than a value from the canonical set. **Decision: leave them as-is, treated as legacy/historical data.** Only sessions going forward use the canonical list; these two will keep showing as their own one-off rows in Barrier Insights rather than being retroactively normalized.
2. **How "Other" is stored going forward**: **Decision: raw free text directly in `barriers[]`** — no schema change, no new field. This is what the two legacy entries above already do, so behavior is consistent old vs. new. Tradeoff (accepted): Barrier Insights cannot bucket all "Other" responses into a single aggregated count — each unique typed phrase shows as its own row indefinitely. If that becomes a real usability problem once real "Other" volume shows up, revisit with a fixed `"Other"` tag + separate detail field (would need a schema addition at that point).
3. **Cross-app string-matching risk — flagged, not verified**: the patient app (built separately, not present in this repo/session) is the one that will actually write these barrier strings via Session Capture. This dashboard has no way to confirm the patient app's picker uses byte-identical strings — same capitalization, same wording, same punctuation (e.g. `"Low mood / low motivation"` vs. some other phrasing/casing on the patient side). Barrier Insights aggregates by exact string match, so any mismatch means the same real-world barrier silently splits into two separate rows instead of one. **Recommend**: whoever owns the patient app confirms it emits these exact seven strings before this is trusted for a real demo.
4. **Average pain display already scoped correctly**: `BarrierInsights.tsx` only computes/shows "avg pain X.X/10" for a barrier when at least one session carrying that barrier also has a non-null `painScore`. A barrier that only ever appears on a `not_completed` session (no pain recorded) shows just the count, no pain figure — never a fake or zero average. This was already correct before this pass; verified, not changed.

## Changelog (2026-07-09 - barrier list: decision #1 reversed, legacy entries remapped to "Other")
Decision #1 above ("leave legacy entries as their own one-off rows") was explicitly reversed: `"Had a family commitment come up"` and `"Simply forgot to start the session"` are exactly the low-signal excuse-style barriers `"Too busy"`/`"Forgot"` were removed for, so leaving them as permanent separate categories in Barrier Insights defeated the point.

- **`sessions.json` / `db.json`**: both records' `barriers` changed from their free-text placeholder to `["Other"]`. The original text was **not discarded** — it now lives in that session's existing `noteToTherapist` field (previously empty on both records), so the detail is preserved, just correctly bucketed under "Other" instead of fragmenting Barrier Insights into one-off rows. No new field was added.
- **`RecoveryJournal.tsx`**: the `not_completed` branch previously never rendered `noteToTherapist` at all (only the completed-session branch did) — so simply moving the text into that field would have made it silently disappear from the UI. Added rendering of `noteToTherapist` (as a quoted note, same styling as the completed branch) to the `not_completed` branch too, so these two records now visibly show their original detail under the "Other" tag in Recovery Journal.
- Barrier Insights for Prasert now shows only canonical-list categories: `Other (2x)`, `Fatigue (1x)`, `Exercise too difficult (1x)` — no free-form phrasing appears as its own row anymore.

## Changelog (2026-07-09 - barrier list: "Other" remap superseded, specific categories assigned)
The "Other" remap immediately above was itself superseded per explicit instruction: `"Had a family commitment come up"` (7/7 session) is now `barriers: ["Pain"]`, and `"Simply forgot to start the session"` (7/4 session) is now `barriers: ["Dizziness or balance concern"]`. These are demo-data assignments, not clinical judgments — the original free text stays in `noteToTherapist` on both records for context, and `RecoveryJournal.tsx`'s rendering of that field (added in the prior changelog entry) still applies regardless of which barrier tag is attached. Barrier Insights for Prasert now reads: `Fatigue (1x)`, `Pain (1x)`, `Exercise too difficult (1x)`, `Dizziness or balance concern (1x)` — four canonical-list categories, nothing else.
