import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { createSession, listSessions, getSession, sendMessage } from '@/api/sessions';
import type { Session, Turn } from '@/types/chat';

interface ChatContextValue {
  sessions: Session[];
  activeSessionId: string | null;
  turns: Turn[];
  streamingContent: string | null;
  isStreaming: boolean;
  selectSession: (id: string) => void;
  newChat: () => void;
  send: (message: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const refreshSessions = useCallback(async () => {
    const data = await listSessions();
    setSessions(data);
  }, []);

  useEffect(() => {
    refreshSessions();
  }, [refreshSessions]);

  const selectSession = useCallback(async (id: string) => {
    setActiveSessionId(id);
    const session = await getSession(id);
    setTurns(session.turns);
  }, []);

  const newChat = useCallback(async () => {
    const session = await createSession();
    setActiveSessionId(session.id);
    setTurns([]);
    await refreshSessions();
  }, [refreshSessions]);

  const send = useCallback(async (message: string) => {
    if (!activeSessionId || isStreaming) return;

    const userTurn: Turn = {
      id: Date.now(),
      role: 'user',
      content: message,
      turn_number: turns.length,
      created_at: new Date().toISOString(),
    };
    setTurns((prev) => [...prev, userTurn]);
    setIsStreaming(true);
    setStreamingContent('');

    let accumulated = '';
    try {
      await sendMessage(
        activeSessionId,
        message,
        (token) => {
          accumulated += token;
          setStreamingContent(accumulated);
        },
        () => {
          const assistantTurn: Turn = {
            id: Date.now() + 1,
            role: 'assistant',
            content: accumulated,
            turn_number: turns.length + 1,
            created_at: new Date().toISOString(),
          };
          setTurns((prev) => [...prev, assistantTurn]);
          setStreamingContent(null);
          setIsStreaming(false);
          refreshSessions();
        },
      );
    } catch {
      setStreamingContent(null);
      setIsStreaming(false);
    }
  }, [activeSessionId, isStreaming, turns.length, refreshSessions]);

  return (
    <ChatContext.Provider
      value={{ sessions, activeSessionId, turns, streamingContent, isStreaming, selectSession, newChat, send }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
