"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  HistoryIcon,
  ProfileIcon,
  ProgressIcon,
  PlayIcon,
} from "./icons";

const ITEMS = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/progress", label: "Progress", Icon: ProgressIcon },
  { href: "/history", label: "History", Icon: HistoryIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-10 border-t border-surface bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {ITEMS.slice(0, 2).map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}

        <Link
          href="/start"
          aria-label="Start today's rehabilitation session"
          className="flex h-14 w-14 shrink-0 -translate-y-4 items-center justify-center rounded-full bg-gradient-to-br from-teal to-dashboard-blue text-white shadow-lg shadow-turquoise/30 transition-transform active:scale-95"
        >
          <PlayIcon size={26} />
        </Link>

        {ITEMS.slice(2).map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </div>
    </nav>
  );
}

function NavLink({
  item,
  active,
}: {
  item: { href: string; label: string; Icon: (props: { size?: number; className?: string }) => React.ReactElement };
  active: boolean;
}) {
  const { Icon } = item;
  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center gap-0.5 px-3 py-1 text-caption ${
        active ? "text-turquoise font-semibold" : "text-slate"
      }`}
    >
      <Icon size={22} />
      {item.label}
    </Link>
  );
}
