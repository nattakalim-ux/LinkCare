THERAPIST_PRD_v2.md

Stroke Rehab Companion — PT/OT Web Dashboard (Hackathon MVP)


0. Document Purpose & What Changed From v1

This is v2 of the therapist-facing dashboard PRD. It supersedes THERAPIST_PRD.md (v1).

Core shift from v1: the dashboard is now goal-first, not exercise-first. Every rehabilitation programme begins with "what meaningful life activity is this patient trying to return to?" rather than starting from the exercise catalog. The therapist remains in full manual control — nothing is auto-recommended or auto-assigned.

Same MVP assumptions as v1:


No authentication, no backend, mock JSON only
Desktop-first, single therapist persona ("OT Ploy") — aligned with the patient-side app's Recovery Team, which names OT Ploy as Prasert's occupational therapist (alongside PT Anan, not otherwise represented in this MVP)
Upper Limb only populated with real data
Demo centers on Prasert Wongwipha (P001) — is he not improving because of poor adherence, or genuine plateau?


Global Navigation

Dashboard
Patients
Exercise Library
Settings

Patient Profile is not a nav item — reached only by selecting a patient.


1. Foundation Data Definitions

These four data concepts are referenced across every page below. They're defined once here so nothing downstream is ambiguous.

1.1 Functional Goals

Every patient has 1 Primary Goal + 2–3 Secondary Goals, drawn from a shared Functional Goal Library (not free text). Goals are the organizing principle of the whole product — everything (exercises, Recovery Snapshot, dashboard cards) is displayed in relation to a goal, not in isolation.

Prasert's goals (locked, aligned to patient-side app):


Primary: Return to work as a Grab driver 🚕 — 63% progress
Secondary: Carry groceries independently 🛒 (72%) · Play with children again 👨‍👧‍👦 (58%) · Meet friends independently 👥 (65%)


Goal Progress %: a single percentage per goal representing overall progress toward that specific life activity (distinct from adherence — see 1.4). Prasert's primary goal is 63% — corrected from an earlier draft of 48%, and reconciled against a minor inconsistency in the patient-side wireframes themselves (Home screen showed 62%, Profile/Progress showed 63% — 63% adopted as the majority value; flag back to the patient-side team to fix the Home screen).

Goal Journey milestones (new, adopted from patient-side app, updated to match the latest persona table): each goal can have discrete milestones marking concrete sub-steps, not just a percentage. For Prasert's primary goal (4 milestones, per the latest persona table — down from an earlier 5-milestone draft):


Lift affected arm to chest height
Grip steering wheel confidently
Steer for 5 minutes without fatigue
Complete a short supervised drive


This gives the therapist (and patient) a concrete "what's actually next" answer beyond just a percentage — worth surfacing in the therapist's Patient Profile alongside the goal progress bar.

1.2 Recovery Snapshot

What it measures: A simplified functional capability score (0–100%) per upper-limb body part — Shoulder, Elbow, Hand, Fingers. This is a rough visual indicator for therapist triage, explicitly not a precise clinical ROM/strength measurement. Framed as directional, not diagnostic.

Note on scope (aligned to patient-side app): the patient-side Recovery Snapshot tracks 4 body parts, not 5 — Wrist is not shown as its own score. Wrist-targeting exercises (see the Forearm & Wrist category in Section 5) still exist and are still assignable; wrist function just isn't broken out as a separate visual score on either side of the product. This is a deliberate simplification, not a data-model gap.

Clinical rationale: Recovery doesn't have to be strictly monotonic proximal-to-distal — Prasert's data reflects a flexor-synergy pattern common post-stroke, where elbow flexion often returns relatively early even before full shoulder function (e.g. external rotation/abduction), while hand and finger dexterity lag furthest behind. The Recovery Snapshot surfaces this pattern so therapists see where recovery is lagging, not just whether the patient is adherent.

Prasert's Recovery Snapshot (aligned to patient-side app):

Body PartScoreShoulder68%Elbow74%Hand52%Fingers41% ⚠️

Demo narrative link: Fingers (fine dexterity) is Prasert's clear bottleneck. Driving requires fine motor control (handling coins, adjusting controls) more than shoulder strength — this is the "why" behind his stalled Goal Progress %.

