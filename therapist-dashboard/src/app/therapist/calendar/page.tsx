import Link from "next/link";
import { getPatients } from "@/lib/api";
import Avatar from "@/components/Avatar";
import styles from "./page.module.css";

export default async function CalendarPage() {
  const patients = await getPatients();

  const appointments = patients
    .slice()
    .sort((a, b) => a.nextAppointment.date.localeCompare(b.nextAppointment.date));

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Calendar</h1>
      <p className={styles.subheading}>Upcoming appointments across all patients.</p>

      <div className={styles.list}>
        {appointments.map((patient) => (
          <Link
            key={patient.id}
            href={`/therapist/patients/${patient.id}`}
            className={styles.row}
          >
            <div className={styles.date}>
              <div className={styles.day}>
                {new Date(patient.nextAppointment.date).toLocaleDateString(undefined, {
                  day: "numeric",
                })}
              </div>
              <div className={styles.month}>
                {new Date(patient.nextAppointment.date).toLocaleDateString(undefined, {
                  month: "short",
                })}
              </div>
            </div>

            <Avatar name={patient.displayName} size={40} />

            <div className={styles.info}>
              <div className={styles.name}>{patient.displayName}</div>
              <div className={styles.type}>{patient.nextAppointment.type}</div>
            </div>

            <div className={styles.meta}>
              <div className={styles.time}>{patient.nextAppointment.time}</div>
              <div className={styles.location}>{patient.nextAppointment.location}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
