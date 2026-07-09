import type { Assignment } from "@/lib/types";
import { getAssignmentExercises } from "@/lib/assignment";
import { Card } from "./Card";
import { PrimaryButton } from "./PrimaryButton";
import { FocusIcon, ListIcon, ClockIcon } from "./icons";

export function TodaysFocusCard({ assignment }: { assignment: Assignment }) {
  return (
    <Card>
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
          <FocusIcon size={20} />
        </span>
        <div>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Today&apos;s Focus
          </div>
          <h2 className="text-section font-semibold text-navy">{assignment.focusTitle}</h2>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-4 text-body text-slate">
        <span className="flex items-center gap-1.5">
          <ListIcon size={16} />
          {getAssignmentExercises(assignment).length} exercises
        </span>
        <span className="flex items-center gap-1.5">
          <ClockIcon size={16} />
          {assignment.schedule.estimatedMinutes} min
        </span>
      </div>
      <PrimaryButton href="/start">Start today&apos;s session</PrimaryButton>
    </Card>
  );
}
