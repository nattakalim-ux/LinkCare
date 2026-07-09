import type { Session } from "@/lib/types";
import { CheckIcon } from "./icons";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

// Monday-first offset: getDay() is 0=Sun..6=Sat, so Monday is (getDay() + 6) % 7 days after Monday.
function startOfWeekMonday(date: Date) {
  const d = new Date(date);
  const diff = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

export function WeeklyCalendar({ sessions, today }: { sessions: Session[]; today: Date }) {
  const startOfWeek = startOfWeekMonday(today);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const sessionByDate = new Map(sessions.map((s) => [s.date, s]));
  const todayISO = toISODate(today);

  return (
    <div className="flex justify-between gap-1">
      {days.map((day) => {
        const iso = toISODate(day);
        const session = sessionByDate.get(iso);
        const isToday = iso === todayISO;
        const isFuture = day > today && !isToday;
        const isCompleted = session?.status === "completed";

        return (
          <div key={iso} className="flex flex-col items-center gap-2">
            <span className="text-caption text-slate">
              {DAY_LABELS[(day.getDay() + 6) % 7]}
            </span>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-body ${
                isToday ? "bg-turquoise/15 font-semibold text-turquoise" : "text-navy"
              }`}
            >
              {day.getDate()}
            </div>
            {isCompleted ? (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white">
                <CheckIcon size={10} />
              </span>
            ) : (
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isFuture
                    ? "bg-surface"
                    : isToday
                      ? "bg-turquoise"
                      : session?.status === "not_completed"
                        ? "bg-attention"
                        : "bg-surface"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
