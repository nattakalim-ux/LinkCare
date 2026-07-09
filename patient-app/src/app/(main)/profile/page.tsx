"use client";

import { api } from "@/lib/api";
import { DEMO_PATIENT_ID } from "@/lib/constants";
import { useResource } from "@/lib/useResource";
import { Card } from "@/components/Card";
import { Avatar } from "@/components/Avatar";
import { LoadingScreen, ErrorScreen } from "@/components/StatusScreens";
import {
  ChevronRightIcon,
  TargetIcon,
  PeopleIcon,
  ChatIcon,
  CalendarIcon,
  ClipboardIcon,
  GearIcon,
  QuestionIcon,
  InfoIcon,
} from "@/components/icons";

// therapists.json has no avatar field of its own; only these two have a real
// provided photo, so this stays scoped to a component-level lookup rather than
// adding an avatar field to the data model itself.
const THERAPIST_AVATARS: Record<string, string> = {
  PT001: "/avatars/pt001.png",
  OT001: "/avatars/ot001.png",
};

function daysRemaining(dateISO: string, today: Date) {
  const target = new Date(`${dateISO}T00:00:00`);
  const diffMs = target.getTime() - new Date(today.toDateString()).getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
      {children}
    </span>
  );
}

const SUPPORT_ROWS = [
  { label: "Settings", Icon: GearIcon },
  { label: "Help & Support", Icon: QuestionIcon },
  { label: "About LinkCare", Icon: InfoIcon },
];

export default function ProfilePage() {
  const { data, error, loading } = useResource(async () => {
    const [patient, goals, therapists] = await Promise.all([
      api.getPatient(DEMO_PATIENT_ID),
      api.getGoals(DEMO_PATIENT_ID),
      api.getTherapists(),
    ]);
    const primaryGoal = goals.find((g) => g.type === "primary") ?? null;
    const pt = therapists.find((t) => t.id === patient.assignedPT) ?? null;
    const ot = therapists.find((t) => t.id === patient.assignedOT) ?? null;
    return { patient, primaryGoal, pt, ot };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error?.message} />;

  const { patient, primaryGoal, pt, ot } = data;
  const remaining = daysRemaining(patient.nextAppointment.date, new Date());

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-heading font-semibold text-navy">Profile</h1>
        <p className="text-caption text-slate">Manage your information and recovery journey.</p>
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <Avatar name={patient.displayName} src={patient.avatar} size={56} />
          <div>
            <div className="mb-0.5 text-caption font-medium uppercase tracking-wide text-slate">
              Personal Information
            </div>
            <div className="text-section font-semibold text-navy">{patient.displayName}</div>
            <div className="mt-1 text-caption text-slate">
              {patient.age} years old · {patient.stroke.timeSinceStrokeMonths} months since
              stroke
            </div>
            <div className="text-caption text-slate">
              {patient.stroke.affectedSide} {patient.stroke.affectedDomains.join(", ")} affected
            </div>
          </div>
        </div>
      </Card>

      {primaryGoal && (
        <Card>
          <div className="mb-2 flex items-center gap-3">
            <SectionIcon>
              <TargetIcon size={18} />
            </SectionIcon>
            <div className="text-caption font-medium uppercase tracking-wide text-slate">
              Recovery Goal
            </div>
          </div>
          <div className="mb-3 text-section font-semibold text-navy">{primaryGoal.title}</div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-caption font-medium uppercase tracking-wide text-slate">
              Recovery Progress
            </span>
            <span className="text-caption font-semibold text-turquoise">
              {primaryGoal.progressPercent}%
            </span>
          </div>
          <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-turquoise"
              style={{ width: `${primaryGoal.progressPercent}%` }}
            />
          </div>
          <p className="text-caption text-slate">
            Reflects functional rehabilitation progress. Does not replace clinical judgment for
            real-world activity clearance.
          </p>
        </Card>
      )}

      <Card>
        <div className="mb-3 flex items-center gap-3">
          <SectionIcon>
            <PeopleIcon size={18} />
          </SectionIcon>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Recovery Team
          </div>
        </div>
        <div className="flex gap-4">
          {[pt, ot].filter(Boolean).map((t) => (
            <div key={t!.id} className="flex flex-1 items-center gap-2">
              <Avatar name={t!.displayName} src={THERAPIST_AVATARS[t!.id]} size={44} />
              <div>
                <div className="text-body font-medium text-navy">{t!.displayName}</div>
                <div className="text-caption text-slate">{t!.role}</div>
                <div className="text-caption text-slate">{t!.hospital}</div>
              </div>
            </div>
          ))}
        </div>

      </Card>

      <Card>
        <div className="mb-2 flex items-center gap-3">
          <SectionIcon>
            <ChatIcon size={18} />
          </SectionIcon>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Latest Update
          </div>
        </div>
        <p className="text-body text-navy">&ldquo;{patient.latestUpdate.message}&rdquo;</p>
      </Card>

      <Card>
        <div className="mb-2 flex items-center gap-3">
          <SectionIcon>
            <CalendarIcon size={18} />
          </SectionIcon>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Next Appointment
          </div>
        </div>
        <p className="text-body text-navy">
          {new Date(`${patient.nextAppointment.date}T00:00:00`).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          <br />
          {patient.nextAppointment.time} · {patient.nextAppointment.location}
        </p>
        {remaining >= 0 && (
          <p className="mt-1 text-caption font-medium text-turquoise">{remaining} days remaining</p>
        )}
      </Card>

      <Card>
        <div className="mb-2 flex items-center gap-3">
          <SectionIcon>
            <ClipboardIcon size={18} />
          </SectionIcon>
          <div className="text-caption font-medium uppercase tracking-wide text-slate">
            Health Information
          </div>
        </div>
        <dl className="space-y-1.5 text-body text-navy">
          <div className="flex justify-between">
            <dt className="text-slate">Stroke type</dt>
            <dd>{patient.stroke.type}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate">Affected side</dt>
            <dd>{patient.stroke.affectedSide}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate">Recovery stage</dt>
            <dd>{patient.stroke.recoveryStage}</dd>
          </div>
        </dl>
      </Card>

      <div>
        <div className="mb-2 px-1 text-caption font-semibold uppercase tracking-wide text-slate">
          Support &amp; App
        </div>
        <Card className="divide-y divide-surface !p-0">
          {SUPPORT_ROWS.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-3 px-4 py-3">
              <Icon size={20} className="shrink-0 text-slate" />
              <span className="flex-1 text-body text-navy">{label}</span>
              <ChevronRightIcon size={18} className="text-slate" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
