import Sidebar from "@/components/Sidebar";
import TherapistIdentityBar from "@/components/TherapistIdentityBar";
import { getTherapists } from "@/lib/api";
import { CURRENT_THERAPIST_ID } from "@/lib/currentTherapist";
import styles from "./layout.module.css";

export default async function TherapistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const therapists = await getTherapists();
  const currentTherapist =
    therapists.find((t) => t.id === CURRENT_THERAPIST_ID) ?? therapists[0];

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        {currentTherapist && <TherapistIdentityBar therapist={currentTherapist} />}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
