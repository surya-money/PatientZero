import { ChatProvider } from '@/contexts/ChatContext';
import { ChatContainer } from '@/containers/chat/ChatContainer';

export function Chat() {
  return (
    <ChatProvider>
      <ChatContainer />
    </ChatProvider>
  );
}
