export interface StrokeInfo {
  type: string;
  timeSinceStrokeMonths: number;
  affectedSide: string;
  affectedDomains: string[];
  recoveryStage: string;
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
  stroke: StrokeInfo;
  primaryGoal: string;
  assignedPT: string;
  assignedOT: string;
  lastSession: string;
  consistency: number;
  attentionStatus: string;
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

export interface Milestone {
  id: string;
  title: string;
  status: "completed" | "in_progress" | "locked";
}

export interface Goal {
  id: string;
  patientId: string;
  type: "primary" | "secondary";
  category: string;
  title: string;
  progressPercent: number;
  milestones?: Milestone[];
}

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
  difficulty: string;
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

export interface AssignmentExercise {
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
  // Canonical shape (see API_CONTRACT.md): per-exercise sets/reps a therapist
  // can customize per patient. `exerciseIds` is a legacy flat-array shape
  // some environments may still serve; it carries no per-patient overrides.
  exercises?: AssignmentExercise[];
  exerciseIds?: string[];
  schedule: AssignmentSchedule;
  therapistTip: string;
}

export type Difficulty = "easy" | "moderate" | "hard";
export type GoalReflection = "definitely" | "a_little" | "not_yet";

export interface Session {
  id?: string;
  patientId: string;
  assignmentId: string;
  date: string;
  status: "completed" | "not_completed";
  durationMinutes: number;
  exerciseCount: number;
  totalReps: number;
  difficulty: Difficulty | null;
  painScore: number | null;
  fatigueScore: number | null;
  barriers: string[];
  noteToTherapist: string;
  goalReflection: GoalReflection | null;
  sharedWithTherapist: boolean;
}

export interface BodyPartSnapshot {
  progressPercent: number;
  trendPercent: number;
}

export interface RecoverySnapshot {
  patientId: string;
  lastUpdated: string;
  shoulder: BodyPartSnapshot;
  elbow: BodyPartSnapshot;
  hand: BodyPartSnapshot;
  fingers: BodyPartSnapshot;
}
