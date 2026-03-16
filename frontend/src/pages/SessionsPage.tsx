import { Header } from '@/components/common/Header';

export function SessionsPage() {
  return (
    <>
      <Header title="Sessions" />
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Session Transcripts</p>
          <p className="mt-1 text-sm">Browse and filter simulation session transcripts.</p>
        </div>
      </div>
    </>
  );
}
