import { Toaster } from '@/components/ui/sonner';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { Chat } from '@/pages/Chat';

function App() {
  return (
    <ErrorProvider>
      <Chat />
      <Toaster />
    </ErrorProvider>
  );
}

export default App;
