"use client";

import { useMemo, useState } from "react";
import type {
  AttentionStatus,
  Goal,
  Patient,
  RecoverySnapshot,
  Session,
} from "@/lib/types";
import PatientTable from "@/components/PatientTable";
import styles from "./page.module.css";

const FILTERS: Array<AttentionStatus | "All"> = [
  "All",
  "Needs Attention",
  "On Track",
  "Doing Well",
];

export default function PatientListClient({
  patients,
  snapshots,
  goals,
  sessions,
}: {
  patients: Patient[];
  snapshots: RecoverySnapshot[];
  goals: Goal[];
  sessions: Session[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AttentionStatus | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.displayName.toLowerCase().includes(q) ||
        p.primaryGoal.toLowerCase().includes(q);
      const matchesFilter = filter === "All" || p.attentionStatus === filter;
      return matchesQuery && matchesFilter;
    });
  }, [patients, query, filter]);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Patients</h1>

      <div className={styles.controls}>
        <input
          type="search"
          placeholder="Search by name or goal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.search}
        />
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={f === filter ? styles.filterActive : styles.filter}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableSection}>
        <PatientTable
          patients={filtered}
          snapshots={snapshots}
          goals={goals}
          sessions={sessions}
        />
      </div>
    </div>
  );
}
