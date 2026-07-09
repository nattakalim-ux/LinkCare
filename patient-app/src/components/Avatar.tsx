import Image from "next/image";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 48,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  if (src) {
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials(name)}
    </div>
  );
}