1.3 Risk Status (trend-based, not a static field)

What it measures: Whether something is getting worse right now — a leading indicator, not a snapshot judgment. This is deliberately different information from Goal Progress (point-in-time %) or Adherence (point-in-time rate). It exists to catch decline before it shows up as a stalled goal weeks later.

Trigger rules (computed from session history, not hand-typed):

Risk levelTrigger conditionLowNo concerning trend — adherence stable/improving, pain/fatigue flat or improvingMediumAdherence dropped >15% over the last 2 weeks, OR pain/fatigue trending upward across 2+ consecutive check-insHighBoth of the above conditions, OR no session logged in 7+ days

Data needed: requires 2–3 weeks of sessions.json history per patient (session dates + pain/fatigue over time) — this is more mock data than a single hardcoded field, but it's what makes the flag defensible rather than arbitrary.

Display rule: the risk badge itself stays short ("Medium risk") — the trigger reason is shown as a separate, lighter-weight subtitle underneath, not packed into the badge. This keeps badges scannable across many patients while still surfacing the reason.

Prasert's trigger (demo data): Medium risk, triggered by adherence dropped over the last 2 weeks (not by pain/fatigue) — this is the hook that sends the therapist into his profile to ask "adherence problem or plateau?"

1.4 Weekly Adherence

Definition: the percentage of prescribed sessions actually completed, bucketed by week (not a single lifetime average) so the therapist and the Risk Status rule can see a trend, not just a snapshot.

Weekly Adherence = (sessions completed that week) / (sessions prescribed that week, per assigned frequency) × 100

Completion granularity (locked default): a session counts as "completed" only if the patient finished all prescribed exercises for that day. (Simplest to compute/explain; can be revisited if partial-credit is wanted later.)

Distinction from Goal Progress: Adherence measures did the patient show up and do the prescribed work. It says nothing about how well they did it or how close they are to their life goal — that's what Goal Progress and Recovery Snapshot are for.

1.5 Session Check-in Data (patient-reported, per session)

Captured on the patient-facing app per session, surfaced read-only on the therapist side:


Pain (0–10), Fatigue (0–10)
Session difficulty (Easy / Moderate / Difficult)
Barriers (multi-select): Pain, Fatigue, Too busy, Forgot, Low motivation, Needed assistance, Exercise too difficult
Goal reflection ("Do you feel closer to your goal?" — Not yet / A little / Definitely)
Free-text note to therapist (optional)


Why it matters: Barriers is the objective evidence layer that lets a therapist distinguish an adherence problem from a recovery problem — directly answering the product's core clinical insight. It should inform Risk Status triggers (e.g., "Forgot"/"Too busy" recurring → adherence-pattern risk; "Exercise too difficult"/rising pain → programme-fit risk).

Prasert's barrier pattern (demo data): skews toward adherence-type barriers — "Forgot" (4x), "Too busy" (3x), "Low motivation" (1x) — reinforcing the adherence story rather than a difficulty/pain story.

1.6 Patient-Side Alignment Pass (2026-07-08)

The therapist dashboard was checked against the patient-side app wireframes (built separately by a teammate) to make sure both sides describe the same patient. Results:

Adopted from patient-side (now the source of truth on both sides):


Goal Progress 63% (not 48% — an earlier therapist-side draft value)
Recovery Snapshot: 4 body parts only (Shoulder 68%, Elbow 74%, Hand 52%, Fingers 41%) — Wrist dropped from the visual score, though Wrist-targeting exercises still exist in the catalog (Section 5)
3 secondary goals, not 2: Carry groceries independently (72%), Play with children again (58%), Meet friends independently (65%)
Goal Journey milestones (4 discrete sub-steps per goal, per the latest persona table — updated from an earlier 5-step draft) — new concept, adopted into the Functional Goal definition
Therapist persona renamed from "Dr. Narin" to OT Ploy, matching the patient app's Recovery Team


Confirmed correct on the therapist side, NOT changed to match patient-side (these are errors on the patient-side wireframes that need to be fixed there, not propagated here):


