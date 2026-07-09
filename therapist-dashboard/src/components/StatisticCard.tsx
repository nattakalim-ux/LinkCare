import type { ReactNode } from "react";
import styles from "./StatisticCard.module.css";

interface StatisticCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: "teal" | "blue" | "attention" | "success";
}

export default function StatisticCard({
  label,
  value,
  icon,
  accent = "blue",
}: StatisticCardProps) {
  return (
    <div className={styles.card}>
      {icon && (
        <div className={`${styles.iconWrap} ${styles[accent]}`}>{icon}</div>
      )}
      <div>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
