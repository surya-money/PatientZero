import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

interface ErrorContextValue {
  handleError: (error: unknown, fallbackMessage?: string) => void;
}

const ErrorContext = createContext<ErrorContextValue | null>(null);

function extractMessage(error: unknown, fallbackMessage: string): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (error.message === 'Network Error') return 'Cannot connect to server';
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallbackMessage;
}

export function ErrorProvider({ children }: { children: ReactNode }) {
  const handleError = useCallback((error: unknown, fallbackMessage = 'Something went wrong') => {
    const message = extractMessage(error, fallbackMessage);
    toast.error(message);
  }, []);

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error('useError must be used within ErrorProvider');
  return ctx;
}
