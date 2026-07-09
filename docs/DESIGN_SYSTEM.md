# LinkCare MVP v1.0
# Design System

> **Version:** 1.0
> **Status:** Canonical Design System
> **Applies to:** Patient App & Therapist Dashboard

---

# 1. Purpose

This document defines the visual language, interaction principles and reusable UI components for LinkCare.

It is the single source of truth for all interface decisions.

If generated code conflicts with this document, follow this document.

---

# 2. Product Philosophy

LinkCare is a goal-oriented stroke rehabilitation platform.

It exists to help stroke survivors recover confidently at home while keeping therapists informed between clinic visits.

Every interface should reinforce one simple belief:

> **Small steps today create meaningful recovery tomorrow.**

Recovery should always feel hopeful.

Patients should understand why today's rehabilitation matters.

Therapists should understand meaningful recovery at a glance.

---

# 3. Design Principles

## Recovery feels hopeful

Celebrate progress.

Never punish inconsistency.

Use encouraging language throughout the product.

---

## Goals before exercises

Patients exercise to regain meaningful life activities.

Goals are always more important than repetitions.

---

## One primary action

Every screen should have one obvious primary action.

Avoid competing CTAs.

---

## Clinical credibility

The product should feel medically trustworthy without looking like hospital software.

---

## Reduce cognitive load

Design for patients who may experience:

- Cognitive impairment
- Fatigue
- Reduced attention
- Visual impairment

Prefer simplicity over density.

---

# 4. Experience Principles

Every rehabilitation session should leave the patient feeling:

1. I know what to do.
2. I can do this.
3. I made progress.
4. My therapist knows.

The interface should reinforce this emotional journey.

---

# 5. Brand Personality

LinkCare should feel:

- Calm
- Hopeful
- Professional
- Human
- Premium
- Reassuring

LinkCare should never feel:

- Corporate
- Hospital software
- Competitive
- Childish
- Flashy
- Punitive

---

# 6. Visual Foundations

## Colour System

### Primary

| Colour | Hex | Purpose |
|----------|-----|---------|
| Turquoise | `#2EC4B6` | Primary patient actions |
| Sky Blue | `#3498DB` | Therapist dashboard primary actions |
| Teal Green | `#1ABC9C` | Secondary accents, positive chart series |
| Blue | `#1D4EDB` | Therapist dashboard secondary accents |
| Navy | `#0D2B45` | Primary text |
| Slate | `#6B7280` | Secondary text |
| White | `#FFFFFF` | Background |
| Light Grey | `#F5F6F7` | Cards & surfaces |

