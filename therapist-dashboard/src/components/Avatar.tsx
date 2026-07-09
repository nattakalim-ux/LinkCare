import styles from "./Avatar.module.css";

const PALETTE = ["#2EC4B6", "#3498DB", "#1ABC9C", "#1D4ED8", "#0D2B45"];

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % PALETTE.length;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  return (
    <div
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: colorFor(name),
      }}
    >
      {initialsFor(name)}
    </div>
  );
}
