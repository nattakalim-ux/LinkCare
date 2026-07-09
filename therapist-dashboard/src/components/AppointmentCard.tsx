import type { NextAppointment } from "@/lib/types";
import styles from "./AppointmentCard.module.css";

export default function AppointmentCard({
  appointment,
}: {
  appointment: NextAppointment;
}) {
  const date = new Date(appointment.date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.card}>
      <div className={styles.type}>{appointment.type}</div>
      <div className={styles.datetime}>
        {date} &middot; {appointment.time}
      </div>
      <div className={styles.location}>{appointment.location}</div>
    </div>
  );
}
