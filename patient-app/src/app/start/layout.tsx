import { StartFlowProvider } from "@/context/StartFlowContext";

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col bg-white px-4 py-6">
      <StartFlowProvider>{children}</StartFlowProvider>
    </div>
  );
}
