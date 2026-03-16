import { Header } from '@/components/common/Header';
import { useParams } from 'react-router-dom';

export function SessionDetailPage() {
  const { sessionId } = useParams();

  return (
    <>
      <Header title="Session Detail" />
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Transcript Viewer</p>
          <p className="mt-1 text-sm">Session: {sessionId}</p>
        </div>
      </div>
    </>
  );
}
