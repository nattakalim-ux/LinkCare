export function LoadingScreen() {
  return (
    <div className="flex flex-1 items-center justify-center py-24 text-body text-slate">
      Loading...
    </div>
  );
}

export function ErrorScreen({ message }: { message?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2 py-24 text-center">
      <p className="text-body font-medium text-navy">Couldn&apos;t load this screen.</p>
      <p className="text-caption text-slate">
        {message ?? "Make sure the mock server is running at localhost:4000."}
      </p>
    </div>
  );
}
