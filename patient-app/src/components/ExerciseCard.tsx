import type { Exercise } from "@/lib/types";
import { Card } from "./Card";
import { RepsIcon, ClockIcon } from "./icons";

export function ExerciseCard({
  exercise,
  showInstructions = false,
}: {
  exercise: Exercise;
  showInstructions?: boolean;
}) {
  return (
    <Card>
      <h3 className="mb-1 text-section font-semibold text-navy">{exercise.name}</h3>
      <div className="mb-2 flex items-center gap-4 text-body text-slate">
        <span className="flex items-center gap-1.5">
          <RepsIcon size={16} />
          {exercise.defaultParameters.sets} sets &middot; {exercise.defaultParameters.reps} reps
        </span>
        <span className="flex items-center gap-1.5">
          <ClockIcon size={16} />
          {exercise.defaultParameters.estimatedMinutes} min
        </span>
      </div>
      {showInstructions && (
        <ol className="list-decimal space-y-1.5 pl-5 text-body text-navy">
          {exercise.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}
    </Card>
  );
}
