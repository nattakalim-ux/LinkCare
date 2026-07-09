"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStartFlow } from "@/context/StartFlowContext";
import { CircularProgress } from "@/components/CircularProgress";
import { PrimaryButton } from "@/components/PrimaryButton";
import { LightbulbIcon } from "@/components/icons";

const REST_SECONDS = 30;

export default function RestTimerPage() {
  const router = useRouter();
  const { pendingRest, clearRest } = useStartFlow();
  // Snapshot at mount: pendingRest gets cleared to null as part of leaving this
  // screen, and we must not re-react to that or it stomps the navigation below.
  const [rest] = useState(() => pendingRest);
  const doneRef = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(REST_SECONDS);

  useEffect(() => {
    if (!rest) {
      router.replace("/start");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function complete() {
    if (doneRef.current || !rest) return;
    doneRef.current = true;
    rest.onDone();
    clearRest();
    router.push(rest.nextPath);
  }

  useEffect(() => {
    if (!rest) return;
    if (secondsLeft <= 0) {
      complete();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  if (!rest) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-center">
        <span className="text-caption font-medium text-slate">Rest Time</span>
      </div>

      <div className="text-center">
        <h1 className="text-heading font-semibold text-navy">Rest</h1>
        <p className="mt-1 text-body text-slate">Next: {rest.label}</p>
      </div>

      <CircularProgress percent={(secondsLeft / REST_SECONDS) * 100} size={200}>
        <div className="text-center">
          <div className="text-display font-bold text-navy">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-caption text-slate">Rest</div>
        </div>
      </CircularProgress>

      <div className="flex flex-col items-center gap-2 rounded-card bg-surface p-4 text-center">
        <LightbulbIcon size={18} className="text-turquoise" />
        <p className="text-body text-navy">Relax your arm and shoulder. Breathe slowly.</p>
      </div>

      <div className="mt-auto">
        <PrimaryButton variant="secondary" onClick={complete}>
          Skip rest
        </PrimaryButton>
      </div>
    </div>
  );
}
