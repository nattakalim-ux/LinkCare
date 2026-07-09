import Link from "next/link";
import type { Therapist } from "@/lib/types";
import Avatar from "./Avatar";
import styles from "./TherapistIdentityBar.module.css";

export default function TherapistIdentityBar({
  therapist,
}: {
  therapist: Therapist;
}) {
  return (
    <div className={styles.bar}>
      <Link href="/therapist/profile" className={styles.identity}>
        <div className={styles.text}>
          <div className={styles.name}>{therapist.displayName}</div>
          <div className={styles.role}>{therapist.role}</div>
        </div>
        <Avatar name={therapist.displayName} size={36} />
      </Link>
    </div>
  );
}