(Exact hex values from the LinkCare brand kit — added here so there's no ambiguity or guessing when this design system is implemented in code.)

---

### Semantic

| Colour | Hex | Meaning |
|---------|-----|----------|
| Green | `#27AE60` | Success |
| Orange/Coral | `#F0997B` | Attention |
| Blue | `#3498DB` | Information |
| Red | `#D85A30` | Errors only |

(A warm, muted red-orange rather than a harsh pure red is used deliberately, consistent with this document's own "recovery feels hopeful, never punish inconsistency" principle — a jarring alarm-red for error states would work against that stated philosophy.)

---

### Colour Rules

- Never communicate meaning using colour alone.
- Pair colours with text or icons.
- Use one accent colour per screen.
- Maintain high contrast.

---

## Typography

**Font**

Inter

---

### Patient App

| Style | Size |
|---------|------|
| Display | 40px |
| Heading | 28px |
| Section | 20px |
| Body | 18px |
| Caption | 14px |
| Button | 16px |

---

### Therapist Dashboard

| Style | Size |
|---------|------|
| Display | 32px |
| Heading | 24px |
| Section | 18px |
| Body | 14px |
| Caption | 12px |
| Button | 13px |

---

### Typography Rules

- Sentence case only
- Left aligned
- Generous whitespace
- High readability

---

## Spacing

Use an 8-point spacing system.

Available spacing values:

- 4
- 8
- 12
- 16
- 24
- 32
- 48
- 64

---

## Radius

| Component | Radius |
|------------|---------|
| Cards | 16px |
| Buttons | 12px |
| Inputs | 12px |
| Pills | Full |

---

## Elevation

Use soft shadows only.

Avoid dramatic floating effects.

---

# 7. Information Hierarchy

Every screen should follow these principles.

- One focal point.
- One primary action.
- Maximum three major cards before scrolling.
- Important information first.
- Secondary information collapses where appropriate.
- Cards should never compete equally for attention.

---

# 8. Navigation

## Patient App

Bottom Navigation

- Home
- Progress
- Start
- History
- Profile

The **Start** button is always centred and represents the primary action.

---

## Therapist Dashboard

Top Navigation

- Dashboard
- Patients

Exercises are accessed through **Assign Programme**.

---

# 9. Component Library

## Recovery Snapshot

### Purpose

Visual overview of upper limb recovery.

### Displays

- Shoulder
- Elbow
- Hand
- Fingers

### Rules

- Display body-part percentages only.
- Do not display overall scores.
- Do not display progress bars.

### Used On

- Home
- Progress
- Therapist Dashboard

---

## Goal Card

### Displays

- Primary Goal
- Expandable Secondary Goals
- Goal Journey

### Used On

- Home
- Progress
- Therapist Dashboard

---

## Today's Focus Card

### Displays

- Today's Focus
- Estimated duration
- Exercise count
- Start button

### Used On

- Home

---

## Exercise Card

### Displays

- Exercise name
- Instructions
- Sets
- Repetitions

### Used On

- Start Flow
- Assign Programme

---

## Patient Card

### Displays

- Name
- Recovery Stage
- Primary Goal
- Weekly Consistency
- Attention Status
- Next Appointment
- Recovery Snapshot preview

### Used On

- Dashboard
- Patient List

---

## Appointment Card

Displays

- Date
- Time
- Location
- Appointment type

---

## Therapist Update Card

Displays the latest therapist update.

---

## Statistic Card

Displays one KPI only.

Examples:

- Weekly Consistency
- Sessions Completed
- Active Patients

---

## Slider

Used for:

- Pain
- Fatigue

---

## Mood Selector

Three options only.

😊 Definitely

😐 A little

😞 Not yet

---

# 10. Screen Composition

## Home

Header

↓

Month Selector

↓

Weekly Calendar

↓

Greeting

↓

Recovery Snapshot

↓

Goal Card

↓

Today's Focus

↓

Bottom Navigation

---

## Progress

Header

↓

Recovery Snapshot

↓

Goal Journey

↓

Secondary Goals

↓

Weekly Consistency

---

## Start Flow

1. Today's Focus
2. Session Overview
3. Exercise Instructions
4. Exercise In Progress
5. Rest Timer
6. Session Progress
7. Session Capture
8. Session Complete

---

## Recovery Journal

Header

↓

This Month's Stats

↓

Filter Chips

↓

Session Timeline

---

## Profile

Header

↓

Personal Information

↓

Recovery Goal

↓

Recovery Team

↓

Latest Therapist Update

↓

Next Appointment

↓

Medical Information

↓

Settings

↓

Help & Support

↓

About LinkCare

---

## Therapist Dashboard

Dashboard

↓

Patient List

↓

Patient Profile

↓

Assign Programme

---

# 11. Interaction Patterns

- Expandable cards remember their expanded state.
- Sliders should feel smooth and snap naturally.
- Calendar scrolls horizontally.
- Voice notes are optional.
- Primary buttons should always be visually dominant.
- Use progressive disclosure rather than overwhelming users.

---

# 12. Writing Style

Always write in supportive, encouraging language.

Prefer:

- Great work today.
- You're one session closer to your goal.
- No session recorded.
- Weekly Consistency.
- Attention Status.

Avoid:

- Failed.
- Missed Session.
- Compliance.
- Adherence.
- Risk.
- Patient Score.
- Exercise Score.

---

# 13. Accessibility

- Minimum touch target: 44 × 44 px
- High colour contrast
- Plain language
- Large typography
- Minimal clutter
- One primary action per screen
- Never communicate meaning using colour alone

---

# 14. Motion

| Interaction | Duration |
|-------------|----------|
| Button Press | 100ms |
| Card Expand | 200ms |
| Page Transition | 250ms |
| Celebration Animation | 600ms |

Motion should feel calm, smooth and purposeful.

---

# 15. Implementation Rules

- Build reusable components.
- Reuse components before creating new ones.
- Never hardcode colours.
- Never hardcode spacing.
- Use the shared mock-data as the single source of truth.
- Follow the Patient and Therapist Product Specifications.
- Follow the API Contract and Data Dictionary.
- Maintain consistent terminology across the entire product.
- Patient UI should prioritise encouragement.
- Therapist UI should prioritise efficiency.

---

# 16. Canonical Terminology

Always use these terms consistently throughout the product.

- Today's Focus
- Recovery Snapshot
- Goal Journey
- Primary Goal
- Secondary Goals
- Weekly Consistency
- Recovery Journal
- Attention Status
- Latest Therapist Update
- No Session Recorded

This document is the canonical implementation guide for the LinkCare design system.