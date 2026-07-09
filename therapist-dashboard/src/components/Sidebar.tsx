"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconDashboard, IconPatients, IconCalendar, IconProfile } from "./icons";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { href: "/therapist", label: "Dashboard", icon: IconDashboard, exact: true },
  { href: "/therapist/patients", label: "Patients", icon: IconPatients, exact: false },
  { href: "/therapist/calendar", label: "Calendar", icon: IconCalendar, exact: false },
  { href: "/therapist/profile", label: "Profile", icon: IconProfile, exact: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Image src="/logo-mark.png" alt="LinkCare" width={36} height={26} priority />
        <div className={styles.brandText}>
          <div className={styles.wordmark}>
            <span className={styles.wordmarkLink}>Link</span>
            <span className={styles.wordmarkCare}>Care</span>
          </div>
          <div className={styles.subtitle}>Therapist Dashboard</div>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={active ? styles.navItemActive : styles.navItem}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
