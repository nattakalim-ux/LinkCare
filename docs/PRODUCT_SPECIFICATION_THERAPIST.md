# LinkCare MVP v1.0
# Product Specification (Therapist Dashboard)

> **Version:** 1.0
> **Status:** Canonical MVP Specification
> **Platform:** Desktop (Physical Therapist & Occupational Therapist)

---

# 1. Product Vision

## Overview

The LinkCare Therapist Dashboard enables Physical Therapists (PTs) and Occupational Therapists (OTs) to remotely understand meaningful patient recovery between clinic visits.

Rather than reviewing isolated exercise logs, therapists are presented with functional recovery, patient-reported outcomes and rehabilitation consistency so they can identify which patients require support first.

The dashboard complements the Patient App and shares the same philosophy:

> **Small steps today create meaningful recovery tomorrow.**

---

## Mission

- Help therapists prioritise patients who need attention.
- Reduce administrative burden when reviewing home rehabilitation.
- Enable meaningful conversations during follow-up appointments.
- Support therapist-led decisions using structured home rehabilitation data.

---

# 2. Design Principles

The Therapist Dashboard follows the same principles as the Patient App.

## Recovery feels hopeful

Present recovery objectively without discouraging patients.

Use supportive terminology.

---

## Goals before exercises

Always prioritise meaningful functional recovery goals over exercise completion.

---

## One primary action

Every screen should have one obvious primary task.

Avoid unnecessary complexity.

---

## Clinical credibility

Information should feel clinically trustworthy while remaining easy to interpret.

---

## Reduce cognitive load

Surface meaningful information before detailed information.

Prioritise patients requiring attention first.

---

# 3. Users

## Primary Users

- Physical Therapists (PT)
- Occupational Therapists (OT)

---

# 4. MVP Scope

## Included

- Dashboard
- Patient List
- Patient Detail
- Assign Rehabilitation Programme
- Progress Review

---

## Out of Scope

- Authentication
- Messaging
- EMR integration
- Scheduling
- Billing
- AI recommendations
- Video consultation
- Multi-clinic support
- Standalone Exercise Catalogue

---

# 5. Information Architecture

```text
Dashboard
│
├── Patients
│      └── Patient Detail
│               ├── Assign Rehabilitation Programme
│               └── Progress Review
```

---

# 6. Navigation

Top Navigation

- Dashboard
- Patients

Exercises are accessed through **Assign Rehabilitation Programme** rather than a standalone Exercise Catalogue.

Progress Review is accessed from the Patient Detail rather than as a standalone navigation item.

---

# 7. Screen Specifications

---

# Dashboard

## Purpose

Provide a high-level overview of all patients currently undergoing home rehabilitation.

Help therapists quickly identify who requires attention.

---

## Components

- Summary Statistics
- Patient Cards

---

## Data Sources

- patients.json
- goals.json
- sessions.json

---

## User Actions

- Review summary statistics
- Open a Patient Card to view Patient Detail

---

## Acceptance Criteria

Dashboard displays:

- Total Patients
- Needs Review
- Sessions Completed Today
- Average Weekly Consistency

Patient Cards display:

- Name
- Primary Goal
- Recovery Stage
- Weekly Consistency
- Attention Status
- Recovery Snapshot preview
- Next Appointment

---

# Patient List

## Purpose

Browse and search all patients.

---

## Components

- Search
- Filter
- Patient Cards

---

## Data Sources

- patients.json

---

## User Actions

- Search patient
- Filter patients
- Open Patient Detail

---

## Acceptance Criteria

- Search updates results
- Filters update results
- Selecting a Patient Card opens Patient Detail

---

# Patient Detail

## Purpose

Provide a complete overview of one patient's rehabilitation journey.

This page helps the therapist understand whether stalled progress is caused by low consistency, pain/fatigue, difficulty with exercises, or genuine recovery plateau.

---

## Components

- Patient Header
- Recovery Snapshot
- Progress Review Summary
- Primary Goal
- Goal Journey
- Secondary Goals
- Weekly Consistency
- Pain Trend
- Fatigue Trend
- Recovery Journal
- Today's Focus (Current Programme)
- Latest Therapist Update
- Next Appointment
- Medical Information

---

## Data Sources

- patients.json
- goals.json
- recoverySnapshots.json
- assignments.json
- sessions.json
- therapists.json

---

## User Actions

- Review patient progress
- Review rehabilitation history
- Review Recovery Snapshot evidence
- Open Progress Review
- Assign or update rehabilitation programme

---

## Acceptance Criteria

Patient Detail displays:

