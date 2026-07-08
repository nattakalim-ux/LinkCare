# LinkCare Design System v1.0

---

## 1. Brand Identity

**Logo:** Two abstracted figures forming an infinity symbol — one teal, one blue, joined at an infinity loop. Represents the continuous link between patient and therapist ("linking every step of recovery").

**Wordmark:** "LinkCare" — "Link" in navy (#0D2B45), "Care" in teal-to-blue gradient. Tagline beneath, smaller, navy: "Linking every step of recovery."

**App Icon:** White background, with the logo mark itself in the teal-to-blue gradient (the inverse of a typical "gradient background, white glyph" app icon treatment) — this matches the standalone logo mark's own styling rather than introducing a separate gradient-fill icon variant. **Important:** the icon must use the team's actual exported logo mark asset from the branding kit, not a redrawn approximation — hand-recreating the mark risks losing the exact proportions, curve weights, and gradient angle your designer built. Export the real mark at icon sizes (see below) rather than rebuilding it as new artwork.

**Brand Gradient:** Teal Green (#1ABC9C) → Blue (#1D4EDB), 135° diagonal. Used on: logo mark, primary CTA accents (sparingly — see Buttons), loading states. Not used as a background wash on cards or large surfaces — the design philosophy calls for calm, low-noise layouts, and a large gradient surface contradicts that.

**Colour Palette:** see Section 3.

**Brand Imagery:** Real photography for marketing/clinic contexts (hospital environments, hands-on care) uses warm, natural light, soft focus backgrounds — never clinical/sterile stock photography. In-app illustration (body diagrams, empty states) uses the flat, minimal style defined in Section 16, not photography.

**Logo Usage Guidelines:**
- Minimum clear space: the height of the "L" in "LinkCare" on all sides
- Minimum size: 24px mark-only, 120px full lockup
- Never stretch, recolor outside the defined palette, or place on a background with contrast ratio below 3:1
- On dark backgrounds, use the white-glyph icon-only mark, not the full-color lockup

---

## 2. Design Philosophy

**North star:**
> Every interface should reduce cognitive load for stroke survivors, caregivers, and therapists. Rehabilitation should feel hopeful rather than overwhelming, and every interaction should connect prescribed exercises to meaningful real-life goals. LinkCare celebrates consistency over perfection, empowering patients to make steady progress while giving therapists the visibility to support recovery between clinic visits.

**Core principles:**

| Principle | What it means in practice |
|---|---|
| **Human-centred** | Recovery should feel encouraging, never overwhelming. Copy speaks to the person, not at a condition. |
| **Calm** | Clean layouts, minimal visual noise, generous whitespace, at most one accent colour doing work per screen. |
| **Hopeful** | Progress is celebrated (streaks, milestones); setbacks are shown neutrally, never as red "failure" states. |
| **Functional** | Every screen accomplishes one meaningful task — no screen tries to do three things at once. |
| **Accessible** | Large touch targets, readable type, high contrast, designed with stroke survivors' motor and cognitive needs in mind from the start, not retrofitted. |

**How this differs between the two apps:** the patient app leans harder into *hopeful* and *calm* (large friendly type, encouraging copy, minimal data density). The therapist dashboard leans harder into *functional* (higher information density is acceptable because the user is a trained clinician under real time pressure) while still respecting *calm* — no more than one accent colour drawing the eye per screen, even on data-dense pages like Patient Profile.

---

## 3. Colour System

**Research-backed constraint on this whole section:** as people age — and independently, as an effect of stroke-related contrast sensitivity deficits — blue and purple hues become harder to distinguish from one another, and colour vision generally dulls. This is a direct risk for LinkCare specifically, since Turquoise, Sky Blue, Teal Green, and Blue are all in the same blue-green family. Two mitigations, both applied throughout this section: (1) any two colours used to convey *different* meanings must differ enough in **lightness**, not just hue, to remain distinguishable even if hue perception is degraded; (2) colour is never the sole carrier of meaning anywhere in the product — every semantic colour is paired with text or an icon (already a rule, reinforced here with the research behind it).

Separately, stroke patients frequently report either too much glare or too little contrast in their environment, and struggle with edge/contour detection — this is why LinkCare's default surface (Neutral, below) is a soft off-white rather than pure white, reducing glare, while still keeping strong contrast against Navy text.

### Primary

| Colour | Hex | Usage |
|---|---|---|
| Turquoise | `#2EC4B6` | Primary buttons (patient app), progress indicators, highlights |
| Sky Blue | `#3498DB` | Primary buttons (therapist dashboard), secondary progress states, links |

### Secondary

| Colour | Hex | Usage |
|---|---|---|
| Teal Green | `#1ABC9C` | Secondary buttons, supporting accents, chart positive/on-track series, category highlights (e.g. goal-tagged exercises) |
| Blue | `#1D4EDB` | Secondary buttons, therapist-dashboard primary actions (Assign, Save), chart accent series, goal-progress numerals |

**Note for future additions:** the research above is background context, not an active constraint on the current design — none of the built screens actually use two close blues (e.g. Turquoise and Teal Green) to mean two different things simultaneously, since the "one accent per screen" rule below already prevents that. Keep it in mind if a future screen is tempted to introduce a second blue-family accent alongside an existing one.

### Neutral

| Role | Value | Usage |
|---|---|---|
| Background | Soft White `#FAFBFC` | Page canvas — intentionally slightly off pure white to reduce glare for patients with contrast sensitivity issues |
| Surface | Light Grey `#F5F6F7` | Cards, panels |
| Primary Text | Navy `#0D2B45` | Headings, primary body copy — verified 7:1+ contrast against both background values |
| Secondary Text | Slate Grey `#6B7280` | Supporting copy, captions, metadata — use sparingly on the patient app, where low-vision users benefit from Navy even for secondary text |
| Border | Border Grey `#E2E4E8` | Hairlines, dividers, input borders |

### Semantic

| Role | Colour | Hex | Usage |
|---|---|---|---|
| Success | Green | `#27AE60` | Completed sessions, goal milestones hit, "Low risk" |
| Warning | Amber/Coral | `#F0997B` | "Medium risk," barrier flags, moderate pain/fatigue |
| Error | Soft Red | `#D85A30` | "High risk," bottleneck body parts (e.g. Fingers 41%), missed sessions |
| Information | Sky Blue | `#3498DB` | Neutral system messages, tooltips |

*Note: Success (green) and Error (red-orange) sit deliberately far apart in both hue and lightness from the blue/teal brand colours and from each other — this is the one part of the palette where hue-based differentiation is safe to rely on, precisely because green and red-orange remain distinguishable even under blue/purple discrimination loss. Warning and Error, however, are close to each other (both in the amber-to-red-orange range) — always pair with the risk-level text label, never rely on the coral/red-orange distinction alone. This system also deliberately uses a warm coral rather than a harsh pure red, consistent with the "hopeful, not punitive" philosophy — a stalled goal or missed session should read as "needs attention," not "failure."

**Contrast ratio requirement — raised above bare minimum:** WCAG AA (4.5:1) is the absolute floor, but this product targets **AAA (7:1)** wherever feasible for body text, given the confirmed post-stroke contrast-sensitivity research above. Every text/background combination in the palette above has been chosen to clear 7:1 for Navy-on-Soft-White and Navy-on-Light-Grey; any new colour combination introduced later must be checked against this 7:1 target, not just the 4.5:1 legal minimum.

**Usage guideline — colour independence:** per Accessibility (Section 17), every semantic colour must be paired with a non-colour signal (icon, label text, or pattern) — e.g. risk badges always carry the word "risk" plus the colour, never colour alone. This matters specifically for stroke survivors who may have visual field or colour-perception changes.

**Usage guideline — one accent per screen:** even though the palette has 4+ "primary/secondary" colours available, no single screen should use more than one of them as its dominant accent. E.g. Patient Profile uses Blue (`#1D4EDB`) for goal progress and Teal (`#1ABC9C`) for positive Recovery Snapshot bars — that's the practical ceiling; don't add Sky Blue or Turquoise as a third competing accent on the same screen.

---

## 4. Typography

**Font family:** Inter (sans-serif). Research-backed choice: serif fonts are easier to read at typical vision, but their small decorative strokes significantly degrade legibility specifically for people with low vision — a common post-stroke issue even when not formally diagnosed. Sans-serif is the safer default across this entire product.

**Patient-facing minimum sizes are larger than the therapist dashboard**, based on rehab-centre observation plus supporting literature: a 2026 post-stroke accessibility study recommends a 12–14pt floor, while broader older-adult design research recommends 16px as the safe minimum for body text, with the option to size up further. We're setting the patient app's floor at the higher end of that range rather than the bare minimum, since stroke survivors combine both populations' risk factors (age-related vision changes plus stroke-specific visual/cognitive effects).

| Style | Size (Therapist dashboard) | Size (Patient app) | Weight | Line height | Letter spacing | Usage |
|---|---|---|---|---|---|---|
| Display | 32px | 40px | 600 | 1.2 | -0.02em | Patient app hero numbers (e.g. goal %) |
| Heading 1 | 24px | 28px | 600 | 1.3 | -0.01em | Page titles |
| Heading 2 | 18px | 20px | 500 | 1.35 | 0 | Section headers |
| Heading 3 | 15px | 17px | 500 | 1.4 | 0 | Card titles, patient names |
| Body | 14px | **18px** | 400 | 1.6 | 0 | Default paragraph/UI text |
| Caption | 12px | 14px | 400 | 1.5 | 0 | Metadata, timestamps, chart subtitles |
| Button | 13px | 16px | 500 | 1 | 0.01em | All button labels |
| Overline | 11px | *(avoid on patient app — see note)* | 500 | 1.3 | 0.06em, uppercase | Small category labels (therapist dashboard sidebar only) |

**Line height:** 1.5–1.6× font size throughout, meeting the research-recommended ~150% minimum for readability — already built into the values above.

**Caution on uppercase/Overline style:** the research is consistent that all-caps and condensed letterforms are harder to read, especially for low-vision users. Overline (uppercase) styling should be limited to short therapist-dashboard labels (e.g. "DOMAIN," "CATEGORY") where brevity limits the harm — it should not be used anywhere in the patient-facing app, including for section headers or emphasis.

**Resize support:** per WCAG, users must be able to resize text up to 200% without breaking layout or losing content. The patient app in particular should support a user-adjustable text size setting (Settings screen), not just a fixed larger default — this directly serves the "personalisation" recommendation from stroke-specific UX research, which found that ideal designs allow patients to adjust colours, fonts, and backgrounds themselves rather than relying on one fixed design for everyone.

**Minimum size floor:** 11px absolute minimum on the therapist dashboard only; 14px absolute minimum anywhere in the patient-facing app.

**Why the two scales differ — this is intentional, not inconsistent:** OT Ploy is a trained professional without a documented visual impairment, working through a real caseload under time pressure — the accessibility research behind the larger patient-app sizes (12–14pt/16–18px minimums for low-vision, aging, and post-stroke users) doesn't apply to her the same way. A denser therapist scale lets more of the caseload (patient cards, charts, session logs) stay visible at once, which directly serves the dashboard's core purpose — giving the therapist visibility efficiently. Blowing every screen up to patient-app sizes would mean more scrolling and less seen per glance, working against that goal.

**Scope of the therapist dashboard's 11px floor:** 11px is only acceptable for short labels and metadata — sidebar category tags ("DOMAIN," "CATEGORY"), timestamps, badge text. It must never be used for anything OT Ploy needs to read carefully and continuously, such as therapist notes or barrier descriptions — those should use at minimum the 12px Caption size, even on the denser therapist scale, since 11px is genuinely too small for sustained reading even without a visual impairment.

---

## 5. Spacing System

8-point scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`

| Context | Value |
|---|---|
| Icon-to-label gap | 4–8px |
| Card internal padding | 16px (patient app), 12–14px (therapist dashboard, denser) |
| Card-to-card gap (grid) | 12px |
| Section-to-section vertical gap | 24–32px |
| Screen padding (mobile) | 16px |
| Screen padding (desktop) | 24–32px |
| Max content width (desktop) | 960px, centred, per the ~680–960px working width already used across therapist dashboard wireframes |

---

## 6. Grid System

| Breakpoint | Columns | Gutter | Margin |
|---|---|---|---|
| Desktop (therapist dashboard) | 12 | 16px | 32px |
| Tablet | 8 | 16px | 24px |
| Mobile (patient app) | 4 | 12px | 16px |

Therapist dashboard's sidebar-plus-content layouts (e.g. Exercise Library) treat the sidebar as a fixed 180px column outside the 12-column grid, with content occupying the remaining columns.

---

## 7. Corner Radius

| Component | Radius |
|---|---|
| Buttons | 12px |
| Cards | 16px |
| Inputs | 12px |
| Chips / badges / pills | 999px (full pill) |
| Modals | 20px |

(Scaled down slightly from the original 16/24/16/999/24 proposal to better match the denser therapist dashboard already built — large 24px radii read as too "soft/consumer" for a clinical data-dense screen; patient app can lean into the fuller 20–24px range if your designer wants a softer feel there specifically.)

---

## 8. Elevation & Shadows

| Level | Usage | Values |
|---|---|---|
| Small | Resting cards | `0 1px 2px rgba(13,43,69,0.06)` |
| Medium | Hover states, active patient card | `0 4px 12px rgba(13,43,69,0.08)` |
| Large | Modals, popovers | `0 12px 32px rgba(13,43,69,0.14)` |

Shadows use Navy (`#0D2B45`) at low opacity rather than pure black, so they read as "brand-tinted" rather than generic.

---

## 9. Iconography

**Style:** Outline icons, consistent stroke width — matches the Tabler icon set already used in the wireframes built for this project (`ti ti-*` classes).

**Specs:**
- Sizes: 16px inline (within text/rows), 20px standalone (nav, card headers), 24px max decorative
- Stroke width: consistent, no mixing thin/bold within one screen
- Style: rounded line caps, not sharp — matches the friendly/approachable brand feel
- Outline only, not filled — filled icons read as more "alert/urgent" than the calm philosophy wants, reserved only for true error states if ever needed

---

## 10. Buttons

### Variants

| Variant | Usage | Style |
|---|---|---|
| Primary | Single most important action per screen (Assign Programme, Submit Check-in, Start Session) | Filled, Blue `#1D4EDB` (therapist) or Turquoise `#2EC4B6` (patient) |
| Secondary | Supporting actions (Add Note, Adjust Programme) | Outline, 1px border, transparent fill |
| Outline | Tertiary/cancel actions | Outline only, no fill, Slate Grey text |
| Ghost | Low-emphasis inline actions (e.g. "Skip Rest") | No border, no fill, text-only with hover background |
| Play Button | Patient app session-start CTA | Circular, filled gradient, prominent — the one deliberate exception to "no gradients on large surfaces," since this is a small, single focal element |
| Disabled | Action currently unavailable | 40% opacity, no hover/press response |
| Loading | Action in progress | Spinner replaces label, button stays same size (no layout shift) |

### Sizes
- Small: 32px height, 13px text — used in dense therapist rows
- Medium: 40px height, 13px text — default
- Large: 48px height, 15px text — patient app primary CTAs (per Accessibility: larger targets for motor-impaired users)

### States
Hover: 8% darken. Pressed: `scale(0.98)`. Disabled: 40% opacity, `cursor: not-allowed`. Loading: spinner, button disabled during load.

**Rule — one primary button per screen:** matches the Restraint principle already established — e.g. Patient Profile has exactly one primary-filled button (Assign Exercise); Add Note and Adjust Programme are secondary/outline.

---

## 11. Cards

| Card | Used on | Key contents |
|---|---|---|
| Recovery Snapshot Card | Patient Profile, patient app Home/Progress | Body-part bars, bottleneck callout |
| Functional Goal Card | Patient Profile, patient app Home | Goal icon, name, progress bar, %, milestone text |
| Today's Focus Card | Patient app Home | Today's session theme, exercise count, duration, Start CTA |
| Exercise Card | Exercise Library, Assign Exercise | Name, target area, goal tag (only if tagged) |
| Appointment Card | Patient app Profile | Next appointment date/time/location |
| Session History Card | Patient app History (Recovery Journal) | Date, completion status, duration, mood/difficulty |
| Milestone Card | Patient Profile Goal Journey, patient app Progress | Milestone icon, label, complete/current/upcoming state |
| Recovery Team Card | Patient app Profile | Therapist photo, name, role |
| Settings Card | Settings (both apps) | Icon, label, chevron |
| Statistic Card | Dashboard (therapist), patient app History stats | Label + large number |
| Patient Card | Dashboard, Patients list (therapist) | Name, risk badge, goal, goal progress % |

**Shared card anatomy:** 16px padding, 16px radius, Small shadow at rest, Medium shadow on hover (where interactive), Light Grey surface on White background.

---

## 12. Form Elements

| Element | Used on | Notes |
|---|---|---|
| Text Input | Add Note, search bars | 40px height, 12px radius, Border Grey outline, Blue focus ring |
| Search Bar | Exercise Library | Leading search icon, placeholder text, clears on ✕ |
| Dropdown | Frequency selector (Assign Exercise) | Native select styling, consistent with Input height |
| Checkbox | Assign Exercise Step 3 (exercise selection) | 20px target, rounded 4px, Teal fill when checked |
| Radio Button | (reserved — not currently used in built screens) | Standard radio pattern if needed later |
| Toggle Switch | Settings notification preferences | Teal fill when on |
| Pain Slider | Patient app Session Check-in | 0–10 scale, track colored Teal→Coral gradient low-to-high, large 24px thumb (motor accessibility) |
| Fatigue Slider | Patient app Session Check-in | Same pattern as Pain Slider |
| Voice Notes | Patient app Notes field | Mic icon inline, records to text or audio attachment |
| Chips | Barriers multi-select (Session Check-in) | Pill-shaped, toggle selected/unselected state, Teal fill selected |
| Tags | Goal tags on exercises ("supports: return to driving") | Pill-shaped, Teal `#E1F5EE` bg / `#085041` text, non-interactive |

---

## 13. Navigation

### Mobile (patient app)
- **Bottom Navigation:** 5 items — Home, Progress, Start (centre, circular, elevated), History, Profile. Matches the uploaded patient wireframes exactly.
- **Back Button:** top-left chevron, 44px touch target minimum

### Desktop (therapist dashboard)
- **Top Navigation:** LinkCare logo + wordmark, left; 4 nav items (Dashboard, Patients, Exercise Library, Settings), centre-left; therapist name/avatar, right
- **Sidebar:** used only within Exercise Library (Domain + Category filters) — not a persistent global sidebar

### Shared
- **Tabs:** underline-style, active tab in Teal or Blue depending on app
- **Breadcrumbs:** used in Patient Profile ("Patients / Prasert Wongchai")
- **Month Selector:** patient app Home calendar strip, History month picker — arrow-prev/next + label
- **Pagination:** reserved for future use if patient/exercise lists grow beyond one screen; not currently needed at 6 patients / 45 exercises

---

## 14. Progress Indicators

| Indicator | Used for |
|---|---|
| Linear Progress Bar | Goal progress bars, weekly adherence context |
| Circular Progress | (reserved — patient app could adopt for session-in-progress ring, matches uploaded "Exercise in Progress" wireframe) |
| Goal Progress | The core %-complete pattern used throughout — always paired with a number, never a bar alone |
| Recovery Percentages | Recovery Snapshot body-part bars |
| Milestones | Goal Journey 5-step tracker |
| Weekly Calendar Dots | Patient app Home date strip — filled/outline/checked dot per day |
| Adherence Indicator | Weekly Adherence bar chart (therapist) |
| Recovery Snapshot | Body-part visualization, both apps |

**Rule:** every progress indicator on this product must show a number alongside the visual (per the chart-labeling requirement we already locked for the therapist dashboard) — a bar or ring with no numeral is not acceptable anywhere in LinkCare, patient or therapist side.

---

## 15. Motion & Interaction

| Interaction | Duration | Easing |
|---|---|---|
| Button press | 100ms | ease-out |
| Progress bar fill animation | 400ms | ease-out |
| Card expansion | 200ms | ease-in-out |
| Page transition | 250ms | ease-in-out |
| Goal completion celebration | 600ms (one-time) | spring/overshoot |
| Loading skeleton | continuous pulse, 1.2s cycle | linear |

General range: 150–250ms for functional transitions, with the single deliberate exception of goal-completion celebration (longer, springier — this is the one "delight" moment the calm philosophy makes room for).

---

## 16. Illustrations

**Style:** Flat, minimal, medical-but-approachable — matches the grey humanoid figure used in the uploaded Recovery Snapshot and Start Flow wireframes. Soft shadows, white background, no harsh outlines.

**Needed illustrations:**
- Recovery Snapshot body diagram (front-facing figure, dot markers per tracked body part) — already established in patient wireframes, reuse exactly
- Exercise illustrations (simple figure demonstrating each exercise, e.g. "Shoulder Raise" seated figure with motion arrow — matches uploaded Exercise Instructions wireframe)
- Empty-state illustrations (simple, non-clinical — e.g. a calendar icon for "no sessions yet," not a sad/negative image, per the hopeful-not-punitive philosophy)

---

## 17. Accessibility

This section is grounded in evidence, not just convention — see the research summary at the end of this document for full sourcing.

- **Touch targets:** minimum 44×44px on patient-facing mobile UI, per accessibility research on motor-impaired and elderly users which recommends going beyond the bare Apple HIG minimum for this population; 32px acceptable on therapist desktop UI where mouse precision is assumed
- **Contrast:** targets AAA (7:1) for body text wherever feasible, not just the WCAG AA (4.5:1) floor — raised specifically because of documented post-stroke contrast sensitivity deficits; 3:1 minimum for large text/UI components
- **Typography:** patient app floor is 14px absolute minimum, 18px default body size (raised from a generic 16px baseline given stroke survivors combine both age-related and stroke-specific visual risk factors); therapist dashboard floor is 11px. Sans-serif throughout — serifs measurably degrade legibility for low-vision users specifically. Avoid uppercase/condensed styling on patient-facing text.
- **User-adjustable text size:** patient app should let users increase text size themselves (Settings), not rely on one fixed size for everyone — stroke-specific UX research recommends personalisable colour/font/background options precisely because impairment severity varies so widely between patients
- **Reduced visual clutter:** limit the number of elements per screen and avoid complex multi-element layouts — post-stroke visual attention and scanning deficits are common, and simplified single-focus layouts have been shown to improve task performance in this population
- **Avoid unnecessary motion:** distracting animation should be blocked or minimized on patient-facing screens, consistent with the same accessibility research above
- **Simple language:** patient-facing copy avoids clinical jargon ("Return to driving" not "Improve upper extremity functional capacity")
- **One primary action per screen:** already enforced via the Buttons rule above
- **Colour-independent status:** every risk/status/semantic colour pairs with text or an icon, never colour alone — reinforced by the blue/purple discrimination risk noted in Section 3

---

## 18. Empty States

| Scenario | Headline | Body | CTA |
|---|---|---|---|
| No rehabilitation assigned | "No programme yet" | "Your therapist hasn't assigned exercises yet." | — (no action available to patient) |
| No history | "Your recovery journal starts here" | "Complete your first session to start tracking." | "Start session" |
| No goals | "Set your first goal" | "Goals help connect your exercises to what matters to you." | "Add a goal" (therapist-side action, patient sees pending state) |
| No appointments | "No upcoming appointments" | "Check back after your next clinic visit." | — |
| No search results (Exercise Library) | "No exercises found" | "Try a different search term." | — |

Per Section 2's philosophy, none of these are apologetic ("Oops, nothing here") — they're invitational or neutral, matching the CDS content guidance already established for this product.

---

## 19. Feedback States

| State | Pattern |
|---|---|
| Success | Toast, Teal accent, checkmark icon, auto-dismiss 3s (e.g. "Note added") |
| Loading | Skeleton screens for content, spinner for button actions |
| Saving | Inline spinner replacing the action button label, no toast needed for routine saves |
| Offline | Persistent banner, Slate Grey, "You're offline — changes will sync when reconnected" (patient app, given rehab may happen without reliable connectivity) |
| Error | Toast or inline message, Coral (not harsh red), plain-language explanation, no raw error codes |
| Submitting | Button shows Loading state (Section 10), disabled during submission |
| Completed | Celebration pattern (Section 15) for goal/session completion — the one moment allowed to feel bigger than usual |

---

## 20. Components (Claude Code Component Library)

Core components to build once, reuse everywhere:

- `Button` (all variants per Section 10)
- `Card` (base), `StatisticCard`, `PatientCard`, `FunctionalGoalCard`, `RecoverySnapshot`, `TodaysFocusCard`, `ExerciseCard`, `AppointmentCard`, `SessionHistoryCard`, `RecoveryTeamCard`
- `ProgressBar` (linear), `CircularProgress`
- `Slider` (Pain/Fatigue variant)
- `SearchBar`
- `BottomNavigation` (patient), `TopNavigation` (therapist)
- `Modal`
- `Badge` (risk status — always paired with text label per Accessibility)
- `Pill` (goal tags, barrier chips)
- `Avatar` (therapist/patient initials or photo)
- `ToastNotification`

Each component should be built once in a shared library and consumed by both the patient app and therapist dashboard where applicable (e.g. `RecoverySnapshot` and `Badge` are used on both sides and must render identically, since we already caught real data-alignment bugs between the two teams' independent builds).

---

## 21. Screen Templates

### Patient (mobile, bottom-nav pattern)
- **Home** — Header, calendar strip, greeting, Recovery Snapshot card, Functional Goal card, Today's Focus card
- **Today's Rehab** — Session overview, exercise list, tips card, Begin CTA
- **Exercise Session** — Full-bleed illustration, instructions, in-progress ring, rest timer, session progress checklist
- **Session Summary** — Check-in form (pain/fatigue sliders, difficulty, barriers, notes, goal reflection) → completion celebration → Recovery Snapshot/Goal/Milestones recap
- **Progress** — Recovery Snapshot (detailed), Primary Goal with journey/milestones, Other Goals grid, Progress Trend chart, weekly calendar, Recovery Milestones list
- **History (Recovery Journal)** — Month stats row, filter chips (All/Completed/Not completed/Rest days), chronological session list
- **Profile** — Personal info, Recovery Goal summary, Recovery Team, latest update, next appointment, health info, settings/support links

### Therapist (desktop, top-nav pattern)
- **Dashboard** — Stat cards, Attention Queue, full Patient Card grid
- **Patients (list)** — Sortable roster table
- **Patient Profile** — Header, Functional Goals, Recovery Snapshot, Weekly Adherence + Pain/Fatigue charts, Session Check-ins, Current Programme, Therapist Notes
- **Assign Exercise** — 5-step wizard (Goal → Domain → Browse/highlight → Selected → Configure)
- **Exercise Library** — Search bar, Domain/Category sidebar, exercise list panel
- **Settings** — Therapist profile card, placeholder preference sections

All templates use: consistent header pattern, consistent max-content-width per Section 6, consistent 16–32px section spacing per Section 5.

---

## 22. Design Tokens (Developer Handoff)

```css
/* Colours */
--color-turquoise: #2EC4B6;
--color-sky-blue: #3498DB;
--color-teal-green: #1ABC9C;
--color-blue: #1D4EDB;
--color-navy: #0D2B45;
--color-slate-grey: #6B7280;
--color-surface: #F5F6F7;
--color-border: #E2E4E8;
--color-success: #27AE60;
--color-warning: #F0997B;
--color-error: #D85A30;
--color-gradient-start: #1ABC9C;
--color-gradient-end: #1D4EDB;

/* Typography */
--font-family: 'Inter', sans-serif;
--font-size-display: 32px;
--font-size-h1: 24px;
--font-size-h2: 18px;
--font-size-h3: 15px;
--font-size-body: 14px;
--font-size-caption: 12px;
--font-size-button: 13px;
--font-size-overline: 11px;

/* Spacing */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;

/* Radius */
--radius-button: 12px;
--radius-card: 16px;
--radius-input: 12px;
--radius-pill: 999px;
--radius-modal: 20px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(13,43,69,0.06);
--shadow-md: 0 4px 12px rgba(13,43,69,0.08);
--shadow-lg: 0 12px 32px rgba(13,43,69,0.14);

/* Motion */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 250ms;
--duration-celebration: 600ms;
```

These map directly to CSS custom properties or a Tailwind theme config — either is fine for Claude Code to consume; pick whichever the therapist and patient codebases are already using so both sides share one token source rather than duplicating values (another spot where independent builds could drift, per the alignment issues already caught between the two apps).

## Appendix: Research Basis for Accessibility Decisions

The typography, colour, and accessibility standards in this document (Sections 3, 4, 17) are grounded in the following sources, gathered specifically because the team observed real font-size and colour-comfort concerns during rehab-centre visits and wanted evidence behind the design response rather than guesswork:

- **Post-stroke accessibility (2026, Scientific Reports):** documents 12–14pt font size, high text-background contrast, and blocking distracting animation as key accessibility factors for post-stroke digital interfaces; also found stroke participants performed better on simplified, single-focus layouts.
- **Post-stroke contrast sensitivity (PMC, stroke functional independence study):** stroke patients show measurable contrast sensitivity deficits linked to reduced functional independence; patients commonly report glare/too-much-light or too-little-contrast problems and difficulty with edge/contour detection.
- **Aging and colour vision (Salesforce/Medium, accessible design research):** as people age, blue and purple hues become harder to distinguish, and general colour vision dulls due to lens yellowing — directly relevant to LinkCare's blue/teal-dominant palette.
- **WCAG / Section 508 typography guidance:** recommends sans-serif for on-screen body text (serifs measurably harm legibility for low-vision users), 150% line-height minimum, and text resizable to 200% without loss of function; AA contrast (4.5:1) is the legal floor, AAA (7:1) is meaningfully more usable for low-vision users.
- **Older-adult interface design research (Toptal, Adchitects):** recommends 16px+ body text as a baseline, high-contrast colour choices, larger touch targets, and simple/uncluttered layouts for aging users.
- **Stroke-specific UX/UI literature review (PMC, young stroke survivors):** recommends personalisable interfaces (adjustable colour, font, background) since impairment type and severity vary widely between patients, and flags that most existing accessibility guidelines are not tailored specifically to stroke survivors.

This document intentionally sets several standards above the bare legal/WCAG minimum (e.g. AAA contrast target, 18px patient-app body text, 14px absolute floor) specifically because the stroke survivor population combines age-related vision changes with stroke-specific visual and cognitive effects — using only generic accessibility minimums would under-serve this specific user base.
