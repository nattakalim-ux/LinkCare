# LinkCare MVP v1.0
# Product Specification (Patient App)

> **Version:** 1.0  
> **Status:** Canonical MVP Specification  
> **Platform:** Mobile (Patient & Caregiver)

---

# 1. Product Vision

## Overview

LinkCare is a goal-oriented stroke rehabilitation platform that empowers stroke survivors to continue structured rehabilitation at home while keeping therapists informed between clinic visits.

Rather than focusing only on repetitions and exercise completion, LinkCare connects every rehabilitation session to meaningful life goals, helping patients understand how today's rehabilitation contributes to tomorrow's independence.

## Mission

- Enable patients to recover confidently at home.
- Enable therapists to monitor meaningful recovery remotely.

---

# 2. Design Principles

## Recovery feels hopeful
Celebrate progress rather than punish inconsistency.

Never make patients feel guilty for missing a session.

Use **"No session recorded"** instead of **"Missed session."**

## Goals before exercises

Patients are not exercising to complete repetitions.

They are exercising to regain their lives.

Every rehabilitation session should clearly connect to a meaningful recovery goal.

## One clear action

Every screen should have one obvious primary action.

Avoid competing CTAs.

## Clinical credibility

The product should feel trustworthy for therapists while remaining approachable for patients.

## Reduce cognitive load

Stroke patients may experience cognitive impairment.

Design with:

- Large touch targets
- Clear typography
- Generous spacing
- Plain language
- Minimal decision making

---

# 3. Users

## Primary User

Stroke survivor performing home rehabilitation.

## Secondary User

Family member or caregiver assisting rehabilitation.

---

# 4. MVP Scope

## Included

### Patient App

- Home
- Progress
- Start Rehabilitation
- Recovery Journal
- Profile

### Therapist Dashboard (outside this document)

- Dashboard
- Patient List
- Patient Detail
- Assign Rehabilitation Programme
- Progress Review

## Out of Scope

- Authentication
- Messaging
- Video consultation
- AI diagnosis
- EMR integration
- Payments
- Push notifications
- Computer vision
- Sensor integration

---

# 5. Information Architecture

```text
Patient App

Home
│
├── Progress
│
├── Start
│     ├── Today's Focus
│     ├── Session Overview
│     ├── Exercise Instructions
│     ├── Exercise In Progress
│     ├── Rest Timer
│     ├── Session Progress
│     ├── Session Capture
│     └── Session Complete
│
├── Recovery Journal
│
└── Profile
```

---

# 6. Bottom Navigation

```
🏠 Home

📈 Progress

▶ Start

📖 Journal

👤 Profile
```

The **Start** button is the primary action and occupies the centre position.

---

# 7. Screen Specifications

---

# Home

## Purpose

Daily landing page that motivates rehabilitation and surfaces today's recovery priorities.

## Components

- LinkCare logo
- Month selector
- Weekly calendar
- Greeting
- Recovery Snapshot
- Primary Goal
- Today's Focus
- Play button

## Data Sources

- patients.json
- goals.json
- assignments.json
- recoverySnapshots.json

## User Actions

- Open Progress
- Start today's rehabilitation
- Open Recovery Journal
- Open Profile

## Acceptance Criteria

- Recovery Snapshot displays body-part percentages
- Primary Goal is visible
- Today's Focus shows exercise count and estimated duration
- Play button launches Start Flow

---

# Progress

## Purpose

Help patients understand recovery over time rather than individual exercise performance.

## Components

- Recovery Snapshot
- Primary Goal
- Goal Journey
- Expandable Secondary Goals
- Recovery Milestones
- Weekly Consistency

## Data Sources

- goals.json
- sessions.json
- recoverySnapshots.json

---

# Start Flow

## Screen 1
Today's Focus

Displays:
- Focus title
- Therapist tip
- Estimated duration
- Exercise count

---

## Screen 2
Session Overview

Displays:
- Exercise list
- Sets
- Repetitions
- Estimated duration

---

## Screen 3
Exercise Instructions

Displays:
- Exercise name
- Instructions
- Sets
- Repetitions

---

## Screen 4
Exercise In Progress

Displays:
- Current exercise
- Progress indicator
- Next button

---

## Screen 5
Rest Timer

Displays:
- Countdown timer
- Skip option

---

## Screen 6
Session Progress

Displays:
- Completed exercises
- Remaining exercises
- Session progress

---

## Screen 7
Session Capture

Purpose:
Capture patient-reported outcomes immediately after rehabilitation.

Questions:

- Pain (slider)
- Fatigue (slider)
- Session difficulty (😊 😐 ☹️)
- Barriers (multi-select)
- Voice or text note
- Goal reflection

Goal reflection options:

- 😞 Not yet
- 😐 A little
- 😊 Definitely

Writes:

- sessions.json

---

## Screen 8
Session Complete

Displays:

- Celebration message
- Recovery Snapshot
- Primary Goal progress
- Positive emotional reflection
- Return Home button

---

# Recovery Journal

## Purpose

Provide positive reflection rather than attendance tracking.

## Components

- This Month's Stats
- Filter chips
- High-level session timeline

Detailed pain, fatigue and barriers are accessed from the individual session.

Use:

"No session recorded"

instead of

"Missed."

---

# Profile

## Components

- Personal Information
- Recovery Goal
- Recovery Team
- Latest Therapist Update
- Next Appointment
- Medical Information
- Settings
- Help & Support
- About LinkCare

---

# Recovery Snapshot

Purpose:

Visual representation of body-part recovery.

Body parts:

- Shoulder
- Elbow
- Hand
- Fingers

Each body part displays only:

- Progress percentage

No overall score.

No progress bar.

Recovery Snapshot values update only after therapist review during a clinic appointment (approximately every 2–4 weeks). Home rehabilitation activity contributes to the next review but does not immediately change the displayed percentages.

---

# Goal System

Each patient has:

- One Primary Goal
- Two or three Secondary Goals
- Primary Goal milestones

Secondary Goals remain collapsed by default.

---

# Design Language

Visual style:

- White backgrounds
- Rounded cards
- Soft shadows
- Blue / teal palette
- Premium wellness aesthetic
- Friendly and encouraging

Avoid a hospital software appearance.

---

# Data Sources

| Screen | Reads |
|--------|--------|
| Home | patients, goals, assignments, recoverySnapshots |
| Progress | goals, recoverySnapshots, sessions |
| Start | assignments, exercises |
| Session Capture | writes sessions |
| Recovery Journal | sessions |
| Profile | patients, therapists |

---

# Future Roadmap

- Wearable integration
- Armeo integration
- Smart pegboard integration
- Assessment modules (ARAT, Box & Block, Nine Hole Peg Test)
- AI-assisted recovery insights
- Computer vision repetition tracking
- Caregiver companion mode
- Tele-rehabilitation

---

# Canonical MVP Principles

- Recovery should always feel encouraging.
- Goals are more important than repetitions.
- The patient always understands why today's rehabilitation matters.
- Therapists receive meaningful longitudinal insights rather than raw exercise logs.
- This specification is the single source of truth for the Patient App MVP.