Patient name stays Prasert Wongchai — the patient-side Profile screen shows "Prasert Somchai," which collides with the separate persona Somchai Boonsri. Flag to the patient-side teammate.
Affected side stays Left — the patient-side Profile screen shows "Right upper limb affected," contradicting the original clinical data and the goals built around left-arm impairment. Flag to the patient-side teammate.
Patient-side Home screen shows 62% for the same goal that Profile/Progress show as 63% — an internal inconsistency on the patient side alone. 63% (majority) adopted here; flag the Home screen to be fixed to match.


Still needs a decision: the patient-side "Recovery Team" names both PT Anan and OT Ploy. This PRD represents only OT Ploy. If PT Anan needs representation too (e.g. as a second therapist login, or if certain notes/actions should be attributed to PT Anan instead), that's a scope question to resolve before build, not something this PRD currently covers. Also worth flagging: "PT Anan" (the therapist) and "Anan Limthong" (the original patient persona, now missing from patients.json) share the same first name — a naming collision worth avoiding if Anan the patient is ever reintroduced.

2026-07-09 update #2 — PRD updated to match latest persona table photo, patients.json intentionally left untouched: a newer persona reference table introduced a third, different version of the patient roster (different names/occupations/goals from both the original Product Bible and the current patients.json). Per team decision, this PRD's demo-patient text has been updated to match that table — name changed to Prasert Wongwipha (from Wongchai), occupation changed to Grab driver (from Taxi driver), and Goal Journey milestones updated to the table's 4 milestones ("Lift affected arm to chest height," "Grip steering wheel confidently," "Steer for 5 minutes without fatigue," "Complete a short supervised drive" — down from an earlier 5-step draft). patients.json was explicitly NOT updated to match — it still has "Prasert Wongchai," "Taxi Driver," and the old 5-milestone framing baked into the wireframes/earlier documentation. This means the PRD text and the actual mock JSON are now temporarily out of sync on this specific patient's name/occupation until someone reconciles them — flag this before either file goes to Claude Code, since building against the PRD's prose and the JSON's actual field values would produce two different patient identities for the same P001 record.

2026-07-09 update — patient-app given priority on a data conflict: Prasert's age was found inconsistent across three sources (46 in patients.json, 48 in the original Product Bible, 52 in the patient-app wireframes). Per team decision, the patient-app value (52) now wins and has been corrected in patients.json. Separately, secondaryGoals was restructured from a flat array of strings to an array of {goal, progress} objects, since the patient app displays a progress % per secondary goal (matching the 72/58/65 values already locked in Section 1.1). The other five patients' secondary goals were converted to the same object structure for schema consistency, but their specific progress numbers are estimates, not sourced from any patient-app reference — only Prasert's three secondary-goal values are confirmed real data. Revisit those five estimates if the patient-app team produces real values for the other personas.


2. Dashboard Home

Purpose

Give the therapist an at-a-glance, goal-first overview of the caseload, surfacing who needs review before they open any individual profile.

User Story

As a therapist, when I log in, I want to see each patient's real-life goal and progress toward it, and immediately spot who needs review, so I can prioritize my limited clinic time.

Components


Summary stat cards (4): Total Patients, Average Adherence, Patients Requiring Review, Sessions Completed Today
Attention Queue: short list of only flagged (Medium/High risk) patients, each showing name, risk reason, goal + goal progress %
All Patients grid: full 6-patient card grid, each card showing: Name, Risk badge (+ subtitle reason), Goal icon + label, Goal Progress % as the headline number (not raw adherence), Recovery Stage


Primary Actions


Click any card/queue row → Patient Profile


Edge Cases


No flagged patients → Attention Queue section hidden or shows "No patients currently flagged"
No sessions today → stat shows 0


Notes


Goal Progress % replaces adherence % as the card headline — this is the key goal-first shift from v1
Prasert's card carries a visual highlight (accent border) since he's the primary demo patient
Risk badge uses the short-badge + subtitle-reason pattern defined in 1.3



3. Patient Profile (Most Important Page)

Purpose

Give the therapist a complete, goal-oriented clinical picture of one patient so they can determine whether stalled progress is an adherence problem or a recovery plateau, and act on it without leaving the page.

User Story

As a therapist, when I open a patient's profile, I want to see their goal progress, functional recovery breakdown, adherence trend, and self-reported barriers together, so I can tell whether a lack of progress is due to non-adherence or genuine plateau, and adjust their programme accordingly.

