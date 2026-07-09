import { Logo } from "./Logo";
import { BellIcon } from "./icons";

export function MainHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-surface bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-4">
        <Logo />
        <BellIcon size={22} className="text-slate" />
      </div>
    </header>
  );
}