- Recovery Snapshot
- Recovery Snapshot last updated date
- Progress Review status
- Primary Goal
- Goal Journey
- Secondary Goals
- Weekly Consistency
- Pain Trend
- Fatigue Trend
- Recovery Journal
- Current Programme
- Latest Therapist Update
- Next Appointment
- Medical Information

---

# Barrier Insights & Recovery Journal

## Purpose

Help therapists understand why a patient may or may not be progressing with home rehabilitation.

Barrier Insights is a core LinkCare feature because it provides the context behind rehabilitation behaviour rather than simply showing completion statistics.

The therapist should be able to distinguish between:

- low consistency caused by pain or fatigue
- low consistency caused by busy schedules or forgetfulness
- exercises that are too difficult
- emotional or motivational barriers
- successful rehabilitation with no major barriers

---

## Components

- Barrier Frequency Summary
- Recovery Journal Timeline
- Pain Trend
- Fatigue Trend
- Session Difficulty
- Goal Reflection
- Patient Notes

---

## Data Sources

- sessions.json

---

## User Actions

- Review common barriers
- Read patient notes
- Identify rehabilitation patterns
- Decide whether Today's Focus should be adjusted

---

## Acceptance Criteria

Therapist can view:

- Pain
- Fatigue
- Session Difficulty
- Goal Reflection
- Patient Notes
- Most Common Barriers

Barrier Insights should help explain Weekly Consistency and Attention Status.

# Progress Review

## Purpose

Review the evidence supporting the patient's current Recovery Snapshot and approve updates after therapist review.

The Recovery Snapshot is **not automatically updated after every home rehabilitation session**.

Instead, LinkCare generates a suggested Recovery Snapshot using the Recovery Engine. The therapist remains the final decision-maker before updated values are shown to the patient.

---

## Review Frequency

Recovery Snapshot is typically reviewed during scheduled clinic appointments, approximately every 2–4 weeks.

Home rehabilitation data contributes continuously through exercise completion, patient check-ins and Weekly Consistency, but does not automatically change the displayed Recovery Snapshot.

Only therapist-approved updates are published to the Patient App.

## Components

- Current Recovery Snapshot
- Last Updated
- Updated By
- Next Review
- Recovery Drivers
- Suggested Recovery Snapshot
- Latest Therapist Update
- Approve Snapshot
- Edit Snapshot

---

## Recovery Drivers

The Recovery Engine combines four inputs:

| Driver | Weight |
|--------|--------|
| Therapist Functional Assessment | 50% |
| Exercise Completion | 20% |
| Patient Check-ins | 15% |
| Weekly Consistency | 15% |

---

## Driver Definitions

### Therapist Functional Assessment

Therapist-led assessment of functional capability for each body part.

Examples:

- Shoulder control
- Elbow control
- Hand function
- Finger dexterity
- Functional task observation

In future versions, this can be supported by structured assessments such as ARAT, Fugl-Meyer, Box and Block, Nine Hole Peg Test, and Grip Strength.

---

### Exercise Completion

How much of the assigned rehabilitation programme the patient completed.

This includes:

- Completed sessions
- Completed exercises
- Repetitions completed

---

### Patient Check-ins

Patient-reported outcomes collected after home rehabilitation.

This includes:

- Pain
- Fatigue
- Session difficulty
- Barriers
- Goal reflection
- Notes to therapist

---

### Weekly Consistency

How consistently the patient completes rehabilitation over time.

This rewards sustainable routine rather than occasional intense bursts.

---

## User Actions

Therapist can:

- Review current Recovery Snapshot
- Review Recovery Drivers
- Review suggested updated percentages
- Edit suggested percentages
- Write Latest Therapist Update
- Approve updated Recovery Snapshot


---

## Acceptance Criteria

- Recovery Drivers are visible
- Last Updated is visible
- Updated By is visible
- Next Review is visible
- Suggested Recovery Snapshot is visible
- Therapist can edit suggested percentages
- Therapist can publish Latest Therapist Update
- Therapist can approve Recovery Snapshot
- Approved values update the Recovery Snapshot displayed in both the Therapist Dashboard and Patient App

---

## Product Rule

Recovery Snapshot represents a **functional recovery index**, not a diagnostic medical score.

The displayed percentage should reflect meaningful recovery over time, not day-to-day fluctuation.

Small temporary changes should not immediately reduce the patient's displayed recovery progress.

---

# Assign Rehabilitation Programme

## Purpose

Create or update the patient's Today's Focus (Current Programme).

Exercises should support the patient's Primary Goal and Goal Journey while remaining appropriate for their current Recovery Snapshot.

---

## Components

- Exercise Search
- Exercise Picker
- Today's Focus (Current Programme)
- Therapist Tip
- Save Programme

