"use client";

import Image from "next/image";
import Link from "next/link";
import { useStartFlow } from "@/context/StartFlowContext";
import { PrimaryButton } from "@/components/PrimaryButton";
import { CloseIcon, GearIcon, ClockIcon, ListIcon, LightbulbIcon } from "@/components/icons";

export default function TodaysFocusPage() {
  const { assignment, exercises } = useStartFlow();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Close" className="text-slate">
          <CloseIcon size={22} />
        </Link>
        <span className="rounded-full bg-gradient-to-r from-teal to-dashboard-blue px-3 py-1 text-caption font-semibold text-white">
          Focus
        </span>
        <GearIcon size={20} className="text-slate" />
      </div>

      <div>
        <p className="mb-1 text-caption text-slate">
          Today, {new Date().toLocaleDateString(undefined, { month: "long", day: "numeric" })}
        </p>
        <h1 className="text-heading font-semibold text-navy">{assignment.focusTitle}</h1>
        <div className="mt-2 flex items-center gap-3 text-body text-slate">
          <span className="flex items-center gap-1.5">
            <ClockIcon size={16} />
            ~{assignment.schedule.estimatedMinutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <ListIcon size={16} />
            {exercises.length} exercises
          </span>
        </div>
      </div>

      <div className="relative aspect-[1448/1086] w-full overflow-hidden rounded-card">
        <Image
          src="/illustrations/session-overview.png"
          alt="Today's focus areas: shoulder mobility, forearm control, and grip strength"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-start gap-3 rounded-card bg-surface p-4">
        <LightbulbIcon size={18} className="mt-0.5 shrink-0 text-turquoise" />
        <p className="text-body text-navy">{assignment.therapistTip}</p>
      </div>

      <div className="mt-auto">
        <PrimaryButton href="/start/overview">Start session</PrimaryButton>
      </div>
    </div>
  );
}
