const EXERCISE_VIDEOS: Record<string, string> = {
  "Shoulder Raise": "/videos/shoulder-raise.mp4",
  "Forward Reach": "/videos/forward-reach.mp4",
  "Hand Open & Close": "/videos/hand-open-close.mp4",
};

export function ExerciseVideo({
  exerciseName,
  className,
}: {
  exerciseName: string;
  className?: string;
}) {
  const src = EXERCISE_VIDEOS[exerciseName];
  if (!src) return null;

  return (
    <div className={`overflow-hidden rounded-card bg-navy ${className ?? ""}`}>
      {/* key forces a clean remount (restart from frame 0) when switching exercises */}
      <video
        key={src}
        src={src}
        className="h-full w-full object-contain"
        autoPlay
        loop
        muted
        playsInline
        aria-label={`Demonstration video for ${exerciseName}`}
      />
    </div>
  );
}