Layout (top to bottom, locked)


Patient header — avatar/initials, name, age/occupation/location, stroke type + time since stroke, affected side, severity, FMA-UE baseline score (e.g. "FMA-UE: 32/66") — plus ARAT and/or BBT if entered — see Section 4.5 — caregiver. Risk badge (short) + reason subtitle, top right.
Functional Goals — Primary Goal with icon, progress bar, and Goal Progress % (large, prominent); the 4 Goal Journey milestones listed beneath with individual status (✓ complete, ◐ in progress, 🔒 locked/not yet reached — per the persona table's status pattern, e.g. Prasert currently has 2 complete, 1 in progress, 1 locked); Secondary Goals listed smaller below.
Recovery Snapshot — horizontal bar per body part (Shoulder/Elbow/Hand/Fingers), each labeled with its %; bottleneck body part called out in a short warning line beneath (e.g. "Fine dexterity is the bottleneck limiting return to driving").
Rehabilitation Progress (two cards side by side) — numeric scale labels are a hard requirement on both charts below, not optional polish. A chart with no visible numbers is not acceptable — the therapist must be able to read exact values without hovering:

Weekly Adherence — bar chart, one bar per week. Each bar must show its % value directly above it (e.g. "80%", "70%", "40%", "30%"), x-axis labeled by week (wk1/wk2/wk3/wk4), subtitle clarifying "% of prescribed sessions completed, by week" (per definition 1.4)
Pain / Fatigue Trend — line chart (not bars — direction matters clinically). Y-axis must show numeric scale marks (0/5/10), subtitle "Self-reported score, scale 0–10," and the legend must show the current numeric value next to each line's label (e.g. "Pain (2)", "Fatigue (3)") — not just a color key with no numbers



Session Check-ins — Barrier Frequency Summary (ranked pills, e.g. "Forgot – 4x") at top; chronological check-in log below, each row showing date, pain/fatigue/difficulty, barrier selected that session, goal reflection answer, and a note icon if a free-text note exists (note text not shown inline — click through to view)
Current Programme — assigned exercises with sets/reps/frequency and which goal each supports (e.g. "supports driving"); "Assign Exercise" action in the section header
Therapist Notes — chronological existing notes + "Add Note" action


Primary Actions


Add Note: timestamped free-text note, appended client-side
Adjust Programme: modify frequency/reps/sets of an existing assignment
Assign Exercises: opens Assign Exercise flow (Section 4), scoped to this patient


Edge Cases


No assigned exercises yet → empty state prompting "Assign Exercises"
Fewer than 2 weeks of session history → Weekly Adherence/Pain-Fatigue charts render with available data points only, no error
No barriers selected in a session → check-in log row shows "–" in the barrier column


Notes


This is the emotional and clinical centerpiece of the demo. For Prasert: Risk Status flags an adherence drop → Recovery Snapshot shows fingers as the bottleneck → Weekly Adherence confirms the recent drop → Session Check-ins (barriers: "Forgot," "Too busy") confirms it's an adherence pattern, not a difficulty/pain pattern → therapist concludes "adherence issue, not plateau" using only what's on this one page
Every metric on this page must be labeled/defined per Section 1 — no bare unexplained percentages
Wireframe reference: linkcare_patient_profile_wireframe_v4 (LinkCare brand palette: teal #1ABC9C, blue #1D4EDB, navy #0D2B45, coral #D85A30 for risk/warning accents)



4. Assign Exercise (Goal-First Flow)

Purpose

Let the therapist build a personalized home programme starting from the patient's functional goal, not the exercise catalog — while keeping full manual control over exercise selection.

User Story

As a therapist, I want to start from a patient's goal, browse relevant exercises, and configure rep/set/frequency parameters, so the home programme is clearly tied to what the patient is trying to get back to.

Workflow (5 steps, per v2 agreement — this is a step longer than v1's 3-step flow, since the goal step was added on top rather than replacing domain/library browsing)


Select Functional Goal(s) — Primary Goal pre-selected if launched from Patient Profile (shown as a highlighted, checked card); Secondary Goals optionally selectable too
Select Rehabilitation Domain — Upper Limb (enabled, selected by default); other domains shown as disabled pills labeled "coming soon"
Browse Exercise Library — highlight/reorder, not filter: exercises tagged as supporting the selected goal(s) are surfaced at the top with a "supports goal" tag, but the full catalog remains visible below a divider, uncollapsed. Nothing is ever hidden from the therapist — this was a deliberate decision, consistent with dropping the earlier "Claude suggests" auto-recommendation idea. Therapist checks exercises directly in this list to select them.
Selected Exercises — a running list (with count, e.g. "Selected Exercises (3)") of what the therapist has checked in Step 3, each removable via an × icon
Configure and Assign — one config block per selected exercise, each with editable number inputs for Sets and Reps and a Frequency dropdown (e.g. Daily / 3x per week), pre-filled with sensible defaults the OT can adjust. Single "Assign Programme" button commits all configured exercises at once.


Outputs

New entry in exerciseAssignments.json per exercise: patientId + exerciseId + sets + reps + frequency + which goal(s) it supports, timestamped

Edge Cases


Domain other than Upper Limb selected → "coming soon" empty state
No config fields filled → inline validation, block submission
Same exercise assigned twice → allowed (different rep schemes at different phases)


Notes


Build-time flag: this flow is now longer (5 steps vs. 3) than originally scoped in v1 — budget more day-2 time for this than previously planned
Exercise → Goal Mapping (e.g. "Shoulder Raise supports Return to Work") must exist in exercises.json for Step 3's highlight/reorder to work
Why highlight/reorder and not filter: filtering would silently hide exercises from the therapist based on how goal tags happen to be labeled in mock data — this conflicts with the product's core "therapist stays in full control" principle. The therapist must always be able to see and choose the entire catalog, even exercises not tagged to the current goal.
Wireframe reference: linkcare_assign_exercise_flow_wireframe_v2 (LinkCare palette; teal step progress bar, teal-tinted goal-relevant exercise rows, blue primary Assign button)



4.5 Add Patient

Purpose

Let the therapist add a new patient to the caseload with enough baseline clinical information to immediately support goal-setting and Recovery Snapshot tracking — not just a name and a blank record.

User Story

As a therapist, when I take on a new patient, I want to record their personal details, set their functional goals, and enter a validated baseline motor assessment score, so their profile is clinically meaningful from day one rather than starting empty.

Entry point

"Add Patient" action from the Patients (list) page — new patient, not scoped to any existing record.

Form fields

Personal information:


First name, Last name
Age, Gender
Occupation
Marital status, Living situation
Caregiver name + relationship (optional — some patients live alone)
Stroke type (Ischemic / Hemorrhagic), Months since stroke, Affected side (Left/Right), Severity (Mild/Moderate/Severe), Rehab stage
Comorbidities (optional multi-select/tags, e.g. Hypertension, Type 2 Diabetes, Atrial Fibrillation)


Functional goals:


Primary Goal — selected from the shared Functional Goal Library (Section 1.1), not free text
Secondary Goals — 2–3 selected from the same library


Baseline motor assessment — Fugl-Meyer Assessment, Upper Extremity (FMA-UE) — required:


Single numeric field, total score only, range 0–66 (not the full sub-domain breakdown — a deliberate MVP scope decision, since the full assessment has multiple sub-domains — reflexes, synergies, wrist, hand, coordination/speed — that take a trained clinician meaningful time to administer; capturing just the validated total score keeps intake fast while still being clinically real, not invented)
This is a genuine, validated clinical outcome measure — not something specific to this product — used clinically and in research to determine disease severity, describe motor recovery, and plan and assess treatment, and recommended as a core measure in every stroke recovery and rehabilitation trial. Higher score = better motor function; 66 = full performance, 0 = complete hemiplegia.
FMA-UE severity reference bands (0–66 range), for the therapist's own interpretation (approximate — published cutoffs vary slightly by study, shown here as a general guide, not a strict rule the product enforces):
Score rangeSeverity0–28Severe29–42Moderate43–66Mild


The form should not auto-classify severity from this score — severity is entered by the therapist directly in Personal Information above, since the FMA-UE score is one input into that judgment, not a mechanical substitute for it.
This baseline score is what the initial Recovery Snapshot values should be derived from/consistent with — a patient entered with a low FMA-UE total shouldn't simultaneously get high Recovery Snapshot bars, or the two numbers contradict each other on the same profile.


Additional baseline assessments — optional fields:


Action Research Arm Test (ARAT) — total score, range 0–57. Covers 19 tasks across four functional sub-domains (Grasp, Grip, Pinch, Gross movement). Higher = better function. Reference bands: 0–10 no recovery, 11–21 poor, 22–42 limited, 43–54 notable, 55–57 full recovery capacity. Worth including specifically because it measures functional capacity (grasp/grip/pinch) rather than raw impairment — a natural fit alongside this product's goal-first framing (e.g. grip strength relates directly to "grip steering wheel").
Box and Block Test (BBT) — raw count, no fixed maximum; number of blocks the patient can transfer across a partition in 60 seconds, recorded for the affected side (and optionally the unaffected side for comparison). Lower count = more impairment. A fast, simple dexterity measure.
Both are optional at intake — leaving them blank should not block saving the patient record, unlike FMA-UE which is required. If entered, they should also be visible on Patient Profile's header alongside FMA-UE, but are not required for the Recovery Snapshot/Risk Status logic to function, since those are built around FMA-UE as the anchor score.


Primary Actions

Save → creates a new patient record, immediately navigable via Patients (list) and Dashboard

Outputs

New entry in patients.json (or equivalent) with all fields above; patient immediately appears in Dashboard/Patients grid with the entered Risk/goal data

Edge Cases


No caregiver (patient lives alone) — leave caregiver fields blank, don't force an entry
FMA-UE left blank — flag as required before save, since it's the clinical anchor for the whole profile, not optional metadata


Notes


This score must also surface on Patient Profile, not just live in the intake form — add it to the Patient Information header (Section 3) alongside stroke type/affected side/severity, e.g. "FMA-UE: 32/66 (Moderate)" so the therapist can see the baseline every time they open the profile, not only at intake
Keeping this to total-score-only is the right MVP scope call — it captures real clinical signal without requiring the hackathon demo to simulate a multi-minute assessment interface



5. Exercise Library

Purpose

Read-only reference view of all exercises across domains, independent of any specific patient. Also used to sanity-check that the therapist can always browse/find any exercise quickly, since time-per-patient is limited.

Layout


Left sidebar: Domain filter (Upper Limb enabled, others "coming soon" pills) above a Category filter list, each showing its exercise count
Search bar (top of page, above the sidebar/panel split): searches exercise names across all categories at once, not scoped to the currently selected category — added specifically so a therapist who already knows what they want doesn't have to browse
Right panel: exercise list for the selected category. Each row shows exercise name + target body part/purpose as plain subtext. A goal tag pill is shown only when an exercise actually supports one of the Functional Goal Library's goals — untagged exercises show no pill at all, rather than a "no goal tagged" placeholder, so the page isn't dominated by empty-state pills and the real tags stand out


Categories (Upper Limb) — 5 groups, 45 exercises total

Grouped to reflect a real proximal→distal, isolated→functional rehab progression, not just anatomy for its own sake:

CategoryCountRationaleShoulder & Elbow11Proximal, isolated-joint work — foundational stageForearm & Wrist6Grouped by functional pairing (forearm rotation + wrist stability are trained together in real tasks like turning a key), not strict anatomyHand & Fingers9Distal, fine motorReaching5Kept separate — multi-joint coordination is a distinct exercise type from isolated joint work or functional tasks, even at a smaller countFunctional / ADLs14Real-world daily tasks — top of the progression. Merged from the original separate "Coordination" and "ADLs" concepts per hackathon scope decision

Shoulder & Elbow (11): Shoulder Raise*, Shoulder Flexion, Shoulder Abduction, Shoulder Rotation, Shoulder Shrug, Scapular Retraction, Wall Climb, Elbow Flexion*, Elbow Extension, Triceps Extension, Resisted Elbow Curl
(*goal-tagged to "Return to driving")

Forearm & Wrist (6): Pronation/Supination, Wrist Flexion, Wrist Extension, Wrist Circles, Wrist Radial/Ulnar Deviation (exact 6th TBD — confirm before build)

Hand & Fingers (9): Hand Open/Close, Power Grip, Pinch Grip, Putty Squeeze, Ball Squeeze, Finger Tapping, Thumb Opposition, Finger Abduction/Adduction, Finger Extension with Band

Reaching (5): Reach Forward, Reach Sideways, Reach Overhead, Reach and Grasp, Cross-midline Reach

Functional / ADLs (14): Pick Up Coins*, Key Turning*, Peg Transfer*, Cup Transfer**, Carrying a Basket**, Jar Opening**, Towel Folding***, Zipper Pull***, Drinking from Cup, Button Fastening, Utensil Use, Writing Practice, Doorknob Turn, Block Transfer
(*supports "Return to driving", **supports "Carry groceries independently", ***supports "Play with children again")

Primary Actions


Search, browse by domain/category — read-only, no assignment from this screen (assignment only happens via Patient Profile → Assign Exercise, to keep patient context explicit)


Edge Cases


Domain other than Upper Limb → "coming soon" empty state
Search with no matches → "No exercises found" message


Notes


Clinical accuracy check performed: an earlier draft mistakenly labeled a pronation/supination-type movement as an "Elbow" exercise (it's a forearm/radioulnar movement) and duplicated a cross-body reach pattern across two categories — both corrected in the list above. Worth a final clinical proofread of the full 45-exercise list before it goes into exercises.json, since this is real content a judge with a PT/OT background could scrutinize.
Scope flag: 45 exercises (vs. 23 in v1) is meaningfully more mock data to hand-write (name, target, goal tag per exercise) — this is upfront data-entry work, not build complexity, but budget real time for it before the demo
Lowest UI-priority page for polish — build after Dashboard, Patient Profile, Assign Exercise are solid — but the underlying exercises.json data (all 45 entries) is a shared dependency for Assign Exercise too, so the data itself can't be deprioritized the same way the page's visual polish can
Wireframe reference: linkcare_exercise_library_wireframe_v5 (LinkCare palette; search bar, sidebar category list, tag-only-when-present pattern)



6. Settings

Unchanged from v1 — static placeholder, build last, only if time permits.


Cross-Screen Data Model Notes (for Claude Code)

Functional requirement — not decorative: the wireframes used to design this PRD are static mockups where buttons like "Add Note" and "Assign Exercise" don't actually do anything. In the real build, these must be fully functional:


Add Note: typing a note and submitting must actually append it to that patient's note history and immediately re-render in the Therapist Notes list — not just show a button that looks clickable
Assign Exercise: completing the 5-step flow and clicking "Assign Programme" must actually create a new entry in that patient's assigned exercises and immediately show up in the Patient Profile's Current Programme section — the therapist should be able to assign an exercise and then navigate back to see it there, working end to end
Both should persist for the remainder of the session (client-side state is fine, per below — it does not need to survive a page refresh for this MVP) but must not be purely cosmetic
patientId joins patients.json, exerciseAssignments.json, sessions.json, exerciseResults.json, therapistNotes.json
New in v2: patients need a goals object (primary + secondary, each with an id referencing the shared Functional Goal Library), a recoverySnapshot object (score per body part), and enough sessions.json history (2–3 weeks) to compute Weekly Adherence trend and Risk Status — this is meaningfully more mock data than v1's flat per-patient fields
Risk Status is computed from session history per the rules in 1.3, not a hardcoded field — this is a change from v1, which treated it as precomputed
Session check-in fields (pain, fatigue, difficulty, barriers, goal reflection, note) live per-session in sessions.json or a new checkIns.json — needs a data-model decision before Claude Code build starts
All "write" actions (Add Note, Assign Exercise, Adjust Programme) update client-side state only, per v1 — but "client-side state only" means no backend/database, not that the action is fake. State must actually update and the UI must actually reflect it.


Priority Order for Build (if time runs short)


Patient Profile (clinical centerpiece — now the most complex page in v2)
Dashboard Home (first impression, goal-first triage view)
Assign Exercise (now a 5-step flow — budget accordingly)
Exercise Library
Patients (list view)
Add Patient — lower priority: the demo centers on Prasert, an already-existing patient, so this flow isn't needed to tell the core demo story, only to show the product is a complete, working system beyond the one scripted patient
Settings
