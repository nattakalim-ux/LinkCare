// Types mirror the exact shapes in /mock-data and /mock-server/db.json.
// Do not add fields here that aren't present in the source JSON.

export type RecoveryStage = "Mild" | "Moderate" | "Severe" | "Plateau";
export type AttentionStatus = "Doing Well" | "On Track" | "Needs Attention";

export interface Stroke {
  type: string;
  timeSinceStrokeMonths: number;
  affectedSide: string;
  affectedDomains: string[];
  recoveryStage: RecoveryStage;
}

export interface LatestUpdate {
  date: string;
  therapistId: string;
  message: string;
}

export interface NextAppointment {
  date: string;
  time: string;
  location: string;
  type: string;
}

export interface Patient {
  id: string;
  displayName: string;
  avatar: string;
  age: number;
  sex: string;
  occupation: string;
  location: string;
  livingSituation: string;
  stroke: Stroke;
  primaryGoal: string;
  assignedPT: string;
  assignedOT: string;
  lastSession: string;
  consistency: number;
  attentionStatus: AttentionStatus;
  latestUpdate: LatestUpdate;
  nextAppointment: NextAppointment;
}

export interface Therapist {
  id: string;
  displayName: string;
  role: string;
  credentials: string;
  hospital: string;
  department: string;
}

export type GoalType = "primary" | "secondary";
export type MilestoneStatus = "completed" | "in_progress" | "locked";

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
}

export interface GoalProgressPoint {
  date: string;
  progressPercent: number;
}

export interface Goal {
  id: string;
  patientId: string;
  type: GoalType;
  category: string;
  title: string;
  progressPercent: number;
  milestones?: Milestone[];
  history?: GoalProgressPoint[];
}

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ExerciseParameters {
  sets: number;
  reps: number;
  estimatedMinutes: number;
}

export interface Exercise {
  id: string;
  name: string;
  rehabDomain: string;
  category: string;
  difficulty: Difficulty;
  targetBodyParts: string[];
  functionalGoals: string[];
  equipment: string[];
  defaultParameters: ExerciseParameters;
  trackingMethod: string;
  instructions: string[];
}

export interface AssignmentSchedule {
  frequency: string;
  daysPerWeek: number;
  estimatedMinutes: number;
}

export interface AssignedExercise {
  exerciseId: string;
  sets: number;
  reps: number;
}

export interface Assignment {
  id: string;
  patientId: string;
  status: string;
  primaryGoalId: string;
  focusTitle: string;
  rehabDomain: string;
  exercises: AssignedExercise[];
  schedule: AssignmentSchedule;
  therapistTip: string;
}

export type SessionStatus = "completed" | "not_completed";
export type SessionDifficulty = "easy" | "moderate" | "hard" | null;
export type GoalReflection = "definitely" | "a_little" | "not_yet" | null;

export interface Session {
  id: string;
  patientId: string;
  assignmentId: string;
  date: string;
  status: SessionStatus;
  durationMinutes: number;
  exerciseCount: number;
  exercisesCompleted: string[];
  totalReps: number;
  difficulty: SessionDifficulty;
  painScore: number | null;
  fatigueScore: number | null;
  barriers: string[];
  noteToTherapist: string;
  goalReflection: GoalReflection;
  sharedWithTherapist: boolean;
}

export interface BodyPartSnapshot {
  progressPercent: number;
  trendPercent: number;
}

export interface RecoverySnapshotHistoryPoint {
  date: string;
  shoulder: number;
  elbow: number;
  hand: number;
  fingers: number;
}

export interface RecoverySnapshot {
  id: string;
  patientId: string;
  lastUpdated: string;
  shoulder: BodyPartSnapshot;
  elbow: BodyPartSnapshot;
  hand: BodyPartSnapshot;
  fingers: BodyPartSnapshot;
  history: RecoverySnapshotHistoryPoint[];
}

export type BodyPart = "shoulder" | "elbow" | "hand" | "fingers";
export const BODY_PARTS: BodyPart[] = ["shoulder", "elbow", "hand", "fingers"];