---

## Data Sources

- exercises.json
- assignments.json
- goals.json

---

## User Actions

- Search exercises
- Add exercise
- Remove exercise
- Edit repetitions
- Edit sets
- Add therapist tip
- Save programme

---

## Acceptance Criteria

Therapist can:

- Search exercises
- Add exercises to programme
- Remove exercises from programme
- Edit sets
- Edit repetitions
- Add therapist tip
- Save programme

Exercises are selected through the embedded Exercise Picker.

A standalone Exercise Catalogue is not part of the MVP.

---

# 8. Shared Components

## Shared with the Patient App

- Recovery Snapshot
- Goal Card
- Exercise Card
- Appointment Card
- Statistic Card

---

## Therapist-only

- Patient Card
- Therapist Update Card
- Programme Builder
- Exercise Picker
- Recovery Drivers Card
- Progress Review Card

---


# 9. Functional Requirements

The therapist can:

- View patient list
- Search patients
- Review Recovery Snapshot
- Review Recovery Drivers
- Approve Recovery Snapshot updates
- Review Weekly Consistency
- Review Barrier Insights
- Review Recovery Journal
- Review Goal Reflection
- Read patient notes
- Publish Latest Therapist Update
- Assign Today's Focus (Current Programme)

---

# 10. Data Sources

| Screen | Reads |
|---------|--------|
| Dashboard | patients, goals, sessions |
| Patient List | patients |
| Patient Detail | patients, goals, recoverySnapshots, assignments, sessions, therapists |
| Progress Review | recoverySnapshots, sessions, goals |
| Assign Rehabilitation Programme | assignments, exercises, goals |

---

# 11. Acceptance Checklist

## Dashboard

✓ Summary Statistics visible

✓ Needs Review visible

✓ Patient Cards visible

---

## Patient List

✓ Search

✓ Filter

✓ Open Patient Detail

---

## Patient Detail

✓ Recovery Snapshot

✓ Last Updated

✓ Updated By

✓ Next Review

✓ Goal Journey

✓ Weekly Consistency

✓ Barrier Insights

✓ Recovery Journal

✓ Goal Reflection

✓ Today's Focus (Current Programme)

✓ Latest Therapist Update

✓ Next Appointment

---

## Progress Review

✓ Recovery Drivers visible

✓ Suggested Snapshot visible

✓ Therapist can edit values

✓ Therapist can approve values

✓ Approved values update the display

---

## Assign Rehabilitation Programme

✓ Search exercises

✓ Add exercise

✓ Remove exercise

✓ Edit repetitions

✓ Edit sets

✓ Add therapist tip

✓ Save programme

---

# 12. Recovery Engine

The Recovery Snapshot is generated by the LinkCare Recovery Engine.

The Recovery Engine combines therapist assessment, home rehabilitation completion, patient-reported outcomes, and weekly consistency to create a suggested functional recovery index for each body part.

## Formula

| Input | Weight |
|--------|--------|
| Therapist Functional Assessment | 50% |
| Exercise Completion | 20% |
| Patient Check-ins | 15% |
| Weekly Consistency | 15% |

## Therapist Control

The Recovery Engine does not automatically publish updates to the patient.

The therapist must review and approve updated Recovery Snapshot values before they appear in the Patient App.

This keeps the experience clinically credible and prevents patients from being demoralised by normal day-to-day fluctuations.

---

# 13. Canonical Demo Patient

The MVP demonstration focuses on one patient.

**Patient**

Prasert Wongwipha

**Primary Goal**

Return to Work

**Assigned PT**

Proud A.

**Assigned OT**

Pair L.

**Current Focus**

Steering Control & Grip Confidence

Supporting mock data includes five additional patients to demonstrate dashboard scalability.

---

# 14. Future Roadmap

Future releases may include:

- Assessment modules
- ARAT
- Nine Hole Peg Test
- Box and Block Test
- Fugl-Meyer Assessment
- Grip Strength
- Armeo integration
- Smart Pegboard integration
- Wearable sensor integration
- AI-assisted recovery insights
- EMR integration
- Messaging
- Scheduling
- Tele-rehabilitation

---

# Canonical MVP Principles

- Prioritise meaningful recovery over raw exercise completion.
- Surface patients requiring attention first.
- Recovery Snapshot is a therapist-approved functional recovery index.
- Barrier Insights provide context behind rehabilitation behaviour.
- Today's Focus (Current Programme) mirrors what the patient sees in the Patient App.
- Use encouraging language throughout the product.
- Share the same design language as the Patient App.
- Use the shared mock data as the single source of truth.
- This specification is the canonical reference for the Therapist Dashboard MVP.