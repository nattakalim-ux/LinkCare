import { BottomNav } from "@/components/BottomNav";
import { MainHeader } from "@/components/MainHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col bg-white">
      <MainHeader />
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-6">{children}</div>
      <BottomNav />
    </div>
  );
}
