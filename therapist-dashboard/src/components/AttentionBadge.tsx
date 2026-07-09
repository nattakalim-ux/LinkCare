import type { AttentionStatus } from "@/lib/types";
import styles from "./AttentionBadge.module.css";

const VARIANT: Record<AttentionStatus, string> = {
  "Doing Well": styles.success,
  "On Track": styles.info,
  "Needs Attention": styles.attention,
};

export default function AttentionBadge({ status }: { status: AttentionStatus }) {
  return <span className={`${styles.badge} ${VARIANT[status]}`}>{status}</span>;
}
