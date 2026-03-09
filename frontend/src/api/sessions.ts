import type { Session, SessionDetail } from '@/types/chat';
import { client, API_BASE } from './client';

export async function createSession(model: string = 'mock:default'): Promise<Session> {
  const { data } = await client.post('/sessions', { model });
  return data;
}

export async function listSessions(): Promise<Session[]> {
  const { data } = await client.get('/sessions');
  return data;
}

export async function getSession(id: string): Promise<SessionDetail> {
  const { data } = await client.get(`/sessions/${id}`);
  return data;
}

export async function updateSessionModel(id: string, model: string): Promise<Session> {
  const { data } = await client.patch(`/sessions/${id}`, { model });
  return data;
}

export async function listModels(): Promise<string[]> {
  const { data } = await client.get('/models');
  return data;
}

export async function sendMessage(
  sessionId: string,
  message: string,
  onToken: (token: string) => void,
  onDone: () => void,
) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data:')) {
        const raw = line.slice(5).trim();
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed.token) onToken(parsed.token);
        } catch {
          // skip non-JSON data lines
        }
      }
      if (line.startsWith('event: done')) {
        onDone();
        return;
      }
    }
  }
  onDone();
}
