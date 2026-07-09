"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStartFlow } from "@/context/StartFlowContext";
import { Slider } from "@/components/Slider";
import { DifficultySelector } from "@/components/DifficultySelector";
import { MoodSelector } from "@/components/MoodSelector";
import { PrimaryButton } from "@/components/PrimaryButton";
import { BARRIER_OPTIONS, OTHER_BARRIER } from "@/lib/constants";

export default function SessionCapturePage() {
  const router = useRouter();
  const { capture, updateCapture, submitSession } = useStartFlow();
  const [submitting, setSubmitting] = useState(false);
  const [otherReason, setOtherReason] = useState("");

  const otherSelected = capture.barriers.includes(OTHER_BARRIER);

  function toggleBarrier(barrier: string) {
    const has = capture.barriers.includes(barrier);
    updateCapture({
      barriers: has
        ? capture.barriers.filter((b) => b !== barrier)
        : [...capture.barriers, barrier],
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const trimmedOther = otherReason.trim();
      const mergedNote =
        otherSelected && trimmedOther
          ? capture.noteToTherapist
            ? `${capture.noteToTherapist}\n\nOther barrier: ${trimmedOther}`
            : `Other barrier: ${trimmedOther}`
          : capture.noteToTherapist;

      await submitSession({ noteToTherapist: mergedNote });
      router.push("/start/complete");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-heading font-semibold text-navy">Recovery check-in</h1>
        <p className="mt-1 text-body text-slate">Tell us how today&apos;s session felt.</p>
      </div>

      <Slider
        label="Pain"
        value={capture.painScore}
        onChange={(v) => updateCapture({ painScore: v })}
        lowLabel="No pain"
        highLabel="Severe"
      />

      <Slider
        label="Fatigue"
        value={capture.fatigueScore}
        onChange={(v) => updateCapture({ fatigueScore: v })}
        lowLabel="Fresh"
        highLabel="Exhausted"
      />

      <div>
        <p className="mb-2 text-body font-medium text-navy">How did the session feel?</p>
        <DifficultySelector
          value={capture.difficulty}
          onChange={(v) => updateCapture({ difficulty: v })}
        />
      </div>

      <div>
        <p className="mb-2 text-body font-medium text-navy">
          Anything get in the way today? (optional)
        </p>
        <div className="flex flex-wrap gap-2">
          {[...BARRIER_OPTIONS, OTHER_BARRIER].map((barrier) => (
            <button
              key={barrier}
              type="button"
              onClick={() => toggleBarrier(barrier)}
              className={`rounded-full px-4 py-2 text-caption font-medium transition-colors ${
                capture.barriers.includes(barrier)
                  ? "bg-turquoise text-white"
                  : "bg-surface text-navy"
              }`}
            >
              {barrier}
            </button>
          ))}
        </div>
        {otherSelected && (
          <input
            type="text"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            placeholder="Tell us more (optional)"
            className="mt-3 w-full rounded-input border border-surface p-3 text-body text-navy outline-none focus:border-turquoise"
          />
        )}
      </div>

      <div>
        <label htmlFor="note" className="mb-2 block text-body font-medium text-navy">
          Note to your therapist (optional)
        </label>
        <textarea
          id="note"
          value={capture.noteToTherapist}
          onChange={(e) => updateCapture({ noteToTherapist: e.target.value })}
          rows={3}
          className="w-full rounded-input border border-surface p-3 text-body text-navy outline-none focus:border-turquoise"
          placeholder="Optional"
        />
      </div>

      <div>
        <p className="mb-2 text-body font-medium text-navy">
          Do you feel closer to your goal today?
        </p>
        <MoodSelector
          value={capture.goalReflection}
          onChange={(v) => updateCapture({ goalReflection: v })}
        />
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Saving..." : "Finish session"}
        </PrimaryButton>
      </div>
    </div>
  );
}
