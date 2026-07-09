import type { Session } from "@/lib/types";
import styles from "./RecoveryJournal.module.css";

const REFLECTION_ICON: Record<string, string> = {
  definitely: "😊",
  a_little: "😐",
  not_yet: "😞",
};

const REFLECTION_LABEL: Record<string, string> = {
  definitely: "Definitely",
  a_little: "A little",
  not_yet: "Not yet",
};

export default function RecoveryJournal({ sessions }: { sessions: Session[] }) {
  const ordered = sessions.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className={styles.timeline}>
      {ordered.map((s) => (
        <div key={s.id} className={styles.entry}>
          <div className={styles.date}>
            {new Date(s.date).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </div>

          {s.status === "not_completed" ? (
            <div className={styles.body}>
              <span className={styles.noSession}>No session recorded</span>
              {s.noteToTherapist && (
                <p className={styles.note}>&ldquo;{s.noteToTherapist}&rdquo;</p>
              )}
              {s.barriers.length > 0 && (
                <span className={styles.barrierTag}>{s.barriers.join(", ")}</span>
              )}
            </div>
          ) : (
            <div className={styles.body}>
              <div className={styles.summary}>
                <span className={styles.duration}>{s.durationMinutes} min</span>
                <span className={styles.dot}>&middot;</span>
                <span className={styles.difficulty}>{s.difficulty}</span>
                {s.goalReflection && (
                  <>
                    <span className={styles.dot}>&middot;</span>
                    <span className={styles.reflection}>
                      {REFLECTION_ICON[s.goalReflection]}{" "}
                      {REFLECTION_LABEL[s.goalReflection]}
                    </span>
                  </>
                )}
              </div>
              {s.exercisesCompleted.length > 0 && (
                <div className={styles.exercises}>
                  {s.exercisesCompleted.length} exercise
                  {s.exercisesCompleted.length === 1 ? "" : "s"}:{" "}
                  {s.exercisesCompleted.join(", ")}
                </div>
              )}
              {s.noteToTherapist && (
                <p className={styles.note}>&ldquo;{s.noteToTherapist}&rdquo;</p>
              )}
              {s.barriers.length > 0 && (
                <span className={styles.barrierTag}>{s.barriers.join(", ")}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
