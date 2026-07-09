import Image from "next/image";

const EXERCISE_PHOTOS: Record<string, string> = {
  "Shoulder Raise": "/illustrations/shoulder-raise-demo.png",
  "Forward Reach": "/illustrations/forward-reach-demo.png",
  "Hand Open & Close": "/illustrations/hand-open-close-demo.png",
};

// Full-size reference photo, shown on the Exercise Instructions screen.
// object-contain (not cover) so the whole demonstration is always visible —
// cropping a portrait vs. landscape photo differently would risk cutting off
// the actual movement being demonstrated.
export function ExercisePhoto({
  exerciseName,
  className,
}: {
  exerciseName: string;
  className?: string;
}) {
  const src = EXERCISE_PHOTOS[exerciseName];
  if (!src) return null;

  return (
    <div className={`relative overflow-hidden rounded-card bg-surface ${className ?? ""}`}>
      <Image
        src={src}
        alt={`Demonstration of ${exerciseName}`}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

// Small square preview used in exercise list rows (Session Overview, Session
// Progress) with the step number badged on the corner.
export function ExerciseThumbnail({
  exerciseName,
  index,
  className,
}: {
  exerciseName: string;
  index: number;
  className?: string;
}) {
  const src = EXERCISE_PHOTOS[exerciseName];
  if (!src) return null;

  return (
    <div className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-card ${className ?? ""}`}>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        aria-hidden
      />
      <span className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-turquoise text-[10px] font-semibold text-white ring-2 ring-white">
        {index}
      </span>
    </div>
  );
}
